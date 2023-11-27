<script>
import RestaurantList from "../assets/components/RestaurantList.vue";
import AppAside from "../assets/components/AppAside.vue";
import { store } from "../assets/data/store";
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  methods: {
    fetchRestaurants(endpoint = store.baseUri + "restaurant") {
      if (endpoint.url) endpoint = endpoint.url;

      axios.get(endpoint).then((response) => {
        this.restaurants = response.data;
      });
    },
  },
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
          <AppAside @fetchType="fetchRestaurants"></AppAside>
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
