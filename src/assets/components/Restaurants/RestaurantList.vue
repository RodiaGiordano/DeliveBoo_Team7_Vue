<script>
// import { store } from "../data/store";
// import axios from "axios";

import RestaurantCard from './RestaurantCard.vue';

export default {
  data() {
    return {};
  },
  methods: {
    scrollLeft() {
      this.$refs.restaurantList.scrollBy({ left: -300, behavior: 'smooth' });
    },

    scrollRight() {
      this.$refs.restaurantList.scrollBy({ left: 300, behavior: 'smooth' });
    },

    handleKeyDown(slide) {
      if (slide.key === 'ArrowLeft') {
        this.scrollLeft();
      } else if (slide.key === 'ArrowRight') {
        this.scrollRight();
      }
    },
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  components: {
    RestaurantCard,
  },
  props: { restaurants: Array },
};
</script>

<template>
  <div class="restaurant wrapper">
    <h2><span>Nuove</span> aperture</h2>
    <div ref="restaurantList" class="restaurant-list" @keyup.left="scrollLeft" @keyup.right="scrollRight">
      <button class="arrow arrow-right" @click="scrollRight"><font-awesome-icon icon="fa-solid fa-arrow-right"></font-awesome-icon></button>
      <div v-for="(restaurant, index) in restaurants" :key="index" class="restaurant-card">
        <RestaurantCard :element="restaurant"></RestaurantCard>
      </div>
      <button class="arrow arrow-left" @click="scrollLeft"><font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;
.wrapper {
  padding: 1.5rem 0rem 1rem 1.2rem;
  margin-bottom: 250px;
  h2 {
    font-weight: 700;
  }
  span {
    font-style: oblique;
    color: $primary-color;
  }
}
.restaurant-list {
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  // -webkit-overflow-scrolling: touch;

  .restaurant-card {
    flex: 0 0 auto;
    scroll-snap-align: start;
    margin-right: 20px;
  }

  .arrow {
    position: absolute;
    background: $primary-color;
    padding: 8px;
    border-radius: 50%;
    aspect-ratio: 2;
    cursor: pointer;
    border: 1px solid $primary-color;
    color: $secondary-font-color;
    z-index: 10;
  }

  .arrow-left {
    left: 0;
    top: 100%;
    transform: translateY(-50%);
  }

  .arrow-right {
    right: 0;
    top: 100%;
    transform: translateY(-50%);
  }
}
.restaurant-1 {
  border-radius: 25px;
}

@media screen and (min-width: 768px) {
}

@media screen and (min-width: 992px) {
  .arrow-left {
    left: 27% !important;
    top: 80% !important;
  }

  .arrow-right {
    top: 80% !important;
  }
}

@media screen and (min-width: 1024px) {
}
</style>
