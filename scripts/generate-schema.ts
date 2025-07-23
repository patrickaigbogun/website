import * as fs from 'fs';
import * as path from 'path';

const SCHEMA_DIR = path.resolve('schemas/orm');
const INDEX_FILE = path.join(SCHEMA_DIR, 'index.ts');

function generateSchemaIndex() {
	console.log('🔄 Generating schema index...');

	// Read all .ts files in schema directory (excluding index.ts)
	const files = fs
		.readdirSync(SCHEMA_DIR)
		.filter(file => file.endsWith('.ts') && file !== 'index.ts')
		.sort();

	if (files.length === 0) {
		console.log('❌ No schema files found');
		return;
	}

	// Generate export statements
	const exports = files
		.map(file => {
			const moduleName = file.replace('.ts', '');
			return `export * from "./${moduleName}";`;
		})
		.join('\n');

	// Write to index.ts
	const content = `// Auto-generated file. Do not edit manually.\n// Run 'pnpm gen:schema' to regenerate.\n\n${exports}\n`;

	fs.writeFileSync(INDEX_FILE, content);

	console.log(`✅ Generated exports for ${files.length} schema files:`);
	files.forEach(file => console.log(`   - ${file}`));
}

// Run the generator
generateSchemaIndex();
