import { createStore } from 'vuex';
import axios from 'axios'
import robotsModule from './modules/robots';
import usersModule from './modules/users';

export default createStore({
  state: {
    cart: [],
    parts: null,
    foo: 'root-foo',

  },
  // mutations: {
  //   addRobotToCart(state, robot) {
  //     state.cart.push(robot)
  //   },
  //   updateParts(state, parts) {
  //     state.parts = parts
  //   },
  // },
  // actions: {
  //   //getpart(context){}
  //   getParts({state, getters, commit, dispatch}){
  //     // axios.get('http://localhost:8081/api/parts')
  //     axios.get('/api/parts').then((result) =>{
  //       commit('updateParts', result.data)
  //     }).catch(
  //       console.error
  //     )
  //   },
  //   addRobotToCart({ commit, state }, robot) {
  //     const cart = [...state.cart, robot];
  //     console.log(robot)
  //     return axios.post('/api/cart', cart)
  //       .then(() => {
  //         commit('addRobotToCart', robot)});
  //   },
  // },
  modules: {
    robots: robotsModule,
    users: usersModule,
  },
  getters: {
    // cartSaleItems(state) {
    //   return state.cart.filter((item) => item.head.onSale);
    // },

    // foo(state) {
    //   return `root-getter/${state.foo}`;
    // },
  },
});
