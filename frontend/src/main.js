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
  render: h => h(App)
}).$mount('#app')


AOS.init({
	duration: 1500
});

if(navigator.userAgent.match(/Trident\/7\./)) {
    $('body').on("mousewheel", function () {
        event.preventDefault();
        var wheelDelta = event.wheelDelta;
        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });

    $('body').keydown(function (e) {
        e.preventDefault();
        var currentScrollPosition = window.pageYOffset;
        switch (e.which) {
            case 38: // up
                window.scrollTo(0, currentScrollPosition - 40);
                break;
            case 40: // down
                window.scrollTo(0, currentScrollPosition + 40);
                break;
            default: return; // exit this handler for other keys
        } 
    });
}