<script>
import RestaurantList from "../assets/components/Restaurants/RestaurantList.vue";
import AppAside from "../assets/components/AppAside.vue";
import { store } from "../assets/data/store";
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [],
      checkFilter: [],
    };
  },
  methods: {
    fetchRestaurants(endpoint = store.baseUri + "restaurant/") {
      axios
        .get(endpoint, { params: { id: this.checkFilter } })
        .then((response) => {
          this.restaurants = response.data;
        });
    },

    filterRestaurants(filter) {
      if (!this.checkFilter.includes(filter)) {
        this.checkFilter.push(filter);
      } else {
        const checkRemove = this.checkFilter.indexOf(filter);
        this.checkFilter.splice(checkRemove, 1);
      }

      this.fetchRestaurants();
    },
  },

  // computed: {
  //   prova() {
  //     this.elementsId = [1, 2];

  //     return elementsId;
  //   },
  // },

  mounted() {
    this.fetchRestaurants();
  },

  components: {
    RestaurantList,
    AppAside,
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="debug">
          <AppAside @checked="filterRestaurants"></AppAside>
        </div>
      </div>
      <div class="col-9">
        <div class="debug">
          <RestaurantList :restaurants="restaurants"></RestaurantList>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.debug {
  border: 1px dashed red;
}
</style>
