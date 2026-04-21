# Coding Conventions

**Analysis Date:** Not provided

## Naming Patterns

**Files:**
- React components and Pages: `PascalCase` (e.g., `RandomUser/index.tsx`, `Form.tsx`).
- Utilities and Services: `camelCase` (e.g., `utils.ts`, `axios.ts`, `uploadFile.ts`).
- Entry points: Frequently use `index.tsx` or `index.ts` within a directory named after the module.

**Functions:**
- React functional components: `PascalCase` (e.g., `RandomUser`, `FormRandomUser`).
- Utility and service functions: `camelCase` (e.g., `getDataUser`, `chuanHoaObject`, `formatPhoneNumber`).

**Variables:**
- General variables: `camelCase` (e.g., `dataLocal`, `scoreValue`).

**Types:**
- Interfaces: Prefixed with `I` and `PascalCase` (e.g., `IColumn`).
- Type definitions: `PascalCase`. Namespaces are sometimes used (e.g., `RandomUser.Record`).

## Code Style

**Formatting:**
- Tool: `prettier`
- Settings: `printWidth: 120`, `tabWidth: 2`, `useTabs: true`, `semi: true`, `singleQuote: true`, `jsxSingleQuote: true`, `trailingComma: 'all'`, `arrowParens: 'always'`.

**Linting:**
- Tool: `eslint` with `@umijs/fabric` preset.
- Style linting: `stylelint` for `.less` files.
- Key disabled rules: `@typescript-eslint/no-namespace`, `@typescript-eslint/no-unused-vars`, `react-hooks/exhaustive-deps`.

## Import Organization

**Order:**
- Standard ES6 imports are used.
- Types are explicitly imported using the `import type` syntax (e.g., `import type { IColumn } from ...`).

**Path Aliases:**
- `@/*` points to `./src/*`
- `@@/*` points to `./src/.umi/*`

## Error Handling

**Patterns:**
- UI Error Handling: React Error Boundaries are implemented (`src/components/ErrorBoundary/index.tsx`).
- User Feedback: Uses Ant Design's `message.error` to show validation or upload errors (e.g., `message.error('file có dung lượng > 8Mb')`).
- Fallbacks: Utility functions safely return default values or empty strings/objects if inputs are null/undefined.

## Logging

**Framework:**
- Client-side Error Tracking: `@sentry/react` is installed for production error monitoring.
- Console: Standard `console.error` is used for basic error catching in utilities.

**Patterns:**
- Limited explicit logging in business logic. Errors caught in generic utilities are sent to the console (e.g., `console.error('Could not copy text: ', err)`).

## Comments

**When to Comment:**
- Used mainly for explaining complex regular expressions or data formatting logic.
- Vietnamese inline comments are prevalent to explain specific business rules or workarounds.

**JSDoc/TSDoc:**
- Utility functions frequently use JSDoc blocks to document parameters, return types, and behavior (e.g., in `src/utils/utils.ts`).

## Function Design

**Size:**
- Utility functions are kept small and focused on a single task (e.g., regex matching, formatting).

**Parameters:**
- Mostly explicit types. `any` is still used in several utility functions where types are highly dynamic.

**Return Values:**
- Utility functions typically return primitive values or formatted objects. Early returns are commonly used to handle `null`/`undefined` inputs.

## Module Design

**Exports:**
- Utility files use named exports (`export const ...` or `export function ...`).
- React page components typically use `export default`.

**Barrel Files:**
- Extensively used. `index.tsx` or `index.ts` files act as the public API for components and pages.
