import request from '@/utils/request';
export async function getDetail(id?: string | number): Promise<any> {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {
      id,
    },
  });
}

export async function getInterest(ids?: string): Promise<any> {
  return request({
    url: '/article/interest',
    method: 'get',
    params: {
      ids,
    },
  });
}
