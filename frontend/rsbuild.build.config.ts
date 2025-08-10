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
                assetPrefix: '/vendor/web-tinker-pro',
                distPath: {
                    root: '../resources/dist',
                    js: 'js',
                    jsAsync: 'js/async',
                    css: 'css',
                    cssAsync: 'css/async',
                    font: 'font',
                },
                cleanDistPath: true,
                legalComments: 'none',
            },
            tools: {
                htmlPlugin(config) {
                    config.filename = '../views/local.blade.php';
                },
            },
            html: { templateParameters: { prod: false } },
            source: { define: { __PROD__: false } },
        },

        production: {
            output: {
                assetPrefix: '/vendor/web-tinker-pro',
                distPath: {
                    root: '../resources/dist',
                    js: 'js',
                    jsAsync: 'js/async',
                    css: 'css',
                    cssAsync: 'css/async',
                    font: 'font',
                },
                cleanDistPath: true,
                legalComments: 'none',
            },
            tools: {
                htmlPlugin(config) {
                    config.filename = '../views/production.blade.php';
                },
            },
            html: { templateParameters: { prod: true } },
            source: { define: { __PROD__: true } },
        },
    },
});
