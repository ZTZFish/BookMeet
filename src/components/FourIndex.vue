<template>
  <div>
    <keep-alive>
      <router-view class="placeholder" />
    </keep-alive>
    <Tabbar @change-page="toPage" v-show="['index', 'book', 'message', 'user'].includes(route.name as string)" />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import Tabbar from './Tabbar.vue';
import { ref } from 'vue';

//Tabbar切换
const router = useRouter();
const route = useRoute();
const toPage = (pageName: string) => {
  router.push({ name: pageName })
}

</script>

<style lang="less" scoped>
.placeholder {
  padding-bottom: 86px;
}
</style>