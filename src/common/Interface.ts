/**
 * @author 成雨
 * @date 2019-10-28
 * @Description:
 */

export interface InterfaceRegister {
  username: string;
  password: string;
  email: string;
}

export interface InterfaceRegisterResponse {
  token: string;
  email: string;
  username: string;
}

export interface InterfaceLogin {
  email: string;
  password: string;
}

export interface InterfaceUserInfo {
  username: string;
  email: string;
  image: string;
}

export interface InterfacePagination {
  page: number;
  page_size?: number;
}

export interface InterfaceArticlesRequest extends InterfacePagination {
  search?: string;
  category?: string;
  uid?: string;
  tagId?: string;
}

export interface InterfaceArticle {
  author: {
    email: string;
    username: string;
    image: string;
    following: boolean;
  };
  body: string;
  description: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  favorite: boolean;
  favoritesCount: string;
}

export interface InterfaceArticleList {
  count: number;
  next: string;
  previous: string;
  results: InterfaceArticle[];
}

export interface InterfaceTag {
  id: number;
  title: string;
  blog: number;
}

export interface InterfaceCategory {
  id: number;
  title: string;
  blog: number;
}

export interface InterfaceWebCategory {
  id: number;
  category_list: InterfaceWebCategory[];
  created_at: string;
  updated_at: string;
  name: string;
  parent_category: number;
}
