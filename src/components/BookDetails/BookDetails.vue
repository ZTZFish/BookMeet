<script setup lang="ts">
import NavBar from './NavBar.vue';
import ImagesPreview from './ImagesPreview.vue';
import BookInfo from './BookInfo.vue';
import MarketInfo from './MarketInfo.vue';
import BookComments from './BookComments.vue';
import Handle from './Handle.vue';
</script>

<template>
  <div style="background-color: aliceblue;">
    <div class="navbar" style="margin-bottom: 60px;background-color: #fff;">
      <NavBar />
    </div>
    <div class="images-preview" style="background-color: #fff;">
      <ImagesPreview />
    </div>
    <div class="book-info" style="background-color: #fff;">
      <BookInfo />
    </div>
    <div class="comments">
      <BookComments />
    </div>
    <div class="market-info" style="background-color: #fff;">
      <MarketInfo />
    </div>
    <div class="handle" style="background-color: #fff;position: fixed;bottom: 0;width: 100%;height: 70px;">
      <Handle />
    </div>
  </div>





</template>

<style lang="less" scoped></style>