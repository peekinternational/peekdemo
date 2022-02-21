import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: ''
  },

  mutations:{
    SOCKET_CONNECT(state) {
    	console.log('senddsdasdsadasda');
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_MESSAGECHANNEL(state, message) {
    	console.log('send');
      state.socketMessage = message
    }
  }
})