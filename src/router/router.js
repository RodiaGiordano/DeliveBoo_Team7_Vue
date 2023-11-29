import { createRouter, createWebHistory } from "vue-router";

// import delle Page
import HomePage from "../pages/HomePage.vue";
import MenuPage from "../pages/MenuPage.vue";

// import Menu from "../assets/components/Dishes/Menu.vue";

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
      path: "/show/:id",
      name: "menupage",
      component: MenuPage,
    },
    // {
    //   path: "/restaurant/:id",
    //   name: "restaurant",
    //   component: Menu,
    //   props: true,
    // },
  ],
});

export { router };
