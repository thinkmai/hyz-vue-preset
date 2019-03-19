<template>
  <div class="exception">
    <div class="img">
      <img :src="option.img" />
    </div>
    <div class="content">
      <h1>{{ option.title }}</h1>
      <div class="desc">{{ option.desc }}</div>
      <div class="action">
        <Button size="large" type="text" @click="backHome">返回首页</Button>
        <Button size="large" type="primary" @click="backPrev"
          >返回上一页({{ second }}s)</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exception",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      second: 5,
      timer: null
    };
  },
  methods: {
    backHome() {
      this.$router.push("/");
    },
    backPrev() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less" scoped>
.exception {
  min-height: 500px;
  height: 80%;
  align-items: center;
  text-align: center;
  margin-top: 150px;
  .img {
    display: inline-block;
    padding-right: 52px;
    zoom: 1;
    img {
      height: 360px;
      max-width: 430px;
    }
  }
  .content {
    display: inline-block;
    flex: auto;
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}

.mobile {
  .exception {
    margin-top: 30px;
    .img {
      padding-right: unset;

      img {
        height: 40%;
        max-width: 80%;
      }
    }
  }
}
</style>
