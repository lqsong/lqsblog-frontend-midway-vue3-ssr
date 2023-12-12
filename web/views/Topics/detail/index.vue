<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { ExplainCard } from "@/components/ExplainCard";
import { ListItem } from "@/components/ListItem";
import { useTopicsDetailStore } from "./store";


const asyncData = async (store, route, router, ctx: any) => {
  await store.queryInfo(route.params.cname);
}

export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store, route, ctx, router}) {
    const pageStore = useTopicsDetailStore(store);
    await asyncData(pageStore, route, router, ctx);
  },
  // 服务端 seo
  seo({store}) {
    const pageStore = useTopicsDetailStore(store);
    return {
      title: pageStore.info.title,
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
const pageStore = useTopicsDetailStore();
// cname
const cname = computed<number>(()=> Number(route.params.cname));
watch([cname], ()=> {
  // 监听，不是当前页面不执行
  if(route.name !== 'topics-detail') {
    return;
  }
  asyncData(pageStore, route, router, undefined)
})

</script>
<template>
  <ExplainCard  class="lqsblog-mt-10" :title="`专题：${pageStore.info.title}`"  />

  <ListItem
    v-for="(item, index) in pageStore.info.list"
    :key="`${item.type} - ${item.id}-${index}`"
    class="lqsblog-mt-10"
    :type="item.type"
    show-type
    :create-date="item.addtime"
    :id="item.id"
    :title="item.title"
    :description="item.description"
    :thumb="item.thumb?.split('|')"
    :category="item.category"
    :hit="item.hit"
    :tag="item.tag"
  />

</template>
<style lang="scss" scoped>
</style>


