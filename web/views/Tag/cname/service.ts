import request from '@/utils/request';
import { TListQueryParams } from './data.d';

// 获取列表
export async function getList(params?: TListQueryParams): Promise<any> {
  return request({
    url: '/tag/list',
    method: 'get',
    params,
  });
}

export async function getDetail(name?: string): Promise<any> {
  return request({
    url: '/tag/detail',
    method: 'get',
    params: {
      name,
    },
  });
}
