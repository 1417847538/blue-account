import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vant 按需引入
    styleImport({
      resolves: [VantResolve()],
    }),
  ],

   // 配置本地代理
   server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值, /api 是在 axios 实例中配置的
        target: 'http://ab.svip52.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
    open: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
