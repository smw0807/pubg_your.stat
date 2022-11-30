<script setup lang="ts">
  import sourceText from '@/public/car-respone/sources?raw';
  import card from '@/components/map/MapCard.vue';
  const miramar = sourceText.split('miramar-car=');
</script>
<template>
  <div class="main">
    <card imgName="miramar-car" :source="miramar[1]" />
  </div>
</template>
<style scoped></style>
