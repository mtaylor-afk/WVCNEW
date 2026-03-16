/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@anthropic-ai/sdk", "puppeteer"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark puppeteer as external so webpack doesn't bundle it
      config.externals = [...(config.externals || []), "puppeteer"];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
