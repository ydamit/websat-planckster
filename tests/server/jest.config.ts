import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    preset: "ts-jest/presets/js-with-ts",
    coverageProvider: 'v8',
    testEnvironment: 'node',
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^~/(.*)$': ['<rootDir>/../../src/$1'],
        '^@/sdk/(.*)$': ['<rootDir>/../../src/sdk/$1'],
        react: 'next/dist/compiled/react/cjs/react.development.js',
    },

    transformIgnorePatterns: [
        "node_modules/(?!(@t3-oss/env-core|@t3-oss/env-nextjs|superjson)/)",
    ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)