<script>
import { store } from "../data/store";
import axios from "axios";

export default {
  data() {
    return {
      menu: [],
    };
  },

  methods: {
    fetchMenu(endpoint) {
      axios.get(endpoint).then((response) => {
        this.menu = response.data;
        console.log(this.menu);
      });
    },
  },

  mounted() {
    //this.fetchMenu(store.baseUri + "menu");
  },

  props: { element: Object },
};
</script>

<template>
  <div class="card mb-3">
    <img :src="element.image" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">
        {{ element.restaurant_name }}
      </h5>
      <p>{{ element.address }}</p>
      <p class="card-text">
        {{ element.description }}
      </p>
      <p v-for="typeEl in element.types" class="card-text">
        <small class="text-body-secondary">{{ typeEl.name }}</small>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
