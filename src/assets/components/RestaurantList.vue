<script>
import { store } from "../data/store";
import axios from "axios";

import RestaurantCard from "./RestaurantCard.vue";

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  methods: {
    fetchRestaurants(endpoint) {
      axios.get(endpoint).then((response) => {
        this.restaurants = response.data;
      });
    },
  },
  mounted() {
    this.fetchRestaurants(store.baseUri + "restaurant");
  },

  components: {
    RestaurantCard,
  },
};
</script>

<template>
  <ul>
    <li v-for="restaurant in restaurants">
      <RestaurantCard :restaurant="restaurant"></RestaurantCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}
</style>
