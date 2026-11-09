/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  devIndicators: false,
  env: {
    // Resolved once at build time so prerendered pages never read the clock.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
