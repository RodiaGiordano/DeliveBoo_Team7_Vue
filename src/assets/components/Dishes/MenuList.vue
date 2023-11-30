<script>
import DishCard from "./DishCard.vue";

export default {
  data() {
    return {};
  },
  components: { DishCard },

  props: { restaurant: Object, dishes: Array },
};
</script>

<template>
  <!-- <div class="prova d-flex">
    <div class="card mb-3 w-50">
      <img :src="restaurant.image" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">
          {{ restaurant.restaurant_name }}
        </h5>
        <p>{{ restaurant.address }}</p>
        <p class="card-text">
          {{ restaurant.description }}
        </p>
        <p v-for="typeEl in restaurant.types" class="card-text">
          <small class="text-body-secondary">{{ typeEl.name }}</small>
        </p>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="dish in dishes">
          {{ dish.name }}
        </li>
      </ul>
    </div>
  </div>
  <ul>
    <li v-for="dish in dishes">
      <DishCard :dish="dish"></DishCard>
    </li>
  </ul> -->

  <!-- Restaurant -->

  <!-- jumbotron -->
<div class="menulist">
  <div class="restaurant-jumbotron">
    <img src="https://media.istockphoto.com/id/1409236261/fi/valokuva/terveellinen-ruoka-terveellisen-ruokavalion-tausta-hedelm%C3%A4t-vihannekset-marja-kasvissy%C3%B6j%C3%A4.jpg?s=1024x1024&w=is&k=20&c=fLKNOcz6qMH4Su67AJeJPlXm_q1Sill24zBP33BR3mI=" class="restaurant-jumbo" />
  </div>

  <!-- r image -->
  <div class="restaurant-details">
    <div class="restaurant-image">
      <img :src="restaurant.image" alt="" class="img-fluid">
    </div>
    <!-- r info -->
    <div class="restaurant-info">
      <h2>{{ restaurant.restaurant_name }}</h2>
      <span v-for="typeEl in restaurant.types" :key="typeEl.id">
        <small class="text-body-secondary"> &bull; {{ typeEl.name }}</small>
      </span>
      <p> <font-awesome-icon icon="fa-solid fa-map-pin"></font-awesome-icon> {{ restaurant.address }}</p>
      <p>Descrizione: {{ restaurant.description }}</p>
      <div class="restaurant-types">
      </div>
      </div>
    </div>
<br>
    <!-- Dishes -->
    <div class="dishes">
      <h3>Menu</h3>
        <ul class="dish-list">
          
            <li v-for="dish in dishes" :key="dish.id">
                <DishCard :dish="dish"></DishCard>
                <button class="add-to-cart btn btn-danger"><font-awesome-icon icon ="fa-solid fa-cart-plus"></font-awesome-icon ></button>
                
            </li>
        </ul>
    </div>
</div>

</template>

<style lang="scss" scoped>
.menulist {
  .restaurant-jumbotron {
    position: relative;
    width: 100wh;
    
    .restaurant-jumbo {
      width: 100%;
      height: 500px;
      object-fit: 1;
    }
  }
  
  .restaurant-details {
    position: absolute;
    top: 90%;
    left: 50%;
    
    transform: translate(-50%, -50%);
    background-color: rgba(245, 245, 245);
    border: 1px solid rgb(0, 0, 0);
    padding: 1rem;
    border-radius: 15px;
    width: 80%;

    text-align: center;

  }
}
.dishes {
  margin: 4rem 1rem;

  h3 {
    margin: 2rem 0;
  }
  .dish-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      display: flex;
      flex-direction: row;
      padding-right: 2rem;
      
      .add-to-cart {
        align-self: center;
        // margin-top: 2rem;
      }
    }
  }
}


</style>
