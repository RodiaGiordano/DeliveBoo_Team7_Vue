<script>
import DishCard from "./DishCard.vue";

export default {
  data() {
    return {};
  },
  components: { DishCard },

  props: { restaurant: Object, dishes: Array },
};
</script>

<template>
  <div class="prova d-flex">
    <div class="card mb-3 w-50">
      <img :src="restaurant.image" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">
          {{ restaurant.restaurant_name }}
        </h5>
        <p>{{ restaurant.address }}</p>
        <p class="card-text">
          {{ restaurant.description }}
        </p>
        <p v-for="typeEl in restaurant.types" class="card-text">
          <small class="text-body-secondary">{{ typeEl.name }}</small>
        </p>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="dish in dishes">
          {{ dish.name }}
        </li>
      </ul>
    </div>
  </div>
  <ul>
    <li v-for="dish in dishes">
      <DishCard :dish="dish"></DishCard>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
}
</style>
