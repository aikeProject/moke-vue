/**
 * @author 成雨
 * @date 2019-10-28
 * @Description: 使用axios发送请求
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { merge } from 'axios/lib/utils';
import { Notification } from 'element-ui';
import { Storage } from '@/common/Enum';

export interface InterfaceRequestConfig {
  error: boolean;
}

interface InterfaceError {
  detail: any;
}

const defaultConfig: InterfaceRequestConfig = {
  error: true,
};

function responseRejectedError(error: AxiosError<InterfaceError>) {
  const { response } = error;

  if (response) {
    const { data } = response;

    if (data && 'detail' in data) {
      let { detail } = data;

      if (Object.prototype.toString.call(detail) === '[object Array]') {
        detail = (detail as Array<string>).map(str => `<div>${str}</div>`).join('');
      }

      Notification.error({
        title: '错误',
        dangerouslyUseHTMLString: true,
        message: detail,
      });
    }
  }

  return Promise.reject(error);
}

function responseRejectedNoError(error: AxiosError<InterfaceError>) {
  return Promise.reject(error);
}

export function requestBase(config: InterfaceRequestConfig = defaultConfig) {
  config = merge({}, defaultConfig, config);

  const baseURL = 'http://localhost:8000';

  const instance = axios.create({
    baseURL,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    function(config: AxiosRequestConfig) {
      const Token = localStorage.getItem(Storage.TOKEN);

      if (Token) config.headers['Authorization'] = `Token ${Token}`;

      return config;
    },
    function(error: AxiosError) {
      return Promise.reject(error);
    }
  );

  let responseRejected: (error: AxiosError<InterfaceError>) => any;

  if (config.error) responseRejected = responseRejectedError;
  else responseRejected = responseRejectedNoError;

  // 响应拦截器
  instance.interceptors.response.use(function(response: AxiosResponse) {
    return response;
  }, responseRejected);

  return instance;
}

export default requestBase();
