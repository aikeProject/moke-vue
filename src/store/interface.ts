/**
 * @author 成雨
 * @date 2019-10-29
 * @Description:
 */

import { InterfaceUserInfo } from '@/common/Interface';

export const enum Mutations {
  SET_USER = 'SET_USER',
}

export interface State {
  userInfo: InterfaceUserInfo;
}
