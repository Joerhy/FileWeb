<template>
  <el-row>
    <el-col :span="1">
       <div class="topbar-logo" v-show="!toggle">
        <a href="/"><img src="../assets/file.png" style="width:80px"/></a>
      </div>
    </el-col>
    <el-col :span="18" class="topbar">
      <div class="topbar-title">
        <h1 style="color:#409eff">文件管理系统</h1>
      </div>
       </el-col>
      <el-col :span="5">
      <div class="topbar-menu">
        <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">{{role}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              <el-dropdown-item command="changeRole">切换角色</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      </el-col>
   
    <el-col :span="24">
      <el-container>
        <el-aside >
         <el-menu :default-active="$router.path" router>
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
             <el-submenu :key="item.path" :index="index+''" v-if="item.leaf">
                <template slot="title"><span slot="title">{{item.name}}</span></template>
                <el-menu-item  v-for="term in item.children" :key="term.path" :index="term.path"><span slot="title">{{term.name}}</span></el-menu-item>
             </el-submenu>
             <el-menu-item :index="item.path" :key="item.path" v-if="!item.leaf"><span slot="title">{{item.name}}</span></el-menu-item>
          </template>
        </el-menu>
        </el-aside>

  <el-main class="content">
     <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
    </el-container>
    </el-col>
  </el-row>


</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$router.push({ path: "/login" });
          break;

        default:
          break;
      }
    },
    handleSelect(index) {
      this.Index = index;
    },
    getRole() {
      return window.localStorage.getItem("user");
    }
  },

  data() {
    return {
      Index: "0",
      role: "",
      toggle: false,
      role: this.getRole()
    };
  }
};
</script>

<style lang="scss">
.topbar {
  height: 50px;
  padding: 0px;
}
.topbar-logo {
  margin-left: 10px;
  float: left;
}
.topbar-title {
  text-align: center;
}
.topbar-menu {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
