import { defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ _, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'FRI')
  return {
    plugins: [vue()],
    server: {
      port: 3002,
      headers: {
        'Set-Cookie': 'FRI_API=' + env.FRI_API_TOKEN + ';domain=fri.is;path=/;HttpOnly'
      }
    }      
  }
})
