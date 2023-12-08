import { createRouter, createWebHistory } from 'vue-router';

// import delle Page
import HomePage from '../pages/HomePage.vue';
import MenuPage from '../pages/MenuPage.vue';
import Cart from '../pages/Cart.vue';
import TestPage from '../pages/TestPage.vue';
import PaymentPage from '../pages/PaymentPage.vue';

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
      path: '/test/',
      name: 'test',
      component: TestPage,
    },

    {
      path: '/risultato-pagamento',
      name: 'risultato-pagamento',
      component: PaymentPage,
    },
  ],
});

export { router };
