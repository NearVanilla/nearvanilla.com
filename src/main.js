import { createApp } from "vue";
import App from "./App.vue";

import "./main.css";
import "./reset.css";

import router from "./router";
import { store } from "./store";
import { Vue3Mq } from "vue3-mq";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueSmoothScroll from "vue3-smooth-scroll";

/* Font Awesome icons */
import {
  faBars,
  faCaretDown,
  faHdd,
  faMemory,
  faMicrochip,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faCaretDown, faMicrochip, faHdd, faMemory, faNetworkWired);

import axios from "axios";

var app = createApp(App);
app
  .use(router)
  .use(store)
  .use(Vue3Mq, {
    preset: "tailwind",
  })
  .provide("http", axios)
  .use(VueSmoothScroll);

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
