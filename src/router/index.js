import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('/src/views/home/index.vue'),
    },
    {
      path: '/prepare1',
      name: 'prepare1',
      component: () => import('/src/views/prepare1/index.vue'),
    },
    {
      path: '/prepare2',
      name: 'prepare2',
      component: () => import('/src/views/prepare2/index.vue'),
    },
    {
      path: '/concentration',
      name: 'concentration',
      component: () => import('/src/views/concentration/index.vue'),
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('/src/views/carousel/index.vue'),
    },
    {
      path: '/processTermination',
      name: 'processTermination',
      component: () => import('/src/views/processTermination/index.vue'),
    },
    {
      path: '/attentionLevel',
      name: 'attentionLevel',
      component: () => import('/src/views/attentionLevel/index.vue'),
    },
    {
      path: '/exampleEffect',
      name: 'exampleEffect',
      component: () => import('/src/views/exampleEffect/index.vue'),
    },
    {
      path: '/thought',
      name: 'thought',
      component: () => import('/src/views/thought/index.vue'),
    },
    {
      path: '/generate',
      name: 'generate',
      component: () => import('/src/views/generate/index.vue'),
    },
    {
      path: '/lastLevel',
      name: 'lastLevel',
      component: () => import('/src/views/lastLevel/index.vue'),
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('/src/views/guide/index.vue'),
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('/src/views/share/index.vue'),
    },
  ],
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})


export default router
