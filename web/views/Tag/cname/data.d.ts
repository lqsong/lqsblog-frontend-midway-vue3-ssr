import { IListQueryParams } from '@/typings/server/request.d';
import { TSearchPartial } from '@/typings/server/search.d';

export type TListQueryParams = IListQueryParams & {
  name?: string;
};

export type TListItem = TSearchPartial;
