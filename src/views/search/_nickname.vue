<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSearchStore } from '@/store/search';
import type { ISearchForm } from '@/interfaces';

const store = useSearchStore();
const route = useRoute();

console.log(route.params);

const params = {
  platform: route.params.platform,
  nickname: route.params.nickname,
};
//전적 검색
async function search(params: ISearchForm) {
  const rs = await store.searchPlayer(params);
  console.log(rs);
}
onMounted(() => {
  search(params);
});
</script>

<template>
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>gdgd </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>