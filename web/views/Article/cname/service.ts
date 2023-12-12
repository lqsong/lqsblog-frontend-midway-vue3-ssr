import request from '@/utils/request';
import { TListQueryParams } from './data.d';

// 获取列表
export async function getList(params?: TListQueryParams): Promise<any> {
  return request({
    url: '/article/list',
    method: 'get',
    params,
  });
}

// 获取分类信息
export async function getCategory(alias?: string): Promise<any> {
  return request({
    url: '/article/category',
    method: 'get',
    params: {
      alias,
    },
  });
}
