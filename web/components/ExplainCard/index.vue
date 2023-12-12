<script setup lang="ts">
interface Props {
	title?: string;
  desc?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  desc: ''
});

</script>
<template>
 <div class="container">
    <div class="lqsblog-explain-card lqsblog-px-10 lqsblog-py-5">
      <h2 v-if="props.title">{{ props.title }}</h2>
      <span v-if="props.desc">{{props.desc}}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lqsblog-explain-card {
  background-color: var(--lqsblog-explain-card-bg-color);
  color: var(--lqsblog-explain-card-text-color);
  word-break: break-all;
  h2 {
    padding: 0;
    margin: 0;
  }
}
</style>
