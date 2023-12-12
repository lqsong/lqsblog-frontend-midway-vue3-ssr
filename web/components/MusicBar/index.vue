<script setup lang="ts">

</script>
<template>
<div class="lqsblog-music-bar">
  <span style="--lqsblog-music-bar-d: 7"></span>
  <span style="--lqsblog-music-bar-d: 6"></span>
  <span style="--lqsblog-music-bar-d: 5"></span>
  <span style="--lqsblog-music-bar-d: 4"></span>
  <span style="--lqsblog-music-bar-d: 3"></span>
  <span style="--lqsblog-music-bar-d: 2"></span>
  <span style="--lqsblog-music-bar-d: 1"></span>
  <span style="--lqsblog-music-bar-d: 0"></span>
  <span style="--lqsblog-music-bar-d: 1"></span>
  <span style="--lqsblog-music-bar-d: 2"></span>
  <span style="--lqsblog-music-bar-d: 3"></span>
  <span style="--lqsblog-music-bar-d: 4"></span>
  <span style="--lqsblog-music-bar-d: 5"></span>
  <span style="--lqsblog-music-bar-d: 6"></span>
  <span style="--lqsblog-music-bar-d: 7"></span>
</div>

</template>
<style lang="scss">
 :root {
    --lqsblog-music-bar-h: 40px;
  }
  @keyframes lqsblog-music-bar-loading {
  0% {
    background-image: linear-gradient(to right, #735284 0%, #DD6D71 100%);
    height: 20%;
    border-radius: calc(var(--lqsblog-music-bar-h) * 0.2 * 0.5);
  }
  50% {
    background-image: linear-gradient(to top, #DD6D71 0%, #84CEAE 100%);
    height: 100%;
    border-radius: calc(var(--lqsblog-music-bar-h) * 1 * 0.5);
  }
  100% {
    background-image: linear-gradient(to top, #84CEAE 0%, #FFB56B 100%);
    height: 20%;
    border-radius: calc(var(--lqsblog-music-bar-h) * 0.2 * 0.5);
  }
}
.lqsblog-music-bar {
  display: flex;
  align-items: center;
  position: relative;
  height: var(--lqsblog-music-bar-h);
  span {
    background: linear-gradient(to top, #DD6D71 0%, #84CEAE 100%);
    width: 2px;
    height: 20%;
    border-radius: calc(var(--lqsblog-music-bar-h) * 0.2 * 0.5);
    margin-right: 2px;
    animation: lqsblog-music-bar-loading 2.5s infinite linear;
    animation-delay: calc(0.2s * var(--lqsblog-music-bar-d));
    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
