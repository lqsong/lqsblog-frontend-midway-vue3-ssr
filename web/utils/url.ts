import { isExternal } from '@/utils/is';

/**
 * 获取缩略图url
 * @param url url
 * @param isSp 是否分隔
 * @param sp 分隔符
 * @author LiQingSong
 * @returns string
 */
export function getThumbUrl(url?: string, isSp = true, sp = '|') {
  if (url === null || url === '' || undefined === url) {
    return '/images/nopic.png';
  }
  const u = isSp ? url.split(sp)[0] : url;
  return isExternal(u) ? u : '/images/nopic.png';
}
