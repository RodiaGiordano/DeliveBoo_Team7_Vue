<script>
import DishCard from './DishCard.vue';

export default {
  data() {
    return {};
  },
  components: { DishCard },

  props: { restaurant: Object, dishes: Array },
};
</script>

<template>
  <!-- jumbotron -->
  <div class="menulist">
    <!-- MOBILE -->
    <div class="restaurant-jumbotron-mobile"></div>
    <!-- r image -->
    <div class="restaurant-details-mobile">
      <div class="restaurant-image">
        <img :src="restaurant.image || '../../images/color-no-bg.png'" alt="" class="img-fluid" />
      </div>
      <!-- r info -->
      <div class="restaurant-info">
        <h2>{{ restaurant.restaurant_name }}</h2>
        <p class="mb-2">
          <span v-for="typeEl in restaurant.types" :key="typeEl.id">
            <small class="text-body-secondary"> &bull; {{ typeEl.name }}</small>
          </span>
        </p>
        <p class="mb-2"><span> &bull; Ordine min. 10€ &bull; Consegna 1€ </span></p>
        <p class="address mb-1"><font-awesome-icon class="pin" icon="fa-solid fa-map-pin"></font-awesome-icon> {{ restaurant.address }}</p>
        <p><font-awesome-icon icon="fa-regular fa-clock" class="clock"></font-awesome-icon> <span>Consegna in 20 min.</span></p>

        <p class="des"><span> Su di noi: </span> <br />{{ restaurant.description }}</p>
      </div>
    </div>

    <!-- FULL SCREEN -->
    <div class="restaurant-jumbotron-full">
      <!-- r image -->
      <div class="restaurant-details-full">
        <div class="restaurant-image">
          <img v-if="restaurant.image" :src="restaurant.image" alt="" class="img-fluid" />
          <div v-else></div>
        </div>
        <!-- r info -->
        <div class="restaurant-info">
          <h2>{{ restaurant.restaurant_name }}</h2>
          <p class="mb-2">
            <span v-for="typeEl in restaurant.types" :key="typeEl.id">
              <small class="text-body-secondary"> &bull; {{ typeEl.name }}</small>
            </span>
          </p>
          <p class="mb-2"><span> &bull; Ordine min. 10€ &bull; Consegna 1€ </span></p>
          <p class="address mb-1"><font-awesome-icon class="pin" icon="fa-solid fa-map-pin"></font-awesome-icon> {{ restaurant.address }}</p>
          <p><font-awesome-icon icon="fa-regular fa-clock" class="clock"></font-awesome-icon> <span>Consegna in 20 min.</span></p>

          <p class="des"><span> Su di noi: </span> <br />{{ restaurant.description }}</p>
        </div>
      </div>
    </div>
    <!-- Dishes -->
    <div class="dishes">
      <p>Menu</p>
      <!-- <div class="dish-list"> -->
      <div v-for="dish in dishes" :key="dish.id">
        <DishCard :dish="dish"></DishCard>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;
.menulist {
  width: 100%;

  .restaurant-jumbotron-full {
    display: none;
  }

  .restaurant-jumbotron-mobile {
    display: block;
    background-image: url('../../images/jumbo-menuList2.jpg');
    height: 150px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .restaurant-details-mobile {
    position: relative;
    border: 1px solid $bg-color;
    .restaurant-image {
      width: 100px;
      height: 100px;

      position: absolute;
      top: -10%;
      // right: 0;
      left: 8%;
      margin: auto;
    }
  }
  .restaurant-info {
    padding: 4rem 1.8rem 1rem;

    .des {
      span {
        font-weight: 700;
      }
    }

    .pin,
    .clock {
      color: $primary-color;
    }
  }

  .dishes {
    padding: 1rem 1.8rem 1rem;

    p {
      color: $primary-color;
      font-style: oblique;
      font-weight: 700;
      font-size: 2rem;
    }
  }
}

@media screen and (min-width: 768px) {
}

@media screen and (min-width: 992px) {
  .restaurant-jumbotron-mobile {
    display: none !important;
  }
  .restaurant-details-mobile {
    display: none !important;
  }

  .restaurant-jumbotron-full {
    display: block !important;
    background-image: url('../../images/jumbo-menuList1.jpg');
    height: 500px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .restaurant-image {
      width: 200px !important;
      height: 150px !important;
    }
    .restaurant-details-full {
      position: relative;

      background-color: $bg-color;
      border: 1px solid $bg2-color;
      border-radius: 50px;
      width: 65%;

      position: absolute;
      left: 0;
      right: 0;
      bottom: -30%;
      margin: auto;
      .restaurant-info {
        padding: 8rem 1.8rem 1rem;
      }
      .restaurant-image {
        position: absolute;
        left: 0;
        right: 0;
        top: -10%;
        margin: auto;
      }
    }
  }
  .dishes {
    padding-top: 9rem !important;
  }
}
</style>
