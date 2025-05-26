<template>
  <div>
    <t-navbar title="标题居中" :fixed="true" left-arrow :safeAreaInsetTop="true">
      <template #right>
        <t-icon name="ellipsis" size="24px" />
      </template>
    </t-navbar>
  </div>
</template>

<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';


</script>

<style lang="less" scoped>
.t-navbar {
  --td-navbar-height: 60px;
  margin-bottom: 16px;
}

.custom-title {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
}
</style>