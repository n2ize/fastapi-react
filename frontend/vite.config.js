import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite-Konfiguration für React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
