import { createApp } from "vue";
import App from "./App.vue";

import "./main.css";

import router from "./router";
import { store } from "./store";
import { Vue3Mq } from "vue3-mq";

var app = createApp(App);

app.use(router).use(store).use(Vue3Mq, {
  preset: "tailwind",
});
app.mount("#app");
