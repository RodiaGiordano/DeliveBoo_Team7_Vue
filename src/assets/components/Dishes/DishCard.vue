<script>
import { store } from '../../data/store';

export default {
  data() {
    return {
      cartStorage: store.cartStorage,
    };
  },

  methods: {
    addToStorages(dish) {
      const restaurantId = localStorage.getItem('restaurantId');
      console.log(restaurantId);

      //check if restaurantIdd exists and if it's different from dish's restaurant_id; if yes, don't add item to cart.
      if ((restaurantId !== null || restaurantId !== '') && restaurantId !== dish.restaurant_id) {
        console.log(restaurantId !== null || restaurantId !== '', dish.restaurant_id, restaurantId !== dish.restaurant_id);
        return "restaurant id is different; you can't order from two different restaurants at once stupid bitch";
      }

      //if restaurantId is currently null or empty, assign dish's restaurantId as value
      if (restaurantId == '' || restaurantId === null) {
        localStorage.setItem('restaurantId', dish.restaurant_id);
      }

      //adds to cartStorage
      this.cartStorage.push(dish);

      //adds to localStorage
      const dishIds = this.cartStorage.map((dish) => {
        return dish.id;
      });

      const dishIdsString = JSON.stringify(dishIds);
      localStorage.setItem('orderedDishIds', dishIdsString);
    },
  },

  props: { dish: Object },
};
</script>

<template>
  <div class="dish-card row">
    <div class="dish-image col-4">
      <img :src="dish.image" class="card-img" />
    </div>
    <div class="dish-body col-7">
      <h5 class="card-title">{{ dish.name }}</h5>
      <p class="card-text">{{ dish.description }}</p>
      <p>{{ dish.price }} €</p>
      <p v-for="typeEl in dish.courses" class="card-text">
        <small class="text-body-secondary">{{ typeEl.name }}</small>
      </p>
    </div>

    <div class="div col-1">
      <button @click="addToStorages(dish)" class="add-to-cart btn btn-danger">
        <font-awesome-icon icon="fa-solid fa-cart-plus"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dish-card {
  display: flex;
  width: 100%;
  height: 250px;
  margin: 1rem;

  .dish-image {
    width: 250px;
    height: 250px;
  }
}

.add-to-cart {
  align-self: center;
}
</style>
