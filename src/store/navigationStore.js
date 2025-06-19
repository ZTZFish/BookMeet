// store/navigationStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  // 导航状态
  const isFromAddress = ref(false)
  const currentBookId = ref(null)
  const shouldShowLoading = ref(true)
  // 弹出层状态管理
  const popupStates = ref({})

  // 函数
  //是否来自地址页面
  const setFromAddress = (value) => {
    isFromAddress.value = value
  }
  //设置当前书籍ID
  const setCurrentBookId = (bookId) => {
    currentBookId.value = bookId
  }
  //设置是否需要显示加载动画
  const setShouldShowLoading = (value) => {
    shouldShowLoading.value = value
  }

  // 标记即将前往地址页面
  const markGoingToAddress = () => {
    console.log('标记即将前往地址页面')
    isFromAddress.value = true
  }

  // 重置导航状态
  const resetNavigationState = () => {
    console.log('重置导航状态')
    isFromAddress.value = false
  }

  // 检查是否需要显示加载动画
  const needsLoading = (newBookId) => {
    // 如果是从地址页面返回，不需要加载动画
    if (isFromAddress.value) {
      console.log('从地址页面返回，不需要加载动画')
      return false
    }
    // 如果是切换到不同的书籍，需要加载动画
    const needsLoad = newBookId !== currentBookId.value
    console.log('是否需要加载动画:', needsLoad, '新书籍ID:', newBookId, '当前书籍ID:', currentBookId.value)
    return needsLoad
  }

  //保存弹出层状态
  const savePopupStates = (bookId, states) => {
    console.log('保存弹出层状态:', bookId, states)
    popupStates.value[bookId] = { ...states }
  }

  // 获取弹出层状态
  const getPopupStates = (bookId) => {
    const states = popupStates.value[bookId] || {
      visible: false,
      cartExistVisible: false,
      addCartVisible: false,
      addCartSuccessVisible: false,
      buyVisible: false
    }
    console.log('获取弹出层状态:', bookId, states)
    return states
  }

  // 清除特定书籍的弹出层状态
  const clearPopupStates = (bookId) => {
    if (popupStates.value[bookId]) {
      console.log('清除弹出层状态:', bookId)
      delete popupStates.value[bookId]
    }
  }

  // 清除所有弹出层状态
  const clearAllPopupStates = () => {
    console.log('清除所有弹出层状态')
    popupStates.value = {}
  }

  return {
    isFromAddress,
    currentBookId,
    shouldShowLoading,
    popupStates,
    setFromAddress,
    setCurrentBookId,
    setShouldShowLoading,
    markGoingToAddress,
    resetNavigationState,
    needsLoading,
    savePopupStates,
    getPopupStates,
    clearPopupStates,
    clearAllPopupStates
  }
})