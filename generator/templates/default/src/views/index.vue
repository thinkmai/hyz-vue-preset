<template>
  <div>
    <hyz-header
      title="HYZ-COMPONENTS"
      personName="HYZ"
      showMsg
      :msgCount="27"
      enableFullScreen
      :menus="menus"
      @on-menu-changed="onMenuChanged"
    >
      <template #logo>
        <hyz-icon name="logo" color="white" scale="5"></hyz-icon>
      </template>
      <template #extra>
        <span>Have A Good Day!</span>
      </template>
    </hyz-header>
    <router-view></router-view>
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
