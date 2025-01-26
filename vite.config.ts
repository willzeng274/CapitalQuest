import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // allow all hosts
  server: {
    allowedHosts: ['rnqqp-2620-101-f000-7c0--2a6f.a.free.pinggy.link'],
  },
})
