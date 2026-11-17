import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // im Netzwerk erreichbar (0.0.0.0)
    port: 5173,
    strictPort: true,  // bricht ab, statt auf einen anderen Port auszuweichen
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Port deines Backends anpassen
        changeOrigin: true,
      },
    },
  },
});