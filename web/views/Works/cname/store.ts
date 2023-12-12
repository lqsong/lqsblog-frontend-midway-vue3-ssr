/**
 * WorksCname store
 * @author LiQingSong
 */
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { defineStore } from 'pinia';
import { TCategoryPartial } from '@/typings/server/category.d';
import { IResponseData } from '@/@types/utils.request';
import { IPaginationConfig } from '@/utils/pagination';
import { IListResponseData } from '@/typings/server/request.d';
import { TListItem, TListQueryParams } from './data.d';
import { getList } from './service';

export interface IWorksCnameState {
  categoryCname: string | number;
  categoryJson: {
    [key: string | number]: TCategoryPartial;
  };
  loading: boolean;
  list: TListItem[];
  pagination: IPaginationConfig;
}

export const useWorksCnameStore = defineStore('workscname', {
  state(): IWorksCnameState {
    return {
      categoryCname: '/',
      categoryJson: {
        // 内部结构
        '/': {
          name: '作品',
          title: '作品',
          keywords: '个人作品, 作品展示, 作品欣赏, 作品列表, 李庆松的作品集',
          description:
            '这里是我的个人作品展示，基本上是《网站开发》作品，包含：html、css、javascript、nodejs、vue、react、php、java、小程序。',
        },
      },
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
        console.log('error useWorksCnameStore queryList', error);
      }
      this.loading = false;
    },
  },
});
