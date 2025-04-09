<template>
  <el-dialog
    v-model="visible"
    title="发布笔记"
    width="800px"
    :close-on-click-modal="false"
  >
    <el-form :model="form" label-position="top">
      <el-form-item>
        <el-upload
          class="upload-area"
          drag
          multiple
          action="#"
          :auto-upload="false"
          :on-change="handleFileChange"
        >
          <el-icon class="el-icon--upload"><Upload /></el-icon>
          <div class="el-upload__text">
            拖拽图片到这里或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              支持上传 jpg/png 图片
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="form.title"
          placeholder="填写标题，可以帮助更多人找到你的笔记"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="form.content"
          type="textarea"
          placeholder="填写正文"
          :rows="6"
          maxlength="1000"
          show-word-limit
        />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="form.category"
          placeholder="选择分类"
          style="width: 100%"
        >
          <el-option label="美食" value="food" />
          <el-option label="旅行" value="travel" />
          <el-option label="时尚" value="fashion" />
          <el-option label="美妆" value="beauty" />
          <el-option label="影视" value="movie" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="danger" @click="handlePublish">发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const visible = ref(false)
const form = ref({
  title: '',
  content: '',
  category: '',
  images: [] as File[]
})

defineExpose({
  show: () => visible.value = true
})

const handleFileChange = (file: any) => {
  form.value.images.push(file.raw)
}

const handlePublish = () => {
  if (!form.value.title || !form.value.content || !form.value.category) {
    ElMessage.warning('请填写完整信息')
    return
  }
  if (form.value.images.length === 0) {
    ElMessage.warning('请至少上传一张图片')
    return
  }
  // 这里添加发布逻辑
  console.log('发布笔记:', form.value)
  ElMessage.success('发布成功')
  visible.value = false
  // 重置表单
  form.value = {
    title: '',
    content: '',
    category: '',
    images: []
  }
}
</script>

<style scoped>
.upload-area {
  width: 100%;
}
</style>