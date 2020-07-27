<template>
    <div class="shippingAdd">
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
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
                        prop="carrier"
                        label="船公司" 
                        label-width="130px"
                        :rules="[{ required: true, message: '请输入船公司', trigger: 'blur'}]">
                        <el-select 
                            remote  
                            clearable 
                            filterable  
                            v-model="ruleForm.carrier" 
                            placeholder="请输入并选择"
                            v-if="!companyDisabled"
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
                        <el-input v-model="ruleForm.carrier" readOnly v-else></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="portScac"
                        label="港口全称"
                        label-width="100px"
                        :rules="[{ required: true, message: '请输入港口全称', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.portScac" :readOnly="disabledPortScac" placeholder="请输入" :clearable="!disabledPortScac"></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="baseCode"
                        label="基础港口五字码"
                        label-width="130px"
                        :rules="[{ required: true, message: '请选择基础港口五字码', trigger: 'change'}]"
                    >
                        <el-select
                            v-model="ruleForm.baseCode"
                            style="width:100%;"
                            placeholder="请输入并选择"
                            filterable
                            clearable
                            remote
                            :remote-method="remoteBaseCodeListMethod"
                            @change="handleBaseCodeListChange"
                            @focus="handleBaseCodeListFounc"
                        >
                            <el-option
                                v-for="(item,index) in baseCodeList"
                                :key="index"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <span class="fiveCode">五字码未找到？</span>
                    <span class="nowAdd" @click="handleNowAddClick">立即添加</span>
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
    import loading from "@/components/Loading/loading.vue";
    // socket功能
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    export default {
        props:[
            'dialogStatus',
            'tablesRow',
            'scacF',
        ],
        data() {
            return {
                addOrEdit : '',
                isLoading : false,
                disabledPortScac : false,
                companyDisabled: false,
                ruleForm : {
                    portScac : '',
                    baseCode : '',
                    scac : this.scacF,
                    carrier : '',
                },
                baseCodeList : [],
                companyNameList:[],
            }
        },
        components : {
            loading,
        },
        methods: {
            //保存
            async handleSaveClick(ruleForm){
                try {
                    let valid = await this.$refs[ruleForm].validate();
                    if (!valid) return;
                    if(this.dialogStatus === '新增'){
                        this.$confirm("<div class = 'line'></div></br><span>确认保存?</span>", "提示", {
                                cancelButtonClass: "btnCustomCencel", 
                                confirmButtonClass:"btnCustomSubmit",
                                customClass:"customClass",
                                dangerouslyUseHTMLString:true,
                                }) .then(_ => {
                                    this.isLoading = true;
                            this.$axios.post(this.commonJs.localUrl + `/schedules/scacPort/add`,
                                qs.stringify(this.ruleForm),
                                {
                                    headers : {
                                        Authorization: `Bearer ${this.getAuthorization()}`,
                                        AccessToken: this.getCookie("token"),
                                    }
                                }
                            ).then(res => {
                                if(res.data.status === 1){
                                    this.$emit('handleStatus',res.data);
                                    this.$message({
                                        type:'success',
                                        message: res.data.message,
                                    })
                                }else if(res.data.status === 2){
                                    this.$message({
                                        type:'error',
                                        message: res.data.message,
                                    })
                                }else if(res.data.status === 3){
                                    this.$message({
                                        type:'error',
                                        message: res.data.message,
                                    })
                                }
                                this.isLoading = false;
                            })
                        }).catch(_ => {});
                    }else if(this.dialogStatus === '编辑'){
                        this.$confirm("<div class = 'line'></div></br><span>确认保存吗?</span>", "提示", {
                                cancelButtonClass: "btnCustomCencel", 
                                confirmButtonClass:"btnCustomSubmit",
                                customClass:"customClass",
                                dangerouslyUseHTMLString:true,
                            }).then(_ => {
                            this.isLoading = true;
                            // websocket start
                            var that = this;
                            let uuid = this.commonJs.getUuid();
                            try{
                                that.createsocket(uuid,function(e){
                                    console.log(e.data)
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

                            let obj = this.ruleForm;
                            if( obj.state === "使用中"){
                                obj.state = 0
                            }else if(obj.state === "未使用"){
                                obj.state = 1
                            }else if(obj.state === "待审核"){
                                obj.state = 2
                            }
                            this.$axios.put(this.commonJs.localUrl + `/schedules/scacPort/modify`,
                                qs.stringify(obj),
                                {
                                    headers : {
                                        Authorization: `Bearer ${this.getAuthorization()}`,
                                        AccessToken: this.getCookie("token"),
                                    }
                                }
                            ).then(res => {
                                // if(res.data.status === 1){
                                //     this.$emit('handleStatus',res.data);
                                //     this.$message({
                                //         type:'success',
                                //         message: res.data.message,
                                //     })
                                // }else 
                                if(res.data.status === 2){
                                    this.$message({
                                        type:'error',
                                        message: res.data.message,
                                    });
                                    this.isLoading = false;
                                }else if(res.data.status === 3){
                                    this.$message({
                                        type:'error',
                                        message: res.data.message,
                                    });
                                }
                                    this.isLoading = false;
                            })
                        }).catch(_ => { });
                    };
                }catch (e){ };
            },
            //五字码
            handleBaseCodeListChange(value){
                if (value === null) {
                    return;
                };
                let obj = this.baseCodeList.find(item => {
                    return (item.id == value);
                });
                if(obj){
                   this.ruleForm.routeCn = obj.routeCn;
                   this.ruleForm.routeId = obj.id;
                };
                if(this.ruleForm.routeCn === ''){
                    this.ruleForm.routeCn = '';
                    this.ruleForm.routeId = '';
                };
            },
            remoteBaseCodeListMethod(value){
                if (!value) {
                   value = '';
                };
                this.$axios.get(this.commonJs.localUrl + 
                `/schedules/scacPort/queryBaseCode?baseCode=${value}`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.baseCodeList = res.data.content;
                })
            },
            handleBaseCodeListFounc(){
                this.$axios.get(this.commonJs.localUrl + 
                `/schedules/scacPort/queryBaseCode`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.baseCodeList = res.data.content;
                })
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
                        this.ruleForm.scac = this.companyNameList[i].scac
                    }
                }    
            },  
            //添加五字码
            handleNowAddClick(){
                this.$emit('handleClose');
                this.$store.commit("handleNowAdd",true);
            },
            //关闭事件
            handleCloseClick(){
                this.$emit('handleClose');
            }
        },
        mounted() {
            if(this.dialogStatus === '新增'){
                this.addOrEdit = '新增';
                this.companyDisabled = false;
            }else if(this.dialogStatus === '编辑'){
                this.addOrEdit = '编辑';
                this.companyDisabled = true;
                this.ruleForm = JSON.parse(JSON.stringify(this.tablesRow));
                if(this.ruleForm.state === '使用中'){
                    this.disabledPortScac = true;
                }else{
                    this.disabledPortScac = false;
                }
            };
        }
    }
</script>

<style lang="scss" scoped>
    .shippingAdd{
        position: relative;
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
        // position: absolute;
        // right: 0;
        // top: 0;
        // float: right;
    }
    .headerContent{
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit{
        font-size: 18px;
        margin-left: 10px;
    }
    .headeraddOrEditClose{
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .fiveCode{

    }
    .nowAdd{
        color: #3bafda;
        cursor: pointer;
    }
    .tableFormUl{
        padding-top: 20px;
        li:nth-of-type(1){
            width: 350px;
        }
        li{
            display: inline-block;
            width: 350px;
            margin-right: 20px;
        }
        li:nth-of-type(3){
            width: 350px;
        }
        li:nth-of-type(4){
            width: auto;
            // position: relative;
        }
        li:nth-of-type(5){
            width: 100%;
            height: 10px;
            // position: relative;
        }
    }
    
</style>