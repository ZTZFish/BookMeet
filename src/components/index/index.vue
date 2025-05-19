<template>
  <div class="swipper-wrapper" style="height: 250px;">
    <Swipper />
  </div>
  <div class="activities-wrapper" style="margin-bottom: 16px;">
    <Activities />
  </div>
  <div class="container" style="padding-bottom: 60px;">
    <ul class="indexBookList" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
      <li v-for="item in bookList" :key="item.id" class="grid-item">
        <Card>
          <template #bookImage>
            <div class="book-image">
              <img :src="item.image" alt="book-image" />
            </div>
          </template>
          <template #infoBody>
            <div class="infoBody">
              <div class="book-title">{{ item.title }}</div>
              <div class="book-author">{{ item.author }}</div>
              <div class="book-price">{{ item.price }}</div>
            </div>
          </template>
        </Card>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Swipper from './Swipper.vue';
import Activities from './Activities.vue';
import { ref } from 'vue';

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

<style lang="css" scoped>
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
  padding: 10px;
}

.book-image img {
  width: 100%;
  height: auto;
}
</style>