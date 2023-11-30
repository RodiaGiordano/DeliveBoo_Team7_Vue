<script>
import { store } from "../data/store";
import axios from "axios";

export default {
  data() {
    return {
      typeList: [],
      baseUri: store.baseUri,
      // inputSearch: "",
    };
  },
  mounted() {
    this.fetchTypes(store.baseUri + "type");
  },

  methods: {
    fetchTypes(endpoint) {
      axios.get(endpoint).then((response) => {
        this.typeList = response.data;
      });
    },
  },

  // computed: {
  //   provaEl() {
  //     return this.userInput;
  //   },
  // },
  // props: { userInput: String },
  emits: ["checked", "userSearch"],
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
      placeholder="Cerca"
      @input="$emit('userSearch', this.userInput)"
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
    />
  </div>
  <div>
    <div class="form-check">
      <div v-for="typeEl in typeList">
        <input
          @change="$emit('checked', typeEl.id)"
          class="form-check-input"
          type="checkbox"
          :value="typeEl.id"
          :id="'check-' + typeEl.id"
        />

        <label class="form-check-label" for="flexCheckDefault">
          {{ typeEl.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
