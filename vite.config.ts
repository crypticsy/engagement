import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project page needs '/engagement/' in the built output, but
  // that same base would make `yarn dev` serve from /engagement/ instead of
  // '/' — so it only applies when actually building.
  base: command === 'build' ? '/engagement/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
