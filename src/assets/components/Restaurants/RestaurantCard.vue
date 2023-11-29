<script>
import ButtonEmit from "../partials/ButtonEmit.vue";

export default {
  data() {
    return {
      menu: [],
    };
  },

  methods: {},

  components: {
    ButtonEmit,
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
      <ButtonEmit></ButtonEmit>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
