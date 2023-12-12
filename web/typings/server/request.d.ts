/**
 * 前后端定义，如ajax返回或重置返回
 * 请求、返回 - 相关类型定义文件
 */

/**
 * 列表通用请求格式
 */
export interface IListQueryParams {
  page: number; // 当前页码
  per?: number; // 每页多少条
  refresh?: string | number;
}

/**
 * 列表通用返回的格式
 */
export interface IListResponseData<T> {
  list: T;
  total: number;
  currentPage: number;
}
