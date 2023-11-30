<script>
export default {
  data() {
    return {};
  },

  props: { dish: Object },
};
</script>

<template>

    <div class=" dish-card row d-flex">
        <div class="dish-image col-4 ">
            <img :src="dish.image" class="card-img" />
        </div>
        <div class="dish-body col-8">
            <h5 class="card-title">{{ dish.name }}</h5>
            <p class="card-text">{{ dish.description }}</p>
            <p>{{ dish.price }} €</p>
            <p v-for="typeEl in dish.courses" class="card-text">
                <small class="text-body-secondary">{{ typeEl.name }}</small>
            </p>
        </div>
</div>




</template>

<style lang="scss" scoped>

.dish-card {
  display: flex;
  width: 100%;
  margin: 1rem;

  .dish-img {
    width: 100%;
  }
}




</style>
