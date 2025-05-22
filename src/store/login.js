import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // 确保导入 ref 和 computed

// 定义一个新的 Store 来管理认证状态
export const useAuthStore = defineStore('auth', () => {
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
      // 这里是模拟的登录逻辑，实际中会调用后端 API
      console.log('Attempting to log in with:', credentials);
      // 假设登录成功后返回用户数据和 token
      // const response = await api.post('/login', credentials);
      // user.value = response.data.user;
      // token.value = response.data.token;
      // isLoggedIn.value = true;

      // 模拟成功
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
      user.value = { id: 1, username: credentials.username };
      token.value = 'fake-auth-token';
      isLoggedIn.value = true;

      console.log('Login successful');

    } catch (err) {
      // 模拟失败
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟
      error.value = '登录失败：用户名或密码错误'; // 存储错误信息
      console.error('Login failed:', err);

      // 清除可能残留的状态
      isLoggedIn.value = false;
      user.value = null;
      token.value = null;

    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    // 这里是模拟的登出逻辑，实际中可能需要调用后端 API 或清除本地存储
    console.log('Logging out');
    isLoggedIn.value = false;
    user.value = null;
    token.value = null;
    error.value = null; // 清除错误信息
    // 实际中可能需要清除 localStorage 或 sessionStorage 中的 token
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
})