<template>
    <div class="routeAdd">
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
                <label class="headeraddOrEdit">
                    {{'重新订阅'}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleClose"></i>
            </div>
            <div class="scrollP">
                <ul class="routeUl">
                    <li class="routeLi">
                        <el-row>
                            <el-col style="width:46%" >
                                <el-form-item label="订阅时间">
                                    <el-date-picker
                                        v-model="ruleForm.operStartTime"
                                        type="datetime"
                                        style="width:100%"
                                        clearable
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="开始日期时间"
                                    >   
                                    </el-date-picker>
                                </el-form-item> 
                            </el-col> 
                            <el-col style="width:46%">
                                <el-form-item label="————">
                                    <el-date-picker
                                        v-model="ruleForm.operEndTime"
                                        style="width:100%"   
                                        type="datetime"
                                        clearable
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="结束日期时间"
                                    >
                                    </el-date-picker>
                                </el-form-item>  
                            </el-col>
                        </el-row>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="handleClickOk">确认</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props:[
            'shipManag',
            'vesselId',
            'origin'
        ],
        data() {
            return {
                ruleForm:{
                    operStartTime: '',
                    operEndTime: ''
                },
                isLoading: false, //isLoading
            }
        },
        components: {
            loading
        },
        methods: {
            //关闭事件
            handleClose(){
                this.$emit('closeSubscribe')
            },
            handleClickOk(){
                if(this.ruleForm.operStartTime == ''){
                    this.ruleForm.operStartTime = null;
                };
                if(this.ruleForm.operEndTime  == ''){
                    this.ruleForm.operEndTime = null;
                };
                if(this.ruleForm.operStartTime == null && this.ruleForm.operEndTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入订阅时间的开始时间和结束时间',
                    });
                    return;
                }else if(this.ruleForm.operStartTime != null && this.ruleForm.operEndTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入订阅时间的结束时间',
                    });
                    return;
                }else if(this.ruleForm.operEndTime != null && this.ruleForm.operStartTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入订阅时间的开始时间',
                    });
                    return;
                }else if(new Date(this.ruleForm.operStartTime) > new Date(this.ruleForm.operEndTime)){
                    this.$message({
                        type : 'error',
                        message : '结束时间不能早于开始时间',
                    });
                    return;
                }
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl +`/trace/batchUploadHistoryTrackRecord?startTime=${this.ruleForm.operStartTime}&endTime=${this.ruleForm.operEndTime}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.handleClose()
                        this.$emit("updatShip")
                        this.$message({
                            type : 'success',
                            message : '重新订阅成功',
                        });
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        })
                    }
                    this.isLoading = false
                })  
            }
        },
        mounted() {
        },
        watch:{ 
        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-table .warning-row {
        background: rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover {
        background: rgba(241, 245, 247, 1);
    }
    /deep/.el-dialog__body{
        padding: 10px !important;
    }
    /deep/.el-col {
        margin-right: 0px !important;
    }
    /deep/.el-row .el-col:nth-last-of-type(1){
        margin-right: 0;
    }
    .scrollP{
        overflow-y: auto;
        height:'400px'
    }
    .routeAdd {
        position: relative;
        overflow: hidden;
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
    .routeUl {
        padding-right: 10px;
        .routeLi {
            margin-top: 20px;
        }
    }
    .title {
        text-align: center;
        margin-bottom: 10px;
        display: inline-block;
        margin-right: 20px;
        span {
            color: #3bafda;
            font-weight: 600;
        }
    }
    .save {
        width: 100%;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 10px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: rgba(4, 153, 255, 1);
            margin-bottom: 10px;
            cursor: pointer;
        }
    }
</style>