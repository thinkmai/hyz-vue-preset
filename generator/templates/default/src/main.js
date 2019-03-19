import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import iView from "iview";
import HYZ from "hyz-components";
import "hyz-components/dist/hyz-components.css";
import "iview/dist/styles/iview.css";
import config from "./config";
import MSG from "./utils/msg";
import store from "./store";

Vue.use(HYZ, config);

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created: function() {
    //process msg
    const msg = new MSG();
    msg.init();

    const token = Vue.ls.get("TOKEN");
    if (!token) {
      Vue.ls.set("TOEKN", "mytoken");
    }

    Vue.config.errorHandler = function(err, vm, info) {};
  }
}).$mount("#app");
