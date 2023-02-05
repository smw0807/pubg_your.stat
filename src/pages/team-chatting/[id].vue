<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const props = defineProps({
    id: {
      type: String,
    },
  });
  const route = useRoute();
  console.log('props : ', props.id);

  // const uid = route.params.uid;
  // console.log('uid : ', uid);
  //todo 팀 정보 가져오기
</script>
<template>
  {{ id }}
  <!-- todo 팀 이름, 채팅방 나가기 버튼 -->
  <!-- todo 접속자 리스트 (왼쪽 사이드) -->
  <!-- todo 채팅 영역 -->
  <!-- todo 채팅 입력 영역 -->
</template>
<style scoped></style>
<route>
  {
    meta: {
      layout: "TeamChat"
    }
  }
</route>
