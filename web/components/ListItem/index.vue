<script setup lang="ts">
import { computed } from "vue";
import { DateBlock  } from "@/components/DateBlock";
import { TCategoryPartial } from "@/typings/server/category.d";

interface Props {
  type?: number; // 1 随笔,2作品
  showType?: boolean,
	createDate?: string;
  id?: number;
	title?: string;
  description?: string;
  thumb?: string[],
  category?:TCategoryPartial;
  hit?: number;
  tag?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 1,
  showType: false,
  createDate: '',
  id: 0,
  title: '',
  description: '',
  thumb: ()=> [],
  category: ()=> ({}),
  hit: 0,
  tag: '',
});

const tags = computed(()=> {
  if(!props.tag || props.tag === '') {
    return [];
  }
  return props.tag.split(',');
})

const thumbLen = computed(()=>props.thumb.length);
</script>
<template>
<div class="container">
  <div class="lqsblog-list-item">
    <div class="lqsblog-l-i-date">
      <DateBlock :value="props.createDate"  />
    </div>
    <div class="lqsblog-l-i-title">
      <router-link v-if="props.type === 1" :to="`/article/detail/${props.id}`">{{ props.title }}</router-link>
      <router-link v-else-if="props.type === 2" :to="`/works/detail/${props.id}`">{{ props.title }}</router-link>
      <span v-else>{{ props.title }}</span>
    </div>
    <div class="lqsblog-l-i-cloumn">
      <template v-if="props.showType">
        <router-link v-if="props.type === 1" class="cell" to="/article">随笔</router-link>
        <router-link v-else-if="props.type === 2" class="cell" to="/works">作品</router-link>
        <span v-else class="cell">--</span>
      </template>
      <router-link v-if="props.category?.id" class="cell" :to="`/${props.type === 2?'works':'article'}/${props.category?.alias}`">{{ props.category.name }}</router-link>
      <span v-if="props.hit" class="cell">阅读<span class="lqsblog-px-2">{{ props.hit }}</span>次</span>
      <span v-if="props.tag" class="cell">
        标签：
        <router-link v-for="(item, index) in tags" :key="item + index" class="tag" :to="`/tag/${item}`">{{item}}</router-link>
      </span>
    </div>

    <template v-if="thumbLen>3">
      <div class="lqsblog-l-i-desc thumbs">
        <div class="lqsblog-l-i-thumb-box">
          <div class="lqsblog-l-i-thumb" :style="`background-image: url('${props.thumb[0]}');`"></div>
        </div>
        <div class="lqsblog-l-i-thumb-box">
          <div class="lqsblog-l-i-thumb" :style="`background-image: url('${props.thumb[1]}');`"></div>
        </div>
        <div class="lqsblog-l-i-thumb-box">
          <div class="lqsblog-l-i-thumb" :style="`background-image: url('${props.thumb[2]}');`"></div>
        </div>
        <div class="lqsblog-l-i-thumb-box">
          <div class="lqsblog-l-i-thumb" :style="`background-image: url('${props.thumb[3]}');`"></div>
        </div>
      </div>
      <div class="lqsblog-l-i-desc thumbs">
        <div class="lqsblog-l-i-desc-box">{{ props.description }}</div>
      </div>
    </template>
    <div v-else-if="thumbLen === 0" class="lqsblog-l-i-desc">
      <div class="lqsblog-l-i-desc-box">{{ props.description }}</div>
    </div>
    <div v-else class="lqsblog-l-i-desc">
      <div class="lqsblog-l-i-thumb-box">
        <div class="lqsblog-l-i-thumb" :style="`background-image: url('${props.thumb[0]}');`"></div>
      </div>
      <div class="lqsblog-l-i-desc-box">{{ props.description }}</div>
    </div>

  </div>
</div>

</template>
<style lang="scss" scoped>
  .lqsblog-list-item {
    position: relative;
    padding: 20px 20px 20px 47px;
    background-color: var(--lqsblog-list-item-bg-color);
    .lqsblog-l-i-date {
      position: absolute;
      left: -27px;
      top: 20px;
    }
    .lqsblog-l-i-title {
      padding: 2px 0;
      font-size: 20px;
      line-height: 30px;
      font-weight: var(--lqsblog-title-font-weight);
      word-break: break-all;
    }
    .lqsblog-l-i-cloumn {
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
    .lqsblog-l-i-desc {
      display: flex;
      .lqsblog-l-i-thumb-box {
        margin-right: 20px;
        flex: 0 0 25%;
        max-width: 200px;

        .lqsblog-l-i-thumb {
          position: relative;
          display: block;
          overflow: hidden;
          padding: 0;
          border-radius: 4px;
          // background-color: var(--lqsblog-desc-color);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          &:after {
            content: "";
            display: block;
            padding-top: 100%;
          }
        }

      }
      .lqsblog-l-i-desc-box {
        flex: 1;
        color: var(--lqsblog-desc-color);
        word-break: break-all;
      }

      /* 4个缩略图模式 */
      &.thumbs {
        justify-content: space-between;
        .lqsblog-l-i-thumb-box {
          flex: 0 0 24%;
          margin: 0;
        }
        .lqsblog-l-i-desc-box {
          margin-top: 10px;
        }

      }
    }
  }

  @media (max-width: 768px) {
    .lqsblog-list-item {
      .lqsblog-l-i-desc{
        flex-direction: column;
        .lqsblog-l-i-thumb-box {
          flex: 1;
        }
        .lqsblog-l-i-desc-box {
          margin: 10px 0 0;
        }

         /* 4个缩略图模式 */
        &.thumbs {
          flex-direction: row;
        }
      }
    }
  }
</style>
