import { createSSRApp } from 'vue';
import App from '@/App.vue';
import { createRouter } from '@/config/router';
import { createPinia } from 'pinia';

// 样式初始化
import 'normalize.css';

// 全局样式
import '@/assets/css/global.scss';

// 引入 ElementUI
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus';

export function createApp(routerType: RouterType) {
  const app = createSSRApp(App);
  const router = createRouter(routerType);
  const pinia = createPinia();

  app.use(router);
  app.use(pinia);
  app.use(ElementPlus);
  // ElementPlus SSR中的水合率(https://element-plus.org/zh-CN/guide/ssr.html#%E6%8F%90%E4%BE%9B%E4%B8%80%E4%B8%AAid)
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  });

  return { app, router, pinia };
}
