# Rewards Services - Project Context

This file serves as the primary instructional context for Gemini CLI when working on this repository.

## 🚀 Project Overview

- **Framework:** [NestJS](https://nestjs.com/) (v11+)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Architecture:** Modular, following NestJS best practices.
- **Database:** **PostgreSQL** (Running via Docker for development).
- **Caching/Messaging:** **Redis** (Running via Docker).

## 🛠 Infrastructure (Docker Compose)

The environment is managed via `compose.yml` and includes:

- **Redis:** Standard Redis instance on port `6379`.
- **PostgreSQL:** Standard instance on port `5432` with data stored in the `postgres_data` volume.

## 📜 Development Scripts

| Command                | Description                           |
| :--------------------- | :------------------------------------ |
| `pnpm install`         | Install all dependencies.             |
| `pnpm run start:dev`   | Launch the application in watch mode. |
| `pnpm run build`       | Compile the project for production.   |
| `pnpm run lint`        | Run ESLint with auto-fix enabled.     |
| `pnpm run format`      | Format code using Prettier.           |
| `pnpm run test`        | Execute unit tests via Jest.          |
| `pnpm run test:e2e`    | Execute end-to-end tests.             |
| `docker compose up -d` | Start Redis and PostgreSQL services.  |

## 📐 Coding Standards & Conventions

- **ESM First:** The project uses `nodenext` for module resolution.
- **Strict Typing:** Ensure all new code adheres to strict TypeScript checks.
- **Modularization:** Every new feature should be encapsulated in a dedicated module.
- **CORS:** Currently configured to allow all origins (`*`) in `main.ts` for development.
- **Persistence:** Ensure PostgreSQL data is managed through the defined Docker volumes.

## 📂 Key Directory Structure

- `src/`: Core application logic.
- `test/`: E2E and unit test suites.
- `compose.yml`: Infrastructure as code.
- `GEMINI.md`: (This file) Rules and project context.
