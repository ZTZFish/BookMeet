<script setup lang="ts">
import Swipper from './Swipper.vue';
import Activities from './Activities.vue';
import { ref } from 'vue';
import IndexCard from './IndexCard.vue';
import { useScrollPosition } from '../../composables/useScrollPosition';

// 创建滚动容器的引用
const scrollContainer = ref(null);

// 使用滚动位置保存，传入容器引用
const { savePosition } = useScrollPosition(scrollContainer);

defineOptions({
  name: 'Index',
})

const bookList = ref([
  {
    id: 1,
    image: 'https://img1.doubanio.com/view/subject/s/public/s35057308.jpg',
    title: 'Vue.js 设计与实现',
    author: 'TanStack',
    price: 89.00,

  },
  {
    id: 2,
    image: 'https://img1.doubanio.com/view/subject/s/public/s8958650.jpg',
    title: 'JavaScript 高级程序设计',
    author: 'Nicholas C. Zakas',
    price: 69.00,
  },
  {
    id: 3,
    image: 'https://img3.doubanio.com/view/subject/s/public/s28033372.jpg',
    title: '你不知道的 JavaScript',
    author: 'Kyle Simpson',
    price: 59.00,
  },
  {
    id: 4,
    image: 'https://img9.doubanio.com/view/subject/s/public/s3651235.jpg',
    title: 'JavaScript 语言精粹',
    author: 'Douglas Crockford',
    price: 49.00,
  },
])

</script>

<template>
  <!-- 添加滚动容器 -->
  <div ref="scrollContainer" class="scroll-container">
    <div class="index">
      <div class="swipper-wrapper" style="height: 250px;">
        <Swipper />
      </div>
      <div class="activities-wrapper" style="margin-bottom: 16px;">
        <Activities />
      </div>
      <div class="container">
        <ul class="indexBookList" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
          <li v-for="item in bookList" :key="item.id" class="grid-item">
            <IndexCard>
              <template #bookImage>
                <div class="book-image">
                  <img :src="item.image" alt="book-image" />
                </div>
              </template>
              <template #infoBody>
                <div class="infoBody">
                  <div class="book-title">{{ item.title }}</div>
                  <div class="price-state">
                    <div class="book-price"><span>￥</span>{{ item.price }}</div>
                    <t-tag theme="success" class="book-state">现书</t-tag>
                  </div>
                </div>
              </template>
            </IndexCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* 滚动容器样式 */
.scroll-container {
  height: calc(100vh - 86px);
  /* 减去底部 tabbar 的高度 */
  overflow-y: auto;
  overflow-x: hidden;
}

.container {
  width: 100%;
  display: block;
  padding: 0 10px;
}

.indexBookList {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.indexBookList li {
  margin-bottom: 15px;
}

.infoBody {
  position: relative;
  height: 90px;
  padding: 10px;
}

.book-image img {
  width: 100%;
  height: auto;
}

.book-title {
  font-size: 16px;
  font-weight: 600;
}

.price-state {
  position: absolute;
  width: 80%;
  display: flex;
  align-items: center;
  bottom: 5px;
}

.book-price {
  font-size: 20px;
  color: #ff6600;
}

.book-state {
  margin-left: auto;
  margin-right: 5px;
}
</style>