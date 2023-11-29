<script>

import { store } from "../../data/store";
import axios from "axios";

export default {
    data() {
        return{
            dish: [],
        }

    },

    methods: {
    fetchDish(endpoint) {
      axios
        .get(endpoint)
        .then((response) => {
        this.dish = response.data;
        console.log(this.dish);
      });
    },
  },

  mounted() {
    const dishId = this.$route.params.id;
    this.fetchDish(store.baseUri + "restaurant/" + this.id + "/menu/" + dishId);
  },

  props: ["id"],
 }


</script>

<template>
  
     <!-- <img :src="dish.image" :alt="dish.name">
    <div class="details">
      <h2>{{ dish.name }}</h2>
      <p>{{ dish.price}} €</p>
      <p>{{ dish.description }}</p>
    </div> -->
</template>

<style lang="scss" scoped></style>
