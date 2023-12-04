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
    <div class="restaurant-jumbotron-mobile"></div>

    <!-- r image -->
    <div class="restaurant-details rounded-top">
      <div class="restaurant-image">
        <img :src="restaurant.image || '../../images/color-no-bg.png'" alt="" class="img-fluid" />
      </div>
      <!-- r info -->
      <div class="restaurant-info">
        <h2>{{ restaurant.restaurant_name }}</h2>
        <span v-for="typeEl in restaurant.types" :key="typeEl.id">
          <small class="text-body-secondary"> &bull; {{ typeEl.name }}</small>
        </span>
        <p class="address"><font-awesome-icon class="pin" icon="fa-solid fa-map-pin"></font-awesome-icon> {{ restaurant.address }}</p>
        <p class="des"><span> Su di noi: </span> <br />{{ restaurant.description }}</p>
      </div>
    </div>

    <!-- Dishes -->
    <div class="dishes">
      <h3>Menu</h3>
      <ul class="dish-list">
        <li v-for="dish in dishes" :key="dish.id">
          <DishCard :dish="dish"></DishCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;

// .restaurant-jumbotron-full {
//   display: none;
// }

.menulist {
  width: 100%;

  .restaurant-jumbotron-mobile {
    background-image: url('../../images/jumbo-menuList2.jpg');
    height: 150px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .restaurant-info {
    //non funzia
    border-top-right-radius: 100px;
    border-top-left-radius: 100px;
    text-align: center;

    padding: 1.8rem;

    .des {
      padding-top: 0.8rem;

      span {
        font-weight: 700;
        color: $primary-color;
      }
    }
    .address {
      padding-top: 0.8rem;

      .pin {
        color: $primary-color;
      }
    }
  }
}

// @media screen and (min-width: 992px) {
// .restaurant-jumbotron-mobile {
//   display: none;
// }

// .restaurant-jumbotron-full {
//   display: block;

//   position: relative;

//   .image {
//     width: 100%;
//     max-width: 100%;
//     height: auto;
//     object-fit: cover;
//   }

//   .restaurant-details {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: $bg-color;
//     border: 2px solid $bg2-color;
//     padding: 1.5rem;
//     border-radius: 25px;
//     width: 80%;

//     text-align: center;
//   }

//   .dishes {
//     margin-top: 5rem;
//   }
//   }
// }
</style>
