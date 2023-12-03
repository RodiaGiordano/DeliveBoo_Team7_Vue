<script>
import Navbar from '../src/assets/components/partials/Navbar.vue';

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
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
