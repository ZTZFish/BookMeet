<script setup>
import { ref, h } from 'vue';
import { ChatBubbleSmileIcon } from 'tdesign-icons-vue-next';

const chatSmile = () => h(ChatBubbleSmileIcon);
</script>

<template>
  <div>
    <div class="showComments">
      <t-cell title="评论" :left-icon="chatSmile" arrow hover />
    </div>
  </div>
</template>

<style lang="less" scoped>
.showComments {
  margin-bottom: 10px;

  .t-cell {
    padding-left: 30px;
  }
}
</style>