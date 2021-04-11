module.exports = {
  globals: {
    'ts-jest': {
      'tsConfig': 'tsconfig.json',
    },
  },

  testEnvironment: 'node',

  moduleFileExtensions: [
    'ts',
    'js',
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },

  // Coverage
  collectCoverageFrom: [
    'src/**/*.{ts}',
    'src/**/**/*.{ts}',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 80,
      statements: -10,
    },
  },
}