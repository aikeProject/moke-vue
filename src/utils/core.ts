/**
 * @author 成雨
 * @date 2019-11-03
 * @Description:
 */

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
