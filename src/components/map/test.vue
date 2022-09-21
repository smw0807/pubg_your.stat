<script setup lang="ts">
import { ref } from 'vue';

const currentDate = ref(new Date());
</script>
<template>
  <el-card :body-style="{ padding: '0px' }">
    <img src="car-respone/erangel-car.png" class="image" />
    <div style="padding: 14px">
      <span>Yummy hamburger</span>
      <div class="bottom">
        <time class="time">{{ currentDate }}</time>
        <el-button text class="button">Operating</el-button>
      </div>
    </div>
  </el-card>
</template>
<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>