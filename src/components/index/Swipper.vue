<template>
  <div>
    <t-swiper :navigation="{ showControls: true, type: 'dots' }" :autoplay="true" @click="handleClick"
      @change="handleChange" interval=3000 style="border-radius: 0;">
      <t-swiper-item v-for="(item, index) in swiperList" :key="index" style="height: 250px;">
        <img :src="item" class="img" />
      </t-swiper-item>
    </t-swiper>
  </div>
</template>
<script lang="ts" setup>
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swipperImg1 = 'https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_1280.jpg'
const swiperList = [
  `${swipperImg1}`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

const handleChange = (index: number, context: any) => {

};

const handleClick = (value: number) => {
  console.log('click: ', value);
};
</script>

<style scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}
</style>
