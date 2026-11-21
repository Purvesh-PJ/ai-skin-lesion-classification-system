# 0011. Feature-First Modular Monolith Frontend Architecture

## Status
Accepted

## Context
As the frontend expanded, the codebase suffered from a flat, disorganized structure:
- Components were scattered across generic top-level folders (`/components`, `/views`, `/shared`) with deep, fragile relative import paths (`../../components/...`).
- Business logic, API calls, and UI markup were coupled within individual components.
- Tests lived in a detached `src/__tests__/` directory, far from the code they tested. This made it easy to leave tests outdated when refactoring or leave orphaned tests behind when deleting components.
- Developers frequently wrote native HTML elements (`<button>`, custom alert divs, raw badge spans) instead of reusing the project's design system primitives.

## Decision
Restructure the frontend into a **Feature-First / Domain-Driven Modular Monolith**:
1. **Domain Features (`src/features/`)**: Group code by business capability (`history`, `image-picker`, `prediction`, `system-health`). Each feature encapsulates its own `components/`, `api/`, `hooks/`, and public barrel export (`index.js`).
2. **Page Containers (`src/pages/`)**: House route-level views (`Dashboard`, `Landing`, `NotFound`) that assemble features into complete pages.
3. **Design System Primitives (`src/components/ui/`)**: Centralize base UI primitives (`Button`, `Card`, `Badge`, `Alert`, `Input`, `Dropdown`, `Container`, `SectionHeading`) and strictly enforce them across all components using ESLint (`no-restricted-syntax`).
4. **Test Colocation**: Place unit and integration tests directly inside a `__tests__/` folder inside the corresponding feature or page module.

## Consequences
- **Positive**: High cohesion and clear boundaries—modifying a feature is localized entirely within one self-contained directory.
- **Positive**: Moving, refactoring, or deleting a feature automatically moves or deletes its tests and API logic with zero orphaned files.
- **Positive**: Centralized UI primitives are consistently used throughout the app, eliminating one-off traditional markup.
- **Negative**: Requires contributors to adhere to strict import conventions (consuming features via their top-level `index.js` barrels rather than deep internal paths).
