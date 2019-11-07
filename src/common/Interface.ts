/**
 * @author 成雨
 * @date 2019-10-28
 * @Description:
 */

export interface InterfaceBae {
  created_at?: string;
  updated_at?: string;
}

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

export interface InterfacePagination {
  page?: number;
  page_size?: number;
}

export interface InterfacePaginationBase<T = any> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export interface InterfaceArticlesRequest extends InterfacePagination {
  search?: string;
  category?: string;
  uid?: string;
  tagId?: string;
  web_category?: string;
  webCategoryId?: string;
}

export interface InterfaceArticle {
  author?: {
    email: string;
    username: string;
    image: string;
    following: boolean;
  };
  body?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  title?: string;
  slug?: string;
  favorite?: boolean;
  favoritesCount?: string;
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

// 个人分类
export interface InterfaceUserCategory extends InterfaceBae {
  id: string;
  title: string;
  blog: string;
}

// 博客
export interface InterfaceBlog extends InterfaceBae {
  tags: InterfaceTag[]; // 博客标签
  categories: InterfaceUserCategory[]; // 博客分类
  title: string; // 博客名称
  site_name: string; // 博客签名
}

// 用户信息
export interface InterfaceUserInfo extends InterfaceBae {
  uid: string;
  username: string;
  email: string;
  image: string;
  blog: InterfaceBlog;
}

// 文章创建
export interface InterfaceArticleCreate {
  title: string;
  description: string;
  body: string;
  tags: { id?: string | null; title?: string }[];
  category: string;
  web_category: string;
}

// 评论
export interface InterfaceCommentsRequest extends InterfacePagination {
  article_slug: string;
}

export interface InterfaceCommentsResponse extends InterfaceBae {
  id: string;
  author: {
    uid: string;
    username: string;
    image: string;
  };
  child: InterfaceCommentsResponse[];
  is_own: boolean;
  body: string;
  article: number;
  parent: number;
}

export interface InterfaceCommentReqest {
  body: string;
  article: string;
  reply?: string;
  parent?: string;
}
