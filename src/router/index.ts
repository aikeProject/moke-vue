import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Index from '../views/Index.vue';
import PersonalHome from '../views/PersonalHome.vue';
import PersonalIndex from '../views/PersonalIndex.vue';
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
        path: 'index',
        component: Index,
      },
    ],
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalHome,
    children: [
      {
        path: 'personalIndex',
        component: PersonalIndex,
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
