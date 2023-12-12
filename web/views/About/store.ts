/**
 * About store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { IInfo } from './data.d';
import { getDetail } from './service';

export interface IAboutState {
  loading: boolean;
  info: IInfo;
}

export const useAboutStore = defineStore('about', {
  state(): IAboutState {
    return {
      loading: false,
      info: {
        title: '',
        keywords: '',
        description: '',
        content: '',
      },
    };
  },
  actions: {
    async queryInfo() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      try {
        const response: IResponseData = await getDetail();

        this.info = response.data || {
          title: '',
          keywords: '',
          description: '',
          content: '',
        };
      } catch (error: any) {
        console.log('error useAboutStore queryInfo', error);
      }
      this.loading = false;
    },
  },
});
