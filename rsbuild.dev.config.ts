import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      name: 'development',
      ignoreWarnings: [
        // Suppress Monaco Editor dynamic require warnings
        /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
      ],
    },
  },
  html: {
    template: './templates/layout.html',
    templateParameters: { prod: false },
  },
  source: { define: { __PROD__: false } },
});
