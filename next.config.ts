import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.vercel.app;",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "curtainz.ai",
      },
      {
        protocol: "https",
        hostname: "curtainz-ae.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
