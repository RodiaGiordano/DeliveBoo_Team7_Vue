<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {
      menu: []
    };
  },

  props: ["id"],

  methods: {
    fetchMenu(endpoint) {
      axios.get(endpoint).then((response) => {
        this.menu = response.data;
        console.log(this.menu);
      });
    },
  },

  mounted() {
    this.fetchMenu(store.baseUri + "restaurant/" + this.id + "/menu");
    console.log(this.id);
  },
};
</script>

<template>

  <div class="menu-item"
  v-for="dish in menu">
       <img :src="dish.image" :alt="dish.name">
       <div class="details">
           <h2>{{ dish.name }}</h2>
           <p>{{ dish.price}} €</p>
           <p>{{ dish.description }}</p>
       </div>
   </div>
</template>

<style lang="scss" scoped>
 .menu-item {
           display: flex;
           align-items: center;
           border: 1px solid #ccc;
           padding: 10px;
           margin: 10px;
  img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
  }
  .details {
        display: flex;
        flex-direction: column;
    h2 {
        margin: 0;
    }
    p {
        margin: 0;
    }
      }
    }
</style>
