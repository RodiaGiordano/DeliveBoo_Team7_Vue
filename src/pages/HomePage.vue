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
    };
  },
  computed: {
    prova() {
      let params;
      if (typeof this.userInput === "string" && this.userInput) {
        // console.log(this.userInput);
        console.log("ciao");
        this.userInput = this.userInput.replace(/\s/g, "").toLowerCase();
        params = { params: { filter: this.userInput } };
        // console.log(params);
      }

      if (this.checkFilter.length > 0) {
        params = { params: { filter: this.checkFilter } };
      }

      return params;
    },
  },

  methods: {
    fetchRestaurants(endpoint = store.baseUri + "restaurant/") {
      axios.get(endpoint, this.prova).then((response) => {
        // console.log(response);
        this.restaurants = response.data;
      });
    },

    filterRestaurants(filter) {
      // this.userInput = filter;

      if (typeof filter === "number") {
        // this.userInput = "";
        // console.log(this.userInput);
        if (!this.checkFilter.includes(filter)) {
          this.checkFilter.push(filter);
        } else {
          const checkRemove = this.checkFilter.indexOf(filter);
          this.checkFilter.splice(checkRemove, 1);
        }
      }

      if (typeof filter === "string") {
        // this.userInput = filter;
        let index = 0;
        if (this.checkFilter.length > 0) {
          while (this.checkFilter.length > 0 && index < 30) {
            index++; //di protezione in fase di test, scongiura il loop

            const checkId = this.checkFilter[0];
            const checkRemove = document.getElementById("check-" + checkId);
            checkRemove.checked = false;
            this.checkFilter.shift();
          }
        }
        this.userInput = filter;
      }
      this.prova;
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
            :userInput="userInput"
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
