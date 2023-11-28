<script>
export default {
  data() {
    return {};
  },

  props: { element: Object },
};
</script>

<template>
  <div class="card mb-3">
    <img :src="element.image" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">
        {{ element.restaurant_name }}
      </h5>
      <p>{{ element.address }}</p>
      <p class="card-text">
        {{ element.description }}
      </p>
      <p v-for="typeEl in element.types" class="card-text">
        <small class="text-body-secondary">{{ typeEl.name }}</small>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
