<script>
import { store } from '../data/store';
import axios from 'axios';

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

    // submitForm() {
    //   ;
    // },
  },
  watch: {
    boxChecked: function (newVal) {
      if (newVal) {
        this.inputSearch = '';
      }
    },
  },
  props: { boxChecked: Boolean },
  emits: ['checked', 'advancedSerach'],
};
</script>

<template>
  <div class="input-group mb-3">
    <div class="btn-group">
      <button @click="$emit('advancedSerach', true)" class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>

      <div class="advanced_serach">
        <ul class="dropdown-menu">
          <li class="dropdown-item">
            <input id="serach_bar" type="text" class="form-control" placeholder="Cerca" @input="$emit('checked', inputSearch)" v-model="inputSearch" aria-label="Example text with button addon" aria-describedby="button-addon1" />
          </li>
          <li class="dropdown-item d-flex flex-column">
            <label for="customRange1" class="form-label">Fascia di prezzo</label>
            <input type="range" class="form-range" id="customRange1" />
          </li>

          <div v-for="typeEl in typeList">
            <li class="dropdown-item">
              <input @change="$emit('checked', typeEl.id)" class="form-check-input" type="checkbox" :value="typeEl.id" :id="'check-' + typeEl.id" />

              <label class="form-check-label" :for="'check-' + typeEl.id">
                {{ typeEl.name }}
              </label>
            </li>
          </div>
          <li class="dropdown-item">
            <button type="submit">cerca</button>
          </li>
        </ul>
      </div>
    </div>

    <input id="serach_bar" type="text" class="form-control" placeholder="Cerca" @input="$emit('checked', inputSearch)" v-model="inputSearch" aria-label="Example text with button addon" aria-describedby="button-addon1" />
  </div>

  <div>
    <div class="form-check">
      <div v-for="typeEl in typeList">
        <input @change="$emit('checked', typeEl.id)" class="form-check-input" type="checkbox" :value="typeEl.id" :id="'check-' + typeEl.id" />

        <label class="form-check-label" :for="'check-' + typeEl.id">
          {{ typeEl.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advanced_serach label {
  margin-left: 10px;
}
</style>
