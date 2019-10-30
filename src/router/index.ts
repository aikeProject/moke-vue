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
  UserInfo().then(() => {
    localStorage.removeItem(Storage.USER_INFO);
  });

  next();
});

export default router;
