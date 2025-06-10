<script setup>
import NavBar from './NavBar.vue';
import ImagesPreview from './ImagesPreview.vue';
import BookInfo from './BookInfo.vue';
import MarketInfo from './MarketInfo.vue';
import BookComments from './BookComments.vue';
import Handle from './Handle.vue';
import { onBeforeMount, ref } from 'vue';
import { bookDetail } from '../../request/book'; // 注意这里是bookDetails，不是bookDetail
import { useRoute } from 'vue-router'; // 引入useRoute

// 定义一个函数，用于获取书籍详情
const route = useRoute(); // 获取当前路由实例

onBeforeMount(() => {
  fetchBook();
});
//定义一个变量，用于存储书籍详情
let book = ref(null);
async function fetchBook() {
  try {
    const bookId = route.params.bookId; // 从路由参数中获取bookId
    if (bookId) {
      const { data } = await bookDetail(Number(bookId)); // 确保bookId是数字类型
      book.value = data.book; // 将书籍详情存储在book变量中
    } else {
      console.warn('找不到ID');
    }
  } catch (error) {
    console.error('Failed to fetch book:', error);
  }
}

</script>

<template>
  <div v-if="book" style="background-color: aliceblue;padding-bottom: 70px;">
    <div class="navbar" style="margin-bottom: 60px;background-color: #fff;">
      <NavBar :title="book ? book.name : '加载中...'"></NavBar>
    </div>
    <div class="images-preview" style="background-color: #fff;">
      <ImagesPreview :imagesPreview="book.imagesPreview" />
    </div>
    <div class="book-info" style="background-color: #fff;">
      <BookInfo :bookInfo="book" />
    </div>
    <div class="comments">
      <BookComments />
    </div>
    <div class="market-info" style="background-color: #fff;">
      <MarketInfo :market="book['market']" />
    </div>
    <div class="handle" style="background-color: #fff;position: fixed;bottom: 0;width: 100%;height: 70px;">
      <Handle />
    </div>
  </div>
  <div v-else class="loading"><t-loading size="30px" theme="spinner" /></div>
</template>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>