# AGENTS

- Package manager: use bun (per README).
- Install: bun install
- Dev server: bun run dev (http://localhost:3000)
- Build: bun run build
- Preview prod build: bun run preview
- Lint & fix: bun run check (Biome, writes fixes)
- Format: bun run format (Biome)
- Tests: none configured. If you add Vitest, run a single test via: bun run test -t "name|pattern".

Code style (Biome + TypeScript):
- Imports: prefer named imports; keep order auto-managed (Biome organizeImports=on). No unused imports.
- Formatting: single quotes; spaces for indentation; keep Prettier off (Biome is formatter). CSS Modules enabled.
- Types: strict TS; no any; use unknown then narrow; type APIs with interfaces/types; never rely on implicit any/unknown.
- React: Functional components, PascalCase names; props typed; avoid default export unless component file exports one thing.
- Naming: camelCase variables/functions; PascalCase components/types; SCREAMING_SNAKE_CASE for env constants.
- Errors: wrap async/axios in try/catch; surface user-facing messages in UI; log minimal diagnostics in dev; never swallow errors.
- Project structure: UI in src/components, network in src/services/api.ts, reusable logic in src/hooks, types in src/types.
- Build/tooling: Rsbuild + @rsbuild/plugin-react; avoid custom webpack tweaks unless editing rsbuild.config.ts.
- Cursor/Copilot rules: none found (.cursor/ or .github/copilot-instructions.md). If added, follow them and update this file.
