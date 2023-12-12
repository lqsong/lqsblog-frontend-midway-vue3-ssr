import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home/index.vue';

const DefaultLayoutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      navActive: 'home',
    },
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      navActive: 'about',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
  },
  {
    path: '/links',
    name: 'links',
    meta: {
      title: '左邻右舍',
      keywords: '左邻右舍, 友情链接, 超链接, 好友链接, 链接交换, links',
      description:
        '这里是我的左邻右舍；我的个人链接收藏夹，常用的、实用的、有趣的、有参考性的技术网站。',
      navActive: 'links',
    },
    component: () =>
      import(/* webpackChunkName: "links" */ '@/views/Links/index.vue'),
  },
  {
    path: '/article',
    name: 'article',
    children: [
      {
        path: ':cname?',
        name: 'article-cname',
        meta: {
          navActive: 'article',
        },
        component: () =>
          import(
            /* webpackChunkName: "article-cname" */ '@/views/Article/cname/index.vue'
          ),
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'article-detail',
        meta: {
          navActive: 'article',
        },
        component: () =>
          import(
            /* webpackChunkName: "article-detail" */ '@/views/Article/detail/index.vue'
          ),
      },
    ],
  },
  {
    path: '/works',
    name: 'works',
    children: [
      {
        path: '/works',
        name: 'works-cname',
        meta: {
          navActive: 'works',
        },
        component: () =>
          import(
            /* webpackChunkName: "works-cname" */ '@/views/Works/cname/index.vue'
          ),
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'works-detail',
        meta: {
          navActive: 'works',
        },
        component: () =>
          import(
            /* webpackChunkName: "works-detail" */ '@/views/Works/detail/index.vue'
          ),
      },
    ],
  },
  {
    path: '/topics',
    name: 'topics-list',
    meta: {
      title: '专题',
      keywords:
        '文章专题, 作品专题, 专题列表, 技术专题, 前端专题, 后端专题, 网站开发专题',
      description:
        '这是一个专题列表，包含个人作品专题、个人文章专题、网站开发专题、IT技术专题',
      navActive: 'topics',
    },
    component: () =>
      import(
        /* webpackChunkName: "topics-list" */ '@/views/Topics/list/index.vue'
      ),
  },
  {
    path: '/topics/detail/:cname',
    name: 'topics-detail',
    meta: {
      navActive: 'topics',
    },
    component: () =>
      import(
        /* webpackChunkName: "topics-detail" */ '@/views/Topics/detail/index.vue'
      ),
  },
  {
    path: '/tag/:cname',
    name: 'tag-cname',
    meta: {},
    component: () =>
      import(/* webpackChunkName: "tag-cname" */ '@/views/Tag/cname/index.vue'),
  },
  {
    path: '/search/:keyword',
    name: 'search-keyword',
    meta: {},
    component: () =>
      import(
        /* webpackChunkName: "search-keyword" */ '@/views/Search/keyword/index.vue'
      ),
  },
];

export default DefaultLayoutRoutes;
