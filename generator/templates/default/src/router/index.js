import Vue from "vue";
import VueRouter from "vue-router";
import { routers } from "./defines";
import { LoadingBar } from "iview";
import config from "../config";

Vue.use(VueRouter);

const RouterConfig = {
  // mode: "history",
  routes: routers
};

const router = new VueRouter(RouterConfig);

const whiteList = ["login", "403", "404", "500"]; // 不重定向白名单

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (config.enableAuth) {
    const token = Vue.ls.get("TOKEN");
    const isAdmin = Vue.ls.get("IS_ADMIN");
    const authMenus = Vue.ls.get("AUTH_MENUS");
    if (whiteList.includes(to.name)) {
      next();
    } else {
      if (token) {
        if (to.path === "/login") {
          next("/");
        } else {
          if (isAdmin) {
            next();
          } else {
            if (authMenus.includes(to.name)) {
              next();
            } else {
              next("/403");
            }
          }
        }
      } else {
        next("/login");
      }
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
