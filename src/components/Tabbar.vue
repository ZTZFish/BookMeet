<template>
  <t-tab-bar v-model="currentValue" :split="true" default-value="index" @change="toPage" theme="tag"
    style="font-size: 30px;">
    <t-tab-bar-item v-for="item in list" :key="item.name" :value="item.name" style="height: 70px;">
      <p style="font-size: 16px;">{{ item.text }}</p>
      <template #icon>
        <span v-html="item.svg"></span>
        <!-- <p>{{ item.text }}</p> -->
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // 获取当前路由信息

const currentValue = ref(route.name as string || 'Index');

watch(() => route.name, (newName) => {
  if (newName) {
    currentValue.value = newName as string;
  }
});
const list = ref([
  { name: 'Index', text: '首页', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11.75a.74.74 0 0 1-.45-.15L12 5.94L4.45 11.6a.75.75 0 0 1-.9-1.2l8-6a.75.75 0 0 1 .9 0l8 6a.75.75 0 0 1 .15 1a.74.74 0 0 1-.6.35"></path><path fill="currentColor" d="M18 19.75H6a.76.76 0 0 1-.75-.75V9.5a.75.75 0 0 1 1.5 0v8.75h10.5V9.5a.75.75 0 0 1 1.5 0V19a.76.76 0 0 1-.75.75"></path><path fill="currentColor" d="M14 19.75a.76.76 0 0 1-.75-.75v-6.25h-2.5V19a.75.75 0 0 1-1.5 0v-7a.76.76 0 0 1 .75-.75h4a.76.76 0 0 1 .75.75v7a.76.76 0 0 1-.75.75"></path></svg>` },
  { name: 'Book', text: '图书', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 64 64"><path fill="currentColor" d="m57.063 20.218l1.029-1.698s.906-1.502.906-3.519c0-4.886-4.662-4.757-4.662-4.757L44.179 7.479L38.638 2l-7.291 1.985l-2.391-.651l-1.817 1.797l-10.497 2.858s-4.04-.111-4.04 4.123c0 1.748.786 3.05.786 3.05l1.351 2.23l-1.187 1.172l-5.86 1.596s-4.662-.129-4.662 4.757a7.56 7.56 0 0 0 .779 3.281L2 29.987l.949.376c.021.051.029.108.07.149c1.835 1.839 1.684 4.309 1.422 5.643l-1.109 1.111l8.401 4.039L23.271 60.35c1.849 2.906 5.774 1.088 5.774 1.088l29.649-14.256l-1.109-1.111c-.262-1.334-.413-3.804 1.422-5.644c.041-.041.049-.098.07-.148l.949-.377l-5.513-5.45l6.33-3.043l-.961-.963c-.227-1.156-.358-3.297 1.233-4.891c.035-.036.041-.084.06-.129l.825-.327zm-5.685-8.835l-1.25 1.978l-3.234-3.198zM39.176 7.144l4.643 4.963l-16.789 6.067l-3.965-6.156zM15.744 19.052l11.457 18.911l-21.827-8.658zm-4.775 2.067l-1.345 1.33l-.538-.825zm-4.247 1.034l1.252 1.927l-2.713 2.682a5.586 5.586 0 0 1-.331-1.845c0-1.826.906-2.521 1.792-2.764M5.154 37.026l.015-.058l25.147 11.007l-24.95-11.894c.023-.135.041-.284.06-.434l19.533 8.18l-19.465-9.116a7.723 7.723 0 0 0-.086-1.245l18.079 7.445L5.165 32.4a6.048 6.048 0 0 0-.47-1.137l24.883 10.625l.566.934c1.167 1.834 3.284 1.495 4.351 1.177c1.475.728 4.119 2.412 3.442 4.893c-.357 1.312-1.142 1.948-2.399 1.948c-1.273 0-2.544-.666-2.557-.675zM30.2 50.185l-1.966.814l-1.67-2.563zm-7.614 5.381l-7.729-12.759l7.682 3.693l3.633 5.592c-1.465.626-3.102 2.055-3.586 3.474m34.033-12.184a7.731 7.731 0 0 0-.086 1.245l-19.465 9.116l19.533-8.18c.019.149.036.299.06.434l-24.95 11.895l25.147-11.007a.982.982 0 0 1 .015.058L29.046 60.08c-.013.009-1.282.675-2.557.675c-1.258 0-2.042-.637-2.399-1.948c-.918-3.367 4.302-5.276 4.38-5.305l4.575-1.952c.491.209 3.994 1.584 5.711-1.115l1.083-1.786l17.494-7.47a6.12 6.12 0 0 0-.471 1.137L38.54 50.827zm.034-4.161l-14.825 6.144l4.114-6.791l6.767-3.253zm2.393-11.107a6.9 6.9 0 0 0-.075 1.079l-16.868 7.9l16.928-7.089c.017.129.031.26.052.376L37.459 40.688l21.794-9.539a.46.46 0 0 1 .013.05L35.149 42.586c-.011.007-1.112.585-2.216.585c-1.091 0-1.77-.553-2.079-1.689c-.796-2.918 3.728-4.572 3.796-4.597l25.014-10.68a5.268 5.268 0 0 0-.407.986l-15.88 7.376z"></path></svg>`, },
  { name: 'Message', text: '消息', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12.28 19.23q1.056-.075 2.084-.337a5.8 5.8 0 0 0 2.602.168a1 1 0 0 1 .104-.008c.31 0 .717.178 1.31.553v-.616a.6.6 0 0 1 .311-.525c.258-.143.498-.31.717-.492c.864-.723 1.352-1.686 1.352-2.706a3.2 3.2 0 0 0-.159-.993c.26-.48.472-.986.627-1.51c.5.74.77 1.61.772 2.503c0 1.386-.654 2.68-1.785 3.625a6 6 0 0 1-.595.436v1.442c0 .496-.58.78-.989.486a15 15 0 0 0-1.2-.8a3 3 0 0 0-.369-.184q-.51.076-1.038.077c-1.412 0-2.717-.419-3.744-1.12m-7.466-2.885C3.03 14.854 2 12.818 2 10.64c0-4.454 4.258-8.014 9.457-8.014s9.458 3.56 9.458 8.014s-4.259 8.013-9.458 8.013q-.877 0-1.728-.133c-.245.057-1.224.631-2.635 1.648c-.51.369-1.236.013-1.236-.608V17.1a9 9 0 0 1-1.044-.754m4.95.658q.063 0 .13.01a9.5 9.5 0 0 0 1.563.128c4.392 0 7.907-2.939 7.907-6.502s-3.515-6.501-7.907-6.501c-4.39 0-7.907 2.939-7.907 6.501c0 1.723.821 3.345 2.273 4.559q.55.458 1.196.821c.241.135.39.385.39.655v1.419c1.116-.74 1.85-1.09 2.354-1.09"></path><path fill="currentColor" d="M7.625 12a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m4.062 0a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m4.063.001a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5"></path></svg>`, },
  { name: 'User', text: '我的', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" data-swindex="0"><path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 14.5s-1.5 2-4.5 2s-4.5-2-4.5-2"></path><path fill="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.5 10a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path></g></svg>` }
]);

const emit = defineEmits(['changePage']);
const pageName = ref('Index');
const toPage = (newName: string) => {
  pageName.value = newName;
  emit('changePage', pageName.value);
};

</script>

<style lang="css" scoped>
:deep(.t-tab-bar-item__icon) {
  height: 40px !important;
  /* 设置您期望的高度 */
}
</style>
