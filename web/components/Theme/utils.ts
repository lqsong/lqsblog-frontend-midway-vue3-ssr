const token_key = 'lqsblog-theme';
/**
 * 获取本地Token
 */
export const getToken = () => {
  return !import.meta.env.SSR ? localStorage.getItem(token_key) : '';
};

/**
 * 设置存储本地Token
 */
export const setToken = (token: string) => {
  !import.meta.env.SSR && localStorage.setItem(token_key, token);
};
