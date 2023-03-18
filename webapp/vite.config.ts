import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [vue()],
    server: {
      port: 5000,
      strictPort: true,
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${env.SERVER_PORT}`,
          secure: false
        }
      }
    },
    build: {
      outDir: '../dist/public'
    },
    envDir: '..'
  }
})
