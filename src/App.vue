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
  <head>
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
