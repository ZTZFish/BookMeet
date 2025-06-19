<script setup>
import NavBar from './NavBar.vue';
import ImagesPreview from './ImagesPreview.vue';
import BookInfo from './BookInfo.vue';
import MarketInfo from './MarketInfo.vue';
import BookComments from './BookComments.vue';
import Handle from './Handle.vue';
import { onBeforeMount, ref, provide, watch, onActivated, nextTick } from 'vue';
import { bookDetail } from '../../request/bookApi';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../store/userStore';
import { useNavigationStore } from '../../store/navigationStore';

defineOptions({
  name: 'BookDetails'
})

const route = useRoute();
const navigationStore = useNavigationStore();
let book = ref(null);
const isLoading = ref(true);

onBeforeMount(async () => {
  await fetchBook();
  const user = useAuthStore();
});

onActivated(async () => {
  console.log('BookDetails组件激活');
  const newBookId = route.params.bookId;

  // 使用状态管理判断是否需要加载动画
  if (navigationStore.needsLoading(newBookId)) {
    isLoading.value = true;
    await fetchBook();
  } else {
    console.log('从地址页面返回，不显示加载动画');
    // 从地址页面返回，确保书籍数据是最新的
    if (newBookId !== navigationStore.currentBookId) {
      await fetchBook();
    }
    // 等待下一帧，确保Handle组件的onActivated已经执行完毕
    await nextTick();
    // 延迟重置导航状态，确保子组件能够正确获取到状态
    setTimeout(() => {
      navigationStore.resetNavigationState();
      console.log('延迟重置导航状态');
    }, 0);
  }
});


async function fetchBook() {
  try {
    const bookId = route.params.bookId;
    if (bookId) {
      const { data } = await bookDetail(String(bookId));
      book.value = data.book;
      // 更新当前书籍ID到状态管理
      navigationStore.setCurrentBookId(bookId);
      isLoading.value = false;
    }
  } catch (error) {
    console.error('Failed to fetch book:', error);
    isLoading.value = false;
  }
}

provide('book', book);

// 监听路由参数变化
watch(() => route.params.bookId, async (newBookId, oldBookId) => {
  if (newBookId !== oldBookId && newBookId) {
    // 切换不同书籍时显示加载动画
    if (navigationStore.needsLoading(newBookId)) {
      isLoading.value = true;
      await fetchBook();
    }
  }
});
</script>

<template>
  <div v-if="!isLoading" style="background-color: aliceblue;padding-bottom: 70px;">
    <div class="navbar" style="margin-bottom: 60px;background-color: #fff;">
      <NavBar :title="book ? book.name : '加载中...'"></NavBar>
    </div>
    <div class="images-preview" style="background-color: #fff;">
      <ImagesPreview :imagesPreview="book.imagesPreview" :bookId="book._id" />
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
      <Handle :bookId="book._id" />
    </div>
  </div>
  <div v-else class="loading">
    <t-loading size="30px" theme="spinner" />
  </div>
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