<template>
  <div class="app">
    <Sidebar />
    <div class="main">
      <Header />
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
</script>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
