<template>
  <div class="side-bar-wrapper">
    <t-side-bar :value="sideBarIndex" @change="onSideBarChange" @click="onSideBarClick">
      <t-side-bar-item v-for="(item, index) in data.categories" :key="index" :value="index" :label="item.label"
        :badge-props="item.badgeProps" />
    </t-side-bar>
    <div class="content" :style="`transform: translateY(-${Number(sideBarIndex) * 100}%)`">
      <div v-for="(item, index) in data.categories" :key="index" class="section">
        <div class="title">{{ item.label }}</div>
        <ul class="showBooks">
          <li v-for="book in bookList" :key="book.id">
            <BookCard />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { TdSideBarProps, TdSideBarItemProps } from 'tdesign-mobile-vue';

const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill({ label: '标题文字', image }, 0, 12);
const sideBarIndex = ref<TdSideBarProps['value']>(0);

const data = reactive({
  categories: [
    {
      label: '文学艺术',
      badgeProps: {},
      items,
    },
    {
      label: '社会科学',
      badgeProps: {},
      items: items.slice(0, 9),
    },
    {
      label: '自然科学与技术',
      badgeProps: {},
      items: items.slice(0, 9),
    },
    {
      label: '商业与管理',
      badgeProps: {},
      items: items.slice(0, 6),
    },
    {
      label: '教育与考试',
      badgeProps: {},
      items: items.slice(0, 3),
    },
    {
      label: '生活实用',
      badgeProps: {},
      items: items.slice(0, 3),
    },
  ],
});

const onSideBarClick = (value: TdSideBarProps['value'], label: TdSideBarItemProps['label']) => {
  console.log('=onSideBarClick===', value, label);
};

const onSideBarChange = (value: TdSideBarProps['value']) => {
  sideBarIndex.value = value;
};

let bookList: { id: number, name: string, }[]
</script>
<style lang="less" scoped>
.side-bar-wrapper {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color-demo, #fff);
  overflow: hidden;

  .content {
    flex: 1;
    transition: transform 0.3s ease;
  }

  .section {
    padding: 16px 0;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
