<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const props = defineProps({
    id: {
      type: String,
    },
  });
  console.log('props : ', props.id);
</script>
<template>
  <div class="common-layout">
    {{ id }}
    <el-container>
      <!-- todo 접속자 리스트 (왼쪽 사이드) -->
      <el-aside width="200px">접속자 리스트~</el-aside>
      <el-container>
        <!-- todo 팀 이름, 채팅방 나가기 버튼 -->
        <el-header> 팀 이름 / 나가기 버튼 </el-header>
        <!-- todo 채팅 영역 -->
        <el-main> 채팅 내용</el-main>
        <!-- todo 채팅 입력 영역 -->
        <el-footer> 채팅 입력 </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped></style>
<route>
  {
    meta: {
      layout: "TeamChat"
    }
  }
</route>
