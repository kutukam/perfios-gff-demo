import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Served from https://kutukam.github.io/perfios-gff-demo/, so assets need that
   prefix. `base` applies to the production build only — dev stays at "/". */
export default defineConfig({
  base: process.env.VITE_BASE ?? "/perfios-gff-demo/",
  plugins: [react()],
});
