import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {  
  if (command === 'build' && mode === 'test' && process.env.IS_PULL_REQUEST === 'true') {
    const pos = process.env.VITE_FRI_API_URL.indexOf('api')
    
    process.env.VITE_FRI_API_URL = process.env.VITE_FRI_API_URL.substring(0, pos) + process.env.RENDER_GIT_BRANCH + '.' + process.env.VITE_FRI_API_URL.substring(pos);
  }

  return {
    plugins: [vue()],
    server: {
      port: 3001
    }
  }
})
