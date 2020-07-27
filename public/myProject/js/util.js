//地址，请求方式，参数,是否异步，头部信息[待续]
function ajax(url,type,param,async,header) {
	
	return new Promise(function(resolve, reject) {
		var req = new XMLHttpRequest();
		req.onload = function() { 
			if(req.status == 200 || req.status == 304) {
				resolve(JSON.parse(req.response));
			} else {
				reject(Error(req.statusText));
			}
		};
		req.onerror = function() {
			reject(Error("Network Error"));
		};
			type == null || type.toUpperCase() == 'GET'?type='get':type='post';
			if( typeof param === 'object' ){
				param = JSON.stringify(param);
			}
			param = formatParams(param);
			param == null || param == ''?url:url=url+'?'+param;
			async == null || async == true?async=true:async=false;
			//设置表单提交时的内容类型，未完
			//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			req.open(type,url,async);
			req.send();
	});
	function formatParams(data) {
		var _fpArr = [];
		for (var _fpName in data) {
			_fpArr.push(_fpName + "=" + data[_fpName]);
		}
		return _fpArr.join("&");
	};
};
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getSearchJson( token ){
    // if( token ) return window.btoa(token);
    if( token ) return window.btoa(window.encodeURIComponent(token));
    else return null;
}
function getEncodeURI( str ){
    // if( str ) return window.atob(str);
    if( str ) return window.decodeURIComponent(window.atob(str));
    else return null;
}

function setCookie(key, value, days) {
  // 设置过期原则
  if (!value) {
    localStorage.removeItem(key)
  } else {
    var Days = days || 1; // 默认保留1天
    var exp = new Date();
    localStorage[key] = JSON.stringify({
      value,
      expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
    })
  }
}
//读取cookies
function getCookie(name) {
  try {
    let o = JSON.parse(localStorage[name])
    if (!o || o.expires < Date.now()) {
      return null
    } else {
      return o.value
    }
  } catch (e) {
      // 兼容其他localstorage 
    // console.log(e)
    return localStorage[name]
  } finally {
  }
}
//删除cookies
function delCookie(key) {
  localStorage.removeItem(key)
}

// 获取token
function getToken() {
  var authorization = getCookie('gateway_token1');
  //如果token失效重新获取
  if (authorization == null) {
    $.ajax({
      url: getUrl() + "auth/token?username=Jason&password=cuXYHP(p1bKPZxv%2524*%2523Yr7T%25256Y!G!hT%2523s",
      type: "GET",
      async: false,
      success: function (data) {
        if (data.status == 1 && data.message == 'SUCCESS') {
          authorization = data.content;
          //保存6小时
          setCookie('gateway_token1', authorization, 0.25);
        } else {
			console.log("获取token失败")
        }
      },
      error: function () {
		  console.log("服务器异常")
      }
    });
  }
  return authorization;
}

var environment = "prd"
function getUrl(){
	if(environment == "dev"){
		return "http://localhost:9000/"
	}else if(environment == "prd"){
		return "https://api.ijingzhun.com/"
	}else if(environment == "test"){
		return "http://101.37.80.200:9000/"
	}
}
