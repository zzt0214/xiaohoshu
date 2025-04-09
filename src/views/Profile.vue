<template>
  <div class="profile">
    <div class="profile-header">
      <div class="user-info">
        <el-avatar :size="64" src="" />
        <div class="info">
          <h2 class="nickname">萝卜呀</h2>
          <div class="user-id">小红书号：red2014</div>
          <div class="stats">
            <div class="stat-item">
              <div class="number">10</div>
              <div class="label">关注</div>
            </div>
            <div class="stat-item">
              <div class="number">7</div>
              <div class="label">粉丝</div>
            </div>
            <div class="stat-item">
              <div class="number">0</div>
              <div class="label">获赞与收藏</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab', { active: currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        {{ tab.name }}
      </div>
    </div>

    <!-- 笔记/收藏/点赞列表 -->
    <div v-if="currentList.length > 0" class="notes-grid">
      <div v-for="item in currentList" :key="item.id" class="note-card" @click="showNoteDetail(item)">
        <div class="note-image">
          <div class="image-placeholder">
            <el-icon><Picture /></el-icon>
          </div>
        </div>
        <div class="note-content">
          <p class="note-title">{{ item.title }}</p>
          <div class="note-stats">
            <span class="stat">
              <el-icon><Star /></el-icon>
              {{ item.likes }}
            </span>
            <span class="stat">
              <el-icon><ChatDotRound /></el-icon>
              {{ item.comments }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">暂无内容</div>
      <p class="empty-text">{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Picture, Star, ChatDotRound } from '@element-plus/icons-vue'

const tabs = [
  { key: 'notes', name: '笔记' },
  { key: 'collections', name: '收藏' },
  { key: 'likes', name: '点赞' }
]

const currentTab = ref('notes')

// 模拟数据
const notes = ref([
  {
    id: 1,
    title: '超级好吃的美食分享',
    image: 'https://example.com/image1.jpg',
    likes: '1.2w',
    comments: '399'
  },
  {
    id: 2,
    title: '周末遇到的美好风景',
    image: 'https://example.com/image2.jpg',
    likes: '2.3k',
    comments: '125'
  }
])

const collections = ref([
  {
    id: 3,
    title: '超实用的穿搭技巧',
    image: 'https://example.com/image3.jpg',
    likes: '3.4k',
    comments: '234'
  }
])

const likes = ref([
  {
    id: 4,
    title: '年度必看电影推荐',
    image: 'https://example.com/image4.jpg',
    likes: '5.6k',
    comments: '567'
  }
])

// 根据当前标签页显示对应列表
const currentList = computed(() => {
  switch (currentTab.value) {
    case 'collections':
      return collections.value
    case 'likes':
      return likes.value
    default:
      return notes.value
  }
})

// 根据当前标签页显示对应空状态文本
const emptyText = computed(() => {
  switch (currentTab.value) {
    case 'collections':
      return '还没有收藏任何笔记哦'
    case 'likes':
      return '还没有点赞任何笔记哦'
    default:
      return '还没有发布任何笔记哦'
  }
})

const showNoteDetail = (note: any) => {
  console.log('查看笔记详情:', note)
}
</script>

<style scoped>
.profile {
  padding: 24px;
}

.profile-header {
  margin-bottom: 32px;
}

.user-info {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.info {
  flex: 1;
}

.nickname {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px;
}

.user-id {
  color: #999;
  font-size: 14px;
  margin-bottom: 16px;
}

.stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  text-align: center;
}

.number {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.label {
  font-size: 14px;
  color: #666;
}

.profile-tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.tab {
  padding: 12px 0;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #333;
  font-weight: 500;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ff2442;
}

.empty-state {
  text-align: center;
  padding: 64px 0;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.note-card {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.note-card:hover {
  transform: translateY(-4px);
}

.note-image {
  aspect-ratio: 1;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder .el-icon {
  font-size: 32px;
  color: #ddd;
}

.note-content {
  padding: 12px;
}

.note-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-stats {
  display: flex;
  gap: 16px;
  color: #999;
  font-size: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat .el-icon {
  font-size: 14px;
}
</style>