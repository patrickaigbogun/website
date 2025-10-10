import type { NextConfig } from 'next';
import { withNextVideo } from 'next-video/process';

const nextConfig: NextConfig = {
	// Skip ESLint checks during `next build` to avoid blocking pushes/builds.
	// You can re-enable linting locally with your editor or run `npm run lint`.
	eslint: {
		ignoreDuringBuilds: true,
	},
	async rewrites() {
		return [
			{
				source: '/blog/:path*',
				destination: '/blog/:path*', // Keep the destination internal
			},
			{
				source: '/:path*',
				destination: '/blog/:path*', // Redirect everything else to /blog
				has: [
					{
						type: 'host',
						value: 'www.blog.patrickaigbogun.me',
					},
				],
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				port: '',
			},
		],
	},
};

export default withNextVideo(nextConfig);
