import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/or5/',
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace('/^\/api/','') 
        }
      }
    }
  }
})