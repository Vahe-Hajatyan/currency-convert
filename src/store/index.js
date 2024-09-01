import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      baseCurrency: 'USD',
    };
  },
  mutations: {
    setBaseCurrency(state, currency) {
      state.baseCurrency = currency;
    },
  },
});
