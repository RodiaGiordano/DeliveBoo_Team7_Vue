<script>
import DishCard from "../assets/components/Dishes/DishCard.vue";

export default {
  data() {
    return {
      orderedDish: [],
      totalPrice: 0,

      //fake menu - cancellare dopo test!!!!!!!
      fakeMenu: [
        {
          name: "Pasta alla carbonara",
          price: 12.5,
          id: 1,
        },
        {
          name: "Pasta al forno",
          price: 19.5,
          id: 2,
        },
        {
          name: "Cotoletta",
          price: 9.1,
          id: 3,
        },
        {
          name: "Pasta al pomodoro",
          price: 5,
          id: 4,
        },
      ],
    };
  },

  methods: {
    addItem(dish, amount) {
      //test for now - delete later
      amount = 1;

      let dishExists = this.fakeMenu.find((dish) => dish.id == dish.id);

      if (dish && dishExists) {
        for (i = 1; i <= amount; i++) {
          this.orderedDish.push(dish);
          console.log(this.orderedDish);
          this.totalPrice += dish.price;
        }
      }
    },

    removeItem(dish) {
      let dishExists = this.orderedDish.find((dish) => dish.id == dish.id);

      if (dish && dishExists) {
        const index = this.orderedDish.indexOf(dish);
        this.orderedDish.splice(index, 1);
        console.log(this.orderedDish);
        this.totalPrice -= dish.price;
      }
    },
  },
};
</script>

<template>
  <div class="row">
    <!-- MENU FINTO \\ CANCELLA DOPO TEST -->
    <div class="col-6">
      <h2>Menu Risto a cazzo</h2>
      <ul>
        <div class="dish-menu" v-for="dish in fakeMenu">
          {{ dish.name }}
          <br />
          {{ dish.price }}&euro;
          <br />
          <button
            type="button"
            class="btn btn-primary"
            @click="addItem(dish, amount)"
          >
            Aggiungi al carrello
          </button>
        </div>
      </ul>
    </div>

    <!-- CARRELLO -->
    <div class="col-6">
      <h2>Carrello</h2>
      <div class="cart-item" v-for="item in orderedDish">
        {{ item.name }}
        <br />
        {{ item.price }}&euro;
        <br />
        <button type="button" class="btn btn-danger" @click="removeItem(item)">
          Rimuovi dal carrello
        </button>
      </div>
    </div>

    <h3><b>TOTALE: </b> {{ this.totalPrice.toFixed(2) }}&euro;</h3>
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
