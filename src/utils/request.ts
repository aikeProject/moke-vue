/**
 * @author 成雨
 * @date 2019-10-28
 * @Description: 使用axios发送请求
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

// 请求拦截器
instance.interceptors.request.use(
  function(config: AxiosRequestConfig) {
    const Token = localStorage.getItem('Token');

    if (Token) config.headers['Authorization'] = `Token ${Token}`;

    return config;
  },
  function(error: AxiosError) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function(response: AxiosResponse) {
    return response;
  },
  function(error: AxiosError) {
    return Promise.reject(error);
  }
);

export default instance;
