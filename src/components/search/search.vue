<script setup lang="ts">
  /**
   * 검색 컴포넌트
   * 플랫폼 선택 후 닉네임 입력 뒤 검색 누르면
   * platform, nickname을 (emit)searchInfo로 전달함
   * todo 컴포넌트 파일에 너무 많은 로직이 들어 있는 것 같아서 분리 고민해보기
   */
  import { ref, onMounted, computed } from 'vue';
  import type { Ref } from 'vue';
  import { ISearchForm } from '@/interfaces';
  //icon
  import { Search } from '@element-plus/icons-vue';

  const emit = defineEmits(['searchInfo']);

  // 넘길 데이터
  const searchParams: Ref<ISearchForm> = ref({
    platform: '',
    nickname: '',
  });

  //========== select ======================================================= S
  const defaultValue = 'kakao';
  interface gamePlatform {
    label: string; // UI에 표시할 값
    value: string;
  }
  const gamePlatforms: Ref<gamePlatform[]> = ref([
    // 셀렉트박스 options 데이터
    { label: '스팀', value: 'steam' },
    { label: '카카오', value: 'kakao' },
  ]);
  // 셀렉트박스 값 변경 이벤트
  const changeGamePlatform = (v: string): void => {
    localStorage.setItem('yourstat_search_platform', v);
  };
  //========== select ======================================================= E

  //========== input ======================================================= S
  // 자동완성 기능
  const _history = computed(() => history.value);
  // 히스토리에서 입력 값이 포함되는 닉네임 가져와서 화면에 뿌려줌
  const querySearch = (queryString: string, cb: any) => {
    const result = queryString
      ? _history.value.filter(v => v.nickname.indexOf(queryString) !== -1)
      : _history.value;
    cb(result);
  };
  //자동완성 닉네임 선택시
  const selectNickname = (v: ISearchForm): void => {
    searchParams.value.platform = v.platform;
    searchParams.value.nickname = v.nickname;
    changeGamePlatform(v.platform);
  };
  /**
   * !원인 파악 필요..
   * 자동완성 기능에 표시되는 데이터 클릭시 아래와 같은 경고 문구가 2개 발생함
   * [Vue warn]: Invalid event arguments: event validation failed for event "input".
   * [Vue warn]: Invalid event arguments: event validation failed for event "update:modelValue".
   */
  //========== input ======================================================= E

  //========== search ======================================================= S
  //검색 플랫폼, 닉네임 넘기기
  const searchPlayer = (): void => {
    if (searchParams.value.platform && searchParams.value.nickname) {
      checkLocalStorage();
      addLocalStorage(searchParams.value);
      emit('searchInfo', searchParams.value);
    }
  };
  //========== search ======================================================= E

  //========== localStorage ======================================================= S
  // 검색 기록 담을 변수
  const history: Ref<ISearchForm[]> = ref([]);

  // 로컬스토리지에 있는 검색 기록 가져오기
  const getHistory = (): ISearchForm[] => {
    const items = localStorage.getItem('yourstat_search_history');
    if (items) {
      const itemsArr: ISearchForm[] = JSON.parse(items as string);
      return itemsArr;
    } else {
      return [];
    }
  };

  // 검색 기록 로컬스토리지에 저장
  const setLocalStorage = (items: ISearchForm | ISearchForm[]): void => {
    // 로컬스토리지가 없으면 바로 추가
    if (!localStorage.getItem('yourstat_search_history')) {
      localStorage.setItem('yourstat_search_history', JSON.stringify([items]));
      return;
    }
    localStorage.setItem('yourstat_search_history', JSON.stringify(items));
  };

  // 검색 기록 로컬스토리지 데이터 10개까지만 유지하게 하기.
  const checkLocalStorage = (): void => {
    const items = getHistory();
    if (items.length !== 0 && items.length > 10) {
      items.shift();
      setLocalStorage(items);
    }
  };

  // 검색 기록 로컬스토리지에 추가
  const addLocalStorage = (params: ISearchForm): void => {
    const itemsArr = getHistory();
    if (itemsArr.length === 0) {
      setLocalStorage(params);
    } else if (!itemsArr.some(v => v.nickname === params.nickname)) {
      itemsArr.push({ platform: params.platform, nickname: params.nickname });
      setLocalStorage(itemsArr);
    }
    history.value = getHistory();
  };
  //========== localStorage ======================================================= E

  onMounted(() => {
    const lsSearchPlatform = localStorage.getItem('yourstat_search_platform');
    if (lsSearchPlatform) {
      searchParams.value.platform = localStorage.getItem('yourstat_search_platform') || '';
    } else {
      searchParams.value.platform = defaultValue;
      localStorage.setItem('yourstat_search_platform', defaultValue);
    }
    searchParams.value.nickname = '';
    history.value = [...getHistory()];
  });
</script>

<template>
  <div>
    <el-row>
      <el-col align="middle">
        <el-autocomplete
          v-model="searchParams.nickname"
          placeholder="게임 닉네임(대소문자가 일치해야 됩니다.)"
          class="input-with-select"
          size="large"
          style="width: 500px"
          @keyup.enter="searchPlayer"
          @select="selectNickname"
          :fetch-suggestions="querySearch"
          clearable
        >
          <template #default="{ item }">
            <div class="value">
              <el-tag v-if="item.platform === 'kakao'" color="#FAED7D">
                {{ item.platform }}
              </el-tag>
              <el-tag v-else type="">
                {{ item.platform }}
              </el-tag>
              {{ item.nickname }}
            </div>
          </template>
          <template #prepend>
            <!-- el-input 안에 slot 형식으로 el-select는 뭔가 다른거 같음 :change 기능이 안됨 -->
            <el-select
              v-model="searchParams.platform"
              @change="changeGamePlatform"
              placeholder="플랫폼"
              style="width: 115px"
              size="large"
            >
              <el-option
                v-for="item in gamePlatforms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <template #append>
            <!-- el-input 안에 slot 형식으로 el-button도 뭔가 다른거 같음 버튼색 변경하는 type 옵션이 안됨 -->
            <el-button :icon="Search" @click="searchPlayer" size="large" />
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
