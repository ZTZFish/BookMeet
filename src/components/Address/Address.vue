<template>
  <t-navbar title="我的收货地址" :fixed="true" left-arrow @left-click="handleClick" class="custom-navbar" />
  <div style="padding-top: 70px;">
    <div class="loading" v-show="load"><t-loading size="30px" theme="spinner" /></div>
    <div class="adresses" v-show="!load"> <!-- 当load为false时才显示地址内容 -->
      <div class="address" v-for="(address, index) in addressStore.addressList" :key="index">
        <div class="address-card">
          <div class="card-content">
            <div class="card-header">
              <div>
                <span class="consignee">{{ address.consignee }}</span>
                <span class="phone">{{ address.phone }}</span>
              </div>
              <span v-if="address.isDefault" class="default-tag">默认地址</span>
            </div>
            <p class="address-detailAddress">{{ address.province }} {{ address.city }} {{ address.county }} {{
              address.detailAddress }}</p>
          </div>
          <div class="card-footer">
            <button class="action-btn edit-btn" @click="editAddress(index)">
              <i class="fa fa-pencil"></i> 修改
            </button>
            <button class="action-btn delete-btn" @click="deleteAddress(index)">
              <i class="fa fa-trash"></i> 删除
            </button>
            <button class="action-btn default-btn" @click="setDefault(index)">
              <i class="fa fa-check-circle"></i> 设置默认
            </button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="addressStore.addressList.length === 0" class="empty-state">
        <i class="fa fa-map-marker"></i>
        <p>您还没有添加收货地址</p>
      </div>
      <!-- 添加新地址按钮 -->
      <div class="fixed-bottom-btn">
        <button class="add-new-btn" @click="addNewAddress">
          <i class="fa fa-plus-circle"></i>
          添加新地址
        </button>
      </div>
    </div>

    <!-- 地址编辑模态框 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingIndex === -1 ? '新增地址' : '编辑地址' }}</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>收货人姓名</label>
            <input type="text" v-model="form.consignee" class="form-input" placeholder="请输入收货人姓名">
          </div>
          <div class="form-group">
            <label>手机号码</label>
            <input type="tel" v-model="form.phone" class="form-input" placeholder="请输入手机号码">
          </div>
          <div class="form-row">
            <div class="form-col">
              <label>省份</label>
              <select v-model="form.province" class="form-select">
                <option value="">请选择</option>
                <option>北京市</option>
                <option>上海市</option>
                <option>广东省</option>
                <option>江苏省</option>
                <option>浙江省</option>
              </select>
            </div>
            <div class="form-col">
              <label>城市</label>
              <select v-model="form.city" class="form-select">
                <option value="">请选择</option>
                <option v-if="form.province === '北京市'">北京市</option>
                <option v-if="form.province === '上海市'">上海市</option>
                <option v-if="form.province === '广东省'">广州市</option>
                <option v-if="form.province === '广东省'">深圳市</option>
                <option v-if="form.province === '江苏省'">南京市</option>
                <option v-if="form.province === '江苏省'">苏州市</option>
                <option v-if="form.province === '浙江省'">杭州市</option>
                <option v-if="form.province === '浙江省'">宁波市</option>
              </select>
            </div>
            <div class="form-col">
              <label>区县</label>
              <select v-model="form.county" class="form-select">
                <option value="">请选择</option>
                <option v-if="form.city === '广州市'">天河区</option>
                <option v-if="form.city === '广州市'">越秀区</option>
                <option v-if="form.city === '深圳市'">福田区</option>
                <option v-if="form.city === '深圳市'">南山区</option>
                <option v-if="form.city === '南京市'">鼓楼区</option>
                <option v-if="form.city === '南京市'">玄武区</option>
                <option v-if="form.city === '苏州市'">姑苏区</option>
                <option v-if="form.city === '苏州市'">工业园区</option>
                <option v-if="form.city === '杭州市'">西湖区</option>
                <option v-if="form.city === '杭州市'">拱墅区</option>
                <option v-if="form.city === '宁波市'">海曙区</option>
                <option v-if="form.city === '宁波市'">江北区</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>详细地址</label>
            <textarea v-model="form.detailAddress" rows="3" class="form-textarea" placeholder="请输入详细地址"></textarea>
          </div>
          <div class="form-checkbox">
            <input type="checkbox" id="setAsDefault" v-model="form.isDefault" class="custom-checkbox">
            <label for="setAsDefault">设为默认地址</label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">
            取消
          </button>
          <button class="save-btn" @click="saveAddress(editingIndex)">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useAddressStore } from '../../store/addressStore';

defineOptions({
  name: 'Address',
  inheritAttrs: false
})

const addressStore = useAddressStore();
const load = ref(true); // 定义load变量，初始为true，表示正在加载

onBeforeMount(async () => {
  load.value = true; // 开始加载数据
  await addressStore.initAddressList();
  load.value = false; // 数据加载完成
});

onBeforeUnmount(async () => {
  try {
    await addressStore.saveNewAddress();
  } catch (error) {
    console.error('退出页面时保存地址信息出错:', error);
  }
});

// 模态框状态
const showModal = ref(false);
const editingIndex = ref(-1);

// 表单数据
const form = ref({
  consignee: '',
  phone: '',
  province: '',
  city: '',
  county: '',
  detailAddress: '',
  isDefault: false
});

// 处理返回按钮点击
const handleClick = () => {
  window.history.back();
}

// 打开新增地址模态框
const addNewAddress = () => {
  // 重置表单
  form.value = {
    consignee: '',
    phone: '',
    province: '',
    city: '',
    county: '',
    detailAddress: '',
    isDefault: false
  };
  editingIndex.value = -1;
  showModal.value = true;
}

// 打开编辑地址模态框
const editAddress = (index) => {
  // 复制地址数据到表单
  form.value = { ...addressStore.addressList[index] };
  editingIndex.value = index;
  showModal.value = true;
}

// 删除地址
const deleteAddress = (index) => {
  if (confirm('确定要删除这个地址吗？')) {
    addressStore.deleteAddress(index);
  }
}

// 设置默认地址
const setDefault = (index) => {
  // 先将所有地址设为非默认
  addressStore.addressList.forEach(item => {
    item.isDefault = false;
  });
  // 将当前地址设为默认
  addressStore.addressList[index].isDefault = true;
}

// 关闭模态框
const closeModal = () => {
  showModal.value = false;
}

// 保存地址
const saveAddress = () => {
  // 表单验证
  if (!form.value.consignee || !form.value.phone || !form.value.province || !form.value.city || !form.value.county || !form.value.detailAddress) {
    alert('请填写完整地址信息');
    return;
  }

  // 如果设置为默认地址，需要将其他地址设为非默认
  if (form.value.isDefault) {
    addressStore.addressList.forEach(item => {
      item.isDefault = false;
    });
  }

  // 新增地址
  if (editingIndex.value === -1) {
    addressStore.addAddress({
      ...form.value
    });
  }
  // 编辑地址
  else {
    addressStore.updateAddress(editingIndex.value, {
      ...addressStore.addressList[editingIndex.value],
      ...form.value
    });
  }

  // 关闭模态框
  showModal.value = false;
}
</script>

<style lang="css" scoped>
/* 引入字体图标 */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');

/* 基础样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f8f9fa;
}

.custom-navbar {
  --td-navbar-bg-color: #0052d9;
  --td-navbar-color: #fff;
  --td-navbar-height: 60px;
}

.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: -100px;
}

/* 地址卡片样式 */
.adresses {
  padding: 16px;
  margin: 0 auto;
  max-width: 768px;
}

.address {
  margin-bottom: 16px;
  animation: fadeIn 0.3s ease-out;
}

.address-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.address-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.card-content {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.consignee {
  font-weight: 500;
  font-size: 18px;
  color: #333;
}

.phone {
  margin-left: 12px;
  color: #666;
}

.default-tag {
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 100px;
}

.address-detailAddress {
  color: #666;
  margin-bottom: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  background-color: #f9f9f9;
}

.action-btn {
  cursor: pointer;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.action-btn:active {
  transform: translateY(0);
}

.edit-btn {
  border: #0052d9 solid 1px;
  color: #0052d9;
}

.delete-btn {
  border: #f44336 solid 1px;
  color: #f44336;
}

.default-btn {
  border: #2ba471 solid 1px;
  color: #2ba471;
}

.action-btn i {
  margin-right: 4px;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: 48px 0;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.empty-state i {
  font-size: 64px;
  color: #e0e0e0;
  margin-bottom: 16px;
}

.empty-state p {
  color: #999;
  margin-bottom: 24px;
}

.add-btn {
  background-color: #2ba471;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background-color: #248a5f;
  transform: translateY(-1px);
}

.add-btn:active {
  transform: translateY(0);
}

.add-btn i {
  margin-right: 8px;
}

/* 底部添加按钮 */
.fixed-bottom-btn {
  position: fixed;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.add-new-btn {
  background-color: #2ba471;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 12px 32px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(43, 164, 113, 0.3);
  display: flex;
  align-items: center;
}

.add-new-btn:hover {
  background-color: #248a5f;
  box-shadow: 0 6px 16px rgba(43, 164, 113, 0.4);
  transform: translateY(-1px);
}

.add-new-btn:active {
  transform: translateY(0);
}

.add-new-btn i {
  margin-right: 8px;
  font-size: 18px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background-color: #fff;
  border-radius: 16px;
  width: calc(100% - 32px);
  max-width: 480px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  font-weight: 500;
  font-size: 18px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #666;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 6px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2ba471;
  box-shadow: 0 0 0 2px rgba(43, 164, 113, 0.2);
}

.form-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.form-col {
  flex: 1;
}

.form-textarea {
  resize: none;
}

.form-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.custom-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.custom-checkbox:checked {
  background-color: #2ba471;
  border-color: #2ba471;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox:focus {
  box-shadow: 0 0 0 2px rgba(43, 164, 113, 0.2);
}

.form-checkbox label {
  margin-left: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background-color: #f9f9f9;
}

.cancel-btn,
.save-btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #666;
  margin-right: 8px;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
  transform: translateY(-1px);
}

.save-btn {
  background-color: #2ba471;
  border: none;
  color: #fff;
  margin-left: 8px;
}

.save-btn:hover {
  background-color: #248a5f;
  transform: translateY(-1px);
}

.cancel-btn:active,
.save-btn:active {
  transform: translateY(0);
}
</style>
