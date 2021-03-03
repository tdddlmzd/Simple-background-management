var vm = avalon.define({
    $id: "indexVm",
    tempList: ["APL", "COSCO", "CMA", "HMM", "ONE", "YML", "CNC", "ANL",
        "SINO", "ZIM", "OOCL", "MSK", "NDS", "ESL", "MSC",
        "GOTO", "SML", "SAF", "FESCO", "STX", "KKC", "JJ",
        "KMTC", "SNK", "SITC", "EMC", "HPL", "HBS", "WHL",
        "PIL", "MCC", "RCL", "DJS", "EAS", "DYS", "NAMSUNG","MATSON","HEUNG-A","TSL","IAL"],
    list: ["APL", "COSCO", "CMA", "HMM", "ONE", "YML", "CNC", "ANL",
        "SINO", "ZIM", "OOCL", "MSK", "NDS", "ESL", "MSC",
        "GOTO", "SML", "SAF", "FESCO", "STX", "KKC", "JJ",
        "KMTC", "SNK", "SITC", "EMC", "HPL", "HBS", "WHL",
        "PIL", "MCC", "RCL", "DJS", "EAS", "DYS", "NAMSUNG","MATSON","HEUNG-A","TSL","IAL"],
    start_port_list: [],
    end_port_list: [],
    st_val: "",
    ed_val: "",
    st_port_code: [],
    ed_port_code: [],
    st_code: "",
    ed_code: "",
    st_basic_code: [],
    ed_basic_code: [],
    indexLength: 0,
    indexLength_ed: 0,
    token: getToken(),
    company: sessionStorage.getItem('companyName') == null ? "APL" : sessionStorage.getItem('companyName'),
    change_company: function (e) {
        vm.company = e;
        vm.start_port_list = []
        vm.end_port_list = []
        vm.st_val = ""
        vm.ed_val = ""
    },
    port_click: function (data, val, num) {
        if (num == 1) {
            vm.st_val = data;
            vm.st_code = val;
        } else if (num == 2) {
            vm.ed_val = data;
            vm.ed_code = val;
        }
    },
    seach_list: function () {
        // sessionStorage.setItem("st_port_code",vm.st_port_code)
        // sessionStorage.setItem("ed_port_code",vm.ed_port_code)
        if (vm.st_code == "" || vm.st_code == null) {
            layer.msg('请选择起始港后再进行查询', function () {
            });
        } else if (vm.ed_code == "" || vm.ed_code == null) {
            layer.msg('请选择目的港后再进行查询', function () {
            });
        } else {
            let scac = get_scac(vm.company)
            let carriercd = vm.company;
            let str = {
                st_port_code: vm.st_code,
                ed_port_code: vm.ed_code,
                scac: scac,
                carriercd: carriercd,
                st_val: vm.st_val,
                ed_val: vm.ed_val,
                date: $('#date-selector').val()
            };
            token = getSearchJson(JSON.stringify(str))
            sessionStorage.setItem('companyName', $('#select_scac_input').val());
            window.location.href = "list.html?token=" + token
        }

    }
})


$(function () {
    avalon.scan(document.body);
    avalon.config({
        debug: false
    })
    laydate.render({
        elem: '#date-selector', //指定元素
        value: CurentTime(),
        theme: '#0099ff'
    });
})

function scacChange(value) {
    var val = value.toUpperCase();
    if (val == '') {
        vm.list = vm.tempList;
        $('.select_scac_input').next().next().css('display', 'block');
    } else {
        var list = vm.tempList;
        var companyNames = [];
        $.each(list, function (k, v) {
            if (v.indexOf(val) != -1) {
                companyNames.push(v)
            }
        })
        //过滤下拉选项
        vm.list = companyNames;
        $('.select_scac_input').next().next().css('display', 'block');
    }
}


function port_click(data, num) {
    if (num == 1) {
        vm.st_val = data;
    } else if (num == 2) {
        vm.ed_val = data;
    }

}

function get_port(val, num) {
    if (val.length > 2) {
        // let scac = get_scac(vm.company)
        let scac = vm.company
        if (!scac) {
            layer.msg('请选择船公司', function () {
            });
        }

        // console.log(vm.token())
        $.ajax({
            type: "GET",
            headers: {Authorization: "Bearer " + vm.token},
            url: getUrl() + "schedules/reptile/queryPort?carriercd=" + scac + "&port=" + val + "",
            success: function (data) {
                vm.start_port_list = [];
                vm.end_port_list = [];
                vm.st_port_code = [];
                vm.ed_port_code = [];
                vm.st_basic_code = [];
                vm.ed_basic_code = [];
                if (num == 1) {
                    for (let i = 0; i < data.content.length; i++) {
                        vm.start_port_list.push(data.content[i].port)
                        vm.st_port_code.push(data.content[i].scacCode)
                        vm.st_basic_code.push(data.content[i].basicCode)
                    }
                } else if (num == 2) {
                    for (let i = 0; i < data.content.length; i++) {
                        vm.end_port_list.push(data.content[i].port)
                        vm.ed_port_code.push(data.content[i].scacCode)
                        vm.ed_basic_code.push(data.content[i].basicCode)
                    }
                }
                vm.indexLength = vm.start_port_list.length;
                vm.indexLength_ed = vm.end_port_list.length;
            }, error: function (error) {
                console.log(error)
            }
        })

    }
}

// $(seletor).keydown(function(event) {
//     if (event.keyCode == 8) {//keycode为8表示退格键
//         vml.st_val = '';
//     }
// }
function get_scac(company) {
    if (company == "APL") {
        return "APLU"
    } else if (company == "CMA") {
        return "CMDU"
    } else if (company == "COSCO") {
        return "COSU"
    } else if (company == "HMM") {
        return "HDMU"
    } else if (company == "ONE") {
        return "ONEY"
    } else if (company == "YML") {
        return "YMLU"
    } else if (company == "CNC") {
        return "CNCL"
    } else if (company == "ANL") {
        return "ANNU"
    } else if (company == "SINO") {
        return "SNTU"
    } else if (company == "ZIM") {
        return "ZIMU"
    } else if (company == "OOCL") {
        return "OOLU"
    } else if (company == "MSK") {
        return "MAEU"
    } else if (company == "NDS") {
        return "NIDU"
    } else if (company == "ESL") {
        return "EPIR"
    } else if (company == "MSC") {
        return "MSCU"
    } else if (company == "GOTO") {
        return "GOTO"
    } else if (company == "SML") {
        return "SMLM"
    } else if (company == "STX") {
        return "POBU"
    } else if (company == "SAF") {
        return "SAFM"
    } else if (company == "FESCO") {
        return "FESO"
    } else if (company == "KKC") {
        return "KMBU"
    } else if (company == "JJ") {
        return "JINX"
    } else if (company == "KMTC") {
        return "KMTC"
    } else if (company == "SNK") {
        return "SKMC"
    } else if (company == "SITC") {
        return "SITC"
    } else if (company == "EMC") {
        return "EGLV"
    } else if (company == "HPL") {
        return "HLCU"
    } else if (company == "HBS") {
        return "SUDU"
    } else if (company == "WHL") {
        return "WHLC"
    } else if (company == "PIL") {
        return "PABV"
    } else if (company == "MCC") {
        return "MCPU"
    } else if (company == "RCL") {
        return "RCLC"
    } else if (company == "DJS") {
        return "DJSL"
    } else if (company == "EAS") {
        return "EASC"
    } else if (company == "DYS") {
        return "DYSL"
    } else if (company == "NAMSUNG") {
        return "NSRU"
    }else if (company == "MATSON") {
        return "MATS"
    }else if (company == "HEUNG-A") {
        return "HEUN"
    }else if (company == "TSL") {
        return "TSQD"
    }else if (company == "IAL") {
        return "IALU"
    }

}


var flag = 0;
var t;

function openFlag(val, num) {
    if (num == 1) {
        vm.st_val = val;
        vm.st_code = ""
    } else if (num == 2) {
        vm.ed_val = val
        vm.ed_code = ""
    }
    flag = 1;
    dosomething(val, num)
}

function closeFlag() {
    clearTimeout(t);
    flag = 0;
}

function dosomething(val, num) {
    if (flag) {
        get_port(val, num)
        if (val == "" && num == 1) {
            vm.start_port_list = [];
            vm.indexLength = vm.start_port_list.length;
        } else if (val == "" && num == 2) {
            vm.end_port_list = []
            vm.indexLength_ed = vm.end_port_list.length;
        }
    }
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