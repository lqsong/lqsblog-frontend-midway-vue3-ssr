/**
 * 后端定义，如ajax返回或重置返回
 * 左邻右舍 - 相关类型定义文件
 */

// 左邻右舍 - item
export interface ILinks {
  id: number; // id
  title: string; // 名称
  description: string;
  logo: string; // 缩略图
  href: string;
}

// 左邻右舍 - item - Partial
export type TLinksPartial = Partial<ILinks> & {
  [key: string]: any;
};

// 左邻右舍 - 分组
export interface ILinksGroup {
  name: string;
  children: TLinksPartial[];
}
