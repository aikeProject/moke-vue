/**
 * @author 成雨
 * @date 2019-10-28
 * @Description: 使用axios发送请求
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

// instance.defaults.headers.common['Authorization'] = 'Token ';

axios.interceptors.request.use(
  function(config: AxiosRequestConfig) {
    return config;
  },
  function(error: AxiosError) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response: AxiosResponse) {
    return response;
  },
  function(error: AxiosError) {
    return Promise.reject(error);
  }
);

export default instance;
