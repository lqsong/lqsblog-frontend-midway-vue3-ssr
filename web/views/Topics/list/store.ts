/**
 * Topics store
 * @author LiQingSong
 */
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { IPaginationConfig } from '@/utils/pagination';
import {
  IListResponseData,
  IListQueryParams,
} from '@/typings/server/request.d';
import { TListItem } from './data.d';
import { getList } from './service';

export interface ITopicsState {
  loading: boolean;
  list: TListItem[];
  pagination: IPaginationConfig;
}

export const useTopicsStore = defineStore('topics', {
  state(): ITopicsState {
    return {
      loading: false,
      list: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  actions: {
    // 分页跳转的url - ***需要处理url***
    paginationUrl(route: RouteLocationNormalizedLoaded) {
      const query = { ...route.query };
      delete query.page; // 删除页码
      let url = '';
      Object.keys(query).forEach(key => {
        url =
          url === '' ? `?${key}=${query[key]}` : `${url}&${key}=${query[key]}`;
      });
      url = url === '' ? '?page={page}' : `${url}&page={page}`;
      return `${route.path}${url}`;
    },
    /**
     * 获取列表
     * @param params IListQueryParams 参数
     * @returns
     */
    async queryList(params?: IListQueryParams) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const response: IResponseData<IListResponseData<TListItem[]>> =
          await getList(params);
        const data = response.data;
        this.list = data?.list || [];
        this.pagination = {
          ...this.pagination,
          total: data?.total || 0,
          currentPage: params ? Number(params.page || '1') : 1,
        };
      } catch (error: any) {
        console.log('error useTopicsStore queryList', error);
      }
      this.loading = false;
    },
  },
});
