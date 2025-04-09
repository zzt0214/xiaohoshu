<template>
  <div class="home">
    <div class="category-nav">
      <div 
        v-for="category in categories" 
        :key="category.id"
        :class="['nav-item', { active: currentCategory === category.id }]"
        @click="changeCategory(category.id)"
      >
        {{ category.name }}
      </div>
    </div>
    
    <div class="waterfall">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="card"
        @click="showPostDetail(item)"
      >
        <div class="card-image">
          <div class="image-placeholder">
            <!-- 图片占位符 -->
            <el-icon><Picture /></el-icon>
          </div>
        </div>
        <div class="card-content">
          <p class="title">{{ item.title }}</p>
          <div class="user-info">
            <div class="avatar">
              <el-avatar :size="24" src=""/>
            </div>
            <span class="username">{{ item.username }}</span>
          </div>
          <div class="interaction">
            <div class="like">
              <el-icon><Star /></el-icon>
              <span>{{ item.likes }}</span>
            </div>
            <div class="favorite">
              <el-icon><ChatDotRound /></el-icon>
              <span>{{ item.comments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PostDetail ref="postDetailRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PostDetail from '@/views/PostDetail.vue'
import { Picture, Star, ChatDotRound } from '@element-plus/icons-vue'

// 分类数据
const categories = [
  { id: 'recommend', name: '推荐' },
  { id: 'food', name: '美食' },
  { id: 'fashion', name: '时尚' },
  { id: 'beauty', name: '美妆' },
  { id: 'movie', name: '影视' },
  { id: 'travel', name: '旅行' }
]

// 当前选中的分类
const currentCategory = ref('recommend')

// 模拟不同分类的数据
const allItems = {
  recommend: [
    {
      title: '超级好吃的美食分享',
      username: '美食达人',
      likes: '1.2w',
      comments: '399',
      image: 'https://placeholder.com/300x400'
    },
    // ... 其他推荐数据
  ],
  food: [
    {
      title: '这家火锅太好吃了！',
      username: '吃货小王',
      likes: '2.1w',
      comments: '567',
      image: 'https://placeholder.com/300x400'
    },
    {
      title: '米其林三星餐厅体验',
      username: '美食评论家',
      likes: '3.4w',
      comments: '789',
      image: 'https://placeholder.com/300x400'
    }
  ],
  fashion: [
    {
      title: '春季穿搭指南',
      username: '时尚博主',
      likes: '4.2w',
      comments: '678',
      image: 'https://placeholder.com/300x400'
    },
    {
      title: '平价好物分享',
      username: '穿搭达人',
      likes: '2.8w',
      comments: '456',
      image: 'https://placeholder.com/300x400'
    }
  ],
  beauty: [
    {
      title: '日常护肤分享',
      username: '护肤达人',
      likes: '3.6w',
      comments: '892',
      image: 'https://placeholder.com/300x400'
    }
  ],
  movie: [
    {
      title: '年度必看电影推荐',
      username: '影视评论',
      likes: '5.1w',
      comments: '1.2k',
      image: 'https://placeholder.com/300x400'
    }
  ],
  travel: [
    {
      title: '周末小众景点推荐',
      username: '旅行达人',
      likes: '2.3w',
      comments: '445',
      image: 'https://placeholder.com/300x400'
    }
  ]
}

// 展示的数据列表
const items = ref(allItems.recommend)

// 切换分类
const changeCategory = (categoryId: string) => {
  currentCategory.value = categoryId
  items.value = allItems[categoryId as keyof typeof allItems]
}

const postDetailRef = ref()

const showPostDetail = (post: any) => {
  postDetailRef.value?.show(post)
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.category-nav {
  display: flex;
  gap: 32px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

/* 添加新的动画样式 */
.card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.like, .favorite {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #999;
  font-size: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.like:hover, .favorite:hover {
  color: #ff2442;
  transform: scale(1.1);
}

.nav-item {
  position: relative;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #ff2442;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 100%;
}

.image-placeholder {
  background: #f6f6f6;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-placeholder:hover {
  transform: scale(1.02);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.waterfall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.card {
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.card:nth-child(2n) {
  animation-delay: 0.2s;
}

.card:nth-child(3n) {
  animation-delay: 0.4s;
}

.image-placeholder .el-icon {
  font-size: 48px;
  color: #ddd;
}

.card-content {
  padding: 12px;
}

.title {
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.username {
  font-size: 12px;
  color: #666;
}

.interaction {
  display: flex;
  gap: 16px;
}

.like, .favorite {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #999;
  font-size: 12px;
}

.like .el-icon, .favorite .el-icon {
  font-size: 16px;
}
</style>