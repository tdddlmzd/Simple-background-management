import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import common from './modules/common';
import permission from './modules/permission';
import getters from './getters';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        app,
        common,
        permission,
    },
    getters
});
export default store;
//继承到vue的原型链上
Vue.prototype.$store = store;