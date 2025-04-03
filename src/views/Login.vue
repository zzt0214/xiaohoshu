<template>
  <el-dialog
    v-model="visible"
    :show-close="true"
    :close-on-click-modal="false"
    class="login-dialog"
    width="800px"
  >
    <div class="login-container">
      <div class="qr-section">
        <div class="qr-code">
          <div class="qr-placeholder">
            <QRCodeVue
              value="https://www.xiaohongshu.com"
              :size="200"
              level="H"
              render-as="svg"
            />
          </div>
          <p class="qr-text">登录后可以获得更多乐趣</p>
          <p class="scan-text">请使用小红书App扫码登录</p>
        </div>
      </div>

      <div class="divider">
        <span class="divider-text">或</span>
      </div>

      <div class="phone-section">
        <h2 class="login-title">手机号登录</h2>
        <div class="login-form">
          <el-input
            v-model="phone"
            placeholder="输入手机号码"
            maxlength="11"
            class="phone-input"
          >
            <template #prepend>
              <el-select v-model="countryCode" placeholder="+86" style="width: 80px">
                <el-option label="+86" value="+86" />
              </el-select>
            </template>
          </el-input>

          <el-input
            v-model="verifyCode"
            placeholder="输入验证码"
            maxlength="6"
            class="verify-input"
          >
            <template #append>
              <div class="verify-btn-wrapper">
                <el-button 
                  text
                  :disabled="cooldown > 0" 
                  @click="sendCode"
                  class="verify-code-btn"
                >
                  {{ cooldown > 0 ? `${cooldown}s` : '获取验证码' }}
                </el-button>
              </div>
            </template>
          </el-input>

          <el-button type="danger" class="login-button" round @click="handleLogin">
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
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QRCodeVue from 'qrcode.vue'
// Login.vue 中的代码
defineExpose({
  show: () => visible.value = true
})
const visible = ref(false)
const phone = ref('')
const verifyCode = ref('')
const countryCode = ref('+86')
const cooldown = ref(0)

const sendCode = () => {
  if (cooldown.value > 0) return
  cooldown.value = 60
  const timer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const emit = defineEmits(['login-success'])

const handleLogin = () => {
  // 这里添加实际的登录逻辑
  if (phone.value && verifyCode.value) {
    // 模拟登录成功
    const userData = {
      avatar: 'https://example.com/avatar.jpg',
      username: '用户名',
      // 其他用户信息
    }
    emit('login-success', userData)
    visible.value = false
  }
}
</script>

<style scoped>
.login-dialog :deep(.el-dialog) {
  border-radius: 12px;
}

.login-container {
  display: flex;
  align-items: stretch;
  min-height: 400px;
}

.qr-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #fafafa;
  border-radius: 12px 0 0 12px;
}

.qr-code {
  text-align: center;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
}

.qr-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.scan-text {
  font-size: 14px;
  color: #999;
}

.divider {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.divider-text {
  position: relative;
  padding: 0 20px;
  color: #999;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 1px;
    height: 100px;
    background-color: #eee;
  }
  &::before {
    left: 50%;
    transform: translateX(-50%);
    margin-top: -120px;
  }
  &::after {
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
  }
}

.phone-section {
  flex: 1;
  padding: 40px;
}

.login-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.logo {
  width: 120px;
  height: 40px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.phone-input :deep(.el-input__wrapper),
.verify-input :deep(.el-input__wrapper) {
  border-radius: 8px;
}

.login-button {
  height: 44px;
  font-size: 16px;
  background-color: #ff2442;
  border: none;
}

.login-button:hover {
  background-color: #ff3956;
}

.agreement {
  font-size: 12px;
  color: #999;
  text-align: center;
}

.agreement .el-link {
  font-size: 12px;
}

.verify-input :deep(.el-input-group__append) {
  padding: 0;
  background-color: transparent;
  border: none;
}

.verify-btn-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-left: 1px solid #dcdfe6;
}

.verify-code-btn {
  font-size: 13px;
  color: #ff2442;
  padding: 0 4px;
}

.verify-code-btn:not(:disabled):hover {
  color: #ff3956;
}

.verify-code-btn:disabled {
  color: #999;
}

.verify-input :deep(.verify-code-btn) {
  height: 32px !important;
  border: none !important;
  padding: 0 15px !important;
  font-size: 14px !important;
  color: #ff2442 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.verify-input :deep(.verify-code-btn.is-disabled) {
  background: transparent !important;
  color: #999 !important;
  cursor: not-allowed !important;
}

.verify-input :deep(.verify-code-btn:not(.is-disabled):hover) {
  color: #ff3956 !important;
  background: transparent !important;
}

.verify-input :deep(.el-input__wrapper) {
  padding-right: 0 !important;
}
</style>