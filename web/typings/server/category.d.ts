/**
 * 后端定义，如ajax返回或重置返回
 * 分类 - 相关类型定义文件
 */

// 分类 - item
export interface ICategory {
  pid: numberl;
  id: number; // id
  name: string; // 名称
  alias: string; // 别名
  title: string;
  keywords: string;
  description: string;
  hit: number;
}

// 分类 - item - Partial
export type TCategoryPartial = Partial<ICategory> & {
  [key: string]: any;
};
