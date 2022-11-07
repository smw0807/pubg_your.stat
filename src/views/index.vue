<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import mainSearch from '@/components/search/search.vue';
import { useSearchStore } from '@/store/search';
import type { ISearchForm } from '@/interfaces';

const store = useSearchStore();
const route = useRouter();

//플랫폼
const platform: Ref<string> = ref('');
function defPlatform(params: string) {
  platform.value = params;
}
//현재 시즌 세팅
async function setNowSeason() {
  await store.setSeason(platform.value);
}

//전적 검색
async function search(params: ISearchForm) {
  route.push(`/profile/${params.platform}/${params.nickname}`);
}

onMounted(() => {
  console.log('Mounted!!!');
  setNowSeason();
});
</script>

<template>
  <div class="main">
    <el-row align="middle" justify="center">
      <el-col>
        <mainSearch @search-info="search" @platform="defPlatform" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
</style>