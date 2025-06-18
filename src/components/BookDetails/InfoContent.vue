<script setup>
import { ref, inject } from 'vue';
import { stringifyQuery } from 'vue-router';
const book = inject('book');
const props = defineProps({
  handle: {
    type: String
  }
})
</script>

<template>
  <div class="book-content">
    <div class="book-image">
      <img :src="book.image" alt="">
    </div>
    <div class="book-info" :class="props.handle == 'handle-buy' ? '' : 'book-info-cart-h'">
      <div class="book-price" style="color:#ff6600">
        <span>折后价</span>
        <span style="font-size: 2em;font-weight: 600;">￥{{ (Number(book.price) * 0.85).toFixed(2)
        }}</span>
        <span style="margin-left: 10px;">| 优惠前￥{{ Number(book.price) }}</span>
      </div>
      <div class="book-name">
        <t-tag theme="success" size="medium" v-if="book.status == '现书'">现书</t-tag>
        <t-tag theme="primary" size="medium" v-else>预售</t-tag>
        <span style="font-size: 1.2em;font-weight: 600;margin-left: 10px;">{{ book.name }}</span>
      </div>
      <div class="book-author">
        <span style="font-size: 1em;">作者：{{ book.author }}</span>
      </div>
      <div class="market">
        <span style="font-size: 1em;">商家：{{ book.market.name }}</span>
      </div>
      <div class="book-count" v-if="props.handle == 'handle-buy'">
        <span style="font-size: 1em;">数量：</span>
        <t-stepper theme="filled" default-value="1" min="1" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.book-content {
  background-color: #fff;
  display: flex;
  margin: 5px 10px;
  border-radius: 5px;
  padding: 10px;

  .book-image {
    width: 100px;
    height: 100%;
    margin-right: 15px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .book-info-cart-h {
    height: 90%;
  }

  .book-name {
    display: flex;
    align-items: center;
  }

  .book-count {
    display: flex;
    align-items: center;
  }


}
</style>