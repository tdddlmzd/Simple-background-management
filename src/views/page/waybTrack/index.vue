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
                            <el-form-item label="订阅号">
                                <el-input class="inputWidth" v-model="ruleForm.referenceno" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="箱号">
                                <el-input class="inputWidth" v-model="ruleForm.ctnno" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="起运港">
                                <el-input class="inputWidth" v-model="ruleForm.pol" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="目的港">
                                <el-input class="inputWidth" v-model="ruleForm.pod" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="中转港">
                                <el-input class="inputWidth" v-model="ruleForm.transitPort" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="船公司">
                                <el-select 
                                    remote  
                                    clearable 
                                    filterable  
                                    v-model="ruleForm.carrier" 
                                    placeholder="请输入并选择"
                                    :remote-method="companyNameRemote"
                                    @focus="companyNameFocus"
                                    @change="companyNameChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        v-for="item in companyNameList"
                                        :key="item.companyName"
                                        :label="item.companyName"
                                        :value="item.companyName"
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
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="船名">
                                <el-input class="inputWidth" v-model="ruleForm.vslname" placeholder="请输入" clearable></el-input>
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
                            <el-form-item label="用户名称">
                                <el-input class="inputWidth" v-model="ruleForm.userName" placeholder="请输入" clearable></el-input>
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
                <!-- <el-button size="small" class="clickColor abnormal" @click="delectDate">删除</el-button>
                <el-button size="small" class="clickColor normals" @click="effective">有效</el-button>
                <el-button size="small" class="clickColor normals" @click="invalids">无效</el-button> -->
            </div>
            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
              :row-class-name="tabRowClassName"
              tooltip-effect="dark"
              ref="table"
              @row-dblclick="waytraDetail"
            >
                <!-- @selection-change="selectedCheck" -->
                <!-- <el-table-column type="selection" width="45" max="1">

                </el-table-column> -->
                <el-table-column prop="status" label="状态" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.status === -1 ?'异常':scope.row.status === 0?'进行中':scope.row.status === 1 ?'完成' :''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="referenceno" label="订阅号" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="dtp" label="目的港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="rcveplace" label="交货地" align="left" :show-overflow-tooltip="true" min-width="200" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="vlsname" label="船名" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="voy" label="航次" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="ctypesize" label="箱型/箱量" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="currentstatus" label="最新状态" align="left" :show-overflow-tooltip="true" min-width="240" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="remark" label="备注" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="terminalTrace" label="码头跟踪" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.terminalTrace ? scope.row.terminalTrace + '/4' : '0/4' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="carrierTrace" label="船公司跟踪" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.carrierTrace ? scope.row.carrierTrace + '/6' : '0/6' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="vesselTrace" label="船舶跟踪" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.vesselTrace ? scope.row.vesselTrace + '/6' : '0/6' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cutoff" label="CUTOFF" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.cutoff || scope.row.cutoff == 0 ? scope.row.cutoff + '/6' : '0/6' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bookTime" label="订阅时间" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updatetime" label="更新时间" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="userType" label="用户类型" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.userType === '1' ?'API':scope.row.userType === '2' ?'平台' :''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="订阅人" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.username.toUpperCase()}}
                        </span>
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
                <waybTrackDetail
                    :tratckText="tratckText"
                    :okeyid="okeyid"
                    :userType="userType"
                    :userid="userid"
                    @closeDetail="closeDetail"
                    @updatManage="updatManage"
                    ref="trendsaileDetail"
                >
                </waybTrackDetail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    import waybTrackDetail from "./waybTrackDetail.vue";
    import qs from "qs"
    export default {
        data() {
            return {
                matched: "", //路径
                isLoading: true, //loading
                tableData: [], //表格数据
                sortableState: true, //排序
                companyNameList: [], //船公司
                multipleSelection: [], //选择
                waytrackDetail: false, //详情页显示隐藏
                tratckText: '修改', //详情页显示表头标题
                okeyid: '',//详情页需要的okeyid
                userType: '', //详情页需要的用户类型 1=API 2=平台
                userid: '', //详情页需要用户id 如果是平台用户，该项必填
                ruleForm: {
                    referenceno: '', //订阅号
                    ctnno: '', //箱号
                    pol: '', //起运港 起始港在搜索的时候传五字码和船的名称都可以 传船的名称 因为它没有五字码 
                    pod: '', //目的港 目的港在搜索的时候只能传船的名称 因为它没有五字码 
                    transitPort: '', //中转港
                    carrier: '全部', //全部
                    scac: '', //船公司（四字码）
                    startTime: '', //订阅时间
                    endTime: '', //订阅时间
                    vslname: '', //船名
                    userType: '', //用户类型,0 API,1平台
                    userName: '', //用户名称
                    status: '', //状态，传空为全部 ， -1 异常 0 进行中 1 结束
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
                        value: -1,
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
                    this.ruleForm.referenceno = '', //订阅号
                    this.ruleForm.ctnno = '', //箱号
                    this.ruleForm.pol = '', //起运港
                    this.ruleForm.pod = '', //目的港
                    this.ruleForm.transitPort = '', //中转港
                    this.ruleForm.scac = '', //船公司（四字码）
                    this.ruleForm.carrier = '全部', //船公司（四字码）
                    this.ruleForm.startTime = '', //订阅开始时间
                    this.ruleForm.endTime = '', //订阅结束时间
                    this.ruleForm.vslname = '', //船名
                    this.ruleForm.userType = '', //用户类型,1API,2平台
                    this.ruleForm.userName =  '', //用户名称
                    this.ruleForm.status = '' //状态，传空为全部 ，-1 异常 0 进行中 1 结束
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
                query.carrier = this.ruleForm.carrier == '全部' ? '' : this.ruleForm.carrier
                this.$axios.post(this.commonJs.localUrl +`/schedules/trace/list?pageNumber=${this.page.pageNo}&pageSize=${this.page.pageSize}`,
                    query,
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
                // this.searchList()
            },
            //选择
            selectedCheck(val) {
                this.multipleSelection = val;
            },
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
                        this.companyNameList = res.data.content; 
                        if(value == ''){
                            this.companyNameList.unshift({
                                companyName:"全部"
                            })
                        }
                    }
                })
            },
            //船公司Focus事件
            companyNameFocus(){
                let companyName = this.ruleForm.carrier;
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCompany`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.companyNameList = res.data.content; 
                        this.companyNameList.unshift({
                            companyName:"全部"
                        })
                    }
                })
            },
            //船公司change事件
            companyNameChange(value){
                if(value === '' || value === '全部'){
                    this.ruleForm.scac = ''
                }else{
                    for (let i = 0; i < this.companyNameList.length; i++) {
                        if(this.companyNameList[i].companyName === value){
                            this.ruleForm.scac = this.companyNameList[i].scac
                        }
                    }
                }    
            },
            //双击跳转详情页
            waytraDetail(row) {
                this.waytrackDetail = true
                this.tratckText = '修改'
                // this.okeyid = row.okeyid
                this.okeyid = row.referencenomd5
                this.userType = row.userType,
                this.userid = row.userid
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
        },
        components: {
            waybTrackDetail,
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
            padding: 20px 20px 0px 20px;
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
        .abnormal {
            border: 1px solid #ff0000;
            color: #ff0000;
        }
        .butn {
            margin-right: 0;
            background-color: #ff9000;
            color: #fff;
            padding: 9px 35px;
            float: right;
            margin-bottom: 20px;
        }
    }

</style>