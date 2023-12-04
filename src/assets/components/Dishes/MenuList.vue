<script>
import DishCard from './DishCard.vue';

export default {
  data() {
    return {};
  },
  components: { DishCard },

  props: { restaurant: Object, dishes: Array },
};
</script>

<template>
  <!-- jumbotron -->
  <div class="menulist">
    <div class="restaurant-jumbotron">
      <img src="../../images/jumbo-menuList1.jpg" class="restaurant-jumbo" />
    </div>

    <!-- r image -->
    <div class="restaurant-details">
      <div class="restaurant-image">
        <img :src="restaurant.image || '../../images/color-no-bg.png'" alt="" class="img-fluid" />
      </div>
      <!-- r info -->
      <div class="restaurant-info">
        <h2>{{ restaurant.restaurant_name }}</h2>
        <span v-for="typeEl in restaurant.types" :key="typeEl.id">
          <small class="text-body-secondary"> &bull; {{ typeEl.name }}</small>
        </span>
        <p><font-awesome-icon icon="fa-solid fa-map-pin"></font-awesome-icon> {{ restaurant.address }}</p>
        <p>Descrizione: {{ restaurant.description }}</p>
      </div>
    </div>

    <!-- Dishes -->
    <div class="dishes">
      <h3>Menu</h3>
      <ul class="dish-list">
        <li v-for="dish in dishes" :key="dish.id">
          <DishCard :dish="dish"></DishCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;
.menulist {
  width: 100vw;

  .restaurant-jumbotron {
    position: relative;

    .restaurant-jumbo {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .restaurant-details {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $bg-color;
    border: 2px solid $bg2-color;
    padding: 1.5rem;
    border-radius: 25px;
    width: 80%;

    text-align: center;
  }

  .dishes {
    padding: 6rem 1rem;
  }
}
</style>
