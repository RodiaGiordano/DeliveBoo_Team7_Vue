<script>
import { store } from '.././assets/data/store';
import axios from 'axios';
export default {
  data() {
    return {
      totalPrice: 0,
      cartStorage: store.cartStorage,
      axiosDishes: [],
    };
  },

  methods: {
    async fetchRestaurantDetail(endpoint = store.baseUri + 'restaurant/' + localStorage.getItem('restaurantId')) {
      return axios.get(endpoint).then((response) => {
        this.axiosDishes = response.data.dishes;
        //console.log(this.axiosDishes);
      });
    },

    //add dish and save it in local storage
    setAmount(dish, mode) {
      let dishInArray = dish.id;
      let dishExists = this.cartStorage.map((dish) => dish.id == dishInArray);

      if (dish && dishExists) {
        if (mode === 'inc') {
          this.cartStorage.push(dish);
          this.totalPrice += parseFloat(dish.price);
        } else if (mode === 'dec') {
          const index = this.cartStorage.indexOf(dish);
          this.cartStorage.splice(index, 1);
          this.totalPrice -= parseFloat(dish.price);
        }
      }

      this.saveInLocal();
    },

    //Remove dish
    removeItem(dish) {
      //remove from temp storage
      this.cartStorage = this.cartStorage.filter((dishObj) => {
        //handle total price while you are at it lol
        if (dishObj.dish.id == dish.id) {
          this.totalPrice -= dishObj.dish.price * dishObj.qty;
        }
        return dishObj.dish.id !== dish.id;
      });

      //remove from local storage
      let dishIdsString = localStorage.getItem('orderedDishIds');
      if (dishIdsString) {
        let dishIdsArray = JSON.parse(dishIdsString);

        dishIdsArray = dishIdsArray.filter((dishObj) => {
          return dishObj.dish !== dish.id;
        });

        if (dishIdsArray.length > 0) {
          dishIdsString = JSON.stringify(dishIdsArray);
          localStorage.setItem('orderedDishIds', dishIdsString);
        } else {
          localStorage.removeItem('orderedDishIds');
          localStorage.removeItem('restaurantId');
        }
      }
    },

    //Svuota carrello
    emptyCart() {
      this.cartStorage = [];
      this.totalPrice = 0;
      localStorage.removeItem('orderedDishIds');
      localStorage.removeItem('restaurantId');
    },

    // STORAGE LOGIC
    //SAVE dish id array as string in local storage
    saveInLocal() {
      if (this.cartStorage.length === 0) {
        localStorage.removeItem('orderedDishIds');
        return;
      }

      const dishIds = this.cartStorage.map((dish) => {
        return dish.id;
      });

      const dishIdsString = JSON.stringify(dishIds);

      localStorage.setItem('orderedDishIds', dishIdsString);
    },

    //RETRIVE what is saved in local storage : parse dish id string to array
    async fetchFromLocal() {
      const dishIdsString = localStorage.getItem('orderedDishIds');

      if (dishIdsString) {
        const dishIdsArray = JSON.parse(dishIdsString);
        await this.fetchRestaurantDetail();

        //rebuild cartStorage from API call data

        //create array that clearly lists quantities for each single dish, where key is the dish id, value is the quantity - e.g: [{id: qty}]
        const cartLookup = dishIdsArray.reduce((lookup, obj) => {
          lookup[obj.dish] = obj.qty;
          return lookup;
        }, {});

        //then build a fully fleshed out array, with name, price, etc
        this.cartStorage = this.axiosDishes.map((dishObj) => {
          if (cartLookup.hasOwnProperty(dishObj.id)) {
            return {
              dish: dishObj,
              qty: cartLookup[dishObj.id],
            };
          }

          return null;
        });
      }
    },
  },

  async mounted() {
    if (this.cartStorage.length > 0) {
      return;
    } else {
      await this.fetchFromLocal();
    }

    //calculate total price
    this.cartStorage.forEach((e) => {
      this.totalPrice += e.dish.price * e.qty;
    });
  },
};
</script>

<template>
  <div class="row">
    <div class="col-6">
      <h2>Carrello</h2>
      <ul>
        <div class="dish-menu" v-for="dish in cartStorage">
          {{ dish.dish.name }} x{{ dish.qty }}
          <br />
          {{ (dish.dish.price * dish.qty).toFixed(2) }}&euro; ({{ dish.dish.price }}&euro;)
          <br />

          <!-- aumenta qty -->
          <button type="button" class="btn btn-primary" @click="setAmount(dish, 'inc')">+</button>

          <!-- riduci qty -->
          <button type="button" class="btn btn-danger" @click="setAmount(dish, 'dec')">-</button>

          <!-- rimuovi piatto -->
          <button type="button" class="btn btn-danger" @click="removeItem(dish.dish)">Rimuovi</button>
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
