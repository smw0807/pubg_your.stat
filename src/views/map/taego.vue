<script setup lang="ts">
  import sourceText from '@/public/car-respone/sources?raw';
  import card from '@/components/map/MapCard.vue';
  const taego = sourceText.split('taego-car=');
</script>
<template>
  <div class="main">
    <card imgName="taego-car" :source="taego[1]" />
  </div>
</template>
<style scoped></style>
