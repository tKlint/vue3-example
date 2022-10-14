import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router, { setupRouter } from "./router";

import "./assets/main.css";
import { setupAntd } from "./plugins";
import { setupStore } from "./stores";

const app = createApp(App);

const setupPlugin = () => {
  setupAntd(app);
}

const setupApp = () => {
  setupStore(app);
  setupRouter(app);
  app.mount("#app");
}

setupPlugin();

setupApp();
