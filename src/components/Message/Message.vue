<template>
  <div>
    <h2 class="title">消息</h2>
    <t-divider style="margin: 0;" />
    <div class="content">
      <ul>
        <li v-for="item in messageList" :key="item.id">
          <Sender />
          <t-divider style="margin: 0;" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sender from './Sender.vue';

interface MessageItem {
  id: number;
  avatar: string;
  name: string;
  newMessage: string;
  time: string;
  unread: number;
}

const messageList: MessageItem[] = [
  {
    id: 1,
    avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?cb=iwc2&rs=1&pid=ImgDetMain",
    name: '张北泽',
    newMessage: "今天下午吧？",
    time: "2023-07-18 14:30",
    unread: 1,
  },
  {
    id: 2,
    avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.FdRoVAPPml7ILPn2QeSAywAAAA?cb=iwc2&rs=1&pid=ImgDetMain",
    name: '尤小晴',
    newMessage: "下午找张北泽带我一个",
    time: "2023-07-18 15:01",
    unread: 1,
  },
  {
    id: 3,
    avatar: "https://www.keaitupian.cn/cjpic/frombd/2/253/16890549/1598107895.jpg",
    name: '洛洛',
    newMessage: "上号！",
    time: "2023-07-18 20:18",
    unread: 1,
  }
]
</script>

<style lang="css" scoped>
.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #333
}
</style>