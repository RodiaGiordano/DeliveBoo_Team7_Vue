<script>
import MenuList from "../assets/components/Dishes/MenuList.vue";
import { store } from "../assets/data/store";
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    fetchRestaurants(
      endpoint = store.baseUri + "restaurant/" + this.$route.params.id
    ) {
      console.log(endpoint);
      axios.get(endpoint).then((response) => {
        this.restaurants = response.data;
      });
    },
  },

  mounted() {
    this.fetchRestaurants();
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
