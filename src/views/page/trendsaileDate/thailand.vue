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
                label-width="90px"
            >
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="船公司">
                                <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.companyName"
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
                        <el-col style="width:22%">
                            <el-form-item label="起运港">
                                <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.pol"
                                    placeholder="请输入并选择"
                                    :remote-method="portStartRemote"
                                    @focus="portStartFocus"
                                    @change="portStartChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        v-for="item in portStartList"
                                        :key="item.id"
                                        :label="item.portEn"
                                        :value="item.id"
                                        :title='item.portEn+"("+ item.portCode+")"'

                                    >
                                        <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="目的港">
                                <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.pod"
                                    placeholder="请输入并选择"
                                    :remote-method="portEndRemote"
                                    @focus="portEndFocus"
                                    @change="portEndChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        v-for="item in portEndList"
                                        :key="item.id"
                                        :label="item.portEn"
                                        :value="item.id"
                                        :title='item.portEn+"("+ item.portCode+")"'
                                    >
                                        <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="目的港国家">
                                <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.podCountry"
                                    placeholder="请输入并选择"
                                    :remote-method="portCountryRemote"
                                    @focus="portCountryFocus"
                                    @change="portCountryChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        v-for="item in portCountryList"
                                        :key="item.id"
                                        :label="item.countryCn"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%"> 
                            <el-form-item label="目的港航线">
                                <el-select 
                                    remote  
                                    clearable 
                                    filterable  
                                    v-model="ruleForm.routeId" 
                                    placeholder="请输入并选择"
                                    :remote-method="routeRemote"
                                    @focus="routeFocus"
                                    @change="routeChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        v-for="item in routeList"
                                        :key="item.routeId"
                                        :label="item.routeCn"
                                        :value="item.routeId"
                                    >
                                    </el-option>
                                </el-select>
                                <!-- <el-select
                                    v-model="ruleForm.routeId"
                                    @focus="routeFocus"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in routeList"
                                        :key="item.routeId"
                                        :label="item.routeCn"
                                        :value="item.routeId"
                                    >
                                    </el-option>
                                </el-select> -->
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="级别">
                                <el-select
                                    v-model="ruleForm.podLevel"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in podLevelList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        ref="countryEn"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="更新时间" class="searchTime">
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
                            <el-form-item label="状态">
                                <el-select
                                    v-model="ruleForm.state"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in comState"
                                        :key="item.id"
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
                <el-button size="small" class="clickColor normals" @click="effective">有效</el-button>
                <el-button size="small" class="clickColor abnormal" @click="invalids">无效</el-button>
                <el-button size="small" class="clickColor abnormal" @click="suspended">暂停</el-button>
                <!-- <el-button size="small" class="clickColor abnormal" @click="delectDate">删除</el-button> -->
                <!-- <p class="dataUpda">当前数据更新至：<span>第{{weekYear}}周</span></p> -->
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
                <el-table-column prop="state" label="状态" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.state === '0' ?'有效':scope.row.state === '1' ? '暂停' :scope.row.state === '6' ? '无效' : '有效'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="startPort" label="船公司起运港" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">
                    
                </el-table-column>
                <el-table-column prop="endPort" label="船公司目的港" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">
                    
                </el-table-column>
                <el-table-column prop="level" label="级别" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="podPinYin" label="目的港国家" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.podCountry}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="routePinYin" label="目的港航线" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.podRoute}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="directCount" label="直达路径" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="transitCount" label="中转路径" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="missVessel" label="空班船" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="ovtVessel" label="加班船" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="weeksOut" label="周数" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="directCountUpdate" label="更新直达" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="transitCountUpdate" label="更新中转" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="missVesselUpdate" label="更新空班船" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="ovtVesselUpdate" label="更新加班船" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <!-- <el-table-column prop="weeksOutUpdate" label="更新周数" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column> -->
                <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="sss" label="操作" align="left" :show-overflow-tooltip="true" min-width="80">
                    <template slot-scope="scope" class="identImage">
                        <div @click="checkPath(scope.row)" class="checkPath">查看路径</div>
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
                portStartList: [], //起始港
                portEndList: [], //目的港
                portCountryList: [], //目的港国家
                routeList:[], //目的港航线                
                tableData: [], //表格数据
                multipleSelection: [], //选择
                weekYear: '', //今天是今年的第几周
                weeks: '', //今年一共有多少周
                ruleForm: {
                    scac: 'ANNU', //船公司四字码
                    companyName: 'ANL', //船公司
                    pol: '', //起始港
                    pod: '', //目的港
                    polCode: '', //起始港五字码
                    podCode: '', //目的港五字码
                    podCountry: '', //目的港国家id
                    podLevel: '', //目的港等级
                    state: '', //组合状态
                    startTime: '', //更新时间（开始）
                    endTime: '', //更新时间（结束）
                    routeId: '', //目的港航线
                },
                //等级
                podLevelList: [
                    {
                        value: '',
                        label: '全部',
                    },
                    {
                        value: 1,
                        label: '1',
                    },
                    {
                        value: 2,
                        label: '2',
                    },
                ],
                comState : [ // 状态
                    {
                        value: '',
                        label: '全部',
                    },
                    {
                        value : 0,
                        label : '有效',
                    },
                    {
                        value : 1,
                        label : '暂停',
                    },
                    {
                        value : 6,
                        label : '无效',
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
                    this.ruleForm.companyName = 'ANL',
                    this.ruleForm.scac = 'ANNU', //船公司四字码
                    this.ruleForm.pol = '', //起始港
                    this.ruleForm.pod = '', //目的港
                    this.ruleForm.polCode = '', //起始港五字码
                    this.ruleForm.podCode = '', //目的港五字码
                    this.ruleForm.podCountry = '', //目的港国家id
                    this.ruleForm.podLevel = '', //目的港等级
                    this.ruleForm.state = '', //组合状态
                    this.ruleForm.routeId = '', //组合状态
                    this.ruleForm.startTime = '', //更新时间（开始）
                    this.ruleForm.endTime = '' //更新时间（结束）
                }
                // if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                //     this.page.pageNo = 1;
                //     this.pageNumber = 1;
                // };
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }
                this.$axios.get(this.commonJs.localUrl +`/schedules/spiderPort/list?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&scac=${this.ruleForm.scac
                }&polCode=${this.ruleForm.polCode
                }&podCode=${this.ruleForm.podCode
                }&podCountry=${this.ruleForm.podCountry
                }&podLevel=${this.ruleForm.podLevel
                }&state=${this.ruleForm.state
                }&routeId=${this.ruleForm.routeId
                }&startTime=${this.ruleForm.startTime
                }&endTime=${this.ruleForm.endTime
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
                                    for (let i = 0; i < this.tableData.length; i++) {
                                        this.tableData[i].podPinYin = this.commonJs.getPinYin(this.tableData[i].podCountry)
                                        this.tableData[i].routePinYin = this.commonJs.getPinYin(this.tableData[i].podRoute)
                                        
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
                        if(reload == 'upda'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '状态修改成功'});
                        }else if(reload == 'delect'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '删除成功'});
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
            //有效
            effective() {
                var val = this.multipleSelection
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
                    var routeList = []
                    var polCodeList = []
                    var podCodeList = []
                    var scacList = []
                    for (let i = 0; i < val.length; i++) {
                        var scac
                        if(val[i].scac.indexOf('-') !== -1){
                            scac = (val[i].scac.split('-'))[0]
                        }else{
                            scac = val[i].scac ? val[i].scac : ''
                        }
                        var startBasicCode = val[i].startBasicCode ? val[i].startBasicCode : ''
                        var endBasicCode = val[i].endBasicCode ? val[i].endBasicCode : ''
                        routeList.push(val[i].id)
                        polCodeList.push(startBasicCode)
                        podCodeList.push(endBasicCode)
                        scacList.push(scac)
                    }
                    let query = {
                        ids: routeList,
                        polCode:polCodeList,
                        podCode:podCodeList,
                        scac:scacList,
                        state: 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/spiderPort/updateState`,
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
            //无效
            invalids(){
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
                    var polCodeList = []
                    var podCodeList = []
                    var scacList = []
                    for (let i = 0; i < val.length; i++) {
                        var scac
                        if(val[i].scac.indexOf('-') !== -1){
                            scac = (val[i].scac.split('-'))[0]
                        }else{
                            scac = val[i].scac ? val[i].scac : ''
                        }
                        var startBasicCode = val[i].startBasicCode ? val[i].startBasicCode : ''
                        var endBasicCode = val[i].endBasicCode ? val[i].endBasicCode : ''
                        routeList.push(val[i].id)
                        polCodeList.push(startBasicCode)
                        podCodeList.push(endBasicCode)
                        scacList.push(scac)
                    }
                    let query = {
                        ids: routeList,
                        polCode:polCodeList,
                        podCode:podCodeList,
                        scac:scacList,
                        state: 6,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/spiderPort/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.searchList("upda");
                        }
                    })
                }).catch(_ => {});
            },
            //暂停
            suspended() {
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为暂停？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var routeList = []
                    var polCodeList = []
                    var podCodeList = []
                    var scacList = []
                    for (let i = 0; i < val.length; i++) {
                        var scac
                        if(val[i].scac.indexOf('-') !== -1){
                            scac = (val[i].scac.split('-'))[0]
                        }else{
                            scac = val[i].scac ? val[i].scac : ''
                        }
                        var startBasicCode = val[i].startBasicCode ? val[i].startBasicCode : ''
                        var endBasicCode = val[i].endBasicCode ? val[i].endBasicCode : ''
                        routeList.push(val[i].id)
                        polCodeList.push(startBasicCode)
                        podCodeList.push(endBasicCode)
                        scacList.push(scac)
                    }
                    let query = {
                        ids: routeList,
                        polCode:polCodeList,
                        podCode:podCodeList,
                        scac:scacList,
                        state: 1,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/spiderPort/updateState`,
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
            //删除
            delectDate() {
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行删除',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否确认删除？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
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
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/spiderPort/delete`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.searchList("delect");
                        }else{
                            that.$message({ type:"error", message: '删除失败'});
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
                let companyName = this.ruleForm.companyName;
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
            //起运港 搜索
            portStartRemote(value) {
                this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=0&port=${value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portStartList = res.data.content;
                    }
                });
            },
            //起运港 foucs
            portStartFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/queryPort?pol=0`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portStartList = res.data.content;
                    }
                });
            },
            //起运港 change
            portStartChange(val) {
                if(val){
                    for (let i = 0; i < this.portStartList.length; i++) {
                        if(this.portStartList[i].id == val){
                            this.ruleForm.polCode = this.portStartList[i].portCode
                        }
                        
                    }
                }else{
                    this.ruleForm.polCode = ''
                }
            },
            //目的港 搜索
            portEndRemote(value) {
                this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=1&port=${value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portEndList = res.data.content;
                    }
                });
            },
            //目的港 foucs
            portEndFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/queryPort?pol=1`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portEndList = res.data.content;
                    }
                });
            },
            //目的港 change
            portEndChange(val) {
                if(val){
                    for (let i = 0; i < this.portEndList.length; i++) {
                        if(this.portEndList[i].id == val){
                            this.ruleForm.podCode = this.portEndList[i].portCode
                        }
                    }
                }else{
                    this.ruleForm.podCode = ''
                }
            },

            //目的港国家 远程搜索
            portCountryRemote(value) {
                this.$axios.get(this.commonJs.localUrl + `/schedules/port/queryCountry?countryName=${value}`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portCountryList = res.data.content;
                    }
                });
            },
            //目的港国家 foucs
            portCountryFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/port/queryCountry`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.portCountryList = res.data.content;
                    }
                });
            },
            //目的港国家 change
            portCountryChange() {},
            //航线搜索
            routeRemote(value){
                this.$axios.get(this.commonJs.localUrl +`/schedules/route/getAllRoute?routeCn=${value}`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.routeList = res.data.content; 
                    }
                })
            },
            //航线focus
            routeFocus(){
                this.$axios.get(this.commonJs.localUrl +`/schedules/route/getAllRoute`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.routeList = res.data.content; 
                    }
                })
            },
            routeChange(){},
            //查看路径
            checkPath(item) {
                this.isGangPage = false
                var query = {
                    scac:item.scac, //船公司四字码
                    companyName:item.carrier, //船公司名称
                    pol:item.pol, //起始港名称
                    pod:item.pod, //目的港名称
                    polCode:item.startBasicCode, //起始港五字码
                    podCode:item.endBasicCode, //目的港五字码
                }
                this.$bus.emit('switchTab',query);
                // this.$store.commit("handleNowTab",false);
            },
             //获取今天是今年的第几周
            getWeekYear() {
                var d1 = new Date();
                var d2 = new Date();
                //下面是获取今年1月号是第几周
                var Y = d1.getFullYear()
                var resDate = Y + '-' + '01' + '-' + '01'
                var W = new Date(Date.parse(resDate)).getDay() //今年的1月1号周几
                //下面是获取今天是本年第几天
                d2.setMonth(0);
                d2.setDate(1);
                var rq = d1-d2;
                var s1 = Math.ceil(rq/(24*60*60*1000));

                //（今年的第一天在周数）/7 等于第几周
                var s2 = Math.ceil((s1+W)/7);
                // console.log("今天是本年第"+s1+"天，第"+s2+"周");//周日做为下周的开始计算
                if(s2 + 4 <= this.weeks){ //如果 当前第几周+4小于今年多少周 则
                    this.weekYear = s2 + 4
                }else{ //否则
                    this.weekYear = this.weeks
                }
            },
            //获取今年有多少周
            weekNumber() {
                var d1 = new Date()
                var Y = d1.getFullYear()
                var S = Y + '-' + '01' + '-' + '01' //一年的开始时间
                var E = Y + '-' + '12' + '-' + '31' //一年的开始时间
                let currentYearDays = this.isLeapYear(Y) ? 366 : 365
                let beforeDays = 7 - this.getDate(S)+1
                let afterDays = this.getDate(E)
                let vaildDays = currentYearDays - beforeDays - afterDays
                this.weeks = (vaildDays / 7) + 1
            },
            //判断是否是闰年
           isLeapYear(year) {
                if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                    // console.log(year + 'is leap year')
                    return true

                } else {
                    // console.log(year + 'is not leap year')
                    return false
                }
            },
            //获取某年某月某日是星球几
            getDate(date) {
                let oDate = new Date(date)
                let day = oDate.getDay()
                switch (day) {
                    case 0:
                        // console.log('星期日')
                        return 0
                    case 1:
                        // console.log('星期一')
                        return 1
                    case 2:
                        // console.log('星期二')
                        return 2
                    case 3:
                        // console.log('星期三')
                        return 3
                    case 4:
                        // console.log('星期四')
                        return 4
                    case 5:
                        // console.log('星期五')
                        return 5
                    case 6:
                        // console.log('星期六')
                        return 6
                }
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
            this.weekNumber() //今年一共有多少周
            this.getWeekYear() //获取今天是今年的第几周
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
            this.$store.commit("handleNowTab",false)
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