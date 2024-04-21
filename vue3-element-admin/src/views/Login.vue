<template>
  <div>
    <div class="home-view">
      <div class="home-view-left">
        <div class="title">物流管理系统</div>
      </div>
      <div class="home-view-right">
        <div style="padding: 15px">
          <div style="font-size: 1.2rem; font-weight: 550; margin-bottom: 20px">
            管理员登录
          </div>
          <el-form
            :model="form"
            label-width="auto"
            ref="ruleFormRef"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="账号" />
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="form.pwd" placeholder="密码" />
            </el-form-item>
            <el-form-item prop="code">
              <div style="display: flex; height: 50px">
                <el-input v-model="form.code" placeholder="验证码" />
                <div v-html="image" @click="fetchData"></div>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="onSubmit"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

import { SET_TOKEN, SET_UNAME } from "@/store/modules/app/type";
import Common from "@/components/Common";
import { ref, reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { get_Code, post_Login } from '@/api/nodeApi'

const rules = {
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
};
const store = useStore();
const router = useRouter();
const form = reactive({
  username: "zhangsan",
  pwd: "123456",
  code: '',
});
let image = ref('')
let code_text = ref('')

const { username, pwd } = toRefs(form);
const ruleFormRef = ref(null);
const success = ref(false);
sessionStorage.clear();
store.dispatch(`app/${SET_TOKEN}`, "");
router.options.isAddDynamicMenuRoutes = false;

const fetchData = async () => {
  const response = await get_Code()
  image.value = response.data.data
  code_text.value = response.data.text
}

fetchData()

const onSubmit = () => {
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')

      if (code_text.value.toLowerCase() != form.code.toLowerCase()) {
        ElMessage.error('验证码输入错误!')
        fetchData()
        return
      }

      let params = { username: form.username, pwd: form.pwd, }
      let response = await post_Login(params)

      if (response.code == 200) {
        ElMessage.success('登录成功!')

        const { token, username } = response;
        store.dispatch(`app/${SET_TOKEN}`, token);
        store.dispatch(`app/${SET_UNAME}`, username);
        success.value = true;
        router.push({ name: "AppMain" });
      }
      else {
        ElMessage.error('用户名或密码错误!')
      }

    } else {
      console.log('error submit!', fields)
    }
  })
}

// const onSubmit = () => {
//   ref_form.value.validate(async (valid) => {
//     if (valid) {
//       const data = await VE_API.system.login(form);
//       if (data.code === "00") {
//         const { token, uname } = data;
//         store.dispatch(`app/${SET_TOKEN}`, token);
//         store.dispatch(`app/${SET_UNAME}`, uname);
//         success.value = true;
//         router.push({ name: "AppMain" });
//       }
//     } else {
//       return;
//     }
//   });
// };
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
}
.home-view-left {
  width: 65%;
  height: 80%;

  background-image: url("./bg.jpg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .title {
    font-size: 1.8rem;
    color: #fff;
    font-weight: 550;
    margin-top: 15%;
    margin-left: 10%;
  }
}
.home-view-right {
  width: 35%;
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: aquamarine;
}
</style>
