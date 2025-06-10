import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 添加这一行来导入 path 模块
//引入腾讯组件库
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  // 引入腾讯组件库
  AutoImport({
    resolvers: [TDesignResolver({
      library: 'mobile-vue'
    })],
  }),
  Components({
    resolvers: [TDesignResolver({
      library: 'mobile-vue'
    })],
  }),
  ],
  //
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
