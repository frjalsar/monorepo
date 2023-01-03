import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'build' && mode === 'test') {
    console.log('building test')
    console.log(process.env.RENDER_GIT_BRANCH)
    console.log(process.env.VITE_FRI_API_URL)
  }

  return {
    plugins: [vue()],
    server: {
      port: 3001
    },
    define: {
      VITE_TEST: process.env.RENDER_GIT_BRANCH,
      TEST: process.env.RENDER_GIT_BRANCH
    }
  }
})
