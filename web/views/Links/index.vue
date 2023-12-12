<script lang="ts">
import { defineComponent } from 'vue'
import { getThumbUrl } from '@/utils/url';
import { useLinksStore } from "./store";

const asyncData = async (store, route, router, ctx: any) => {
  await store.queryList();
}

export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store, route, ctx, router}) {
    const pageStore = useLinksStore(store);
    await asyncData(pageStore, route, router, ctx);
  },
})
</script>
<script lang="ts" setup>
// 读取数据
const pageStore = useLinksStore();
</script>
<template>
 <div class="container lqsblog-mt-10">
  <div class="lqsblog-links-box">
    <div class="lqsblog-l-b-title">左邻右舍</div>

    <template v-for="(item, index) in pageStore.list" :key="index">
      <div class="lqsblog-l-b-subtitle"  >{{item.name}}</div>
      <div class="lqsblog-l-b-con">
        <div
          class="lqsblog-l-b-c-item"
          v-for="item2 in item.children" :key="item2.id">
          <a :href="item2.href" target="_blank" class="lqsblog-links-img" :style="{'background-image': 'url(' + getThumbUrl(item2['logo']) + ')'}"></a>
          <div class="lqsblog-links-text">
            <a class="lqsblog-links-text-title ellipsis" :href="item2.href" target="_blank" :title="item2.title">{{ item2.title }}</a>
            <span class="lqsblog-links-text-desc ellipsis" :title="item2.description">{{ item2.description }}</span>
          </div>
        </div>
      </div>
    </template>


  </div>
 </div>
</template>
<style lang="scss" scoped>
.lqsblog-links-box {
  position: relative;
  padding: 20px;
  background-color: var(--lqsblog-links-box-bg-color);
  .lqsblog-l-b-title,
  .lqsblog-l-b-subtitle {
    padding: 2px 0;
    font-size: 20px;
    line-height: 30px;
    font-weight: var(--lqsblog-title-font-weight);
    word-break: break-all;
  }
  .lqsblog-l-b-subtitle {
    padding: 30px 20px 20px;
    font-size: 16px;
    line-height: 26px;
  }
  .lqsblog-l-b-con {
    display: grid;
    grid-template-columns: 50% 50%;
    .lqsblog-l-b-c-item {
      padding: 10px;
      display: flex;
      .lqsblog-links-img {
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
      .lqsblog-links-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        .lqsblog-links-text-title{
          text-decoration: none;
        }
        .lqsblog-links-text-desc {
          color: var(--lqsblog-links-box-desc-text-color);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .lqsblog-links-box {
    .lqsblog-l-b-con {
      grid-template-columns: 100%;
    }
  }
}
</style>


