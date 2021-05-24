import Vue from 'vue'
import VeeValidate from 'vee-validate'

import App from './App.vue'
import './assets/global.css'
// import './assets/media-queries.css'

Vue.use(VeeValidate, {
	classes: true,
	classNames: {
		valid: 'is-valid',
		invalid: 'is-invalid',
	},
})

new Vue({
	render: (h) => h(App),
}).$mount('#app')

// Vue.use(VeeValidate)
