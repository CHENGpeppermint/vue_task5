<template>
  <div class="app-container">
    <!--模态框-->
    <el-dialog
      :title="isEdit == false ? '添加线路信息' : '编辑线路信息'"
      :append-to-body="true"
      :close-on-click-modal="false"
      destroy-on-close
      :model-value="dialogFormVisible"
      @close="dialogFormVisible = false"
    >
      <el-form
        ref="listInfo"
        :rules="rules"
        :model="listInfo"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left: 50px"
      >
        <el-form-item label="线路名称" prop="name">
          <el-input v-model="listInfo.name" />
        </el-form-item>
        <el-form-item label="途径" prop="pathway">
          <el-input v-model="listInfo.pathway" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="listInfo.address" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="listInfo.phone" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="handle_SaveButExam()"
          v-loading="loading"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; //引用全局变量
import { add_List, set_List } from '@/api/nodeApi'
var _self
export default {
  name: "edit-list",
  props: [],//属性
  components: {},
  computed: {
    ...mapGetters([
    ])
  },
  data () {

    return {
      loading: false,
      // 模态框
      dialogFormVisible: false,
      isEdit: false,
      rules: {
        name: [{ required: true, message: '线路名称不能为空', trigger: 'blur' }],
        pathway: [{ required: true, message: '途径不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
      },
      // 添加编辑信息
      listInfo: {},
      rowJson: {},
    }
  },
  watch: {
    dialogFormVisible (newVal, oldVal) {
      _self = this
      if (newVal == true) {
        // 移除表单验证
        _self.restModelRules()
        // 重置数据
        _self.restWorkData()
      }
      if (_self.isEdit && _self.dialogFormVisible) {
        // 获取数据
        _self.listInfo = JSON.parse(JSON.stringify(_self.rowJson))
      }
    }
  },
  created () { },
  methods: {
    // 提交
    handle_SaveButExam () {
      _self.loading = true
      this.$refs.listInfo.validate((valid) => {
        if (valid) {
          if (!_self.isEdit) {
            let paramAdd = {
              data: {
                name: _self.listInfo.name, pathway: _self.listInfo.pathway,
                address: _self.listInfo.address, pathway: _self.listInfo.pathway,
                phone: _self.listInfo.phone, state: 2
              }, gether: "t_logistics_line"
            }
            add_List(paramAdd).then(rest => {
              _self.loading = false
              this.$notify({
                title: '成功',
                message: '添加完成。',
                type: 'success'
              });
              _self.$emit('isUpdate')
              _self.dialogFormVisible = false
            })
          }
          else {
            let paramEdit = {
              data: {
                old: { id: _self.listInfo.id }, new: {
                  name: _self.listInfo.name, pathway: _self.listInfo.pathway,
                  address: _self.listInfo.address, pathway: _self.listInfo.pathway,
                  phone: _self.listInfo.phone
                }
              }, gether: "t_logistics_line"
            }
            set_List(paramEdit).then(rest => {
              _self.loading = false
              this.$notify({
                title: '成功',
                message: '修改完成。',
                type: 'success'
              });
              _self.$emit('isUpdate')
              _self.dialogFormVisible = false
            })
          }
        }
        else {
          _self.loading = false
        }
      })
    },


    //清空数据
    restWorkData () {
      _self.listInfo = {}
      _self.loading = false
    },
    //移除表单验证
    restModelRules () {
      this.$nextTick(() => {
        // this.$refs['listInfo'].clearValidate()
      })
    },
  }
}

</script>


<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>

