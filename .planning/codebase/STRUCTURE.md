# Structure Summary
- `config/`: Contains `routes.ts`, `config.ts`, and environment-specific settings.
- `src/components/`: Reusable UI components (e.g., `Table`, `Upload`, `Chart`).
- `src/models/`: Feature-specific state models (e.g., `randomuser.ts`).
- `src/pages/`: Page components organized by feature (e.g., `DanhMuc`, `ThongBao`).
- `src/services/`: API request definitions, often matching the folder structure of `pages`.
- `src/utils/`: Shared utilities including `axios.ts` for networking and `ip.ts` for endpoint configuration.
- `src/locales/`: Internationalization files for `vi-VN` and `en-US`.

**Note:** The codebase follows a strict modular structure where pages depend on models and services, which in turn use centralized utilities for communication.