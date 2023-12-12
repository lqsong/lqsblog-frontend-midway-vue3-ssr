import request from '@/utils/request';
export async function getDetail(id?: string | number): Promise<any> {
  return request({
    url: '/works/detail',
    method: 'get',
    params: {
      id,
    },
  });
}
