/**
 * TopicsDetail store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { TTopicsPartial } from '@/typings/server/topics.d';
import { getDetail } from './service';

export interface ITopicsDetailState {
  loading: boolean;
  info: TTopicsPartial;
}

export const useTopicsDetailStore = defineStore('topicsdetail', {
  state(): ITopicsDetailState {
    return {
      loading: false,
      info: {},
    };
  },
  actions: {
    async queryInfo(alias?: string) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const response: IResponseData = await getDetail(alias);
        this.info = response.data || {};
      } catch (error: any) {
        console.log('error useTopicsDetailStore queryInfo', error);
      }
      this.loading = false;
    },
  },
});
