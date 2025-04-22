import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [ // 配置 @ 指代 src
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  productionSourceMap: false,
  css: {
    // loaderOptions: {
    //   less: {
    //     javascriptEnabled: true,
    //   },
    // },
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/theme/index.less')}";`
        // rewriteUrls: 'all',
        // math: "always",
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("less")
      .oneOf("vue")
      .use("style-resource")
      .loader("style-resources-loader")
      .options({
        patterns: [path.resolve(__dirname, "./src/theme/index.less")],
      });
  },
  build: {
    outDir: '../resources',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    brotliSize: false,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境去除console及debug
        drop_console: false,
        drop_debugger: true,
      },
    },
  },
})