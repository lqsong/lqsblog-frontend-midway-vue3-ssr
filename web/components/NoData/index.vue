<script setup lang="ts">
interface Props {
	title?: string;
  desc?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: 'Oh, what a shame!',
  desc: '抱歉，没有你要找的内容...'
});

</script>
<template>
 <div class="container">
    <div class="lqsblog-nodata">
      <img src="@/assets/images/nodata.gif" />
      <h1>{{ props.title }}</h1>
      <p>{{  props.desc }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lqsblog-nodata {
  margin-top: 3rem;
  padding: 20px 0;
  text-align: center;
  background-color: var(--lqsblog-list-item-bg-color);
  img {
      max-width: 100%;
  }
  h1 {
    padding: 0;
    margin: 0;
  }
}
</style>
