<template>
    <div class="basicPortContent" ref="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <loading v-show="isLoadings"></loading>
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="80px"
            > 
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%"> 
                            <el-form-item label="用户名">
                                <el-input v-model="ruleForm.username" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>  
                        </el-col>
                        <!-- <el-col style="width:22%"> 
                            <el-form-item label="手机号">
                                <el-input v-model="ruleForm.mobile" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col style="width:22%"> 
                            <el-form-item label="公司">
                                <el-input v-model="ruleForm.companyName" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="查询类型">
                                <el-select 
                                    v-model="ruleForm.type" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
                                >
                                <el-option
                                    v-for="item in typeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="单号">
                                <el-input v-model="ruleForm.blno" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%"> 
                            <el-form-item label="箱号">
                                <el-input v-model="ruleForm.ctnrno" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="起始港">
                                <el-input v-model="ruleForm.polcd" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="卸货地">
                                <el-input v-model="ruleForm.dtp" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="来源">
                                <el-select 
                                    v-model="ruleForm.origin" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
                                >
                                <el-option
                                    v-for="item in originList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%"  > 
                            <el-form-item label="查询结果">
                                <el-select 
                                    v-model="ruleForm.resultStatus" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                <el-option
                                    v-for="item in resultList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="查询时间">
                                <el-date-picker
                                    v-model="ruleForm.startTime"
                                    type="date"
                                    style="width:100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="开始日期"
                                >   
                                </el-date-picker>
                            </el-form-item> 
                        </el-col> 
                        <el-col style="width:22%">
                            <el-form-item label="——">
                                <el-date-picker
                                    v-model="ruleForm.endTime"
                                    style="width:100%"   
                                    type="date" 
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>  
                        </el-col>
                    </el-row>
                </div>
                <div class="contenRight">
                    <el-button size="small" class="serachBtn" @click="serchBtn">搜索</el-button>
                </div>
                <div style="clear:both;"></div>
          </el-form>
        </div>
        <div class="tablePage">
            <div class="buttonTop">
                <el-button size="small" class="teshunormal" @click="handleExportClick">导出</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column> -->
                <el-table-column prop="id" label="序号" align="left" :show-overflow-tooltip="true" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column  prop="username" label="用户名"  :show-overflow-tooltip=true align="left" min-width="100"> 

                </el-table-column>
                <!-- <el-table-column  prop="mobile" label="手机号"  :show-overflow-tooltip=true align="left" min-width="100"> 

                </el-table-column> -->
                <el-table-column  prop="companyName"  label="公司"  :show-overflow-tooltip=true align="left" min-width="120"> 

                </el-table-column>
                <el-table-column  prop="type"  label="查询类型"  :show-overflow-tooltip=true align="left" min-width="70"> 
                    <template slot-scope="scope">
                        <span>{{scope.row.type == 1 ? "订阅" : scope.row.type == 2 ? "下载" : ""}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="carriercd"  label="船公司"  :show-overflow-tooltip=true align="left" min-width="80"> 

                </el-table-column>
                <el-table-column  prop="blno"  label="单号"  :show-overflow-tooltip=true align="left" min-width="140"> 

                </el-table-column>
                <el-table-column  prop="ctnrno" label="箱号"  :show-overflow-tooltip=true align="left" min-width="90">

                </el-table-column>
                <el-table-column  prop="polcd" label="起始港"  :show-overflow-tooltip=true align="left" min-width="90">

                </el-table-column>
                <el-table-column  prop="dtp" label="卸货地"  :show-overflow-tooltip=true align="left" min-width="90">

                </el-table-column>
                <el-table-column  prop="resultStatus" label="查询结果" :show-overflow-tooltip=true align="left" min-width="120"> 
                    <template slot-scope="scope">
                        <span v-if="scope.row.resultStatus == 1">有数据</span>
                        <span v-if="scope.row.resultStatus == 1005">未订阅</span>
                        <span v-if="scope.row.resultStatus == 3">请求失败</span>
                        <span v-if="scope.row.resultStatus == 4">用户使用错误</span>
                        <span v-if="scope.row.resultStatus == 1000">无数据</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="origin" label="来源"  align="left" min-width="50"> 
                    <template slot-scope="scope">
                        <span>{{scope.row.origin == 1 ? "API" : scope.row.origin == 2 ? "网站" : ""}}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="searchTime"  label="查询时间" :show-overflow-tooltip=true align="left" width="142">

                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                  </template>
            </el-table>
            <!--分页-->
          <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>  
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
                return {
                    isLoadings : true,
                    ruleForm:{
                        username: "",//用户名
                        mobile: "",//手机号
                        companyName: "",//公司
                        type: "",//查询类型
                        blno: "", //单号
                        ctnrno:"", //箱号
                        polcd: '', //起始港
                        dtp: "", //卸货地
                        resultStatus:"", //查询结果
                        origin:"",//来源
                        startTime:"", //开始时间
                        endTime:""//结束时间
                    },
                    tableData: [],
                    multipleSelection: [],
                    //查询结果集合 0：成功 1：暂无数据
                    resultList: [
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 0,
                            label: '有数据'
                        },
                        {
                            value: 1,
                            label: '无数据'
                        },
                        {
                            value: 2,
                            label: '未订阅'
                        },
                        {
                            value: 3,
                            label: '请求失败'
                        },
                        {
                            value: 4,
                            label: '用户使用错误'
                        }
                    ],
                    //来源 1：API 2:网站
                    originList:[
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 1,
                            label: 'API'
                        },
                        {
                            value: 2,
                            label: '网站'
                        }
                    ],
                    // 类型 1:订阅 2：下载
                    typeList:[
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 1,
                            label: '订阅'
                        },
                        {
                            value: 2,
                            label: '下载'
                        }
                    ],
                    pageNo:1,
                    pageSize:10,
                    total:0,
                    // 引用 ThePagination组件
                    refPagination: {},
                    paginationAttribute: {
                        handleChange: this.handleChange
                    },
                    //分页默认状态
                    pageNumber : -1,
                    page: {
                        // 当前页数
                        pageNo: 1,
                        // 每页默认显示条数
                        pageSize: 10,
                        // 总条数
                        total: 0
                    },
                    matched:"",
                }
        },
        components : {
            ThePagination,
            Breadcrumb,
            loading,
            noData
        },
        methods: {
            searchList(abnormal){
                this.isLoadings = true
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }else{ //开始时间要 拼上 '00:00:00'
                    if(this.ruleForm.startTime.indexOf('00:00:00') !== -1){
                        this.ruleForm.startTime = this.ruleForm.startTime
                    }else{
                        this.ruleForm.startTime = this.ruleForm.startTime + ' ' + '00:00:00'
                    }
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }else{ //结束时间要拼上 '23:59:59'
                    if(this.ruleForm.endTime.indexOf('23:59:59') !== -1){
                        this.ruleForm.endTime = this.ruleForm.endTime
                    }else{
                        this.ruleForm.endTime = this.ruleForm.endTime + ' ' + '23:59:59'
                    }
                }
                let query = {
                    username:  this.ruleForm.username,//用户名
                    mobile:  this.ruleForm.mobile,//手机号
                    companyName:  this.ruleForm.companyName,//公司
                    type:  this.ruleForm.type,//查询类型
                    blno:  this.ruleForm.blno, //单号
                    ctnrno: this.ruleForm.ctnrno, //箱号
                    polcd:  this.ruleForm.polcd, //起始港
                    dtp:  this.ruleForm.dtp, //卸货地
                    resultStatus: this.ruleForm.resultStatus, //查询结果
                    origin: this.ruleForm.origin,//来源
                    startTime: this.ruleForm.startTime, //开始时间
                    endTime: this.ruleForm.endTime//结束时间
                }
                this.$axios.post(this.commonJs.localUrl +`/schedules/trace/getHistroyList?pageNumber=${this.page.pageNo}&pageSize=${this.page.pageSize}`, query
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        if(res.data.content){
                            if(res.data.content.length <= 0){
                                this.tableData=[];
                                if(this.$refs.refPagination){
                                    this.$refs.refPagination.page.total = res.data.total;
                                    this.$refs.refPagination.changeValue()                            
                                };        
                            }else{
                                if (res.data.status == 1) {
                                    this.tableData=[];
                                    this.tableData = res.data.content;
                                    if(this.$refs.refPagination){
                                        this.$refs.refPagination.page.total = res.data.total;
                                        this.$refs.refPagination.changeValue()
                                    }           
                                };
                                if(this.$refs.refPagination){
                                    if(Math.ceil(this.$refs.refPagination.page.total / this.page.pageSize) < this.page.pageNo){
                                        this.$refs.refPagination.handleCurrentChange(1);
                                    };
                                };
                            }
                            if(abnormal){
                                this.isLoadings = false;
                                this.$message.success("设置成功")
                                let scroll = document.getElementById('elmain');
                                scroll.style.overflowY = "auto";
                            }else{
                                this.isLoadings = false;
                            }
                        }
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        // this.isLoadings = false;
                    }
                })  
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //导出
            handleExportClick(){
                if(this.$refs.refPagination.page.total > 1000000){
                    this.$message({
                        type: "error",
                        message: "单次导出不可大于100万条"
                    });
                    return
                }
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }
                let query = {
                    username:  this.ruleForm.username,//用户名
                    mobile:  this.ruleForm.mobile,//手机号
                    companyName:  this.ruleForm.companyName,//公司
                    type:  this.ruleForm.type,//查询类型
                    blno:  this.ruleForm.blno, //单号
                    ctnrno: this.ruleForm.ctnrno, //箱号
                    polcd:  this.ruleForm.polcd, //起始港
                    dtp:  this.ruleForm.dtp, //卸货地
                    resultStatus: this.ruleForm.resultStatus, //查询结果
                    origin: this.ruleForm.origin,//来源
                    startTime: this.ruleForm.startTime, //开始时间
                    endTime: this.ruleForm.endTime//结束时间
                }
                this.$axios({method: 'POST',url: this.commonJs.localUrl +`/schedules/trace/exportRecordExcel?total=${this.$refs.refPagination.page.total}`,data:query,
                    responseType: 'blob',
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then((res) => {
                    let url = window.URL.createObjectURL(res.data);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    let contentDisposition = res.headers['content-disposition'];
                    if(contentDisposition){
                        let fileName = res.headers['content-disposition'].split('filename=');
                        link.setAttribute('download', fileName[1]);
                        document.body.appendChild(link);
                        link.click();
                    }else{
                        this.$message.error("暂无数据")
                    }
                });
            },
            serchBtn(){
                if(this.ruleForm.startTime === ''){
                    this.ruleForm.startTime = null;
                };
                if(this.ruleForm.endTime  === ''){
                    this.ruleForm.endTime = null;
                };
                if(this.ruleForm.startTime != null && this.ruleForm.endTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入查询时间的结束时间',
                    });
                    return;
                }else if(this.ruleForm.endTime != null && this.ruleForm.startTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入查询时间的开始时间',
                    });
                    return;
                }
                this.$refs.refPagination.handleCurrentChange(1);
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoadings = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchList();
                this.pageNumber = -1;
            },
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
        },
        mounted(){
            this.matched = this.$route.matched;
            this.searchList();
            this.$bus.on('clickMenu', content => {
                this.$refs.table.clearSort()
                this.ruleForm.username = "",//用户名
                this.ruleForm.mobile = "",//手机号
                this.ruleForm.companyName = "",//公司
                this.ruleForm.type = "",//查询类型
                this.ruleForm.blno = "", //单号，
                this.ruleForm.ctnrno ="", //箱号
                this.ruleForm.polcd ="", //起运港
                this.ruleForm.dtp ="", //
                this.ruleForm.resultStatus ="", //查询结果
                this.ruleForm.origin ="",//来源
                this.ruleForm.startTime ="", //开始时间
                this.ruleForm.endTime =""//结束时间
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.searchList();
            });
        },
        destroyed(){
            this.$bus.off('clickMenu');
        },
    }
  </script>

<style lang="scss" scoped>
    /deep/ .demo-table-expand {
        font-size: 0;
    }
    /deep/ .demo-table-expand label {
        width: 250px;
        color: #99a9bf;
    }
    /deep/.el-row .el-col:nth-last-of-type(1){
            margin-right: 0;
    }
    /deep/ .el-col{
        margin-right: 20px;
    }
    /deep/ .refPagination input{
        width: 100px!important;
    }
    /deep/ .el-table__expand-icon{
        visibility: hidden !important;
    }
    /deep/ .el-table__expanded-cell{
        text-align:center !important;
        color: #3bafda
    }
    /deep/ .el-table th, .el-table tr{
            height: 30px;
    }
    /deep/ .el-table th{
            height: 30px;
            padding: 0;
    }  
    /deep/ .dateTime div:nth-child(1){
        margin-left: 11px !important;
    }
    /deep/ .el-scrollbar__view .el-select-dropdown__list li:nth-of-type(1){
        color:#409EFF;
        font-weight:700
    }
    
    /deep/ .el-table .warning-row{
        background:rgba(241, 245, 247, 1) !important;
    }
    // /deep/ .el-table .el-table__row:hover td{
    //     background:rgba(241, 245, 247, 1);
    // }
    .serachUL {
        list-style:none;margin:0;
    }
    .serachUL li{
        display: inline-block;
    }
    .serachBtn{
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .exception{
        color: #FF0000;
        border: 1px solid #FF0000;
        font-size: 12px;
        border-radius: 3px;
        padding: 7px 15px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        border-spacing: 2px;
        height: 28px;
        line-height: 14px;
    }
    .normal{
        color:#3bafda;
        border: 1px solid #3bafda;
        padding: 9px 15px;
        cursor: pointer;
        background: #fff;
        text-align: center;
        margin-right: 20px;
    }
    .exceptions{
        color: #FF0000;
    }
    .normals{
        color:#3bafda;
    }
    .contentLeft{
        float: left;
        width: 90%;
    }
    .contenRight{
        position: absolute;
        right: 20px;
        bottom: 5px;
    }
    .noClick{
        color:#B3C0D1
    }
    .isClick{
        color: #409EFF;
        cursor:pointer
    }
    
    .basicPortContent{
        position: relative;
        overflow: hidden;
        padding: 20px 20px 0px 20px ;
        .serachBack{
            background-color: #fff ;
            padding: 20px 20px 0px 20px ;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage{
            background-color: #fff ;
            padding: 20px 20px 20px 20px;
        }
        .refPagination{
            width: 100%;
            background-color: #fff ;
        }
    }
    
    label:nth-of-type(2){
        width: 10px !important;
    }
    .buttonTop{
        margin-bottom: 20px;
        .clickColor{
            background-color: #fff;
            padding: 9px 15px;
            margin-right: 10px;
        }
        .teshunormal{
            color:#3bafda;
            border: 1px solid #3bafda;
            width: 80px;
            cursor: pointer;
            background: #fff;
            text-align: center;
            margin-right: 20px;
        }
        .normals{
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .abnormal{
            border: 1px solid #FF0000;
            color: #FF0000;
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }

</style>
