<template>
  <t-dropdown-menu @menu-opened="handleMenuOpened" @menu-closed="handleMenuClosed">
    <t-dropdown-item :options="product.options" :value="product.value" @change="onChange" />
    <t-dropdown-item :options="sorter.options" :value="sorter.value" />
  </t-dropdown-menu>
</template>

<script lang="ts" setup>
const product = {
  value: 'all',
  options: [
    {
      value: 'all',
      label: '全部产品',
    },
    {
      value: 'exist',
      label: '只看有书',
    },
    {
      value: 'hot',
      label: '预售书籍',
    },
  ],
};
const sorter = {
  value: 'default',
  options: [
    {
      value: 'default',
      label: '默认排序',
    },
    {
      value: 'price',
      label: '价格从高到低',
    },
  ],
};
function onChange(e: any) {
  console.log(e);
}

const handleMenuOpened = () => {
  console.log('==handleMenuOpened===');
};

const handleMenuClosed = (val: string) => {
  console.log('==handleMenuClosed===', val);
};
</script>
