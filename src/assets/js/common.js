export default {
    //王宁
    //devolop:192.168.0.120:8099
    //最新线上
    //http://data.360fob.com
    // localUrl:"http://120.55.234.41", //线上环境
    // localUrl:"http://47.114.202.170", //测试环境
    // localUrl:"http://192.168.0.120:9000", //后端宁接口
    localUrl:"http://47.114.202.170", //测试环境
    // localUrl:"http://192.168.0.120:9000", //后端宁接口
    // localUrl:"http://192.168.0.239:9000", //后端泽接口
    // localUrl:"http://192.168.0.125:9000", //后端颖接口
    // localUrl:"http://192.168.0.171:9000", //后端解接口
    // localUrl:"https://data.360fob.com",
    //websocke的路径
    // websocketUrl:"http://192.168.0.239:9002",
    // websocketUrl:"http://47.114.202.170:9002",
    // websocketUrl:"http://120.55.234.41:9002",
    // websocketUrl:"ws://192.168.0.120:9005/websocket?user=", // 后端宁socket接口
    websocketUrl:"ws://ms.ijingzhun.com/websocket?user=",// 线上socket接口

    scheduleSocket: null,
    //根据中文得到英文
    getPinYin(val){
        let pinyin = require('js-pinyin');
        pinyin.setOptions({checkPolyphone: false, charCase: 0});
        return pinyin.getFullChars(val)
    },
    //截取逗号之前
    handleComma(data){
        let comma = data;
        comma = comma.substring(0, comma.indexOf(','));
        return comma;
    }, 
    //只能输入3位整数数字
    handleInputNo(value){
        // ruleForm.fliterTable = commonJs.handleInputEnOrNo(ruleForm.fliterTable)
        value = value.replace(/[^\d]/g, '');
        value = value.replace(/^0{1,}/g,'');
        value = value.replace(/^[1-9]\d{3,}/g, 999)
        return value;
    },
    //只能输入整数数字
    handleNumber(value){
        value=value.replace(/[^\d]/g,'')
        return value;
    },
    getUuid(){
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
        s[8] = s[13] = s[18] = s[23] = "-";
    
        var uuid = s.join("");
        return uuid;
    },
    getMounthDay(data){
        let weekList = {
            'MON' : 'MON',
            'TUE' : 'TUE',
            'WED' : 'WED',
            'THU' : 'THU',
            'FRI' : 'FRI',
            'SAT' : 'SAT',
            'SUN' : 'SUN',

            'mon' : 'MON',
            'tue' : 'TUE',
            'wed' : 'WED',
            'thu' : 'THU',
            'fri' : 'FRI',
            'sat' : 'SAT',
            'sun' : 'SUN',

            'Mon' : 'MON',
            'Tue' : 'TUE',
            'Wed' : 'WED',
            'Thu' : 'THU',
            'Fri' : 'FRI',
            'Sat' : 'SAT',
            'Sun' : 'SUN',

            '1' : 'MON',
            '2' : 'TUE',
            '3' : 'WED',
            '4' : 'THU',
            '5' : 'FRI',
            '6' : 'SAT',
            '7' : 'SUN',

            '周一' : 'MON',
            '周二' : 'TUE',
            '周三' : 'WED',
            '周四' : 'THU',
            '周五' : 'FRI',
            '周六' : 'SAT',
            '周日' : 'SUN',
            // 复杂日期
            'TUES' : 'TUE',
            'THURS' : 'THU',
        };
        if(weekList[data]){
            return weekList[data];
        }else{
            return data;
        };
    },
    getFaysMounthDay(data) {
        let weekList = {
            'MON' : 'MON',
            'TUE' : 'TUE',
            'WED' : 'WED',
            'THU' : 'THU',
            'FRI' : 'FRI',
            'SAT' : 'SAT',
            'SUN' : 'SUN',

            'mon' : 'MON',
            'tue' : 'TUE',
            'wed' : 'WED',
            'thu' : 'THU',
            'fri' : 'FRI',
            'sat' : 'SAT',
            'sun' : '周日',

            'Mon' : 'MON',
            'Tue' : 'TUE',
            'Wed' : 'WED',
            'Thu' : 'THU',
            'Fri' : 'FRI',
            'Sat' : 'SAT',
            'Sun' : 'SUN',

            '1' : 'MON',
            '2' : 'TUE',
            '3' : 'WED',
            '4' : 'THU',
            '5' : 'FRI',
            '6' : 'SAT',
            '7' : 'SUN',

            '周一' : 'MON',
            '周二' : 'TUE',
            '周三' : 'WED',
            '周四' : 'THU',
            '周五' : 'FRI',
            '周六' : 'SAT',
            '周日' : 'SUN',
            // 复杂日期
            'TUES' : 'TUE',
            'THURS' : 'THU',
        };
        // var e = data.match(/[a-zA-Z]/ig)
        // var c = e.join('')
        // var d = data.slice(0,data.indexOf('（'))
        // if(weekList[c]){
        //     return d + '(' + weekList[c] + ')'
        // }else{
        //     return d + '(' + c + ')'
        // }
        if(data.indexOf('（') !== -1){
            var a = JSON.parse(JSON.stringify(data))
            var c = a.slice(0,data.indexOf('（'))
            var b = data.slice(data.indexOf('（')+1,data.indexOf('）'))
            if(weekList[b]){
                return c + '(' + weekList[b] + ')'
            }else{
                return c + '(' + b + ')'
            }
        }else if(data.indexOf('(') !== -1){
            var a = JSON.parse(JSON.stringify(data))
            var c = a.slice(0,data.indexOf('('))
            var b = data.slice(data.indexOf('(')+1,data.indexOf(')'))
            if(weekList[b]){
                return c + '(' + weekList[b] + ')'
            }else{
                return c + '(' + b + ')'
            }
        }
        else{
            return data
        }
    },
    getNumDay(data){
        let weekList = {
            'MON' : 1,
            'TUE' : 2,
            'WED' : 3,
            'THU' : 4,
            'FRI' : 5,
            'SAT' : 6,
            'SUN' : 0,
        };
        return weekList[data]
    },
}