/**
 * ArticleDetail store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { TArticlePartial } from '@/typings/server/article.d';
import { getDetail, getInterest } from './service';

export interface IArticleDetailState {
  loading: boolean;
  info: TArticlePartial;
  interestLoading: boolean;
  interest: TArticlePartial[]; // 可能感兴趣文章
}

export const useArticleDetailStore = defineStore('articledetail', {
  state(): IArticleDetailState {
    return {
      loading: false,
      info: {},
      interestLoading: false,
      interest: [],
    };
  },
  actions: {
    async queryInfo(id?: string | number) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const response: IResponseData = await getDetail(id);

        const data = response.data || {};
        data.tag = data.tag.join(',');
        this.info = data;
      } catch (error: any) {
        console.log('error useArticleDetailStore queryInfo', error);
      }
      this.loading = false;
    },
    async queryInterest(ids?: string) {
      if (!ids || ids === '') {
        this.interest = [];
        return;
      }

      if (this.interestLoading) {
        return;
      }
      this.interestLoading = true;
      try {
        const response: IResponseData = await getInterest(ids);
        this.interest = response.data || [];
      } catch (error: any) {
        console.log('error useArticleDetailStore queryInterest', error);
      }
      this.interestLoading = false;
    },
  },
});
