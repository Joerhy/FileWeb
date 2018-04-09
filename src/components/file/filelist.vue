<template>
    <el-row class="title">
    <el-col :span="24" class="breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>文件列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="main" v-loading="loading" element-loading-text="拼命加载中">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="name" placeholder="文件名" style="min-width: 240px;" @keyup.enter.native="search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      <el-table :data="fileList" highlight-current-row v-loading="loading" style="width: 100%;" stripe >
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="文件名" width="300" sortable>
        </el-table-column>
        <el-table-column prop="filetype" label="文件类型" width="200" sortable  
        :filters="filters"
        :filter-method="filterType">
        </el-table-column>
        <el-table-column prop="datetime" label="更新时间" width="200" sortable>
        </el-table-column>
        <el-table-column prop="User.Name" label="上传者" width="200" sortable>
        </el-table-column>
        <el-table-column prop="version" label="文件版本" width="200" sortable>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click.native.prevent="deleteFile(scope.$index)">删除</el-button>
          <el-button
          size="mini"
          type="success"
          @click.native.prevent="downloadFile(scope.$index)">下载</el-button>
      </template>
        </el-table-column>
      </el-table>

    </el-col>
  </el-row>
</template>


<script>
import API from "../../api/file_api";
export default {
  data() {
    return {
      filters: [
        { text: "APK", value: "APK" },
        { text: "BIN", value: "BIN" },
        { text: "DOC", value: "DOC" }
      ],
      fileList: [],
      loading: false,
      name: ""
    };
  },
  methods: {
    search() {
      console.log("search");
    },
    deleteFile(index) {
      var file = this.fileList[index];
      let that = this;
      this.$confirm("将要删除该文件, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delete(file, index);
        })
        .catch(() => {});
    },
    downloadFile(index) {
      var file = this.fileList[index];
      window.location.href = file.url;
    },
    filterType(value, row) {
      return row.filetype === value;
    },
    delete(file, index) {
      var params = {
        id: file.id,
        packagename: file.Packagename,
        filetype: file.filetype
      };
      let that = this;
      console.log(params);

      API.remove(params)
        .then(function(result) {
          if (result.success === 0) {
            that.$message.success({
              showClose: true,
              message: result.msg,
              duration: 1000
            });
            that.fileList.splice(index, 1);
          } else {
            that.$message.error({
              showClose: true,
              message: result.msg,
              duration: 1000
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 1000
          });
        });
    }
  },
  mounted() {
    let that = this;
    API.get()
      .then(function(result) {
        that.loading = false;
        console.log(result);

        if (result.success === 0) {
          that.fileList = result.data;
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
  }
};
</script>

<style>
.main {
  margin-top: 10px;
}
</style>
