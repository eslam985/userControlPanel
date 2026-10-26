import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// ... الاستيرادات السابقة كما هي

export default defineConfig({
  server: {
    host: true, // بيخلي السيرفر يستقبل اتصالات من الشبكة الخارجية (LAN)
  },
  plugins: [
    tailwindcss(), // 💡 يجب أن تكون الأولى هنا
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
