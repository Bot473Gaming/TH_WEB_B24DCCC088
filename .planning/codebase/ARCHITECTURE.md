# Architecture Summary
**Pattern:** Ant Design Pro / UmiJS (Model-Service-View)
- **State Management:** Uses Umi's `useModel` plugin (hooks-based state) located in `src/models/`.
- **Data Fetching:** Centralized services in `src/services/` using a customized Axios instance in `src/utils/axios.ts`.
- **Routing:** Configured in `config/routes.ts` and handled by Umi.
- **Access Control:** Defined in `src/access.ts` and enforced via `OIDCBounder` and `TechnicalSupportBounder` in `src/app.tsx`.
- **Entry Point:** `src/app.tsx` handles runtime configuration, layout rendering, and initial state fetching.