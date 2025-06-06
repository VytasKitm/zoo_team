import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname),
  publicDir: 'public',
  plugins: [react()],
})
