<script setup>
import { ref } from 'vue';

const feature = ref();
</script>

<template>
  <div class="top">
    <h2>个人中心</h2>
  </div>
</template>

<style lang="css" scoped>
.top {
  width: 100%;
  height: 60px;
  background-color: #0052d9;
}

.top h2 {
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>