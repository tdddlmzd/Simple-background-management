<template>
    <div class="basicPortContent">
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <!--el-from-->
        <div class="serachBack">
            <el-form size="mini" label-position="right" :model="ruleForm" ref="ruleForm">
                <div class="searhContent">
                    <el-form-item prop="str" style="display:inline-block;width:200px;">
                        <el-input v-model="ruleForm.str" placeholder="请输入搜索内容" @input="handleInputClick" maxlength="100"></el-input>
                    </el-form-item>
                    <span style="color:red;font-size:14px;margin-left:20px;margin-right:20px">数据来源：船期数据</span>
                    <el-checkbox v-model="ruleForm.isNotMatch" @change="checkChange">未匹配</el-checkbox>
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
                @row-dblclick="currentChange"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="100">
                
                </el-table-column>
                <el-table-column prop="nameEn" label="船名" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="140">
                
                </el-table-column>
                <el-table-column prop="standardNameEn" label="标准船名" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="140">
                
                </el-table-column>
                <el-table-column prop="mmsi" label="MMSI" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="140">
                
                </el-table-column>
                <el-table-column prop="imo" label="IMO" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="100">
                
                </el-table-column>
                <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.updateUser ? scope.row.updateUser.toUpperCase() : ''}}
                    </template>
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
            class="shipMent"
            :visible.sync="shipMent"
            v-if="shipMent"
            ref="shipMent"
            width="1100px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <shipAdd
                :shipManag="shipManag"
                @closeShipInfor="handleClose"
                @updatShip="updatShip"
                :vesselId="vesselId"
                :origin="origin"
                ref="basicShipAdd"
            >
            </shipAdd>
        </el-dialog>
    </div>
</template>

<script>
    import shipAdd from "./shipAdd.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "",
                isLoading: true,
                sortableState: true,
                shipMent: false,
                origin: 1,//船期船舶
                shipManag: '',
                vesselId: '',
                ruleForm: {
                    str: '',
                    isNotMatch: true,
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
                handleSelection: [],
                companyNameList: [],
            };
        },
        methods: {
            //输入查询列表
            handleInputClick(value) {
                if (Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo) {
                    this.page.pageNo = 1
                    this.pageNumber = 1
                }
                setTimeout(() => {
                    this.isLoading = true;
                    this.$refs.table.clearSort()
                    this.$axios.get(this.commonJs.localUrl + `/schedules/baseVessel/vesselList?isMatch=${this.ruleForm.isNotMatch ? '1' : '0'
                    }&pageNumber=${this.page.pageNo
                    }&pageSize=${this.page.pageSize
                    }&origin=${this.origin
                    }&str=${value
                    }`,{//船期船舶
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
                        } else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                    });
                }, 500);
            },
            //搜索 (页面初始化)
            searchList(reload){
                this.isLoading = true
                this.$refs.table.clearSort()
                this.$axios.get(this.commonJs.localUrl + `/schedules/baseVessel/vesselList?isMatch=${this.ruleForm.isNotMatch ? '1' : '0'
                }&pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&origin=${this.origin
                }&str=${this.ruleForm.str
                }`,{//船期船舶
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token")
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        if(res.data.content !== ''){
                            if(res.data.content.length <= 0){
                                this.tableData=[];
                                if(this.$refs.refPagination){
                                    this.$refs.refPagination.page.total = res.data.total
                                    this.$refs.refPagination.changeValue()                            
                                }           
                            }else{
                                if (res.data.status == 1) {
                                    this.tableData=[];
                                    this.tableData = res.data.content
                                    if(this.$refs.refPagination){
                                        this.$refs.refPagination.page.total = res.data.total
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
                        this.isLoading = false
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
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
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
                }
            },
            //全选
            handleSelectionChange(val) {
                this.handleSelection = val
            },
            //关闭事件
            handleClose() {
                this.shipMent = false
            },
            updatShip(){
                this.searchList()
            },
            //双击列表行
            currentChange(row) {
                this.shipMent = true
                this.shipManag = "修改";
                this.vesselId = row.vesselId;
            },
            //是否匹配
            checkChange(){
                this.$refs.refPagination.handleCurrentChange(1)
            },
        },
        components: {
            ThePagination,
            loading,
            shipAdd,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.ruleForm.isNotMatch = true
            this.searchList();
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.$refs.table.clearSort()
                this.ruleForm.str = ''
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
    .shipMent{
        overflow: hidden;
    }
    .basicPortContent {
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        overflow: hidden;
        .serachBack {
            background-color: #fff;
            padding: 20px 20px 0px 20px;
            position: relative;
        }
        .tablePage {
            background-color: #fff;
            padding: 0px 20px 20px 20px;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
        }
    }
    .contentLeft {
        float: left;
        width: 90%;
    }
    .contenRight {
        position: absolute;
        right: 20px;
        bottom: 5px;
    }
    .serachBtn {
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .clickColor {
        background-color: #fff;
        padding: 9px 27px;
        margin-right: 10px;
    }
    .butn {
        margin-right: 0;
        background-color: #ff9000;
        color: #fff;
        padding: 9px 35px;
        float: right;
        margin-bottom: 20px;
    }
    .butnDele{
        margin-right: 10px;
        border: 1px solid #ff0000;
        color: #ff0000;
        padding: 9px 35px;
        float: right;
        margin-bottom: 20px;
    }

</style>