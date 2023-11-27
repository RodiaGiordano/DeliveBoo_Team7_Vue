<script>
import { store } from "../data/store";
import axios from "axios";

export default {
  data() {
    return {
      restaurantList: [],
    };
  },
  mounted() {
    this.fetchTypes(store.baseUri + "type");
  },

  methods: {
    fetchTypes(endpoint) {
      axios.get(endpoint).then((response) => {
        this.types = response.data;
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
      <div v-for="typeEl in types">
        <!-- <input
          @change="filterType(typeEl.id)"
          class="form-check-input"
          type="checkbox"
          :value="typeEl.id"
          id="flexCheckDefault"
        /> -->
        <input
          @change="filterType(typeEl.id)"
          class="form-check-input"
          type="checkbox"
          :value="typeEl.id"
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          {{ typeEl.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
