<script>
import { store } from ".././assets/data/store";
export default {
  data() {
    return {
      totalPrice: 0,
      cartStorage: store.cartStorage,
    };
  },

  methods: {
    //Add dish and save it in local storage
    setAmount(dish, mode) {
      let dishInArray = dish.id;
      let dishExists = this.cartStorage.map((dish) => dish.id == dishInArray);

      if (dish && dishExists) {
        if (mode === "inc") {
          this.cartStorage.push(dish);
          this.totalPrice += parseFloat(dish.price);
        } else if (mode === "dec") {
          const index = this.cartStorage.indexOf(dish);
          this.cartStorage.splice(index, 1);
          this.totalPrice -= parseFloat(dish.price);
        }
      }

      this.saveInLocal();
    },

    //Remove dish
    removeItem(dish) {
      let dishInArray = dish.id;
      let dishExists = this.cartStorage.find((dish) => dish.id == dishInArray);

      if (dish && dishExists) {
        const index = this.cartStorage.indexOf(dish);
        this.cartStorage.splice(index, 1);
        this.totalPrice -= parseFloat(dish.price);
      }

      //remove from local Storage
      this.saveInLocal();
    },

    //Svuota carrello
    emptyCart() {
      this.cartStorage = [];
      this.totalPrice = 0;
      localStorage.removeItem("orderedDishIds");
    },

    // STORAGE LOGIC

    //SAVE dish id array as string in local storage
    saveInLocal() {
      if (this.cartStorage.length === 0) {
        localStorage.removeItem("orderedDishIds");
        return;
      }

      const dishIds = this.cartStorage.map((dish) => {
        return dish.id;
      });

      const dishIdsString = JSON.stringify(dishIds);

      localStorage.setItem("orderedDishIds", dishIdsString);
    },

    //RETRIVE what is saved in local storage : parse dish id string to array
    fetchFromLocal() {
      const dishIdsString = localStorage.getItem("orderedDishIds");

      if (dishIdsString) {
        const dishIdsArray = JSON.parse(dishIdsString);

        // Controls
        dishIdsArray.forEach((dishId) => {
          const dish = this.cartStorage.find((dish) => {
            return dish.id === dishId;
          });

          if (dish) {
            this.orderedDish.push(dish);
            this.totalPrice += dish.price;
          }
        });
      }
    },
  },

  mounted() {
    const dishIds = this.cartStorage.map((dish) => {
      console.log(this.totalPrice);
      this.totalPrice += parseFloat(dish.price);
      console.log(this.totalPrice);
      return dish.id;
    });

    const dishIdsString = JSON.stringify(dishIds);
    localStorage.setItem("orderedDishIds", dishIdsString);

    console.log(this.cartStorage);
  },
};
</script>

<template>
  <div class="row">
    <!-- MENU FINTO \\ CANCELLA DOPO TEST -->
    <div class="col-6">
      <h2>Carrello</h2>
      <!-- {{ console.log(this.$route.params.dishId) }} -->
      <ul>
        <div class="dish-menu" v-for="dish in cartStorage">
          {{ dish.name }}
          <br />
          {{ dish.price }}&euro;
          <br />

          <!-- aumenta qty -->
          <button
            type="button"
            class="btn btn-primary"
            @click="setAmount(dish, 'inc')"
          >
            +
          </button>

          <!-- riduci qty -->
          <button
            type="button"
            class="btn btn-danger"
            @click="setAmount(dish, 'dec')"
          >
            -
          </button>

          <!-- rimuovi piatto -->
          <button
            type="button"
            class="btn btn-danger"
            @click="removeItem(dish)"
          >
            Rimuovi
          </button>
        </div>
      </ul>
    </div>

    <h3><b>TOTALE: </b> {{ this.totalPrice.toFixed(2) }}&euro;</h3>
    <button class="btn btn-danger" @click="emptyCart()">Svuota carrello</button>
  </div>
</template>

<style lang="scss" scoped>
.dish-menu,
.cart-item {
  background-color: #b8b8b8;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px;
}
</style>
