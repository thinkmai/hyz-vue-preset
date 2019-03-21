const devBaseRestUrl =
  "http://utoss.linkme8.cn:19907/mock/5c8f0c3b9d070e0021a7cf75/hyz";

export default {
  projectName: "hyz-vue-preset",
  copyright: "© 2019 All Rights Reserved 广州市捍御者信息科技有限公司",

  //turn off this prop will not require login
  enableAuth: false,

  //config for http
  http: {
    baseURL: process.env.NODE_ENV === "production" ? "" : devBaseRestUrl,
    timeout: 10 * 1000
  }
};
