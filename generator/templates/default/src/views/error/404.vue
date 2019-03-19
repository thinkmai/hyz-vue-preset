<template>
  <exception-page :option="option" />
</template>

<script>
import ExceptionPage from "./ExceptionPage";
import err404 from "./404.svg";
export default {
  components: {
    ExceptionPage
  },
  data() {
    return {
      option: {
        img: err404,
        title: "404",
        desc: "抱歉，你访问的页面不存在"
      }
    };
  }
};
</script>

<style scoped></style>
