<script>
import { store } from '../data/store';
import axios from 'axios';

import Filter from '../components/partials/Filter.vue';

export default {
  data() {
    return {
      typeList: [],
      baseUri: store.baseUri,
      inputSearch: '',
    };
  },
  mounted() {
    this.fetchTypes(store.baseUri + 'type');
  },

  methods: {
    fetchTypes(endpoint) {
      axios.get(endpoint).then((response) => {
        this.typeList = response.data;
      });
    },
    checked(idEl) {
      this.$emit('checked', idEl);
    },
  },
  watch: {
    boxChecked: function (newVal) {
      if (newVal) {
        this.inputSearch = '';
      }
    },
  },

  components: { Filter },

  props: { boxChecked: Boolean },
  emits: ['checked'],
};
</script>

<template>
  <div class="input-group mb-3">
    <div class="btn-group">
      <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Nome ristorante</a></li>
        <li><a class="dropdown-item" href="#">Menu item</a></li>

        <li><a class="dropdown-item" href="#">Menu item</a></li>
      </ul>
    </div>

    <input id="serach_bar" type="text" class="form-control" placeholder="Cerca" @input="$emit('checked', inputSearch)" v-model="inputSearch" aria-label="Example text with button addon" aria-describedby="button-addon1" />
  </div>
  <Filter :elements="typeList" @checked="checked"></Filter>
  <!-- <div class="form-check">
    <div v-for="typeEl in typeList">
      <input @change="$emit('checked', typeEl.id)" class="form-check-input" type="checkbox" :value="typeEl.id" :id="'check-' + typeEl.id" />

      <label class="form-check-label" :for="'check-' + typeEl.id">
        {{ typeEl.name }}
      </label>
    </div>
  </div> -->
</template>

<style lang="scss" scoped></style>
