/**
 * 后端定义，如ajax返回或重置返回
 * 作品 - 相关类型定义文件
 */

// 作品 - item
export interface IWorks {
  id: number; // id
  title: string; // 名称
  description: string;
  thumb: string[]; // 缩略图
  addtime: string;
  tag: string;
  hit: number;
  content: string;
}

// 作品 - item - Partial
export type TWorksPartial = Partial<IWorks> & {
  [key: string]: any;
};
