/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cover-letter",
        destination: "/ai-cover-letter",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
