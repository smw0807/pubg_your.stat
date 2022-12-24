<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import { ko } from 'date-fns/locale';

  const emit = defineEmits(['reload']);
  const props = defineProps({
    nickname: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      default: '',
    },
    updatedate: {
      type: String,
      default: '',
    },
  });

  // 갱신 버튼 클릭시
  const reload = (): void => {
    emit('reload');
  };

  const timeagoOptions = {
    includeSeconds: true,
    addSuffix: true,
    useStrict: true,
  };
</script>
<template>
  <el-card :body-style="{ padding: '12px' }">
    <el-row align="middle">
      <el-col>
        <span :style="`font-size: var(--el-font-size-extra-large)`">
          [ {{ platform.toUpperCase() }} ]
        </span>
        <span :style="`font-size: var(--el-font-size-large)`">
          {{ nickname }}
        </span>
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-col :span="14">
        <span :style="`font-size: var(--el-font-size-small)`">
          최근 업데이트 :
          <timeago
            :datetime="updatedate"
            :locale="ko"
            :converter-options="timeagoOptions"
            auto-update
            v-if="updatedate != ''"
          />
        </span>
      </el-col>
      <el-divider direction="vertical" />
      <el-col :span="4">
        <el-button color="#626aef" plain dark @click="reload">스탯 갱신</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scope>
  .el-card {
    margin-bottom: 0;
  }
  .el-divider {
    margin-left: 15px;
    margin-right: 15px;
  }
</style>
