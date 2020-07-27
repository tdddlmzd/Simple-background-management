<template>
    <div class="basicAdd">
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
            label-width="100px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">{{addOrEdit}}</label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <ul class="tableFormUl">
                <li>
                    <el-form-item
                        prop="portCn"
                        label="港口中文"
                        :rules="[{ required: true, message: '请输入港口中文', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.portCn" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="portEn"
                        label="港口英文"
                        :rules="[{ required: true, message: '请输入港口英文', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.portEn" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="portCode"
                        label="港口五字码"
                        :rules="[{ required: true, message: '请输入港口五字码', trigger: 'blur'}]"
                    >
                        <el-input v-model="inputEn" placeholder="请输入" maxlength="5" clearable></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="countryEn"
                        label="国家英文"
                        :rules="[{ required: true, message: '请选择国家英文', trigger: 'change'}]"
                    >
                        <el-select
                            v-model="ruleForm.countryEn"
                            style="width:100%;"
                            placeholder="请输入并选择"
                            filterable
                            remote
                            clearable
                            :remote-method="remoteCountryEnMethod"
                            @change="handleCountryEnChange"
                            @focus="handleCountryEnFounc"
                            default-first-option
                        >
                            <el-option
                                v-for="item in countryEnList"
                                :key="item.id"
                                :label="item.countryEn"
                                :value="item.id"
                                ref="countryEn"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="countryCn" label="国家中文">
                        <el-input v-model="ruleForm.countryCn" readOnly></el-input>
                    </el-form-item>
                    <el-form-item prop="countryCode" label="国家简码">
                        <el-input v-model="ruleForm.countryCode" readOnly></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="cityEn"
                        label="城市英文"
                        :rules="[{ required: true, message: '请选择城市英文', trigger: 'change'}]"
                    >
                        <el-select
                            v-model="ruleForm.cityEn"
                            style="width:100%;"
                            placeholder="请输入并选择"
                            filterable
                            clearable
                            remote
                            :remote-method="remoteCityEnMethod"
                            @change="handleCityEnChange"
                            @focus="handleCityEnFounc"
                            v-if="!countryDisabled"
                        >
                          <el-option
                              v-for="item in cityEnList"
                              :key="item.id"
                              :label="item.cityEn"
                              :value="item.id"
                          >
                          </el-option>
                        </el-select>
                        <el-input v-model="ruleForm.cityEn" readOnly v-else></el-input>
                    </el-form-item>
                    <el-form-item prop="cityCn" label="城市中文">
                        <el-input v-model="ruleForm.cityCn" readOnly></el-input>
                    </el-form-item>
                    <el-form-item prop="routeCn" label="航线">
                        <el-select
                            v-model="ruleForm.routeCn"
                            style="width:100%;"
                            placeholder="请输入并选择"
                            filterable
                            remote
                            clearable
                            :remote-method="remoteRouteCnMethod"
                            @change="handleRouteCnChange"
                            @focus="handleRouteCnFounc"
                        >
                            <el-option
                                v-for="item in routeCnList"
                                :key="item.id"
                                :label="item.routeCn"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li style="marginTop:0px">
                    <div @click.prevent="protAdd" style="cursor: pointer;marginLeft:100px;width:80px;">
                        <i class="el-icon-plus" style="color:#3bafda"></i>
                        <span style="marginLeft:5px;color:#3bafda">添加码头</span>
                    </div>
                </li>
                <li class="proteAddLi">
                    <div class="protClass" v-for="(item,index) in terminal" :key="index">
                        <el-form-item prop="terminalCn" label="码头中文名">
                            <el-input v-model="item.terminalCn" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="terminal" label="码头英文名">
                            <el-input v-model="item.terminal" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                        <i class="el-icon-circle-close delenowAdd" @click="protDelect(index)"></i>
                    </div>
                    <!-- <el-link type="primary" :underline="false" @click="protAdd" class="portadddelect">添加</el-link>
                    <el-link type="danger" :underline="false" @click="protDelect">删除</el-link> -->
                </li>
                <!-- <li v-if="addOrEdit == '编辑'" class="proteAddDelec">
                    <div class="protClass" v-for="(item,index) in terminal" :key="index">
                        <el-form-item prop="terminal" label="码头">
                            <el-select
                                v-model="item.terminalCn"
                                style="width:100%;"
                                placeholder="请输入并选择"
                                filterable
                                remote
                                clearable
                                :remote-method="remoteTerminalMethod"
                                @change="handleTerminalChange"
                                @focus="handleTerminalFounc"
                                default-first-option
                            >
                                <el-option
                                    v-for="item in terminalList"
                                    :key="item.id"
                                    :label="item.terminal"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <i class="el-icon-circle-close delenowAdd" @click="protDelect(index)"></i>
                    </div> -->
                    <!-- <el-link type="primary" :underline="false" @click="protAdd" class="portadddelect">添加</el-link>
                    <el-link type="danger" :underline="false" @click="protDelect" class="portadddelect">删除</el-link> -->
                    <!-- <span class="routeCode">码头名未找到？</span>
                    <span class="nowAdd" @click="routeAddLink">立即添加</span> -->
                <!-- </li> -->
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
// socket功能
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import loading from "@/components/Loading/loading.vue";
export default {
    props: [
        "dialogStatus", 
        "tablesRow"
        ],
    data() {
        return {
            addOrEdit: "",
            isLoading: false,
            countryDisabled: true,
            ruleForm: {
                portCn: "",
                portEn: "",
                portCode: "",
                countryEn: "",
                countryId: "",
                countryCn: "",
                countryCode: "",
                cityEn: "",
                cityId: "",
                cityCn: "",
                routeCn: "",
                routeId: "",
                terminal: [],
            },
            terminal: [
                // {
                //     "id": '', //码头id 修改和删除必填
                //     "terminalCn": '', //码头中文 新增和修改必填
                //     "terminal": '', //码头英文 新增和修改必填
                //     "delFlag": '', // 如果是删除 delFlag必传1
                // }
            ],
            countryEnList: [],
            cityEnList: [],
            routeCnList: [],
            terminalDelecList: []
        };
    },
    components: {
        loading
    },
    methods: {
        //保存
        async handleSaveClick(ruleForm) {
            try {
                let valid = await this.$refs[ruleForm].validate();
                if (!valid) return;
                    var newArry = []
                    for (let i = 0; i < this.terminal.length; i++) {
                        if(this.terminal[i].terminalCn !== '' && this.terminal[i].terminal == '') {
                            this.$message({
                                type: "error",
                                message: "码头中文名不为空 则码头英文名也不能为空"
                            });
                            return
                        }else if(this.terminal[i].terminalCn === '' && this.terminal[i].terminal !== '') {
                            this.$message({
                                type: "error",
                                message: "码头英文名不为空 则码头中文名也不能为空"
                            });
                            return
                        }else if(this.terminal[i].terminalCn !== '' && this.terminal[i].terminal !== '') {
                            newArry.push('' + this.terminal[i].terminalCn + '-' + this.terminal[i].terminal)
                        }
                    }
                    if(newArry.length >0){
                        var newArry = newArry.sort()
                        for (let i = 0; i < newArry.length; i++) {
                            if(newArry[i] == newArry[i + 1]) {
                                this.$message({
                                    type: "error",
                                    message: "码头有重复数据"
                                });
                                return
                            }
                        }
                    }
                if (this.dialogStatus === "新增") {
                    this.$confirm("<div class = 'line'></div></br><span>确认保存吗?</span>","提示",
                        {
                            cancelButtonClass: "btnCustomCencel",
                            confirmButtonClass: "btnCustomSubmit",
                            customClass: "customClass",
                            dangerouslyUseHTMLString: true
                        }
                    ).then(_ => {
                        this.isLoading = true;
                        let newTerminal = []
                        for (let i = 0; i < this.terminal.length; i++) {
                            if(this.terminal[i].terminalCn !== '' && this.terminal[i].terminal !== ''){
                                newTerminal.push(this.terminal[i])
                            }
                        }
                        this.ruleForm.terminal = newTerminal
                        this.$axios.post(this.commonJs.localUrl + `/schedules/port/add`,this.ruleForm,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                        }
                        ).then(res => {
                            if (res.data.status === 1) {
                                    this.$emit("handleStatus", res.data);
                                    this.$message({
                                    type: "success",
                                    message: res.data.message
                                });
                                this.isLoading = false;
                            } else if (res.data.status === 2) {
                                    this.$message({
                                    type: "error",
                                    message: res.data.message
                                });
                                this.isLoading = false;
                            } else if (res.data.status === 3) {
                                    this.$message({
                                    type: "error",
                                    message: res.data.message
                                });
                                this.isLoading = false;
                            }
                        });
                    }).catch(_ => {});
                } else if (this.dialogStatus === "编辑") {
                    this.$confirm("<div class = 'line'></div></br><span>确认保存吗?</span>","提示",
                        {
                            cancelButtonClass: "btnCustomCencel",
                            confirmButtonClass: "btnCustomSubmit",
                            customClass: "customClass",
                            dangerouslyUseHTMLString: true
                        }
                    ).then(_ => {
                        this.isLoading = true;
                        // websocket start
                        var that = this;
                        let uuid = this.commonJs.getUuid();
                        try{
                            that.createsocket(uuid,function(e){
                                console.log(e)
                                if(e.data == 'ok'){
                                    that.$emit("handleStatus", 1);
                                    that.$message({
                                        type: "success",
                                        message: "保存成功"
                                    });
                                    that.isLoading = false;
                                }
                            })
                        }catch(err){
                            console.log(err)
                        }
                        
                        that.ruleForm.socketId = uuid;
                        // websocket end

                    var newTerminal = []
                    for (let i = 0; i < this.terminal.length; i++) {
                        if(this.terminal[i].id){
                            if(this.terminal[i].terminalCn === '' && this.terminal[i].terminal === ''){
                                this.terminal[i].delFlag = 1
                                newTerminal.push(this.terminal[i])
                            }
                        }
                        if(this.terminal[i].terminalCn !== '' && this.terminal[i].terminal !== ''){
                            newTerminal.push(this.terminal[i])
                        }
                    }
                    this.ruleForm.terminal = newTerminal.concat(this.terminalDelecList)
                    this.$axios.put(this.commonJs.localUrl + `/schedules/port/modify`,
                        this.ruleForm,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                        }
                    ).then(res => {
                        // if(res.data.status === 1){
                        //     this.$emit("handleStatus", res.data);
                        //     this.$message({
                        //         type: "success",
                        //         message: res.data.message
                        //     });
                        //     this.isLoading = false;
                        // }else 
                        if (res.data.status === 2) {
                            this.$message({
                                type: "error",
                                message: res.data.message
                            });
                            this.isLoading = false;
                        } else if (res.data.status === 3) {
                            this.$message({
                                type: "error",
                                message: res.data.message
                            });
                            this.isLoading = false;
                        }
                    });
                    }).catch(_ => { });
                }
            } catch (e) { }
        },
    //国家
    handleCountryEnChange(value) {
        if (value === null) {
            return;
        }
        let obj = this.countryEnList.find(item => {
            return item.id == value;
        });
        if (obj) {
            this.ruleForm.countryCn = obj.countryCn;
            this.ruleForm.countryCode = obj.countryCode;
            this.ruleForm.countryId = obj.id;
            this.countryDisabled = false;
            this.ruleForm.cityId = "";
            this.ruleForm.cityCn = "";
            this.ruleForm.cityEn = "";
        }
        if (this.ruleForm.countryEn === "") {
            this.ruleForm.countryId = "";
            this.countryDisabled = true;
        }
        // if(this.ruleForm.countryEn !== ''){
        //     this.$refs.countryEn[0].$vnode.elm.style.backgroundColor = 'transparent';
        //     this.$refs.countryEn[0].$vnode.elm.style.color = '#000';
        // };
    },
    remoteCountryEnMethod(value) {
        if (!value) {
            value = "";
        }
        this.$axios.get(this.commonJs.localUrl + `/schedules/port/queryCountry?countryName=${value}`,
            {
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token")
                }
            }
        ).then(res => {
            this.countryEnList = res.data.content;
        });
    },
    handleCountryEnFounc() {
        this.$axios.get(this.commonJs.localUrl + `/schedules/port/queryCountry`, {
            headers: {
                Authorization: `Bearer ${this.getAuthorization()}`,
                AccessToken: this.getCookie("token")
            }
        }).then(res => {
            this.countryEnList = res.data.content;
        });
    },
    //城市
    handleCityEnChange(value) {
        if (value === null) {
            return;
        }
        let obj = this.cityEnList.find(item => {
            return item.id == value;
        });
        if (obj) {
            this.ruleForm.cityId = obj.id;
            this.ruleForm.cityCn = obj.cityCn;
            this.ruleForm.cityEn = obj.cityEn;
        }
        if (this.ruleForm.cityEn === "") {
            this.ruleForm.cityId = "";
            this.ruleForm.cityCn = "";
        }
    },
    remoteCityEnMethod(value) {
        if (!value) {
            value = "";
        }
        this.$axios.get(this.commonJs.localUrl + `/schedules/port/queryCity?cityName=${value}&countryId=${this.ruleForm.countryId}`,
            {
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token")
                }
            }
        ).then(res => {
          this.cityEnList = res.data.content;
        });
    },
    //航线
    handleCityEnFounc() {
        this.$axios.get(this.commonJs.localUrl +  `/schedules/port/queryCity?countryId=${this.ruleForm.countryId}`,
            {
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token")
                }
            }
        ).then(res => {
          this.cityEnList = res.data.content;
        });
    },
    //航线change
    handleRouteCnChange(value) {
        if (value === null) {
            return;
        }
        let obj = this.routeCnList.find(item => {
            return item.id == value;
        });
        if (obj) {
            this.ruleForm.routeCn = obj.routeCn;
            this.ruleForm.routeId = obj.id;
        }
        if (this.ruleForm.routeCn === "") {
            this.ruleForm.routeCn = "";
            this.ruleForm.routeId = "";
        }
    },
    //航线搜索
    remoteRouteCnMethod(value) {
        if (!value) {
            value = "";
        }
        this.$axios.get(this.commonJs.localUrl +  `/schedules/port/queryRoute?routeName=${value}`,
            {
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token")
                }
            }
        ).then(res => {
          this.routeCnList = res.data.content;
        });
    },
    //航线聚焦
    handleRouteCnFounc() {
        this.$axios.get(this.commonJs.localUrl + `/schedules/port/queryRoute`, {
            headers: {
                Authorization: `Bearer ${this.getAuthorization()}`,
                AccessToken: this.getCookie("token")
            }
        }).then(res => {
            this.routeCnList = res.data.content;
        });
    },
    //码头搜索
    // remoteTerminalMethod(value) {
    //     if (!value) {
    //         value = "";
    //     }
    //     this.$axios.get(this.commonJs.localUrl +  `/schedules/route/queryTerminal?terminal=${value}`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${this.getAuthorization()}`,
    //                 AccessToken: this.getCookie("token")
    //             }
    //         }
    //     ).then(res => {
    //         this.terminalList = res.data.content;
    //     });
    // },
    //码头change
    // handleTerminalChange(value) {
    //     if (value === null) {
    //         return;
    //     }
    //     let obj = this.terminalList.find(item => {
    //         return item.id == value;
    //     });
    //     if (obj) {
    //         this.ruleForm.terminal = obj.terminal;
    //         this.ruleForm.terminalId = obj.id;
    //     }
    //     if (this.ruleForm.terminal === "") {
    //         this.ruleForm.terminal = "";
    //         this.ruleForm.terminalId = "";
    //     }
    // },
    //码头聚焦
    // handleTerminalFounc() {
    //     this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal`, {
    //         headers: {
    //             Authorization: `Bearer ${this.getAuthorization()}`,
    //             AccessToken: this.getCookie("token")
    //         }
    //     }).then(res => {
    //         this.terminalList = res.data.content;
    //     });
    // },
    //关闭事件
    handleCloseClick() {
        this.$emit("handleClose");
    },
    //编辑 数据回显
    basicPortSearch(res) {
        this.$axios.get(this.commonJs.localUrl + `/schedules/port/view?id=${res.id}`,{
            headers: {
                Authorization: `Bearer ${this.getAuthorization()}`,
                AccessToken: this.getCookie("token")
            }
        }).then(res =>{
            this.ruleForm = res.data.content
            if (res.data.content.countryId) {
                this.countryDisabled = false;
            } else {
                this.countryDisabled = true;
            }
            if(res.data.content.terminalList.length > 0){
                this.terminal = res.data.content.terminalList
            }
        })
    },
    //编辑添加
    protAdd() {
        this.terminal.push(
            {
                "id": '', //码头id 修改和删除必填
                "terminalCn": '', //码头中文 新增和修改必填
                "terminal": '', //码头英文 新增和修改必填
                "delFlag": '', // 如果是删除 delFlag必传1
            }
        )
    },
    //编辑删除
    protDelect(index) {
        var delectProt = this.terminal.splice(index,1)[0]
        if(this.dialogStatus === "编辑"){
            if(delectProt.id){
                delectProt.delFlag = 1
                this.terminalDelecList.push(delectProt)
            }
        }
    },
    //立即添加 跳转到码头
    // routeAddLink() {
    //     this.$router.push('/BasicData/Dock')
    // },
  },
  computed: {
        inputEn: {
            get() {
                return this.ruleForm.portCode.toUpperCase();
            },
            set(value) {
                this.ruleForm.portCode = value.replace(/[^\w]/gi, "");
            }
        }
  },
    mounted() {
        if (this.dialogStatus === "新增") {
            this.addOrEdit = "新增";
        } else if (this.dialogStatus === "编辑") {
            this.addOrEdit = "编辑";
            this.basicPortSearch(JSON.parse(JSON.stringify(this.tablesRow)))
        }
    }
};
</script>

<style lang="scss" scoped>
    /deep/.el-form-item--mini .el-form-item__content {
        margin-left: 100px !important;
    }
    /deep/.el-form-item__content {
        margin-left: 100px !important;
    }
    .basicAdd {
        position: relative;
    }
    .lf {
        float: left;
    }
    .lr {
        float: right;
    }
    .clicksColor {
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
    }
    .headerContent {
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit {
        font-size: 18px;
        margin-left: 10px;
    }
    .headeraddOrEditClose {
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .tableFormUl {
        padding-top: 20px;
        li:nth-of-type(1) {
            margin-top: 0px;
        }
        li {
            margin-top: 20px;
            .el-form-item {
                display: inline-block;
                width: 300px;
                margin-right: 20px;
            }
        }
    }
    .proteAddLi{
        width: 750px;
    }
    .proteAddDelec{
        width: 600px;
    }
    .protClass{
        display: inline-block;
        margin-bottom: 20px;
    }
    .portadddelect{
        margin-right: 20px;
    }
    .nowAdd{
        color: #3bafda;
        cursor: pointer;
    }
    .delenowAdd{
        color: red;
        cursor: pointer;
    }
</style>