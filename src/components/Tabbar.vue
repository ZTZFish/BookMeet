<template>
  <t-tab-bar v-model="currentValue" :split="true" default-value="index" @change="toPage">
    <t-tab-bar-item v-for="item in list" :key="item.name" :value="item.name">
      {{ item.text }}
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取当前路由信息

const currentValue = ref('index');
const list = ref([
  { name: 'index', text: '首页', icon: 'home' },
  { name: 'book', text: '图书', icon: 'book', },
  { name: 'message', text: '消息', icon: 'chat', },
  { name: 'shoppingCard', text: '购物车', icon: 'cart', },
  { name: 'user', text: '我的', icon: 'user', }
]);

const emit = defineEmits(['changePage']);
const pageName = ref('index');
const toPage = (newName: string) => {
  console.log("触发了change事件，", newName);
  pageName.value = newName;
  emit('changePage', pageName.value);
};


// 监听路由变化，同步更新 Tabbar 的选中状态
watch(
  () => route.name,
  (routeName) => {
    if (routeName && list.value.some(item => item.name === routeName)) {
      currentValue.value = routeName as string;
    }
  },
  { immediate: true } // 立即执行一次，确保初始状态正确
);
</script>
