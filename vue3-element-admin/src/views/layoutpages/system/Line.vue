<template>
  <div class="ve_container">
    <!-- 搜索 -->
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 20px"
    >
      <el-button type="primary" @click="handleEdit(false, {})">
        添加
      </el-button>
      <div>
        <el-input
          v-model="search"
          placeholder="请输入关键字搜索"
          style="width: 150px"
        ></el-input>
        <!-- <el-button style="margin-left: 10px;" type="primary" @click="onSubmitSearch()"> 搜索 </el-button> -->
      </div>
    </div>

    <!-- 列表 -->
    <ve-table
      :table="{
        data: tableData
          .slice((currentPage - 1) * PageSize, currentPage * PageSize)
          .filter(
            (data) =>
              !search ||
              data.name.toLowerCase().includes(search.toLowerCase()) ||
              data.pathway.toLowerCase().includes(search.toLowerCase()) ||
              data.address.toLowerCase().includes(search.toLowerCase())
          ),
      }"
    >
      <el-table-column prop="name" label="线路名称"></el-table-column>
      <el-table-column prop="pathway" label="途径"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot:default="{ row }">
          <el-button
            @click.prevent="handleZd(row)"
            size="small"
            :type="row.state != 1 ? '' : 'primary'"
          >
            置顶
          </el-button>
          <el-button
            @click.prevent="handleEdit(true, row)"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button @click.prevent="handleDel(row)" type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </ve-table>

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

    <!-- 编辑组件 -->
    <line-edit
      v-show="false"
      @isUpdate="handleChildMessage"
      ref="LineEditCom"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    description: "用户信息查询与设置",
  }),
};
</script>

<script setup>
import LineEdit from "./components/LineEdit";
import { reactive, toRefs, ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

import { get_List, get_Info, add_List, set_List, del_List, executeSql } from '@/api/nodeApi'

const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();

const route = useRoute();
const router = useRouter();
const rowData = ref(null);
const dialogTitle = ref("");
const showDialog = ref(false);
const queryForm = ref(null);

// 表格
const tableData = ref([]);
const listLoading = ref(false)
const showTable = ref(false)
const search = ref('')
// 默认显示第几页
const currentPage = ref(1)
// 总条数，根据接口获取数据长度(注意：这里不能为空)
const totalCount = ref(0)
// 个数选择器（可修改）
const pageSizes = ref([1, 5, 10, 50])
// 默认每页显示的条数（可修改）
const PageSize = ref(10)

/**删除行数据
 * @description:
 * @param {*}
 * @return {*}
 */
const handleDel = (row) => {
  proxy.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  }).then(async () => {
    let params = { data: { id: row.id }, gether: "t_logistics_line" }
    del_List(params).then(rest => {
      proxy.$notify({
        title: '成功',
        message: '删除完成。',
        type: 'success'
      });

      getDataList();
    })
  }).catch(() => {
    proxy.$message({
      type: "info",
      message: "已取消删除",
    });
  });
};

// 获取列表数据
const getDataList = async () => {
  let param = { data: 'select * from t_logistics_line order by state', gether: "t_logistics_line" }
  const { data } = await executeSql(param);

  totalCount.value = data.length
  tableData.value = data
}

// 编辑
const handleEdit = async (isEdit, row) => {
  instance.refs.LineEditCom.dialogFormVisible = true
  instance.refs.LineEditCom.rowJson = row
  instance.refs.LineEditCom.isEdit = isEdit
}

// 编辑回传
const handleChildMessage = async (messageFromChild) => {
  getDataList()
}

// 置顶
const handleZd = async (row) => {
  let paramEdit = { data: { old: { id: row.id }, new: { state: row.state == 1 ? 2 : 1 } }, gether: "t_logistics_line" }
  set_List(paramEdit).then(rest => {
    proxy.$notify({
      title: '成功',
      message: '修改完成。',
      type: 'success'
    });

    getDataList()
  })
}

// 分页
// 每页显示的条数
const handleSizeChange = (val) => {
  // 改变每页显示的条数
  PageSize.value = val;
  // 注意：在改变每页显示的条数时，要将页码显示到第一页
  currentPage.value = 1;
}
// 显示第几页
const handleCurrentChange = (val) => {
  // 改变默认的页数
  currentPage.value = val;
}


onMounted(async () => {
  await getDataList()
});
</script>

<style lang="scss" scoped></style>
