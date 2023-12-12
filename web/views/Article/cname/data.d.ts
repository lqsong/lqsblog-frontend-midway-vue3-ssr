import { IListQueryParams } from '@/typings/server/request.d';
import { TArticlePartial } from '@/typings/server/article.d';

export type TListQueryParams = IListQueryParams & {
  categoryId?: string | number;
};

export type TListItem = TArticlePartial;
