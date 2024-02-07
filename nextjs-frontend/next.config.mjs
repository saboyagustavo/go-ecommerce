/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => [
		{
			source: '/',
			destination: '/products',
			permanent: true,
		},
	],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'source.unsplash.com',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
		],
	},
};

export default nextConfig;
