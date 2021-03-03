<template>
    <div>
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="70px"
        :model="ruleForm"
        ref="ruleForm"
        size="mini"
        class="ruleForm"
        >
        <div class="headerContent">
            <label class="headeraddOrEdit">{{addOrEdit}}</label>
            <i class="headeraddOrEditClose el-icon-close lr" @click="courseClose"></i>
        </div>
        <ul class="tableFormUl">
            <li>
                <el-form-item label="口岸" :rules="[{ required: true, message: '请输入口岸', trigger: 'blur'}]" prop="portId">
                    <el-select
                        remote
                        clearable
                        filterable
                        v-model="ruleForm.portId"
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
                            :value="item.id"
                            :title='item.portEn+"("+ item.portCode+")"'
                        >
                            <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="船公司" :rules="[{ required: true, message: '请输入船公司', trigger: 'blur'}]" prop="companyId">
                    <el-select
                        multiple
                        remote
                        clearable
                        filterable
                        v-model="ruleForm.companyId"
                        placeholder="请输入并选择"
                        :remote-method="companyNameRemote"
                        @focus="companyNameFocus"
                        @change="companyNameChange"
                        style="width:100%"
                    >
                        <el-option
                            v-for="item in companyNameList"
                            :key="item.id"
                            :label="item.companyName"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="航线" :rules="[{ required: true, message: '请输入航线', trigger: 'blur'}]" prop="routeId">
                    <el-select
                        multiple
                        remote
                        clearable
                        filterable
                        v-model="ruleForm.routeId"
                        placeholder="请输入并选择"
                        :remote-method="hangxRemote"
                        @focus="hangxFocus"
                        @change="hangxChange"
                        style="width:100%"
                    >
                        <el-option
                            v-for="item in hangxian"
                            :key="item.routeId"
                            :label="item.routeCn"
                            :value="item.routeId"
                        >
                            <span>{{item.routeCn}}</span>
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
            "userId",
            "courseText",
            "courseInfor",
            ],
        data() {
            return {
                addOrEdit: "",
                isLoading: false,
                ruleForm: {
                    portId: '', //口岸id
                    companyId: '', //船公司id
                    routeId: '', //航线id
                },
                portStartList: [], //起运港/口岸
                companyNameList: [], //船公司
                hangxian: [], //航线
            };
        },
        components: {
            loading
        },
        methods: {
            //保存数据
            async handleSaveClick(ruleForm) {
                try {
                    let valid = await this.$refs[ruleForm].validate();
                    if (!valid) return
                    this.isLoading = true
                    var query = {
                        userId: this.userId, 
                        portId: this.ruleForm.portId,
                        routeId: this.ruleForm.routeId,
                        companyId: this.ruleForm.companyId                  
                    }
                    if(this.courseText === "新增"){
                        this.$axios.post(this.commonJs.localUrl + `/expert/expertAuth/addExpertAuth`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("courseUpdate")
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.courseClose()
                                }else if(res.data.status == 5){
                                    this.$message({
                                        type: "error",
                                        message: "已存在该航线认证"
                                    })
                                    this.isLoading = false
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据加载失败 请重新加载页面"
                                    })
                                }
                            })
                    }else{
                    
                    }

                } catch (e) {}
            },
            //起运港 搜索
            portStartRemote(value) {
                this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=0&port=${value}`,
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
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/queryPort?pol=0`, {
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
            portStartChange(val) {},
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
                        this.companyNameList = res.data.content
                    }
                })
            },
            //船公司Focus事件
            companyNameFocus(){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCompany`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.companyNameList = res.data.content
                    }
                })
            },
            //船公司change事件
            companyNameChange(value){
                // console.log(value,'valuevalue')
            },
            //航线搜索
            hangxRemote(value){
                this.$axios.get(this.commonJs.localUrl +`/schedules/route/getAllRoute?routeCn=${value}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.hangxian = res.data.content
                    }
                })
            },
            //航线Focus事件
            hangxFocus(){
                this.$axios.get(this.commonJs.localUrl +`/schedules/route/getAllRoute`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.hangxian = res.data.content
                    }
                })
            },
            //航线change事件
            hangxChange(){},
            //关闭事件
            courseClose() {
                this.$emit("courseClose")
            },
        },
        mounted() {
            if (this.courseText === "新增") {
                this.addOrEdit = "新增"
            } else if(this.courseText === "修改") {
                this.addOrEdit = "修改"
            }
        },
    };
</script>

<style lang="scss" scoped>
    .lr {
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
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: rgba(4, 153, 255, 1);
            margin-bottom: 10px;
            cursor: pointer;
        }
    }
</style>