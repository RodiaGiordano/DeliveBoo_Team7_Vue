<script>
export default {
  data() {
    return {};
  },

  props: { restaurant: Object },
};
</script>

<template>
  <div class="card mb-3">
    <img :src="restaurant.image" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ restaurant.restaurant_name }}</h5>
      <p>{{ restaurant.address }}</p>
      <p class="card-text">
        {{ restaurant.description }}
      </p>
      <p v-for="typeEl in restaurant.types" class="card-text">
        <small class="text-body-secondary">{{ typeEl.name }}</small>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
