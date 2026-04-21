# Technology Stack

**Analysis Date:** [YYYY-MM-DD]

## Languages

**Primary:**
- TypeScript 4.2.2 - Core application logic (`src/**/*.ts`, `src/**/*.tsx`)

**Secondary:**
- Less - Styling (`src/**/*.less`)
- JavaScript - Configurations and E2E tests (`e2e/**/*.js`, `config/**/*.js`)

## Runtime

**Environment:**
- Node.js 16.x

**Package Manager:**
- yarn 1.x
- Lockfile: present (`yarn.lock`)

## Frameworks

**Core:**
- React 17.0.0 - UI Library
- Umi ~3.5.0 - Enterprise React Framework (routing, building)
- Ant Design 4.21.0 / Pro Layout ~6.15.3 - UI Component Library

**Testing:**
- Umi Test (Jest/Enzyme) - Unit testing (`umi test`)

**Build/Dev:**
- Webpack 5 - Bundler (via Umi `config/config.ts`)
- esbuild - Build tool (via Umi plugin)
- TypeScript compiler (`tsc`) - Type checking
- Husky / Lint-staged / Prettier / ESLint - Pre-commit hooks and code styling

## Key Dependencies

**Critical:**
- `axios` ^0.21.1 - HTTP Client (custom interceptors in `src/utils/axios.ts`)
- `oidc-client-ts` ^2.2.5 & `react-oidc-context` ^2.3.0 - Authentication (Keycloak)
- `socket.io-client` ^4.5.3 - Real-time websocket communication (`src/utils/socket.ts`)

**Infrastructure:**
- `@sentry/react` ^7.65.0 - Error tracking
- `react-onesignal` ^2.0.4 - Push notifications
- `@tinymce/tinymce-react` ^4.2.0 - Rich text editing
- `apexcharts` & `react-apexcharts` ^1.4.1 - Data visualization

## Configuration

**Environment:**
- Configured via `.env` files locally.
- Injected via Umi define plugin (`config/config.ts`) using `APP_CONFIG_` prefix.
- Require runtime config variables (e.g., `APP_CONFIG_IP_ROOT`, `APP_CONFIG_KEYCLOAK_AUTHORITY`, `APP_CONFIG_SENTRY_DSN`).

**Build:**
- `config/config.ts`, `config/defaultSettings.ts` (Umi build configurations)
- `tsconfig.json` (TypeScript compilation config)
- `commitlint.config.js` (Git commits check config)

## Platform Requirements

**Development:**
- Node.js 16.x
- Yarn

**Production:**
- Deployment target: Static files (`dist/`) hosted on a remote server (e.g. Nginx).
- The `push-rsync` scripts deploy via SSH to `ubuntu@203.162.10.113:/var/www/slink.ptit.edu.vn/`.

---

*Stack analysis: [YYYY-MM-DD]*