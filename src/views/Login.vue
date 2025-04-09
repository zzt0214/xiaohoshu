<template>
  <el-dialog
    v-model="visible"
    :show-close="true"
    :close-on-click-modal="false"
    class="login-dialog"
    width="900px"
  >
    <div class="login-container">
      <div class="login-left">
        <div class="login-header">
          <img src="../assets/logo.png" alt="Logo" class="logo" />
          <h1 class="welcome-text">欢迎来到小红书</h1>
          <p class="slogan">发现生活，发现美</p>
        </div>
        <div class="login-form">
          <div class="login-type-switch">
            <span 
              :class="['switch-item', { active: loginType === 'phone' }]"
              @click="loginType = 'phone'"
            >
              手机号登录
            </span>
            <span 
              :class="['switch-item', { active: loginType === 'account' }]"
              @click="loginType = 'account'"
            >
              账号密码登录
            </span>
          </div>

          <!-- 手机号登录 -->
          <template v-if="loginType === 'phone'">
            <el-input
              v-model="phone"
              placeholder="请输入手机号"
              maxlength="11"
              class="login-input"
            >
              <template #prepend>
                <el-select v-model="countryCode" class="country-select">
                  <el-option label="+86" value="+86" />
                </el-select>
              </template>
            </el-input>

            <el-input
              v-model="verifyCode"
              placeholder="请输入验证码"
              maxlength="6"
              class="login-input"
            >
              <template #append>
                <el-button 
                  :disabled="cooldown > 0"
                  @click="sendCode"
                  class="verify-btn"
                >
                  {{ cooldown > 0 ? `${cooldown}s` : '获取验证码' }}
                </el-button>
              </template>
            </el-input>
          </template>

          <!-- 账号密码登录 -->
          <template v-else>
            <el-input
              v-model="username"
              placeholder="请输入账号"
              class="login-input"
            />
            <el-input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              show-password
              class="login-input"
            />
            <el-input
              v-model="verifyCode"
              placeholder="请输入验证码"
              maxlength="6"
              class="login-input"
            >
              <!-- 手机号登录部分的验证码按钮 -->
              <template #append>
                <div class="verify-btn-wrapper">
                  <img 
                    :src="captchaImage" 
                    class="captcha-img"
                    @click="refreshCaptcha"
                    alt="验证码"
                  />
                </div>
              </template>
              
              <!-- 账号密码登录部分的验证码按钮也需要同样修改 -->
            </el-input>
          </template>

          <el-button type="danger" class="submit-btn" @click="handleLogin">
            登录
          </el-button>

          <div class="agreement">
            登录即代表你同意
            <el-link type="primary" :underline="false">《用户协议》</el-link>
            和
            <el-link type="primary" :underline="false">《隐私政策》</el-link>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="qr-code-container">
          <QRCodeVue
            value="https://www.xiaohongshu.com"
            :size="160"
            level="H"
            render-as="svg"
          />
          <p class="qr-title">扫码下载 App</p>
          <p class="qr-desc">发现更多精彩内容</p>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
/* style 部分添加 */
.captcha-img {
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
}

.verify-btn-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
}
.login-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.login-container {
  display: flex;
  min-height: 500px;
}

.login-left {
  flex: 1;
  padding: 40px 60px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 64px;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.slogan {
  font-size: 16px;
  color: #999;
}

.login-type-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 40px;
}

.switch-item {
  font-size: 16px;
  color: #999;
  cursor: pointer;
  padding-bottom: 8px;
  position: relative;
}

.switch-item.active {
  color: #333;
  font-weight: 500;
}

.switch-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff2442;
}

.login-input {
  margin-bottom: 20px;
}

.login-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  height: 44px;
}

.country-select {
  width: 80px;
}

.verify-btn {
  background: none;
  border: none;
  color: #ff2442;
  font-size: 14px;
  padding: 0 12px;
  height: 100%;
}

.verify-btn:disabled {
  color: #999;
}

.submit-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 20px;
  background-color: #ff2442;
  border: none;
}

.agreement {
  margin-top: 16px;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.login-right {
  width: 300px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-code-container {
  text-align: center;
}

.qr-title {
  font-size: 16px;
  color: #333;
  margin: 16px 0 8px;
}

.qr-desc {
  font-size: 14px;
  color: #999;
}
</style>


<script setup lang="ts">
import { ref, onMounted, nextTick} from 'vue'
import { ElMessage } from 'element-plus'
import QRCodeVue from 'qrcode.vue'
import type { LoginParams } from '../types/user'
defineExpose({
  show: () => visible.value = true
})

const visible = ref(false)
const loginType = ref('phone')
const phone = ref('')
const verifyCode = ref('')
const countryCode = ref('+86')
const username = ref('')
const password = ref('')
const cooldown = ref(0)

// script 部分添加
import { userApi } from '../api/user'

// 修改发送验证码方法
const sendCode = async () => {
  if (cooldown.value > 0) return
  
  try {
    if (loginType.value === 'phone') {
      if (!phone.value || phone.value.length !== 11) {
        ElMessage.warning('请输入正确的手机号')
        return
      }
      await userApi.sendVerifyCode(phone.value)
    } else {
      if (!username.value) {
        ElMessage.warning('请先输入账号')
        return
      }
      await userApi.sendVerifyCode(username.value)
    }
    
    cooldown.value = 60
    const timer = setInterval(() => {
      cooldown.value--
      if (cooldown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    
    ElMessage.success('验证码已发送')
  } catch (error) {
    console.error('发送验证码失败:', error)
  }
}

// 修改登录方法
const handleLogin = async () => {
  try {
    const params: LoginParams = {
      verifyCode: verifyCode.value
    }
    
    if (loginType.value === 'phone') {
      if (!phone.value || phone.value.length !== 11) {
        ElMessage.warning('请输入正确的手机号')
        return
      }
      params.phone = phone.value
    } else {
      if (!username.value || !password.value) {
        ElMessage.warning('请填写完整信息')
        return
      }
      params.username = username.value
      params.password = password.value
    }

    const { token, userInfo } = await userApi.login(params)
    localStorage.setItem('token', token)
    emit('login-success', userInfo)
    visible.value = false
    ElMessage.success('登录成功')
    
    // 重置表单
    phone.value = ''
    username.value = ''
    password.value = ''
    verifyCode.value = ''
  } catch (error) {
    console.error('登录失败:', error)
  }
}
const emit = defineEmits(['login-success'])

// script 部分添加
const captchaImage = ref('')

// 获取验证码图片
const refreshCaptcha = async () => {
  try {
    const result = await userApi.getCaptcha()
    console.log(result);
    
    // captchaImage.value = `data:image/png;base64,${result.image}`
    nextTick(() => {
      captchaImage.value = result.captchaBase64
    })
  } catch (error) {
    console.error('获取验证码失败:', error)
  }
}

// 在组件挂载时获取验证码
onMounted(() => {
  refreshCaptcha()
})

// 切换登录方式时刷新验证码
const toggleLoginType = () => {
  loginType.value = loginType.value === 'phone' ? 'account' : 'phone'
  // 重置表单
  phone.value = ''
  username.value = ''
  password.value = ''
  verifyCode.value = ''
  // 刷新验证码
  refreshCaptcha()
}
</script>