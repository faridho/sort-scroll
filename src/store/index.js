import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        usersStorage: []
    },

    mutations: {
        CONFIRM_SAVE: (state, users) => {
            state.usersStorage = users
        }
    },

    actions: {
        storeUsers({ commit }, users) {
            commit('CONFIRM_SAVE', users)
        }
    }
})