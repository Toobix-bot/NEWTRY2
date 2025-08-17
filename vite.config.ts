import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// If deploying to GitHub Pages project site, set base to '/NEWTRY2/'.
// You can override via VITE_BASE env if needed.
const base = process.env.VITE_BASE ?? '/NEWTRY2/';

export default defineConfig({
  plugins: [svelte()],
  base,
  server: {
    port: 5174,
    strictPort: true,
    host: true,
    open: true,
  },
});
