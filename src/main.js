import { createApp } from "vue";
import App from "./App.vue";

import "./main.css";

import router from "./router";
import { store } from "./store";
import { Vue3Mq } from "vue3-mq";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* Font Awesome icons */
import { faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faBars);

var app = createApp(App);
app.use(router).use(store).use(Vue3Mq, {
  preset: "tailwind",
});
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
