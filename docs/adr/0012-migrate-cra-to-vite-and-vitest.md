# 0012. Migrate Build Tooling from Create React App to Vite and Vitest

## Status
Accepted

## Context
The frontend was originally scaffolded with `create-react-app` (`react-scripts 5.0.1`), which was officially deprecated by the React core team. Staying on CRA introduced multiple technical debts:
- Over 1,200 obsolete packages in the dependency tree, producing unfixable security audit warnings (e.g., abandoned `babel-preset-react-app`).
- Monolithic Webpack bundling with slow build times (~15 to 20 seconds) and sluggish Hot Module Replacement (HMR).
- ESLint configuration was embedded inside `package.json`, cluttering the project manifest and making toolchain upgrades difficult.

## Decision
1. **Adopt Vite**: Remove `react-scripts` completely and migrate to **Vite** using `@vitejs/plugin-react` for blazing-fast ESM-based bundling.
2. **Native ESM HTML Entry**: Move `public/index.html` to root `frontend/index.html` with modern script module loading (`/src/index.jsx`).
3. **Adopt Vitest**: Replace Jest with **Vitest** for native, fast unit and integration testing while keeping full `@testing-library/react` compatibility.
4. **Decouple ESLint**: Extract all ESLint configurations from `package.json` into a standalone `frontend/.eslintrc.json` file.
5. **Standard Output**: Set output directory to `dist` (`frontend/vite.config.js` and `frontend/vercel.json`), aligning with standard Vite hosting conventions.

## Consequences
- **Positive**: Production build time dropped from ~15 seconds to **1.0 second** (~15x speedup).
- **Positive**: Removed ~1,250 legacy packages, cutting nearly 8,000 lines of bloat from `package-lock.json` and eliminating deprecated CRA warnings.
- **Positive**: Full test suite (41 tests across 10 suites) runs in **~3.3 seconds** with native Vitest.
- **Positive**: Development server startup and Hot Module Replacement (HMR) are instantaneous (<50ms).
- **Positive**: `package.json` is clean and focused solely on dependencies and scripts.
- **Negative**: Files containing JSX elements must use the standard `.jsx` extension to satisfy Vite's ESM parser.
