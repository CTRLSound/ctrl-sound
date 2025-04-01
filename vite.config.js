import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // NOT './' or '/ctrl-sound/'
  plugins: [react()],
})
