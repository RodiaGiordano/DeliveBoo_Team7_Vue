<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <nav class="navbar h-sm-80 h-md-90 h-lg-100 p-0 !important">
    <div class="container-fluid">
      <span class="navbar-mobile-logo">
        <router-link :to="{ name: 'homepage' }">
          <img src="../../images/color-no-bg.png" alt="deliveboo-logo" />
        </router-link>
      </span>
      <span class="navbar-full-logo">
        <router-link :to="{ name: 'homepage' }">
          <img src="../../images/no-bg-slogan.png" alt="deliveboo-logo" />
        </router-link>
      </span>

      <span class="icons">
        <!-- <router-link :to="{ name: 'favourites' }"> -->
        <button type="button" class="btn fav-button"><font-awesome-icon icon="fa-regular fa-heart" class="fa-lg" /></button>
        <!-- </router-link> -->
        <router-link :to="{ name: 'cart' }">
          <button type="button" class="btn cart-button"><font-awesome-icon icon="fa-solid fa-cart-shopping" class="fa-lg" /></button
        ></router-link>
      </span>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;

.container-fluid {
  background-color: $bg2-color;
  padding: 0 1rem;

  .navbar-mobile-logo {
    display: block;
    width: 180px;
    height: 90px;
    line-height: 90px;
  }

  .navbar-full-logo {
    display: none;
  }

  button {
    background-color: $bg2-color;
    color: $primary-color;
    border: 0px;
  }
}

// 768px breakpoint
@media screen and (min-width: 768px) {
}

// 1024px breakpoint
@media screen and (min-width: 992px) {
  .navbar-mobile-logo {
    display: none !important;
  }

  .navbar-full-logo {
    display: block !important;
    width: 280px;
    height: 120px;
    line-height: 120px;
  }
}
</style>
