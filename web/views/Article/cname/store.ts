/**
 * ArticleCname store
 * @author LiQingSong
 */
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { defineStore } from 'pinia';
import { TCategoryPartial } from '@/typings/server/category.d';
import { IResponseData } from '@/@types/utils.request';
import { IPaginationConfig } from '@/utils/pagination';
import { IListResponseData } from '@/typings/server/request.d';
import { TListItem, TListQueryParams } from './data.d';
import { getCategory, getList } from './service';

export interface IArticleCnameState {
  categoryCname: string | number;
  categoryJson: {
    [key: string | number]: TCategoryPartial;
  };
  loading: boolean;
  list: TListItem[];
  pagination: IPaginationConfig;
}

export const useArticleCnameStore = defineStore('articlecname', {
  state(): IArticleCnameState {
    return {
      categoryCname: '/',
      categoryJson: {},
      loading: false,
      list: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  getters: {
    // 当前分类信息
    category({ categoryJson, categoryCname }) {
      return categoryJson[categoryCname] || {};
    },
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
     * 获取分类信息
     * @param cname 分类别名
     * @returns
     */
    async queryCategory(cname?: string): Promise<TCategoryPartial> {
      this.categoryCname = cname || '/';
      if (this.categoryJson[this.categoryCname]) {
        return this.categoryJson[this.categoryCname];
      }

      try {
        const response: IResponseData = await getCategory(cname);
        this.categoryJson[this.categoryCname] = response.data || {};
      } catch (error: any) {
        console.log('error useArticleCnameStore queryCategory', error);
      }

      return this.categoryJson[this.categoryCname] || {};
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
        console.log('error useArticleCnameStore queryList', error);
      }
      this.loading = false;
    },
  },
});
