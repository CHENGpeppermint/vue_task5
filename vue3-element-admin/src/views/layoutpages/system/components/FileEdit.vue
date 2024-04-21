<template>
  <div>
    <!--模态框-->
    <el-dialog
      title="上传文件"
      v-model="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="http://localhost:3000/upload"
        :auto-upload="false"
        :headers="headers"
        :on-success="handleSuccess"
        name="file"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submitUpload">
          上传至服务器
        </el-button>

        <template #tip>
          <div class="el-upload__tip">please upload file</div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'

var _self
export default {
  name: "upload",
  props: [],//属性
  components: {},
  computed: {

  },
  data () {
    return {
      // 模态框
      dialogFormVisible: false,
      headers: { token: '' }
    }
  },
  watch: {
    dialogFormVisible (newVal, oldVal) {

    }
  },
  created () {

  },
  methods: {
    // 文件上传
    submitUpload () {
      this.headers['token'] = localStorage.getItem('token')
      this.$refs['uploadRef'].submit()
    },
    // 上传成功回调
    handleSuccess (response, file, fileList) {
      // console.log('File uploaded successfully:', response, file, fileList);

      if (response.code != 200) {
        ElMessage.error(response.msg)
        return
      }

      ElMessage.success('上传成功!')
      this.dialogFormVisible = false
      this.$emit('sendToParent', { msg: '上传成功' })
    }
  }
}

</script>


