/**
 * @author 成雨
 * @date 2019-10-31
 * @Description: 声明axios里面的工具函数
 */

declare module 'axios/lib/utils' {
  /**
   * 对象合并
   * @param obj
   */
  export function merge(...obj: any[]): any;
}
