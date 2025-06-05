<template>
  <div class="handle-content">
    <div class="left">
      <div class="connect">
        <img src="../../assets/connect.png" alt="联系客服">
        <span>联系客服</span>
      </div>
      <div class="add-book">
        <img src="../../assets/addbook.png" alt="加入书架">
        <span>加入书架</span>
      </div>
    </div>
    <div class="right">
      <button class="add-shoppingcard">加入购物车</button>
      <button class="buy">立即购买</button>
    </div>
  </div>
</template>

<script setup>

</script>

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
      width: 45%;
      height: 70%;
      border: none;
      color: #fff;
      font-size: 16px;
    }

    .add-shoppingcard {
      background-color: #2ba471;
      border-radius: 25px 0 0 25px;
    }

    .buy {
      background-color: #0052d9;
      border-radius: 0 25px 25px 0;
    }
  }
}
</style>