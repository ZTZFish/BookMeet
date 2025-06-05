<script setup lang="ts">
import { ref, nextTick } from 'vue';

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
//虚假书籍信息
const bookInfo =
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
  publishingTiem: '1996年',
  marketer: '大众书局',
  marketAddress: '北京市朝阳区',
  publisher: '人民文学出版社',
  pages: '287页',
  ISBN: '9787544729323',
  binding: '精装',
  language: '中文',
  size: '201mm*62mm*140mm',
  introduction: `《红楼梦》是一部百科全书式的长篇小说。以宝黛爱情悲剧为主线，以四大家族的荣辱兴衰为背景，描绘出18世纪中国封建社会的方方面面，以及封建专制下新兴资本主义民主思想的萌动。结构宏大、情节委婉、细节精致，人物形象栩栩如生，声口毕现，堪称中国古代小说中的经典。\n
由红楼梦研究所校注、人民文学出版社出版的《红楼梦》以庚辰（1760）本《脂砚斋重评石头记》为底本，以甲戌（1754）本、已卯（1759）本、蒙古王府本、戚蓼生序本、舒元炜序本、郑振铎藏本、红楼梦稿本、列宁格勒藏本（俄藏本）、程甲本、程乙本等众多版本为参校本，是一个博采众长、非常适合大众阅读的本子；同时，对底本的重要修改，皆出校记，读者可因以了解《红楼梦》的不同版本状况。\n
红学所的校注本已印行二十五年，其间1994年曾做过一次修订，又十几年过去，2008年推出修订第三版，体现了新的校注成果和科研成果。\n
关于《红楼梦》的作者，原本就有多种说法及推想，“前八十回曹雪芹著、后四十回高鹗续”的说法只是其中之一，这次修订中校注者改为“前八十回曹雪芹著；后四十回无名氏续，程伟元、高鹗整理”，应当是一种更科学的表述，体现了校注者对这一问题的新的认识。\n
现在这个修订后的《红楼梦》是更加完善。\n`
}
</script>

<template>
  <div class="book-content">
    <div class="price">
      <span>新客专享折后价￥</span>
      <span style="font-size: 2em;font-weight: 600;">{{ (bookInfo.price * 0.85).toFixed(2) }}</span>
      <span style="margin-left: 10px;">| 优惠前￥{{ bookInfo.price }}</span>
    </div>
    <div class="book-name">
      <t-tag theme="success" size="large" v-if="bookInfo.statu == '现书'">现书</t-tag>
      <t-tag theme="primary" size="large" v-else>预售</t-tag>
      <span class="name">{{ bookInfo.name }}</span>
      <span class="author">{{ bookInfo.author }}</span>
    </div>
    <div class="grades">
      <img src="../../assets/favicon.ico" alt="豆瓣">
      <span> 豆瓣评分（{{ bookInfo.grades }}）：</span>
      <t-rate variant="filled" :disabled="false" :value="Number((bookInfo.grades ?? 0) / 2)" size="20"
        :allow-half="true" :count="5" />
    </div>
    <t-cell-group theme="card" class="good-info">
      <div class="popup-demo">
        <div class="book-introduction" @click="onClickBookIntroduction">
          <img src="../../assets/introduction.png" alt="书籍介绍">
          <t-cell title="书籍介绍" hover :note="bookInfo.description" arrow />
        </div>
        <t-popup v-model="bookIntroductionVisible" :placement="currentPlacement" destroy-on-close close-btn
          style="padding:0 10px;height: 500px;">
          <div class="introduction-popup-content" style="height: 100%; overflow-y: auto;">
            <h2 style="height: 40px;line-height: 40px;text-align: center;">书籍介绍</h2>
            <p style="white-space: pre-wrap;">{{ bookInfo.introduction }}</p>
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
              <li><b>ISBN：</b>{{ bookInfo.ISBN }}</li>
              <li><b>状态：</b>{{ bookInfo.statu }}</li>
              <li><b>作者：</b>{{ bookInfo.author }}</li>
              <li><b>规格：</b>{{ bookInfo.size }}</li>
              <li><b>页数：</b>{{ bookInfo.pages }}</li>
              <li><b>装帧模式：</b>{{ bookInfo.binding }}</li>
              <li><b>语言：</b>{{ bookInfo.language }}</li>
              <li><b>出版社：</b>{{ bookInfo.publisher }}</li>
              <li><b>出版时间：</b>{{ bookInfo.publishingTiem }}</li>
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