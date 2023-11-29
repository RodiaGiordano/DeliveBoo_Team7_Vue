<script>
import DishCard from "../dishes/MenuList.vue";

export default {
  data() {
    return {};
  },
  // components: { DishCard },

  props: { restaurant: Object, dishes: Array },
};
</script>

<template>
  {{ console.log(restaurant) }}
  {{ console.log(dishes) }}
</template>

<style lang="scss" scoped></style>
