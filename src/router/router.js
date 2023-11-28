import { createRouter, createWebHistory } from "vue-router";

// import delle Page
import HomePage from "../pages/HomePage.vue";
import Menu from "../assets/components/Dishes/Menu.vue";

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
    {
      path: "/restaurant/:id",
      name: "restaurant",
      component: Menu,
      props: true,
    },
  ],
});

export { router };
