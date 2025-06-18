// store/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCartList, saveCartList } from '../request/cartApi'

export const useCartStore = defineStore('cart', () => {
  //定义购物车数组
  const cartList = ref([])

  // 初始化购物车商品列表
  async function initCartList() {
    const response = await getCartList()
    // 为每条数据添加 count: 1 和 checked: false 属性
    cartList.value = response.map(item => ({
      ...item,
      count: 1,
      checked: false
    }))
  }

  // 计算总价，只计算选中的商品
  const totalPrice = computed(() => {
    return cartList.value.reduce((sum, item) => {
      return sum + (item.checked ? item.price * item.count : 0)
    }, 0)
  })

  // 计算是否全选 (可写计算属性)
  const allChecked = computed({
    get() {
      return cartList.value.every(item => item.checked)
    },
    set(newValue) {
      // 当 allChecked 的值被修改时，遍历所有商品并更新它们的 checked 状态
      cartList.value.forEach(item => {
        item.checked = newValue
      })
    }
  })

  // 更新单个商品的选中状态
  const updateItemChecked = (id, checked) => {
    const item = cartList.value.find(item => item.id === id)
    if (item) {
      item.checked = checked
    }
  }

  //删除单个购物车物品
  const delGood = (id) => {
    cartList.value = cartList.value.filter(item => item.bookId != id)

  }

  //删除选中的购物车物品
  const delCheckedGood = () => {
    cartList.value = cartList.value.filter(item => !item.checked)
  }

  //更新数据库中的购物车列表
  const saveNewCartList = async () => {
    try {
      const response = await saveCartList(cartList.value)
      console.log('更新后的购物车列表', response)
    } catch (error) {
      console.error('Error fetching cart list:', error);
      throw error; // 抛出错误以便上层调用者处理
    }
  }

  return {
    cartList,
    totalPrice,
    allChecked, // 现在 allChecked 是可写的了
    updateItemChecked,
    initCartList,
    delGood,
    delCheckedGood,
    saveNewCartList
  }
}, {
  persist: true
})