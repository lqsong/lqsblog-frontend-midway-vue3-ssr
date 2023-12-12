<script lang="ts" setup>
import { useRoute } from "vue-router";
import { NoData } from "@/components/NoData";
const route = useRoute()
</script>
<template>
  <NoData v-if="route.path === '/500'" title="500" desc="应用发生错误异常..." />
  <NoData v-else title="404" />
</template>
<style lang="scss" scoped>
</style>
