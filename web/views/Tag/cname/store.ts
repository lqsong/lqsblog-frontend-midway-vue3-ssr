/**
 * Tag store
 * @author LiQingSong
 */
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { defineStore } from 'pinia';
import { TTagPartial } from '@/typings/server/tag.d';
import { IResponseData } from '@/@types/utils.request';
import { IPaginationConfig } from '@/utils/pagination';
import { IListResponseData } from '@/typings/server/request.d';
import { TListItem, TListQueryParams } from './data.d';
import { getList, getDetail } from './service';

export interface ITagState {
  loading: boolean;
  list: TListItem[];
  pagination: IPaginationConfig;
  tags: {
    [name: string]: TTagPartial;
  };
}

export const useTagStore = defineStore('tag', {
  state(): ITagState {
    return {
      loading: false,
      list: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 读取的tags
      tags: {},
    };
  },
  getters: {},
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
     * 获取标签详情判断是否有此标签
     * @param name string 标签名
     * @returns code 0存在 404不存在
     */
    async queryDetail(name?: string) {
      if (!name) {
        return 404;
      }
      let code = 0;
      if (this.tags[name]) {
        return code;
      }
      try {
        const response: IResponseData<IListResponseData<TListItem[]>> =
          await getDetail(name);
        this.tags[name] = response.data || {};
        code = 0;
      } catch (error: any) {
        console.log('error useTagStore queryDetail', error);
        const response = error.response || {};
        const data = response.data || {};
        code = data.code;
      }
      return code;
    },

    /**
     * 获取列表
     * @param params TListQueryParams 参数
     * @returns
     */
    async queryList(params?: TListQueryParams) {
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
        console.log('error useTagStore queryList', error);
      }
      this.loading = false;
    },
  },
});
