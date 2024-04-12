import packageInfo from "./package.json" assert { type: "json" };

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProduction ? "export" : undefined,
  basePath: isProduction ? "/s-wave" : undefined,
  assetPrefix: isProduction ? "/s-wave" : undefined,
  transpilePackages: ["lucide-react"],

  images: {
    unoptimized: isProduction ? true : undefined,
  },

  // Override the default webpack configuration
  webpack: (config) => {
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    // See https://github.com/xenova/transformers.js/issues/440
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },

  env: {
    BUILD_TIME: formatDate(new Date()),
    VERSION: packageInfo.version,
  },

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
};

export default nextConfig;
