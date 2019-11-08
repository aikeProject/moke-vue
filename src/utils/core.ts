/**
 * @author 成雨
 * @date 2019-11-03
 * @Description:
 */

const toString = Object.prototype.toString;

export function asyncLoad(src: string, type: 'js' | 'css' = 'js') {
  return new Promise((resolve, reject) => {
    if (type === 'css') {
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      link.onload = () => {
        resolve();
      };
      link.onerror = () => {
        reject();
      };
      document.getElementsByTagName('head')[0].appendChild(link);
    } else {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      script.src = src;
      document.getElementsByTagName('body')[0].appendChild(script);
    }
  });
}

/**
 * var array = [
    { 'dir': 'left', 'code': 97 },
    { 'dir': 'right', 'code': 100 }
  ];

  _.keyBy(array, 'dir');
   // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 * @param collection
 * @param str
 */
const keyBy = (collection: Array<any>, str: string) => {
  return collection.reduce((result, value, key) => ({ ...result, [value[str]]: value }), {});
};

/**
 * 是否是数组
 * @param val {Object}
 * @returns {boolean}
 */
function isArray(val: any): boolean {
  return toString.call(val) === '[object Array]';
}

/**
 * 是否是对象
 * @param val {Object}
 * @returns {boolean}
 */
function isObject(val: any): boolean {
  return toString.call(val) === '[object Object]';
}

/**
 * 字符串去空格
 * @param str {String}
 * @returns {String}
 */
function trim(str: string): string {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

export { keyBy, isArray, isObject, trim };
