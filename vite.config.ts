// vite.config.js

import { defineConfig } from "vite";
import { crx } from "rollup-plugin-chrome-extension";
import manifest from "./manifest.json";

export default defineConfig({
  // @ts-ignore
  plugins: [crx({ manifest })],
});
