import Vue from "vue"
import VueRouter from "vue-router"

import HomePage from "../pages/Home/HomePage.vue"
import LandingPage from "../pages/LandingPage.vue"
import PageNotFound from "../pages/PageNotFound/PageNotFound.vue"
import ProductListItem from "../components/ProductListItem/ProductListItem.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "/shop",
    component: LandingPage,
    children: [{ path: ":id", component: ProductListItem }],
  },
  {
    path: "*",
    component: PageNotFound,
  },
]

export const router = new VueRouter({
  routes,
  mode: "history",
})
