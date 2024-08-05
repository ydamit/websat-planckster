/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.cjs");

/** @type {import("next").NextConfig} */
const config = {
    transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core', 'superjson'],
};

export default config;
