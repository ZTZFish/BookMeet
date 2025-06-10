<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { TdSideBarProps, TdSideBarItemProps } from 'tdesign-mobile-vue';
import { useRouter } from 'vue-router';



const data = reactive({
  categories: [
    {
      label: '文学艺术',
      badgeProps: {},
    },
    {
      label: '社会科学',
      badgeProps: {},
    },
    {
      label: '自然科学与技术',
      badgeProps: {},
    },
    {
      label: '商业与管理',
      badgeProps: {},
    },
    {
      label: '教育与考试',
      badgeProps: {},
    },
    {
      label: '生活实用',
      badgeProps: {},
    },
  ],
});

const sideBarIndex = ref<TdSideBarProps['value']>(0);
const onSideBarClick = (value: TdSideBarProps['value'], label: TdSideBarItemProps['label']) => {
  console.log('=onSideBarClick===', value, label);
};

const onSideBarChange = (value: TdSideBarProps['value']) => {
  sideBarIndex.value = value;
};

interface Book {
  id: number,
  name?: string,
  author?: string,
  price?: number,
  tyep?: string,
  grades?: number,
  description?: string,
  image?: string,
  statu?: string,
  publishingTiem?: string,
}

let bookList: Book[] = [
  {
    id: 1,
    name: '红楼梦',
    author: '曹雪芹',
    price: 59.70,
    tyep: '文学艺术',
    grades: 9.7,
    description: '都云作者痴，谁解其中味',
    image: 'https://img1.doubanio.com/view/subject/s/public/s1070959.jpg',
    statu: '现书',
    publishingTiem: '1996年'
  },
  {
    id: 2,
    name: '活着',
    author: '余华',
    price: 28.00,
    tyep: '文学艺术',
    grades: 9.4,
    description: '生的困难与伟大',
    image: 'https://img9.doubanio.com/view/subject/s/public/s29869926.jpg',
    statu: '预售',
    publishingTiem: '2012年'
  },
  {
    id: 3,
    name: '哈利·波特',
    author: 'J.K.罗琳',
    price: 498.00,
    tyep: '社会科学',
    grades: 9.7,
    description: '从9¾站台开始的旅程',
    image: 'https://img9.doubanio.com/view/subject/s/public/s29101586.jpg',
    statu: '现书',
    publishingTiem: '2008年'
  }]

const router = useRouter();

const goToBookDetails = (bookId: number) => {
  router.push({
    name: 'Bookdetails',
    params: { bookId: bookId },
  })
};


</script>

<template>
  <div class="sidebar-container" ref="scrollContainer">
    <div class="side-bar-wrapper">
      <t-side-bar :value="sideBarIndex" @change="onSideBarChange" @click="onSideBarClick">
        <t-side-bar-item v-for="(item, index) in data.categories" :key="index" :value="index" :label="item.label"
          :badge-props="item.badgeProps" />
      </t-side-bar>
      <div class="content" :style="`transform: translateY(-${Number(sideBarIndex) * 100}%)`">
        <div v-for="(item, index) in data.categories" :key="index" class="section">
          <div class="title">{{ item.label }}</div>
          <ul class="show-books">
            <li v-for="book in bookList" :key="book.id" @click="goToBookDetails(book.id)" style="cursor: pointer;">
              <BookCard>
                <template #card-image>
                  <div class="book-image">
                    <img :src="book.image" alt="" />
                  </div>
                </template>
                <template #card-info>
                  <div class="state-name">
                    <t-tag theme="success" class="book-state" v-if="book.statu === '现书'">现书</t-tag>
                    <t-tag theme="primary" v-else>预售</t-tag>
                    <div class="book-title">{{ book.name }}</div>
                  </div>
                  <div class="auther">
                    <span>作者：</span>{{ book.author }}
                  </div>
                  <div class="rate-demo-cell" style="display: flex; align-items: center;margin-top: 5px;">
                    <span class="rate-demo-cell__label" style="margin-right:3px">评分：</span>
                    <!-- 修正属性名称和绑定值 -->
                    <t-rate variant="filled" :disabled="true" :value="Number((book.grades ?? 0) / 2)" size="20"
                      :allow-half="true" :count="5" />
                  </div>
                  <div class="description" style="margin-top: 5px;">
                    ”{{ book.description }}“
                  </div>
                  <div class="book-price">
                    ￥{{ book.price }}
                  </div>
                </template>
              </BookCard>
              <t-divider />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

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

  .title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}

.book-image {
  width: 30%;
  height: 100%;
  margin-right: 15px;
}

.book-image img {
  width: 100%;
  height: 100%;
}

.state-name {
  display: flex;
}

.book-title {
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  margin-bottom: 5px;
}

.description {
  font-size: 14px;
  color: var(--color-text-desc, #888);
}

.book-price {
  margin-top: 5px;
  font-size: 16px;
  color: #ff6600;
}
</style>