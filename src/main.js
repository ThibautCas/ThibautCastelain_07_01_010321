import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import moment from 'moment';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, "$moment", {value: moment});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
