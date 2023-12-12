<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { getThumbUrl } from "@/utils/url";
import { NoData } from "@/components/NoData";
import { Pagination } from "@/components/Pagination";
import { useTopicsStore } from "./store";

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
    const pageStore = useTopicsStore(store);
    await asyncData(pageStore, route, router, ctx);
  }
})
</script>
<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

// 读取数据
const pageStore = useTopicsStore();
// 读取数据 - 后端返回的列表长度
const listLen = computed(()=> pageStore.list.length);
// 当前页码
const page = computed(()=>route.query.page);


watch([page], ()=> {
  // 监听，不是当前页面不执行
  if(route.name !== 'topics-list') {
    return;
  }

  asyncData(pageStore, route, router, undefined)
})

</script>
<template>
  <template v-if="listLen > 0">
    <div
      class="container lqsblog-mt-10"
      v-for="(item, index) in pageStore.list"
      :key="`${item.id}-${index}`">
      <div class="lqsblog-topics-item">
        <div class="lqsblog-t-i-title">
          <router-link :to="`/topics/detail/${item.alias}`">{{item.title}}</router-link>
        </div>
        <div class="lqsblog-t-i-cloumn">
          <router-link class="cell" to="/topics">专题</router-link>
          <span class="cell"><span class="lqsblog-pr-2">{{item.quantity || 0}}</span>篇文章</span>
        </div>

        <div
          class="lqsblog-t-i-item"
          v-for="(item2) in item.conlist"
          :key="`${item.id}-${item2.id}`">
          <template v-if="item2.type === 1">
            <router-link :to="`/article/detail/${item2.id}`" class="lqsblog-t-i-item-img" :style="{'background-image': 'url(' + getThumbUrl(item2.thumb) + ')'}"></router-link>
            <router-link :to="`/article/detail/${item2.id}`" class="lqsblog-t-i-item-text ellipsis-l2">{{ item2.title }}</router-link>
          </template>
          <template v-else-if="item2.type === 2">
            <router-link :to="`/works/detail/${item2.id}`" class="lqsblog-t-i-item-img" :style="{'background-image': 'url(' + getThumbUrl(item2.thumb) + ')'}"></router-link>
            <router-link :to="`/works/detail/${item2.id}`" class="lqsblog-t-i-item-text ellipsis-l2">{{ item2.title }}</router-link>
          </template>
          <template v-else>
            <span class="lqsblog-t-i-item-img" :style="{'background-image': 'url(' + getThumbUrl(item2.thumb) + ')'}"></span>
            <span class="lqsblog-t-i-item-text ellipsis-l2">{{ item2.title }}</span>
          </template>
        </div>

      </div>
    </div>

    <div class="container lqsblog-py-10">
      <pagination :total="pageStore.pagination.total" :current-page="pageStore.pagination.currentPage" :page-url="pageStore.paginationUrl(route)"></pagination>
    </div>
  </template>
  <NoData v-else />
</template>
<style lang="scss" scoped>
.lqsblog-topics-item {
    position: relative;
    padding: 20px;
    background-color: var(--lqsblog-topics-item-bg-color);
    .lqsblog-t-i-title {
      padding: 2px 0;
      font-size: 20px;
      line-height: 30px;
      font-weight: var(--lqsblog-title-font-weight);
      word-break: break-all;
    }
    .lqsblog-t-i-cloumn {
       padding: 7px 0;
       font-size: 12px;
       line-height: 20px;
       color: var(--lqsblog-desc-color);
       a {
        color: var(--lqsblog-desc-color);
        &:hover {
           color: var(--lqsblog-a-hover-text-color);
        }
       }
       .cell {
         &::after {
          padding: 0 10px;
          content: "/";
          color: var(--lqsblog-desc-color);
         }
         &:last-child {
          &::after {
            display: none;
          }
         }
       }
    }

    .lqsblog-t-i-item {
      padding: 10px 0;
      display: flex;
      align-items: center;
      .lqsblog-t-i-item-img {
        border: 0;
        border-radius: 50%!important;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-color: hsla(0,0%,47.1%,.1);
        overflow: hidden;
      }
      .lqsblog-t-i-item-text {
        flex: 1;
      }
    }
}
</style>


