<script>
import RestaurantList from "../assets/components/RestaurantList.vue";
import AppAside from "../assets/components/AppAside.vue";

export default {
  data() {
    return {};
  },

  components: {
    RestaurantList,
    AppAside,
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="debug">
          <AppAside></AppAside>
        </div>
      </div>
      <div class="col-9">
        <div class="debug">
          <RestaurantList></RestaurantList>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.debug {
  border: 1px dashed red;
}
</style>
