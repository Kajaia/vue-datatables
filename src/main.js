import { createApp } from "vue";
import App from "./App.vue";
import bootstrap from "bootstrap";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.esm";

createApp(App).use(bootstrap).mount("#app");
