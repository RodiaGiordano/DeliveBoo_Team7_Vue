<script>
import MenuPage from '../../../pages/MenuPage.vue';

export default {
  data() {
    return {};
  },

  props: { elementId: Number },
};
</script>

<template>
  <router-link
    :to="{
      name: 'menupage',
      params: { id: elementId },
    }"
    class="btn"
  >
    <!-- <font-awesome-icon :icon="['fas', 'utensils']" size="lg" /> -->
    Ordina
    <font-awesome-icon :icon="['fas', 'utensils']" size="lg" />
  </router-link>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;

.btn {
  background-color: $primary-color;
  color: $secondary-font-color;
}
</style>
