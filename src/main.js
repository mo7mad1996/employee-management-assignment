import "vue-toastification/dist/index.css";
import "@/assets/css/main.scss";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import { createHead } from "@vueuse/head";

const head = createHead();

const options = {
  // You can set your default options here
};

createApp(App).use(Toast, options).use(head).use(router).mount("#app");
