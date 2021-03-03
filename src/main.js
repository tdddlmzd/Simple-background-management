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
import { from } from 'core-js/fn/array';

import {wrap} from 'lodash';


const _setItem = function(func, key, value) {
  console.log('setItem.');
  store.commit('localStorage/setItem', {key, value});
  return func.call(this, key, value);
};

Object.keys(sessionStorage).forEach((key) => {
  _setItem.call(sessionStorage, sessionStorage.setItem, key, sessionStorage.getItem(key));
});

sessionStorage.getItem = wrap(sessionStorage.getItem, function (func, key) {
  console.log('getItem.');
  store.state.localStorage.content[key];
    return func.call(this, key);
});

sessionStorage.setItem = wrap(sessionStorage.setItem, _setItem);

sessionStorage.removeItem = wrap(sessionStorage.removeItem, function(func, key) {
  console.log('removeItem.');
  store.commit('localStorage/removeItem', {key})
  return func.call(this, key);
})

sessionStorage.clear = wrap(sessionStorage.clear, function(func) {
  console.log('clear.');
  store.commit('localStorage/clear')
  return func.call(this);
})


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
  // debugger
  var socket = new WebSocket(this.commonJs.websocketUrl + userId)
  
  socket.onopen = function() {
    console.log("open");
  };

  socket.onmessage = fun

  socket.onclose = function() {
    console.log("close");
  };
};


//全局监听 页面刷新事件
Vue.prototype.beforeunloadFn = function(e){
  sessionStorage.removeItem('exportStorage')
}

//全局导出 socket
Vue.prototype.exportSocket = function(uuid) {
  var that = this
  var socket = new WebSocket(this.commonJs.websocketUrl + uuid)
  
  socket.onopen = function() {
    console.log("socket连接")
    if(uuid){
      var exportArry = []
      //如果之前有存储过 则
      if(sessionStorage.getItem('exportStorage')){ //有储存数组
        exportArry = JSON.parse(sessionStorage.getItem('exportStorage'))
      }
      exportArry.push(uuid)
      //去重 防止重复点击造成数据一样
      let set = new Set(exportArry)
      let newA1 = Array.from(set)
      //重新赋值
      console.log(newA1,'存储')
      sessionStorage.setItem('exportStorage',JSON.stringify(newA1))
    }
  }

  socket.onmessage = function(e) {
    console.log("回执消息",e)
    if(e && e.data){
      var data = JSON.parse(e.data)
      if(data.id){
        that.$axios.get(that.commonJs.localUrl + `/schedules/record/downFile?url=${data.url}`,{
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${that.getAuthorization()}`,
                AccessToken: that.getCookie("token")
            }
        }).then(res => {
            var newA2 = []
            if(sessionStorage.getItem('exportStorage')){ //有储存数组
                newA2 = JSON.parse(sessionStorage.getItem('exportStorage'))
                console.log(newA2,'newA2')
                for (let i = 0; i < newA2.length; i++) {
                  if(data.id == newA2[i]){
                    newA2.splice(i,1)
                  }
                }
              //重新赋值
              console.log(newA2,'消失')
              sessionStorage.setItem('exportStorage',JSON.stringify(newA2))
            }
            let url = window.URL.createObjectURL(res.data);
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            let contentDisposition = res.headers['content-disposition'];
            if(contentDisposition){
                let fileName = res.headers['content-disposition'].split('filename=');
                link.setAttribute('download', fileName[1]);
                document.body.appendChild(link);
                link.click();
            }else{
                this.$message.error("暂无数据")
            }
      });
      }else{
        this.$message({
          type: 'error',
          message: '导出失败',
        })
        return
      }
    }
  }

  socket.onclose = function() {
    console.log("socket关闭")
  }
}

/**
 * 关闭loading
 */
Vue.prototype.loading =  {
  closeAll: function (context) {
    getChildrens(context.$children)
  }
}

function getChildrens(childrens){
  for (let index = 0; index < childrens.length; index++) {
    const element = childrens[index];
    if(element.isLoading){
      element.isLoading = false;
    }
    if(element.$children.length > 0){
      getChildrens(element.$children);
    }
  }
}

var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
