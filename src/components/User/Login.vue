<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <span>返回</span>
    </div>

    <!-- 页面背景 -->
    <div class="bg-image"></div>

    <!-- 半透明遮罩层 -->
    <div class="overlay"></div>

    <!-- 内容容器 -->
    <div class="content-container">
      <!-- 品牌Logo -->
      <div class="logo-container">
        <div class="logo">BookMeet</div>
        <div class="slogan">书遇，用书记录每一次遇见</div>
      </div>

      <!-- 登录/注册切换 -->
      <div class="tab-container">
        <div class="tab-item" :class="{ active: currentTab === 'login' }" @click="currentTab = 'login'">
          登录
        </div>
        <div class="tab-item" :class="{ active: currentTab === 'register' }" @click="currentTab = 'register'">
          注册
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="form-container">
        <!-- 登录表单 -->
        <form v-if="currentTab === 'login'" @submit.prevent="handleLogin">
          <div class="form-group">
            <input v-model="loginForm.username" placeholder="请输入用户名" class="form-input" type="text"
              @blur="validateLoginUsername" />
            <div v-if="loginErrors.username" class="error-message">
              {{ loginErrors.username }}
            </div>
          </div>

          <div class="form-group">
            <input v-model="loginForm.password" placeholder="请输入密码" class="form-input" type="password"
              @blur="validateLoginPassword" />
            <div v-if="loginErrors.password" class="error-message">
              {{ loginErrors.password }}
            </div>
          </div>

          <button type="submit" class="login-btn" :disabled="!isLoginFormValid">
            登录
          </button>
          <div class="forgot-password-container">
            <div class="forgot-password" @click="handleForgotPassword">
              忘记密码?
            </div>
          </div>
        </form>

        <!-- 注册表单 -->
        <form v-else @submit.prevent="handleRegister">
          <div class="form-group">
            <input v-model="registerForm.username" placeholder="请输入用户名" class="form-input" type="text"
              @blur="validateRegisterUsername" />
            <div v-if="registerErrors.username" class="error-message">
              {{ registerErrors.username }}
            </div>
          </div>

          <div class="form-group">
            <input v-model="registerForm.email" placeholder="请输入邮箱" class="form-input" type="email"
              @blur="validateRegisterEmail" />
            <div v-if="registerErrors.email" class="error-message">
              {{ registerErrors.email }}
            </div>
          </div>

          <div class="form-group">
            <input v-model="registerForm.password" placeholder="请输入密码" class="form-input" type="password"
              @blur="validateRegisterPassword" />
            <div v-if="registerErrors.password" class="error-message">
              {{ registerErrors.password }}
            </div>
          </div>

          <div class="form-group">
            <input v-model="registerForm.confirmPassword" placeholder="请再次输入密码" class="form-input" type="password"
              @blur="validateConfirmPassword" />
            <div v-if="registerErrors.confirmPassword" class="error-message">
              {{ registerErrors.confirmPassword }}
            </div>
          </div>

          <button type="submit" class="register-btn" :disabled="!isRegisterFormValid">
            注册
          </button>
        </form>
      </div>

      <!-- 其他登录方式 -->
      <div class="other-login">
        <div class="line-text">
          <span>其他登录方式</span>
        </div>
        <div class="social-buttons">
          <div class="social-icon" @click="handleSocialLogin('weixin')">
            <i class="fa fa-weixin"></i>
          </div>
          <div class="social-icon" @click="handleSocialLogin('qq')">
            <i class="fa fa-qq"></i>
          </div>
          <div class="social-icon" @click="handleSocialLogin('weibo')">
            <i class="fa fa-weibo"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/userStore';
import { login, register } from '../../request/loginApi';

// 路由实例
const router = useRouter();

// Pinia Store
const authStore = useAuthStore();

// 表单状态
const currentTab = ref('login');

// 登录表单数据
const loginForm = ref({
  username: '',
  password: ''
});

// 注册表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 登录表单验证错误
const loginErrors = ref({
  username: '',
  password: ''
});

// 注册表单验证错误
const registerErrors = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 验证登录用户名
const validateLoginUsername = () => {
  const { username } = loginForm.value;

  if (!username) {
    loginErrors.value.username = '用户名不能为空';
    return false;
  }

  loginErrors.value.username = '';
  return true;
};

// 验证登录密码
const validateLoginPassword = () => {
  const { password } = loginForm.value;

  if (!password) {
    loginErrors.value.password = '密码不能为空';
    return false;
  }

  if (password.length < 6) {
    loginErrors.value.password = '密码长度不能少于6位';
    return false;
  }

  loginErrors.value.password = '';
  return true;
};

// 验证注册用户名
const validateRegisterUsername = () => {
  const { username } = registerForm.value;

  if (!username) {
    registerErrors.value.username = '用户名不能为空';
    return false;
  }

  const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/;
  if (!usernameRegex.test(username)) {
    registerErrors.value.username = '用户名由3-20位字母、数字、汉字或下划线组成';
    return false;
  }

  registerErrors.value.username = '';
  return true;
};

// 验证注册邮箱
const validateRegisterEmail = () => {
  const { email } = registerForm.value;

  if (!email) {
    registerErrors.value.email = '邮箱不能为空';
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    registerErrors.value.email = '请输入有效的邮箱地址';
    return false;
  }

  registerErrors.value.email = '';
  return true;
};

// 验证注册密码
const validateRegisterPassword = () => {
  const { password } = registerForm.value;

  if (!password) {
    registerErrors.value.password = '密码不能为空';
    return false;
  }

  const passwordRegex = /^[A-Za-z0-9]{6,20}$/;
  if (!passwordRegex.test(password)) {
    registerErrors.value.password = '密码由6-20位字母、数字或数字字母组合组成';
    return false;
  }

  registerErrors.value.password = '';
  return true;
};

// 验证确认密码
const validateConfirmPassword = () => {
  const { password, confirmPassword } = registerForm.value;

  if (!confirmPassword) {
    registerErrors.value.confirmPassword = '请再次输入密码';
    return false;
  }

  if (password !== confirmPassword) {
    registerErrors.value.confirmPassword = '两次输入的密码不一致';
    return false;
  }

  registerErrors.value.confirmPassword = '';
  return true;
};

// 计算属性：登录表单是否有效
const isLoginFormValid = computed(() => {
  return !loginErrors.value.username && !loginErrors.value.password;
});

// 计算属性：注册表单是否有效
const isRegisterFormValid = computed(() => {
  return !registerErrors.value.username &&
    !registerErrors.value.email &&
    !registerErrors.value.password &&
    !registerErrors.value.confirmPassword;
});

// 监听表单变化，实时验证
watch(() => loginForm.value.username, validateLoginUsername);
watch(() => loginForm.value.password, validateLoginPassword);
watch(() => registerForm.value.username, validateRegisterUsername);
watch(() => registerForm.value.email, validateRegisterEmail);
watch(() => registerForm.value.password, () => {
  validateRegisterPassword();
  // 如果密码改变，重新验证确认密码
  if (registerForm.value.confirmPassword) {
    validateConfirmPassword();
  }
});
watch(() => registerForm.value.confirmPassword, validateConfirmPassword);

// 登录处理函数
const handleLogin = async () => {
  if (isLoginFormValid.value) {
    try {
      const response = await login(loginForm.value.username, loginForm.value.password);
      if (response.status === 'success') {
        authStore.login({ _id: response.user._id, username: loginForm.value.username, token: response.token }); // 假设后端返回token
        alert('登录成功');
        router.back();
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert('登录失败，请稍后再试');
      console.error('登录请求失败:', error);
    }
  } else {
    validateLoginUsername();
    validateLoginPassword();
  }
};

// 注册处理函数
const handleRegister = async () => {
  if (isRegisterFormValid.value) {
    try {
      const response = await register(registerForm.value.username, registerForm.value.password, registerForm.value.email);
      if (response.status === 'success') {
        alert('注册成功，请登录');
        currentTab.value = 'login'; // 注册成功后切换到登录表单
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert('注册失败，请稍后再试');
      console.error('注册请求失败:', error);
    }
  } else {
    validateRegisterUsername();
    validateRegisterEmail();
    validateRegisterPassword();
    validateConfirmPassword();
  }
};

// 忘记密码处理函数
const handleForgotPassword = () => {
  console.log('用户点击忘记密码');
  // 这里可以添加忘记密码逻辑
};

// 社交登录处理函数
const handleSocialLogin = (type) => {
  console.log(`用户点击${type}登录`);
  // 这里可以添加社交登录逻辑
};

// 返回上一页
const goBack = () => {
  router.back();
};

// 页面加载时检查是否可以返回
let canGoBack = false;

onMounted(() => {
  canGoBack = window.history.length > 1;
});
</script>

<style lang="less" scoped>
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');

.page-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/loginBCK.png');
  background-size: cover;
  background-position: center;
  filter: blur(3px);
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.content-container {
  position: relative;
  z-index: 1;
  padding: 0 24px;
  margin-top: 10vh;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  display: inline-block;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, #2ba471, #0052d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.slogan {
  font-size: 14px;
  color: white;
  margin-top: 8px;
  letter-spacing: 1px;
  opacity: 0.8;
}

.tab-container {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  position: relative;

  &.active {
    color: #fff;
    font-weight: 500;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #2ba471, #0052d9);
    }
  }
}

.form-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-height: 70vh;
  overflow-y: auto;

  /* 自定义滚动条样式 */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
}

.form-group {
  position: relative;
  margin-bottom: 16px;

  /* 验证成功状态 */
  &.success .form-input {
    border: 1px solid #2ba471;
    background: rgba(43, 164, 113, 0.1);
  }

  /* 验证失败状态 */
  &.error .form-input {
    border: 1px solid #ff4d4f;
    background: rgba(255, 77, 79, 0.1);
  }

  /* 验证图标 */
  .validation-icon {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 16px;
  }

  .success-icon {
    color: #2ba471;
  }

  .error-icon {
    color: #ff4d4f;
  }
}

.form-input {
  width: 100%;
  margin-bottom: 4px;
  /* 减少底部间距，为错误信息留出空间 */
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  transition: all 0.3s;

  &::placeholder {
    color: white;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(43, 164, 113, 0.5);
  }
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  padding-left: 4px;
}

.login-btn,
.register-btn {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(90deg, #2ba471, #0052d9);
  border: none;
  color: #fff;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    opacity: 0.8;
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.forgot-password-container {
  text-align: center;
  margin-top: 10px;
}

.forgot-password {
  display: inline-block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
}

.other-login {
  margin-top: 25px;
  text-align: center;
}

.line-text {
  position: relative;
  margin-bottom: 15px;

  span {
    display: inline-block;
    padding: 0 10px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
}

.social-buttons {
  display: flex;
  justify-content: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 22px;
  margin: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  i {
    pointer-events: none;
  }
}
</style>