<script>
// import { store } from "../data/store";
// import axios from "axios";

import RestaurantCard from "./RestaurantCard.vue";

export default {
  data() {
    return {};
  },

  components: {
    RestaurantCard,
  },
  props: { restaurants: Array },
};
</script>

<template>
  <ul>
    <li v-for="element in restaurants">
      <RestaurantCard :element="element"></RestaurantCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}
</style>
