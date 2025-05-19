<script setup lang="ts">
import Tabbar from './components/Tabbar.vue';
import Index from './components/index/Index.vue';
import Book from './components/Book/Book.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const toPage = (pageName: string) => {
  router.push({ name: pageName })
}
</script>

<template>
  <router-view />
  <Tabbar @change-page="toPage" />
</template>

<style scoped></style>
