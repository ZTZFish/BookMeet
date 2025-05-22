<template>
  <div class="demo-tab-bar">
    <t-tabs default-value="first">
      <t-tab-panel value="first" label="好书" :icon="giggleIcon" />
      <t-tab-panel value="second" label="名书" :icon="thumbUpIcon" />
      <t-tab-panel value="third" label="新书" :icon="appIcon" />
    </t-tabs>

  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { IconFont, AppIcon, GiggleIcon, ThumbUpIcon } from 'tdesign-icons-vue-next';

const appIcon = () => h(AppIcon, { size: 'large', style: { marginRight: '3px' } });
const giggleIcon = () => h(GiggleIcon, { size: 'large', style: { marginRight: '3px' } });
const thumbUpIcon = () => h(ThumbUpIcon, { size: 'large', style: { marginRight: '3px' } });
</script>

<style lang="less" scoped>
.t-tabs {
  margin: 16px 10px 25px 10px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}

.label-content {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 3px;
  }
}
</style>
