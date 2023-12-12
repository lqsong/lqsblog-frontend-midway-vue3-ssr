import request from '@/utils/request';
import { TListQueryParams } from './data.d';

// 获取列表
export async function getList(params?: TListQueryParams): Promise<any> {
  return request({
    url: '/search',
    method: 'get',
    params,
  });
}
