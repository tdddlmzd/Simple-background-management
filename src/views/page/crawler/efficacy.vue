<template>
    <div class="portContent">
        <!--loading-->
        <loading v-show="isLoading" ref="loading" class="loading"></loading>
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
                            <el-form-item label="状态">
                                <el-select
                                    v-model="ruleForm.isNotNormal"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in comState"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
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
                            <el-form-item label="更新时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.groupUpdateTimeStart"
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
                                    v-model="ruleForm.groupUpdateTimeEnd"
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
                        <el-col style="width:22%" >
                            <el-form-item label="操作时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.scacStateUpdateTimeStart"
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
                                    v-model="ruleForm.scacStateUpdateTimeEnd"
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
                <el-button size="small" class="clickColor normals" @click="effective">正常</el-button>
                <el-button size="small" class="clickColor abnormal" @click="suspended">异常</el-button>
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
                <el-table-column prop="isNotNormal" label="状态" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.isNotNormal === 0 ?'正常':scope.row.isNotNormal === 1 ?'异常':'正常'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="checkComposeCount" label="校验组合数" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="availableDataComposeCount" label="有数据组合数" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="groupUpdateTime" label="更新时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="scacStateUpdateTime" label="操作时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="operateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="sss" label="操作" align="left" :show-overflow-tooltip="true" min-width="80">
                    <template slot-scope="scope" class="identImage">
                        <div @click="checkPath(scope.row)" class="checkPath">查看组合</div>
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
                v-if="isGangPage"
            ></ThePagination>
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "", //路径
                isLoading: false, //loading
                sortableState: true, //排序
                isGangPage: true, // Pagination 分页
                companyNameList: [], //船公司
                portCountryList: [], //目的港国家
                tableData: [], //表格数据
                multipleSelection: [], //选择
                weekYear: '', //今天是今年的第几周
                weeks: '', //今年一共有多少周
                ruleForm: {
                    scac: '', //船公司四字码
                    carrier: '全部', //船公司
                    isNotNormal: '', //组合状态
                    startTime: '', //更新时间（开始）
                    endTime: '', //更新时间（结束）
                    scacStateUpdateTimeStart:'', //操作时间(开始时间)
                    scacStateUpdateTimeEnd:'', //操作时间(结束时间)
                    groupUpdateTimeStart:'', //更新时间(开始时间)
                    groupUpdateTimeEnd:'', //更新时间(结束时间)
                },
                comState : [ // 状态
                    {
                        value: '',
                        label: '全部',
                    },
                    {
                        value : 0,
                        label : '正常',
                    },
                    {
                        value : 1,
                        label : '异常',
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
                this.isLoading = true;
                this.$refs.table.clearSort()
                if(reload == 'reload'){
                    this.ruleForm.carrier = '全部',
                    this.ruleForm.scac = '', //船公司四字码
                    this.ruleForm.isNotNormal = '' //组合状态
                    this.scacStateUpdateTimeStart = '' //操作时间(开始时间)
                    this.scacStateUpdateTimeEnd = '' //操作时间(结束时间)
                    this.groupUpdateTimeStart = '' //更新时间(开始时间)
                    this.groupUpdateTimeEnd = '' //更新时间(结束时间)
                }
                // if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                //     this.page.pageNo = 1;
                //     this.pageNumber = 1;
                // };
                if(this.ruleForm.scacStateUpdateTimeStart == '' || this.ruleForm.scacStateUpdateTimeStart == null) {
                    this.ruleForm.scacStateUpdateTimeStart = ''
                }
                if(this.ruleForm.scacStateUpdateTimeEnd == '' || this.ruleForm.scacStateUpdateTimeEnd == null) {
                    this.ruleForm.scacStateUpdateTimeEnd = ''
                }
                if(this.ruleForm.groupUpdateTimeStart == '' || this.ruleForm.groupUpdateTimeStart == null) {
                    this.ruleForm.groupUpdateTimeStart = ''
                }
                if(this.ruleForm.groupUpdateTimeEnd == '' || this.ruleForm.groupUpdateTimeEnd == null) {
                    this.ruleForm.groupUpdateTimeEnd = ''
                }
                this.$axios.get(this.commonJs.localUrl +`/schedules/scacPort/getScacList?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&scac=${this.ruleForm.scac
                }&isNotNormal=${this.ruleForm.isNotNormal
                }&scacStateUpdateTimeStart=${this.ruleForm.scacStateUpdateTimeStart ? (this.ruleForm.scacStateUpdateTimeStart + ' 00:00:00') : ''
                }&scacStateUpdateTimeEnd=${this.ruleForm.scacStateUpdateTimeEnd ? (this.ruleForm.scacStateUpdateTimeEnd + ' 00:00:00') : ''
                }&groupUpdateTimeStart=${this.ruleForm.groupUpdateTimeStart ? (this.ruleForm.groupUpdateTimeStart + ' 00:00:00') : ''
                }&groupUpdateTimeEnd=${this.ruleForm.groupUpdateTimeEnd ? (this.ruleForm.groupUpdateTimeEnd + ' 00:00:00') : ''
                }`,{
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
                        if(reload == 'upda'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '状态修改成功'});
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
            //搜索
            serchBtn() {
                this.$refs.refPagination.handleCurrentChange(1);
                // this.searchList();
            },
            //正常
            effective() {
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                if(val.length == 1 && (val[0].isNotNormal == 0 || val[0].isNotNormal == '')){
                    this.$message({ type:"error", message: '请选择其他状态进行操作'})
                    return
                }
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为正常？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    // let uuid = this.commonJs.getUuid();
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        isNotNormal: 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/scacPort/updateScacNormalState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.searchList("upda");
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //异常
            suspended() {
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                if(val.length == 1 && val[0].isNotNormal == 1){
                    this.$message({ type:"error", message: '请选择其他状态进行操作'})
                    return
                }
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为异常？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        isNotNormal: 1,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/scacPort/updateScacNormalState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.searchList("upda");
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
            checkPath(item) {
                this.isGangPage = false
                var query = {
                    carrier:item.carrier, //船公司名称
                    scac:item.scac, //船公司四字码
                }
                this.$bus.emit('chaneCrawlTab',query);
            },
        },
        components: {
            ThePagination,
            loading,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.searchList();
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
            // this.$store.commit("handleNowTab",false)
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
    .contentLeft {
        float: left;
        // position: absolute;
        // left: 20px;
        width: 90%;
    }
    .contenRight {
        // float: right;
        position: absolute;
        right: 20px;
        bottom: 5px;
        // width: 10%;
    }
    .serachBtn {
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .portContent {
        position: relative;
        overflow: hidden;
        .serachBack {
            background-color: #fff;
            margin-bottom: 10px;
            position: relative;
            padding: 0px 20px 0px 20px;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 20px 20px;
            border-top: 10px solid #f5f6f8;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
        }
    }
    .buttonTop {
        margin-bottom: 20px;
        .clickColor {
            background-color: #fff;
            padding: 9px 27px;
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
        .export {
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .butn {
            margin-right: 0;
            background-color: #ff9000;
            color: #fff;
            padding: 9px 35px;
            float: right;
            margin-bottom: 20px;
        }
        .dataUpda{
            display: inline-block;
            margin-left: 40px;
            font-size: 14px;
            span{
                font-family:'Arial Negreta', 'Arial';
                font-weight:600;
                color:#FF0000;            
            }
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
    .identImage{
        position: relative;
    }
    .checkPath{
        color: #3bafda;
        cursor: pointer;
    }
</style>