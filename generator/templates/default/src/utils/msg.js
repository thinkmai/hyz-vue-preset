import { Message } from "iview";
import HYZ from "hyz-components";
import Vue from "vue";
import store from "../store";
import router from "../router";
class MSG {
  constructor() {}

  init() {
    this.addEventListener();
  }

  addEventListener() {
    Vue.bus.$on(HYZ.ec.HYZ_HTTP_RESPONSE_MSG, this.onHttpResponseMsg);
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

  destory() {
    Vue.bus.$off(HYZ.ec.HYZ_HTTP_RESPONSE_MSG, this.onHttpResponseMsg);
  }
}

export default MSG;
