<template>
  <t-tab-bar v-model="value" :split="false">
    <t-tab-bar-item v-for="item in list" :key="item.name" :value="item.name">
      {{ item.text }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const value = ref('label_1');
const list = ref([
  { name: 'label_1', text: '首页', icon: 'home' },
  { name: 'label_2', text: '图书', icon: 'book', },
  { name: 'label_3', text: '购物车', icon: 'cart', },
  { name: 'label_4', text: '聊天', icon: 'chat', },
  { name: 'label_5', text: '我的', icon: 'user', }
]);
</script>
