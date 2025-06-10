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
import { useScrollPosition } from '../../composables/useScrollPosition';
import { useFormatTime } from '../../composables/useFormatTime';

// 使用改进的滚动位置保存
const { savePosition } = useScrollPosition({
  restoreDelay: 50 // 延迟50ms恢复，确保组件渲染完成
});

// 使用改进的时间格式化
const { formatDisplayTime } = useFormatTime();


defineOptions({
  name: "Message",
})

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
    avatar: "https://pic1.zhimg.com/v2-01a861b2352d663a023a75f82ae0b0c0_b.jpg",
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



</script>

<style lang="css" scoped>
.title {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #333
}
</style>