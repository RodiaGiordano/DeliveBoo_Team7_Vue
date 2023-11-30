<script>
import {store} from '../../data/store';

export default {
  data() {
    return {

    };
  },

  methods: {
   addToCartDb(dish, amount) {
      store.cartStorage.push(dish);
      // console.log(store.cartStorage);
      
   }
  },

  props: { dish: Object },
};
</script>

<template>

    <div class=" dish-card row">
        <div class="dish-image col-4 ">
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
            <button  @click="addToCartDb(dish)">
              <router-link :to="{name:'cart'}"  class="add-to-cart btn btn-danger">
                <font-awesome-icon icon ="fa-solid fa-cart-plus"></font-awesome-icon >
              </router-link>

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
