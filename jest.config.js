import { createJsWithTsPreset } from 'ts-jest';
import nextJest from 'next/jest.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})


const jestConfig = {
  testEnvironment: "node",
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    ...createJsWithTsPreset().transform,
    "^.+.tsx?$": ["ts-jest",{}],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@t3-oss/env-core|@t3-oss/env-nextjs|superjson|@maany_shr/planckster-ui-kit)/)",
  ],
  moduleNameMapper: {
    "^~/(.*)$": ["<rootDir>/src/$1"],
    "^@/sdk/(.*)$": ["<rootDir>/src/sdk/$1"],
    react: 'next/dist/compiled/react/cjs/react.development.js'
  },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
export default createJestConfig(jestConfig);