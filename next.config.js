/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.js");
await import("./src/lib/infrastructure/server/config/env.js");
await import("./src/lib/infrastructure/client/config/env.js");

/** @type {import("next").NextConfig} */
const config = {
    transpilePackages: ['superjson'],
};

export default config;
