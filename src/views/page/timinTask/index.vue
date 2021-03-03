<template>
    <div class="basicPortContent" ref="basicPortContent">
        <loading v-show="isLoading"></loading>
        <div class="tablePage">
            <div class="buttonTop">
                <el-button size="small" class="clickColor normals" @click="execute" v-if="isShowZ">执行</el-button>
                <el-button size="small" class="clickColor hui_normal" v-if="!isShowZ">{{count}}秒</el-button>
                <el-button size="small" class="clickColor abnormal" @click="pause">暂停</el-button>
                <el-button size="small" class="clickColor normals" @click="resume">恢复</el-button>
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
                <el-table-column type="selection" width="45" max="1">

                </el-table-column>
                
                <el-table-column prop="triggerExpress" label="表达式" align="left" :show-overflow-tooltip="true" width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="preDate" label="上次执行时间" align="left" :show-overflow-tooltip="true" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="nextDate" label="下次执行时间" align="left" :show-overflow-tooltip="true" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="jobName" label="任务名" align="left" :show-overflow-tooltip="true" min-width="180" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="jobGroup" label="任务组" align="left" :show-overflow-tooltip="true" min-width="180" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="jobStatus" label="状态" align="left" :show-overflow-tooltip="true" width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.jobStatus == 'NORMAL' ? '正常' : scope.row.jobStatus == 'ERROR' ? '异常' : scope.row.jobStatus == 'WAITING' ? '等待' : scope.row.jobStatus == 'PAUSED' ? '暂停' :  scope.row.jobStatus == 'BLOCKED' ? '阻塞' : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="jobClass" label="类" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="jobDuring" label="持久化" align="left" :show-overflow-tooltip="true" width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.jobDuring == true ? '是' : '否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="triggerGroup" label="触发组" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="triggerName" label="触发名" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
            </el-table>
            <!--分页-->
            <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import loading from "@/components/Loading/outLoading.vue";
import ThePagination from "@/components/ThePagination/ThePagination.vue";
export default {
    data() {
        return{
            matched: "",
            isLoading: true,
            tableData: [],
            isShowZ: true, //是否显示执行
            count:6, //倒计时5秒
            multipleSelection: [],
            sortableState: true,
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
        }
    },
    components : {
        loading,
        ThePagination
    },
    methods:{
        //初始化页面
        searchList(reload) {
            this.isLoading = true
            this.$axios.get(this.commonJs.localUrl +`/task/jobs?pageNumber=${this.page.pageNo
            }&pageSize=${this.page.pageSize
            }`,{
            headers: {
                Authorization: `Bearer ${this.getAuthorization()}`,
                AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
            }
            }).then(res => {
                this.tableData = res.data.list
                for (let i = 0; i < this.tableData.length; i++) {
                    var time = this.tableData[i]

                    //处理上次执行时间
                    if(this.tableData[i].triggerPreDate){
                        var preDate = new Date(this.tableData[i].triggerPreDate).toJSON()
                        this.tableData[i].preDate = new Date(+new Date(preDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                    }else{
                        this.tableData[i].preDate = ''
                    }

                    //处理下次执行时间
                    if(this.tableData[i].triggerNextDate){
                        var nextDate = new Date(this.tableData[i].triggerNextDate).toJSON()
                        this.tableData[i].nextDate = new Date(+new Date(nextDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                    }else{
                        this.tableData[i].nextDate = ''
                    }
                }
                if(this.$refs.refPagination){
                    this.$refs.refPagination.page.total = res.data.total ? res.data.total : 0;
                    this.$refs.refPagination.changeValue()
                }
                this.isLoading = false
            })
        },
        execute(){
            var val = this.multipleSelection
            if(val.length != 1){
                this.$message({
                    type : 'error',
                    message : '请选择一条',
                });
                return
            };
            this.$confirm("<div class='tesDiv'><div>执行选中任务？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                confirmButtonClass:"btnCustomSubmit",
                customClass:"customClass",
                dangerouslyUseHTMLString:true,
            }).then(() => {
                this.isLoading = true
                var that = this
                var routeList = []
                for (let i = 0; i < val.length; i++) {
                    this.$axios.post(this.commonJs.localUrl +`/task/job/execute`,
                    qs.stringify({
                        jobName: val[i].jobName,
                        jobGroup: val[i].jobGroup
                    }),
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        this.isLoading = false
                        that.$message({ type:"success", message: '执行成功'})
                        this.matched = this.$route.matched;
                        this.searchList();
                        this.isShowZ = false
                        let clockDow = setInterval(() => {
                            if(this.count == 1){
                                this.isShowZ = true
                                clearInterval(clockDow)
                            }else{
                                this.count--
                            }
                        },1000)
                    })
                }
                
            }).catch(_ => {
                this.isLoading = false
            });
                
        },
        pause(){
            var val = this.multipleSelection
            if(val.length != 1){
                this.$message({
                    type : 'error',
                    message : '请选择一条',
                });
                return
            };
            this.$confirm("<div class='tesDiv'><div>暂停选中任务？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                confirmButtonClass:"btnCustomSubmit",
                customClass:"customClass",
                dangerouslyUseHTMLString:true,
            }).then(() => {
                this.isLoading = true
                var that = this
                var routeList = []
                for (let i = 0; i < val.length; i++) {
                    this.$axios.post(this.commonJs.localUrl +`/task/job/pause`,
                    qs.stringify({
                        triggerName: val[i].triggerName,
                        triggerGroup: val[i].triggerGroup
                    }),
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        this.isLoading = false
                        that.$message({ type:"success", message: '执行成功'})
                        this.matched = this.$route.matched;
                        this.searchList();
                    })
                }
                
            }).catch(_ => {
                this.isLoading = false
            });
        },
        resume(){
            var val = this.multipleSelection
            if(val.length != 1){
                this.$message({
                    type : 'error',
                    message : '请选择一条',
                });
                return
            };
            this.$confirm("<div class='tesDiv'><div>恢复选中任务？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                confirmButtonClass:"btnCustomSubmit",
                customClass:"customClass",
                dangerouslyUseHTMLString:true,
            }).then(() => {
                this.isLoading = true
                var that = this
                var routeList = []
                for (let i = 0; i < val.length; i++) {
                    this.$axios.post(this.commonJs.localUrl +`/task/job/resume`,
                    qs.stringify({
                        triggerName: val[i].triggerName,
                        triggerGroup: val[i].triggerGroup
                    }),
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        this.isLoading = false
                        that.$message({ type:"success", message: '执行成功'})
                        this.matched = this.$route.matched;
                        this.searchList();
                    })
                }
                
            }).catch(_ => {
                this.isLoading = false
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
        tabRowClassName({row,rowIndex}){
            row.index = rowIndex
            let index = rowIndex + 1;
            if(index %2 !== 0){
                return 'warning-row'
            }
        },
        //全选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
    },
    mounted(){
        this.matched = this.$route.matched;
        this.searchList();
        this.$bus.on('clickMenu', content => {
            if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                this.page.pageNo = 1;
                this.pageNumber = 1;
            };
            this.$refs.table.clearSort()
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
    /deep/ .refPagination input {
        width: 100px !important;
    }
    /deep/ .pagination {
        float: right !important;
        padding-top: 10px;
    }
    /deep/ .el-table__expand-icon{
        visibility: hidden !important;
    }
    /deep/ .el-table__expanded-cell{
        text-align:center !important;
        color: #3bafda
    }
    /deep/ .el-table th, /deep/.el-table tr{
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
    /deep/ .el-table .warning-row:hover{
        background:rgba(241, 245, 247, 1);
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
        width: 0;
        height: 0;
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
    .lf{
        float: left;
    }
    .lr{
        float: right;
    }
    .basicPortContent{
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        .titieHeader{
            height: 25px;
        }
        .tablePage{
            background-color: #fff ;
            padding: 20px 20px 50px 20px;
        }
        .refPagination{
            width: 100%;
            background-color: #fff ;
        }
    }
    .el-icon-success{
        font-size: 10px;
        background: greenyellow;
        color: greenyellow;
        border-radius: 50%;
        border: 2px solid greenyellow;
    }
    .el-icon-error{
        font-size: 10px;
        background: #fff;
        color: #fff;
        border-radius: 50%;
        border: 2px solid greenyellow;
    }
    .buttonTop {
        margin-bottom: 20px;
        .clickColor {
            background-color: #fff;
            padding: 9px 27px;
            margin-right: 10px;
        }
        .hui_normal{
            border: 1px solid #c1c1c1;
            color: #c1c1c1;
        }
        .normals {
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .abnormal {
            border: 1px solid #ff0000;
            color: #ff0000;
        }
    }

</style>