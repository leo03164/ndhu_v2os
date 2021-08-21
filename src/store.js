import Vue from 'vue';
import Vuex from 'vuex';
import IPFS from 'ipfs-core';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      ipfs: {}
    },
    mutations: {
        setIPFS(state, payload) {
            state.ipfs = payload;
        }
    },
    actions: {
        async initIPFS({ commit }) {
            const init = await IPFS.create()
            commit('setIPFS', init);
        }
    }

})
export default store;