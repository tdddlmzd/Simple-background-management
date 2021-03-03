export default {
    basicAuth: 'YXBwOnNlY3JldA==',
    //测试地址
    // localUrl:"http://gateway.test.ijingzhun.com", //测试环境
    // websocketUrl:"wss://ms.test.ijingzhun.com/websocket?user=",// 测试socket接口

    //线上地址
    // localUrl:"https://api.ijingzhun.com", //线上环境
    // websocketUrl:"wss://ms.ijingzhun.com/websocket?user=",// 线上socket接口

    //其他地址
    // localUrl:"http://192.168.1.8:9000", //后端宁接口
    // websocketUrl:"ws://192.168.0.120:9005/websocket?user=", // 后端宁socket接口
    // localUrl:"http://192.168.1.39:9000", //后端颖接口
    localUrl:"http://192.168.1.47:9000", //后端解接口
    websocketUrl:"ws://192.168.1.47:9005/websocket?user=", // 后端宁socket接口
    // localUrl:"http://192.168.1.50:9000", //后端吴接口
    // localUrl:"http://192.168.1.12:9000", //后端吴接口
    // localUrl:"http://192.168.1.12:9000", //后端朱接口

    scheduleSocket: null,
    //提示语变量
    confirm_normal: "<div class='tesDiv'><div>是否将状态变为正常？</div></div>",
    confirm_abnormal: "<div class='tesDiv'><div>是否将状态变为异常？</div></div>",
    confirm_effective: "<div class='tesDiv'><div>是否将状态变为有效？</div></div>",
    confirm_invalid: "<div class='tesDiv'><div>是否将状态变为无效？</div></div>",
    confirm_comused: "<div class='tesDiv'><div>是否将状态变为常用？</div></div>",
    confirm_workover: "<div class='tesDiv'><div>是否将状态变为加班？</div></div>",
    confirm_shield: "<div class='tesDiv'><div>是否将状态变为屏蔽？</div></div>",
    confirm_save: "<div class='tesDiv'><div>是否确认保存？</div></div>",
    confirm_delete: "<div class='tesDiv'><div>是否确认删除？</div></div>",
    confirm_tagbeen: "<div class='tesDiv'><div>是否将状态变为已读？</div></div>",

    //get请求特殊字符进行转义
    getEncodeURI(val){
        var searchStr = ''
        if(val){
            searchStr = encodeURIComponent(val)
        }
        return searchStr
    },
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

    //判断年有多少周次
    getYearWeeks(Y){
        var S = Y + '-' + '01' + '-' + '01' //一年的开始时间
        var E = Y + '-' + '12' + '-' + '31' //一年的结束时间
        let currentYearDays = this.isLeapYear(Y) ? 366 : 365
        let beforeDays = 7 - this.getDate(S)+1
        let afterDays = this.getDate(E)
        let vaildDays = currentYearDays - beforeDays - afterDays
        var weeks = (vaildDays / 7) + 1 //加的这一 若是这周是从星期三开始的 我减去了前面的天数
        return weeks
    },
    //判断是否是闰年
    isLeapYear(year) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            // console.log(year + 'is leap year')
            return true

        } else {
            // console.log(year + 'is not leap year')
            return false
        }
    },
    //获取某年某月某日是星球几
    getDate(date) {
        let oDate = new Date(date)
        let day = oDate.getDay()
        switch (day) {
            case 0:
                // console.log('星期日')
                return 0
            case 1:
                // console.log('星期一')
                return 1
            case 2:
                // console.log('星期二')
                return 2
            case 3:
                // console.log('星期三')
                return 3
            case 4:
                // console.log('星期四')
                return 4
            case 5:
                // console.log('星期五')
                return 5
            case 6:
                // console.log('星期六')
                return 6
        }
    },

    //今天是今年的第几周
    getTodayWeek() {
        var d1 = new Date()
        var d2 = new Date()
        //下面是获取今年1月号是第几周
        var Y = d1.getFullYear()
        var resDate = Y + '-' + '01' + '-' + '01'
        var W = new Date(Date.parse(resDate)).getDay() //今年的1月1号周几
        //下面是获取今天是本年第几天
        d2.setMonth(0);
        d2.setDate(1);
        var rq = d1-d2;
        var s1 = Math.ceil(rq/(24*60*60*1000));

        //（今年的第一天在周数）/7 等于第几周
        var s2 = Math.ceil((s1+W)/7);
        // console.log("今天是本年第"+s1+"天，第"+s2+"周");//周日做为下周的开始计算
        return s2
    },
    

    //周次数组
    getWeekly(todayWeek,yearWeek){
        var qianyi = [] //前一年
        var dangq = [] //当前周
        var houyinian = []// 后一年
        if(todayWeek >= 25){
            //则取当前周前25周 和后25周
            for (let i = yearWeek; i < yearWeek , i > todayWeek - 25 ; i--) {
                let yearWeek = new Date().getFullYear() + '-' +  (i)
                dangq.unshift({
                    week: i,
                    year: new Date().getFullYear(),
                    yearWeek: yearWeek,
                })
            }

            //说明应该有下半年的周次
            if(yearWeek - todayWeek < 26){
                var number = 26 - (yearWeek - todayWeek)
                for (let j = 0; j <= number ; j++) {
                    let yearWeek = (new Date().getFullYear() + 1) + '-' +  (j+1)
                    houyinian.push({
                        week: j+1,
                        year: new Date().getFullYear() + 1,
                        yearWeek: yearWeek,
                    })
                }
            }
        }else{
            //则取前半年的
            //取1周  到 当前周后26周
            var weekNumber = ''
            if(todayWeek + 26 > yearWeek){
                weekNumber = yearWeek
            }else{
                weekNumber = todayWeek + 26
            }
            for (let i = 0; i <= weekNumber; i++) {
                let yearWeek = new Date().getFullYear() + '-' +  (i+1)
                dangq.push({
                    week: i+1,
                    year: new Date().getFullYear(),
                    yearWeek: yearWeek,
                })       
            }

            //判断前一年的周次
            if(yearWeek - 0 < 25){ 
                var number = 25 - (yearWeek - todayWeek)
                var lastNumber = this.getYearWeeks(new Date().getFullYear()-1)
                //判断前一年的总周次
                for (let j = 0; j > lastNumber - number,j < lastNumber; j--) {
                    let yearWeek = (new Date().getFullYear() - 1) + '-' +  (j)
                    qianyi.unshift({
                        week: j,
                        year: new Date().getFullYear() - 1,
                        yearWeek: yearWeek,
                    })
                }
            }
        }
        var weekLy = (qianyi.concat(dangq)).concat(houyinian)
        return weekLy
    },


    //格式化时间
    getDateTime(fmt, date) {
        let ret;
        let opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt
    },
}