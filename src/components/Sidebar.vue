<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-placeholder">小红书</div>
    </div>
    <nav class="sidebar-nav">
      <div 
        class="nav-item" 
        :class="{ active: currentRoute === '/' }"
        @click="navigateTo('/')"
      >
        <el-icon><House /></el-icon>
        <span>发现</span>
      </div>
      <div class="nav-item">
        <el-icon><Plus /></el-icon>
        <span>发布</span>
      </div>
      <div class="nav-item">
        <el-icon><Bell /></el-icon>
        <span>通知</span>
      </div>
    </nav>
    <div class="sidebar-actions">
      <template v-if="isLoggedIn">
        <div class="user-avatar" @click="goToProfile">
          <el-avatar :size="40" :src="userAvatar" />
        </div>
      </template>
      <template v-else>
        <el-button type="danger" round @click="openLoginDialog">登录</el-button>
      </template>
    </div>
    <div class="sidebar-more">
      <div class="nav-item">
        <el-icon><More /></el-icon>
        <span>更多</span>
      </div>
    </div>
    <Login ref="loginRef" @login-success="handleLoginSuccess" />
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { House, Plus, Bell, More } from '@element-plus/icons-vue'
import Login from '../views/Login.vue'

const router = useRouter()
const route = useRoute()
const currentRoute = computed(() => route.path)
const loginRef = ref()
const isLoggedIn = ref(false)
const userAvatar = ref('')

const navigateTo = (path: string) => {
  router.push(path)
}

const openLoginDialog = () => {
  loginRef.value?.show()
  
}

const handleLoginSuccess = (userData: any) => {
  isLoggedIn.value = true
  userAvatar.value = userData.avatar || ''
  // 这里可以存储用户信息到本地存储或状态管理
}

const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid #f0f0f0;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sidebar-logo {
  padding: 8px 0;
}

.logo-placeholder {
  font-size: 24px;
  font-weight: bold;
  color: #ff2442;
  padding: 8px 16px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
  font-size: 16px;
}

.nav-item:hover {
  background-color: #f7f7f7;
  color: #ff2442;
}

.nav-item.active {
  color: #ff2442;
  background-color: #fff1f1;
}

.nav-item .el-icon {
  font-size: 20px;
}

.sidebar-actions {
  padding: 0 16px;
}

.sidebar-actions .el-button {
  width: 100%;
  background-color: #ff2442;
  border: none;
  height: 40px;
  font-size: 16px;
}

.sidebar-more {
  margin-top: auto;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
}

.user-avatar {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
}

.user-avatar:hover {
  background-color: #f7f7f7;
}
</style>