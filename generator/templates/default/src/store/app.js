import jsSHA from "jssha";
import qs from "qs";
import Vue from "vue";
import router from "../router/index";

const app = {
  state: {
    token: "",
    user: {}
  },
  mutations: {
    SET_TOKEN: (state, payload) => (state.token = payload),
    SET_USER: (state, payload) => (state.user = payload)
  },
  actions: {
    fetchToken({ commit, dispatch }, payload) {
      const shaObj = new jsSHA("SHA-1", "TEXT");
      shaObj.update(payload.password);
      const para = {
        ...payload,
        password: shaObj.getHash("HEX"),
        scope: "ui",
        grant_type: "password",
        client_id: "browser"
      };

      Vue.http({
        method: "post",
        url: "uaa/oauth/token",
        data: qs.stringify(para)
      })
        .then(response => {
          Vue.ls.set("TOKEN", response.access_token);
          Vue.bus.$emit("$hyz_token_changed", response.access_token);
          commit("SET_TOKEN", response.access_token);

          dispatch("fetchAccount");

          //如果失效时间小于1天, 那么就调一次refreshtoken
          //保持token有效期。
          if (response.expires_in < 60 * 60 * 24) {
            const refeshPara = {
              ...para,
              grant_type: "refresh_token"
            };
            Vue.$http({
              method: "post",
              url: "uaa/oauth/token",
              data: qs.stringify(refeshPara),
              showSpin: false
            }).then(response => {
              Vue.ls.set("TOKEN", response.access_token);
              Vue.bus.$emit("$hyz_token_changed", response.access_token);
              commit("SET_TOKEN", response.access_token);
            });
          }
        })
        .catch(() => {
          Vue.bus.$emit("$set_login_loding_false");
        });
    },

    fetchAccount({ commit }) {
      Vue.http({
        method: "get",
        url: "account/v1/user/current",
        showSpin: false,
        headers: {
          Authorization: "Bearer " + Vue.ls.get("TOKEN")
        }
      })
        .then(response => {
          Vue.bus.$emit("$set_login_loding_false");

          commit("SET_USER", response);
          if (router.currentRoute.path === "/login") {
            router.push("/");
          }
        })
        .catch(() => {
          Vue.bus.$emit("$set_login_loding_false");
          Vue.ls.set("TOKEN", "a");
          router.push("/login");
        });
    },

    logout() {
      Vue.ls.remove("TOKEN");
      router.push("/login");
    }
  }
};

export default app;
