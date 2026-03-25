import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.js'],
      exclude: ['src/.internal/**', '**/*.test.js'],
      thresholds: {
        lines: 60,
        statements: 60,
        functions: 60,
        branches: 60
      }
    }
  }
})
