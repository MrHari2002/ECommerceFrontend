import { createStore as _createStore } from 'vuex';
import axios from 'axios';

export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      token: currentToken || '',
      user: currentUser || {},
      message: '',
    },
    mutations: {
      updateMessage(state, message) {
        state.message = message;
      },
      SET_AUTH_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      },
      SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      LOGOUT(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = '';
        state.user = {};
        axios.defaults.headers.common = {};
      }
    },
    actions: {
      addToCart({commit}, productId) {
        commit('updateMessage', `Adding ${productId} to cart...`);
      },
      deleteFromCart({commit}, productId) {
        commit('updateMessage', `Removing ${productId} from cart...`);
      },
      deleteAllProducts({commit}) {
        commit('updateMessage', `Removing all items from cart...`);
      }
    }
  })
  return store;
}