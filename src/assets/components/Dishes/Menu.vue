<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {};
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
    this.fetchMenu(store.baseUri + "menu");
  },
};
</script>

<template>
  <div class="card" style="width: 18rem">
    <img src="..." class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
