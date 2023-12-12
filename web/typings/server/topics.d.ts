/**
 * 后端定义，如ajax返回或重置返回
 * 专题 - 相关类型定义文件
 */

import { ISearch } from "@/typings/server/search.d";

// 专题 - item
export interface ITopics {
  id: number; // id
  title: string; // 名称
  keywords: string;
  description: string;
  list: TTopicsConlistPartial[];
  hit: number;
  addtime: string;
  alias: string;
  quantity: number;
  conlist: TTopicsConlistPartial[];
}

// 专题 - item - Partial
export type TTopicsPartial = Partial<ITopics> & {
  [key: string]: any;
};

// 专题内容- item
export type TTopicsConlist  = Omit<ISearch, "thumb"> & {
  thumb: string;
};
// 专题内容 - item - Partial
export type TTopicsConlistPartial = Partial<TTopicsConlist> & {
  [key: string]: any;
};
