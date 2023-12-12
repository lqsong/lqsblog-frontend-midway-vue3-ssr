<script lang="ts">
import { defineComponent } from 'vue'
import { DetailBox } from "@/components/DetailBox";
import { useAboutStore } from "./store";
export default defineComponent({
  // 在服务端或路由更新之前被调用
  async asyncData({store}) {
    const aboutStore = useAboutStore(store);
    await aboutStore.queryInfo();
  },
  // 服务端 seo
  seo({store}) {
    const aboutStore = useAboutStore(store);
    return {
      title: aboutStore.info.title,
      keywords: aboutStore.info.keywords,
      description: aboutStore.info.description,
   }
  }
})
</script>
<script lang="ts" setup>
// 读取数据
const aboutStore = useAboutStore();
</script>
<template>
  <DetailBox
    class="lqsblog-mt-10"
    title="About Me"
    :show-create-date="false"
    :show-hit="false"
    :content="aboutStore.info.content"
    />
</template>
<style lang="scss" scoped></style>

