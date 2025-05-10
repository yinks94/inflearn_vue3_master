import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components/app'],
      dts: true,
    }),
    vueDevTools(),
  ],
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
