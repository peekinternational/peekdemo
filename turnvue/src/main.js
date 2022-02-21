import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import VueResource from "vue-resource"
import Toasted from 'vue-toasted';
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import VueClipboard from 'vue-clipboard2';
import AudioRecorder from 'vue-audio-recorder';
import VuejsDialog from "vuejs-dialog";
import ToggleButton from 'vue-js-toggle-button';
 
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

window.axios = require('axios');
//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = 'https://www.peekchat.live:22000/';
//window.axios.defaults.baseURL = 'https://192.168.100.30:22000/';
window.axios.defaults.withCredentials = true
import { MyVuexStore } from './my-vuex-store.js';
import i18n from './i18n';
//import {ApiService} from './services/api.service.js';
VueClipboard.config.autoSetContainer = true ;
Vue.use(VueRouter)
Vue.use(VueSession)
Vue.use(VueResource)
Vue.use(Toasted)
Vue.use(VueClipboard)
Vue.use(VuejsDialog)

Vue.use(ToggleButton)

const SocketInstance = socketio.connect(':22000');

//export const SocketInstance = socketio('http://localhost:4113')


Vue.use(VueSocketIO, SocketInstance, MyVuexStore)
 window.$ = window.jQuery = require('jquery')

//Vue.prototype.$apiService = new ApiService();

// import Main from './components/mainComponent.vue';
// import Login from './components/loginComponent.vue';
// import Signup from './components/signupComponent.vue';
// import O2O from './components/o2oCallComponent.vue';

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
Vue.config.productionTip = false
Vue.prototype.$hostname = 'https://www.peekchat.live/'
//Vue.prototype.$hostname = 'https://192.168.100.30:22000/'


const routes = [
  { path: '/', component: () => import(/* webpackChunkName: "home" */ './components/mainComponent.vue') },
  { path: '/signup', component: () => import(/* webpackChunkName: "home" */ './components/loginComponent.vue') },
  { path: '/login', component: () => import(/* webpackChunkName: "home" */ './components/signupComponent.vue')},
   { path: '/joinmeeting', component: () => import(/* webpackChunkName: "home" */ './components/joinmeetingComponent.vue') },
   { path: '/meeting', component: () => import(/* webpackChunkName: "home" */ './components/meetingComponent.vue') },
    { path: '/room', component: () => import(/* webpackChunkName: "home" */ './components/roomComponent.vue') },
    { path: '/terms', component: () => import(/* webpackChunkName: "home" */ './components/tremsComponent.vue') },
   { path: '/privacy', component: () => import(/* webpackChunkName: "home" */ './components/privacyComponent.vue') },
   { path: '/forget', component: () => import(/* webpackChunkName: "home" */ './components/forgetComponent.vue') },
   { path: '/forgotpassword', component: () => import(/* webpackChunkName: "home" */ './components/resetComponent.vue') },
    { path: '/viewscreen', component: () => import(/* webpackChunkName: "home" */ './components/screenviewComponent.vue') },
    { path: '/screenshare', component: () => import(/* webpackChunkName: "home" */ './components/screenshareComponent.vue') },
    { path: '/mobileApp', component: () => import(/* webpackChunkName: "home" */ './components/mobileApp.vue') },
    { path: '/groupCall', component: () => import(/* webpackChunkName: "home" */ './components/groupCall.vue')},
    { path: '/o2oCall', component: () => import(/* webpackChunkName: "home" */ './components/o2oCall.vue')},
  // { path: '/o2o', component: O2O },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	mode: 'history',
 // base: process.env.BASE_URL,
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.


new Vue({

  render: h => h(App),
  i18n,
  router
}).$mount('#app')
