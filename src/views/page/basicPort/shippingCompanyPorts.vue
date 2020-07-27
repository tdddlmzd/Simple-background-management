<template>
    <div class="basicPort" ref="basicPort">
        <Loading v-show="isLoading" ref="loading" class="loading"></Loading>
        <div class="serachBack">
            <el-form
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                size="mini"
                class="ruleForm"
                label-width="80px"
            >
                    <el-form-item
                        prop="companyName"
                        label="船公司"
                        class="el_formContent"
                    >
                        <el-select
                            v-model="ruleForm.companyName"
                            style="width:100%;"
                            placeholder="请输入并选择"
                            filterable
                            remote
                            clearable
                            :remote-method="remoteCompanyNameMethod"
                            @change="handleCompanyNameChange"
                            @focus="handleCompanyNameFounc"
                        >
                            <el-option
                                v-for="item in companyNameList"
                                :key="item.scac"
                                :label="item.companyName"
                                :value="item.scac"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="portScac"
                        label="港口全称"
                        class="el_formContent"
                    >
                        <el-input v-model="ruleForm.portScac" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="baseCode"
                        label="基础五字码"
                        class="el_formContent"
                        label-width="90px"
                    >
                        <el-input v-model="ruleForm.baseCode" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="state"
                        label="状态"
                        class="el_formContent"
                    >
                        <el-select
                            v-model="ruleForm.state"
                            style="width:100%;"
                            placeholder="请选择"
                            @change="handleStateChange"
                            clearable
                        >
                            <el-option
                                v-for="item in stateList"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="contenRight">
                    <el-button size="small" class="clickColor serachBtn" @click="handeleSearchList">搜索</el-button>
                </div>
            </div>
            <div class="tablePage">
                <el-button size="small" class="clickColor clickAdd" @click="handleAddClick">新增</el-button>
                <el-table 
                    :data="tableData" 
                    style="width: 100%" 
                    :header-cell-style="{backgroundColor:'rgba(59, 175, 218, 1)' ,color:'white',fontSize:'12px'}"
                    :row-class-name="tabRowClassName"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    @row-dblclick="handleCurrentChange"
                >
                    <el-table-column prop="id" align="left" label="序号" width="50px">
                        <template slot-scope="scope">
                            {{scope.$index +1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="portScac" label="港口全称" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="portCode" label="船公司五字码" align="left" :show-overflow-tooltip=true min-width="130" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="countryname" label="国家简称/英文名" align="left" :show-overflow-tooltip=true min-width="140" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="baseCode" label="基础五字码" align="left" :show-overflow-tooltip=true min-width="110" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="state" label="状态" align="left" :show-overflow-tooltip=true min-width="90" :sortable="sortableState" :filters="[]">
                        <template slot-scope="scope">
                            <span :class="
                                scope.row.state === '使用中' ? Used
                                : scope.row.state === '未使用' ?Unused
                                : scope.row.state === '待审核' ?pending
                                : other
                            ">
                                {{  
                                    scope.row.state === 0 ? scope.row.state = "使用中" 
                                    : scope.row.state === 1 ? scope.row.state =  "未使用"
                                    : scope.row.state === 2 ? scope.row.state =  "待审核"
                                    : scope.row.state
                                }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip=true min-width="142" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip=true min-width="142" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <template slot="empty">
                        <noData></noData>
                    </template>
                </el-table>
            </div>
        <!--分页-->
        <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination" v-if="isRouteShow"></ThePagination>
        <el-dialog 
            class="dialogAddVisible"
            :visible.sync="dialogAddVisible"
            v-if="dialogAddVisible"
            width="1000px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <shippingCompanyPortsAdd
                :dialogStatus="dialogStatus"
                :scacF="ruleForm.scac"
                :tablesRow="tablesRow"
                @handleStatus="handleStatus"
                @handleClose="handleClose"
            >
            </shippingCompanyPortsAdd>
        </el-dialog>
    </div>
</template>

<script>
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import shippingCompanyPortsAdd from "./shippingCompanyPortsAdd.vue";
    import Loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                isLoading  : true,
                sortableState: true,
                Used : 'Used',
                Unused : 'Unused',
                isRouteShow: false,
                pending : 'pending',
                other : 'other',
                dialogStatus : '',
                tablesRow : {},
                //新增
                dialogAddVisible: false,
                ruleForm : {
                    companyName : '全部',
                    scac : '',
                    portScac : '',
                    baseCode : '',
                    state : '',
                },
                tableData : [],
                pageNumber: -1,
                companyNameList : [],
                stateList : [
                    {
                        id : 0,
                        label : '使用中',
                    },
                    {
                        id : 1,
                        label : '未使用',
                    },
                    {
                        id : 2,
                        label : '待审核',
                    },
                ],
                // 引用 ThePagination组件
                refPagination: {},
                // 为 ThePagination组件 属性赋值
                paginationAttribute: {
                    handleChange: this.handleChange
                },
                //分页的默认状态
                page: {
                    // 当前页数
                    pageNo: 1,
                    // 每页默认显示条数
                    pageSize: 10,
                    // 总条数
                    total: 0
                },
            }
        },
        methods : {
            //新增
            handleAddClick(){
                this.dialogAddVisible = true;
                this.dialogStatus = '新增';
            },
            //列表行
            handleCurrentChange(row){
                this.tablesRow = row;
                this.dialogAddVisible = true;
                this.dialogStatus = '编辑';
            },
            //搜索列表
            handeleSearchList(){
                if(this.ruleForm.companyName == '全部'){
                    this.ruleForm.scac = ''
                }
                this.isLoading = true;
                this.$refs.multipleTable.clearSort()
                // document.querySelector(".loading").style.height = this.$refs.basicPort.getBoundingClientRect().height + 150 + 'px';
                this.pageNumber = 1;
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/scacPort/query?baseCode=${this.ruleForm.baseCode
                }&pageNumber=${this.page.pageNo}&pageSize=${this.page.pageSize}&portScac=${this.ruleForm.portScac}&scac=${this.ruleForm.scac}&state=${this.ruleForm.state}`,{
                    headers : {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.tableData = res.data.content;
                        // document.querySelector(".loading").style.height = this.$refs.basicPort.getBoundingClientRect().height + 150 + 'px';
                        if(this.$refs.refPagination){
                            this.$refs.refPagination.page.total = res.data.total;
                            this.$refs.refPagination.changeValue()
                        }
                        if(this.tableData.length <= 0){
                            this.$message({
                                type : 'error',
                                message : '未找到该港口的相关信息',
                            })
                        };
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                    this.isLoading = false;
                })
            },
            //获取列表
            handeleGetList(newOrAdd){
                // document.querySelector(".loading").style.height = this.$refs.basicPort.getBoundingClientRect().height + 150 + 'px';
                this.isLoading = true;
                this.$refs.multipleTable.clearSort()
                if(newOrAdd){
                    this.page.pageNo = 1;
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/scacPort/query?baseCode=${this.ruleForm.baseCode
                }&pageNumber=${this.page.pageNo}&pageSize=${this.page.pageSize}&portScac=${this.ruleForm.portScac}&scac=${this.ruleForm.scac}&state=${this.ruleForm.state}`,{
                    headers : {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.tableData = res.data.content;
                        // document.querySelector(".loading").style.height = this.$refs.basicPort.getBoundingClientRect().height + 150 + 'px';
                        if(this.$refs.refPagination){
                            if(this.$refs.refPagination){
                                this.$refs.refPagination.page.total = res.data.total;
                                this.$refs.refPagination.changeValue();
                            };
                            if(Math.ceil(this.$refs.refPagination.page.total/ this.page.pageSize) < this.page.pageNo){
                                this.$refs.refPagination.handleCurrentChange(1);
                            };
                        }
                        this.isLoading = false;        
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        // this.isLoading = false;                                                                                     
                    }
                })
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.handeleGetList();
                this.pageNumber = -1;
            },
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
            //船公司
            remoteCompanyNameMethod(value){
                this.$axios.get(this.commonJs.localUrl + `/schedules/behavior/queryCompany?companyName=${value}`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.companyNameList = res.data.content;
                    if(value == ''){
                        this.companyNameList.unshift({
                            companyName:"全部"
                        })
                    }
                })
            },
            handleCompanyNameChange(value){
                if (value === null) {
                    return;
                };
                let obj = this.companyNameList.find(item => {
                    return (item.scac == value);
                });
                if(obj){
                    this.ruleForm.companyName = obj.companyName;
                    this.ruleForm.scac = obj.scac;
                };
                if(this.ruleForm.companyName === ''){
                    this.ruleForm.companyName = '';
                    this.ruleForm.scac = '';
                };
            },
            handleCompanyNameFounc(){
                this.$axios.get(this.commonJs.localUrl + 
                `/schedules/behavior/queryCompany`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.companyNameList = res.data.content;
                    this.companyNameList.unshift({
                        companyName:"全部"
                    })
                })
            },
            async getCompanyName(){
                try{
                    await this.$axios.get(this.commonJs.localUrl + 
                    `/schedules/behavior/queryCompany`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.companyNameList = res.data.content;
                        this.companyNameList.unshift({
                            companyName:"全部"
                        })
                        // this.ruleForm.companyName = this.companyNameList[0].companyName;
                        // this.ruleForm.scac = this.companyNameList[0].scac;
                        this.handeleGetList();
                    })
                }catch(e) { }
            },
            handleStateChange(value){

            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.isLoading = true;
                    this.dialogAddVisible = false;
                    this.handeleGetList(data);
                    this.pageNumber = 1;
                    this.reload();
                }
            },
            handleClose(){
                this.dialogAddVisible = false;
                // this.handeleGetList();
                // this.reload();
            },
        },
        components : {
            ThePagination,
            shippingCompanyPortsAdd,
            Loading,
            noData
        },
        destroyed(){
            this.$bus.off('clickMenu');
            this.$bus.off('handleTurn');
        },
        mounted(){
            // this.getCompanyName();
            this.$bus.on('clickMenu', content => {
                this.isLoading = true;
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                if(this.isRouteShow){
                    this.getCompanyName();
                    this.ruleForm.companyName = '全部'
                    this.ruleForm.scac = ''
                    this.ruleForm.portScac = '';
                    this.ruleForm.baseCode = '';
                    this.ruleForm.state = '';
                    this.handeleSearchList();
                }
            });
            this.$bus.on('handleTurn',(content,contentW) => {
                this.$refs.multipleTable.clearSort()
                this.isRouteShow = true
                this.isLoading = true
                setTimeout(() => {
                    this.ruleForm.companyName = content.carriercd;
                    this.ruleForm.scac = content.scac;
                    this.ruleForm.portScac = this.$store.state.common.coverage.portEn;
                    if(this.ruleForm.portScac.indexOf(',') !== -1){
                        this.ruleForm.portScac = this.ruleForm.portScac.substring(0, this.ruleForm.portScac.lastIndexOf(','));
                    };
                    if(this.ruleForm.portScac.indexOf(" ") !== -1){
                        this.ruleForm.portScac = this.ruleForm.portScac.substring(0, this.ruleForm.portScac.indexOf(" "));
                    };
                    if(this.ruleForm.portScac.indexOf('-') !== -1){
                        this.ruleForm.portScac = this.ruleForm.portScac.substring(0, this.ruleForm.portScac.indexOf('-'));
                    };
                    if(this.ruleForm.portScac.indexOf('(') !== -1){
                        this.ruleForm.portScac = this.ruleForm.portScac.substring(0, this.ruleForm.portScac.indexOf('('));
                    };
                    this.handeleSearchList();
                },500)
            });
        }
    }
</script>

<style lang="scss" scoped>
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
    .lr{
        float: right;
    }
    .lf{
        float: left;
    }
    .clickColor{
        color: #fff;
        padding: 9px 35px;
    }
    .serachBtn{
        background-color: #3bafda;
    }
    // .clickColor:nth-of-type(1){
    //     background-color: #3bafda;
    // }
    .clickAdd{
        background-color: #ff9000;
        color: #fff;
        float: right;
        margin-bottom: 10px;
    }
    .searhContent{
        // display: flex;
    }
    .elefromLight{
        display: inline-block;
        // width: 100%;
    }
    .buttonRight{
        // float: right;
        // width: 220px;
        display: inline-block;
    }
    .Used{
        color: rgba(4, 153, 255, 1);
    }
    .Unused{
        color: #999
    }
    .pending{
        color: red
    }
    .other{
        color: #f60
    }
    .el_formContent{
        width: 19%;
        display: inline-block;
        margin-right: 10px
    }
    // .el_formContent:nth-of-type(1){
    //     width: 180px;
    // }
    // .el_formContent:nth-of-type(2){
    //     width: 190px;
    // }
    // .el_formContent:nth-of-type(3){
    //     width: 210px;
    // }
    // .el_formContent:nth-of-type(4){
    //     width: 160px;
    // }
    // /deep/.el-form-item__content{
    //     margin: 0 !important;
    // }
    /deep/.el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/.el-table th{
        height: 30px;
        padding: 0;
     }
    /deep/.el-table .warning-row{
        background:rgba(241, 245, 247, 1) !important;
    }
    /deep/.el-table .warning-row:hover{
        background:rgba(241, 245, 247, 1);
    }
    /deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
        // background-color:transparent;
        // background-color:#3bb0da50;
        // cursor: pointer;
    }
    /deep/ .refPagination input{
        width: 100px!important;
    }
    .refPagination{
        // width: 100%;
        background-color: #fff ;
        padding: 0px 20px 0px 20px;
        // margin-right: 20px;
        // float: right !important;                          
    }
    /deep/.el-dialog__body{
        padding: 10px !important;
    }
    .basicPort{
        position: relative;
        overflow: hidden;
        // background-color: #E4E7ED;
    }
    .serachBack{
        background-color: #fff ;
        padding: 20px 20px 0px 20px ;
        position: relative;
        // border-bottom: 10px solid #E4E7ED
    }
    .contenRight{
        // float: right;
        position: absolute;
        right: 20px;
        top: 20px;
        // width: 10%;
    }
    .tablePage{
        padding: 20px 20px 0px 20px;
        background-color: #fff ;
        border-top: 10px solid #f5f6f8;
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
</style>