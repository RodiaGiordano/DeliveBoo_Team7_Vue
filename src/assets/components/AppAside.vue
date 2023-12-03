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
  },
  watch: {
    boxChecked: function (newVal) {
      if (newVal) {
        this.inputSearch = '';
      }
    },
  },
  props: { boxChecked: Boolean },
  emits: ['checked'],
};
</script>

<template>
  <div class="app-aside wrapper">
    <div class="search">
      <div class="input-group">
        <button class="btn search-button" type="button" id="button-addon1">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon" />
        </button>
        <input id="serach_bar" type="text" class="form-control search-input" placeholder="Cerca ristoranti" @input="$emit('checked', inputSearch)" v-model="inputSearch" aria-label="Example text with button addon" aria-describedby="button-addon1" />
      </div>
    </div>

    <div class="form-check">
      <p>Di cosa hai <span>voglia? </span></p>

      <div class="food-filters">
        <div v-for="typeEl in typeList">
          <input @change="$emit('checked', typeEl.id)" class="food-checkbox form-check-input" type="checkbox" :value="typeEl.id" :id="'check-' + typeEl.id" />
          <label class="form-check-label" :for="'check-' + typeEl.id">
            {{ typeEl.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '.././scss/partials/variables' as *;

.search {
  background-color: $bg2-color;
  padding-bottom: 1rem;
  text-align: -webkit-center;

  .input-group {
    width: 90%;

    .search-button {
      background-color: $bg-color;
      border-bottom-left-radius: 15px 15px;
      border-top-right-radius: 15px 15px;
      border-bottom-right-radius: 15px 15px;
      border-top-left-radius: 15px 15px;

      .search-icon {
        color: $primary-color;
      }
    }
  }
}

.form-check {
  padding: 1.5rem 0rem 1rem 1.2rem !important;

  p {
    font-size: 1.5rem;

    span {
      color: $primary-color;
      font-style: oblique;
    }
  }

  > * {
    font-weight: 600;
  }

  .food-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    padding: 0 1.5rem;
  }
}

@media screen and (min-width: 767px) {
}

@media screen and (min-width: 992px) {
  .wrapper {
    padding: 2rem 1.5rem;
    .search {
      background-color: $bg-color;

      .input-group {
        width: 100%;

        .search-button {
          border: 1px solid $bg2-color;
          border-bottom-left-radius: 15px 15px;
          border-top-left-radius: 15px 15px;
        }
        .search-input {
          border: 1px solid $bg2-color;
          border-top-right-radius: 15px 15px;
          border-bottom-right-radius: 15px 15px;
        }
      }
    }
    .form-check {
      padding-left: 0.2rem !important;
      .food-filters {
        display: block !important;
        padding-bottom: 1.5rem !important;
      }
    }
  }
}
</style>
