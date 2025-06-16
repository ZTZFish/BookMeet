import request from "../axios/request";
import { useAuthStore } from '../store/userStore';
const user = useAuthStore();
console.log(user.user._id);
export async function getAddressList() {
  try {
    const response = await request({
      url: `/getAddressList/${user.user._id}`,
      method: 'post',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}

//保存地址
export async function saveAddress(address) {
  console.log(address);
  try {
    const response = await request({
      url: `/saveAddressList/${user.user._id}`,
      method: 'post',
      data: address
    });
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}
