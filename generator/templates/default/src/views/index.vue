<template>
  <div>
    <hyz-header
      :title="$config.projectName"
      :personName="user.personName"
      :menus="menus"
      :authMenus="authMenus"
      :enable-nav-children="!$config.useSideMenu"
      @on-menu-changed="onMenuChanged"
    >
      <template #logo>
        <hyz-icon name="logo" color="white" scale="5"></hyz-icon>
      </template>
    </hyz-header>
    <div style="padding: 24px; position: relative;">
      <router-view></router-view>
    </div>
    <div id="global-spin" class="loading">
      <div>
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { appRouter } from "../router/defines";
export default {
  data() {
    return {
      menus: appRouter.children
    };
  },
  computed: {
    user() {
      return this.$store.getters.user || {};
    },
    authMenus() {
      return this.$ls.get("AUTH_MENUS");
    }
  },
  methods: {
    onMenuChanged(type) {
      if (type === "logout") {
        this.$store.dispatch("logout");
      } else {
        this.$router.push({ name: type });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/styles/theme";
.loading {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  z-index: 10086;
}

.loading > div {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 50%;
  margin-left: -30px;
  top: 50%;
  margin-top: -30px;
}

.loading > div > div {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background: @primary-color;
  top: 10px;
  left: 10px;
  transform-origin: 20px 20px;
  border-radius: 8px;
  animation: spin-a 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}

.loading > div > .c2 {
  top: 10px;
  left: auto;
  right: 10px;
  transform-origin: -4px 20px;
  animation: spin-b 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}
.loading > div > .c3 {
  top: auto;
  left: auto;
  right: 10px;
  bottom: 10px;
  transform-origin: -4px -4px;
  animation: spin-c 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}
.loading > div > .c4 {
  top: auto;
  bottom: 10px;
  transform-origin: 20px -4px;
  animation: spin-d 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}

@keyframes spin-a {
  0% {
    transform: rotate(90deg);
  }
  0% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-b {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-c {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-d {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading > span {
  width: 100px;
  height: 30px;
  position: absolute;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: 30px;
  color: @primary-color;
  font-size: 12px;
  text-align: center;
}
</style>
