import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { UserInfo } from '@/common/Api';
import { Storage } from '@/common/Enum';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: '首页' },
    children: [
      {
        path: '/',
        name: 'index',
        meta: { title: '首页', keepAlive: true },
        component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
      },
      {
        path: 'index/:page/:id?',
        name: 'webCategory',
        props: true,
        meta: { title: '首页', keepAlive: true },
        component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
      },
      {
        path: 'article/:slug',
        name: 'article',
        props: true,
        meta: { title: '文章' },
        component: () => import(/* webpackChunkName: "Article" */ '../views/Article.vue'),
      },
    ],
  },
  {
    path: '/user/:uid',
    props: true,
    meta: { title: '个人主页' },
    component: () => import(/* webpackChunkName: "PersonalHome" */ '../views/PersonalHome.vue'),
    children: [
      {
        path: 'home',
        name: 'user',
        props: true,
        meta: { title: '个人主页' },
        component: () =>
          import(/* webpackChunkName: "PersonalIndex" */ '../views/PersonalIndex.vue'),
      },
      {
        path: 'home/:name/:id?',
        name: 'userCategoryTag',
        props: true,
        meta: { title: '个人主页' },
        component: () =>
          import(/* webpackChunkName: "userCategoryTag" */ '../views/PersonalIndex.vue'),
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    meta: { title: '文章编辑' },
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '*',
    beforeEnter: () => {
      window.location.href = '404.html';
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // Token 过期 清除存在本地的用户信息
  if (localStorage.getItem(Storage.TOKEN)) {
    UserInfo().then(
      ({ data }) => {
        localStorage.setItem(Storage.USER_INFO, JSON.stringify(data || null));
      },
      () => {
        localStorage.removeItem(Storage.USER_INFO);
        localStorage.removeItem(Storage.TOKEN);
      }
    );
  }

  next();
});

export default router;
