<template>
  <div class="mainDiv">
    <el-button type="primary" class="margin-button" @click="handle_file_upload"
      >文件上传</el-button
    >

    <el-table
      style="width: 100%"
      height="500"
      :data="
        dataList.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      v-loading="listLoading"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="名称" prop="filename">
        <template #default="scope">
          {{ scope.row.filename }}
        </template>
      </el-table-column>
      <el-table-column label="大小" prop="filesize">
        <template #default="scope">
          {{ scope.row.filesize }}
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="filetype">
        <template #default="scope">
          {{ scope.row.filetype }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="图片" prop="fileid" width="150">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="'http://localhost:3000/' + scope.row.fileid"
            fit="contain"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button size="small" @click="handle_check(scope.row)">
            查看
          </el-button>
          <el-button type="danger" size="small" @click="handle_del(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="totalCount > 0"
      style="margin-left: 1%; margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <FileEdit v-show="false" @send-to-parent="handleChildMessage" ref="File" />

    <el-dialog
      title="上传图片"
      v-model="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      style="height: 100%"
    >
      <iframe
        :src="pdfSrc"
        frameborder="0"
        scrolling="auto"
        class="iframe"
      ></iframe>
    </el-dialog>
  </div>
</template>

<script>
var _self
import FileEdit from './components/FileEdit.vue'
import { get_filelist, del_file, get_List } from '@/api/nodeApi'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  components: { FileEdit },
  name: 'FileUpload',
  data () {
    return {
      dialogFormVisible: false,
      pdfSrc: '',

      //表格数据
      dataList: [],
      listLoading: false,
      showTable: false,
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      // 个数选择器（可修改）
      pageSizes: [1, 5, 10, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
    }
  },
  computed: {

  },
  created () {
    _self = this
    this.fetchData();
  },
  mounted () {

  },
  methods: {
    async fetchData () {
      let param = { data: {}, gether: "t_file_list" }
      const response = await get_List(param)
      _self.dataList = response.data
      _self.totalCount = response.data.length
      console.log('获取文件列表：', _self.dataList)
    },
    // 上传组件
    handle_file_upload () {
      this.$refs.File.dialogFormVisible = true
    },
    // 回传
    handleChildMessage (messageFromChild) {
      // console.log('从子组件接收到的消息:', messageFromChild);

      this.fetchData()
    },
    // 删除
    async handle_del (row) {
      ElMessageBox.confirm('确定要删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let rest = await del_file({ fileid: row.fileid })
        ElMessage.success('删除成功!')
        _self.fetchData()
      }).catch(() => {
        // 用户点击了“取消”按钮，或者关闭了对话框不做任何处理
      });
    },
    // 分页
    // 每页显示的条数
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val;
    },


    // 查看
    handle_check (row) {
      // this.dialogFormVisible = true
      this.pdfSrc = 'http://localhost:3000/' + row.fileid
      window.open(this.pdfSrc)
    }
  },
  destroyed () {

  }
}
</script>

<style lang="scss" scoped>
.mainDiv {
  padding: 20px;
}
.margin-button {
  margin-bottom: 20px;
}

.iframe {
  width: 100%;
  height: 100vh;
}
</style>
