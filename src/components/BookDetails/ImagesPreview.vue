<template>
  <div>
    <t-swiper :autoplay="false" :navigation="{ type: 'fraction', paginationPosition: 'bottom-right' }"
      style="border-radius: 0;" @change="onSwiperChange">
      <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 400px">
        <img :src="item" class="img" @click="bookPreview()" />
      </t-swiper-item>
    </t-swiper>
    <t-image-viewer v-model:images="swiperList" v-model:visible="visible" :show-Index="true"
      v-model:index="currentSwiperIndex" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
// 图片预览
const visible = ref(false);
const bookPreview = () => {
  visible.value = true;
};

// 当前轮播图的索引
const currentSwiperIndex = ref(0);
// 当轮播图切换时更新当前索引
const onSwiperChange = (currentIndex: number) => {
  currentSwiperIndex.value = currentIndex;
  console.log(currentIndex);
};

// 轮播图图片
const swiperList = [
  `${'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/63654/33/2304/258890/5d0a144cEbfdd8b73/b6a56c1a8095ab1d.jpg!q80.dpg'}`,
  `${'https://img1.doubanio.com/view/subject/s/public/s1070959.jpg'}`,
  `${'https://img.alicdn.com/imgextra/i3/2511186619/O1CN01P4KQN51ylY8B1nf03_!!2511186619.jpg'}`,
];

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