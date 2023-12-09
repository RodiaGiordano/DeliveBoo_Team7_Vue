import { createApp } from 'vue';
import './assets/scss/general.scss';

//import router
import { router } from './router/router.js';

//import bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

//import fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass, faUtensils, faMapPin, faPlus, faCartShopping, faArrowRight, faArrowLeft, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faClock, faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faMagnifyingGlass, faUtensils, faMapPin, faPlus, faCartShopping, faHeart, faClock, faArrowRight, faArrowLeft, faCircleCheck, faCircleXmark, faMinus, faInstagram, faFacebook, faTwitter);
import App from './App.vue';

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
