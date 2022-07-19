import { createStore } from 'vuex';

import robotsModule from './modules/robots';
import usersModule from './modules/users';

export default createStore({
  state: {
    cart: [],
    foo: 'root-foo',
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot)
    }
  },
  // modules: {
  //   robots: robotsModule,
  //   users: usersModule,
  // },
  getters: {
    cartSaleItems(state) {
      return state.cart.filter((item) => item.head.onSale);
    },
    foo(state) {
      return `root-getter/${state.foo}`;
    },
  },
});
