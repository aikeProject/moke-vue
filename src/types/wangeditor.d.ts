/**
 * @author 成雨
 * @date 2019-11-06
 * @Description:
 */

declare module 'wangeditor' {
  export interface InterfaceTxt {
    html(str?: any): string;
    text(): string;
  }

  export interface InterfaceCustomConfig {
    menus: string[];
    onchange(html: any): void;
  }

  export default class Editor {
    constructor(config: any);

    create(): void;
    txt: InterfaceTxt;
    customConfig: InterfaceCustomConfig;
  }
}
