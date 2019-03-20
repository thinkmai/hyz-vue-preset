import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import VueI18n from "vue-i18n";
import messages from "./locale";
import HYZ from "hyz-components";
import Icon from "hyz-components/src/components/icon";
import "hyz-components/dist/hyz-components.css";
import "iview/dist/styles/iview.css";
import "./styles/index.less";
import config from "./config";
import MSG from "./utils/msg";

Vue.component("HyzIcon", Icon);
Vue.use(HYZ, config);
Vue.use(VueI18n);

Vue.use(iView);
Vue.config.productionTip = false;
const i18n = new VueI18n({
  locale: "zh-CN",
  messages
});

new Vue({
  router,
  store,
  i18n,
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
