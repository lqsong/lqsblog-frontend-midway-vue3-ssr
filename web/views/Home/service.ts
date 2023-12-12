import request from '@/utils/request';
import { IListQueryParams } from '@/typings/server/request.d';
export async function getList(params?: IListQueryParams): Promise<any> {
  return request({
    url: '/index/list',
    method: 'get',
    params,
  });
}
