import Config from "../config";

//需要权限验证的路由
export const appRouter = {
  path: "/",
  name: "root",
  component: () => import("../views"),
  redirect: "/home",
  children: [
    {
      path: "home",
      name: "home",
      icon: "ios-home",
      label: "首页",
      component: () => import("../views/home")
    },
    {
      path: "profile",
      name: "profile",
      label: "账户信息",
      hidden: true,
      props: { module: "profile", useSideMenu: Config.useSideMenu },
      component: () => import("../views/BlankLayout.vue"),
      redirect: "/profile/test/",
      children: [
        {
          path: "test",
          name: "test",
          icon: "ios-home",
          label: "test",
          component: () => import("../views/profile/PersonSetting.vue")
        }
      ]
    }
  ]
};

//不需要权限验证的通用路由
export const commonRouters = [
  {
    path: "/login",
    name: "login",
    label: "登录",
    component: () => import("../views/login")
  },
  {
    path: "/403",
    name: "403",
    label: "403",
    props: { type: "403" },
    component: () => import("../views/error")
  },
  {
    path: "/404",
    name: "404",
    label: "404",
    props: { type: "404" },
    component: () => import("../views/error")
  },
  {
    path: "/500",
    name: "500",
    label: "500",
    props: { type: "500" },
    component: () => import("../views/error")
  },
  {
    path: "/*",
    name: "error-404",
    label: "404-页面不存在",
    redirect: "/404"
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [appRouter, ...commonRouters];
