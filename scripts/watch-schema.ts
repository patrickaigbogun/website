import chokidar from 'chokidar';
import { execSync } from 'child_process';
import path from 'path';

const SCHEMA_DIR = path.resolve('schemas/orm');

console.log('👀 Watching schema directory for changes...');

chokidar
	.watch(SCHEMA_DIR, {
		ignored: ['**/index.ts'], // Ignore the generated index file
		persistent: true,
	})
	.on('all', (event, path) => {
		if (event === 'add' || event === 'unlink') {
			console.log(`🔄 Schema file ${event}: ${path}`);
			console.log('📝 Regenerating schema index...');
			execSync('tsx scripts/generate-schema-index.ts', {
				stdio: 'inherit',
			});
		}
	});
