import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/static/",
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
    sourcemap: true,
  }, 
  plugins: [react()],
  test: {
    environment: "jsdom",
  }
})
