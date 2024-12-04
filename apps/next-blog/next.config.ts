import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* 
  issue: https://github.com/vercel/next.js/issues/46493
  https://github.com/vercel/next.js/issues/49759
  
  ref: https://nextjs.org/docs/app/api-reference/next-config-js/serverExternalPackages
  */
  serverExternalPackages: ['bcrypt'],
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;
