/**
 * 后端定义，如ajax返回或重置返回
 * 随笔 - 相关类型定义文件
 */

import { TCategoryPartial } from "@/typings/server/category.d";

// 随笔 - item
export interface IArticle {
  id: number; // id
  title: string; // 名称
  description: string;
  thumb: string[]; // 缩略图
  addtime: string;
  category: TCategoryPartial; // 分类
  tag: string;
  hit: number;
  content: string;
  interestIds: string; // 推荐的文章id
}

// 随笔 - item - Partial
export type TArticlePartial = Partial<IArticle> & {
  [key: string]: any;
};
