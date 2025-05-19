<template>
  <div class="sender">
    <div class="avatar">
      <t-avatar class="avatar-example" image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        size="65px"></t-avatar>
    </div>
    <div class="info">
      <div class="name">
        <span class="username">用户名</span>
      </div>
      <div class="message">
        <span class="last-message">消息</span>
      </div>
    </div>
    <div class="state">
      <span>时间</span>
      <t-badge count="8"></t-badge>
    </div>
    <t-divider style="margin: 0;" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const feature = ref();
</script>

<style lang="css" scoped>
.sender {
  display: flex;
  height: 100px;
  align-items: center;
}

.sender .avatar {
  width: 65px;
  height: 65px;
  margin: 0 20px;
}

.state {
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}
</style>