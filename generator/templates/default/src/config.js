const { hostname, port, protocol } = window.location;
const restUrl =
  process.env.NODE_ENV === "production"
    ? `${protocol}//${hostname}:${port}/api/`
    : `https://turbo.linkme8.cn:33003/mock/5c8f0c3b9d070e0021a7cf75/hyz`;

export default {
  sysFlag: "hyz",
  projectName: "hyz-vue-preset",
  copyright: "© 2019 All Rights Reserved 广州市捍御者信息科技有限公司",

  //turn off this option will not require login
  enableAuth: false,

  useSideMenu: false,

  //config for http
  http: {
    baseURL: restUrl,
    timeout: 10 * 1000,
    noToken: true,
    showSpin: true
  }
};
