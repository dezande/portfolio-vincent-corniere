import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages sert le site sous /portfolio-vincent-corniere/ ; en local on reste à la racine.
  base: command === 'build' ? '/portfolio-vincent-corniere/' : '/',
}))
