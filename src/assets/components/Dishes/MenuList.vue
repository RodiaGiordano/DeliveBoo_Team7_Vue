<script>
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {};
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
    this.fetchMenu(store.baseUri + "menu/" + this.id);
    console.log(this.id);
  },
};
</script>

<template>
  <div class="card" style="width: 18rem">
    {{ id }}
    <img src="..." class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">title</h5>
      <p class="card-text"></p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
