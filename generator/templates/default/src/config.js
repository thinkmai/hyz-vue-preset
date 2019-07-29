const { hostname, port, protocol } = window.location;
const url =
  process.env.NODE_ENV === "production"
    ? `${protocol}//${hostname}:${port}`
    : `input rest url ...`;

const wsPrefix = protocol === "http:" ? "ws" : "wss";
export const wsUrl =
  process.env.NODE_ENV === "production"
    ? `${wsPrefix}://${hostname}:${port + 2}/ws?ws_service_mark=***`
    : `ws://123.207.167.163:9010/ajaxchattest`;

export default {
  sysFlag: "hyz",
  projectName: "hyz-vue-preset",
  copyright: "© 2019 All Rights Reserved 广州市捍御者信息科技有限公司",

  //turn off this option will not require login
  enableAuth: false,

  useSideMenu: false,

  //config for http
  http: {
    baseURL: url + "/api/",
    timeout: 10 * 1000,
    noToken: true,
    showSpin: true
  },

  //config for websocket
  ws: {
    url: wsUrl,
    pingTimeout: 5000, //心跳间隔5s
    pongTimeout: 2000, //后端pong 2s不回则重连
    reconnectTimeout: 2000 //重连间隔
  }
};
