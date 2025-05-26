<template>
  <div>
    <keep-alive>
      <router-view style="padding-bottom: 86px;" />
    </keep-alive>
    <Tabbar @change-page="toPage" />
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

<style lang="css" scoped></style>