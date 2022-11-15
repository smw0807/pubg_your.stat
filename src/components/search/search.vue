<script setup lang="ts">
  /**
   * 검색 컴포넌트
   * 플랫폼 선택 후 닉네임 입력 뒤 검색 누르면
   * platform, nickname을 (emit)searchInfo로 전달함
   */
  import { ref, onMounted, defineEmits } from 'vue';
  import type { Ref } from 'vue';
  import { useSearchStore } from '@/store/search';
  //icon
  import { Search } from '@element-plus/icons-vue';

  const store = useSearchStore();
  const $emit = defineEmits(['searchInfo']);

  //========== select ======================================================= S
  interface gameType {
    label: string; // UI에 표시할 값
    value: string;
  }
  const defaultGameType: string = 'steam'; //기본 값
  const _lsGameType: Ref<string | null> = ref(
    localStorage.getItem('zz_gameType')
  ); //로컬스토리지 값 가져오기
  const selGameType: Ref<string | null> = ref(_lsGameType);
  const gameTypes: Ref<gameType[]> = ref([
    //셀렉트박스 options 데이터
    { label: '스팀', value: 'steam' },
    { label: '카카오', value: 'kakao' },
  ]);
  //셀렉트박스 값 변경 이벤트
  const changeGameType = (v: string): void => {
    localStorage.setItem('zz_gameType', v);
  };
  //========== select ======================================================= E

  //닉네임
  const userNickName: Ref<string> = ref('');

  //검색 플랫펌, 닉네임 넘기기
  const searchUser = async () => {
    const params = {
      platform: selGameType.value,
      nickname: userNickName.value,
    };
    $emit('searchInfo', params);
  };

  onMounted(() => {
    if (!_lsGameType) {
      //로컬스토리지 아이템이 없으면 셋팅
      localStorage.setItem('zz_gameType', defaultGameType);
      selGameType.value = defaultGameType;
    }
    userNickName.value = '';
  });
</script>

<template>
  <div>
    <el-row>
      <el-col align="middle">
        <el-input
          v-model="userNickName"
          placeholder="게임 닉네임(대소문자가 일치해야 됩니다.)"
          class="input-with-select"
          size="large"
          style="width: 500px"
          @keyup.enter="searchUser"
        >
          <template #prepend>
            <!-- el-input 안에 slot 형식으로 el-select는 뭔가 다른거 같음 :change 기능이 안됨 -->
            <el-select
              v-model="selGameType"
              @change="changeGameType"
              style="width: 115px"
              size="large"
            >
              <el-option
                v-for="item in gameTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <template #append>
            <!-- el-input 안에 slot 형식으로 el-button도 뭔가 다른거 같음 버튼색 변경하는 type 옵션이 안됨 -->
            <el-button :icon="Search" @click="searchUser" size="large" />
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
