# External Integrations

**Analysis Date:** [YYYY-MM-DD]

## APIs & External Services

**Push Notifications:**
- OneSignal - Push notifications for client browsers
  - SDK/Client: `react-onesignal`
  - Auth: `APP_CONFIG_ONE_SIGNAL_ID` (env var)

**Rich Text Editor:**
- TinyMCE - WYSIWYG Editor
  - SDK/Client: `@tinymce/tinymce-react` (with static assets stored in `public/tinymce`)

**Captcha:**
- Google ReCaptcha - Form protection
  - SDK/Client: `react-recaptcha`, `react-recaptcha-google`

## Data Storage

**Databases:**
- External Backend API (PostgreSQL / Sequelize via API)
  - Connection: Proxied via backend endpoints (`APP_CONFIG_IP_ROOT` injected into `ipSlink`, `ipNotif` in `src/utils/ip.ts`)
  - Client: `axios` interceptors (`src/utils/axios.ts`) handle API communications and Sequelize validation error catching.

**File Storage:**
- Internal Backend API
  - Upload handling via `/file` endpoint (`src/services/uploadFile.ts`).
  - Implements Access Scopes: Public, Internal, Private.

**Caching:**
- LocalStorage - Used heavily for client-side state caching (e.g., `token`, `refreshToken` in `src/utils/axios.ts`, `dataTimKiem` for table filters in `src/components/Table/index.tsx`, `data` for offline form saving).

## Authentication & Identity

**Auth Provider:**
- Keycloak (OIDC)
  - Implementation: `react-oidc-context` wrapped via `src/components/OIDCBounder/index.tsx`.
  - Configured in `src/utils/oidcConfig.ts` mapping values from `src/utils/ip.ts`.
  - Tokens (`access_token`, `refresh_token`) cached in `localStorage`.

## Monitoring & Observability

**Error Tracking:**
- Sentry
  - Integration: `@sentry/react` implemented inside custom ErrorBoundary (`src/components/ErrorBoundary/index.tsx`).
  - Config: `APP_CONFIG_SENTRY_DSN` assigned to `sentryDSN`.

**Logs:**
- Standard console logging. Debug logs specifically established for `socket.io` connections in `src/utils/socket.ts`.

## CI/CD & Deployment

**Hosting:**
- Custom Ubuntu Server (`slink.ptit.edu.vn`) via raw static web serving.

**CI Pipeline:**
- None detected (Deployment is handled via yarn scripts `deploy` / `deploy-win` invoking `rsync` over SSH).

## Environment Configuration

**Required env vars:**
- `APP_CONFIG_IP_ROOT`
- `APP_CONFIG_KEYCLOAK_AUTHORITY`
- `APP_CONFIG_PREFIX_OF_KEYCLOAK_CLIENT_ID`
- `APP_CONFIG_SENTRY_DSN`
- `APP_CONFIG_ONE_SIGNAL_ID`

**Secrets location:**
- `.env` file (local development root).

## Webhooks & Callbacks

**Incoming:**
- WebSocket Connections via Socket.IO
  - Endpoint: `https://dhs.aisenote.com/socket.io` (or `dhs.ptit.edu.vn`)
  - Purpose: Pushing real-time application states (e.g., `TRANG_THAI_THI`, `DINH_CHI`) instantiated in `src/utils/socket.ts`.

**Outgoing:**
- None

---

*Integration audit: [YYYY-MM-DD]*