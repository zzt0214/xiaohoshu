<template>
  <header class="header">
    <div class="logo">
      <div class="logo-placeholder">小红书</div>
    </div>
    <div class="search-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索探索更多内容"
        :prefix-icon="Search"
        clearable
      />
    </div>
    <nav class="nav">
      <div class="nav-item">
        <el-icon><Compass /></el-icon>
        <span>发现</span>
      </div>
      <div class="nav-item">
        <el-icon><Edit /></el-icon>
        <span>发布</span>
      </div>
      <div class="nav-item">
        <el-icon><Bell /></el-icon>
        <span>通知</span>
      </div>
    </nav>
    <div class="user-actions">
    <el-button type="danger" round @click="$emit('login')">登录</el-button>
  </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Compass, Edit, Bell } from '@element-plus/icons-vue'

const searchText = ref('')
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.logo-placeholder {
  font-size: 24px;
  font-weight: bold;
  color: #ff2442;
}

.search-bar {
  flex: 0 1 400px;
  margin: 0 40px;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: #f6f6f6;
  box-shadow: none !important;
}

:deep(.el-input__inner) {
  height: 40px;
}

.nav {
  display: flex;
  gap: 32px;
  margin-right: 32px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #ff2442;
}

.nav-item .el-icon {
  font-size: 20px;
}

.nav-item span {
  font-size: 16px;
}

.user-actions .el-button {
  background-color: #ff2442;
  border: none;
  height: 36px;
  padding: 0 24px;
  font-size: 14px;
}

.user-actions .el-button:hover {
  background-color: #ff3956;
}
</style>