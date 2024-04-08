import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-essentials-deep-dive-adv/",
  plugins: [react()],
})
