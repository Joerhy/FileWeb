import Vue from "vue";
import Router from "vue-router";
import Userlist from "@/components/user/userlist";
import AddUser from "@/components/user/addUser";
import Upload from "@/components/file/upload";
import Filelist from "@/components/file/filelist";
import Login from "@/components/login";
import Home from "@/components/home";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "文件管理",
      component: Home,
      leaf: true,
      menuShow: true,
      children: [
        {
          path: "/file/filelist",
          name: "文件列表",
          menuShow: true,
          component: Filelist
        },
        {
          path: "/file/upload",
          name: "上传文件",
          menuShow: true,
          component: Upload
        }
      ]
    },
    {
      path: "/",
      name: "用户管理",
      component: Home,
      leaf: true,
      menuShow: true,
      children: [
        {
          path: "/user/userlist",
          name: "用户列表",
          menuShow: true,
          component: Userlist
        },
        {
          path: "/user/adduser",
          name: "增加用户",
          menuShow: true,
          component: AddUser
        }
      ]
    },
    {
      leaf: false,
      path: "/login",
      name: "登录",
      component: Login
    }
  ],
  mode: "history"
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith("/login")) {
    window.localStorage.removeItem("user");
    next();
  } else {
    let user = window.localStorage.getItem("user");
    if (!user) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

export default router;
