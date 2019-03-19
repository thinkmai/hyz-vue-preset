<template>
  <exception-page :option="option" />
</template>

<script>
import ExceptionPage from "./ExceptionPage";
import err403 from "./403.svg";
export default {
  components: {
    ExceptionPage
  },
  data() {
    return {
      option: {
        img: err403,
        title: "403",
        desc: "抱歉，你无权访问该页面"
      }
    };
  }
};
</script>

<style scoped></style>
