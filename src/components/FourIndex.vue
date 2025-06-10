<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepComponent">
        <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" class="placeholder" />
      </keep-alive>
      <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" class="placeholder" />
    </router-view>
    <Tabbar @change-page="toPage" v-show="['Index', 'Book', 'Message', 'User'].includes(route.name as string)" />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import Tabbar from './Tabbar.vue';
import { ref } from 'vue';

//缓存组件
const keepComponent = ref(['Index', 'Book', 'Message', 'User']);

//Tabbar切换
const router = useRouter();
const route = useRoute();
const toPage = (pageName: string) => {
  router.push({ name: pageName })
}

</script>

<style lang="less" scoped></style>