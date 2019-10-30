import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { State, Mutations } from './interface';
import { RegisterApi, LoginApi, UserInfo } from '@/common/Api';
import { InterfaceRegister, InterfaceLogin, InterfaceUserInfo } from '@/common/Interface';
import { Storage } from '@/common/Enum';

Vue.use(Vuex);

let userInfo: InterfaceUserInfo = JSON.parse(localStorage.getItem(Storage.USER_INFO) || '');

if (!userInfo) {
  userInfo = { username: '', email: '', image: '' };
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
      localStorage.setItem('Token', data.token);
      await dispatch('userInfo', data);
    }
  },
  async login({ commit, dispatch }: ActionContext<State, State>, request: InterfaceLogin) {
    const { data } = await LoginApi(request);
    if (data.token) {
      localStorage.setItem(Storage.TOKEN, data.token);
      await dispatch('userInfo');
    }
  },
  async userInfo({ commit }: ActionContext<State, State>) {
    const { data } = await UserInfo();

    if (data) {
      commit(Mutations.SET_USER, data);
      localStorage.setItem(Storage.USER_INFO, JSON.stringify(data));
    }
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
