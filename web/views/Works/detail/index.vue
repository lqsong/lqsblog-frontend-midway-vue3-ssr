<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { DetailBox } from "@/components/DetailBox";
import { useWorksDetailStore } from "./store";


const asyncData = async (store, route, router, ctx: any) => {
  await store.queryInfo(route.params.id);
}

export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store, route, ctx, router}) {
    const pageStore = useWorksDetailStore(store);
    await asyncData(pageStore, route, router, ctx);
  },
  // 服务端 seo
  seo({store}) {
    const pageStore = useWorksDetailStore(store);
    return {
      title: `${pageStore.info.title} - 作品详情`,
      keywords: pageStore.info.keywords,
      description: pageStore.info.description,
   }
  }
})
</script>
<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

// 读取数据
const pageStore = useWorksDetailStore();
// 监听地址栏参数
const id = computed<number>(()=> Number(route.params.id)); // id
watch([id], ()=> {
  // 监听，不是当前页面不执行
  if(route.name !== 'works-detail') {
    return;
  }
  asyncData(pageStore, route, router, undefined)
})
</script>
<template>
 <DetailBox
    class="lqsblog-mt-10"
    :type="2"
    show-type
    :create-date="pageStore.info.addtime"
    :title="pageStore.info.title"
    :content="pageStore.info.content"
    :category="pageStore.info.category"
    :hit="pageStore.info.hit"
    :tag="pageStore.info.tag"
  />
</template>
<style lang="scss" scoped>
</style>


