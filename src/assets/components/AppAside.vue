<script>
import { store } from "../data/store";
import axios from "axios";

export default {
  data() {
    return {
      restaurantList: [],
      baseUri: store.baseUri,
    };
  },
  mounted() {
    this.fetchTypes(store.baseUri + "type");
  },

  methods: {
    fetchTypes(endpoint) {
      axios.get(endpoint).then((response) => {
        this.restaurantList = response.data;
      });
    },
    // filterType(typesId) {
    //   axios.get(store.baseUri + "type/" + typesId).then((response) => {
    //     this.restaurantList = response.data.restaurants;
    //     this.$router.push('/nuova-pagina')
    //   });
    // },

    // prova(id, typeEl) {
    //   console.log(id);
    //   console.log(typeEl);
    // },
  },

  emits: ["urlFactory"],
};
</script>

<template>
  <div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" id="button-addon1">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </button>

    <input
      type="text"
      class="form-control"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
    />
  </div>
  <div>
    <div class="form-check">
      <div v-for="restaurantEl in restaurantList">
        <input
          @change="$emit('urlFactory', restaurantEl)"
          class="form-check-input"
          type="checkbox"
          :value="restaurantEl.id"
          id="flexCheckDefault"
        />
        <!-- <input
          @change="filterType(restaurantEl.id)"
          class="form-check-input"
          type="checkbox"
          :value="restaurantEl.id"
          id="flexCheckDefault"
        /> -->
        <label class="form-check-label" for="flexCheckDefault">
          {{ restaurantEl.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
