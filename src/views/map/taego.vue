<script setup lang="ts">
  import sourceText from '@/public/car-respone/sources?raw';
  const taego = sourceText.split('taego-car=');
  import card from '@/components/map/MapCard.vue';
</script>
<template>
  <div class="main">
    <!-- <el-row align="middle" justify="center"> -->
    <!-- <el-col> -->

    <card imgName="taego-car" :source="taego[1]" />
    <!-- </el-col> -->
    <!-- </el-row> -->
  </div>
</template>
<style scoped></style>
