<script>
export default {
  data() {
    return {
      title: "Hello world",
    };
  },

  props: { dish: Object },
};
</script>

<template>
  {{ console.log(dish) }}
</template>

<style lang="scss" scoped></style>
