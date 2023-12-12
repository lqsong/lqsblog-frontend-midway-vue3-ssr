<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {  ElMessage } from "element-plus";
import { IconSvg } from "@/components/IconSvg";
import { useClient } from "@/composable/useClient";
const router = useRouter();

const { isClient } = useClient();
const dialogVisible = ref(false);
const keyword = ref('');
const onSearch = ()=> {
  if(keyword.value=== '' || !keyword.value) {
    ElMessage({
      message: '请输入搜索内容',
      type: 'warning',
    })
    return;
  }
  router.push("/search/" + keyword.value);
  dialogVisible.value = false;
}
</script>
<template>
	 <div class="nav-search" @click="dialogVisible = true">
      <IconSvg name="search" />
    </div>
    <el-dialog
      v-if="isClient"
      class="custom-dialog no-title nav-search-dialog"
      v-model="dialogVisible"
      append-to-body
  >
  <el-input v-model.trim="keyword" placeholder="请输入搜索内容"   @keyup.enter="onSearch">
      <template #append>
        <el-button @click="onSearch">搜索</el-button>
      </template>
    </el-input>
  </el-dialog>
</template>
<style lang="scss">
.nav-search {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--lqsblog-nav-color);
}
.nav-search-dialog {
  --el-dialog-width: 90%;
  max-width: 500px;
}
</style>
