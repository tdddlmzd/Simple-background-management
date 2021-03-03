
import Vue from 'vue'

export default {

    namespaced: true,

    state: {
        content: {}
    },

    mutations: {
        setItem(state, {key, value}) {
            Vue.set(state.content, key, value);
        },
        removeItem(state, {key}) {
            Vue.delete(state.content, key);
        },

        clear(state) {
            Vue.set(state, 'content', {})
        }
    }
}