import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { State, Mutations } from './interface';
import { RegisterApi, LoginApi, UserInfo, updateUser } from '@/common/Api';
import {
  InterfaceRegister,
  InterfaceLogin,
  InterfaceUserInfo,
  InterfaceUpdateUser,
} from '@/common/Interface';
import { Storage } from '@/common/Enum';

Vue.use(Vuex);

// 用户信息默认值
const userInfoDefault: InterfaceUserInfo = {
  username: '',
  email: '',
  image: '',
  uid: '',
  blog: {
    tags: [],
    categories: [],
    title: '',
    site_name: '',
  },
};

let userInfo: InterfaceUserInfo = JSON.parse(localStorage.getItem(Storage.USER_INFO) || 'null');

if (!userInfo) {
  userInfo = userInfoDefault;
}

const state: State = {
  userInfo,
};

const getters = {};

const mutations = {
  [Mutations.SET_USER](state: State, data: InterfaceUserInfo) {
    state.userInfo = data;
  },
};

const actions = {
  async register({ commit, dispatch }: ActionContext<State, State>, request: InterfaceRegister) {
    const { data } = await RegisterApi(request);
    if (data.token) {
      localStorage.setItem(Storage.TOKEN, data.token);
      await dispatch('userInfo');
    }
  },
  async login({ commit, dispatch }: ActionContext<State, State>, request: InterfaceLogin) {
    const { data } = await LoginApi(request);
    if (data.token) {
      localStorage.setItem(Storage.TOKEN, data.token);
      await dispatch('userInfo');
    }
  },
  async userUpdate(
    { commit, dispatch, state }: ActionContext<State, State>,
    request: InterfaceUpdateUser
  ) {
    await updateUser(state.userInfo.uid, request);
    await dispatch('userInfo');
  },
  async userInfo({ commit }: ActionContext<State, State>) {
    const { data } = await UserInfo();

    if (data) {
      commit(Mutations.SET_USER, data);
      localStorage.setItem(Storage.USER_INFO, JSON.stringify(data));
    }
  },
  logOut({ commit }: ActionContext<State, State>) {
    // 清除本地的Token和用户信息即可
    localStorage.removeItem(Storage.TOKEN);
    localStorage.removeItem(Storage.USER_INFO);

    commit(Mutations.SET_USER, userInfoDefault);
  },
};

const modules = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
