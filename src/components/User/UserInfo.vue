<script setup>
import { ref } from 'vue';
import { EditIcon } from 'tdesign-icons-vue-next'

const feature = ref();
</script>

<template>
  <div class="page-background">
    <h2 style="height: 80px;color: #000;line-height: 80px;text-align: center;">个人中心</h2>
    <div class="user-info">
      <div class="avatar">
        <t-avatar class="avatar-example"
          image="https://tse4-mm.cn.bing.net/th/id/OIP-C.nhBL64RfsRfgL-SLGbD5lQHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
          size="100px">
        </t-avatar>
      </div>
      <div class="name-des">
        <span class="username">用户名</span>
        <span class="des">这个人很懒，什么也没有写...</span>
      </div>
      <div class="edit-userinfo">
        <EditIcon class="edit-icon" />
      </div>
    </div>
  </div>
</template>



<style lang="less" scoped>
.page-background {
  /* 设置从上到下的线性渐变 */
  background: linear-gradient(to bottom, #48f1d5, transparent);
  /* 从青蓝色 (#a8dadc) 到透明 */
  /* 确保背景覆盖整个容器 */
  min-height: 100vh;
  /* 如果需要覆盖整个视口高度 */
  width: 100%;
}

.user-info {
  position: relative;
  display: block;
  width: 96%;
  height: 200px;
  margin-left: 2%;
  margin-top: 70px;
  background-color: #fff;
  border-radius: 20px;
  padding-top: 1px;
}

.avatar {
  position: absolute;
  width: 100px;
  height: 100px;
  margin-top: -40px;
  margin-left: 20px;
  border-radius: 50%;
  border: #0052d9 3px solid;
  box-sizing: content-box;
}

.edit-userinfo {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 10px;
  right: 15px;
  background-color: #fff;
  box-sizing: content-box;
  border: #0052d9 2px solid;
  cursor: pointer;
}

.edit-icon {
  width: 22px;
  height: 22px;
  margin-top: 4px;
  margin-left: 4px;

}

.name-des {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 140px;

  .username {
    font-size: 20px;
    font-weight: 600;
  }

  .des {
    font-size: 14px;
    color: #888;
    margin-top: 5px;
  }
}
</style>