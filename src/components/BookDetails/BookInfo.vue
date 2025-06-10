<script setup lang="ts">
import { ref, nextTick, defineProps } from 'vue';

const props = defineProps({
  bookInfo: {
    type: Object,
    default: () => ({}),
  },
});

const logisticsVisible = ref(false);
const rightsVisible = ref(false);
const sizePubAuthorVisible = ref(false);
const bookIntroductionVisible = ref(false);

const currentPlacement = ref('bottom');

const onClickLogistics = () => {
  logisticsVisible.value = true;
  currentPlacement.value = 'bottom'; // 确保位置正确
};

const onClickRights = () => {
  rightsVisible.value = true;
  currentPlacement.value = 'bottom'; // 确保位置正确
};

const onClickSizePubAuthor = () => {
  sizePubAuthorVisible.value = true;
  currentPlacement.value = 'bottom'; // 确保位置正确
};

const onClickBookIntroduction = () => {
  bookIntroductionVisible.value = true;
  currentPlacement.value = 'bottom'; // 确保位置正确
};

const onClick = (item: any) => {
  currentPlacement.value = 'bottom';
  nextTick(() => (visible.value = true));
};
const visible = ref(false);

</script>

<template>
  <div class="book-content">
    <div class="price">
      <span>新客专享折后价￥</span>
      <span style="font-size: 2em;font-weight: 600;">{{ (Number(props.bookInfo.price) * 0.85).toFixed(2) }}</span>
      <span style="margin-left: 10px;">| 优惠前￥{{ props.bookInfo.price }}</span>
    </div>
    <div class="book-name">
      <t-tag theme="success" size="large" v-if="props.bookInfo.status == '现书'">现书</t-tag>
      <t-tag theme="primary" size="large" v-else>预售</t-tag>
      <span class="name">{{ props.bookInfo.name }}</span>
      <span class="author">{{ props.bookInfo.author }}</span>
    </div>
    <div class="grades">
      <img src="../../assets/favicon.ico" alt="豆瓣">
      <span> 豆瓣评分（{{ props.bookInfo.grades }}）：</span>
      <t-rate variant="filled" :disabled="false" :value="Number((props.bookInfo.grades ?? 0) / 2)" size="20"
        :allow-half="true" :count="5" />
    </div>
    <t-cell-group theme="card" class="good-info">
      <div class="popup-demo">
        <div class="book-introduction" @click="onClickBookIntroduction">
          <img src="../../assets/introduction.png" alt="书籍介绍">
          <t-cell title="书籍介绍" hover :note="props.bookInfo.description" arrow />
        </div>
        <t-popup v-model="bookIntroductionVisible" :placement="currentPlacement" destroy-on-close close-btn
          style="padding:0 10px;height: 500px;">
          <div class="introduction-popup-content" style="height: 100%; overflow-y: auto;">
            <h2 style="height: 40px;line-height: 40px;text-align: center;">书籍介绍</h2>
            <p style="white-space: pre-wrap;">{{ props.bookInfo.introduction }}</p>
          </div>
        </t-popup>
      </div>

      <div class="popup-demo">
        <div class="logistics" @click="onClickLogistics">
          <img src="../../assets/logistics.png" alt="商品物流">
          <t-cell title="商品物流" hover note="省内两天必达|省外四天必达" arrow />
        </div>
        <t-popup v-model="logisticsVisible" :placement="currentPlacement" destroy-on-close close-btn
          style="padding:0 10px;height: 500px;">
          <h2 style="height: 40px;line-height: 40px;text-align: center;">物流信息</h2>
        </t-popup>
      </div>

      <div class="popup-demo">
        <div class="rights" @click="onClickRights">
          <img src="../../assets/rights.png" alt="用户权益">
          <t-cell title="用户权益" hover note="七天无理由退换|极速退款" arrow />
        </div>
        <t-popup v-model="rightsVisible" :placement="currentPlacement" destroy-on-close close-btn
          style="padding:0 10px;height: 500px;">
          <div class="rights-popup-content">
            <h3>用户权益保障</h3>
            <p>我们致力于为您提供优质的购物体验，以下是您的主要权益：</p>
            <ul>
              <li>
                <p><b>七天无理由退换货：</b>自您收到商品之日起七日内，在不影响二次销售的前提下，可享受无理由退换货服务。</p>
              </li>
              <li>
                <p><b>极速退款：</b>退货商品经仓库确认收货后，我们将在24小时内为您办理退款，款项将原路退回。</p>
              </li>
              <li>
                <p><b>正品保障：</b>所有商品均来自官方授权渠道，保证正品，假一赔十。</p>
              </li>
              <li>
                <p><b>隐私保护：</b>我们严格遵守用户隐私政策，保护您的个人信息安全。</p>
              </li>
              <li>
                <p><b>专属客服：</b>遇到任何问题，您都可以联系我们的专属客服团队，我们将竭诚为您服务。</p>
              </li>
            </ul>
            <p style="margin-top: 20px; color: #666; font-size: 14px;">最终解释权归本公司所有。</p>
          </div>
        </t-popup>
      </div>
      <div class="popup-demo">
        <div class="size-pub-author" @click="onClickSizePubAuthor">
          <img src="../../assets/specification.png" alt="详细信息">
          <t-cell title="详细信息" hover note="规格|出版社|页数|出版时间" arrow />
        </div>
        <t-popup v-model="sizePubAuthorVisible" :placement="currentPlacement" destroy-on-close close-btn
          style="padding:0 10px;height: 500px;">
          <div class="detail-popup-content">
            <h2 style="height: 40px;line-height: 40px;text-align: center;">详细信息</h2>
            <ul>
              <li><b>ISBN：</b>{{ props.bookInfo.ISBN }}</li>
              <li><b>状态：</b>{{ props.bookInfo.status }}</li>
              <li><b>作者：</b>{{ props.bookInfo.author }}</li>
              <li><b>规格：</b>{{ props.bookInfo.size }}</li>
              <li><b>页数：</b>{{ props.bookInfo.pages }}</li>
              <li><b>装帧模式：</b>{{ props.bookInfo.binding }}</li>
              <li><b>语言：</b>{{ props.bookInfo.language }}</li>
              <li><b>出版社：</b>{{ props.bookInfo.publisher }}</li>
              <li><b>出版时间：</b>{{ props.bookInfo.publishingTime }}</li>
            </ul>
          </div>
        </t-popup>
      </div>
    </t-cell-group>
  </div>

</template>



<style lang="less" scoped>
.book-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .price {
    font-size: 16px;
    color: #ff6600;
    padding: 15px 30px 0;
    margin-bottom: 10px;
  }

  .book-name {
    display: flex;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 10px;

    .name,
    .author {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 700;
    }
  }

  .grades {
    display: flex;
    align-items: center;
    padding: 0 30px;
    margin: 10px 0 10px 0;

    img {
      width: 20px;
      height: 20px;
    }

    span {
      font-size: 16px;
      margin-left: 10px;
    }

    :deep(.t-rate) {
      pointer-events: none;
    }
  }
}

.good-info {

  .logistics,
  .rights,
  .size-pub-author,
  .book-introduction {
    display: flex;
    align-items: center;
    padding-left: 10px;

    img {
      width: 30px;
      height: 30px;
    }

    :deep(.t-cell) {
      --td-cell-horizontal-padding: 0;
      width: 100%;
      padding-left: 10px;
    }
  }


}

.rights-popup-content {
  padding: 15px;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }

  b {
    color: #0052d9; // TDesign primary color example
  }
}

.detail-popup-content {
  padding: 15px;

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.5;

    b {
      margin-right: 5px;
      color: #555; // 可以根据需要调整颜色
    }
  }
}
</style>