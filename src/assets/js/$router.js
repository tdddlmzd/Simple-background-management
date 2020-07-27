import Vue from 'vue';
import router from '@/router';
// 路由钩子 拦截所有路由跳转
router.beforeEach((to, from, next) => {
    let now = new Date();
    function getCookie (name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        next() // 判断一下路由是否需要验证
        if (getCookie('token')) next();
        else router.push({
          path: '/Login'
        });
    } else {
        next();
    };
});