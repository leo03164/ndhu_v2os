import Vue from 'vue';
import Vuex from 'vuex';
import IPFS from 'ipfs-core';
import Contract from './contract';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        ipfs: {},
        contract: {},
        currentAccount: '',
        distributorList: []
    },
    mutations: {
        setIPFS(state, payload) {
            state.ipfs = payload;
        },
        setContractInstance(state, payload) {
            state.contract = payload;
        },
        setContractCurrentAccount(state, payload) {
            state.contract.options.from = payload;
            state.currentAccount = payload;
        },
        setDistributorList(state, payload) {
            state.distributorList = payload;
        }
    },
    actions: {
        async initIPFS({ commit }) {
            const init = await IPFS.create();            
            commit('setIPFS', init);
        },
        async initContract({ commit }) {
            const init = await Contract.init();
            commit('setContractInstance', init);

            const account = await web3.eth.getAccounts();
            commit('setContractCurrentAccount', account[0]);

            console.log('Current Account is: ', account[0]);
        },
        updateDistributorList(context, payload) {
            context.commit('setDistributorList', payload);
        }
    },
    getters: {
        getDistributorList: state => {
            return state.distributorList;
        }
    }
})
export default store;