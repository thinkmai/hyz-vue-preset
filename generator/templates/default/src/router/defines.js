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
      path: "403",
      name: "403",
      icon: "ios-home",
      label: "403",
      hide: true,
      component: () => import("../views/error/403.vue")
    },
    {
      path: "404",
      name: "404",
      icon: "ios-home",
      label: "404",
      hide: true,
      component: () => import("../views/error/404.vue")
    },
    {
      path: "500",
      name: "500",
      icon: "ios-home",
      label: "500",
      hide: true,
      component: () => import("../views/error/500.vue")
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
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [appRouter, ...commonRouters];
