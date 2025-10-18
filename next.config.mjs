/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-app.lndo.site',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
