/**
 * 监听window滚动  composables
 * @author LiQingSong
 */
import { ref, onMounted, onUnmounted } from 'vue';
export const useWindowListenerScroll = () => {
  // 距离顶部距离
  const scrollTop = ref(0);

  const scrollFun = () => {
    if (!window) {
      return;
    }
    // 滚动条距文档顶部的距离
    const STop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    // 滚动条滚动的距离
    // let scrollStep = scrollTop - this.oldScrollTop;
    // console.log("header 滚动距离 ", scrollTop);
    // // 更新——滚动前，滚动条距文档顶部的距离
    // this.oldScrollTop = scrollTop;
    scrollTop.value = STop;
  };

  onMounted(() => {
    scrollFun(); // 默认赋值一次
    window.addEventListener('scroll', scrollFun);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollFun);
  });

  return {
    scrollTop,
  };
};
