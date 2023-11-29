<script>
import MenuList from "../assets/components/Dishes/MenuList.vue";
import { store } from "../assets/data/store";
import axios from "axios";

export default {
  data() {
    return {
      restaurant: {},
      dishes: [],
    };
  },
  methods: {
    fetchRestaurantDetail(
      endpoint = store.baseUri + "restaurant/" + this.$route.params.id
    ) {
      axios.get(endpoint).then((response) => {
        this.restaurant = response.data.restaurant;
        this.dishes = response.data.dishes;
      });
    },
  },

  mounted() {
    this.fetchRestaurantDetail();
  },

  components: {
    MenuList,
  },
};
</script>

<template>
  <MenuList></MenuList>
</template>

<style lang="scss" scoped></style>
