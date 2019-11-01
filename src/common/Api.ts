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
  InterfaceArticle,
  InterfaceArticleList,
  InterfacePagination,
  InterfaceTag,
  InterfaceCategory,
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

// 文章列表
export const ArticlesList = (params: InterfacePagination) => {
  return request.get<InterfaceArticleList>(`${BASE}/articles/`, { params });
};

// 文章详情
export const ArticlesRead = (slug: string) => {
  return request.get<InterfaceArticle>(`${BASE}/articles/${slug}/`);
};

// 收藏 articles > favorite > create
export const articleFavoriteCreate = (article_slug: string) => {
  return request.post(`${BASE}/articles/${article_slug}/favorite`);
};

// 取消收藏 articles > favorite > delete
export const articleFavoriteDelete = (article_slug: string) => {
  return request.delete(`${BASE}/articles/${article_slug}/favorite`);
};

// 获取标签
export const tagList = () => {
  return request.get<InterfaceTag[]>(`${BASE}/tag/`);
};

// /api/category/
export const categoryList = () => {
  return request.get<InterfaceCategory[]>(`${BASE}/category/`);
};
