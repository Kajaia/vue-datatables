import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      locale: localStorage.locale ?? "en",
    };
  },
  mutations: {
    changeLanguage(state, lang) {
      state.locale = lang;
    },
  },
});

export default store;
