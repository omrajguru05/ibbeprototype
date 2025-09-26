import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@state': path.resolve(__dirname, './src/state'),
      '@storage': path.resolve(__dirname, './src/storage'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    port: 5173,
    open: false
  },
  preview: {
    port: 5173
  }
})
