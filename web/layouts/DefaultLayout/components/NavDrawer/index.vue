<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute, RouteMeta } from 'vue-router';
import { IconSvg } from "@/components/IconSvg";
import { useClient } from "@/composable/useClient";
/*
interface Props {
	modelValue: boolean;
}
const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits<{
	(e: "update:modelValue", val: boolean): void;
}>();

const visible = computed<boolean>({
	get: () => props.modelValue,
	set: (val) => {
		emit("update:modelValue", val);
	},
});
*/

const router = useRouter();
const route = useRoute();
const meta = computed<RouteMeta>(()=> route.meta);

const { isClient } = useClient();

// drawer visible
const navDrawerVisible = ref(false);

// 打开回调
const onOpen = () => {
  const appDom = document.getElementById("app");
  appDom && (appDom.style.width = `${document.body.clientWidth}px`);
  document.querySelector("html")?.classList.add("translate-x-nav");
}
// 关闭回调
const onClose = () => {
  document.querySelector("html")?.classList.remove("translate-x-nav");
  setTimeout(() => {
    const appDom = document.getElementById("app");
    appDom && (appDom.style.width = '');
  }, 300);
}

//跳转链接
const toLink = (to?: any) => {
  if(to) {
    router.push(to);
  }
  navDrawerVisible.value = false;
}
</script>
<template>
    <div class="lqsblog-nav-fixed-icon">
      <div class="menu" @click="navDrawerVisible = true">
        <IconSvg name="menu" />
      </div>

      <slot></slot>
    </div>
    <el-drawer
      v-if="isClient"
      modal-class="lqsblog-nav-drawer-modal"
      class="lqsblog-nav-drawer"
      v-model="navDrawerVisible"
      append-to-body
      direction="ltr"
      :with-header="false"
      :size="100"
      @open="onOpen"
      @close="onClose">
      <div class="nav-link" @click="toLink('/')"  :class="{'is-active': meta.navActive === 'home'}">首页</div>
      <div class="nav-link" @click="toLink('/about')" :class="{'is-active': meta.navActive === 'about'}">关于</div>
      <div class="nav-link" @click="toLink('/article')" :class="{'is-active': meta.navActive === 'article'}">随笔</div>
      <div class="nav-link" @click="toLink('/works')" :class="{'is-active': meta.navActive === 'works'}">作品</div>
      <div class="nav-link" @click="toLink('/topics')" :class="{'is-active': meta.navActive === 'topics'}">专题</div>
      <div class="nav-link" @click="toLink('/links')" :class="{'is-active': meta.navActive === 'links'}">邻居</div>
      <a class="nav-link"  href="http://docs.liqingsong.cc" @click="toLink()" target="_blank">开源</a>
    </el-drawer>
</template>
<style lang="scss">
.lqsblog-nav-fixed-icon {
  display: none;
  position: fixed;
  left: 20px;
  top: 25px;
  width: 70px;
  font-size: 16px;
  line-height: 30px;
  color: var(--lqsblog-nav-color);
  z-index: 100;
  .menu {
    font-size: 30px;
  }
}
.lqsblog-nav-drawer-modal {
  background-color: transparent;
}
.lqsblog-nav-drawer {
  background-color: var(--lqsblog-nav-drawer-bg-color);
  .nav-link {
    display: block;
    padding: 10px 0;
    font-size: 16px;
    color: var(--lqsblog-nav-drawer-text-color);
    &.is-active {
      color: var(--lqsblog-nav-drawer-text-hover-color);
    }
  }
}

@media (max-width: 768px) {
  .lqsblog-nav-fixed-icon {
    display:block;
  }
}
</style>
