import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAddressList, saveAddress } from '../request/addressApi'

export const useAddressStore = defineStore('address', () => {
  const addressList = ref([])//地址列表

  // 初始化地址列表，调用getAddressList从接口获取地址列表
  async function initAddressList() {
    const response = await getAddressList();
    addressList.value = response;

  }

  //修改地址
  function updateAddress(index, address) {
    addressList.value[index] = address;
    console.log(addressList.value[index]);
  }

  //删除地址
  function deleteAddress(index) {
    addressList.value.splice(index, 1);
  }

  //添加地址
  function addAddress(address) {
    addressList.value.push(address);
  }

  //保存地址
  async function saveNewAddress() {
    try {
      console.log('退出');
      const response = await saveAddress(addressList.value);
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error; // 抛出错误以便上层调用者处理
    }
  }

  return {
    addressList,
    initAddressList,
    updateAddress,
    deleteAddress,
    addAddress,
    saveNewAddress
  }
})
