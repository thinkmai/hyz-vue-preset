import Vue from "vue";
import VueRouter from "vue-router";
import { routers } from "./defines";
import { LoadingBar } from "iview";
Vue.use(VueRouter);

const RouterConfig = {
  mode: "history",
  routes: routers
};

const router = new VueRouter(RouterConfig);
// store.commit("SET_APP_MENUS", appRouter.children);

const whiteList = ["login"]; // 不重定向白名单

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  const token = Vue.ls.get("TOKEN");
  if (whiteList.includes(to.name)) {
    next();
  } else {
    if (token) {
      if (to.path === "/login") {
        next("/");
      } else {
        next();
        // const toPath = to.path.substr(1)
        // if(isAdmin == 1) {
        //   next()
        // } else { //没权限，禁止访问
        //   next('/403')
        // }
      }
    } else {
      next("/login"); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
