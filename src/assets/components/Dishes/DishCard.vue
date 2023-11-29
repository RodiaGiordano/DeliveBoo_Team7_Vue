<script>
export default {
  data() {
    return {};
  },

  props: { dish: Object },
};
</script>

<template>
  <div class="card mb-3">
    <img :src="dish.image" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">
        {{ dish.restaurant_name }}
      </h5>
      <p>{{ dish.address }}</p>
      <p class="card-text">
        {{ dish.description }}
      </p>
      <!-- <p v-for="typeEl in dish.course" class="card-text">
        <small class="text-body-secondary">{{ typeEl.name }}</small>
      </p> -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
