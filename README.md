# 🚀 Laravel Web Tinker Pro

[![Latest Version on Packagist](https://img.shields.io/packagist/v/luminarix/laravel-web-tinker-pro.svg?style=flat-square)](https://packagist.org/packages/luminarix/laravel-web-tinker-pro)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/luminarix/laravel-web-tinker-pro/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/luminarix/laravel-web-tinker-pro/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/luminarix/laravel-web-tinker-pro/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/luminarix/laravel-web-tinker-pro/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/luminarix/laravel-web-tinker-pro.svg?style=flat-square)](https://packagist.org/packages/luminarix/laravel-web-tinker-pro)

> **Minimal PHP tinker, redesigned.** A modern, feature-rich web-based PHP code execution environment built with React
> 19, TypeScript, and Monaco Editor.

Laravel Web Tinker Pro transforms the traditional command-line PHP tinker experience into a powerful, browser-based IDE.
Execute PHP code instantly, manage multiple sessions with advanced tabbing, and enjoy a seamless development workflow
with intelligent code completion, syntax highlighting, and execution history.

---

## ✨ Features at a Glance

### 🎯 **Core Functionality**

- **Instant PHP Execution**: Run PHP code directly in your browser with real-time output
- **Multi-Tab Management**: Work with multiple code snippets simultaneously with smart tab overflow handling
- **REPL Mode**: Persistent execution state across multiple code runs
- **Execution History**: Track, pin, and compare your code executions with detailed metadata

### 🎨 **Modern User Experience**

- **Monaco Editor Integration**: Full-featured code editor with PHP syntax highlighting and autocompletion
- **Dual Theme Support**: Light and dark themes with optional background patterns
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smart Split View**: Resizable code editor and output panels

### 🔧 **Advanced Tab Management**

- **Drag & Drop Reordering**: Organize tabs with intuitive drag-and-drop
- **Tab Actions**: Pin, lock, duplicate, and search functionality
- **Overflow Management**: Smart tab overflow with searchable dropdown
- **Tab List Modal**: Full-screen tab management with filtering
- **Keyboard Shortcuts**: Cmd/Ctrl+Enter to execute code instantly
- **AI content summary (BYOK)**: Generate AI summaries for code snippets with a single click (work in progress)

### 📊 **Intelligent Output Handling**

- **HTML Output Detection**: Automatic detection and safe rendering of HTML content
- **Execution Metrics**: Runtime, memory usage, and output size tracking
- **Output Copying**: One-click copy functionality for all outputs

### 🔄 **State Management**

- **Persistent Storage**: Automatic saving of tabs, themes, and preferences
- **Code Sharing**: Generate shareable URLs for code snippets (work in progress)
- **Session Recovery**: Restore your work exactly where you left off

---

## 🎮 Frontend Features Deep Dive

### 🗂 **Advanced Tab System**

<details>
<summary><strong>Multi-Tab Management</strong></summary>

Our sophisticated tab system supports:

- **Dynamic Tab Creation**: Add unlimited tabs for different code snippets
- **Smart Naming**: Auto-generated names with manual renaming support (50 char limit)
- **Tab States**: Active, pinned, and locked states for better organization
- **Overflow Handling**: Smart tab overflow with searchable dropdown when space is limited
- **Tab Actions**: Full CRUD operations with intuitive UI controls

</details>

<details>
<summary><strong>Drag & Drop Support</strong></summary>

Built with `@dnd-kit/core` for:

- **Tab Reordering**: Drag tabs to reorganize your workspace
- **Visual Feedback**: Real-time drag indicators and hover states
- **Lock Protection**: Locked tabs cannot be reordered and edited

</details>

### 💻 **Monaco Editor Integration**

<details>
<summary><strong>Custom PHP Language Support</strong></summary>

**PHP-Inline Language Definition**:

- **Syntax Highlighting**: Full PHP tokenization without `<?php` tags
- **Code Completion**: 200+ built-in PHP functions with signatures
- **Hover Documentation**: Instant function documentation and parameter info
- **Signature Help**: Real-time parameter hints as you type

**Editor Features:**

- **Completion**: Smart code completion for PHP functions, constants, and keywords
- **Bracket Matching**: Automatic bracket pair colorization and guides
- **Minimap**: Code overview for easy navigation

</details>

<details>
<summary><strong>Output Rendering System</strong></summary>

- **HTML Detection**: Intelligent content type detection
- **Safe Rendering**: DOMPurify integration for XSS protection
- **Fallback Handling**: Plain text rendering for non-HTML content
- **REPL Mode**: Multi-cell execution with persistent state
- **Execution Stats**: Runtime, memory, and output size display
- **History Integration**: Quick access to execution history
- **Copy Functionality**: One-click output copying

</details>

### 🎨 **Theme & Styling System**

<details>
<summary><strong>Adaptive Theming</strong></summary>

- **Dual Themes**: Light and dark mode with system preference detection
- **Background Patterns**: Optional grid patterns for enhanced visual appeal
-

</details>

### 📱 **Responsive Design**

<details>
<summary><strong>Mobile-First Architecture</strong></summary>

**Responsive Components:**

- **Header.tsx**: Mobile hamburger menu with full desktop functionality
- **TabManager.tsx**: Mobile-optimized tab display with overflow handling
- **Split Panels**: Responsive layout that adapts to screen size
- **Touch Support**: Full touch gesture support for mobile devices

</details>

---

## 🚀 Installation & Setup

### Quick Start

```bash
# Install the package
composer require luminarix/laravel-web-tinker-pro
```

### Then, publish the configuration and assets:

```bash
# Install the package
php artisan laravel-web-tinker-pro:install
```

### Default route and considerations
By default, the package will be available at `/tinker-pro`. You can change this by modifying the `web-tinker-pro.php` config file.
By default, the route will only be accessible from the local environment. You can override this behavior by creating your own Gate:

```php
Gate::define('viewWebTinkerPro', function ($user = null) {
    // Your custom logic here
});
```

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📝 Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

---

## 👥 Credits

- [Luminarix Labs](https://github.com/luminarix)
- [Spatie for the original Web Tinker](https://github.com/spatie/laravel-web-tinker)
- [All Contributors](../../contributors)

---

## 📄 License

Laravel Web Tinker Pro is open-sourced software licensed under the [MIT license](LICENSE.md).

---

<div align="center">

**Built with ❤️ by [Luminarix Labs](https://github.com/luminarix)**

[⭐ Star this repo](https://github.com/luminarix/laravel-web-tinker-pro) • [🐛 Report Bug](https://github.com/luminarix/laravel-web-tinker-pro/issues) • [💡 Request Feature](https://github.com/luminarix/laravel-web-tinker-pro/issues)

</div>
