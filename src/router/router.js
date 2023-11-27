import { createRouter, createWebHistory } from "vue-router";

// import delle Page
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  //Aggiugno history
  history: createWebHistory(),

  //Aggiungo Rotte
  routes: [
    {
      path: "/",
      name: "homepage",
      component: HomePage,
    },
  ],
});

export { router };
