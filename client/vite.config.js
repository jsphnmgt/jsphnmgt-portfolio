import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE_PATH is set by the Pages workflow to "/<repository-name>/", because
// a GitHub project page is served from a subfolder, not the root of the domain.
// Everywhere else (local dev, Vercel, Netlify, a custom domain) the root is
// correct, so the default is "/".
export default defineConfig({
  plugins: [react()],
  // Keep the shared asset lookup small; images and SVGs cache independently.
  build: { assetsInlineLimit: 0 },
  base: process.env.VITE_BASE_PATH || '/',
})
