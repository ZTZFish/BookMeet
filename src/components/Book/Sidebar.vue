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
            <BookCard>
              <template #>

              </template>
            </BookCard>
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

interface Book {
  id?: number,
  name?: string,
  auther?: string,
  price?: number,
  tyep?: string,
  garde?: string,
  description?: string,
  image?: string,
  statu?: string,
  publishingTiem?: string,
}

let bookList: Book[] = [
  {
    id: 1,
    name: '《红楼梦》',
    auther: '曹雪芹',
    price: 59.70,
    tyep: '文学艺术',
    garde: '9.7',
    description: '都云作者痴，谁解其中味？',
    image: 'https://img1.doubanio.com/view/subject/s/public/s1070959.jpg',
    statu: '现书',
    publishingTiem: '1996年'
  },
  {
    id: 2,
    name: '活着',
    auther: '余华',
    price: 28.00,
    tyep: '文学艺术',
    garde: '9.4',
    description: '生的困难与伟大。',
    image: 'https://img9.doubanio.com/view/subject/s/public/s29869926.jpg',
    statu: '预售',
    publishingTiem: '2012年'
  },
  {
    id: 3,
    name: '哈利·波特',
    auther: 'J.K.罗琳',
    price: 498.00,
    tyep: '社会科学',
    garde: '9.7',
    description: '从9¾站台开始的旅程',
    image: 'https://img9.doubanio.com/view/subject/s/public/s29101586.jpg',
    statu: '现书',
    publishingTiem: '2008年'
  }]
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
