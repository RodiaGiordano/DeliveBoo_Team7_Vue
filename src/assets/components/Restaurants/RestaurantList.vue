<script>
// import { store } from "../data/store";
// import axios from "axios";

import RestaurantCard from './RestaurantCard.vue';

export default {
  data() {
    return {
      restaurants: [],
      scrollAmount: 300,
    };
  },
  methods: {
    scrollLeft() {
      this.$refs.restaurantList.scrollBy({
        left: -this.scrollAmount,
        behavior: 'smooth',
      });
    },
    scrollRight() {
      this.$refs.restaurantList.scrollBy({
        left: this.scrollAmount,
        behavior: 'smooth',
      });
    },
  },

  components: {
    RestaurantCard,
  },
  props: { restaurants: Array },
};
</script>

<template>
  <div class="restaurant-list wrapper">
    <ul ref="restaurantList">
      <li v-for="element in restaurants">
        <RestaurantCard :element="element"></RestaurantCard>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.restaurant-list {
  white-space: nowrap;
  width: 100%;
  padding: 2rem 1.5rem 1rem 0;

  .restaurant-card {
    display: inline-block;
    width: 300px;
    margin-right: 20px;
  }
  ul {
    list-style-type: none;
  }
}
</style>
