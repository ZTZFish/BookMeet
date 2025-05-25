<template>
  <div>
    <h2 class="title">消息</h2>
    <t-divider style="margin: 0;" />
    <div class="content">
      <ul>
        <li v-for="item in messageList" :key="item.id">
          <Sender :id="item.id" :avatar="item.avatar" :name="item.name" :newMessage="item.newMessage"
            :time="formatDisplayTime(item.time)" :unread="item.unread" />
          <t-divider style="margin: 0;" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sender from './Sender.vue';
// 消息数据类型接口
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
    avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.iDIqHf0lpUx3wsewrab2zgHaHa?cb=iwc2&rs=1&pid=ImgDetMain",
    name: '中华商务图书专营店',
    newMessage: "请问收到书了吗？",
    time: "2025-05-18 14:30",
    unread: 1,
  },
  {
    id: 2,
    avatar: "https://www.logosc.cn/uploads/output/2022/01/05/40587e71f8a5eb4d6ae783584c84150e.jpg?t=1641364595",
    name: '知遇书店',
    newMessage: "请确认收货地址",
    time: "2025-05-18 15:01",
    unread: 1,
  },
  {
    id: 3,
    avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.vMe_-slfM81tsU82rdZKCgAAAA?cb=iwc2&rs=1&pid=ImgDetMain",
    name: '读友书店',
    newMessage: "如果觉得不错，记得五星好评哦",
    time: "2024-05-18 20:18",
    unread: 1,
  }
]
// 格式化时间
const formatDisplayTime = (timeStr: string): string => {
  const messageDate = new Date(timeStr.replace(/-/g, '/'));
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const currentYear = now.getFullYear();

  const messageYear = messageDate.getFullYear();
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());

  if (messageDay.getTime() === today.getTime()) {
    // 今天：显示 HH:mm
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (messageDay.getTime() === yesterday.getTime()) {
    // 昨天
    return "昨天";
  } else if (messageYear === currentYear) {
    // 今年内，但不是今天或昨天：显示 MM-DD
    const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
    const day = messageDate.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  } else {
    // 昨天之前且不是今年（即往年）：显示 YYYY-MM-DD
    const year = messageDate.getFullYear();
    const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
    const day = messageDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};
</script>

<style lang="css" scoped>
.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #333
}
</style>