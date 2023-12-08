<script>
import { store } from '../assets/data/store';
import axios from 'axios';
import AppAside from '../assets/components/AppAside.vue';
import RestaurantList from '../assets/components/Restaurants/restaurantlist.vue';
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      restaurants: [],
      checkFilter: [],
      userInput: '',
      boxChecked: false,
    };
  },
  computed: {
    paramsFactory() {
      if (typeof this.userInput === 'string' && this.userInput) {
        this.userInput = this.userInput.replace(/\s/g, '').toLowerCase();
        return { params: this.userInput };
      }

      if (this.checkFilter.length > 0) {
        return { params: this.checkFilter };
      }
    },
  },

  methods: {
    fetchRestaurants(endpoint = store.baseUri + 'restaurant/') {
      axios.get(endpoint, { params: this.paramsFactory }).then((response) => {
        console.log(this.paramsFactory);
        this.restaurants = response.data;
      });
    },

    filterRestaurants(filter) {
      if (typeof filter === 'number') {
        this.boxChecked = true;
        this.userInput = '';

        if (!this.checkFilter.includes(filter)) {
          this.checkFilter.push(filter);
        } else {
          const checkRemove = this.checkFilter.indexOf(filter);

          this.checkFilter.splice(checkRemove, 1);
        }
      }

      if (typeof filter === 'string') {
        this.boxChecked = false;

        if (this.checkFilter.length > 0) {
          while (this.checkFilter.length > 0) {
            const checkId = this.checkFilter[0];
            const checkRemove = document.getElementById('check-' + checkId);
            checkRemove.checked = false;
            this.checkFilter.shift();
          }
        }
        this.userInput = filter;
      }
      this.paramsFactory;
      this.fetchRestaurants();
    },
  },

  mounted() {
    this.fetchRestaurants();
  },

  components: {
    RestaurantList,
    AppAside,
    RouterLink,
  },
};
</script>

<template>
  <div class="row">
    <div class="app-aside col-lg-3">
      <AppAside @checked="filterRestaurants" :boxChecked="boxChecked"></AppAside>
    </div>
    <div class="restaurant-list col-lg-9">
      <RestaurantList :restaurants="restaurants"></RestaurantList>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
