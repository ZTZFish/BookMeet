<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useCartStore } from '../../store/cartStore';


const cartStore = useCartStore();
const editStatus = ref(false);

const goBack = () => {
  window.history.back();
}

onBeforeMount(async () => {
  await cartStore.initCartList();
})

onBeforeUnmount(() => {
  cartStore.saveNewCartList();
})

const edit = () => {
  editStatus.value = !editStatus.value;
}

</script>

<template>
  <div>
    <div class="cart">
      <t-navbar title="购物车" :fixed="true" left-arrow class="custom-navbar" style="z-index:99999" @left-click="goBack"
        @right-click="edit()">
        <template #right>
          <i v-show="!editStatus" class="fa fa-gears" style="width: 30px;font-size: 20px;"></i>
          <span v-show="!editStatus" style="font-size: 16px;font-weight: 600;">编辑</span>
          <span v-show="editStatus" style="font-size: 16px;font-weight: 600;">完成</span>
        </template>
      </t-navbar>
      <div class="goods-container">
        <div v-for="item in cartStore.cartList" :key="item.id" class="good" label="item.id">
          <label style="width: 40px;display: flex;align-items: center;justify-content: center;">
            <input type="checkbox" v-model="item.checked"
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
                <p>¥{{ (Number(item.price) * item.count).toFixed(2) }}</p>
                <t-stepper v-show="!editStatus" theme="filled" style="margin-left: auto;" v-model:value="item.count"
                  :min="1" />
                <t-button v-show="editStatus" theme="danger" variant="outline" style="height: 30px;"
                  @click="cartStore.delGood(item.bookId)">
                  <i class="fa fa-trash" style="font-size: 16px;"></i>
                  删除</t-button>
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
      <div class="settle">
        <div class="total">
          <input type="checkbox" v-model="cartStore.allChecked"
            style="width: 20px;height: 20px;border-radius: 50%;appearance: none;border: 1px solid gray;margin-right: 10px;">
          <span style="font-size: 16px;"><b>全选</b></span>
        </div>
        <div class="pay" v-show="!editStatus">
          <span style="font-size: 16px;"><b>总计</b></span>
          <span v-show="cartStore.totalPrice !== 0">：</span>
          <span v-show="cartStore.totalPrice !== 0" class="total-price">￥{{ cartStore.totalPrice.toFixed(2) }}</span>
          <t-button size="large" theme="primary" style="width: 100px;margin-left: 10px;">去结算</t-button>
        </div>
        <div v-show="editStatus" class="del">
          <t-button theme="danger" variant="outline" style="height: 48px;" @click="cartStore.delCheckedGood">
            <i class="fa fa-trash" style="font-size: 16px;"></i>
            删除选中
          </t-button>
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
            margin-top: 5px;
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
          margin-top: 8px;
          align-self: start;
        }
      }
    }
  }

  .settle {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;

    .total {
      height: 100%;
      line-height: 70px;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }

    .pay {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: 10px;

      .total-price {
        font-size: 20px;
        font-weight: 600;
        color: #ff6600;
      }
    }

    .del {
      margin-left: auto;
      margin-right: 10px;
    }
  }



  input[type="checkbox"]:checked {
    background-color: #0052d9;
    border-color: #0052d9;
  }

  input[type="checkbox"]:checked::after {
    content: "✓";
    display: block;
    color: white;
    text-align: center;
    line-height: 20px;
    font-weight: bold;
  }
}
</style>