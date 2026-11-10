/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactCompiler: true,
  cacheComponents: true,
  devIndicators: false,
  // The only image is the static avatar; skip runtime optimization so the
  // container needs no sharp install and no image CDN.
  images: { unoptimized: true },
  env: {
    // Resolved once at build time so prerendered pages never read the clock.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
