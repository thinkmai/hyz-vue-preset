<template>
  <div>
    <hyz-header
      :title="$config.projectName"
      :personName="user.personName"
      :menus="menus"
      @on-menu-changed="onMenuChanged"
    >
      <template #logo>
        <hyz-icon name="logo" color="white" scale="5"></hyz-icon>
      </template>
    </hyz-header>
    <div style="padding: 24px;">
      <router-view></router-view>
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
.expand1 {
  cursor: pointer;
  &:hover {
    color: white;
  }
}
</style>
