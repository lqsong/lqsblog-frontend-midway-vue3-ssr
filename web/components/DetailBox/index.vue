<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { DateBlock  } from "@/components/DateBlock";
import { TCategoryPartial } from "@/typings/server/category.d";
import { previewOnly } from "@/utils/cherry-markdown";

interface Props {
  type?: 1 | 2; // 1 随笔,2作品
  showType?: boolean,
	createDate?: string;
  showCreateDate?: boolean,
  id?: number;
	title?: string;
  content?: string;
  category?:TCategoryPartial;
  hit?: number;
  showHit?:boolean;
  tag?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 1,
  showType: false,
  createDate: '',
  showCreateDate: true,
  id: 0,
  title: '',
  content: '',
  category: ()=> ({}),
  hit: 0,
  showHit: true,
  tag: '',
});

const tags = computed(()=> {
  if(!props.tag || props.tag === '') {
    return [];
  }
  return props.tag.split(',');
})

// markdown-cherry
const cherry = ref<any>(null)

// 默认执行一下
onMounted(()=> {
  cherry.value = previewOnly('lqsblog-detail-markdown', props.content);
})

// 如果有变动就重新生成一下
watch(()=> props.content, (v)=> {
  if(cherry.value) {
    cherry.value.setMarkdown(v)
  } else {
    cherry.value = previewOnly('lqsblog-detail-markdown', v);
  }
})

</script>
<template>
  <div class="container">
    <div class="lqsblog-detail-box" :class="{'no-date': props.showCreateDate === false}">
      <div v-if="props.showCreateDate" class="lqsblog-d-b-date">
        <DateBlock :value="props.createDate" show-year  />
      </div>
      <div class="lqsblog-d-b-title">{{ props.title }}</div>
      <div class="lqsblog-d-b-cloumn">
        <template v-if="props.showType">
          <router-link v-if="props.type === 1" class="cell" to="/article">随笔</router-link>
          <router-link v-else-if="props.type === 2" class="cell" to="/works">作品</router-link>
          <span v-else class="cell">--</span>
        </template>
        <router-link v-if="props.category?.id" class="cell" :to="`/${props.type === 2?'works':'article'}/${props.category?.alias}`">{{ props.category.name }}</router-link>
        <span v-if="props.showHit" class="cell">阅读<span class="lqsblog-px-2">{{ props.hit || 0 }}</span>次</span>
        <span v-if="props.tag" class="cell">
          标签：
          <router-link v-for="(item, index) in tags" :key="item + index" class="tag" :to="`/tag/${item}`">{{item}}</router-link>
        </span>
      </div>
      <div id="lqsblog-detail-markdown" class="lqsblog-detail-markdown-preview"></div>
      <div class="lqsblog-detail-content">{{ props.content }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lqsblog-detail-box {
  position: relative;
  padding: 20px 20px 20px 47px;
  background-color: var(--lqsblog-detail-box-bg-color);

    &.no-date {
      padding-left: 20px;
    }

    .lqsblog-d-b-date {
      position: absolute;
      left: -27px;
      top: 20px;
    }
    .lqsblog-d-b-title {
      padding: 2px 0;
      font-size: 20px;
      line-height: 30px;
      font-weight: var(--lqsblog-title-font-weight);
      word-break: break-all;
    }
    .lqsblog-d-b-cloumn {
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

       .tag {
        &::after {
          padding-right: 5px;
          content: ',';
          color: var(--lqsblog-desc-color);
        }
        &:last-child{
          &::after {
            display: none;
          }
        }
       }
    }

    .lqsblog-detail-markdown-preview {
      :deep(.cherry) {
        background-color: var(--lqsblog-detail-box-bg-color);
        box-shadow: none;
        .cherry-previewer {
          border: 0;
          padding: 20px 0;
          background-color: var(--lqsblog-detail-box-bg-color);
        }
      }
    }

    .lqsblog-detail-content {
      visibility: hidden;
      height: 0px;
      overflow: hidden;
    }

}
</style>
