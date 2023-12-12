<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IconSvg } from "@/components/IconSvg";
import { getToken, setToken } from "./utils";

/*
interface Props {
}
const props = withDefaults(defineProps<Props>(), {});
*/

// 是否显示侧边主题
const isActive = ref(false);
const toggleActive = () => {
  isActive.value = !isActive.value;
}

// 当前主题
const themeCurrent = ref('slide');
// html节点
const htmlDom = ref<HTMLHtmlElement | null>(null);
// 幻灯片index
const slideIndex = ref(0);
// 幻灯片计时器
const slideTimer = ref<any>(null);
// 幻灯片切换时间
const slideTimeOut = 5000;
// 幻灯片执行函数
const execSlideTheme = () => {
  htmlDom.value?.classList.remove("theme-bg-" + slideIndex.value);
  if(slideIndex.value>=5) {
    slideIndex.value = 0;
  } else {
    slideIndex.value++;
  }
  htmlDom.value?.classList.add("theme-bg-" + slideIndex.value);

  slideTimer.value = setTimeout(()=> {
    execSlideTheme();
  }, slideTimeOut)
}
onMounted(()=> {
  // 初始化主题
  themeCurrent.value = getToken() || 'slide';
  // html节点
  htmlDom.value = document.querySelector("html");

  if(themeCurrent.value !== 'slide') {
    // 不是幻灯片
    htmlDom.value?.classList.remove("theme-bg-0");
    htmlDom.value?.classList.add("theme-bg-" + themeCurrent.value);
    return;
  }

  /* 幻灯片 S */
  slideTimer.value = setTimeout(()=> {
    execSlideTheme();
  }, slideTimeOut)
})

// 设置主题
const setTheme = (name: string) => {
  if(!name || name === themeCurrent.value) {
    // 设置的是当前主题，一样的
    return;
  }

  if(name === 'slide') {
    // 设置的是幻灯片主题
    htmlDom.value?.classList.remove("theme-bg-" + themeCurrent.value);
    htmlDom.value?.classList.add("theme-bg-0");
    // 设置幻灯片开始
    slideTimer.value = setTimeout(()=> {
      execSlideTheme();
    }, slideTimeOut)
  } else {
    // 除了幻灯片，其他的主题
    if(slideTimer.value) {
      clearTimeout(slideTimer.value)
      slideTimer.value = null;
      htmlDom.value?.classList.remove("theme-bg-" + slideIndex.value);
      slideIndex.value = 0;
    } else {
      htmlDom.value?.classList.remove("theme-bg-" + themeCurrent.value);
    }

    htmlDom.value?.classList.add("theme-bg-" + name);
  }

  // 存储主题
  themeCurrent.value = name;
  setToken(name);
}
</script>
<template>
 <div class="lqsblog-theme" :class="{'is-active': isActive}">
  <div class="lqsblog-theme-icon" @click="toggleActive">
    <IconSvg class="icon" name="fold" />
  </div>
  <el-scrollbar>
    <div class="lqsblog-theme-item bg-slide" @click="setTheme('slide')" :class="{'is-active': themeCurrent === 'slide'}">幻灯片</div>
    <div class="lqsblog-theme-item bg-0" @click="setTheme('0')" :class="{'is-active': themeCurrent === '0'}">朦胧</div>
    <div class="lqsblog-theme-item bg-1" @click="setTheme('1')" :class="{'is-active': themeCurrent === '1'}">热情</div>
    <div class="lqsblog-theme-item bg-2" @click="setTheme('2')" :class="{'is-active': themeCurrent === '2'}">清幽</div>
    <div class="lqsblog-theme-item bg-3" @click="setTheme('3')" :class="{'is-active': themeCurrent === '3'}">青翠</div>
    <div class="lqsblog-theme-item bg-4" @click="setTheme('4')" :class="{'is-active': themeCurrent === '4'}">花红</div>
    <div class="lqsblog-theme-item bg-5" @click="setTheme('5')" :class="{'is-active': themeCurrent === '5'}">清新</div>
    <div class="lqsblog-theme-item bg-dark" @click="setTheme('dark')" :class="{'is-active': themeCurrent === 'dark'}">黑夜</div>
  </el-scrollbar>
 </div>
</template>
<style lang="scss" scoped>
.lqsblog-theme {
  position: fixed;
  right: -120px;
  top:0;
  bottom:0;
  width: 120px;
  background-color: #fff;
  z-index: 101;
  transition: 0.3s;

  .lqsblog-theme-icon {
    position: absolute;
    left: -28px;
    top: 50%;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align:center;
    font-size: 22px;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    opacity: 0.5;
    background-color: #fff;

    &:hover {
      opacity: 1;
    }

  }

  .lqsblog-theme-item {
    position: relative;
    height: 50px;
    margin: 10px;
    cursor: pointer;
    background-position: center top;
    background-size:cover;
    background-repeat: no-repeat;
    display:flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;

    &::after {
      display: none;
      content: "";
      position: absolute;
      left: -3px;
      top: -3px;
      bottom: -3px;
      right: -3px;
      border: 2px solid var(--lqsblog-color-primary);
    }

    &.is-active {
      &::after {
        display: block;
      }
    }

    &.bg-0 {
      background-image: url('@/assets/images/bg-0.jpg');
    }
    &.bg-1 {
      background-image: url('@/assets/images/bg-1.jpg');
    }
    &.bg-2 {
      background-image: url('@/assets/images/bg-2.jpg');
    }
    &.bg-3 {
      background-image: url('@/assets/images/bg-3.jpg');
    }
    &.bg-4 {
      background-image: url('@/assets/images/bg-4.jpg');
    }
    &.bg-5 {
      background-image: url('@/assets/images/bg-5.jpg');
    }
    &.bg-slide {
       background-color: #515c6b;
    }
    &.bg-dark {
      background-color: #000;
    }
  }

  &.is-active {
    right: 0;
    .lqsblog-theme-icon {
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
      .icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
