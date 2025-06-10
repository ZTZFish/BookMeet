<script setup lang="ts">
import UserInfo from './UserInfo.vue';
import UserFeatures from './UserFeatures.vue';
import ElseFeatures from './ElseFeatures.vue';
import Login from './Login.vue';
import { ref } from 'vue';
import { useScrollPosition } from '../../composables/useScrollPosition';

defineOptions({
  name: 'User',
})

</script>

<template>
  <div class="page-background">
    <div class="top">
      <UserInfo>
        <template #features>
          <UserFeatures />
        </template>
      </UserInfo>
      <ElseFeatures />
    </div>
  </div>
  <!-- <Login /> -->
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
</style>