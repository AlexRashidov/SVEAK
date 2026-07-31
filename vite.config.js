import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/SVEAK/',
    root: resolve(__dirname, 'src'),
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: resolve(__dirname, 'docs'),
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                // Убираем additionalData, чтобы не было конфликтов
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});