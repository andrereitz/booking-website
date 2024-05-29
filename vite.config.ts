/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { coverageConfigDefaults } from 'vitest/config'
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      exclude: ['src/App.tsx', 'src/main.tsx', 'src/data/*', 'postcss.config.js', 'tailwind.config.js', ...coverageConfigDefaults.exclude]
    }
  },
})