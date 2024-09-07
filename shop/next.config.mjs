// shop/next.config.mjs

export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  basePath: '', // Modify if you have a basePath requirement
  trailingSlash: false, // Set to true if your routes should end with a slash
  poweredByHeader: false, // Hides the X-Powered-By: Next.js header

  // Added images configuration for the localhost domain and others
  images: {
    domains: ['localhost', 'littleone.life', 'shop.littleone.life'], // Add your required image domains here
  },
};
