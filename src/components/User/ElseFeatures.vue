<script lang="ts" setup>
import { h } from 'vue';
import { AppIcon, ServiceIcon, InternetIcon, NotificationIcon, CatalogIcon, LoginIcon } from 'tdesign-icons-vue-next';

const service = () => h(ServiceIcon);
const notification = () => h(NotificationIcon);
const catalog = () => h(CatalogIcon);
const login = () => h(LoginIcon);
</script>

<template>
  <t-cell-group theme="default" class="else-features">
    <t-cell :left-icon="notification" title="网站通知" arrow style="border-radius: 20px 20px 0 0 ;" />
    <t-cell :left-icon="service" title="用户反馈" arrow />
    <t-cell :left-icon="catalog" title="用户协议与版权声明" arrow />
    <t-cell :left-icon="login" title="退出登录" arrow />
    <div class="placeholder" style="background-color: #fff;height: 195px;"></div>
  </t-cell-group>
</template>

<style lang="less" scoped>
.else-features {
  width: 96%;
  margin: 30px 0 0 2%;
  border-radius: 20px;

}
</style>
