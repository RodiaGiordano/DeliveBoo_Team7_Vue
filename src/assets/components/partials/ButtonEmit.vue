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
  <router-link
    :to="{ name: 'menupage', params: { id: elementId } }"
    class="btn btn-primary"
  >
    <font-awesome-icon :icon="['fas', 'utensils']" size="lg" />
    Ordina da questo ristorante
    <font-awesome-icon :icon="['fas', 'utensils']" size="lg" />
  </router-link>
</template>

<style lang="scss" scoped></style>
