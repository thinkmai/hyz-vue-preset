<template>
  <div>
    Welcome!
    <div v-for="(msg,i) in msgs" :key="i">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgs: []
    };
  },
  mounted() {
    this.$bus.$on("$WS_INITED", () => {
      //通知后端相连
      this.$ws.send(
        JSON.stringify({
          type: "connect",
          mark: "test"
        })
      );
    });

    this.$bus.$on("$WS_MSG", this.onMSG);
  },
  methods: {
    onMSG(data) {
      this.msgs.push(data);
    }
  },
  beforeDestroy() {
    //通知后端断开
    this.$ws.send(
      JSON.stringify({
        type: "disconnect",
        mark: "test"
      })
    );
  }
};
</script>

<style>
</style>
