import Vue from 'vue';
import axios from 'axios';
import store from '../../store/index'
import router from '@/router';
import { get } from 'https';
function getCookie (name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}
// 拦截所有响应
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.push({
                    path : '/Login',
                    name : 'Login'
                })
            break
            case 403:
                if (getCookie('token')) location.reload()
            break
            case 404:
                router.push({
                    path : '/NotFind',
                    name : 'notFind'
                })
            break
            default:
                return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})
//添加到 Vue原型链
Vue.prototype.$axios = axios;