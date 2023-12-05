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
    <div class="res card">
      <div v-if="element.image" class="res-image">
        <img :src="element.image" class="res-img-top" />
      </div>
      <!-- <div v-else class="res-image-t d-none">
        <img src="../../images/placeholder.png" class="res-img-top" />
      </div> -->

      <div class="res-body">
        <h5 class="res-title mb-0">
          {{ element.restaurant_name }}
        </h5>
        <span v-for="typeEl in element.types" class="res-text">
          <small class="text-body-secondary">&bull; {{ typeEl.name }}</small>
        </span>
        <p><font-awesome-icon class="pin" icon="fa-solid fa-map-pin"></font-awesome-icon> {{ element.address }}</p>
        <p class="res-text">
          <!-- {{ element.description }} -->
        </p>
        <ButtonEmit :elementId="element.id"></ButtonEmit>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.res.card {
  width: 80vw;
  height: 330px;
  border-radius: 25px;
  overflow: hidden;
  .res-img-top {
    height: 150px;
  }

  .res-body {
    padding: 1rem;
  }
}

@media screen and (min-width: 768px) {
  .res.card {
    width: 60vw;
    height: 400px;
    border-radius: 25px;
    overflow: hidden;
    .res-img-top {
      height: 200px;
    }

    .res-body {
      padding: 1rem;
    }
  }
}
</style>
