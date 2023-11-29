<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">DeliveBoo</span>

      <router-link :to="{ name: 'cart' }">
        <button type="button" class="btn btn-primary">
          Carrello
        </button></router-link
      >
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
