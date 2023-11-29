<script>
import MenuPage from "../../../pages/MenuPage.vue";

export default {
  data() {
    return {};
  },

  props: { elementId: Number },
};
</script>

<template>
  {{ console.log(elementId) }}
  <router-link
    :to="{ name: 'menupage', params: { id: elementId } }"
    class="btn btn-primary"
  >
    <font-awesome-icon :icon="['fas', 'utensils']" size="lg" /> Menù
  </router-link>
</template>

<style lang="scss" scoped></style>
