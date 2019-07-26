import { Message } from "iview";
import HYZ from "hyz-components";
import Vue from "vue";
import store from "../store";
import router from "../router";
class MSG {
  init() {
    Vue.bus.$on("$hyz_http_response_msg", payload =>
      this.onHttpResponseMsg(payload)
    );
    Vue.bus.$on("$login_success", () => this.onLoginSuccess());
    Vue.bus.$on("$logout", () => this.onLogout());
  }

  initWebsocket() {
    const ws = new HYZ.ws(config.ws.url, {
      pingTimeout: config.ws.pingTimeout,
      pongTimeout: config.ws.pongTimeout,
      reconnectTimeout: config.ws.reconnectTimeout,
      onOpen: () => {
        console.log("websocket connected on " + new Date());
        Vue.bus.$emit("$WS_INITED");
      },
      onClose: () => {
        console.log("websocket disconnected on " + new Date());
        Vue.bus.$emit("$WS_CLOSED");
      },
      onError: () => {},
      onReconnect: () => {},
      onMessage: evt => this.onWebsocketMsg(evt)
    });
    Vue.ws = ws;
    Object.defineProperty(Vue.prototype, "$ws", {
      value: ws,
      configurable: true
    });
  }

  onHttpResponseMsg({ msg, code, type }) {
    Message[type](msg);
    switch (code) {
      case 401:
      case 50401:
        store.dispatch("logout");
        break;
      case 403:
        router.push({ name: "403" });
        break;
      case 404:
        router.push({ name: "404" });
        break;
      case 500:
        router.push({ name: "500" });
        break;
      default:
        break;
    }
  }

  /**
   * 完整的message字段如下：
   * type:String 消息类型
   * schedule:Integer 调度周期，单位秒
   * connectId:String 连接id
   * messageId:String 消息id
   * message:String 消息内容
   * mark 消息处理服务标识，业务系统key_专业key
   * referrer 消息终端类型， webConnect/appConnect/gateConnect
   * timestamp 时间戳
   */
  onWebsocketMsg(evt) {
    const data = evt.data;
    try {
      const msgData = JSON.parse(data);
      if (msgData.type !== "pong") {
        switch (msgData.mark) {
          default:
            Vue.bus.$emit("$WS_MSG", msgData);
            break;
        }
      }
    } catch (error) {
      console.log("parse data error", error);
    }
  }

  onLoginSuccess() {
    this.initWebsocket();
  }

  onLogout() {
    Vue.ws.close();
    Vue.ws = null;
  }

  destory() {
    Vue.bus.$off("$hyz_http_response_msg", this.onHttpResponseMsg);
    Vue.bus.$off("$login_success", this.onLoginSuccess);
    Vue.bus.$off("$logout", this.onLogout);
    if (Vue.ws) {
      Vue.ws.close();
      Vue.ws = null;
    }
  }
}

export default MSG;
