<template>
    <div class="basicPortContent" ref="basicPortContent">
        <Loading v-show="isLoading" ref="loading" class="loading"></Loading>
        <el-form
            label-position="right"
            label-width="90px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="searhContent">
                <el-form-item
                    prop="fliterTable"
                    class="fliterTableb"
                    style="display:inline-block;width:200px;margin-bottom:10px;"
                >
                    <el-input v-model="ruleForm.fliterTable" placeholder="请输入搜索内容" @input="handleInputClick"></el-input>
                </el-form-item>
                <el-button size="small" class="clickColor lr" @click="handleAddClick">新增</el-button>
            </div>
            <div class="tablePage">
                <el-table 
                    :data="tableData" 
                    style="width: 100%" 
                    :header-cell-style="{backgroundColor:'rgba(59, 175, 218, 1)' ,color:'white',fontSize:'12px'}"
                    :row-class-name="tabRowClassName"
                    ref="multipleTables"
                    tooltip-effect="dark"
                    @row-dblclick="handleCurrentChange"
                >
                    <el-table-column prop="id" align="left" label="序号" width="50px">
                        <template slot-scope="scope">
                            {{scope.$index +1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="portEn" label="港口英文" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="portCn" label="港口中文" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="portCode" label="港口五字码" align="left" :show-overflow-tooltip=true min-width="110" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="terminal" label="码头" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="areaCode" label="大航线" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="routeCn" label="航线" align="left" :show-overflow-tooltip=true min-width="70" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="lon" label="经度" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="lat" label="纬度" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="countryEn" label="国家英文" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="countryCn" label="国家中文" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="cityEn" label="城市英文" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="cityCn" label="城市中文" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                        <template slot-scope="scope">
                            {{scope.row.updateUser ? scope.row.updateUser.toUpperCase() : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip=true min-width="142" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip=true min-width="142" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="portCoverageNumber" label="港口覆盖率" align="center" :show-overflow-tooltip=true min-width="110" :sortable="sortableState" :filters="[]">
                        <template slot-scope="scope">
                            <span class="portCoverages" @click="handlePortCoverageClick(scope.$index,scope.row)">{{scope.row.portCoverage}}</span>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <noData></noData>
                    </template>
                </el-table>
            </div>
        </el-form>
        <!--分页-->
        <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination" v-if="isGangShow"></ThePagination>
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
            <basicPortsAdd
                :dialogStatus="dialogStatus"
                :tablesRow="tablesRow"
                @handleStatus="handleStatus"
                @handleClose="handleClose"
            >
            </basicPortsAdd>
        </el-dialog>

        <el-dialog 
            class="dialogPortCoverageVisible"
            :visible.sync="dialogPortCoverageVisible"
            v-if="dialogPortCoverageVisible"
            width="660px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <portCoverage
                :tableCoverageRow="tableCoverageRow"
                @handlePortCoverageClose="handlePortCoverageClose"
            >
            </portCoverage>
        </el-dialog>
    </div>
</template>

<script>
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import Loading from "@/components/Loading/outLoading.vue";
    import basicPortsAdd from "./basicPortsAdd.vue";
    import portCoverage from "./portCoverage.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                isLoading : true,
                sortableState: true,
                dialogStatus : '',
                tablesRow : {},
                tableCoverageRow : {},
                isGangShow: true,
                //新增
                dialogAddVisible: false,
                //港口覆盖率
                dialogPortCoverageVisible: false,
                ruleForm : {
                    fliterTable: '',
                },
                tableData : [],
                // tableDataEnd : [],
                // 引用 ThePagination组件
                refPagination: {},
                // 为 ThePagination组件 属性赋值
                paginationAttribute: {
                    handleChange: this.handleChange
                },
                //分页的默认状态
                pageNumber : -1,
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
            //输入查询列表
            handleInputClick(value){
                // document.querySelector(".loading").style.height = this.$refs.basicPortContent.getBoundingClientRect().height + 150 + 'px';
                // document.querySelector(".loading").style.position = 'absolute'
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                setTimeout(() => {
                    this.isLoading = true;
                    this.$refs.multipleTables.clearSort()
                    this.$axios.get(this.commonJs.localUrl + `/schedules/port/query?pageNumber=${this.page.pageNo
                    }&pageSize=${this.page.pageSize
                    }&searchStr=${value
                    }`,{
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.tableData = res.data.content;
                            this.$refs.refPagination.page.total = res.data.total;
                            this.$refs.refPagination.changeValue()
                            this.isLoading = false;
                            for (let i = 0; i < res.data.content.length; i++) {
                                if(res.data.content[i].portCoverage.indexOf("/") !== -1){
                                    var a = res.data.content[i].portCoverage.split('/')
                                    res.data.content[i].portCoverageNumber =  a[0] / a[1]
                                }else{
                                    res.data.content[i].portCoverageNumber =  parseFloat(res.data.content[i].portCoverage)
                                }
                            }
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            // this.isLoading = false;
                        }
                    })
                },1000)
            },
            //查询列表
            handeleSearchList(newOrAdd){
                this.isLoading = true;
                this.$refs.multipleTables.clearSort()
                if(newOrAdd){
                    if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                        this.page.pageNo = 1;
                        this.pageNumber = 1;
                    };
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/port/query?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&searchStr=${this.ruleForm.fliterTable
                }`,{
                    headers : {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.tableData = res.data.content;
                        for (let i = 0; i < res.data.content.length; i++) {
                            if(res.data.content[i].portCoverage.indexOf("/") !== -1){
                                var a = res.data.content[i].portCoverage.split('/')
                                res.data.content[i].portCoverageNumber =  a[0] / a[1]
                            }else{
                                res.data.content[i].portCoverageNumber =  parseFloat(res.data.content[i].portCoverage)
                            }
                        }
                        if(this.$refs.refPagination){
                            this.$refs.refPagination.page.total = res.data.total;
                            this.$refs.refPagination.changeValue()
                        }
                        // let from = (this.page.pageNo - 1)  *  this.page.pageSize;
                        // let to = this.page.pageNo * this.page.pageSize;
                        // this.tableDataEnd = [];
                        // for (let i = from; i < to; i++) {
                        //     if (this.tableData[i]) {
                        //         this.tableDataEnd.push(this.tableData[i]);
                        //     }
                        // }
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
            // tabList(params,list){
            //     let from = (params.pageNo - 1) *  params.pageSize;
            //     let to = params.pageNo * params.pageSize;
            //     this.tableDataEnd = [];
            //     for (let i = from; i < to; i++) {
            //         if (list[i]) {
            //             this.tableDataEnd.push(list[i]);
            //         }
            //     }
            // },
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                // this.tabList(params,this.tableData);
                this.handeleSearchList();
                this.pageNumber = -1;
            },
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
            //港口覆盖率
            handlePortCoverageClick(index,row){
                this.dialogPortCoverageVisible = true;
                this.tableCoverageRow = row;
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    // this.isLoading = true;
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.dialogAddVisible = false;
                    this.handeleSearchList(data);
                }
            },
            handleClose(){
                // this.isLoading = true;
                this.dialogAddVisible = false;
                // this.handeleSearchList();
                this.$store.commit("handleNowAdd",false);
                // this.reload();
            },
            handlePortCoverageClose(){
                this.dialogPortCoverageVisible = false;
            },
        },
        components : {
            ThePagination,
            basicPortsAdd,
            portCoverage,
            Loading,
            noData
        },
        computed : {
        //     //列表的查询方法
        //     tableDatas () {
        //         let tableData = []
        //         let test = [];
        //         if (this.ruleForm.fliterTable === '') {
        //             tableData = this.tableDataEnd;
        //         } else {
        //             this.tableData.forEach(item => {
        //                 if (item.portEn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.portCn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.portCode.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.routeCn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.countryCn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.countryEn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.cityCn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //                 if (item.cityEn.search(this.ruleForm.fliterTable) !=     -1) {
        //                     tableData.push(item)
        //                 };
        //             })
        //             test = JSON.parse(JSON.stringify(tableData))
        //             if(Math.ceil(test.length / this.page.pageSize) < this.page.pageNo){
        //                 this.page.pageNo = 1;
        //                 this.pageNumber = 1;
        //             }
        //             let from = (this.page.pageNo - 1)  *  this.page.pageSize;
        //             let to = this.page.pageNo * this.page.pageSize;
        //             tableData = [];
        //             for (let i = from; i < to; i++) {
        //                 if (test[i]) {
        //                     tableData.push(test[i]);
        //                 }
        //             }
        //         }
                
        //         this.$nextTick(() => {
        //             if (this.ruleForm.fliterTable === '') {
        //                 this.$refs.refPagination.page.total = this.tableData.length;
        //             } else {
        //                 this.$refs.refPagination.page.total = test.length;
        //             }
        //         });
        //         return tableData;
        //     },
            nowAdd(){
                return this.$store.state.common.nowAdd
            },
        },
        watch:{
            'nowAdd':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        setTimeout(() => {
                            this.dialogStatus = '新增';
                            this.dialogAddVisible = true;
                        },1000)
                    }
                }
            },
        },
        destroyed(){
            this.$store.commit("handleNowAdd",false);
            this.$bus.off('clickMenu');
            this.$bus.off('handleTurn');
        },
        mounted(){
            this.handeleSearchList();
            this.$bus.on('clickMenu', content => {
                this.isLoading = true;
                this.$refs.multipleTables.clearSort()
                this.ruleForm.fliterTable = '';
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.handeleSearchList();
            });
            this.$bus.on('handleTurn',content => {
                this.dialogPortCoverageVisible = false;
                this.isGangShow = false
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
        background-color: #ff9000;
        color: #fff;
        padding: 9px 35px;
    }
    .searhContent{
    }
    .basicPortContent{
        position: relative;
        overflow: hidden;
    }
    /deep/.el-form-item__content{
        margin: 0 !important;
    }
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
        width: 100%;
        background-color: #fff ;
        // float: right !important;                          
    }
    .portCoverages{
        color: #3bafda;
        cursor: pointer;
    }
    /deep/.el-dialog__body{
        padding: 10px !important;
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
</style>