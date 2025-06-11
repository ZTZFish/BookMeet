<script lang="ts" setup>
import { h, ref } from 'vue';
import { AppIcon, ServiceIcon, InternetIcon, NotificationIcon, CatalogIcon, LoginIcon } from 'tdesign-icons-vue-next';
import { useAuthStore } from '../../store/userStore';
import checkLogin from '../../composables/checkLogin'


const user = useAuthStore();

const service = () => h(ServiceIcon);
const notification = () => h(NotificationIcon);
const catalog = () => h(CatalogIcon);
const login = () => h(LoginIcon);

const visible = ref(false);
const agreementVisible = ref(false);
const currentPlacement = ref('bottom');


const onHide = () => (agreementVisible.value = false);
const onClickAgreement = () => {
  agreementVisible.value = true;
  currentPlacement.value = 'bottom'; // 确保位置正确
};

const viewNews = () => {
  checkLogin(user, visible);
}

const feedback = () => {
  checkLogin(user, visible);
}

const logOut = () => {
  let result = checkLogin(user, visible);
  if (result == true) {
    user.logout();
    alert("退出成功!");
  }
}
</script>

<template>
  <t-cell-group theme="default" class="else-features">
    <t-cell :left-icon="notification" title="网站通知" arrow style="border-radius: 20px 20px 0 0 ;" @click="viewNews" />
    <t-cell :left-icon="service" title="用户反馈" arrow @click="feedback" />
    <div class="popup-demo">
      <t-cell :left-icon="catalog" title="用户协议与版权声明" arrow @click="onClickAgreement" />
      <t-popup v-model="agreementVisible" placement="bottom" style="height: 500px" class="agreement">
        <div class="header">
          <div class="btn btn--cancel" aria-role="button" @click="onHide">取消</div>
          <div class="title">用户协议与版权声明</div>
          <div class="btn btn--confirm" aria-role="button" @click="onHide">确定</div>
        </div>
        <div class="agreement-content" style="padding: 16px; overflow-y: auto; height: calc(100% - 58px);">
          <h3>用户协议</h3>
          <p>欢迎使用本网上书店服务。在使用本服务之前，请您务必仔细阅读并理解本协议中规定的所有权利和限制。一旦您使用本服务，即表示您已同意并接受本协议的所有条款和条件。</p>
          <p>1. 服务内容：本网上书店提供图书的在线浏览、购买、支付、配送等服务。</p>
          <p>2. 用户账户：您需要注册账户才能使用本服务的某些功能。您应妥善保管您的账户信息，并对账户下的所有活动负责。</p>
          <p>3. 购买与支付：所有订单均需经过您的确认。支付方式将根据平台提供的选项进行。</p>
          <p>4. 配送：我们将尽力确保图书及时送达，但不对因不可抗力造成的延误负责。</p>
          <p>5. 用户行为：您承诺在使用本服务时遵守所有适用的法律法规，不发布违法、有害、淫秽或侵犯他人权利的内容。</p>
          <p>6. 隐私保护：我们将根据隐私政策保护您的个人信息。</p>
          <p>7. 协议修改：本网上书店保留随时修改本协议的权利，修改后的协议将在网站上公布。</p>
          <p>8. 法律适用：本协议的订立、执行和解释及争议的解决均适用中华人民共和国法律。</p>

          <h3>版权声明</h3>
          <p>本网上书店（以下简称“本网站”）所展示的所有图书、文字、图片、音频、视频、软件及其他信息（以下简称“内容”）的版权均归原作者或本网站合法所有。</p>
          <p>1. 未经本网站或相关权利人书面许可，任何单位及个人不得以任何方式或理由对本网站内容进行复制、修改、传播、出版、发行、展示、链接、下载或以其他方式使用。</p>
          <p>2. 对于任何侵犯本网站版权的行为，本网站将保留追究其法律责任的权利。</p>
          <p>3. 本网站所使用的部分图片、字体等可能来源于网络，若有侵犯您的版权，请及时联系我们，我们将立即删除。</p>
          <p>4. 用户在本网站发布的内容，视为用户已授权本网站在全球范围内免费使用、复制、修改、改编、出版、翻译、创作衍生作品、传播、表演和展示该内容。</p>
          <p>5. 本网站尊重知识产权，并呼吁所有用户共同遵守版权法律法规。</p>
        </div>
      </t-popup>
    </div>
    <t-cell :left-icon="login" title="退出登录" arrow @click="logOut" />
    <div class="placeholder" style="background-color: #fff;height: 195px;"></div>
  </t-cell-group>
  <t-message v-model="visible" :offset="[10, 16]" :duration="-1" theme="warning" content="请先登录" :close-btn="true" />
</template>

<style lang="less" scoped>
.else-features {
  width: 96%;
  margin: 30px 0 0 2%;
  border-radius: 20px;

}

.agreement {

  .header {
    display: flex;
    align-items: center;
    height: 58px; // 将 116rpx 替换为 58px
  }

  .title {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  .btn {
    font-size: 16px;
    padding: 16px;
  }

  .btn--cancel {
    color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
  }

  .btn--confirm {
    color: #0052d9;
  }

  .agreement-content {
    // 您可以在这里添加更多样式，例如字体大小、行高、颜色等
    font-size: 14px;
    line-height: 1.6;
    color: #333;

    h3 {
      font-size: 16px;
      margin-top: 15px;
      margin-bottom: 10px;
      color: #000;
    }

    p {
      margin-bottom: 10px;
    }
  }
}
</style>
