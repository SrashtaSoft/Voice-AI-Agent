import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/voice-widget.js',
            name: 'VoiceWidget',
            fileName: (format) => `voice-widget.${format}.js`,
            formats: ['umd', 'es']
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
});
