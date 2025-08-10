import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    plugins: [ pluginReact() ],
    tools: {
        rspack: {
            name: 'build',
            target: 'web',
            mode: 'production',
            ignoreWarnings: [
                // Suppress Monaco Editor dynamic require warnings
                /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
            ],
        },
    },
    html: { template: './templates/layout.html' },
    environments: {
        local: {
            output: {
                legalComments: 'none',
                assetPrefix: 'auto',
                distPath: {
                    root: '../resources',
                    css: 'dist/css',
                    font: 'dist/font',
                    js: 'dist/js',
                    jsAsync: 'dist/js/async'
                },
                cleanDistPath: true,
            },
            tools: {
                htmlPlugin(config) {
                    config.filename = 'views/local.blade.php';
                },
            },
            html: { templateParameters: { prod: false } },
            source: { define: { __PROD__: false } },
        },

        production: {
            output: {
                legalComments: 'none',
                assetPrefix: 'auto',
                distPath: {
                    root: '../resources',
                    css: 'dist/css',
                    font: 'dist/font',
                    js: 'dist/js',
                    jsAsync: 'dist/js/async'
                },
                cleanDistPath: true,
            },
            tools: {
                htmlPlugin(config) {
                    config.filename = 'views/production.blade.php';
                },
            },
            html: { templateParameters: { prod: true } },
            source: { define: { __PROD__: true } },
        },
    },
});
