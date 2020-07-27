<template>
    <div class="dynamic">
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
            label-width="130px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">
                    {{addInnerOrEdit}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="closeClick"></i>
            </div>
            <ul class="tableFormUl">
                <li>
                    <el-form-item
                        prop="companyName"
                        label="船公司" 
                        :rules="[{ required: true, message: '请输入船公司', trigger: 'blur'}]"
                    >
                        <el-select 
                            remote  
                            clearable 
                            filterable  
                            v-model="ruleForm.companyName" 
                            placeholder="请输入并选择"
                            :remote-method="companyNameRemote"
                            @focus="companyNameFocus"
                            @change="companyNameChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in companyNameList"
                                :key="item.companyName"
                                :label="item.companyName"
                                :value="item.companyName"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="routeCode"
                        label="航线代码" 
                        :rules="[{ required: true, message: '请输入航线代码', trigger: 'blur'}]"
                    >
                        <el-select 
                            remote  
                            clearable 
                            filterable  
                            v-model="ruleForm.routeCode" 
                            placeholder="请输入并选择"
                            :remote-method="lineCodeRemote"
                            @focus="lineCodeFocus"
                            @change="lineCodeChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in lineCodeList"
                                :key="item.id"
                                :label="item.routeCode"
                                :value="item.routeCode"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="affectWeek"
                        :label=" dialogTex == '新增临时共舱航线' ? '周次' : '开始生效周次'" 
                        :rules="[{ required: true, message: '请输入周次', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.affectWeek"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                        >
                            <el-option
                                v-for="item in weekList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li class="saveLi">
                    <el-button size="small" class="clicksColor" @click="addClick('ruleForm')">添加</el-button>
                </li>
                <li style="clear:both"></li>
            </ul>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props:[
            'dialogTex',
            'cabinId'
        ],
        data() {
            return {
                addInnerOrEdit : '',
                isLoading: false,
                ruleForm:{
                    companyName: '', //船公司
                    routeCode: '', //航线代码1Code
                    affectWeek: '', //周次
                },
                staticId: '', //航线代码id
                scac: '', //船公司四字码
                companyNameList: [], //船公司
                lineCodeList: [], //航线代码
                weekList: [], //周次
            }
        },
        methods: {
            //新增共舱
            async addClick(ruleForm){
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    if(this.addInnerOrEdit == '新增常规共舱航线'){
                        this.$axios.get(this.commonJs.localUrl +`/schedules/cabin/isExist?staticId=${this.staticId}&cabinId=${this.cabinId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                            }
                        }).then(res => {
                            if (res.data.status == 1) {
                                console.log(res.data)
                                if(res.data.content > 0){ //说明其他共舱组存在该航线
                                    this.$message({
                                        type: "error",
                                        message: "其他共舱组存在该航线"
                                    });
                                    return
                                }else{
                                    let query = {
                                        name: this.dialogTex, //当前添加的是 常规共舱 还是临时共舱
                                        id:this.staticId, //航线id
                                        ruleForm:this.ruleForm, //用户添加写的信息
                                    }
                                    this.$emit('conveyInfor', query);
                                }
                            }
                        })
                    }
                }catch(e){}
            },
            //重置所有选择
            resetFrom(){
                this.ruleForm.companyName = '' //船公司
                this.ruleForm.routeCode = '' //航线代码1Code
                this.ruleForm.affectWeek = '' //周次
                this.staticId = ''
                this.scac = ''
            },
            //船公司搜索      
            companyNameRemote(value){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCompany?companyName=${value}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.companyNameList = res.data.content; 
                    }
                })
            },
            //船公司Focus事件
            companyNameFocus(){
                let companyName = this.ruleForm.companyName;
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCompany`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.companyNameList = res.data.content; 
                    }
                })
            },
            //船公司change事件
            companyNameChange(value){
                for (let i = 0; i < this.companyNameList.length; i++) {
                    if(this.companyNameList[i].companyName === value){
                        this.scac = this.companyNameList[i].scac
                    }
                }
            },
            //航线代码搜索
            lineCodeRemote(value){
                if(this.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?routeCode=${value}&scac=${this.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeList = res.data.content
                    }
                })
            },
            //航线代码focus事件
            lineCodeFocus(){
                console.log()
                if(this.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?scac=${this.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        if(res.data.content.length > 0){
                            this.lineCodeList = res.data.content
                        }else{
                            this.lineCodeList = []
                            this.$message({
                                type: "error",
                                message: "此船公司下无航线代码"
                            });
                        }
                    }
                })
            },
            //航线代码change事件
            lineCodeChange(value){
                for (let i = 0; i < this.lineCodeList.length; i++) {
                    if(this.lineCodeList[i].routeCode === value){
                        this.staticId = this.lineCodeList[i].id
                    }
                }    
            },
            //获取今年有多少周
            weekNumber() {
                var d1 = new Date()
                var Y = d1.getFullYear()
                var S = Y + '-' + '01' + '-' + '01' //一年的开始时间
                var E = Y + '-' + '12' + '-' + '31' //一年的开始时间
                let currentYearDays = this.isLeapYear(Y) ? 366 : 365
                let beforeDays = 7 - this.getDate(S)+1
                let afterDays = this.getDate(E)
                let vaildDays = currentYearDays - beforeDays - afterDays
                let weeks = (vaildDays / 7) + 1
                for (let i = 1; i <= weeks; i++) {
                    this.weekList.push({
                        value : i,
                        // label : Y + '年' + '第' + (i+1) + '周',
                        label : Y + '-' + (i),
                    })
                }
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
            //关闭事件
            closeClick(){
                this.$emit('closeClick');
            },
        },
        components: {
            loading
        },
        mounted() {
          this.addInnerOrEdit = this.dialogTex
          this.weekNumber()
          if(this.addInnerOrEdit == '新增常规共舱航线'){
              
          }else if(this.addInnerOrEdit == '新增临时共舱航线'){
              
          }
        },
        computed: {
            companyName(){
                return this.ruleForm.companyName
            }
        },
        watch:{ //监听船公司companyName变化
           companyName(value,oldValue){
               if(value == ""){
                   this.scac = ''
                   this.ruleForm.routeCode = ''
                   this.lineCodeList = []
                   this.lineCodeTwoList = []
               }else if(value !== oldValue){
                   this.ruleForm.routeCode = ''
                   this.lineCodeList = []
                   this.lineCodeTwoList = []
               }
           }
        },
    }
</script>

<style lang="scss" scoped>
    /deep/.el-radio__input{
        float: right;
    }
    /deep/.el-radio__label{
        padding: 0;
        margin-right: 20px;
    }
    .lf{
        float: left;
    }
    .lr{
        float: right;
    }
    .headerContent{
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit{
        margin-left: 10px;
        font-size: 18px;
    }
    .headeraddOrEditClose{
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .tableFormUl{
        padding-top: 20px;
        li{
            width: 450px;
        }
    }
    li.saveLi{
        width: 100%;
        text-align: center;
        margin-top: 40px;
    }
    .clicksColor{
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
        // float: right;
    }
</style>