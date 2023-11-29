<script>
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
    addItem(dish) {
      if (dish) {
        this.orderedDish.push(dish);
        console.log(this.orderedDish);
        this.totalPrice += dish.price;
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
          {{ dish.price }}
          <br />
          <button type="button" class="btn btn-primary" @click="addItem(dish)">
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
        {{ item.price }}
      </div>
    </div>

    <h3><b>TOTALE: </b> {{ this.totalPrice }}&euro;</h3>
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
