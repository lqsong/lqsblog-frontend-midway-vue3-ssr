<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import useTitle from "@/composable/useTitle";
import { ExplainCard } from "@/components/ExplainCard";
import { NoData } from "@/components/NoData";
import { ListItem } from "@/components/ListItem";
import { Pagination } from "@/components/Pagination";
import { useTagStore } from "./store";

const asyncData = async (store, route, router, ctx: any) => {
  const cname = route.params.cname || '';
  const code = await store.queryDetail(cname);
  if(code !==0 ) {
    if(ctx) {
      // 服务端
      ctx.redirect('/404')
    } else {
      router.push('/404')
    }
    return;
  }

  // 读取列表数据
  await store.queryList({
    page: route.query.page,
    per:  route.query.per,
    name: cname,
    refresh: route.query.refresh
  });
}

export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store, route, ctx, router}) {
    // 页面数据
    const pageStore = useTagStore(store);
    await asyncData(pageStore, route, router, ctx);
  },
  // 服务端 seo
  seo({ route }) {
    return {
      title: `${route.params.cname} - 标签`,
    };
  }
})
</script>
<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

// 读取数据
const pageStore = useTagStore();
// 读取数据 - 后端返回的列表长度
const listLen = computed(()=> pageStore.list.length);
// 当前页码
const page = computed(()=>route.query.page);
// cname
const cname = computed(()=> route.params.cname);

watch([page, cname], ()=> {
  // 监听，不是当前页面不执行
  if(route.name !== 'tag-cname') {
    return;
  }
  asyncData(pageStore, route, router, undefined);
})


/* 客户端 seo，因为在当前页面可以重复点击标签，所以需要单独设置一下客服端浏览器title */
const clientSeo = computed(()=> {
  return {
    title: `${cname.value} - 标签`,
  };
})
useTitle(clientSeo);

</script>
<template>

  <ExplainCard  class="lqsblog-mt-10" :title="`标签：${cname}`"  />

  <template v-if="listLen > 0">
    <ListItem
      v-for="(item, index) in pageStore.list"
      :key="`${item.type} - ${item.id}-${index}`"
      class="lqsblog-mt-10"
      :type="item.type"
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

    <div class="container lqsblog-py-10">
      <pagination :total="pageStore.pagination.total" :current-page="pageStore.pagination.currentPage" :page-url="pageStore.paginationUrl(route)"></pagination>
    </div>
  </template>
  <NoData v-else />
</template>
<style lang="scss" scoped>
</style>


