<script setup lang="ts">
import { Theme } from "@/components/Theme";
</script>
<template>
  <router-view  v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
  <Theme />
</template>
