<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <breadcrumb :matched="matched"></breadcrumb>
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <!--el-from-->
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
                        <el-col style="width:22%">
                            <el-form-item label="船公司">
                                <el-input v-model="ruleForm.carrier" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="操作时间" class="searchTime">
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
        <!--el-table-->
        <div class="tablePage">
            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
              :row-class-name="tabRowClassName"
              tooltip-effect="dark"
              ref="table"
              @row-dblclick="waytraDetail"
              :header-cell-class-name="headerStyle"
            >
                <el-table-column prop="index" label="序号" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.$index +1}}
                    </template>
                </el-table-column>

                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <img src="@/assets/images/route/ident.png" class="newIdent" ref="ident" v-if="scope.row.isNew == 1">
                        <span style='padding-left:10px'>{{scope.row.carrier}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.updateUser ? scope.row.updateUser.toUpperCase() : ''}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip="true" width="142" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.row.updateTime ? commonJs.getDateTime('YY-mm-dd HH:MM:SS', new Date(scope.row.updateTime)) : ''}}
                    </template>
                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
            <el-dialog
                class="dialogAddVisible"
                :visible.sync="isOwener"
                v-if="isOwener"
                ref="dialogDetailVisible"
                width="80%"
                top="0"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
            >
                <ownerDetail
                    :owenerText="owenerText"
                    :rowCarrier="rowCarrier"
                    @closeDetail="closeDetail"
                    @updatManage="updatManage"
                    ref="ownerDetail"
                >
                </ownerDetail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    import ownerDetail from "./ownerDetail.vue";
    import qs from "qs"
    export default {
        data() {
            return {
                matched: "", //路径
                isLoading: true, //loading
                tableData: [], //表格数据
                sortableState: true, //排序
                isOwener: false, //详情页显示隐藏
                owenerText: '修改', //详情页显示表头标题
                rowCarrier: '', //列表传的船公司
                ruleForm: {
                    carrier: '',
                    startTime: '',
                    endTime: '',
                },
            };
        },
        methods: {
            //页面初始化
            searchList(reload){
                this.isLoading = true
                this.$refs.table.clearSort()
                if(reload){
                    this.ruleForm.carrier = ''
                    this.ruleForm.startTime = ''
                    this.ruleForm.endTime = ''
                }
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
                this.$axios.get(this.commonJs.localUrl +`/schedules/shipOwner/getAllNodes?carrier=${this.ruleForm.carrier
                    }&startTime=${this.ruleForm.startTime
                    }&endTime=${this.ruleForm.endTime
                    }`,
                    {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        if(res.data.content.length > 0){
                            this.tableData = res.data.content
                        }else{
                            this.tableData = []
                        }
                        this.isLoading = false
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        // this.isLoading = false;
                    }
                })
                // this.isLoading = false
            },
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
                }
            },
            //单独给第一列添加样式
            headerStyle({row, column, rowIndex, columnIndex}) {
                if(column.label == '船公司') {
                    return 'columnPadding'
                }
            },
            //搜索
            serchBtn() {
                this.searchList()
            },
            //双击跳转详情页
            waytraDetail(row) {
                this.isOwener = true
                this.owenerText = '修改'
                this.rowCarrier = row.carrier
            },
            //详情页关闭事件
            closeDetail() {
                this.isOwener = false
            },
            //详情页保存时需要调的函数
            updatManage(){
                this.isOwener = false
                this.searchList()
            },
        },
        components: {
            ownerDetail,
            Breadcrumb,
            loading,
            noData
        },
        mounted() {
            this.matched = this.$route.matched
            this.searchList()
            this.$bus.on('clickMenu', content => {
                this.$refs.table.clearSort()
                this.searchList('reload')
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
    /deep/.el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/.el-table th{
        height: 30px;
        padding: 0;
     }
    /deep/ .refPagination input {
        width: 100px !important;
    }
    /deep/ .pagination {
        float: right !important;
        padding-top: 10px;
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
    .tablePage /deep/.el-icon-arrow-down::before{
        color: red;
        display: none;
        margin-left:-10px;
        height: 0;
    }
    /deep/.el-table__column-filter-trigger{
        width: 0px;
        height: 0px;
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
    .dialogAddVisible{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
            // overflow-y: auto;
        }
    }
    /deep/th.columnPadding{
        padding-left: 10px !important;
    }
    .basicPortContent {
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        .serachBack {
            background-color: #fff;
            padding: 20px 20px 0px 20px;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 20px 20px;
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
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
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: 0;
        top: 1px;
    }
</style>