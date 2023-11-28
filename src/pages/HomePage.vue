<script>
import RestaurantList from "../assets/components/RestaurantList.vue";
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
        .get(endpoint, { params: { Id: this.checkFilter } })
        .then((response) => {
          this.restaurants = response.data;
        });
    },

    filterRestaurants(filter) {
      if (!this.checkFilter.includes(filter)) {
        this.checkFilter.push(filter);

        console.log("checkbox id: " + filter + " aggiunto");
        console.log("chiamata effettuata con parametri: " + this.checkFilter);
      } else {
        const checkRemove = this.checkFilter.indexOf(filter);
        this.checkFilter.splice(checkRemove, 1);

        console.error("checkbox id: " + filter + " rimosso");
      }
      this.fetchRestaurants();
      // console.log(this.checkFilter);
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
