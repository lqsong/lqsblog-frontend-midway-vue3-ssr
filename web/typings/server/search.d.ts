/**
 * 后端定义，如ajax返回或重置返回
 * 搜索 - 相关类型定义文件
 */

import { TCategoryPartial } from "@/typings/server/category.d";

// 搜索 - item
export interface ISearch {
  type: number; // 类型 1随笔 2作品
  id: number; // id
  title: string; // 名称
  description: string;
  thumb: string[]; // 缩略图
  addtime: string;
  category: TCategoryPartial; // 分类
}

// 搜索 - item - Partial
export type TSearchPartial = Partial<ISearch> & {
  [key: string]: any;
};
