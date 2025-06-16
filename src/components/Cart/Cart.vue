<script setup>
import { ref } from 'vue';
import { useCartStore } from '../../store/cartStore';
const cartList = ref([
  {
    id: 1,
    image: 'https://img1.doubanio.com/view/subject/s/public/s35057308.jpg',
    title: 'Vue.js 设计与实现',
    author: 'TanStack',
    price: 89.00,
    count: 1
  },
  {
    id: 2,
    image: 'https://img1.doubanio.com/view/subject/s/public/s8958650.jpg',
    title: 'JavaScript 高级程序设计',
    author: 'Nicholas C. Zakas',
    price: 69.00,
    count: 1
  },
  {
    id: 3,
    image: 'https://img3.doubanio.com/view/subject/s/public/s28033372.jpg',
    title: '你不知道的 JavaScript',
    author: 'Kyle Simpson',
    price: 59.00,
    count: 1
  },
  {
    id: 4,
    image: 'https://img9.doubanio.com/view/subject/s/public/s3651235.jpg',
    title: 'JavaScript 语言精粹',
    author: 'Douglas Crockford',
    price: 49.00,
    count: 1

  },
])

const goBack = () => {
  window.history.back();
}

const countChange = (value, item) => {
  item.count = value;
  updateTotalPrice()
}
const updateGoodPrice = (item, value) => {
  item.price = item.price * value;

}

</script>

<template>
  <div>
    <div class="cart">
      <t-navbar title="购物车" :fixed="true" left-arrow class="custom-navbar" style="z-index:99999" @left-click="goBack" />
      <div class="goods-container">
        <div v-for="item in cartList" :key="item.id" class="good" label="item.id">
          <label style="width: 40px;display: flex;align-items: center;justify-content: center;">
            <input type="checkbox"
              style="width: 20px;height: 20px;border-radius: 50%;appearance: none;border: 1px solid gray;">
          </label>
          <div class="content" @click.stop>
            <div class="left">
              <img :src="item.image" alt="">
            </div>
            <div class="right">
              <div class="title">
                <p>{{ item.title }}</p>
              </div>
              <div class="author">
                <p>{{ item.author }}</p>
              </div>
              <div class="price">
                <p v-show="item.count == 1">¥{{ item.price }}</p>
                <p v-show="item.count > 1">¥{{ item.price * item.count }}</p>
                <t-stepper theme="filled" style="margin-left: auto;" @change.stop="countChange(value, item)"
                  v-model:value="item.count" :min="1" />
              </div>
            </div>
            <div class="go">
              <svg t="1749647726659" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3184" width="25" height="25">
                <path
                  d="M305.587883 813.744345c-14.09502 12.824073-15.126512 34.658358-2.303462 48.752354 12.843516 14.09502 34.678824 15.126512 48.752354 2.302439l364.835266-332.676845c14.114462-12.844539 15.127536-34.659381 2.302439-48.753377-0.733711-0.815575-1.486864-1.588171-2.302439-2.302439l-0.078795-0.080841-0.13917-0.13917L352.037798 148.369166c-14.074553-12.824073-35.909861-11.791557-48.752354 2.302439-12.824073 14.09502-11.792581 35.930327 2.303462 48.753377l336.845795 307.168891L305.588907 813.743322 305.587883 813.744345 305.587883 813.744345z"
                  fill="#272536" p-id="3185"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;

  .custom-navbar {
    --td-navbar-height: 60px;
    --td-navbar-bg-color: #0052d9;
    --td-navbar-color: #fff;
  }

  .goods-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-top: 75px;

    .good {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 150px;
      margin-bottom: 15px;
      background-color: #fff;
      border-radius: 10px;

      input[type="checkbox"]:checked {
        background-color: #2196F3;
        border-color: #2196F3;
      }

      input[type="checkbox"]:checked::after {
        content: "✓";
        display: block;
        color: white;
        text-align: center;
        line-height: 18px;
        font-weight: bold;
      }

      .content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        .left {
          width: 100px;
          height: 100%;
          padding: 10px 0;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }

        }

        .right {
          width: 200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: start;

          .title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .author {
            font-size: 16px;
            color: #666;
          }

          .price {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
            font-weight: 600;
            color: #ff6600;
            margin-top: auto;
            margin-bottom: 10px;
          }
        }

        .go {
          align-self: start;
        }
      }
    }
  }
}
</style>