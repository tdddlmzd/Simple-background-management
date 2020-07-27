import Vue from 'vue'
import App from './app.vue'
import router from './router/index.js'
import store from './store/index.js'
import commonJs from '@/assets/js/common.js';   //common
import '@/assets/js/$router.js';                //路由拦截
import '@/assets/js/$axios.js';                 //配置全局跨域文件
import '@/assets/css/element.scss';
import '@/assets/css/layout.scss';
import Bus from '@/components/Bus/index.js';
import '@/assets/css/icon/iconpassword/iconfont.css';
import '@/assets/js/$localStorage.js';          //配置全局localStorage
import ElementUI from 'element-ui';             //引入element
import 'element-ui/lib/theme-chalk/index.css';  //引入element css
import CryptoJS from 'crypto-js';
//密码加密
Vue.prototype.CryptoJS = CryptoJS
Vue.use(Bus);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.commonJs = commonJs;
//存cookies
Vue.prototype.setCookie = function (name, value, day) {
  if (day) {
    var exp = new Date();
    exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
  }
  else {
    document.cookie = name + "=" + escape(value) + ';path=/';
  }
}
// 读取cookies
Vue.prototype.getCookie = function (name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
// 删除cookies
Vue.prototype.delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1000);
  var cval = this.getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString();
}
Vue.prototype.getAuthorization = function () {
    if(this.getCookie('authorization')){
        return JSON.parse(this.getCookie('authorization')).authorization
    }else {
        this.$router.push({ path: '/Login' });
        return;
    // let params = {
        //     username: 'jingzhun',
        //     password: '360fob'
        // }
        // this.$axios.get(this.commonJs.localUrl + `/auth/token?username=${params.username}&password=${params.password}`).then(res => {
        //     this.setCookie('authorization', 
        //     JSON.stringify({
        //       authorization: res.data.content
        //     }), 1)
        //     authorization = res.data.content
        // })
        // return authorization
  }
}

Vue.prototype.createsocket = function(userId,fun) {
  debugger
  var socket = new WebSocket(this.commonJs.websocketUrl + userId);
  
  socket.onopen = function() {
    console.log("open");
  };

  socket.onmessage = fun

  socket.onclose = function() {
    console.log("close");
  };
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
