<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import useTitle from '@/composable/useTitle';
import { ExplainCard } from "@/components/ExplainCard";
import { DetailBox } from "@/components/DetailBox";
import { ListItem } from "@/components/ListItem";
import { useArticleDetailStore } from "./store";


const asyncData = async (store, route, router, ctx: any) => {
  await store.queryInfo(route.params.id);
  await store.queryInterest(store.info.interestIds);
}

export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store, route, ctx, router}) {
    const pageStore = useArticleDetailStore(store);
    await asyncData(pageStore, route, router, ctx);
  },
  // 服务端 seo
  seo({store}) {
    const pageStore = useArticleDetailStore(store);
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
const pageStore = useArticleDetailStore();
// 监听地址栏参数
const id = computed<number>(()=> Number(route.params.id)); // id
watch([id], ()=> {
  // 监听，不是当前页面不执行
  if(route.name !== 'article-detail') {
    return;
  }
  asyncData(pageStore, route, router, undefined)
})


/* 客户端 seo，因为点击感兴趣的内容会在当前页面请求新的随笔详情，所以需要单独设置一下客服端浏览器title */
const clientSeo = computed(()=> {
  return {
    title: `${pageStore.info.title} - 随笔详情`,
    keywords: pageStore.info.keywords || '',
    description: pageStore.info.description || '',
  };
})
useTitle(clientSeo);
</script>
<template>
 <DetailBox
    class="lqsblog-mt-10"
    :type="1"
    show-type
    :create-date="pageStore.info.addtime"
    :title="pageStore.info.title"
    :content="pageStore.info.content"
    :category="pageStore.info.category"
    :hit="pageStore.info.hit"
    :tag="pageStore.info.tag"
  />

  <template v-if="pageStore.interest.length>0">
    <ExplainCard title="您可能感兴趣的"  class="lqsblog-mt-10" />
    <ListItem
        v-for="(item, index) in pageStore.interest"
        :key="`${item.id}-${index}`"
        class="lqsblog-mt-5"
        :type="1"
        show-type
        :create-date="item.addtime"
        :id="item.id"
        :title="item.title"
        :description="item.description"
        :thumb="item.thumb"
        :category="item.category"
        :hit="item.hit"
        :tag="item.tag"
    />
  </template>
</template>
<style lang="scss" scoped>
</style>


