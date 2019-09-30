import Vue from "vue";
import Vuex from "vuex";
import { myCart } from "./stores/myCart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Items: {},
    onAjax: false,
    ItemDetail: null,
    splash: true
  },
  getters: {
    splash: state => state.splash
  },
  mutations: {
    updateItems(state, newItems) {
      state.Items = newItems;
    },
    updateOnAjax(state, status) {
      state.onAjax = status;
    },
    getItemDetail(state, detail) {
      state.ItemDetail = detail;
    },
    hideSplash(state, status) {
      state.splash = status;
    }
  },
  actions: {},
  modules: {
    myCart
  }
});
