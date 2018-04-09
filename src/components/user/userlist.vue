<template>
    <el-row class="title">
    <el-col :span="24" class="breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="main" v-loading="loading" element-loading-text="拼命加载中">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="name" placeholder="用户名" style="min-width: 240px;" @keyup.enter.native="search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      <el-table :data="userList" highlight-current-row v-loading="loading" style="width: 100%;" stripe >
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="Name" label="用户名" width="200" sortable>
        </el-table-column>
        <el-table-column prop="role" label="角色" width="200" sortable><span>hehhe</span>
        </el-table-column>
        <el-table-column prop="password" label="密码" width="600" sortable>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click.native.prevent="deleteUser(scope.$index)">删除</el-button>
      </template>
        </el-table-column>
      </el-table>

    </el-col>
  </el-row>
</template>


<script>
import API from "../../api/user_api";
export default {
  data() {
    return {
      userList: [],
      loading: false,
      name: ""
    };
  },
  methods: {
    search() {
      console.log("search");
    },
    deleteUser(index) {
      var user = this.userList[index];
      let that = this;
      this.$confirm("将要删除用户, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delete(user.Id, index);
        })
        .catch(() => {});
    },
    delete(id, index) {
      var params = {
        Id: id
      };
      let that = this;
      API.remove(params)
        .then(function(result) {
          if (result.success === 0) {
            that.$message.success({
              showClose: true,
              message: result.msg,
              duration: 1000
            });
            that.userList.splice(index, 1);
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
          that.userList = result.data;
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
