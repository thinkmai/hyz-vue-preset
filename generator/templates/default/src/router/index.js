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

const whiteList = ["login", "403", "404", "500"]; // 不重定向白名单

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  const token = Vue.ls.get("TOKEN");
  if (token) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.name)) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
