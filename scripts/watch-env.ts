import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';

const ENV_FILES = ['.env', '.env.local', '.env.production'];

const TYPES_OUTPUT = path.resolve('types/env/index.ts');
const CLIENT_ENV_OUTPUT = path.resolve('config/env/client/index.ts');

const START_MARK = '// --- AUTO-GENERATED ENVKEY START ---';
const END_MARK = '// --- AUTO-GENERATED ENVKEY END ---';

function extractEnvKeys(filePath: string): string[] {
	if (!fs.existsSync(filePath)) return [];
	const content = fs.readFileSync(filePath, 'utf-8');
	return content
		.split(/\r?\n/)
		.map(line => line.match(/^\s*([A-Z0-9_]+)\s*=/))
		.filter(Boolean)
		.map(match => match![1]);
}

function generateTypes(keys: string[]): string {
	const uniqueKeys = Array.from(new Set(keys)).sort();

	return `${START_MARK}
export type EnvKey =
${uniqueKeys.map(key => `  | "${key}"`).join('\n')};

export type PublicEnvKey = Extract<EnvKey, \`NEXT_PUBLIC_\${string}\`>;
export type PrivateEnvKey = Exclude<EnvKey, PublicEnvKey>;
${END_MARK}`;
}

function generateClientEnv(keys: string[]): string {
	const publicKeys = Array.from(new Set(keys))
		.filter(k => k.startsWith('NEXT_PUBLIC_'))
		.sort();

	const entries = publicKeys
		.map(key => `  ${key}: process.env.${key} as string`)
		.join(',\n');

	return `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.

export const publicEnv = {
${entries}
};

export type PublicEnv = typeof publicEnv;
`;
}

function updateTypesFile(newBlock: string) {
	let content = '';
	const exists = fs.existsSync(TYPES_OUTPUT);

	if (exists) {
		content = fs.readFileSync(TYPES_OUTPUT, 'utf-8');

		if (content.includes(START_MARK) && content.includes(END_MARK)) {
			content = content.replace(
				new RegExp(`${START_MARK}[\\s\\S]*?${END_MARK}`, 'g'),
				newBlock
			);
		} else {
			content += `\n\n${newBlock}`;
		}
	} else {
		content = newBlock;
	}

	fs.mkdirSync(path.dirname(TYPES_OUTPUT), { recursive: true });
	fs.writeFileSync(TYPES_OUTPUT, content);
	console.log(`✅ Updated EnvKey types in ${TYPES_OUTPUT}`);
}

function updateClientEnvFile(content: string) {
	fs.mkdirSync(path.dirname(CLIENT_ENV_OUTPUT), { recursive: true });
	fs.writeFileSync(CLIENT_ENV_OUTPUT, content);
	console.log(`✅ Updated publicEnv in ${CLIENT_ENV_OUTPUT}`);
}

function run() {
	const allKeys = ENV_FILES.flatMap(file =>
		extractEnvKeys(path.resolve(file))
	);
	updateTypesFile(generateTypes(allKeys));
	updateClientEnvFile(generateClientEnv(allKeys));
}

run();

chokidar.watch(ENV_FILES).on('change', filePath => {
	console.log(`🔄 Change detected in ${filePath}`);
	run();
});
