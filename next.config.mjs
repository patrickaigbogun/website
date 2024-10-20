/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
	  return [
		{
		  source: '/:path*',
		  destination: 'https://patrickaigbogun.me/blog/:path*',
		  has: [
			{
			  type: 'host',
			  value: 'blog.patrickaigbogun.me',
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
  
  export default nextConfig;
  