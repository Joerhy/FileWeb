<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" class="container" label-width="100px">
    <h1 class="title">{{title}}</h1>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" auto-complete="false"></el-input>
    </el-form-item>
        <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" auto-complete="false" @keyup.enter.native="submitForm('ruleForm')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import API from "../api/user_api";
import crypto from "crypto";
export default {
  data() {
    return {
      title: "登录文件管理系统",
      loading: false,
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          console.log(this.ruleForm.name);
          var md5P = this.getMd5(this.ruleForm.password);
          var params = {
            username: this.ruleForm.name,
            password: md5P
          };
          API.login(params)
            .then(function(result) {
              that.loading = false;
              if (result.success === 0) {
                localStorage.setItem("user", that.ruleForm.name);
                that.$message.success({
                  showClose: true,
                  message: result.msg,
                  duration: 2000
                });
                that.$router.push({ path: "/" });
              } else {
                that.$message.error({
                  showClose: true,
                  message: result.msg,
                  duration: 2000
                });
              }
            })
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message.error({
                showClose: true,
                message: "请求出现异常",
                duration: 2000
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getMd5(str) {
      var md5 = crypto.createHash("md5");
      md5.update(str);
      var a = md5.digest("hex");
      console.log(a);
      return a;
    }
  }
};
</script>

<style>
.title {
  color: slategray;
  margin-bottom: 40px;
  margin-top: 60px;
}
.container {
  width: 30%;
  text-align: center;
  margin-left: 35%;
}
</style>
