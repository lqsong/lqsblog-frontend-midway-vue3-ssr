import request from '@/utils/request';
export async function getDetail(): Promise<any> {
  return request({
    url: '/about',
    method: 'get',
  });
}
