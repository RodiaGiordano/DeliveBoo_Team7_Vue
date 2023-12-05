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
      const localCart = localStorage.getItem('orderedDishIds');

      //checks if restaurantIdd exists and if it's different from dish's restaurant_id; if yes, don't add item to cart.
      if (restaurantId != dish.restaurant_id && restaurantId != null) {
        return "restaurant id is different; you can't order from two different restaurants at once stupid bitch";
      }

      //if restaurantId is currently null or empty, assign dish's restaurant_id as value to restaurantId
      if (restaurantId == '' || restaurantId == null) {
        localStorage.setItem('restaurantId', dish.restaurant_id);
      }

      //localStorage logic
      let currentCart = [];

      //if localStorage is not empty, then create temporary array
      if (localCart != null && localCart != '') {
        currentCart = JSON.parse(localCart);
        console.log(currentCart);
      }

      //check if dish already exists; if yes, add 1 to quantity
      let dishFound = false;
      if (currentCart !== null) {
        dishFound = currentCart.some((element) => {
          if (element.dish == dish.id) {
            element.qty += 1;
            return true;
          }
        });
      }

      //if it doesn't exist, create new low-level dish object
      if (dishFound == false) {
        const newObj = {
          dish: dish.id,
          qty: 1,
        };
        currentCart.push(newObj);
      }

      const cartString = JSON.stringify(currentCart);
      localStorage.setItem('orderedDishIds', cartString);
    },
  },

  props: { dish: Object },
};
</script>

<template>
  <div class="dish row-cols">
    <div class="dish-body col-7 col-sm-8 col-md-8">
      <p class="title">{{ dish.name }}</p>
      <p class="des">{{ dish.description }}</p>
      <p>{{ dish.price }} €</p>
      <p v-for="typeEl in dish.courses" class="card-text">
        <small class="text-body-secondary">{{ typeEl.name }}</small>
      </p>
    </div>
    <div class="dish-image col-3 col-sm-4 col-md-4">
      <img v-if="dish.image" :src="dish.image" class="dish-image" />
      <img v-else src="../../images/placeholder.png" class="d-none" />
      <!-- {{ dish.image }} -->
      <button @click="addToStorages(dish)" class="add-to-cart">
        <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
      </button>
    </div>
  </div>
  <hr />
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;
.dish {
  display: flex;
  gap: 1rem;

  .title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .dish-image {
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 18px;

    display: flex;
    .add-to-cart {
      position: absolute;
      bottom: 0;
      left: 88%;

      align-self: flex-end;

      background-color: $primary-color;
      color: $secondary-font-color;

      border-radius: 50%;
      border: 1px $secondary-color;
    }
  }
}

@media screen and (min-width: 768px) {
  .dish-image {
    width: 130px !important;
    height: 130px !important;
  }
}

@media screen and (min-width: 992px) {
  .dish-image {
    width: 150px !important ;
    height: 150px !important;
  }
}
</style>
