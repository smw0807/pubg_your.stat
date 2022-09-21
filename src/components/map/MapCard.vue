<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
const props = defineProps({
  imgName: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});
const sourceLink: Ref<string> = ref(props.source);
const imgPath: Ref<string> = ref(`/car-respone/${props.imgName}.png`);
</script>
<template>
  <el-row align="middle" justify="center">
    <el-col>
      <el-card>
        <img :src="imgPath" class="image" />
        <div style="padding: 14px">
          <div class="bottom">
            출처 :
            <el-link :href="sourceLink" target="_blank">
              {{ sourceLink }}
            </el-link>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style scoped>
.source {
  font-size: 12px;
  color: #999;
}
.image {
  /* width: 100%;
  height: 30%; */
  /* display: block; */
}
</style>