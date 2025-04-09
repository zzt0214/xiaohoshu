<template>
  <div class="notification">
    <div class="notification-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab', { active: currentTab === tab.key }]"
        @click="currentTab = tab.key"
      >
        {{ tab.name }}
      </div>
    </div>

    <div class="notification-list" v-if="currentList.length > 0">
      <div v-for="item in currentList" :key="item.id" class="notification-item">
        <div class="user-avatar">
          <el-avatar :size="40" :src="item.userAvatar" />
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <span class="username">{{ item.username }}</span>
            <span class="time">{{ item.time }}</span>
          </div>
          <div class="notification-text">{{ item.text }}</div>
          <div class="notification-target" v-if="item.targetContent">
            <div class="target-content">
              <el-image 
                v-if="item.targetImage" 
                :src="item.targetImage" 
                class="target-image"
              />
              <span>{{ item.targetContent }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">暂无通知</div>
      <p class="empty-text">{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tabs = [
  { key: 'all', name: '全部' },
  { key: 'likes', name: '赞和收藏' },
  { key: 'comments', name: '评论' },
  { key: 'follows', name: '关注' },
  { key: 'system', name: '系统通知' }
]

const currentTab = ref('all')

// 模拟通知数据
const notifications = {
  likes: [
    {
      id: 1,
      type: 'like',
      username: '美食达人',
      userAvatar: '',
      time: '2小时前',
      text: '赞了你的笔记',
      targetContent: '超级好吃的美食分享',
      targetImage: ''
    }
  ],
  comments: [
    {
      id: 2,
      type: 'comment',
      username: '旅行爱好者',
      userAvatar: '',
      time: '3小时前',
      text: '评论了你的笔记：好漂亮的风景！',
      targetContent: '周末遇到的美好风景',
      targetImage: ''
    }
  ],
  follows: [
    {
      id: 3,
      type: 'follow',
      username: '时尚博主',
      userAvatar: '',
      time: '1天前',
      text: '关注了你'
    }
  ],
  system: [
    {
      id: 4,
      type: 'system',
      username: '小红书助手',
      userAvatar: '',
      time: '2天前',
      text: '欢迎来到小红书，这里有更多精彩内容等你发现～'
    }
  ]
}

// 根据当前标签页显示对应列表
const currentList: any = computed(() => {
  if (currentTab.value === 'all') {
    return Object.values(notifications).flat()
  }
  return notifications[currentTab.value as keyof typeof notifications] || []
})

// 空状态文本
const emptyText = computed(() => {
  switch (currentTab.value) {
    case 'likes':
      return '还没有收到任何赞和收藏'
    case 'comments':
      return '还没有收到任何评论'
    case 'follows':
      return '还没有新的关注'
    case 'system':
      return '暂无系统通知'
    default:
      return '暂无任何通知'
  }
})
</script>

<style scoped>
.notification {
  padding: 24px;
}

.notification-tabs {
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

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notification-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #fff;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-content {
  flex: 1;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
}

.notification-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.notification-target {
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 8px;
}

.target-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #666;
}

.target-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
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
</style>