<template>
    <div class="basicPortContent">
        <!--loading-->
        <loading v-show="isLoading" isTopDate='67px'></loading>
        <!--el-table-->
        <div class="tablePage" v-show="tableData.length > 0">
            <div class="buttonTop">
                <button size="small" class="clickColor normals teshubutt" @click="tagbeen()">标记已读</button>
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
                <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column>
                <el-table-column prop="typeContent" label="提醒类型" align="left" :show-overflow-tooltip="true" :sortable="true" :filters="[]" min-width="95">
                
                </el-table-column>
                <el-table-column prop="clientId" label="账号" align="left" :show-overflow-tooltip="true" :sortable="true" :filters="[]" min-width="80">
                
                </el-table-column>
                <el-table-column prop="content" label="提醒内容" align="left" :show-overflow-tooltip="true" :sortable="true" :filters="[]" min-width="350">
                
                </el-table-column>
                <el-table-column prop="status" label="状态" align="left" :show-overflow-tooltip="true" :sortable="true" :filters="[]" min-width="70">
                    <template slot-scope="scope">
                        <span :style="{color:scope.row.status == 1 ? '' : '#3bafda'}">
                            {{scope.row.status == 1 ? '已读' : '未读'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="发送时间" align="left" :show-overflow-tooltip="true" :sortable="true" :filters="[]" min-width="142">
                
                </el-table-column>
                 <template slot="empty">
                    <noData></noData>
                  </template>
            </el-table>
            <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>
        </div>
        <div class="no-date" v-show="tableData.length == 0">
            <img src="../../../assets/images/login/tongz.png" class="tongz_image">
            <p class="no-da_p">暂无消息通知</p>
        </div>
    </div>
</template>

<script>
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                isLoading: false,
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
                searchStr: ''
            };
        },
        methods: {
            //搜索 (页面初始化)
            searchList(newOrAdd){
                this.isLoading = true
                if(newOrAdd){
                    if (Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo) {
                        this.page.pageNo = 1;
                        this.pageNumber = 1;
                    }
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/getRemindMessage?pageNumber=${this.page.pageNo
                    }&pageSize=${this.page.pageSize
                    }`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.tableData = res.data.content
                            if(res.data.content.length > 0){
                                if(this.$refs.refPagination){
                                    this.$refs.refPagination.page.total = res.data.total;
                                    this.$refs.refPagination.changeValue()
                                }
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
            //全选
            handleSelectionChange(val) {
                this.handleSelection = val
            },
            //标记已读
            tagbeen(){
                var val = this.handleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };

                var yidu = [] //已读
                var weidu = [] //未读

                //循环找出已读和未读
                for (let i = 0; i < val.length; i++) {
                    if(val[i].status == 1){ //已读
                        yidu.push(val[i])
                    }else{ //未读
                        weidu.push(val[i])
                    }
                    
                }

                // 如果所选都是已读
                if(weidu.length == 0){
                    this.$message(
                        { 
                            type:"error", 
                            message: '不可重复设置已读'
                        }
                    )
                    return
                }
                this.$confirm(this.commonJs.confirm_tagbeen, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this
                    var ids = []
                    for (let i = 0; i < weidu.length; i++) {
                        ids.push(weidu[i].id)
                    }
                    
                    var id = ids.join(',')
                    this.$axios.get(this.commonJs.localUrl +`/schedules/userManager/updateRemindMessageStatus?ids=` + id,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.$message({ type:"success", message: '状态修改成功'})
                            that.searchList()
                            that.handNumber()
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'})
                            that.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            handNumber(){
                var that = this
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/getUnRemind`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.$store.commit("handeCount",res.data.content)
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                });
            },
        },
        components: {
            ThePagination,
            loading,
            noData
        },
        mounted() {
            this.searchList()
        },
        destroyed(){
            
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
    .basicPortContent {
        position: relative;
        // overflow: hidden;
        .tablePage {
            background-color: #fff;
            padding: 0px 20px 20px 20px;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
        }
        .no-date{
            width: 100%;
            height: 232px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .tongz_image{
                width: 132px;
                height: 80px;
            }
            .no-da_p{
               margin-left: 20px;
               margin-top: 16px;
               font-size: 12px;
            }
        }
        .buttonTop {
            margin-bottom: 20px;
            float: right;
            .teshubutt{
                cursor: pointer;
                outline: none;
            }
            .clickColor {
                background-color: #fff;
                width: 80px;
                height: 32px;
                line-height: 1;
                text-align: center;
                margin-right: 10px;
                border-radius: 3px
            }
            .normals {
                border: 1px solid #3bafda;
                color: #3bafda;
            }
        }
    }
</style>