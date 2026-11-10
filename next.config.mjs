/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactCompiler: true,
  cacheComponents: true,
  devIndicators: false,
  // The only image is the static avatar; skip runtime optimization so the
  // container needs no sharp install and no image CDN.
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    // Spanish and English are separate root layouts (route groups), so
    // unmatched URLs need app/global-not-found.js.
    globalNotFound: true,
  },
  env: {
    // Resolved once at build time so prerendered pages never read the clock.
    BUILD_YEAR: String(new Date().getFullYear()),
    // Build day in Montevideo, "YYYY-MM-DD"; projects with a later
    // `publishAt` (src/data/portfolio.js) are left out of this build.
    BUILD_DATE_MVD: new Intl.DateTimeFormat("en-CA", { timeZone: "America/Montevideo" }).format(new Date()),
  },
};

export default nextConfig;
