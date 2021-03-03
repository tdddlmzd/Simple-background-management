import Vue from 'vue';
import axios from 'axios';
import store from '../../store/index'
import router from '@/router';
import {get} from 'https';
import content from '../../main.js';
import common from "@/assets/js/common";

function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}

// //拦截所有请求
axios.interceptors.request.use(config => {

    //get请求 特殊字符才会报错
    if(config.method=='get'){
        //特殊字符
        // config.url  = encodeURI(config.url)
        //特殊字符 \
        config.url = config.url.replace(/\\/g,'%5C')
        //特殊字符 |
        config.url = config.url.replace(/\|/g,'%7C')
    }
    return config
});

// 拦截所有响应
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.push({
                    path: '/Login',
                    name: 'Login'
                })
                break
            case 403:
                // if (getCookie('token')) location.reload()
                router.push({
                    path: '/Login',
                    name: 'Login'
                })
                break
            case 404:
                router.push({
                    path: '/NotFind',
                    name: 'notFind'
                })
                break
            case 429:
                content.$message({
                    type: "warning",
                    message: "您的操作过于频繁，请稍后再试"
                });
                console.log(content)
                content.loading.closeAll(content)
                break
            case 500:
                content.$message({
                    type: "warning",
                    message: "服务器异常，请联系管理员"
                });
                content.loading.closeAll(content)
                break
            default:
                return Promise.reject(error)
        }
    }
    return Promise.reject(error)
});


//添加到 Vue原型链
Vue.prototype.$axios = axios;

const api = axios.create({
    baseURL: common.localUrl
});

api.interceptors.request.use(request => {
    request.headers = {
        Authorization: `Bearer ${Vue.prototype.getAuthorization()}`,
        AccessToken: Vue.prototype.getCookie("token").replace("Bearer", "Jwt"),
    };
    return request;
})

Vue.prototype.$http = Object.fromEntries(['get', 'post'].map(name => {
    return [name, function () {
        return api[name].apply(this, arguments).then(res => res.data.status === 1 ? Promise.resolve(res.data) : Promise.reject(res.data.content));
    }];
}));