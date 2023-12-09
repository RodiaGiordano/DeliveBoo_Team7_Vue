<script>
import Navbar from '../src/assets/components/partials/Navbar.vue';
import AppFooter from '../src/assets/components/AppFooter.vue';

export default {
  data() {
    return {};
  },

  components: {
    Navbar,
    AppFooter,
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
  <AppFooter />
</template>

<style lang="scss" scoped></style>
