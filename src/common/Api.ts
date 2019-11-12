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
  InterfaceTag,
  InterfaceCategory,
  InterfaceArticlesRequest,
  InterfaceWebCategory,
  InterfaceArticleCreate,
  InterfaceCommentsRequest,
  InterfaceCommentsResponse,
  InterfacePaginationBase,
  InterfaceCommentRequest,
  InterfaceUpdateUser,
} from './Interface';
import { AxiosRequestConfig } from 'axios';
import { keyBy } from '@/utils/core';

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

// 修改个人资料 /api/user/update/4ecd6a25-e069-4e91-9d89-85a30d22f260/
export const updateUser = (uid: string, data: InterfaceUpdateUser) => {
  const formData = new FormData();

  for (let dataKey in data) {
    // @ts-ignore
    if (data[dataKey]) {
      // @ts-ignore
      formData.set(dataKey, data[dataKey]);
    }
  }

  return request.put(`/api/user/update/${uid}/`, formData, {
    // headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 文章列表
export const ArticlesList = (params: InterfaceArticlesRequest) => {
  return request.get<InterfaceArticleList>(`${BASE}/articles/`, { params });
};

// 文章详情 articles > read
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
export const tagList = (uid?: string) => {
  return request.get<InterfaceTag[]>(`${BASE}/tag/`, { params: { uid } });
};

// 博客分类
export const categoryList = () => {
  return request.get<InterfaceCategory[]>(`${BASE}/category/`);
};

// webCategory > list 网站分类
export const webCategoryList = () => {
  return request.get<InterfaceWebCategory[]>(`${BASE}/webCategory/`);
};

// articles > create 文章创建
export const articleCreate = (data: InterfaceArticleCreate) => {
  return request.post(`${BASE}/articles/`, data);
};

// comments > list 文章相关评论
export const commentsList = (data: InterfaceCommentsRequest = { article_slug: '' }) => {
  return request.get<InterfacePaginationBase<InterfaceCommentsResponse[]>>(`${BASE}/comments/`, {
    params: data || {},
  });
};

// comment > create 评论
export const commentCreate = (data: InterfaceCommentRequest) => {
  return request.post(`${BASE}/comment/`, data);
};

// comment > del > delete删除评论
export const commentDelete = (id: number) => {
  return request.delete(`${BASE}/comment/del/${id}/`);
};
