# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application built with Rsbuild (a modern build tool). Despite the name "laravel-web-tinker", this is currently a frontend-only React project with no Laravel backend components.

## Development Commands

**Package manager**: This project uses `bun`

- **Start development server**: `bun run dev` (start development server at http://localhost:3000)
- **Build for production**: `bun run build`
- **Preview production build**: `bun run preview`
- **Lint and format**: `bun run check` (runs Biome linter with auto-fix)
- **Format only**: `bun run format`

## Code Quality Tools

- **Linter/Formatter**: Biome (configured in `biome.json`)
  - Uses single quotes for JavaScript
  - 2-space indentation
  - Auto-organizes imports
  - CSS modules support enabled

## Architecture

- **Build tool**: Rsbuild with React plugin
- **TypeScript**: Strict mode enabled with ES2020 target
- **Module system**: ESNext with bundler resolution

## Key Configuration Files

- `rsbuild.config.ts`: Build configuration
- `biome.json`: Linting and formatting rules
- `tsconfig.json`: TypeScript compiler options with strict checking

## The NEVER DOs

- NEVER edit the package.json directly - if you need to add a package, use `bun add <package_name>`
- NEVER run `bun run dev` or `bun run build` by yourself. Always reach out to the user for assistance.

## The ALWAYS DOs
- You have access to powerful research helper tools, such as Context7, Ref and Firecrawl. Use them proactively.
- You have access to Playwright with Vision that you can use to monitor the current state of the website.
- ALWAYS format the code as the final step using `bun run check`
- ALWAYS make Git commits after every meaningful change.
