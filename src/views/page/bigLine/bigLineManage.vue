<template>
    <div>
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="180px"
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
                <el-form-item prop="nameCn" label="大航线中文名" :rules="[{ required: true, message: '请输入航线中文名', trigger: 'blur'}]">
                    <el-input v-model="ruleForm.nameCn" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item prop="nameEn" label="大航线英文名">
                    <el-input v-model="ruleForm.nameEn" placeholder="请输入" clearable></el-input>
                </el-form-item>
            </li>
            <li>
                <el-form-item prop="code" label="简码">
                    <el-input v-model="ruleForm.code" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="展示顺序">
                    <el-input v-model="ruleForm.sort" placeholder="请输入" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" clearable></el-input>
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
                    id: '',
                    //大航线中文名
                    nameCn: '',
                    //大航线英文名
                    nameEn: '',
                    //简码
                    code: '',
                    //展示顺序
                    sort: '',
                },
                portList: []
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
                        this.$axios.get(this.commonJs.localUrl + `/schedules/area/add?nameCn=${this.ruleForm.nameCn
                        }&nameEn=${this.ruleForm.nameEn
                        }&code=${this.ruleForm.code
                        }&sort=${this.ruleForm.sort}`,
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
                            }else{
                                this.$message({
                                    type: "error",
                                    message: res.data.message
                                });
                                this.isLoading = false;
                            }
                        })
                    }else if(this.dialogInnerStatus === "修改"){
                        this.isLoading = true;
                        this.$axios.get(this.commonJs.localUrl + `/schedules/area/update?nameCn=${this.ruleForm.nameCn
                        }&nameEn=${this.ruleForm.nameEn
                        }&code=${this.ruleForm.code
                        }&sort=${this.ruleForm.sort
                        }&id=${this.ruleForm.id}`,
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
                            }else{
                                this.$message({
                                    type: "error",
                                    message: res.data.message
                                });
                                this.isLoading = false;
                            }
                        })
                    }
                }catch(e){}
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
                this.ruleForm.nameCn = this.tablesRow.areaCn
                this.ruleForm.nameEn = this.tablesRow.areaEn
                this.ruleForm.sort = this.tablesRow.webSort
                this.ruleForm.code = this.tablesRow.areaCode
                this.ruleForm.id = this.tablesRow.id
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
                width: 44%;
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