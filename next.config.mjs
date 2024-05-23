import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          self: '(typeof self !== "undefined" ? self : {})',
        })
      );
    }
    return config;
  },
};

export default nextConfig;
