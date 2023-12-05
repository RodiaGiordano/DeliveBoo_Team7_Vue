<script>
import { store } from '../assets/data/store';
import axios from 'axios';
import MenuList from '../assets/components/Dishes/MenuList.vue';

export default {
  data() {
    return {
      restaurant: {},
      dishes: [],
      courses: [],
    };
  },
  components: {
    MenuList,
  },
  methods: {
    fetchRestaurantDetail(endpoint = store.baseUri + 'restaurant/' + this.$route.params.id) {
      axios.get(endpoint).then((response) => {
        this.restaurant = response.data.restaurant;
        this.dishes = response.data.dishes;
        this.courses = response.data.courses;
      });
    },
  },

  mounted() {
    this.fetchRestaurantDetail();
  },
};
</script>

<template>
  <MenuList :restaurant="restaurant" :dishes="dishes" :courses="courses"></MenuList>
</template>

<style lang="scss" scoped></style>
