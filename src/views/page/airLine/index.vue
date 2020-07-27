<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <breadcrumb :matched="matched"></breadcrumb>
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <!--el-from-->
        <div class="serachBack">
            <el-form size="mini" label-position="right" :model="ruleForm" ref="ruleForm">
                <div class="searhContent">
                    <el-form-item prop="searchStr" style="display:inline-block;width:200px;">
                        <el-input v-model="ruleForm.searchStr" placeholder="请输入搜索内容" @input="handleInputClick"></el-input>
                    </el-form-item>
                    <el-button size="small" class="clickColor lr" @click="handleAddClick">新增</el-button>
                    <!-- <el-button size="small" class="clickColor lr abnormal" @click='delectRoute'>删除</el-button> -->
                </div>
                <div style="clear:both;"></div>
            </el-form>
        </div>
        <!--el-table-->
        <div class="tablePage">
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @row-dblclick="handleCurrentChange"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column> -->
                <el-table-column prop="id" label="序号" align="left" :show-overflow-tooltip="true" min-width="50px">
                    <template slot-scope="scope">
                        {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column prop="routeCn" label="航线中文名" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="110">
                
                </el-table-column>
                <el-table-column prop="routeEn" label="航线英文名" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="110">
                
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="142">
                
                </el-table-column>
                <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="142">
                
                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
            <!--分页-->
            <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>
        </div>
        <el-dialog
            class="dialogAddVisible"
            :visible.sync="dialogAddVisible"
            v-if="dialogAddVisible"
            ref="dialogAddVisible"
            width="1020px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <airLineManage
                :dialogInnerStatus="dialogInnerStatus"
                @handleClose="handleClose"
                @handleStatus="handleStatus"
                :tablesRow="tablesRow"
                ref="airLineManage"
            >
            </airLineManage>
        </el-dialog>
    </div>
</template>

<script>
    import airLineManage from "./airLineManage.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "",
                isLoading: true,
                dialogAddVisible: false,
                sortableState: true,
                dialogInnerStatus: "",
                ruleForm: {
                    searchStr: ""
                },
                tableData: [],
                pageNo: 1,
                pageSize: 10,
                total: 0,
                // 引用 ThePagination组件
                refPagination: {},
                paginationAttribute: {
                    handleChange: this.handleChange
                },
                //分页默认状态
                pageNumber: -1,
                page: {
                    // 当前页数
                    pageNo: 1,
                    // 每页默认显示条数
                    pageSize: 10,
                    // 总条数
                    total: 0
                },
                tablesRow: {},
                handleSelection: []
            };
        },
        methods: {
            //输入查询列表
            handleInputClick(value) {
                  if (Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo) {
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                  }
                  setTimeout(() => {
                    this.isLoading = true;
                    this.$refs.table.clearSort()
                    this.$axios.get(this.commonJs.localUrl + `/schedules/dicRoute/query?searchStr=${value
                        }&pageNumber=${this.page.pageNo
                        }&pageSize=${this.page.pageSize
                        }`,{
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                        }).then(res => {
                            if(res.data.status == 1){
                                this.tableData = res.data.content;
                                this.$refs.refPagination.page.total = res.data.total;
                                this.$refs.refPagination.changeValue()
                                this.isLoading = false;
                            } else if (res.data.status == 0) {
                                this.$message({
                                    type: "error",
                                    message: "数据加载失败 请重新加载页面"
                                });
                                // this.isLoading = false;
                            }
                      });
                  }, 1000);
            },
            //搜索 (页面初始化)
            searchList(newOrAdd){
                this.isLoading = true
                this.$refs.table.clearSort()
                if(newOrAdd){
                    if (Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo) {
                        this.page.pageNo = 1;
                        this.pageNumber = 1;
                    }
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/dicRoute/query?searchStr=${this.ruleForm.searchStr
                    }&pageNumber=${this.page.pageNo
                    }&pageSize=${this.page.pageSize
                    }`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.tableData = res.data.content;
                            if(this.$refs.refPagination){
                                this.$refs.refPagination.page.total = res.data.total;
                                this.$refs.refPagination.changeValue()
                            }
                            this.isLoading = false;
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            // this.isLoading = false;
                        }
                    });
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchList();
                this.pageNumber = -1;
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.dialogAddVisible = false;
                    this.searchList(data);
                }
            },
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
                }
            },
            //新增
            handleAddClick() {
                this.dialogAddVisible = true;
                this.dialogInnerStatus = "新增";
            },
            //全选
            handleSelectionChange(val) {
                this.handleSelection = val
            },
            //删除
            delectRoute(){
                var val = this.handleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条航线删除',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否确认删除？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var delectRouteList = []
                    for (let i = 0; i < val.length; i++) {
                        delectRouteList.push(val[i].id);
                    }
                    let query = {
                        idList: delectRouteList,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/route/delete`, query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            var rows = res.data.content.rows ? res.data.content.rows : 0
                            that.$message({
                                type: "success",
                                message: `成功删除${rows}条数据`
                            });
                            that.searchList()
                        }else{
                            this.$message({
                                type: "error",
                                message: "删除失败"
                            });
                            that.isLoading = false;
                        }
                    })
                }).catch(_ => {});
            },
            //关闭事件
            handleClose() {
                this.dialogAddVisible = false;
            },
            //双击列表行
            handleCurrentChange(row) {
                this.dialogAddVisible = true;
                this.dialogInnerStatus = "修改";
                this.tablesRow = row;
            },
        },
        components: {
            ThePagination,
            Breadcrumb,
            loading,
            airLineManage,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.searchList();
            this.$bus.on('clickMenu', content => {
                this.$refs.table.clearSort()
                this.ruleForm.searchStr = '';
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
    };
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
    /deep/ .el-table .warning-row {
        background: rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover {
        background: rgba(241, 245, 247, 1);
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
    .lr {
        float: right;
    }
    .clickColor {
        background-color: #ff9000;
        color: #fff;
        padding: 9px 35px;
    }
    .abnormal{
        border: 1px solid #FF0000;
        color: #FF0000;
        background-color: #fff;
        margin-right:10px;
    }
    .basicPortContent {
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        .serachBack {
            background-color: #fff;
            padding: 20px 20px 0px 20px;
            // margin-bottom: 10px;
            position: relative;
        }
        .tablePage {
            background-color: #fff;
            padding: 0px 20px 20px 20px;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
            // float: right !important;
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
</style>