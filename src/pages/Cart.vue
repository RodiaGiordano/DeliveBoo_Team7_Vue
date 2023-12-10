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
          return item.id !== dish.id;
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
  <div class="container cart mt-3">
    <!-- items list -->
    <div class="row gx-5">
      <div class="col-md-6">
        <h2>Il <span>tuo</span> ordine</h2>

        <ul class="p-0">
          <div class="item card flex flex-row" v-for="item in cartStorage">
            <!-- item image -->
            <div class="item-preview">
              <img :src="item.dish.image" :alt="item.dish.name" />
            </div>

            <!-- item name, price, quantity -->
            <div class="item-info">
              <div v-if="item != null">
                <h4>{{ item.dish.name }}</h4>
                <i
                  ><p>{{ item.qty }} <span v-if="item.qty > 1">pezzi</span> <span v-else>pezzo</span></p></i
                >

                {{ (item.dish.price * item.qty).toFixed(2) }}&euro; <span v-show="item.qty > 1">({{ item.dish.price }}&euro;)</span>

                <!-- aumenta qty -->
                <button type="button" class="btn add_button" @click="setAmount(item.dish, 'inc')"><font-awesome-icon icon="fa-solid fa-plus" /></button>
                <!-- riduci qty -->
                <button type="button" class="btn btn-danger" @click="setAmount(item.dish, 'dec')"><font-awesome-icon :icon="['fas', 'minus']" /></button>
              </div>
            </div>

            <!-- rimuovi piatto -->
            <button type="button" class="btn delete_item" @click="removeItem(item.dish)">X</button>
          </div>
        </ul>
      </div>

      <!-- order recap -->

      <div class="col-md-6">
        <h2>Il <span>tuo</span> riepilogo</h2>
        <div class="container recap_div">
          <ul>
            <li v-for="item in cartStorage">
              <b>{{ item.dish.name }}</b> x{{ item.qty }} - {{ (item.dish.price * item.qty).toFixed(2) }}&euro;
            </li>
            <hr />
          </ul>

          <h3><b>TOTALE: </b> {{ this.totalPrice.toFixed(2) }}&euro;</h3>
          <button class="btn btn-danger" @click="emptyCart()">Svuota carrello</button>
          <RouterLink :to="{ name: 'checkout' }" v-show="this.cartStorage.length > 0"><button class="btn add_button">Vai al checkout</button></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.cart {
  margin-bottom: 250px;
}
h2 {
  font-weight: 700;
  span {
    font-style: oblique;
    color: $primary-color;
  }
}

.item.card {
  width: 100%;
  height: 125px;
  border-radius: 25px;
  padding: 5px;
  gap: 1em;
  margin-bottom: 0.5em;

  img {
    aspect-ratio: 1;
    border-radius: 20px;
  }

  .item-preview {
    aspect-ratio: 1;
  }

  .res-body {
    padding: 1rem;
  }
}

.item-info {
  position: relative;

  p,
  span {
    margin: 0;
    padding: 0;
  }

  h4 {
    color: $primary-color;
    margin: 0;
  }
}

.delete_item {
  background-color: $typology-color;
  color: #ada7a2;
  aspect-ratio: 1;
  border-radius: 100%;
  position: absolute;
  top: -10px;
  right: -10px;
}

.add_button {
  background-color: $secondary-color;
  color: white;
}

.dish-menu,
.cart-item {
  background-color: #b8b8b8;
  border-radius: 5px;
  margin-bottom: 5px;
}

.recap_div {
  background-color: $secondary-font-color;
  border-radius: 25px;
  padding: 10px;

  ul > li:nth-child(2n) {
    background-color: rgba($color: $bg2-color, $alpha: 0.08);
  }
}
</style>
