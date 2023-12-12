/**
 * WorksDetail store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { IResponseData } from '@/@types/utils.request';
import { TWorksPartial } from '@/typings/server/works.d';
import { getDetail } from './service';

export interface IWorksDetailState {
  loading: boolean;
  info: TWorksPartial;
}

export const useWorksDetailStore = defineStore('worksdetail', {
  state(): IWorksDetailState {
    return {
      loading: false,
      info: {},
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
        console.log('error useWorksDetailStore queryInfo', error);
      }
      this.loading = false;
    },
  },
});
