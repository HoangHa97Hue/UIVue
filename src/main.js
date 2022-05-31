import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import jquery from 'jquery';
// window.$ = window.jquery = jquery;
// import 'popper.js';
// import 'bootstrap';
// import './assets/app.scss';
// import jquery from 'jquery/dist/jquery';
// import popper from 'popper.js/dist/popper';
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)

import "bootstrap";
import "../node_modules/bootswatch/dist/lux/bootstrap.min.css";
import "jquery";
import "popper.js";
import Vuelidate from 'vuelidate'
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)



Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
