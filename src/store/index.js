import { createStore } from "vuex";

import homeStore from "./home.store";

export const store = createStore({
  modules: {
    homeStore,
  },
});
