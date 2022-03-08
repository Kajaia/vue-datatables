import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import bootstrap from "bootstrap";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.esm";

createApp(App).use(router).use(store).use(bootstrap).mount("#app");
