<template>
  <hyz-login
    ref="login"
    :title="$config.projectName"
    :copyright="$config.copyright"
    @has-empty-info="onHasEmptyInfo"
    @login="onLogin"
  >
    <template #logo>
      <hyz-icon name="logo" color="#333" scale="7"></hyz-icon>
    </template>
  </hyz-login>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on("$set_login_loding_false", () => {
      if (this.$refs.login) this.$refs.login.setLoginLoading(false);
    });
  },
  methods: {
    onHasEmptyInfo() {
      this.$Message.info("登录信息不能为空！");
    },
    onLogin({ username, password }) {
      this.$store.dispatch("fetchToken", { username, password });
    }
  }
};
</script>
<style></style>
