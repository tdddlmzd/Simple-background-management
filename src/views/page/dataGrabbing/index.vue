<template>
    <div class="basicPortContent" ref="basicPortContent">
        <div class="titieHeader">
            <breadcrumb :matched="matched"  class="lf"></breadcrumb>
            <!-- <i class='el-icon-success'></i>
            <i class='el-icon-error'></i> -->
            <span class="lr title">提示：各船公司最后一次更新数据排名！</span>
        </div>
        <loading v-show="isLoading"></loading>
        <div class="tablePage">
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @sort-change="sortChange"
            >
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="pol" label="POL" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="pod" label="POD" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="country" label="国家" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="route" label="航线" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="vessel" label="船舶" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="totalP2p" label="组合-累积" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="newP2p" label="最新组合" align="left" :show-overflow-tooltip=true min-width="100" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="p2pCoverageNumber" label="最新组合覆盖率" align="left" :show-overflow-tooltip=true min-width="140" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.p2pCoverage}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalPath" label="路径量-累积" align="left" :show-overflow-tooltip=true min-width="110" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="newPath" label="最新路径量" align="left" :show-overflow-tooltip=true min-width="110" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="pathCoverageNumber" label="最新路径量覆盖率" align="left" :show-overflow-tooltip=true min-width="140" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.pathCoverage}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <!-- <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>   -->
        </div>
    </div>
</template>
<script>
    import qs from "qs";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
export default {
    data() {
        return{
            matched: "",
            isLoading: true,
            tableData: [],
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
        ThePagination,
        Breadcrumb,
        loading,
    },
    methods:{
        //初始化页面
        searchList() {
            this.isLoading = true
            this.$axios.get(this.commonJs.localUrl + `/schedules/crawling/getCrawlingList`,{                        
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token")
                }
            }).then(res =>{
                if(res.data.status == 1){
                    this.tableData = res.data.content;
                    for (let i = 0; i < res.data.content.length; i++) {
                        if(res.data.content[i].p2pCoverage){
                            res.data.content[i].p2pCoverageNumber = parseFloat(res.data.content[i].p2pCoverage)
                        }else{
                            res.data.content[i].p2pCoverageNumber = ''
                        }
                        if(res.data.content[i].pathCoverage){
                            res.data.content[i].pathCoverageNumber = parseFloat(res.data.content[i].pathCoverage)
                        }else{
                            res.data.content[i].pathCoverageNumber = ''
                        }
                    }
                    // if(this.$refs.refPagination){
                    //     this.$refs.refPagination.page.total = res.data.content.total;
                    //     this.$refs.refPagination.changeValue()
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
        //sortChange 排序
        sortChange(column) { },
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
    .title{
        color: red;
        font-size: 14px;
        margin-right: 100px;
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
            padding: 20px 20px 20px 20px;
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
</style>