/**
 * @author 成雨
 * @date 2019-10-28
 * @Description: 请求接口
 */

import request from '../utils/request';
import { InterfaceRegister } from './Interface';
import { AxiosRequestConfig } from 'axios';

const BASE = 'api';

export const RegisterApi = (data: InterfaceRegister, config?: AxiosRequestConfig) => {
  return request.post(`${BASE}/user/`, data, config);
};
