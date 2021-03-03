<template>
    <div>
        <el-form
            label-position="right"
            label-width="100px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">
                    {{addOrEdit}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="closePathRouter"></i>
            </div>
            <ul class="tableFormUl">
                <li>
                    <!-- <el-form-item prop="order" label="序号" :rules="[{ required: true, message: '请输入序号', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.order" placeholder="请输入" clearable @input="ruleForm.order=ruleForm.order.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item> -->
                    <el-form-item prop="transitType" label="运输类型" :rules="[{ required: true, message: '请选择运输类型', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.transitType"
                            style="width:100%;"
                            placeholder="请选择"
                            @change="transport"
                        >
                            <el-option
                                v-for="item in transPort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="routeCode" :show-message="!isRoute" label="航线代码" :rules="[{ required: !isRoute, message: '请选择航线代码' , trigger: 'blur'}]"
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
                            :disabled="isRoute"
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
                    <el-form-item prop="pol" label="起运港" :rules="[{ required: true, message: '请选择起运港', trigger: 'blur'}]"
                    >
                        <el-select
                            remote
                            filterable
                            clearable
                            v-model="ruleForm.pol"
                            placeholder="请输入并选择"
                            :remote-method="portStartRemote"
                            @focus="portStartFocus"
                            @change="portStartChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in portStartList"
                                :key="item.id"
                                :label="item.portEn"
                                :value="item.portEn"
                                :title='item.portEn+"("+ item.portCode+")"'
                            >
                                <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="polTerminal" label="起运港码头"
                    >
                        <el-select
                            v-model="ruleForm.polTerminal"
                            placeholder="请选择"
                            clearable
                            @focus="startPortFocus"
                            @change="startPortChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in polPort"
                                :key="item.id"
                                :label="item.terminalCn"
                                :value="item.terminalCn"
                            >
                                <span>{{item.terminalCn+"("+ item.terminal+")" }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="pod" label="目的港" :rules="[{ required: true, message: '请选择目的港', trigger: 'blur'}]"
                    >
                        <el-select
                            remote
                            clearable
                            filterable
                            v-model="ruleForm.pod"
                            placeholder="请输入并选择"
                            :remote-method="portEndRemote"
                            @focus="portEndFocus"
                            @change="portEndChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in portEndList"
                                :key="item.id"
                                :label="item.portEn"
                                :value="item.portEn"
                                :title='item.portEn+"("+ item.portCode+")"'
                            >
                                <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="podTerminal" label="目的港码头"
                    >
                        <el-select
                            v-model="ruleForm.podTerminal"
                            placeholder="请选择"
                            clearable
                            @focus="endPortFocus"
                            @change="endPortChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in podPort"
                                :key="item.id"
                                :label="item.terminalCn"
                                :value="item.terminalCn"
                            >
                                <span>{{item.terminalCn+"("+ item.terminal+")" }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="etd" label="ETD" :rules="[{ required: true, message: '请选择ETD', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.etd"
                            style="width:100%;"
                            placeholder="请选择"
                            clearable
                            default-first-option
                        >
                            <el-option
                                v-for="item in ETDList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="eta" label="ETA" :rules="[{ required: true, message: '请选择ETA', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.eta"
                            style="width:100%;"
                            placeholder="请选择"
                            clearable
                            default-first-option
                            
                        >
                            <el-option
                                v-for="item in ETAList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.label"
                                ref="countryEn"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="transitTime" label="航程"
                    >
                        <el-input v-model="ruleForm.transitTime" placeholder="请输入" @input="ruleForm.transitTime = commonJs.handleInputNo(ruleForm.transitTime)" clearable></el-input>
                    </el-form-item>
                </li>
                <li style="text-align: center;">
                    <el-button size="small" class="clicksColor" @click="handleSaveClick('ruleForm')">保存</el-button>
                </li>
                <li style="clear:both"></li>
            </ul>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    export default {
        props:[
            'routeTitle',
            "scac",
            "pathRoute",
            "portDesti"
        ],
        data() {
            return {
                addOrEdit : '',
                isRoute : true,
                ruleForm : {
                    id: '',
                    transitType: "", // 运输类型
                    pol: "", // 起运港
                    pod: "", // 目的港
                    polId:'',//起运港Id
                    podId:'',//目的港Id
                    polCityId:'',//起运港城市Id
                    podCityId:'',//目的港城市Id
                    polCode: "", // 起始港五字码
                    podCode: "", // 目的港五字码
                    polTerminal: '',//起始港码头
                    podTerminal: '', //目的港码头
                    polTerminalId: "", // 起始港码头Id
                    podTerminalId: "", // 目的港码头Id
                    staticId: "", // 航线代码id
                    routeCode: "", // 航线代码
                    disPlayName: "", // 航线代码
                    etd: "",// etd
                    eta: "", // eta
                    transitTime: '', // 航程 ,如果返回的是0那么页面要显示-
                    delFlag: 0, //删除标志
                },
                portStartList: [], //起运港
                portEndList: [], //目的港
                polPort: [], //起运港码头
                podPort: [], //目的港码头
                lineCodeList: [], //航线代码
                qisgList: {
                    pol : '',
                    polId : '',
                    polCode : '',
                    polTerminal : '',
                    polTerminalId : ''
                },
                transPort: [
                    {
                        value : 'LINE',
                        label : 'LINE',
                    },
                    {
                        value : 'FEEDER',
                        label : 'FEEDER',
                    },
                    {
                        value : 'RAIL',
                        label : 'RAIL',
                    },
                    {
                        value : 'TRUCK',
                        label : 'TRUCK',
                    },
                ],
                ETAList : [
                    {
                        id : 0,
                        label : 'MON',
                    },
                    {
                        id : 1,
                        label : 'TUE',
                    },
                    {
                        id : 2,
                        label : 'WED',
                    },
                    {
                        id : 3,
                        label : 'THU',
                    },
                    {
                        id : 4,
                        label : 'FRI',
                    },
                    {
                        id : 5,
                        label : 'SAT',
                    },
                    {
                        id : 6,
                        label : 'SUN',
                    },
                    {
                        id : '未知',
                        label : '未知',
                    }
                ],
                ETDList : [
                    {
                        id : 0,
                        label : 'MON',
                    },
                    {
                        id : 1,
                        label : 'TUE',
                    },
                    {
                        id : 2,
                        label : 'WED',
                    },
                    {
                        id : 3,
                        label : 'THU',
                    },
                    {
                        id : 4,
                        label : 'FRI',
                    },
                    {
                        id : 5,
                        label : 'SAT',
                    },
                    {
                        id : 6,
                        label : 'SUN',
                    },
                    {
                        id : '未知',
                        label : '未知',
                    }
                ],
            }
        },
        methods: {
            //保存
            async handleSaveClick(ruleForm){
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    if(this.portDesti.length > 0){ //如果有带目的港进来
                        if(this.ruleForm.polId == this.qisgList.polId  && this.ruleForm.polTerminalId == this.qisgList.polTerminalId){
                            if(this.ruleForm.transitType == 'LINE'){ //如果运输类型为LINE  航线代码必填
                                if(this.ruleForm.staticId == ''){
                                    this.$message({
                                        type: "error",
                                        message: "请选择航线代码"
                                    });
                                    return
                                }
                            }
                            this.$emit('pathValue', this.ruleForm);
                        }else{
                            this.$message({
                                type: "error",
                                message: "起始港、码头与上一段的目的港不一致"
                            });
                            return
                        }
                    }else{
                        if(this.ruleForm.transitType == 'LINE'){ //如果运输类型为LINE  航线代码必填
                            if(this.ruleForm.staticId == ''){
                                this.$message({
                                    type: "error",
                                    message: "请选择航线代码"
                                });
                                return
                            }
                        }
                        this.$emit('pathValue', this.ruleForm);
                    }
                }catch(e){}
            },
            resetFrom(ruleForm){
                this.$refs[ruleForm].resetFields();
            },
            //起运港 搜索
            portStartRemote(value) {
                this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=2&port=${value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portStartList = res.data.content;
                    }
                });
            },
            //起运港 foucs
            portStartFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/queryPort?pol=2`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portStartList = res.data.content;
                    }
                });
            },
            //起运港 change
            portStartChange(val) {
                //起运港改变 已选择的起运港码头都清空
                this.polPort = []
                this.ruleForm.polTerminal = ''//起始港码头
                this.ruleForm.polTerminalId = "" // 起始港码头Id
                if(val){
                    for (let i = 0; i < this.portStartList.length; i++) {
                        if(this.portStartList[i].portEn == val){
                            this.ruleForm.polCode = this.portStartList[i].portCode
                            this.ruleForm.polId = this.portStartList[i].id
                            this.ruleForm.polCityId = this.portStartList[i].cityId
                        }
                        
                    }
                }else{
                    this.ruleForm.polCode = ''
                    this.ruleForm.polId = ''
                    this.ruleForm.polCityId = ''
                }
            },
            //目的港 搜索
            portEndRemote(value) {
                this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=2&port=${value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portEndList = res.data.content;
                    }
                });
            },
            //目的港 foucs
            portEndFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/queryPort?pol=2`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portEndList = res.data.content;
                    }
                });
            },
            //目的港 change
            portEndChange(val) {
                //目的港改变 目的港码头一切清空
                this.podPort = []
                this.ruleForm.podTerminal = '' //目的港码头
                this.ruleForm.podTerminalId = "" // 目的港码头Id
                if(val){
                    for (let i = 0; i < this.portEndList.length; i++) {
                        if(this.portEndList[i].portEn == val){
                            this.ruleForm.podCode = this.portEndList[i].portCode
                            this.ruleForm.podId = this.portEndList[i].id
                            this.ruleForm.podCityId = this.portEndList[i].cityId
                        }
                    }
                }else{
                    this.ruleForm.podCode = ''
                    this.ruleForm.podId = ''
                    this.ruleForm.podCityId = ''
                }
            },
            //起始港码头focus
            startPortFocus(){
                if(this.ruleForm.pol){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${this.ruleForm.polCode}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.polPort = res.data.content;
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: "请选择起始港"
                    });
                }
            },
            //起始港码头change
            startPortChange(val){
                if(val){ //选择了起始港码头
                    for (let i = 0; i < this.polPort.length; i++) {
                        if(this.polPort[i].terminalCn == val) {
                            this.ruleForm.polTerminalId = this.polPort[i].id
                        }
                    }
                }else {
                    this.ruleForm.polTerminalId = ''
                }
            },
            //目的港码头focus
            endPortFocus(val){
                if(this.ruleForm.pod){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${this.ruleForm.podCode}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.podPort = res.data.content
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: "请选择目的港"
                    });
                }
            },
            //目的港码头change
            endPortChange(val){
                if(val){ //选择了起始港码头
                    for (let i = 0; i < this.podPort.length; i++) {
                        if(this.podPort[i].terminalCn == val) {
                            this.ruleForm.podTerminalId = this.podPort[i].id
                        }
                    }
                }else {
                    this.ruleForm.podTerminalId = ''
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
                        this.lineCodeList = res.data.content
                    }
                })
            },
            //航线代码change事件
            lineCodeChange(value){
                if(value){
                    for (let i = 0; i < this.lineCodeList.length; i++) {
                        if(this.lineCodeList[i].routeCode === value){
                            this.ruleForm.staticId = this.lineCodeList[i].id
                            this.ruleForm.disPlayName = this.lineCodeList[i].disPlayName ? this.lineCodeList[i].disPlayName : ''
                        }
                    }    
                }else{
                    this.ruleForm.staticId = ''
                }
            },
            //运输类型change事件
            transport(val){
                if(val == 'LINE'){
                    this.isRoute = false
                }else{ //如果选择的不是 line  则不能填写航线代码 之前填的也要删除
                    this.isRoute = true
                    this.ruleForm.staticId = '' // 航线代码id
                    this.ruleForm.routeCode = "" // 航线代码
                }
            },
            //关闭事件
            closePathRouter(){
                this.$emit('closePathRouter');
            }
        },
        mounted() {
            var portDesti = []
            var qis = []
            if(this.routeTitle  === '新增'){
                this.addOrEdit = '新增'; 
            }else{
                this.addOrEdit = '修改';
                this.ruleForm = JSON.parse(JSON.stringify(this.pathRoute))
                if(this.ruleForm.transitType == 'LINE'){
                    this.isRoute = false
                }
            }


            var portDesti = []  //赋值的
            var qis = [] //保存比较的
            
            if(this.portDesti.length > 0){ //说明有目的港带过来
                portDesti = JSON.parse(JSON.stringify(this.portDesti))
                qis = JSON.parse(JSON.stringify(this.portDesti))
                if(this.routeTitle  === '新增'){
                    //刚开始的起始港是 上一段的目的港
                    this.ruleForm.pol = portDesti[0].pod
                    this.ruleForm.polId = portDesti[0].podId
                    this.ruleForm.polCode = portDesti[0].podCode
                    this.ruleForm.polTerminal = portDesti[0].podTerminal
                    this.ruleForm.polTerminalId =  portDesti[0].podTerminalId
                }
                this.qisgList.pol = qis[0].pod
                this.qisgList.polId = qis[0].podId
                this.qisgList.polCode = qis[0].podCode
                this.qisgList.polTerminal = qis[0].podTerminal
                this.qisgList.polTerminalId =  qis[0].podTerminalId
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-form-item--mini .el-form-item__content{
        margin-left: 100px !important;
    }
    /deep/.el-form-item__content{
        margin-left: 100px !important;
    }
    /deep/.el-radio__input{
        float: right;
    }
    /deep/.el-radio__label{
        padding: 0;
        margin-right: 20px;
    }
    .checkbox /deep/.el-checkbox{
        width: 85px;
    }
    .lf{
        float: left;
    }
    .lr{
        float: right;
    }
    .clicksColor{
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
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
        li:nth-of-type(1){
            margin-top: 0px;
        }
        li{
            margin-top: 20px;
            .el-form-item{
                display: inline-block;
                width: 300px;
                margin-right: 20px;
            }
            .el-form-item:nth-of-type(2){
                margin-right: 0;
            }
        }
        .polo{
            margin-right : 20px;
        }
        .podd{
            margin-right : 20px;
        }
    }
    
</style>