<script setup lang="ts">
import sourceText from '@/public/car-respone/sources?raw';
const miramar = sourceText.split('miramar-car=');
import card from '@/components/map/MapCard.vue';
</script>
<template>
  <div class="main">
    <!-- <el-row align="middle" justify="center"> -->
    <!-- <el-col> -->

    <card imgName="miramar-car" :source="miramar[1]" />
    <!-- </el-col> -->
    <!-- </el-row> -->
  </div>
</template>
<style scoped>
</style>