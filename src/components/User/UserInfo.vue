<script setup>
import { EditIcon } from 'tdesign-icons-vue-next'
import { useAuthStore } from '@/store/userStore'
import { h, ref } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import Login from './Login.vue';
import { useRouter } from 'vue-router';

const userIcon = () => h(UserIcon);
const user = useAuthStore()
const router = useRouter()

const login = () => {
  router.push({
    name: 'Login'
  })
}
</script>

<template>
  <h2 style="height: 80px;color: #000;line-height: 80px;text-align: center;">个人中心</h2>
  <t-divider />
  <div class="user-info" v-if="user.isLoggedIn == true">
    <div class="avatar">
      <t-avatar class="avatar-example"
        image="https://tse4-mm.cn.bing.net/th/id/OIP-C.nhBL64RfsRfgL-SLGbD5lQHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
        size="100px">
      </t-avatar>
    </div>
    <div class="name-des">
      <div class="name-gender">
        <span class="username">{{ user.user.username }}</span>
        <img src="../../assets/male.png" alt="">
      </div>
      <span class="des">这个人很懒，什么也没有写...</span>
    </div>
    <div class="edit-userinfo">
      <EditIcon class="edit-icon" />
    </div>
    <hr style="margin: 10px 0;width: 90%;margin-left: 5%;">
    <slot name="features"></slot>
  </div>
  <div class="user-info" v-else>
    <div class="avatar">
      <t-avatar class="avatar-example" :icon="userIcon" size="100px"></t-avatar>
    </div>
    <div class="name-des">
      <div class="name-gender">
        <span class="username" style="text-decoration: underline;color:#0052d9 ;" @click="login">点击登录</span>
      </div>
    </div>
    <hr style="margin:40px 0 10px 0;width: 90%;margin-left: 5%;">
    <slot name="features"></slot>
  </div>
</template>



<style lang="less" scoped>
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

  .avatar-example {
    --td-avatar-icon-medium-font-size: 50px;
  }
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

  .name-gender {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .username {
    font-size: 20px;
    font-weight: 600;
  }

  .des {
    font-size: 14px;
    color: #888;
    margin-top: 5px;
  }

  img {
    width: 25px;
    height: 25px;
    margin-left: 5px;
  }
}
</style>