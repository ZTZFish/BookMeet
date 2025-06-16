import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // 确保导入 ref 和 computed

// 定义一个新的 Store 来管理认证状态
export const useAuthStore = defineStore('user', () => {
  // 状态
  const isLoggedIn = ref(false)
  const user = ref(null) // 可以是用户对象或 null
  const token = ref(null) // 可以是 token 字符串或 null
  const isLoading = ref(false)
  const error = ref(null)

  // 计算属性 (如果需要，例如检查用户是否有特定角色)
  // const isAdmin = computed(() => user.value?.role === 'admin')

  // 方法 (Actions)
  async function login(credentials) {
    isLoading.value = true;
    error.value = null;
    try {
      user.value = { _id: credentials._id, username: credentials.username };
      token.value = credentials.token;
      isLoggedIn.value = true;

      console.log('Login successful');

    } catch (err) {
      error.value = '登录失败：用户名或密码错误'; // 存储错误信息
      console.error('Login failed:', err);

      // 清除可能残留的状态
      isLoggedIn.value = false;
      user.value = null;
      token.value = null;

      throw err; // 重新抛出错误，以便在组件中捕获
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    console.log('Logging out');
    isLoggedIn.value = false;
    user.value = null;
    token.value = null;
    error.value = null; // 清除错误信息
    // localStorage.removeItem('auth_token');
  }

  // 返回状态、计算属性和方法
  return {
    isLoggedIn,
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    // isAdmin, // 如果定义了计算属性，也需要返回
  }
}, {
  persist: true, // 启用状态持久化
});