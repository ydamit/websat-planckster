const config = {
    clearMocks: true,
    coverageProvider: "v8",
    preset: "ts-jest/presets/js-with-ts",
    setupFiles: ["dotenv/config"],
    transform: {
        "^.+\\.mjs$": "ts-jest",
        "node_modules/@t3-oss/env-nextjs/.+\\.(j|t)sx?$": "ts-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!@t3-oss/env-nextjs/.*)"
    ],
    moduleNameMapper: {
        "^~/(.*)$": ["<rootDir>/src/$1"],
        "^@/sdk/(.*)$": ["<rootDir>/src/sdk/$1"],
        "^@/app/(.*)$": ["<rootDir>/src/app/$1"],
    }
};

export default config;