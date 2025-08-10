# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Laravel Web Tinker is a React-based web application that provides an online PHP code editor and execution environment,
similar to Laravel's tinker command but in a browser interface. The project uses modern React patterns with TypeScript,
Monaco Editor for code editing, and a mock backend for PHP code execution.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (http://localhost:3000)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Format and lint code with Biome
bun run format
bun run check
```

## Architecture

### Core Structure

- **Frontend**: React 19 with TypeScript, using hooks for state management
- **Build Tool**: Rsbuild with React plugin
- **Code Editor**: Monaco Editor with custom PHP-inline language support
- **Styling**: CSS with custom properties for theming
- **State**: Local state with IndexedDB persistence

### Key Components

- `App.tsx` - Main application orchestrating tabs, themes, and execution flow
- `CodeEditor.tsx` - Monaco Editor wrapper with PHP syntax highlighting and custom language features
- `TabManager.tsx` - Multi-tab interface for managing multiple code snippets
- `OutputPanel.tsx` - Displays PHP execution results and errors
- `Header.tsx` - Toolbar with run, share, and theme controls
- `HistoryModal.tsx` - Execution history management with pin/compare functionality
- `DiffModal.tsx` - Side-by-side diff viewer using Monaco's DiffEditor
- `InputModal.tsx` - Generic input modal for user prompts
- `OutputRenderer.tsx` - Smart output renderer that handles both plain text and HTML content

### Custom Monaco Configuration

The project includes a custom PHP-inline language definition (`src/monaco/php-inline.ts`) that provides:

- PHP syntax highlighting without requiring opening `<?php` tags
- Code completion for PHP functions and Laravel-specific helpers
- Hover documentation and signature help
- Custom tokenization rules for inline PHP execution

### State Management

- Uses React hooks (`useState`, `useCallback`, `useEffect`) for local state
- Custom hooks: `useCodeExecution` and `useCodeSharing`
- IndexedDB persistence for tabs, active tab, theme, and background pattern preferences
- URL-based code sharing with `?share=` parameter
- Per-tab execution history with pinning support
- REPL state management for multi-cell execution contexts

### Mock Backend

The `src/services/api.ts` file contains mock implementations that simulate:

- PHP code execution with realistic delays and responses
- Code sharing via IndexedDB (for development)
- Error simulation for testing (use `syntax_error` or `runtime_error` in code)

## Key Features

- Multi-tab code editing with persistent state
- Light/dark theme switching with background pattern toggle
- Code execution with simulated PHP output
- Code sharing via URL generation
- HTML output rendering with automatic detection and safe sanitization
- Execution history tracking with pin/compare functionality
- Side-by-side diff comparison of code versions
- Tab management with drag-and-drop reordering
- Keyboard shortcuts (Cmd/Ctrl+Enter to run code)
- Responsive split-pane layout

## Development Notes

- The project uses Biome for formatting and linting with single quotes preference
- TypeScript strict mode enabled
- Monaco Editor warnings are suppressed in Rsbuild configuration
- All components use React.FC typing pattern
- IndexedDB keys are centralized in database.ts
- Utility functions for number operations, platform detection, and formatting are in `src/utils/`
- DND Kit library used for drag-and-drop functionality in tab management
