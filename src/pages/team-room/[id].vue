<script setup lang="ts">
  import { nowDateFormat } from '@/utils';
  import { useTeamRoomStore } from '@/store';

  const props = defineProps({
    id: {
      type: String,
    },
  });
  // const joinTime = nowDateFormat('YYYY-MM-DD HH:mm:ss');
  const joinTime = '2023-02-17 18:00:00';
  const store = useTeamRoomStore();

  //1. 방 입장 가능한지 확인(방 존재여뮤 및 인원수)
  //2. 방 입장
  //3. 방 정보 가져오기
  //4. 방 접속자들 정보 가져오기
  //5. 입장 시점부터 대화 내용 가져오기
</script>
<template>
  <div class="common-layout">
    {{ id }} / {{ joinTime }}
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
