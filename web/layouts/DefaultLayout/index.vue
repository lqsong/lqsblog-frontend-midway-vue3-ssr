<script lang="ts">
import { defineComponent  } from 'vue'
import { useGlobalStore } from "@/store/global";
export default defineComponent({
  async asyncData({store, route, ctx, router}) {
    const globalStore = useGlobalStore(store);
    // 获取配置
    await globalStore.queryConfig();
  }
})
</script>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, RouteMeta } from 'vue-router';
import { useWindowListenerScroll } from "@/composable/useWindowListenerScroll";
import { NavDrawer } from "./components/NavDrawer";
import { APlayer } from "./components/APlayer";
import { NavSearch } from "./components/NavSearch";
const route = useRoute();
const meta = computed<RouteMeta>(()=> route.meta);

// 音乐播放器
const { scrollTop } = useWindowListenerScroll();
const isPlayerMini = computed(()=> scrollTop.value>80)

// 读取站点配置
const globalStore = useGlobalStore();

</script>
<template>
    <div class="lqsblog-player-box" :class="{'mini': isPlayerMini}">
      <div class="lqsblog-player" :class="{'mini': isPlayerMini}">
        <APlayer :mini="isPlayerMini" />
      </div>
    </div>
    <div class="container">
        <div class="row _clearing lqsblog-nav">
          <router-link class="nav-link" to="/" :class="{'is-active': meta.navActive === 'home'}">首页</router-link>
          <router-link class="nav-link" to="/about" :class="{'is-active': meta.navActive === 'about'}">关于</router-link>
          <router-link class="nav-link" to="/article" :class="{'is-active': meta.navActive === 'article'}">随笔</router-link>
          <router-link class="nav-link" to="/works" :class="{'is-active': meta.navActive === 'works'}">作品</router-link>
          <router-link class="nav-link" to="/topics" :class="{'is-active': meta.navActive === 'topics'}">专题</router-link>
          <router-link class="nav-link" to="/links" :class="{'is-active': meta.navActive === 'links'}">邻居</router-link>
          <a class="nav-link" href="http://docs.liqingsong.cc" target="_blank">开源</a>

          <NavSearch />

        </div>
    </div>
    <NavDrawer>
      <NavSearch />
    </NavDrawer>

    <router-view></router-view>

    <div class="container lqsblog-footer lqsblog-py-10">
          © {{ globalStore.config.siteCreationTime }}-present All Rights Reserved<span class="lqsblog-px-2">⋅</span>Developed by
          <a :href="globalStore.config.developedBy.url" target="_blank">{{globalStore.config.developedBy.name}}</a><span class="lqsblog-px-2">⋅</span>
          <a href="https://beian.miit.gov.cn/" rel="external nofollow" target="_blank">{{globalStore.config.ICP}}</a>
    </div>

    <el-backtop :right="10" :bottom="20"></el-backtop>
</template>

<style lang="scss">
/* 音乐播放器 S */
.lqsblog-player-box,
.lqsblog-player {
  display: flex;
  height: 160px;
  z-index: 99;
  background-color: var(--lqsblog-player-bg-color);
  transition: all 0.3s, background-image 1s ease;

  &.mini {
    height: 80px;
    box-shadow: 0 10px 50px -15px rgba(0,0,0,.1)!important
  }

}
.lqsblog-player {
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;

  background-position: center top;
  background-size:cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  // transition: background-image 1s ease;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: url('@/assets/images/bg-fixed.png') repeat;
  }
}

/* 导航 S */
.lqsblog-nav {
  justify-content: center;
  .nav-link {
    display: block;
    padding: 5px 10px;
    font-size: 14px;
    color: var(--lqsblog-nav-color);
    &:hover,
    &.is-active{
      color: var(--lqsblog-nav-hover-color);
    }
  }
}

/* 底部 S */
.lqsblog-footer {
  text-align: center;
  color: var(--lqsblog-footer-color);
  a {
    color: var(--lqsblog-footer-color);
  }
}

@media (max-width: 768px) {
  .lqsblog-nav {
    display: none !important;
  }
}
</style>
