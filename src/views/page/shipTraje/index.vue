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
                label-width="90px"
            >
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="船名">
                                <el-input class="inputWidth" v-model="ruleForm.vesselName" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="IMO">
                                <el-input class="inputWidth" v-model="ruleForm.imo" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="MMSI">
                                <el-input class="inputWidth" v-model="ruleForm.mmsi" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="Callsign">
                                <el-input class="inputWidth" v-model="ruleForm.callsign" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%"  > 
                            <el-form-item label="类型">
                                <el-select 
                                    v-model="ruleForm.shiptype" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in shipDate"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="Flag">
                                <el-input class="inputWidth" v-model="ruleForm.flag" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="箱量">
                                <!-- <el-input class="inputWidth" v-model="ruleForm.ctnNumber" @input="ruleForm.ctnNumber = commonJs.handleNumber(ruleForm.ctnNumber)" placeholder="请输入" clearable></el-input> -->
                                <el-select 
                                    v-model="ruleForm.ctnNumber" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in boxType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="建造日期" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.buildDate"
                                    type="year"
                                    placeholder="选择年"
                                    style="width:100%"
                                    @change="changeDate(ruleForm.buildDate)"
                                >
                                </el-date-picker>                            
                            </el-form-item> 
                        </el-col> 
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="运营方">
                                <el-input class="inputWidth" v-model="ruleForm.runner" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="母船">
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
                        <el-col style="width:22%"  > 
                            <el-form-item label="状态">
                                <el-select 
                                    v-model="ruleForm.state" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in shippStatus"
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
                <el-button size="small" class="clickColor butn" @click="handleAddClick">新增</el-button>
                <el-button size="small" class="clickColor dered" @click="delectDate">删除</el-button>
                <el-button size="small" class="clickColor normals" @click="effective">有效</el-button>
                <el-button size="small" class="clickColor abnormal" @click="invalids">无效</el-button>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
              :row-class-name="tabRowClassName"
              tooltip-effect="dark"
              @row-dblclick="shipDetail"
              @selection-change="selectedCheck"
              ref="table"
            >
                <el-table-column type="selection" width="45" max="1">

                </el-table-column>
                <el-table-column prop="state" label="状态" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.state === 0 ?'有效':scope.row.state === 1 ?'无效':scope.row.state === 2 ?'待更新':'无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="vesselName" label="船名" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="imo" label="IMO" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="mmsi" label="MMSI" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="shiptype" label="类型" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="runner" label="运营方" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="carrier" label="母船" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="gcShip" label="共舱船公司" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="newest" label="最新位置" align="left" min-width="240"  :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.updateUser.toUpperCase()}}
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
                :visible.sync="shipTraDetail"
                v-if="shipTraDetail"
                ref="dialogDetailVisible"
                width="80%"
                top="0"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
            >
                <shipTrajeDetail
                    :shipText = shipText
                    :rowId = rowId
                    @closeDetail="closeDetail"
                    @UpdatParent="UpdatParent"
                    ref="trendsaileDetail"
                >
                </shipTrajeDetail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import shipTrajeDetail from "./shipTrajeDetail.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "", //路径
                isLoading: true, //
                tableData: [], //表格数据
                sortableState: true, // 排序方式
                shipTraDetail: false, //新增 删除页是否打开
                shipText: '', //详情页传的字段
                rowId: '', // 修改表格时传的行ID
                multipleSelection: [], // 选择
                companyNameList: [], //船公司
                ruleForm: {
                    vesselName: '', //船名
                    imo: '', //imo
                    mmsi: '', //mmsi
                    callsign: '', //呼号
                    shiptype: '', //船类型，传空为全部
                    flag: '', //旗帜
                    ctnNumber: '',//箱量
                    buildDate: '',//建造日期
                    runner: '',//运营方
                    carrier: '全部',//母船
                    scac: '', //船公司五子码
                    state: '',//状态，传空为全部 ，0有效，1无效，2待更新
                },
                shipDate: [ //类型
                    {
                        value:'',
                        label:'全部'
                    },
                    {
                        value: 'Container ship',
                        label: '集装箱船'
                    },
                ],
                shippStatus: [ //状态
                    {
                        value:'',
                        label:'全部'
                    },
                    {
                        value: '0',
                        label: '有效'
                    },
                    {
                        value: '1',
                        label: '无效'
                    },
                ],
                boxType: [ //箱量类型
                    {
                        value:'',
                        label:'全部'
                    },
                    {
                        value: '10000TEU以上',
                        label: '10000TEU以上'
                    },
                    {
                        value: '4500-10000TEU',
                        label: '4500-10000TEU'
                    },
                    {
                        value: '2000-4500TEU',
                        label: '2000-4500TEU'
                    },
                    {
                        value: '800-2000TEU',
                        label: '800-2000TEU'
                    },
                    {
                        value: '800TEU以下',
                        label: '800TEU以下'
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
                this.$axios.get(this.commonJs.localUrl +`/schedules/vessel/list?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&vesselName=${this.ruleForm.vesselName
                }&imo=${this.ruleForm.imo
                }&mmsi=${this.ruleForm.mmsi
                }&callsign=${this.ruleForm.callsign
                }&shiptype=${this.ruleForm.shiptype
                }&flag=${this.ruleForm.flag
                }&ctnNumber=${this.ruleForm.ctnNumber
                }&buildDate=${this.ruleForm.buildDate ? this.ruleForm.buildDate : ''
                }&runner=${this.ruleForm.runner
                }&carrier=${this.ruleForm.carrier == '全部' ? '' : this.ruleForm.carrier
                }&state=${this.ruleForm.state
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
                                    // console.log(this.$route)
                                    // this.handleAddClick()      
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
                        }else if(reload == 'delect'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '删除成功'});
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
            //改变日期格式
            changeDate(val){
                //下面是处理时间
                if(val) {
                    var d = new Date(val)
                    var Y = d.getFullYear()
                    this.ruleForm.buildDate = Y + ''
                }else{
                     this.ruleForm.buildDate = ''
                }
            },
            //搜索
            serchBtn() {
                this.$refs.refPagination.handleCurrentChange(1);
                // this.searchList()
            },
            //新增
            handleAddClick() {
                this.shipTraDetail = true
                this.shipText = '新增'
            },
            //删除
            delectDate() {
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行删除',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否确认删除</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/vessel/delete`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchList("delect");
                        }
                    })
                }).catch(_ => {});
            },
            //有效
            effective() {
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为有效？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        state: 0,
                    }
                    this.$axios.put(this.commonJs.localUrl +`/schedules/vessel/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchList("upda");
                        }
                    })
                }).catch(_ => {});
            },
            //无效
            invalids() {
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为无效？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        state: 1,
                    }
                    this.$axios.put(this.commonJs.localUrl +`/schedules/vessel/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchList("upda");
                        }
                    })
                }).catch(_ => {});
            },
            //双击详情
            shipDetail(row) {
                this.shipTraDetail = true
                this.shipText = '修改'
                this.rowId = row.id
            },
            //详情页关闭事件
            closeDetail() {
                this.shipTraDetail = false
            },
            //选择
            selectedCheck(val) {
                this.multipleSelection = val;
            },
            //更新父组件
            UpdatParent() {
                this.searchList()
            },
        },
        components: {
            ThePagination,
            Breadcrumb,
            loading,
            shipTrajeDetail,
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
                this.ruleForm.vesselName = '', //船名
                this.ruleForm.imo = '', //imo
                this.ruleForm.mmsi = '', //mmsi
                this.ruleForm.callsign = '', //呼号
                this.ruleForm.shiptype = '', //船类型，传空为全部
                this.ruleForm.flag = '', //旗帜
                this.ruleForm.ctnNumber = '', //箱量
                this.ruleForm.buildDate = '', //建造日期
                this.ruleForm.runner = '', //运营方
                this.ruleForm.carrier = '全部', //母船
                this.ruleForm.state = ''//状态，传空为全部 ，0有效，1无效，2待更新
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
        .butn {
            margin-right: 0;
            background-color: #ff9000;
            border: 1px solid #ff9000;
            color: #fff;
            padding: 9px 35px;
            float: right;
            margin-bottom: 20px;
        }
        .dered{
            float: right;
            border: 1px solid #FF0000;
            color: #FF0000;
            padding: 9px 35px;
            background-color: #fff;
            margin-right:10px;
        }
    }

</style>