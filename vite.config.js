import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: process.env.GITHUB_ACTIONS ? '/daniel-popa-portfolio/' : '/',
  plugins: [react()],
  build: isSsrBuild
    ? // Server bundle for the prerender step (scripts/prerender.mjs)
      { outDir: 'dist-ssr', emptyOutDir: true }
    : {
        rollupOptions: {
          // Portfolio (React) + the static privacy page
          input: {
            main: resolve(import.meta.dirname, 'index.html'),
            datenschutz: resolve(import.meta.dirname, 'datenschutz/index.html'),
          },
        },
      },
}))
