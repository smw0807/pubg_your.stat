<script setup lang="ts">
  import card from '@/components/map/MapCard.vue';
  const erangel =
    'https://battlegrounds.party/map/?Baltic/2.32/409600x409600/V5u/b/o1:2/lBall';
</script>
<template>
  <div class="main">
    <card imgName="erangel-car" :source="erangel">
      <template #tag>
        <el-tag class="mx-1" effect="dark" color="#dda0dd">UAZ(100%) </el-tag>
        <el-tag class="mx-1" effect="dark" color="#800080"
          >다시아(100%)
        </el-tag>
        <el-tag class="mx-1" effect="dark" color="#f00">탈것(50%) </el-tag>
        <el-tag class="mx-1" effect="dark" color="#9370db">보트(100%) </el-tag>
      </template>
    </card>
  </div>
</template>
<style scoped>
  .el-tag {
    border: 0;
    color: black;
  }
</style>
