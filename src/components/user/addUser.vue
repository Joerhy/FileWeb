<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" class="container" label-width="100px">
    <img src="../../assets/icon.png" class="head"/>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="身份" prop="role"  style="text-align:start">
      <el-select v-model="ruleForm.role" placeholder="请选择身份">
        <el-option label="访客" value="访客"></el-option>
        <el-option label="管理员" value="管理员"></el-option>
        <el-option label="超级管理员" value="超级管理员"></el-option>
      </el-select>
    </el-form-item>
        <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>
        <el-form-item label="确认密码" prop="ensurepassword">
      <el-input v-model="ruleForm.ensurepassword" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">增加用户</el-button>
      <el-button @click="resetForm('ruleForm')">重新填写</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import API from "../../api/user_api";
import crypto from "crypto";
export default {
  data() {
    var checkEnsure = (rule, value, callback) => {
      if (value === "") {
        callback("请输入确认密码");
      } else if (value !== this.ruleForm.password) {
        callback("两次输入密码不一致");
      } else {
        callback();
      }
    };
    var numberCheck = number => {
      var reg = /^[0-9]*$/;
      return reg.test(number);
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback("请输入密码");
      } else if (numberCheck(value)) {
        callback("密码不能为纯数字");
      } else if (value.length < 6) {
        callback("密码不能少于6个字符");
      } else {
        callback();
      }
    };
    return {
      head: "",
      enable: false,
      ruleForm: {
        name: "",
        role: "",
        password: "",
        ensurepassword: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        ensurepassword: [
          { required: true, validator: checkEnsure, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          var md5P = this.getMd5(this.ruleForm.password);
          var form = {
            name: this.ruleForm.name,
            password: md5P,
            role: this.ruleForm.role
          };
          API.add(form)
            .then(function(result) {
              that.loading = false;
              if (result.success === 0) {
                that.$message.success({
                  showClose: true,
                  message: result.msg,
                  duration: 1000
                });
              } else {
                that.$message.error({
                  showClose: true,
                  message: result.msg,
                  duration: 1000
                });
              }
            })
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message.error({
                showClose: true,
                message: "请求出现异常",
                duration: 1000
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
  width: 50%;
  text-align: center;
  margin-left: 15%;
}
</style>
