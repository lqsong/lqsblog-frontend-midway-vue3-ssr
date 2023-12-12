/**
 * 站点配置
 * @author LiQingSong
 */

/**
 * @description: 站点名称
 */
export const siteTitle = '李庆松的博客';

/**
 * @description: 站点本地存储Token 的 Key值
 */
export const siteTokenKey = 'lqsblog_ssr_token';

/**
 * @description: Ajax请求头发送Token 的 Key值
 */
export const ajaxHeadersTokenKey = 'x-token';

/**
 * @description: Ajax返回值不参加统一报错的api地址
 */
export const ajaxResponseNoVerifyUrl: string[] = [
  '/user/login', // 用户登录
  '/user/info', // 用户信息
];

/**
 * @description: 平台用户登录的界面Url地址
 */
export const userLoginUrl = '/user/login';
