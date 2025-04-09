<template>
  <el-dialog
    v-model="visible"
    :show-close="true"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    width="960px"
    top="5vh"
    class="post-detail-dialog"
  >
    <div class="post-detail" style="height: 80vh;">
      <div class="post-content">
        <!-- 左侧图片展示区 -->
        <div class="image-section">
          <!-- 640px -->
          <el-carousel height="80vh" arrow="always" indicator-position="none">
            <el-carousel-item v-for="i in 3" :key="i">
              <!-- <div class="image-placeholder">
                <el-icon><Picture /></el-icon>
              </div> -->
              <el-image style="width: 100%; height: 100%" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 右侧内容区 -->
        <div class="info-section">
          <!-- 用户信息固定区 -->
          <div class="fixed-header">
            <div class="user-info">
              <el-avatar :size="40" src="" />
              <div class="user-meta">
                <div class="username">{{ post.username }}</div>
                <div class="post-time">2小时前</div>
              </div>
              <el-button type="danger" plain round size="small" class="follow-btn">关注</el-button>
            </div>
          </div>

          <!-- 滚动内容区 -->
          <div class="scrollable-content">
            <!-- 文章内容 -->
            <div class="post-text">
              <h2 class="title">{{ post.title }}</h2>
              <p class="description">这是一段示例描述文本，描述这篇文章的具体内容。可以是多行的长文本，支持展示更多细节。</p>
              <div class="tags">
                <el-tag size="small" effect="plain" class="tag">#标签1</el-tag>
              <el-tag size="small" effect="plain" class="tag">#标签2</el-tag>
              </div>
            </div>

            <!-- 互动数据 -->
            <div class="interaction-info">
              <div class="interaction-item">
                <el-icon><Star /></el-icon>
                <span>{{ post.likes }}</span>
              </div>
              <div class="interaction-item">
                <el-icon><ChatDotRound /></el-icon>
                <span>{{ post.comments }}</span>
              </div>
              <div class="interaction-item">
                <el-icon><Share /></el-icon>
                <span>分享</span>
              </div>
            </div>

            <!-- 评论区 -->
            <div class="comments-section">
              <h3 class="comments-title">评论</h3>
              <div class="comment-list">
                <div v-for="i in 7" :key="i" class="comment-item">
                  <el-avatar :size="32" src="" />
                  <div class="comment-content">
                    <div class="comment-user">用户名{{ i }}</div>
                    <div class="comment-text">这是一条示例评论内容</div>
                    <div class="comment-meta">
                      <span class="time">1小时前</span>
                      <span class="reply-btn">回复</span>
                      <span class="like">
                        <el-icon><Star /></el-icon>
                        <span>12</span>
                      </span>
                    </div>
                    
                    <!-- 评论回复区域 -->
                    <div class="reply-list" v-if="i === 1">
                      <div class="reply-item">
                        <el-avatar :size="24" src="" />
                        <div class="reply-content">
                          <div class="reply-user">
                            <!-- <span class="username">回复用户1</span>
                            <span class="reply-to">回复</span> -->
                            <span class="target-user">用户名1</span>
                          </div>
                          <div class="reply-text">这是一条回复内容这是一条回复内容这是一条回复内容这是一条回复内容这是一条回复内容这是一条回复内容</div>
                          <div class="reply-meta">
                            <span class="time">30分钟前</span>
                            <span class="reply-btn">回复</span>
                            <span class="like">
                              <el-icon><Star /></el-icon>
                              <span>5</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Picture, Star, ChatDotRound, Share } from '@element-plus/icons-vue'

const visible = ref(false)
const post = ref({
  title: '超级好吃的美食分享',
  username: '美食达人',
  likes: '1.2w',
  comments: '399'
})

// 打开弹窗的方法
const show = (postData: any) => {
  post.value = postData
  visible.value = true
}

defineExpose({
  show
})
</script>

<style scoped>
.post-detail-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
  height: 80vh;
  margin-top: 10vh !important;
  max-width: 960px;
}

.post-detail-dialog :deep(.el-dialog__body) {
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.post-detail {
  margin: 0;
  height: 100%;
  overflow: hidden;
  max-width: 100%;  /* 限制最大宽度 */
}

.post-content {
  display: flex;
  height: 100%;
  width: 100%;  /* 确保内容不会超出容器 */
}

.image-section {
  flex: 0 0 auto;  /* 修改为自动宽度 */
  /* width: 66.67%; */
  width: 55%;   /* 使用百分比代替固定像素 */
  height: 100%;
  background: #000;
}

.info-section {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 修改为hidden */
  position: relative;
}

.fixed-header {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  padding: 24px 24px 0;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  padding-top: 0;
  
  /* 美化滚动条 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: #ccc;
  }
  
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.user-meta {
  flex: 1;
}

.username {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.follow-btn {
  width: 80px;
}

.post-text {
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  cursor: pointer;
}

.interaction-info {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.interaction-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  cursor: pointer;
}

.interaction-item:hover {
  color: #ff2442;
}

.comments-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-content {
  flex: 1;
}

.comment-user {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.comment-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.like {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.like:hover {
  color: #ff2442;
}

.reply-list {
  margin-top: 12px;
  /* padding-left: 42px; */
  position: relative;
}

/* .reply-list::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #f0f0f0;
} */

.reply-item {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

/* 添加头像固定宽度 */
.reply-item .el-avatar {
  flex: 0 0 24px;  /* 不压缩、不放大、固定宽度 */
}

.reply-content {
  flex: 1;
  min-width: 0;  /* 防止文本溢出 */
  word-break: break-all;  /* 文本换行 */
}

.reply-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.5;
  word-wrap: break-word;  /* 长文本换行 */
}

.reply-user {
  font-size: 14px;
  margin-bottom: 6px;
}

.reply-user .username {
  font-weight: 500;
  color: #333;
}

.reply-user .reply-to {
  color: #999;
  margin: 0 4px;
  font-weight: normal;
}

.reply-user .target-user {
  color: #333;
  font-weight: 500;
}

.reply-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.5;
}

.reply-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.reply-btn {
  cursor: pointer;
  color: #999;
  font-size: 12px;
}

.reply-btn:hover {
  color: #ff2442;
}

.reply-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: #999;
}
</style>