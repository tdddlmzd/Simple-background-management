<template>
<!-- 查询记录 -->
    <div class="basicPortContent" ref="basicPortContent">
        <breadcrumb :matched="matched"></breadcrumb>
        <loading v-show="isLoadings"></loading>
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="70px"
            > 
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:23%"> 
                            <el-form-item label="口岸">
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
                        </el-col>
                        <el-col style="width:23%"> 
                            <el-form-item label="船公司">
                                <el-select
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
                        </el-col>
                        <el-col style="width:23%"> 
                            <el-form-item label="航线">
                                <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.routerId"
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
                        </el-col>
                        <el-col style="width:23%" >
                            <el-form-item label="专家姓名">
                                <el-input class="inputWidth" v-model="ruleForm.userName" placeholder="请输入" clearable></el-input>
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
            <el-table-column  prop="userName" label="序号"  :show-overflow-tooltip=true align="left" min-width="40"> 
                <template slot-scope="scope">
                    {{scope.$index +1}}
                </template>
            </el-table-column>
            <el-table-column  prop="portName" label="口岸"  :show-overflow-tooltip=true align="left" min-width="100" :sortable="true" :filters="[]"> </el-table-column>
            <el-table-column  prop="companyName"  label="船公司"  :show-overflow-tooltip=true align="left" min-width="70" :sortable="true" :filters="[]"> </el-table-column>
            <el-table-column  prop="routeName" label="航线"   :show-overflow-tooltip=true align="left" min-width="100" :sortable="true" :filters="[]"></el-table-column>
            <el-table-column  prop="count" label="专家数"   :show-overflow-tooltip=true align="left" min-width="70" :sortable="true" :filters="[]"></el-table-column>
            <el-table-column  prop="userName" label="专家姓名"  :show-overflow-tooltip=true align="left" min-width="90" :sortable="true" :filters="[]"></el-table-column>
            <template slot="empty">
                <noData></noData>
            </template>
          </el-table>
          <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>  
              <!--分页-->
            <div class="tesXin">
                <p class="leftText">认领航线数{{routeCount}}条</p>
                <p class="rightText">专家数{{userCount}}人</p>
            </div>
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
            isLoadings:true,
            ruleForm:{
                portId: '', //口岸id
                companyId: '', //船公司id
                routerId: '', //航线id
                userName:''
            },
            portStartList: [], //起运港/口岸
            companyNameList: [], //船公司
            hangxian: [], //航线
            tableData: [],
            routeCount: '', //航线数
            userCount: '', //专家数
            multipleSelection: [],
            AccessToken:"",
            authorization:"",
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
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            searchList(abnormal){
                this.isLoadings = true
                this.$axios.get(this.commonJs.localUrl +`/expert/expertAuth/getAuthStatistics?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&portId=${this.ruleForm.portId
                }&companyId=${this.ruleForm.companyId
                }&routerId=${this.ruleForm.routerId
                }&userName=${this.ruleForm.userName
                }`,{
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
                        }
                        this.isLoadings = false
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })  
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
            //专家数 航线数
            routeCounts(){
                this.$axios.get(this.commonJs.localUrl +`/expert/expertAuth/getUserRouteCount`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.routeCount = res.data.content.routeCount
                        this.userCount = res.data.content.userCount
                    }
                })
            },
            serchBtn(){
                this.$refs.refPagination.handleCurrentChange(1)
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
        destroyed(){
            this.$bus.off('clickMenu');
        },
        mounted(){
            this.matched = this.$route.matched
            this.searchList()
            this.routeCounts()
            this.$bus.on('clickMenu', content => {
                this.ruleForm={
                    portId: '', //口岸id
                    companyId: '', //船公司id
                    routerId: '', //航线id
                    userName:''
                };
                this.searchList()
                this.routeCounts()
            });
        }
    }
  </script>

<style lang="scss" scoped>
    /deep/.el-row .el-col:nth-last-of-type(1) {
        margin-right: 0;
    }
    /deep/ .el-col {
        margin-right: 20px;
    }
    /deep/ .refPagination input {
        width: 100px !important;
    }
    /deep/.el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/.el-table th{
        height: 30px;
        padding: 0;
     }
    /deep/.el-table__empty-text{
        width: 100%;
    }
    /deep/.el-table .cell{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    /deep/.el-table .caret-wrapper{
        height: 23px;
    }
    /deep/.el-table .sort-caret.ascending{
        top: 0px;
    }
    /deep/.el-table .sort-caret.descending{
        bottom: 1px;
    }
    .tablePage /deep/.el-icon-arrow-down::before{
        color: red;
        display: none;
        margin-left:-10px;
        height: 0;
    }
    /deep/.el-table__column-filter-trigger{
        width: 0;
        height: 0;
    }
    /deep/ .el-table .warning-row {
        background: rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover {
        background: rgba(241, 245, 247, 1);
    }
    
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
    .contentLeft{
        float: left;
        width: 90%;
    }
    .contenRight{
        position: absolute;
        right: 20px;
        bottom: 5px;
    }    
    .basicPortContent{
        position: relative;
        overflow: hidden;
        padding: 20px 20px 0px 20px ;
        .serachBack{
            background-color: #fff ;
            padding: 20px 20px 0px 0px ;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage{
            background-color: #fff ;
            padding: 20px 20px 20px 20px;
            position: relative;
        }
        .refPagination{
            width: 100%;
            background-color: #fff ;
        }
        .tesXin{
            position: absolute;
            height: 42px;
            left: 260px;
            // transform: translateX(-50%);
            bottom: 20px;
            display: flex;
            align-items: center;
            color: #3bafda;
            .leftText{
                margin-right: 20px;
            }
            .rightText{

            }
        }
    }
    
    label:nth-of-type(2){
        width: 10px !important;
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }

</style>
