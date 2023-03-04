<script setup lang="ts">
  import { useClipboard } from '@vueuse/core';
  import { CopyDocument } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  interface Props {
    //닉네임
    nickname: string;
    //본인인지 아닌지 여부
    isMine: boolean;
    //닉네임 카피 기능 활성화 여부
    copyNickname?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    nickname: '',
    isMine: true,
    copyNickname: false,
  });

  const { isSupported, copy } = useClipboard();

  const cpNickname = (): void => {
    copy(props.nickname);
    ElMessage({
      type: 'success',
      center: true,
      dangerouslyUseHTMLString: true,
      message: `닉네임 <b>${props.nickname}</b>이 복사되었습니다. <br/>붙여넣기를 사용시 복사된 닉네임이 입력됩니다.`,
    });
  };

  const cardBodyStyles = {
    padding: '15px 10',
  };
</script>
<template>
  <el-card :body-style="cardBodyStyles">
    <el-row>
      <el-col :span="22">
        <span> {{ nickname }}</span>
        <span v-if="isMine"> [나]</span>
      </el-col>
      <el-col :span="2" align="end">
        <el-tooltip
          content="클릭 시 닉네임이 복사됩니다."
          effect="light"
          v-if="copyNickname && isSupported"
        >
          <el-icon @click="cpNickname">
            <CopyDocument />
          </el-icon>
        </el-tooltip>
      </el-col>
    </el-row>
  </el-card>
</template>
<style scoped></style>
