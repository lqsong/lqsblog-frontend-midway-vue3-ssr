/**
 * Global store
 * @author LiQingSong
 */
import request from '@/utils/request';
import { defineStore } from 'pinia';

export interface IConfig {
  // 站点创建时间
  siteCreationTime: string;
  // 研发人
  developedBy: {
    name: string;
    url: string;
  };
  // 备案
  ICP: string;
  keywords: string;
  description: string;
}

export interface IGlobalState {
  config: IConfig;
}

export const useGlobalStore = defineStore('global', {
  state(): IGlobalState {
    return {
      config: {
        // 站点创建时间
        siteCreationTime: '',
        // 研发人
        developedBy: {
          name: 'lqsBlog',
          url: 'http://liqingsong.cc',
        },
        // 备案
        ICP: '浙ICP备16042703号',
        keywords: '',
        description: '',
      },
    };
  },
  actions: {
    /**
     * 获取站点配置
     * @returns
     */
    async queryConfig() {
      if (this.config.siteCreationTime !== '') {
        return;
      }
      try {
        const response = await request({
          url: '/config',
          method: 'get',
        });
        const data: any = response.data || {};

        this.config = {
          // 站点创建时间
          siteCreationTime: data.siteCreationTime || '',
          // 研发人
          developedBy: {
            name: data.copyrightPerson || 'lqsBlog',
            url: data.copyrightUrl || 'http://liqingsong.cc',
          },
          // 备案
          ICP: data.icp || '浙ICP备16042703号',
          keywords: data.keywords || '',
          description: data.description || '',
        };
      } catch (error: any) {
        console.log('error useGlobalStore queryConfig', error);
      }
    },
  },
});
