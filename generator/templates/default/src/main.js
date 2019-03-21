import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import HYZ from "hyz-components";
import Icon from "hyz-components/src/components/icon";
import "hyz-components/dist/hyz-components.css";
import "iview/dist/styles/iview.css";
import "./styles/index.less";
import config from "./config";
import MSG from "./utils/msg";

Vue.component("HyzIcon", Icon);
Vue.use(HYZ, config);

Vue.use(iView);
Vue.config.productionTip = false;

Vue.prototype.$config = config;

new Vue({
  router,
  store,
  render: h => h(App),
  created: function() {
    //process msg
    const msg = new MSG();
    msg.init();

    //fetch account
    const token = Vue.ls.get("TOKEN");
    if (token) {
      store.dispatch("fetchAccount");
    }
  }
}).$mount("#app");
