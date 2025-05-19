<template>
  <div class="sender">
    <div class="avatar">
      <t-avatar class="avatar-example" image="https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        size="65px"></t-avatar>
    </div>
    <div class="info">
      <div class="name">
        <span class="username">{{ props.name }}</span>
      </div>
      <div class="message">
        <span class="last-message">{{ props.newMessage }}</span>
      </div>
    </div>
    <div class="state">
      <span>{{ props.time }}</span>
      <t-badge :count="props.unread"></t-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  id: number;
  avatar?: string;
  name?: string;
  newMessage?: string;
  time?: string;
  unread?: number;
}

const props = withDefaults(defineProps<Props>(), {
  avatar: "https://tdesign.gtimg.com/mobile/demos/avatar1.png",
  name: "陌生用户",
  newMessage: "一条消息",
  time: "2023-07-18 15:01",
  unread: 1,
})

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