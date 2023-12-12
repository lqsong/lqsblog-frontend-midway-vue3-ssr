<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { ListItem } from "@/components/ListItem";
import { Pagination } from "@/components/Pagination";
import { useGlobalStore } from "@/store/global";
import { useHomeStore } from "./store";

const asyncData = async (store, route, router, ctx: any) => {
    // 读取
    await store.queryList({
      page: route.query.page,
      per: route.query.per,
      refresh: route.query.refresh
    });
}

export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store, route, ctx, router}) {
    // 页面数据
    const pageStore = useHomeStore(store);
    await asyncData(pageStore, route, router, ctx);
  },
  // 服务端 seo
  seo({store}) {
    // 读取站点配置
    const globalStore = useGlobalStore(store);
    return {
      title: '首页',
      keywords: globalStore.config.keywords,
      description: globalStore.config.description,
    }
  }
})
</script>
<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

// 读取数据
const pageStore = useHomeStore();
// 读取数据 - 后端返回的列表长度
const listLen = computed(()=> pageStore.list.length);
// 当前页码
const page = computed(()=>route.query.page);


watch([page], ()=> {
  // 监听，不是当前页面不执行
  if(route.name !== 'home') {
    return;
  }

  asyncData(pageStore, route, router, undefined)
})

</script>
<template>
  <ListItem
    v-for="(item, index) in pageStore.list"
    :key="`${item.id}-${index}`"
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

  <div v-if="listLen > 0" class="container lqsblog-py-10">
    <pagination :total="pageStore.pagination.total" :current-page="pageStore.pagination.currentPage" :page-url="pageStore.paginationUrl(route)"></pagination>
  </div>
</template>
<style lang="scss" scoped>
</style>


