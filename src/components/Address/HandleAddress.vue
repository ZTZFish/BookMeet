<script setup>
import { useAddressStore } from '../../store/addressStore';
import { useRouter } from 'vue-router';
import { useNavigationStore } from '../../store/navigationStore';

const addressStore = useAddressStore();
const router = useRouter();
const navigationStore = useNavigationStore();

// 不需要 emit，直接通过导航跳转
function toAddressList() {
  // 标记即将前往地址页面
  navigationStore.markGoingToAddress();

  // 直接跳转，让路由系统处理组件的生命周期
  router.push({
    path: '/address'
  });
}
</script>

<template>
  <div class="handle-address" @click="toAddressList">
    <div class="title">
      <span><b>收货信息：</b></span>
      <div class="more">
        <span>查看更多</span>
      </div>
    </div>
    <div class="consignee-phone">
      <div class="consignee">
        <span>{{ addressStore.defaultAddress.consignee }}</span>
      </div>
      <div class="phone">
        <span>{{ addressStore.defaultAddress.phone }}</span>
      </div>
    </div>
    <div class="address">
      <span>{{ addressStore.defaultAddress.province }}</span>
      <span>{{ addressStore.defaultAddress.city }}</span>
      <span>{{ addressStore.defaultAddress.county }}</span>
      <span>{{ addressStore.defaultAddress.detailAddress }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.handle-address {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;

  .title {
    display: flex;
    font-size: 1.5em;
    margin-bottom: 10px;

    .more {
      margin-left: auto;
      margin-right: 10px;
      font-size: 0.7em;
    }
  }

  .consignee-phone {
    display: flex;
    font-size: 1.3em;

    .consignee {
      margin-right: 20px;
      margin-bottom: 10px;
    }
  }

  .address {
    font-size: 1.1em;
    color: #666;

    span {
      margin-right: 10px;
    }
  }
}
</style>