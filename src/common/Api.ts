/**
 * @author 成雨
 * @date 2019-10-28
 * @Description: 请求接口
 */

import request, { requestBase } from '../utils/request';
import {
  InterfaceRegister,
  InterfaceRegisterResponse,
  InterfaceLogin,
  InterfaceUserInfo,
} from './Interface';
import { AxiosRequestConfig } from 'axios';

const BASE = 'api';

// 注册
export const RegisterApi = (data: InterfaceRegister, config?: AxiosRequestConfig) => {
  return request.post<InterfaceRegisterResponse>(`${BASE}/user/`, data, config);
};

// 登录
export const LoginApi = (data: InterfaceLogin, config?: AxiosRequestConfig) => {
  return request.post<{ token: string }>('login/', data, config);
};

// 查看当前登录用户信息
export const UserInfo = () =>
  requestBase({ error: false }).get<InterfaceUserInfo>(`${BASE}/user/1/`);
