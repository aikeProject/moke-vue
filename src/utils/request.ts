/**
 * @author 成雨
 * @date 2019-10-28
 * @Description: 使用axios发送请求
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { merge } from 'axios/lib/utils';
import { Notification } from 'element-ui';
import { Storage } from '@/common/Enum';
import { isArray, isObject } from '@/utils/core';

export interface InterfaceRequestConfig {
  error: boolean;
}

interface InterfaceError {
  detail: any;
}

const defaultConfig: InterfaceRequestConfig = {
  error: true,
};

/**
 * 取出返回的错误
 * @param data
 * @param result
 */
function mergeError(data: any, result: string[] = []): any {
  let error = '';

  if (typeof data === 'string') {
    error = `<div>${data}</div>`;
    result.push(error);
  }

  if (isArray(data)) {
    (data as Array<string>).map(str => result.push(`<div>${str}</div>`));
  }

  if (isObject(data)) {
    Object.values(data).map(item => {
      mergeError(item, result);
    });
  }

  return result.join('');
}

function responseRejectedError(error: AxiosError<InterfaceError>) {
  const { response } = error;

  if (response) {
    const { data } = response;

    if (data && 'detail' in data) {
      let { detail } = data;

      const errors = mergeError(detail);

      Notification.error({
        title: '错误',
        dangerouslyUseHTMLString: true,
        message: errors,
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
