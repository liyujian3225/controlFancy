import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//环境变量的使用(https://cn.vitejs.dev/guide/env-and-mode.html#env-files)
//Vite暴露给客户端源码的环境变量对象为import.meta.env，不支持动态设置，在引用它们时请使用完全静态的字符串。
//它包含了一些所有情况下都可以使用的内建变量
//它还将替换出现在 JavaScript 和 Vue 模板中的字符串 import.meta.env.*
//它还支持在 HTML 文件中替换环境变量。
//为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。
//如果想要在环境变量中使用 $ 符号，则必须使用 \ 对其进行转义。


const app = createApp(App)

//引入ElementPlus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
app.use(ElementPlus, {
  locale: zhCn,
});

//引入状态管理器
import { createPinia } from 'pinia'
app.use(createPinia());

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios);

//引入瀑布流插件
import { VueMasonryPlugin } from 'vue-masonry';
app.use(VueMasonryPlugin);

//引入轮播图组件
import '@splidejs/vue-splide/css';
import VueSplide from '@splidejs/vue-splide';
app.use( VueSplide );

//系统实现不同分辨率下自动适应调整
import jquery from 'jquery';
import resize from './lib/resize'
window.$ = jquery;
resize();

//定义一个应用级的错误处理器，它将捕获所有由子组件上抛而未被处理的错误：
app.config.errorHandler = (err) => {
  console.log(err);
}

app.use(router)
app.mount('#app')
