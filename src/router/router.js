import { createRouter, createWebHistory } from 'vue-router';

// import delle Page
import HomePage from '../pages/HomePage.vue';
import MenuPage from '../pages/MenuPage.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';

const router = createRouter({
  //Aggiugno history
  history: createWebHistory(),

  //Aggiungo Rotte
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/show/:id',
      name: 'menupage',
      component: MenuPage,
    },

    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    // braintree test
    {
      path: '/checkout/',
      name: 'checkout',
      component: Checkout,
    },
  ],
});

export { router };
