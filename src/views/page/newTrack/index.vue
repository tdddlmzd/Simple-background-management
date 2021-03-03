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
                label-width="80px"
            >
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="单号">
                                <el-input v-model="ruleForm.blno" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="箱号">
                                <el-input v-model="ruleForm.ctnno" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="进口/出口">
                                <el-select
                                    v-model="ruleForm.ieid" 
                                    placeholder="请输入"
                                    style="width:100%"
                                    clearable
                                >
                                    <el-option
                                        v-for="item in ieidList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="港口">
                                <el-input v-model="ruleForm.polcd" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="船公司">
                                <el-input v-model="ruleForm.carriercd" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="船名">
                                <el-input v-model="ruleForm.vslname" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="用户类型">
                                <el-select 
                                    v-model="ruleForm.userType" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
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
                            <el-form-item label="用户类别">
                                <el-select 
                                    v-model="ruleForm.userCategory" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in userCateList"
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
                        <el-col style="width:22%">
                            <el-form-item label="用户名">
                                <el-input v-model="ruleForm.userName" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"  > 
                            <el-form-item label="状态">
                                <el-select 
                                    v-model="ruleForm.status" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in trackDetail"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="订阅时间" class="searchTime">
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
            <div class="buttonTop">
                <el-button size="small" class="clickColor normals" @click="immediate">立即刷新</el-button>
            </div>

            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
              :row-class-name="tabRowClassName"
              tooltip-effect="dark"
              ref="table"
              @row-dblclick="waytraDetail"
              @selection-change="selectedCheck"
            >
                <!-- <el-table-column type="selection" width="45" max="1">

                </el-table-column> -->
                <el-table-column prop="userType" label="用户类型" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.userType == 1 ?'API':scope.row.userType == 2 ?'平台' :''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="resultStatus" label="状态" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.resultStatus === 1 ?'完成':scope.row.resultStatus === 2?'异常':scope.row.resultStatus === 0 ?'进行中' :''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ieid" label="进/出口" align="left" :show-overflow-tooltip="true" min-width="90" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.ieid === 'I' ? '进口' : scope.row.ieid === 'E' ? '出口' : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="upolcd" label="港口" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="blno" label="单号" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="ctnrno" label="箱号" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="ucarriercd" label="船公司" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="currentMsg" label="提单最新状态" align="left" :show-overflow-tooltip="true" min-width="240" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="vslname" label="船名" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="voy" label="航次" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="plr" label="接货地" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="dtp" label="目的港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pld" label="交货地" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="ctnrType" label="箱型/箱量" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="stsp" label="提空" align="left" :show-overflow-tooltip="true" min-width="88" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="gitm" label="进场" align="left" :show-overflow-tooltip="true" min-width="68" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pass" label="海放" align="left" :show-overflow-tooltip="true" min-width="68" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="lobd" label="装货" align="left" :show-overflow-tooltip="true" min-width="68" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="stcs" label="提货" align="left" :show-overflow-tooltip="true" min-width="68" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="rcve" label="还箱" align="left" :show-overflow-tooltip="true" min-width="68" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="vesselTrace" label="船舶计划" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.vesselTrace ? scope.row.vesselTrace + '/6' : '0/6' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userCategory" label="用户类别" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.userCategory === 0 ?'普通用户':scope.row.userCategory === 1 ?'付费用户':''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="username" label="订阅人" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.username.toUpperCase()}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="订阅时间" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.row.createTime ? commonJs.getDateTime('YY-mm-dd HH:MM:SS', new Date(scope.row.createTime)) : ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.row.updateTime ? commonJs.getDateTime('YY-mm-dd HH:MM:SS', new Date(scope.row.updateTime)) : ''}}
                    </template>
                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
          <!--分页-->
            <ThePagination
                ref="refPagination"
                :pageNumber="pageNumber"
                :attribute="paginationAttribute"
                class="lr refPagination"
            ></ThePagination>
            <el-dialog
                class="dialogAddVisible"
                :visible.sync="waytrackDetail"
                v-if="waytrackDetail"
                ref="dialogDetailVisible"
                width="80%"
                top="0"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
            >
                <newTrackDetail
                    :tratckText="tratckText"
                    :refmd5="refmd5"
                    :recordId="recordId"
                    @closeDetail="closeDetail"
                    @updatManage="updatManage"
                    ref="trendsaileDetail"
                >
                </newTrackDetail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    import newTrackDetail from "./newTrackDetail.vue";
    import qs from "qs"
    export default {
        data() {
            return {
                matched: "", //路径
                isLoading: true, //loading
                tableData: [], //表格数据
                sortableState: true, //排序
                multipleSelection: [], //选择
                waytrackDetail: false, //详情页显示隐藏
                tratckText: '修改', //详情页显示表头标题
                refmd5: '',
                recordId: '',
                ruleForm: {
                    blno: '', //提单号
                    ctnno: '', //箱号
                    ieid: '', //进出口 I:进口 E:出口
                    polcd: '', //港口
                    carriercd: '', //船公司
                    vslname: '', //船名
                    userType: '', //用户类型
                    userCategory: '',// 用户类别
                    userName: '', //用户名
                    status: '', //状态
                    startTime: '', //开始时间
                    endTime: '', //结束时间
                },
                //用户类型
                typeList: [
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: '1',
                        label: 'API'
                    },
                    {
                        value: '2',
                        label: '平台'
                    },
                ],
                //用户类型
                userCateList: [
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '普通用户'
                    },
                    {
                        value: 1,
                        label: '付费用户'
                    },
                ],
                //进出口
                ieidList: [ //E出口 I 进口 
                    {
                        value: '',
                        label: '全部',
                    },
                    {
                        value: 'I',
                        label: '进口',
                    },
                    {
                        value: 'E',
                        label: '出口',
                    }
                ],
                //用户类型
                userCateList: [
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '普通用户'
                    },
                    {
                        value: 1,
                        label: '付费用户'
                    },
                ],
                trackDetail: [ //状态
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '进行中'
                    },
                    {
                        value: 1,
                        label: '完成'
                    },
                    {
                        value: 2,
                        label: '异常'
                    },
                ],
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
            };
        },
        methods: {
            //页面初始化
            searchList(reload){
                this.isLoading = true
                this.$refs.table.clearSort()
                if(reload){
                    this.ruleForm.blno = ''
                    this.ruleForm.ctnno = ''
                    this.ruleForm.ieid = ''
                    this.ruleForm.polcd = ''
                    this.ruleForm.carriercd = ''
                    this.ruleForm.vslname = ''
                    this.ruleForm.userType = ''
                    this.ruleForm.userCategory = ''
                    this.ruleForm.userName = ''
                    this.ruleForm.status = ''
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
                var query = JSON.parse(JSON.stringify(this.ruleForm))
                query["pageNumber"] = this.page.pageNo
                query["pageSize"] = this.page.pageSize
                this.$axios.post(this.commonJs.localUrl +`/schedules/trace/newTrace`,query,
                    {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        if(res.data.content !== ''){
                            if(res.data.content.length <= 0){
                                this.tableData=[];
                                if(this.$refs.refPagination){
                                    this.$refs.refPagination.page.total = res.data.total;
                                    this.$refs.refPagination.changeValue()                            
                                }           
                            }else{
                                if (res.data.status == 1) {
                                    this.tableData=[];
                                    this.tableData = res.data.content
                                    for (let i = 0; i < this.tableData.length; i++) {
                                        let currentTime = this.tableData[i].currentTime ? this.tableData[i].currentTime + ' ' : ''
                                        let currentNode = this.tableData[i].currentNode ? this.tableData[i].currentNode + ' ' : ''
                                        let currentPlace = this.tableData[i].currentPlace ? this.tableData[i].currentPlace : ''
                                        this.tableData[i]['currentMsg'] = currentTime + currentNode + currentPlace
                                    }
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
                        this.isLoading = false;
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
            //给分页传的属性
            handleChange(params) {
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
            //搜索
            serchBtn() {
                this.$refs.refPagination.handleCurrentChange(1);
            },
            //选择
            selectedCheck(val) {
                this.multipleSelection = val
            },
            //双击跳转详情页
            waytraDetail(row) {
                if(row.resultStatus !== 2 && row.recordId && row.refmd5){
                    this.waytrackDetail = true
                    this.tratckText = '修改'
                    this.refmd5 = row.refmd5
                    this.recordId = row.recordId
                }
            },
            //详情页关闭事件
            closeDetail() {
                this.waytrackDetail = false
            },
            //详情页保存时需要调的函数
            updatManage(){
                this.waytrackDetail = false
                this.searchList()
            },
            //立即刷新
            immediate(){
                var immediateList = []
                for(let i=0; i<this.multipleSelection.length; i++){
                    immediateList.push({
                        carriercd: this.multipleSelection[i].carriercd,
                        referenceno: this.multipleSelection[i].blno ? this.multipleSelection[i].blno : this.multipleSelection[i].ctnrno ? this.multipleSelection[i].ctnrno : '',
                        isYundang: this.multipleSelection[i].isYundang
                    })
                }
                // 过滤出不能刷新的单子
                let unImmediateList = immediateList.filter(item=>{
                    if(item.isYundang){
                        return true
                    }
                })
                let referencenoList = []
                if(unImmediateList.length > 0){
                    for(let i=0;i<unImmediateList.length;i++){
                        referencenoList.push(unImmediateList[i].referenceno)
                    }
                    var stri = ''
                    referencenoList.filter((item,index) => {
                        var s = (index !== 0? '、' : '') + item
                        stri = stri + s
                    })
                    this.$message({
                        type: "error",
                        message: stri + "不支持立即更新"
                    });
                    return
                }
                if(immediateList.length == 0){
                    this.$message({
                        type: "error",
                        message: "请选择一条或多条数据"
                    });
                }else if(immediateList.length <= 10){
                    this.isLoading = true
                    this.$axios.post(this.commonJs.localUrl +`/schedules/trace/spiderTraceUpdate`, immediateList,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            this.$message({
                                type: "success",
                                message: "已经触发爬虫，请耐心等待。五分钟内请不要重复更新同一提单！"
                            });
                            this.$refs.table.clearSelection();
                        }else{
                            this.$message({
                                type: "error",
                                message: "立即刷新加载失败"
                            });
                        }
                        this.isLoading = false
                    })
                }else if(immediateList.length > 10){
                    this.$message({
                        type: "error",
                        message: "批量立即更新限制最多十条"
                    });
                }
            },
        },
        components: {
            newTrackDetail,
            ThePagination,
            Breadcrumb,
            loading,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.searchList();
            this.$refs.refPagination.changeValue()
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.$refs.table.clearSort()
                this.searchList('reload');
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
    .basicPortContent {
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        .serachBack {
            background-color: #fff;
            padding: 20px 0px 0px 0px;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 60px 20px;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
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
    .buttonTop {
        margin-bottom: 20px;
        .clickColor {
            background-color: #fff;
            padding: 7px 20px;
            margin-right: 10px;
        }
        .normals {
            border: 1px solid #3bafda;
            color: #3bafda;
        }
    }
</style>