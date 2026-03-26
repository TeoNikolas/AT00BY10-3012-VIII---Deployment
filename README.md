# CI & Coveralls

[![Coverage Status](https://coveralls.io/repos/github/TeoNikolas/AT00BY10-3012-VIII---Deployment/badge.svg?branch=main)](https://coveralls.io/github/TeoNikolas/AT00BY10-3012-VIII---Deployment?branch=main)

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Approach and Implementation](#approach-and-implementation)
3. [Environment and Libraries](#environment-and-libraries)
4. [Configuration](#configuration)
5. [Commands](#commands)
6. [GitHub Actions CI](#github-actions-ci)
7. [Test Results](#test-results)
8. [Issue Reports](#issue-reports)
9. [Coverage Reports](#coverage-reports)
10. [Production Readiness Assessment](#production-readiness-assessment)
 
---

## Project Structure
 
```
Project/
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI pipeline definition
├── coverage/                         # Gitignored — generated coverage output
│   ├── lcov.info                     # LCOV data sent to Coveralls
│   └── html/                         # HTML coverage report (local browsing)
├── src/                              # Source functions under test
│   ├── .internal/                    # Internal helpers (excluded from tests & coverage)
│   ├── add.js
│   ├── at.js
│   ├──....
│   └── words.js
├── tests/                            # Vitest test suites
│   ├── array-utils.test.js
│   ├── collection-utils.test.js
│   ├── lang-utils.test.js
│   ├── number-utils.test.js
│   └── object-string-utils.test.js
├── vitest.config.js                  # Vitest + coverage configuration
├── package.json
└── README.md
```
 
---

## Approach and Implementation
 
The original library contained no tests, no linter, and no CI pipeline. The testing work was carried out in the following stages:
 
**1. Framework setup** — Vitest was chosen as the test runner because of its native ES module support, built-in coverage via V8, and first-class `lcov` output for Coveralls integration. A `vitest.config.js` was created to define coverage thresholds (60% minimum for lines, statements, functions, and branches), include only `src/**/*.js`, and exclude the `.internal/` helper folder, which contains private implementation details not intended for direct testing.

**2. CI pipeline** — A GitHub Actions workflow (`ci.yml`) was set up to run on every push and pull request. The pipeline installs dependencies with `npm ci`, runs tests with coverage via `npm run coverage`, and uploads the resulting `coverage/lcov.info` to Coveralls. The Coveralls step runs even if tests fail so that partial coverage data is always recorded.

**3. Writing tests** — Tests were written function by function and organised into five thematic files to keep the suite maintainable:
 
- `array-utils.test.js` — array manipulation functions
- `collection-utils.test.js` — collection iteration and aggregation
- `lang-utils.test.js` — type-checking and language utilities
- `number-utils.test.js` — arithmetic and numeric conversion
- `object-string-utils.test.js` — object access and string transformation
 
For each function, tests cover the happy path, boundary/edge inputs (empty arrays, zero, negative numbers, `null`, `undefined`, `NaN`, `Infinity`), and type-coercion behaviour. Where a function's behaviour on unexpected input was ambiguous, the reference implementation (Lodash) was consulted to determine the intended output.
 
**4. Issue tracking** — Every defect discovered during testing was logged as a GitHub Issue before fixing it. This produced a traceable record of all bugs found and resolved.
 
**5. Coverage thresholds** — Coverage thresholds are enforced in `vitest.config.js` at 60% for all metrics. The CI build fails if any threshold is not met, preventing coverage regression.
 
---

## Environment and Libraries
 
| Item | Version |
|---|---|
| Node.js | 22.x (CI), 24.x (local dev) |
| npm | 10+ |
| Vitest | latest |
| @vitest/coverage-v8 | latest |
 
**Runtime dependencies:** none (pure utility library)
 
**Development dependencies:**
 
| Package | Purpose |
|---|---|
| `vitest` | Test runner and coverage orchestration |
| `@vitest/coverage-v8` | V8-based coverage provider |
 
**Tested on:** Windows 11 and Linux (CI: ubuntu-latest)

## Configuration
 
### Vitest (`vitest.config.js`)
 
```js
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
```

Key decisions:
- **`provider: 'v8'`** — uses Node's built-in V8 coverage for zero-dependency instrumentation.
- **`reporter: ['text', 'lcov', 'html']`** — text for CI console output, `lcov` for Coveralls, `html` for local browsing.
- **`exclude: ['src/.internal/**']`** — internal helpers are implementation details and not part of the public API surface.
- **Thresholds at 60%** — set as a floor to catch obvious gaps without being so strict that they block incremental development.
 
---

## Commands
 
```bash
# Install dependencies
npm install
 
# Run all tests
npm test
 
# Run tests with coverage report
npm run coverage
 

```
 
---

## GitHub Actions CI
 
**Workflow file:** `.github/workflows/ci.yml`  
**Triggers:** every push and every pull request (all branches)
 
### Pipeline steps
 
| Step | Description |
|---|---|
| Checkout | Checks out the repository at the triggering commit |
| Setup Node.js 22.x | Installs Node with npm cache enabled |
| `npm ci` | Clean install from `package-lock.json` |
| `npm run coverage` | Runs Vitest with V8 coverage; fails if thresholds not met |
| Coveralls upload | Sends `coverage/lcov.info` to Coveralls; runs even if tests fail (`fail-on-error: true` still reports the result) |
 
### Workflow screenshots
 
 
![Test_fail](img/Test_fail.png)
![Test_pass](img/Test.pass.png)
![Workflow-pic1](img/workflow-1.png)
![Workflow-pic2](img/workflow-2.png)
 
---

## Test Results

### Running the tests
 
```bash
npm test
```

Tests are split into five files, each grouping related functions.
![Test_pass](img/Test_pass.png)
Passing tests after fixes
 
---

## Issue Reports
![Test_fail](img/Test_fail.png)
Failing tests before fixes


---

## Coverage Reports
 
### Running coverage locally
 
```bash
npm run coverage
```
 
This runs Vitest with the V8 provider and outputs:
- A text summary to the console
- `coverage/lcov.info` for Coveralls
- `coverage/html/` for browsing locally

---
## Production Readiness Assessment

### Risks remaining
 
Branch coverage is the main remaining concern. Some conditional paths in the source functions are not exercised by the current test suite. This means unusual or malformed inputs could still produce unexpected results in production. The `.internal/` helper functions are exercised indirectly through the public API, but any bugs isolated to those helpers would not be caught by the current tests.