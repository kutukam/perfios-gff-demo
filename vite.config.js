import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Served from https://kutukam.github.io/perfios-gff-demo/, so the built assets need
   that prefix — but `base` applies to the dev server too, which would move it off
   "/" for no reason. Scope it to the build. */
export default defineConfig(({ command }) => ({
  base: command === "build" ? process.env.VITE_BASE ?? "/perfios-gff-demo/" : "/",
  plugins: [react()],
}));
