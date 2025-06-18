import request from "../axios/request";
import { useAuthStore } from "../store/userStore";

const user = useAuthStore();

//进入购物车界面是获取购物车列表
export async function getCartList() {
  try {
    const response = await request({
      url: `/getCartList/${user.user._id}`,
      method: 'get', // 明确使用get方法
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart list:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}
//在购物车界面退出时更新数据库购物车信息
export async function saveCartList(cartList) {
  try {
    const response = await request({
      url: `/saveCartList/${user.user._id}`,
      method: 'post', // 明确使用post方法
      data: cartList
    });
    return response.data;
  } catch (error) {
    console.error('Error saving cart list:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}

//在图书详情页面点击加入购物车
export async function addToCart(bookId) {
  try {
    const response = await request({
      url: `/addToCart/${user.user._id}`,
      method: 'post', // 明确使用post方法
      data: {
        bookId: bookId,
      }
    });
    console.log(response.data.status)
    return response.data.status;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error; // 抛出错误以便上层调用者处理
  }
}

//检查购物车中是否存在该图书
export async function checkCartExist(bookId) {
  try {
    const response = await request({
      url: `/checkCartExist/${user.user._id}`,
      method: 'post', // 明确使用post方法
      data: {
        bookId: bookId,
      }
    });
    return response.data.result;
  } catch (error) {
    console.error('Error checking cart exist:', error);
    throw error;
  }
}
