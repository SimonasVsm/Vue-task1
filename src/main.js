import Vue from "vue"
import VeeValidate from "vee-validate"

import App from "./App.vue"
import { store } from "./store/store"
import { router } from "./router/router"
import "./assets/global.css"

Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
})

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app")
