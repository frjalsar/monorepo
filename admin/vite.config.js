import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // render specific
  if (process.env.IS_PULL_REQUEST === 'true') {
    process.env.VITE_FRI_API_URL='https://'+ process.env.RENDER_GIT_BRANCH + '.' + process.env.FRI_API_HOST
  } else {
    process.env.VITE_FRI_API_URL='https://'+ process.env.FRI_API_HOST
  }

  return {
    plugins: [vue()],
    server: {
      port: 3001
    },
  }
})
