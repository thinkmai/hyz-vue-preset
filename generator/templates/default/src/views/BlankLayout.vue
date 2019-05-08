<template>
  <div style="display:flex;height:100%;">
    <hyz-side-menu
      v-if="useSideMenu"
      :value="menuList"
      :isAdmin="isAdmin"
      :authMenus="authMenus"
      :module="module"
      @toggle="onToggle"
    ></hyz-side-menu>
    <transition>
      <router-view id="indexView" class="app-content" :class="width"></router-view>
    </transition>
  </div>
</template>

<script>
import { appRouter } from "@/router/defines";

export default {
  props: ["module", "useSideMenu"],
  data() {
    return {
      width: ""
    };
  },
  methods: {
    onToggle(v) {
      this.width = v ? "collapsed-width" : "expand-width";
    }
  },
  computed: {
    authMenus() {
      return this.$ls.get("AUTH_MENUS");
    },
    isAdmin() {
      return this.$ls.get("IS_ADMIN");
    },
    menuList() {
      const find = _.find(appRouter.children, { name: this.module });
      return find ? find.children : [];
    }
  }
};
</script>

<style lang="less">
@import "~@/styles/theme.less";
.collapsed-width {
  width: calc(~"100% - @{collapsed-menu-width}");
}
.expand-width {
  width: calc(~"100% - @{normal-menu-width}");
}
</style>
