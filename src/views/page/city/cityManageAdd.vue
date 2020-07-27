<template>
    <div>
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
                <el-form-item prop="cityCn" label="城市中文名" :rules="[{ required: true, message: '请输入城市中文名', trigger: 'blur'}]">
                    <el-input v-model="ruleForm.cityCn" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item prop="cityEn" label="城市英文名" :rules="[{ required: true, message: '请输入城市英文名', trigger: 'blur'}]">
                    <el-input v-model="ruleForm.cityEn" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item prop="countryCode" label="所属国家" :rules="[{ required: true, message: '请输入所属国家', trigger: 'blur'}]">
                    <el-select
                        v-model="ruleForm.countryCn"
                        style="width:100%;"
                        placeholder="请输入国家中文/英文名"
                        filterable
                        clearable
                        remote
                        :remote-method="remoteCountryEnMethod"
                        @focus="handleCountryEnFounc"
                        @change="handleCountryEnChange"
                        default-first-option
                    >
                        <el-option
                            v-for="item in countryEnList"
                            :key="item.id"
                            :label="item.countryEn + '('+ item.countryCn + ')'"
                            :value="item.id"
                        >
                        <!-- <span> + '('+ item.countryCn + ')'</span> -->
                            <span style="float: left">{{item.countryEn+"("+ item.countryCn+")" }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </li>
            <li style="clear:both"></li>
        </ul>
        <div class="save" style="text-align: center;">
            <el-button class="saveBtn" @click="handleSaveClick('ruleForm')">保存</el-button>
        </div>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props: [
            "dialogInnerStatus",
            "tablesRow",
            ],
        data() {
            return {
                addOrEdit: "",
                isLoading: false,
                ruleForm: {
                    //ID
                    id:'',
                    //城市英文
                    cityEn: '',
                    //城市中文
                    cityCn: '',
                    //国家2字码
                    countryCode: '',
                    //国家ID
                    countryId: '',
                },
                countryEnList: []
            };
        },
        components: {
            loading
        },
        methods: {
            //保存数据
            async handleSaveClick(ruleForm) {
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    if(this.dialogInnerStatus === "新增"){
                        this.isLoading = true;
                        this.$axios.post(this.commonJs.localUrl + `/schedules/city/add`,
                            this.ruleForm,
                            {
                                headers : {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token"),
                                }
                            }
                        ).then(res =>{
                            if(res.data.status == 1){
                                this.$emit("handleStatus", res.data);
                                this.$message({
                                    type: "success",
                                    message: "保存成功"
                                });
                                this.isLoading = false;
                            }else if(res.data.status == 3){
                                this.$message({
                                    type: "error",
                                    message: "城市已存在"
                                });
                                this.isLoading = false;
                            }else{
                                this.$message({
                                    type: "error",
                                    message: "保存失败"
                                });
                                this.isLoading = false;
                            }
                        })
                    }else if(this.dialogInnerStatus === "修改"){
                        this.isLoading = true;
                        this.$axios.put(this.commonJs.localUrl + `/schedules/city/modify`,
                            this.ruleForm,
                            {
                                headers : {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token"),
                                }
                            }
                        ).then(res =>{
                            if(res.data.status == 1){
                                this.$emit("handleStatus", res.data);
                                this.$message({
                                    type: "success",
                                    message: "保存成功"
                                });
                                this.isLoading = false;
                            }else if(res.data.status == 3){
                                this.$message({
                                    type: "error",
                                    message: "城市已存在"
                                });
                                this.isLoading = false;
                            }else{
                                this.$message({
                                    type: "error",
                                    message: "保存失败"
                                });
                                this.isLoading = false;
                            }
                        })
                    }
                }catch(e){}
            },
            //国家change
            handleCountryEnChange(value) {
                if (value === null) {
                    return;
                }
                let obj = this.countryEnList.find(item => {
                    return item.id == value;
                });
                if (obj) {
                    this.ruleForm.countryCode = obj.countryCode;
                    this.ruleForm.countryId = obj.id;
                }
            },
            //国家 远程搜索
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
            //国家focues
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
            //关闭事件
            handleCloseClick() {
                this.$emit("handleClose");
            },
        },
        mounted() {
            if (this.dialogInnerStatus === "新增") {
                this.addOrEdit = "新增";
            } else if(this.dialogInnerStatus === "修改") {
                this.addOrEdit = "修改";
                this.tablesRow.portCode = this.tablesRow.basePort
                this.ruleForm = JSON.parse(JSON.stringify(this.tablesRow))
            }
        }
    };
</script>

<style lang="scss" scoped>
    // /deep/.el-form-item--mini .el-form-item__content {
    //     margin-left: 100px !important;
    // }
    // /deep/.el-form-item__content {
    //     margin-left: 100px !important;
    // }
    // /deep/.el-dialog__body{
    //     padding: 10px !important;
    // }
    .lf {
        float: left;
    }
    .lr {
        float: right;
    }
    .clicksColor {
        color: #fff;
        background-color: #3bafda;
        float: right;
    }
    .headerContent {
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit {
        margin-left: 10px;
        font-size: 18px;
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
    .save {
        width: 100%;
        text-align: right;
        margin-top: 40px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: #3bafda;
            // margin-bottom: 10px;
        }
    }
</style>