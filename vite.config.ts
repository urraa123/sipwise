import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webfontDownload from "vite-plugin-webfont-dl";

// base "./" lets the built site work from any folder or sub-path (GitHub Pages, Netlify, your own hosting).
export default defineConfig({
  plugins: [react(), webfontDownload() /* Google Fonts are downloaded at build time and served from this site */],
  base: "./",
});
