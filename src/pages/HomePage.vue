<!-- fare il check sul response.config della chiamata axios per vedere se la trasmissione di dati gfunziona

attualmente all'interimento di un valore nell'input tutte le checkbox perdono il checked e vengono rimosse dall'array
l'input della barra di ricerca diventa un array in cui non è mai possibile avere spazi e quindi valori null
inoltre è possibile cancellare anche lettere alternate o aggiungerne e l'array rispetterà l'ordine-->

<script>
import { store } from "../assets/data/store";
import axios from "axios";
import AppAside from "../assets/components/AppAside.vue";
import RestaurantList from "../assets/components/Restaurants/restaurantlist.vue";

export default {
  data() {
    return {
      restaurants: [],
      checkFilter: [],
      userInput: "",
      boxChecked: false,
    };
  },
  computed: {
    paramsFactory() {
      let params;
      if (typeof this.userInput === "string" && this.userInput) {
        this.userInput = this.userInput.replace(/\s/g, "").toLowerCase();
        params = { params: { filter: this.userInput } };
      }

      if (this.checkFilter.length > 0) {
        params = { params: { filter: this.checkFilter } };
      }

      return params;
    },
  },

  methods: {
    fetchRestaurants(endpoint = store.baseUri + "restaurant/") {
      axios.get(endpoint, this.paramsFactory).then((response) => {
        this.restaurants = response.data;
      });
    },

    filterRestaurants(filter) {
      if (typeof filter === "number") {
        this.boxChecked = true;

        if (!this.checkFilter.includes(filter)) {
          this.checkFilter.push(filter);
        } else {
          const checkRemove = this.checkFilter.indexOf(filter);
          this.checkFilter.splice(checkRemove, 1);
        }
      }

      if (typeof filter === "string") {
        this.boxChecked = false;

        if (this.checkFilter.length > 0) {
          while (this.checkFilter.length > 0) {
            const checkId = this.checkFilter[0];
            const checkRemove = document.getElementById("check-" + checkId);
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
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="debug">
          <AppAside
            @checked="filterRestaurants"
            :boxChecked="boxChecked"
          ></AppAside>
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
