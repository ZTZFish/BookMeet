<template>
  <div>
    <t-swiper :key="props.bookId" :autoplay="false"
      :navigation="{ type: 'fraction', paginationPosition: 'bottom-right' }" style="border-radius: 0;"
      @change="onSwiperChange">
      <t-swiper-item v-for="(item) in swiperList" :key="item" style="height: 400px">
        <img :src="item" class="img" @click="bookPreview()" />
      </t-swiper-item>
    </t-swiper>
    <t-image-viewer v-model:images="swiperList" v-model:visible="visible" :show-Index="true"
      v-model:index="currentSwiperIndex" />
  </div>
</template>
<script lang="js" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  imagesPreview: {
    type: Array,
    default: () => [],
  },
  bookId: {
    type: String
  }
});

// 当前轮播图的索引
const currentSwiperIndex = ref(0);
// 当轮播图切换时更新当前索引
const onSwiperChange = (currentIndex) => {
  currentSwiperIndex.value = currentIndex;
};

// 图片预览图片
const swiperList = ref([]); // 将 swiperList 声明为响应式变量


// 监听 imagesPreview 的变化，并在其有数据时更新 swiperList
watch(() => props.imagesPreview, (newVal) => {
  if (newVal.length > 0) {
    swiperList.value = newVal;
  }
}, { immediate: true }); // immediate: true 确保在组件初始化时也执行一次监听

// 图片预览
const visible = ref(false);
const bookPreview = () => {
  visible.value = true;
};

</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 100%;
  border-radius: 0;
}
</style>