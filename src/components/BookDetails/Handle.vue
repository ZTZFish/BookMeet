<script setup>
import { useAuthStore } from '../../store/userStore';
import { onActivated, onBeforeMount, onDeactivated, ref, watch } from 'vue';
import checkLogin from '../../composables/checkLogin'
import { addToCart } from '../../request/cartApi';
import InfoContent from './InfoContent.vue';
import { checkCartExist } from '../../request/cartApi';
import HandleAddress from '../Address/HandleAddress.vue';
import { useNavigationStore } from '../../store/navigationStore';

const visible = ref(false);//请先登录消息的显示
const cartExistVisible = ref(false);//购物车存在消息的显示
const addCartVisible = ref(false);//加入购物车弹出层的显示
const addCartSuccessVisible = ref(false);//加入购物车成功消息的显示
const buyVisible = ref(false);//立即购买弹出层的显示
const cartExist = ref(false);//购物车是否存在

const navigationStore = useNavigationStore();
const user = useAuthStore();

// 将 stopWatcher 声明为组件级别的变量
let stopWatcher = null;

const props = defineProps({
  bookId: {
    type: String,
    default: ''
  }
})

onBeforeMount(
  async () => {
    cartExist.value = await checkCartExist(props.bookId);
  });

// 启动 watch 监听器的函数
function startWatcher() {
  // 如果已经有监听器，先停止它
  if (stopWatcher) {
    stopWatcher();
  }

  stopWatcher = watch([visible, cartExistVisible, addCartSuccessVisible, buyVisible], () => {
    console.log("watch起作用了哦？！")
    navigationStore.savePopupStates(props.bookId, {
      visible: visible.value,
      cartExistVisible: cartExistVisible.value,
      addCartVisible: addCartVisible.value,
      addCartSuccessVisible: addCartSuccessVisible.value,
      buyVisible: buyVisible.value
    });
  });
}

onActivated(() => {
  console.log('Handle组件激活');
  // 如果是从地址页面返回，恢复弹出层状态
  if (navigationStore.isFromAddress) {
    const savedStates = navigationStore.getPopupStates(props.bookId);
    console.log('恢复弹出层状态:', savedStates);
    visible.value = savedStates.visible;
    cartExistVisible.value = savedStates.cartExistVisible;
    addCartVisible.value = savedStates.addCartVisible;
    addCartSuccessVisible.value = savedStates.addCartSuccessVisible;
    buyVisible.value = savedStates.buyVisible;
  }

  // 重新启动watch监听器
  startWatcher();
});

// 组件失活时保存状态（比如要去地址页面时）
onDeactivated(() => {
  console.log('Handle组件失活，保存当前状态');

  // 如果是去地址页面，需要特殊处理
  if (navigationStore.isFromAddress) {
    console.log('即将前往地址页面，先保存真实状态再隐藏弹出层');

    // 1. 先保存真实的弹出层状态
    navigationStore.savePopupStates(props.bookId, {
      visible: visible.value,
      cartExistVisible: cartExistVisible.value,
      addCartVisible: addCartVisible.value,
      addCartSuccessVisible: addCartSuccessVisible.value,
      buyVisible: buyVisible.value
    });

    // 2. 停止watch监听器，避免隐藏时覆盖保存的状态
    if (stopWatcher) {
      stopWatcher();
      stopWatcher = null;
    }

    // 3. 隐藏所有弹出层
    visible.value = false;
    cartExistVisible.value = false;
    addCartVisible.value = false;
    addCartSuccessVisible.value = false;
    buyVisible.value = false;
  } else {
    // 正常情况下保存当前状态
    navigationStore.savePopupStates(props.bookId, {
      visible: visible.value,
      cartExistVisible: cartExistVisible.value,
      addCartVisible: addCartVisible.value,
      addCartSuccessVisible: addCartSuccessVisible.value,
      buyVisible: buyVisible.value
    });
  }
});

// 初始启动 watch 监听器
startWatcher();

function addShoppingCart() {
  const result = checkLogin(user, visible);
  if (result == true) {
    if (cartExist.value == true) {
      addCartSuccessVisible.value = false; // 关闭添加成功消息
      cartExistVisible.value = true;
      return;
    }
    else {
      addCartVisible.value = true;
    }
  }
}

async function finalAdd(bookId) {
  const res = await addToCart(bookId);
  if (res == "success") {
    addCartSuccessVisible.value = true;
    addCartVisible.value = false;
    cartExist.value = true
  }
}

function buyNow() {
  const result = checkLogin(user, visible);
  if (result == true) {
    buyVisible.value = true;
  }
}

function connect() {
  checkLogin(user, visible);
}

function addBook() {
  checkLogin(user, visible);
}

</script>

<template>
  <div class="handle-content">
    <div class="left">
      <div class="connect" @click="connect">
        <img src="../../assets/connect.png" alt="联系客服">
        <span>联系客服</span>
      </div>
      <div class="add-book" @click="addBook">
        <img src="../../assets/addbook.png" alt="加入书架">
        <span>加入书架</span>
      </div>
    </div>
    <div class="right">
      <div class="popup-cart">
        <button class="add-shoppingcard" @click="addShoppingCart">加入购物车</button>
        <t-popup v-model="addCartVisible" placement="bottom"
          style="height: 500px;display: flex;flex-direction: column;  background-color: aliceblue;" close-btn>
          <div class="header">
            <div class="title">加入购物车</div>
          </div>
          <InfoContent :handle="'handle-cart'" />
          <div class="add-button">
            <t-button size="large" theme="primary" block @click="finalAdd(props.bookId)">加入购物车</t-button>
          </div>
        </t-popup>
      </div>
      <div class="popup-buy">
        <button class="buy" @click="buyNow">立即购买</button>
        <t-popup v-model="buyVisible" placement="bottom"
          style="height: 600px;display: flex;flex-direction: column;  background-color: aliceblue;" close-btn>
          <div class="header">
            <div class="title">购买</div>
          </div>
          <InfoContent :handle="'handle-buy'" />
          <HandleAddress />
          <div class="buy-button">
            <t-button size="large" theme="primary" block>立即购买</t-button>
          </div>
        </t-popup>
      </div>

    </div>
  </div>
  <t-message style="margin-top: 50px;" v-model="visible" :offset="[10, 16]" :duration="-1" theme="warning"
    content="请先登录" link="去登录" :close-btn="true" />
  <t-message style="margin-top: 50px;" v-model="cartExistVisible" :offset="[10, 16]" :duration="3000" theme="info"
    content="该商品已在购物车中" />
  <t-message style="margin-top: 50px;" v-model="addCartSuccessVisible" :offset="[10, 16]" :duration="3000"
    theme="success" content="加入购物车成功" />
</template>

<style lang="less" scoped>
.handle-content {
  display: flex;
  align-items: center;
  height: 100%;

  .left {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    div {
      display: flex;
      flex-direction: column;
      width: 60px;
      height: 4px;
      height: 80%;

      img {
        margin: 0 auto;
        width: 40px;
        height: 40px;
      }
    }
  }

  .right {
    flex: 2;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 70%;
      border: none;
      color: #fff;
      font-size: 16px;
    }

    .popup-cart,
    .popup-buy {
      width: 45%;
      height: 100%;
      display: flex;
      align-items: center;


      .add-shoppingcard {
        width: 100%;
        background-color: #2ba471;
        border-radius: 25px 0 0 25px;
      }

      .buy {
        width: 100%;
        background-color: #0052d9;
        border-radius: 0 25px 25px 0;
      }
    }
  }
}


.add-button,
.buy-button {
  margin: 0 16px;
  margin-top: auto;
  margin-bottom: 10px;
}

.header {
  display: flex;
  align-items: center;
  height: 44px;
}

.title {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
}
</style>