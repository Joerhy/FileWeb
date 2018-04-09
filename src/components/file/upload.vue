<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" class="container" label-width="100px">
    <el-form-item label="版本名" prop="versionname" v-if="ruleForm.filetype==='APK'">
      <el-input v-model="ruleForm.versionname" auto-complete="false"></el-input>
    </el-form-item>
    <el-form-item label="版本号" prop="versioncode" v-if="ruleForm.filetype==='APK'">
      <el-input v-model="ruleForm.versioncode" type="number" auto-complete="false"></el-input>
    </el-form-item>
    <el-form-item label="包名" prop="packagename" v-if="ruleForm.filetype==='APK'">
      <el-input v-model="ruleForm.packagename" auto-complete="false"></el-input>
    </el-form-item>
    <el-form-item label="硬件版本号" prop="hardcode" v-if="ruleForm.filetype==='BIN'">
      <el-input v-model="ruleForm.hardcode"   auto-complete="false"></el-input>
    </el-form-item>
    <el-form-item label="软件版本号" prop="softcode" v-if="ruleForm.filetype==='BIN'">
      <el-input v-model="ruleForm.softcode"  auto-complete="false" ></el-input>
    </el-form-item>
        <el-form-item label="ID" prop="id" v-if="ruleForm.filetype==='BIN'">
      <el-input v-model="ruleForm.id"  auto-complete="false" ></el-input>
    </el-form-item>
    <el-form-item label="文件类型" prop="filetype"  style="text-align:start">
      <el-select v-model="ruleForm.filetype" placeholder="请选择文件类型">
        <el-option label="APK" value="APK"></el-option>
        <el-option label="BIN" value="BIN"></el-option>
        <el-option label="DOC" value="DOC"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
    <el-upload
      class="upload-file"
      ref="upload"
      action="http://localhost:8080/v1/file"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="ruleForm.fileList"
      :auto-upload="false"
      :before-upload="beforeUpload"
      :data="ruleForm"
      :on-success="handleSuccess"
      name="file_name">
    <el-button  slot="trigger" size="medium" type="primary">选取文件</el-button>
    <el-button style="margin-left: 60px;" size="medium" type="success" @click="submitForm('ruleForm')">上传文件</el-button>
  <div slot="tip" class="el-upload__tip">只能上传apk/bin/doc文件</div>
      </el-upload>
      </el-form-item>

  </el-form>
</template>

<script>
export default {
  data() {
    return {
      title: "登录文件管理系统",
      loading: false,
      ruleForm: {
        versioncode: "",
        versionname: "",
        hardcode: "",
        softcode: "",
        filetype: "APK",
        fileList: [],
        packagename: "",
        id: "",
        user: this.getRole()
      },
      rules: {
        filetype: [
          { required: true, message: "请选择文件类型", trigger: "change" }
        ],
        version_code: [
          {
            required: true,
            message: "请输入版本号",
            trigger: "blur"
          }
        ],
        id: [
          {
            required: true,
            message: "请输入ID",
            trigger: "blur"
          }
        ],
        version_name: [
          { required: true, message: "请输入版本名", trigger: "blur" }
        ],
        packagename: [
          { required: true, message: "请输入包名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getRole() {
      return window.localStorage.getItem("user");
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitUpload();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      let fileName = file.name.split(".");
      let suff = fileName[fileName.length - 1];
      console.log(suff);

      switch (this.ruleForm.filetype) {
        case "APK":
          console.log(fileName);
          if (suff === "apk") {
            return file;
          } else {
            this.$message({
              message: "只能上传APK文件！",
              type: "warn"
            });
            return false;
          }
          break;
        case "BIN":
          if (suff === "bin") {
            return file;
          } else {
            this.$message({
              message: "只能上传BIN文件！",
              type: "warn"
            });
            return false;
          }
          break;

        case "DOC":
          if (
            suff === "doc" ||
            suff === "xls" ||
            suff === "ppt" ||
            suff === "docx" ||
            suff === "pdf" ||
            suff === "xlsx" ||
            suff === "pptx"
          ) {
            return file;
          } else {
            this.$message({
              message: "只能上传文档！",
              type: "warn"
            });
            return false;
          }
          break;
      }
    },
    handleSuccess(res, file, fileList) {
      console.log(res);

      if (res.success === 0) {
        this.$message({
          message: "上传成功！",
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    }
  }
};
</script>

<style>
.container {
  width: 30%;
  text-align: left;
  margin-left: 25%;
}
</style>
