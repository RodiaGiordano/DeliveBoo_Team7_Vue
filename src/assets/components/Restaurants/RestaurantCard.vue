<script>
import ButtonEmit from '../partials/ButtonEmit.vue';

export default {
  data() {
    return {};
  },

  methods: {},

  components: {
    ButtonEmit,
  },

  props: { element: Object },
};
</script>

<template>
  <router-link :to="{ name: 'menupage', params: { id: element.id } }">
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
        <ButtonEmit :elementId="element.id"></ButtonEmit>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped></style>
