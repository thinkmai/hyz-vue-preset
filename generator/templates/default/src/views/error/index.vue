<template>
  <div>
    <hyz-error-page v-if="type === '403'" title="403" desc="抱歉，你无权访问该页面" :img="e403"/>
    <hyz-error-page v-else-if="type === '404'" title="404" desc="抱歉，你访问的页面不存在" :img="e404"/>
    <hyz-error-page v-else title="500" desc="抱歉，服务器出错了" :img="e500"/>
  </div>
</template>

<script>
import e403 from "@/assets/svg/403.svg";
import e404 from "@/assets/svg/404.svg";
import e500 from "@/assets/svg/500.svg";
export default {
  props: {
    type: {
      type: String,
      default: "403"
    }
  },
  data() {
    return {
      e403,
      e404,
      e500
    };
  }
};
</script>

<style></style>
