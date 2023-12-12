/**
 * 是否客户端  composables
 * @author LiQingSong
 */

import { onMounted, ref } from 'vue';

export const useClient = () => {
  const isClient = ref(false);

  onMounted(() => {
    isClient.value = true;
  });

  return {
    isClient,
  };
};
