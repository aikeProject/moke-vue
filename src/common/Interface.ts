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
