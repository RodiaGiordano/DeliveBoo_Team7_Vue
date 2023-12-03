<script>
// import { store } from "../data/store";
// import axios from "axios";

import RestaurantCard from './RestaurantCard.vue';

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
  <div class="restaurant-list wrapper">
    <ul>
      <li v-for="element in restaurants">
        <RestaurantCard :element="element"></RestaurantCard>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.restaurant-list {
  padding: 2rem 1.5rem 1rem 0;

  ul {
    list-style-type: none;
  }
}
</style>
