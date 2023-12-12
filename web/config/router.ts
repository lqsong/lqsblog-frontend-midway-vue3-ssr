import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  Router,
} from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import DefaultLayoutRoutes from '@/layouts/DefaultLayout/routes';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';

export const createRouter = (type: RouterType): Router => {
  const router = _createRouter({
    scrollBehavior(/* to, from, savedPosition */) {
      return { top: 0 };
    },
    history: type === 'web' ? createWebHistory() : createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'root',
        component: DefaultLayout,
        children: DefaultLayoutRoutes,
      },
      {
        name: 'notfound',
        path: '/:pathMatch(.*)*',
        meta: {
          title: 'Not Found',
        },
        component: DefaultLayout,
        children: [
          {
            name: 'notfound',
            path: '/:pathMatch(.*)*',
            meta: {
              title: 'Not Found',
            },
            component: () => import('@/views/404/index.vue'),
          },
        ],
      },
    ],
  });

  router.beforeEach((/* to, from */) => {
    if (!import.meta.env.SSR) {
      // start progress bar
      NProgress.start();
    }
  });

  router.afterEach(to => {
    if (!import.meta.env.SSR) {
      // finish progress bar
      NProgress.done();

      /* 告诉百度统计增加一个PV */
      try {
        window._hmt = window._hmt || [];
        window._hmt.push(['_trackPageview', to.fullPath]);
      } catch (e) {
        //
      }
    }
  });

  return router;
};
