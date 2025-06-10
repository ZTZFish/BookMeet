<template>
  <div ref="scrollContainer" class="scroll-container">
    <div class="book-content">
      <BookMenu />
      <Sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import BookMenu from './BookMenu.vue';
import { ref } from 'vue';
import { useScrollPosition } from '../../composables/useScrollPosition';


defineOptions({
  name: 'Book',
})
</script>

<style lang="css" scoped>
/* 滚动容器样式 */
.scroll-container {
  height: calc(100vh - 86px);
  /* 减去底部 tabbar 的高度 */
  overflow-y: auto;
  overflow-x: hidden;
}

.book-content {
  min-height: 100%;
}
</style>