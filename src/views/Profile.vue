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
      <div class="tab active">笔记</div>
      <div class="tab">收藏</div>
      <div class="tab">点赞</div>
    </div>

    <div class="empty-state">
      <div class="empty-icon">暂无内容</div>
      <p class="empty-text">你还没有任何内容哦</p>
    </div>
  </div>
</template>

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
</style>