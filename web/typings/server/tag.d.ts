/**
 * 后端定义，如ajax返回或重置返回
 * 标签 - 相关类型定义文件
 */

// 标签 - item
export interface ITag {
  id: number; // id
  name: string; // 名称
  pinyin: string;
  hit: number;
}

// 标签 - item - Partial
export type TTagPartial = Partial<ITag> & {
  [key: string]: any;
};
