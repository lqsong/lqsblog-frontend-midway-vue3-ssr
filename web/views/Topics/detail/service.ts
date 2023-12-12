import request from '@/utils/request';
export async function getDetail(alias?: string): Promise<any> {
  return request({
    url: '/topics/detail',
    method: 'get',
    params: {
      alias,
    },
  });
}
