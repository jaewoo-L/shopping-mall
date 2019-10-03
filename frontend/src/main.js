import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
import Vuelidate from 'vuelidate'
//
Vue.use(Vuelidate)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // beforeCreate() {
  // 	this.$store.dispatch('tryAutoLogin')
  // },
  render: h => h(App)
}).$mount('#app')


