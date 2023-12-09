<template>
  <div class="alert alert-success" role="alert" v-show="this.show">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      duration: 1500,
      show: false,
      msg: '',
    };
  },
  methods: {
    showAlert(msg, duration) {
      this.msg = msg;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, duration || this.duration);
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}
</style>
