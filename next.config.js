/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "5.imimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "effilo.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "daisyui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
