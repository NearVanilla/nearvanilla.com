import { createWebHistory, createRouter } from "vue-router";

import routes from "./routes.js";

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});

export default router;
