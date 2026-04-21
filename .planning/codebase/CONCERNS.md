# Codebase Concerns

**Analysis Date:** 2025-02-14

## Tech Debt

**Outdated Core Dependencies:**
- Issue: The project relies on outdated major versions of its core framework and libraries.
- Details: 
  - `react`: `^17.0.0` (Current is 18/19)
  - `antd`: `4.21.0` (Current is 5.x)
  - `umi`: `~3.5.0` (Current is 4.x)
- Impact: Missing out on performance improvements, new features, and long-term support. Upgrading later will be increasingly difficult due to breaking changes.
- Fix approach: Plan a staggered migration starting with React 18, then Antd 5, and finally Umi 4.

**Large Component Complexity:**
- Issue: Several files are excessively large and handle multiple responsibilities, making them harder to maintain and test.
- Files: 
  - `src/components/Table/index.tsx` (678 lines) - Handles complex table logic, filtering, and modal states.
  - `src/utils/utils.ts` (604 lines) - A "catch-all" utility file with diverse logic from regex to currency formatting.
  - `src/hooks/useInitModel.tsx` (492 lines) - Large custom hook managing model initialization.
- Impact: Increased risk of side effects when making changes; difficult to unit test.
- Fix approach: Refactor large components into smaller, focused sub-components or specialized hooks. Split `utils.ts` into domain-specific utility files.

**Placeholder Logic and Hardcoded Values:**
- Issue: Use of "xxx" as a placeholder value in constants and explicit `TODO`/`FIXME` comments left in the code.
- Files: 
  - `src/services/ThongBao/constant.ts`
  - `src/pages/ThongBao/components/OneSignalDataToPath.ts` (Unimplemented switch cases)
  - `src/pages/ThongBao/Subscribe.tsx` (Stub UI)
- Impact: Potential runtime errors or incorrect UI display if these constants are used without being updated.
- Fix approach: Replace placeholders with valid data or implement a proper fallback mechanism. Fulfill the TODOs.

## Security Issues

**Vulnerable Dependencies:**
- Risk: `yarn audit` reports **559 vulnerabilities** (52 Critical, 202 High, 237 Moderate, 68 Low) across 2741 audited packages.
- Impact: Potential exposure to known exploits such as Cross-Site Scripting (XSS), Prototype Pollution, or Denial of Service (DoS) attacks.
- Fix approach: Run `yarn upgrade-interactive` or `npm audit fix` to bump vulnerable transitive and direct dependencies.

**Direct window.close() after OneSignal Init:**
- Risk: Closing windows automatically might be blocked by browsers or lead to a poor user experience if the flow isn't clear.
- Files: `src/pages/ThongBao/Subscribe.tsx`
- Recommendations: Provide a success message or a "You can now close this window" button instead of forceful closing.

## Lack of Test Coverage

**Zero Automated Tests:**
- What's not tested: The entire application. A scan of the repository shows **0 test files** (`*.test.tsx`, `*.spec.ts`, etc.) for over 193 source files.
- Risk: Extremely high risk of regressions during refactoring or adding new features. No automated validation of core logic (like `utils.ts` complex string manipulations or `uploadFile.ts` error handling).
- Priority: Critical.
- Fix approach: Setup a test runner (Jest/Vitest) with React Testing Library and begin writing tests for utility functions and critical UI components.

## Performance Bottlenecks

**Complex Regex in Utilities:**
- Problem: The `charMap` and `render` functions in `utils.ts` perform character-by-character replacement for regex generation.
- Files: `src/utils/utils.ts`
- Cause: Normalizing Vietnamese characters for search.
- Improvement path: Consider using `Intl.Segmenter` or more optimized normalization techniques if performance becomes an issue during large-scale data processing.

---
*Concerns audit: 2025-02-14*
