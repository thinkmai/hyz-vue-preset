const devBaseRestUrl =
  "https://www.easy-mock.com/mock/5c8e3975c12de836b2636635/hyz";

export default {
  //config for http
  http: {
    baseURL: process.env.NODE_ENV === "production" ? "" : devBaseRestUrl,
    timeout: 10 * 1000
  }
};
