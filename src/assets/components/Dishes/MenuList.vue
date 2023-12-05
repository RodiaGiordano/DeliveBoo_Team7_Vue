<script>
import DishCard from './DishCard.vue';

export default {
  data() {
    return {
      selectedCourse: null,
    };
  },
  computed: {
    filteredDishes() {
      if (!this.selectedCourse) {
        return this.dishes;
      }
      console.log(this.dishes);
      return this.dishes.filter((dish) => dish.course.name === this.selectedCourse);
    },
  },
  methods: {
    selectCourse(courseName) {
      this.selectedCourse = courseName;
    },
  },

  components: { DishCard },

  props: { restaurant: Object, dishes: Array, courses: Array },
};
</script>

<template>
  <!-- jumbotron -->
  <div class="menulist">
    <div class="restaurant-jumbotron"></div>
    <!-- r image -->
    <div class="restaurant-details">
      <div v-if="restaurant.image" class="restaurant-image">
        <img :src="restaurant.image" alt="" class="img-fluid" />
      </div>
      <div v-else-if="restaurant.image === 'http://127.0.0.1:8000/storage/'"></div>
      <!-- {{ restaurant.image }} -->
      <!-- r info -->
      <div class="restaurant-info">
        <div data-v-f24f87aa class="restaurant-details"></div>
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
    <hr />

    <!-- Filtered corses -->
    <div class="row">
      <div class="col-3 courses-filter">
        <ul v-for="course in courses">
          <li @click="selectCourse(course.name)" class="course-name">{{ course.name }}</li>
          <!-- <hr class="course-hr" /> -->
        </ul>
      </div>

      <!-- Dishes -->
      <div class="dishes col-8">
        <p>Menu</p>
        <!-- <div class="dish-list"> -->
        <div v-for="dish in filteredDishes" :key="dish.id">
          <DishCard :dish="dish"></DishCard>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;
.menulist {
  width: 100%;

  .restaurant-jumbotron {
    background-image: url('../../images/jumbo-menuList2.jpg');
    height: 150px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .restaurant-details {
    position: relative;
    .restaurant-image {
      width: 120px;
      border-radius: 15px;
      overflow: hidden;

      position: absolute;
      left: 1.8rem;
      top: -10%;
    }

    image {
      width: 100%;
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
    padding: 1rem 0;

    p {
      color: $primary-color;
      font-style: oblique;
      font-weight: 700;
      font-size: 2rem;
    }
  }
  .courses-filter {
    margin: 1rem 0.5rem 0 1.8rem;
    :hover > * {
      background-color: rgbA(58, 151, 15, 0.1);
    }
    :active > * {
      background-color: rgbA(58, 151, 15, 0.2);
    }

    .course-name {
      padding: 5%;
      font-weight: 600;
    }
  }
}

@media screen and (min-width: 768px) {
  .restaurant-details {
    .restaurant-image {
      width: 140px !important;
    }
  }
}

@media screen and (min-width: 992px) {
  .restaurant-image {
    width: 150px !important;
    object-fit: 1 !important;
  }
}
</style>
