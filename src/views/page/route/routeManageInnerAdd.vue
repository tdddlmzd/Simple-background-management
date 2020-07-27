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
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <ul class="tableFormUl">
                <li>
                    <el-form-item
                        prop="port"
                        label="港口英文名"
                        :rules="[{ required: true, message: '请输入港口英文名', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.port" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="portCode"
                        label="港口五字码"
                        :rules="[{ required: true, message: '请选择港口五字码', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.portCode"
                            style="width:100%;"
                            placeholder="请输入并选择"
                            filterable
                            clearable
                            remote
                            :remote-method="remotePortCodeMethod"
                            @change="handlePortCodeChange"
                            @focus="handlePortCodeFounc"
                            default-first-option
                        >
                            <el-option
                                v-for="item in portCodeList"
                                :key="item.id"
                                :label="item.baseCode"
                                :title="item.port.length > 50 ? item.port.slice(0,50) + '......' : item.port"
                                :value="item.baseCode"
                            >
                            <span>{{ item.port }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="terminal"
                        label="码头"
                    >
                        <el-input v-model="ruleForm.terminal" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="baseTerminal"
                        label="标准码头"
                    >
                        <el-select
                            v-model="ruleForm.baseTerminal"
                            style="width:100%;"
                            placeholder="请选择"
                            clearable
                            @change="handleStandardPierChange"
                            @focus="handleStandardPierFounc"
                        >
                            <el-option
                                v-for="item in standardPierList"
                                :key="item.id"
                                :label="item.terminalCn"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="eta"
                        label="ETA"
                    >
                        <el-select
                            v-model="ruleForm.eta"
                            style="width:100%;"
                            placeholder="请选择"
                            clearable
                            @change="handleETAChange"
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
                    <el-form-item
                        prop="etd"
                        label="ETD"
                    >
                        <el-select
                            v-model="ruleForm.etd"
                            style="width:100%;"
                            placeholder="请选择"
                            clearable
                            @change="handleETDChange"
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
                </li>
                <li>
                    <el-form-item
                        prop="transitTime"
                        label="航程"
                    >
                        <el-input v-model="ruleForm.transitTime" placeholder="请输入" @input="ruleForm.transitTime = commonJs.handleInputNo(ruleForm.transitTime)" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="direction"
                        label="方向"
                    >
                        <el-select
                            multiple
                            v-model="direction"
                            style="width:100%;"
                            placeholder="请选择"
                            clearable
                            @change="handleDirectionChange"
                            default-first-option
                        >
                            <el-option
                                v-for="item in directionList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li class="checkbox">
                    <el-form-item
                    >
                        <el-checkbox-group v-model="checkList" @change="handleCheckbox">
                            <el-checkbox label="POL"></el-checkbox>
                            <el-checkbox label="POD"></el-checkbox>
                        </el-checkbox-group>
                        <!-- <span class="polo">POL</span> -->
                        <!-- <el-radio v-model="ruleForm.newIsPol" label="POL" @change="handleRadiooChange"></el-radio> -->
                        <!-- <span class="podd">POD</span> -->
                        <!-- <el-radio v-model="ruleForm.newIsPol" label="POD" @change="handleRadioDChange"></el-radio> -->
                    </el-form-item>
                    <el-form-item
                        prop="portNumber"
                        label="挂靠顺序"
                    >
                        <el-input v-model="ruleForm.portNumber" placeholder="请输入" @input="ruleForm.portNumber = commonJs.handleInputNo(ruleForm.portNumber)" clearable></el-input>
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
            'dialogInnerStatus',
            'tablePortruleForm',
            "scac"
        ],
        data() {
            return {
                addOrEdit : '',
                ruleForm : {
                    // 港口名
                    port : '',
                    // 港口五字码
                    portCode : '',
                    // 码头
                    terminal : '',
                    // 标准码头
                    baseTerminal : '',
                    terminalId : '',
                    // ETA
                    eta : '',
                    // ETD
                    etd : '',
                    // 航程
                    transitTime : '',
                    // 方向
                    direction : '',
                    // 0pol，1pod
                    isPol : '',
                    // 挂靠顺序
                    portNumber : '',
                    // 创建时间
                    createTime : '',
                    // 操作时间
                    updateTime : '',
                    // 船公司四字码
                    // scac : '',
                    // 运输类型 0 铁路 1 海运
                    transType : '1',
                    // 直达 0 直达 1 不直达
                    isTransit : '',
                    id : '',
                    newIsPol : 'POD',
                    isSnap: 0,
                },
                checkList: [],
                direction: [],
                standardPierList : [],
                portCodeList : [],
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
                ],
                directionList : [
                    {
                        id : 0,
                        label : 'W',
                    },
                    {
                        id : 1,
                        label : 'E',
                    },
                    {
                        id : 2,
                        label : 'N',
                    },
                    {
                        id : 3,
                        label : 'S',
                    },
                ],
            }
        },
        computed : {
            inputEn :{
                get(){
                    return this.ruleForm.portCode.toUpperCase();
                },
                set(value){
                    this.ruleForm.portCode = value.replace(/[^\w]/ig,'');
                }
            }
        },
        methods: {
            //保存
            async handleSaveClick(ruleForm){
                try{
                    var now = new Date()
                    var year=now.getFullYear(); 
                    var month=('00' + (now.getMonth()+1)).slice(-2); 
                    var date=('00' + now.getDate()).slice(-2); 
                    var hour=('00' + now.getHours()).slice(-2); 
                    var minute=('00' + now.getMinutes()).slice(-2); 
                    var second=('00' + now.getSeconds()).slice(-2); 
                    if(!this.ruleForm.createTime){
                        this.ruleForm.createTime =  year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                    }
                    this.ruleForm.updateTime =  year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    this.$emit('childByValue', this.ruleForm,ruleForm);
                }catch(e){}
            },
            resetFrom(ruleForm){
                this.$refs[ruleForm].resetFields();
            },
            //五字码
            handlePortCodeChange(value){
                if(this.ruleForm.baseTerminal){
                    this.ruleForm.baseTerminal = ''
                    this.ruleForm.terminalId = ''
                }
                if (value === null) {
                    return;
                };
                let obj = this.portCodeList.find(item => {
                    return (item.baseCode == value);
                });
                if(obj){
                   this.ruleForm.routeCn = obj.routeCn;
                   this.ruleForm.routeId = obj.id;
                };
                if(this.ruleForm.routeCn === ''){
                    this.ruleForm.routeCn = '';
                    this.ruleForm.routeId = '';
                };
                if(this.ruleForm.portCode){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${this.ruleForm.portCode}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.standardPierList = res.data.content;
                        if(this.standardPierList.length > 0){
                            this.ruleForm.baseTerminal = this.standardPierList[0].terminalCn;
                            this.ruleForm.terminalId = this.standardPierList[0].id;
                        }
                    })
                }
            },
            //港口五字码
            remotePortCodeMethod(value){
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryBaseCode?scac=${this.scac}&baseCode=${value}`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.portCodeList = res.data.content;
                })
            },
            handlePortCodeFounc(){
                this.portCodeList= []
                if(this.scac){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryBaseCode?scac=${this.scac}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.portCodeList = res.data.content;
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: "请先选择船公司"
                    });
                }
            },
            //标准码头远程搜索
            // remoteStandardPierMethod(value){
            //     if (!value) {
            //        value = '';
            //     };
            //     this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${value}`,
            //         {
            //             headers : {
            //                 Authorization: `Bearer ${this.getAuthorization()}`,
            //                 AccessToken: this.getCookie("token"),
            //             }
            //         }
            //     ).then(res => {
            //         if(res.data.status == 1){
            //             this.standardPierList = res.data.content;
            //         }
            //     })
            // },
            handleStandardPierChange(value){
                if (value === null) {
                    return;
                };
                let obj = this.standardPierList.find(item => {
                    return (item.id == value);
                });
                if(obj){
                    this.ruleForm.baseTerminal = obj.terminalCn;
                    this.ruleForm.terminalId = obj.id;
                };
                if(this.ruleForm.baseTerminal === ''){
                    this.ruleForm.terminalId = '';
                    this.ruleForm.baseTerminal = '';
                };
            },
            handleStandardPierFounc(){
                if(this.ruleForm.portCode){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${this.ruleForm.portCode}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.standardPierList = res.data.content;
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: "请选择港口五字码"
                    });
                }
            },
            handleETAChange(){

            },
            handleETDChange(){

            },
            handleDirectionChange(val){
                if(val.length > 0){
                    var p = val.sort()
                    this.ruleForm.direction = p.join(',')
                }else{
                    this.ruleForm.direction = ''
                }
            },
            handleRadiooChange(value){
                this.ruleForm.newIsPol = value
                this.ruleForm.isPol = 0
            },
            handleRadioDChange(value){
                this.ruleForm.newIsPol = value
                this.ruleForm.isPol = 1
            },
            //多选
            handleCheckbox(val){
                if(val.length > 0){
                    if(val.length == 2){ //代表两个都选了
                        this.ruleForm.isPol = 3
                    }else{
                        if(val[0] == 'POL'){
                            this.ruleForm.isPol = 1
                        }else{
                            this.ruleForm.isPol = 2
                        }
                    }
                }else{
                    this.ruleForm.isPol = 0
                }
            },
            //关闭事件
            handleCloseClick(){
                this.$emit('handleInnerClose');
            }
        },
        mounted() {
            //之前单选的情况  现在多选
            // if(this.tablePortruleForm.isPol !== ''){
            //     if(Number(this.tablePortruleForm.isPol) === 0){
            //         this.tablePortruleForm.newIsPol = 'POL'
            //     }else if(Number(this.tablePortruleForm.isPol) === 1){
            //         this.tablePortruleForm.newIsPol = 'POD'
            //     }
            // }else{
            //     this.tablePortruleForm.newIsPol = ''
            // }
                        // this.direction = ["W","E"]
            if(this.dialogInnerStatus  === '新增'){
                this.addOrEdit = '新增';
            }else{
                this.addOrEdit = '修改';
                this.ruleForm = JSON.parse(JSON.stringify(this.tablePortruleForm))
                this.ruleForm.eta = this.commonJs.getMounthDay(this.ruleForm.eta.toUpperCase());
                this.ruleForm.etd = this.commonJs.getMounthDay(this.ruleForm.etd.toUpperCase());
                //现在POL POD多选
                if(this.tablePortruleForm.isPol !== ''){
                    if(Number(this.tablePortruleForm.isPol) === 0){ //说明没有选值
                        this.checkList = []
                    }else if(Number(this.tablePortruleForm.isPol) === 1){
                        this.checkList = ['POL']
                    }else if(Number(this.tablePortruleForm.isPol) === 2){
                        this.checkList = ['POD']
                    }else if(Number(this.tablePortruleForm.isPol) === 3){
                        this.checkList = ['POL','POD']
                    }
                }else{
                    this.checkList = []
                }
                //方向多选
                if(this.tablePortruleForm.direction !== ''){
                    this.direction = this.tablePortruleForm.direction.split(',')
                }else{
                    this.direction = []
                }
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