<script>
import Navbar from "../src/assets/components/partials/Navbar.vue";

export default {
  data() {
    return {};
  },

  components: {
    Navbar,
  },
};
</script>

<template>
  <Navbar></Navbar>
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped></style>
