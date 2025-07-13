// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'tailwindcss/version.js': path.resolve(__dirname, 'node_modules', 'tailwindcss', 'package.json')
    }
  }
})
