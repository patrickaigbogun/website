// config/env/index.ts

/**
 * x-env configuration
 * Edit this to match your environment structure
 */

// You can type this if you want using:
import { defineConfig } from '@patrickaigbogunoti/x-env';

export default defineConfig({
	publicPrefix: ['NEXT_PUBLIC_'],
	env: ['.env', '.env.local', '.env.production'],
	generated: 'types/env/index.ts',
	entryPoints: ['next.config.ts'],
});
