import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Toaster from "@meforma/vue-toaster";

createApp(App).use(router).use(Toaster, { position: "bottom" }).mount("#app");
