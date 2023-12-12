/**
 * Links store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { ILinksGroup } from '@/typings/server/links.d';
import { getList } from './service';

export interface ILinksState {
  loading: boolean;
  list: ILinksGroup[];
}

export const useLinksStore = defineStore('links', {
  state(): ILinksState {
    return {
      loading: false,
      list: [],
    };
  },
  actions: {
    async queryList() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const response: IResponseData = await getList();
        this.list = response.data || [];
      } catch (error: any) {
        console.log('error useLinksStore queryList', error);
      }
      this.loading = false;
    },
  },
});
