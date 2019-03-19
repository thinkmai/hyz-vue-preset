<template>
  <exception-page :option="option" />
</template>

<script>
import ExceptionPage from "./ExceptionPage";
import err500 from "./500.svg";
export default {
  components: {
    ExceptionPage
  },
  data() {
    return {
      option: {
        img: err500,
        title: "500",
        desc: "抱歉，服务器出错了"
      }
    };
  }
};
</script>

<style scoped></style>
