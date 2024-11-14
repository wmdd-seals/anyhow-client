import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import TSConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [React(), TSConfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom'
    },
    server: {
        port: parseInt(process.env.PORT ?? '5173')
    }
})
