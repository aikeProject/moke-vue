import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { UserInfo } from '@/common/Api';
import { Storage } from '@/common/Enum';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "PersonalHome" */ '../views/PersonalHome.vue'),
    children: [
      {
        path: '/',
        name: 'PersonalIndex',
        component: () =>
          import(/* webpackChunkName: "PersonalIndex" */ '../views/PersonalIndex.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  // Token 过期 清除存在本地的用户信息
  UserInfo().then(
    ({ data }) => {
      localStorage.setItem(Storage.USER_INFO, JSON.stringify(data || null));
    },
    () => {
      localStorage.removeItem(Storage.USER_INFO);
    }
  );

  next();
});

export default router;
