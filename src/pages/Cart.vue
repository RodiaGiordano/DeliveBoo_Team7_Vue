<script>
import { store } from '.././assets/data/store';
import axios from 'axios';
export default {
  data() {
    return {
      totalPrice: 0,
      cartStorage: store.cartStorage || [],
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

    setAmount(dish, mode) {
      //local storage part
      let dishIdsString = localStorage.getItem('orderedDishIds');
      let dishIdsArray = null;

      if (dishIdsString) {
        dishIdsArray = JSON.parse(dishIdsString);

        let index = dishIdsArray.findIndex((item) => item.id === dish.id);

        if (index !== -1) {
          if (mode === 'inc') {
            dishIdsArray[index].qty++;
          } else if (mode === 'dec' && dishIdsArray[index].qty > 0) {
            dishIdsArray[index].qty--;
          }

          if (dishIdsArray[index].qty === 0) {
            dishIdsArray.splice(index, 1);
          }
        }

        if (dishIdsArray.length > 0) {
          dishIdsString = JSON.stringify(dishIdsArray);
          localStorage.setItem('orderedDishIds', dishIdsString);
        } else {
          this.emptyCart();
        }
      }

      //cart storage part
      this.cartStorage = this.cartStorage.map((item) => {
        if (item.dish.id === dish.id) {
          if (mode === 'inc') {
            item.qty++;
            this.totalPrice += parseFloat(item.dish.price);
          } else if (mode === 'dec') {
            item.qty--;
            this.totalPrice -= parseFloat(item.dish.price);
          }

          if (item.qty === 0) {
            return null;
          }
        }

        return item;
      });

      this.cartStorage = this.cartStorage.filter(function (el) {
        return el != null;
      });
    },

    //Remove dish
    removeItem(dish) {
      //remove from temp storage
      this.cartStorage = this.cartStorage.filter((item) => {
        //handle total price while you are at it lol
        if (item.dish.id == dish.id) {
          this.totalPrice -= item.dish.price * item.qty;
        }
        return item.dish.id !== dish.id;
      });

      //remove from local storage
      let dishIdsString = localStorage.getItem('orderedDishIds');
      if (dishIdsString) {
        let dishIdsArray = JSON.parse(dishIdsString);

        dishIdsArray = dishIdsArray.filter((item) => {
          return item.dish !== dish.id;
        });

        if (dishIdsArray.length > 0) {
          dishIdsString = JSON.stringify(dishIdsArray);
          localStorage.setItem('orderedDishIds', dishIdsString);
        } else {
          this.emptyCart();
        }
      }
    },

    //Svuota carrello
    emptyCart() {
      this.cartStorage.splice(0);
      this.totalPrice = 0;
      localStorage.removeItem('orderedDishIds');
      localStorage.removeItem('restaurantId');
    },

    // STORAGE LOGIC
    //RETRIVE what is saved in local storage : parse dish id string to array
    async fetchFromLocal() {
      const dishIdsString = localStorage.getItem('orderedDishIds');

      if (dishIdsString) {
        const dishIdsArray = JSON.parse(dishIdsString);
        await this.fetchRestaurantDetail();

        //rebuild cartStorage from API call data

        //create array that clearly lists quantities for each single dish, where key is the dish id, value is the quantity - e.g: [{id: qty}]
        const cartLookup = dishIdsArray.reduce((lookup, obj) => {
          lookup[obj.id] = obj.qty;
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

          //return null;
        });

        this.cartStorage = this.cartStorage.filter(function (el) {
          return el != null;
        });
      }
    },
  },

  async created() {
    if (this.cartStorage && this.cartStorage.length > 0) {
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
        <div class="dish-menu" v-for="item in cartStorage">
          <div v-if="item != null">
            {{ item.dish.name }} - x{{ item.qty }}
            <br />
            {{ (item.dish.price * item.qty).toFixed(2) }}&euro; ({{ item.dish.price }}&euro;)
            <br />
            <!-- aumenta qty -->
            <button type="button" class="btn btn-primary" @click="setAmount(item.dish, 'inc')">+</button>
            <!-- riduci qty -->
            <button type="button" class="btn btn-danger" @click="setAmount(item.dish, 'dec')">-</button>
            <!-- rimuovi piatto -->
            <button type="button" class="btn btn-danger" @click="removeItem(item.dish)">Rimuovi</button>
          </div>
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
