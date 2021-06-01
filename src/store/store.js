import Vue from "vue"
import Vuex from "vuex"

import { getData } from "../api/apiCalls"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    shopItems: [],
  },
  mutations: {
    getShopItems(state, payload) {
      state.shopItems = payload
    },
    deleteShopItem(state, payload) {
      state.shopItems = state.shopItems.filter((item) => item.id !== payload)
    },
    editShopItem(state, payload) {
      const itemsWithoutEdited = state.shopItems.filter(
        (item) => item.id !== payload.id
      )
      state.shopItems = [...itemsWithoutEdited, payload]
    },
    addNewItem(state, payload) {
      state.shopItems.push(payload)
    },
  },
  actions: {
    async getCarouselPhotos({ commit }, payload) {
      const response = await getData(payload.path)
      if (typeof response !== "string")
        commit("getShopItems", await response.json())
    },
    deleteItem({ commit }, payload) {
      commit("deleteShopItem", payload.id)
    },
    editItem({ commit }, payload) {
      commit("editShopItem", payload)
    },
    addItem({ commit }, payload) {
      commit("addNewItem", payload)
    },
  },
  getters: {
    carouselPhotos: (state) => {
      return state.shopItems.filter((item) => item.favorite === true)
    },
  },
})
