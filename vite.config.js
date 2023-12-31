import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' //可以直接在script标签上定义name
import AutoImport from 'unplugin-auto-import/vite'  //日常项目中定义变量需要引入ref,reactive等等比较麻烦，可以通过unplugin-auto-import给我们自动引入

//node环境变量：process对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。
//process.env属性返回一个包含用户环境信息的对象。
//在node环境中，当我们打印process.env时，发现它并没有NODE_ENV这一个属性。
//process.env.NODE_ENV是在package.json的scripts命令中注入的
console.log(process.env.NODE_ENV)

export default defineConfig({
  plugins: [
    vue({reactivityTransform: true}),  //开启ref转换
    VueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
    })
  ],
  server: {
    host: "localhost",
    port: 3000,
    open: true,   //自动打开
    base: "./ ",  //开发或生产环境服务的公共基础路径
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://71.137.1.162:8000/api/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '^/auth': {
        target: 'http://71.137.1.162:8000/auth/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/auth/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
