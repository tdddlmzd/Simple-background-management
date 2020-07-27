var token = GetQueryString('token');
var vml = avalon.define({
    $id: "listVm",
    data_list: [],
    y_m_d: '',
    jsonStr: getEncodeURI(token),
    st_val: "",
    ed_val: "",
    total: 0,
    data: 1,
	vessel: "",
	voyage: "",
	routeCode: "",
	isTransit: "",
    lastUpdateTime: function () {
        let st_port_code = JSON.parse(vml.jsonStr).st_port_code
        let ed_port_code = JSON.parse(vml.jsonStr).ed_port_code
        let polEn = JSON.parse(vml.jsonStr).st_val
        let podEn = JSON.parse(vml.jsonStr).ed_val
        let scac = JSON.parse(vml.jsonStr).scac
        
        let token = vml.token
        var lastUpdateTime = '';
        $.ajax({
            type: "GET",
            headers: { Authorization: "Bearer " + token },
            url: getUrl() + "schedules/reptile/getLastUpdateTime?polCode=" + st_port_code + "&podCode=" + ed_port_code + "&scac=" + scac  + '&polEn=' + polEn + '&podEn=' + podEn,
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    lastUpdateTime = data.content;
                }
                console.log(data)
            }, error: function (error) {
                console.log(error)
            }
        })
        return lastUpdateTime;
    },
    isShowUpdateBtn: window.location.href.indexOf('120.55.72.95:11102') == -1 ? true : false,
    token: getToken(),
    pageSearch: function (pageCount, totalData, currentPage, fn) {
        $('.Page').pagination({
            pageCount: pageCount,
            items: totalData,
            edges: 3,
            displayedPages: 3,
            currentPage: currentPage,
            prevText: "上一页",
            nextText: "下一页",
            onPageClick: fn

        });
    }

})


$(function () {
    avalon.scan(document.body);
    console.log(token, getEncodeURI(token));
    getData(1);
    vml.st_val = JSON.parse(vml.jsonStr).st_val;
    vml.ed_val = JSON.parse(vml.jsonStr).ed_val;
    vml.y_m_d = JSON.parse(vml.jsonStr).date;

    //更新船期
    $('.update_schedule_btn').on('click', function () {
        updateSchedules();
    })
	
	// 搜索
	$('input').on('change',function(){
		getData(1);
	})
	$('select').on('change',function(){
		vml.isTransit = $(this).val()
		getData(1);
	})
})
function getData(pageNum) {
    let st_port_code = JSON.parse(vml.jsonStr).st_port_code
    let ed_port_code = JSON.parse(vml.jsonStr).ed_port_code
    let scac = JSON.parse(vml.jsonStr).carriercd
    let date = JSON.parse(vml.jsonStr).date
	
	let vessel = vml.vessel
	let voyage = vml.voyage
	let routeCode = vml.routeCode
	let isTransit = vml.isTransit
    layer.ready(function () {
        layer.load(2);
    });
	
    $.ajax({
        type: "GET",
        headers: { Authorization: "Bearer " + vml.token },
        url: getUrl() + "schedules/reptile/schedule?polCode=" + st_port_code + "&podCode=" + ed_port_code + "&etd=" + date + "&weeksOut=4&pageSize=10&carriercd=" + scac + "&pageNum=" + pageNum + "&vessel=" + vessel + "&voyage=" + voyage + "&routeCode=" + routeCode + "&isTransit=" + isTransit,
        success: function (data) {
            if (data.content.length != 0) {
                vml.data = 1
                vml.pageSearch(data.total, data.pages, data.pageNum, function (e) {
                    getData(e)
                    document.documentElement.scrollTop = 0
                })
            } else {
                vml.data = 0
            }
            vml.data_list = [];
            vml.total = data.total
            for (let i = 0; i < data.content.length; i++) {
                vml.data_list.push(data.content[i])
            }
            layer.closeAll()
            console.log(data)
        }, error: function (error) {
            console.log(error)
            layer.closeAll()
        }
    })
}

function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + "";

    return (clock);
}
//更新船期
function updateSchedules() {
    let st_port_code = JSON.parse(vml.jsonStr).st_port_code
    let ed_port_code = JSON.parse(vml.jsonStr).ed_port_code
    let polEn = JSON.parse(vml.jsonStr).st_val
    let podEn = JSON.parse(vml.jsonStr).ed_val
    let scac = JSON.parse(vml.jsonStr).scac
    let token = vml.token
    //不爬自动化
    var autoTest = ['PABV'];
    if (autoTest.indexOf(scac) != -1) {
        layer.msg('暂不支持该船公司', function () { });
		return false;
    }
    $.ajax({
        type: "GET",
        headers: { Authorization: "Bearer " + token },
        url: getUrl() + "schedules/reptile/upSchedule?polCode=" + st_port_code + "&podCode=" + ed_port_code + "&scac=" + scac  + '&polEn=' + polEn + '&podEn=' + podEn,
        success: function (data) {
            if (data.status == 1) {
                layer.msg('正在更新数据中，请稍后查看', function () { });
            } else if (data.status == 3) {
                layer.msg('已经开始更新数据，请勿重复操作', function () { });
            } else {
                layer.msg('更新程序调用失败', function () { });
            }
            console.log(data)
        }, error: function (error) {
            layer.msg('服务器异常', function () { });
        }
    })
}

//获取组合最后更新时间

function f() {

}
