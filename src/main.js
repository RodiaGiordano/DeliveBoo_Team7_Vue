import { createApp } from "vue";
import "./assets/scss/general.scss";

//import router
import { router } from "./router/router.js";

//import bootstrap
import "bootstrap/dist/css/bootstrap.css";

//import fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass, faUtensils, faMapPin, faPlus, faCartShopping, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faClock } from "@fortawesome/free-regular-svg-icons";

library.add(faMagnifyingGlass, faUtensils, faMapPin, faPlus, faCartShopping, faHeart, faClock, faArrowRight, faArrowLeft);
import App from "./App.vue";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
