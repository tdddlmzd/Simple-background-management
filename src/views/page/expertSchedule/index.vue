<template>
<!-- 查询记录 -->
    <div class="basicPortContent" ref="basicPortContent">
        <breadcrumb :matched="matched"></breadcrumb>
        <loading v-show="isLoading"></loading>
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
                            <el-form-item label="专家状态">
                                <el-select
                                    v-model="ruleForm.expertStatus"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in expertList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="平台状态">
                                <el-select
                                    v-model="ruleForm.platFormStatus"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in platformList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="是否正确">
                                <el-select
                                    v-model="ruleForm.opinionStatus"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in opinionList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="类型">
                                <el-select
                                    v-model="ruleForm.state"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in stateList"
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
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="航线">
                                <el-select 
                                    remote  
                                    clearable 
                                    filterable  
                                    v-model="ruleForm.routeCn"
                                    placeholder="请输入并选择"
                                    :remote-method="routeRemote"
                                    @focus="routeFocus"
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
                            </el-form-item>
                        </el-col>
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
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="路径数">
                                <el-select
                                    v-model="ruleForm.transitCount"
                                    clearable
                                    style="width:100%"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in isTransitList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="路径">
                                <el-input v-model="ruleForm.path" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="ETD">
                                <el-select
                                    v-model="ruleForm.etd"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in ETDList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="进/出口">
                                <el-select
                                    v-model="ruleForm.area"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    default-first-option
                                >
                                    <el-option
                                        v-for="item in areaList"
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
                        <el-col style="width:22%" >
                            <el-form-item label="确认时间" class="searchTime">
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
                        <el-col style="width:22%" >
                            <el-form-item label="操作时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.updateStartTime"
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
                                    v-model="ruleForm.updateEndTime"
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
        <div class="tablePage">
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @selection-change="handleSelectionChange"
                @row-dblclick="tabRouteChange"
                :header-cell-class-name="headerStyle"
            >
                <el-table-column type="selection" width="40">

                </el-table-column>
                <el-table-column prop="expertStatus" label="专家状态" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span v-if="scope.row.expertStatus==0" >未确认</span>
                        <span v-if="scope.row.expertStatus==1" >已确认</span>
                    </template>
                </el-table-column>
                <el-table-column prop="opinionStatus" label="是否正确" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span v-if="scope.row.opinionStatus==0" >正确</span>
                        <span v-if="scope.row.opinionStatus==1" >新增</span>
                        <span v-if="scope.row.opinionStatus==2" >错误</span>
                    </template>
                </el-table-column>
                <el-table-column prop="platFormStatus" label="平台状态" align="left" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platFormStatus==0" >未审核</span>
                        <span v-if="scope.row.platFormStatus==1" >已审核</span>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="类型" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==0" >常用</span>
                        <span v-if="scope.row.state==1" >加班</span>
                        <span v-if="scope.row.state==2" >无效</span>
                        <span v-if="scope.row.state==3" >待定</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expertName" label="专家名称" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="polTerminalPinYin" label="起运港码头" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.polTerminal}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="routeName" label="航线" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="podTerminalPinYin" label="目的港码头" align="left" :show-overflow-tooltip="true" min-width="110" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.podTerminal}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    
                </el-table-column>
                <el-table-column prop="transitCount" label="路径数" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span v-if="scope.row.transitCount==1" >直达</span>
                        <span v-if="scope.row.transitCount==2" >2程</span>
                        <span v-if="scope.row.transitCount==3" >3程</span>
                        <span v-if="scope.row.transitCount==4" >4程</span>
                    </template>
                </el-table-column>
                <el-table-column prop="etdNum" label="ETD" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.etd != '' ? scope.row.etd : '-'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="transitTime" label="航程" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.transitTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="routeWay" label="路径" align="left" :show-overflow-tooltip="true" min-width="150" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.row.updateUser ? scope.row.updateUser.toUpperCase() : ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="updateDate" label="操作时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="142">
                
                </el-table-column>
                <el-table-column prop="expertConfirm" label="专家确认时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="142">
                    <template slot-scope="scope">
                        <span>{{scope.row.expertConfirmDate}}</span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
            <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>  
            <!--分页-->
        </div>
        <el-dialog
            class="dialogAddVisible"
            :visible.sync="dialogDetailVisible"
            v-if="dialogDetailVisible"
            ref="dialogDetailVisible"
            width="80%"
            top="0"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <expertScheduleDetail
                @handleCloseDetail="handleCloseDetail"
                @updatInfor="updatInfor"
                :pathId = pathId
                :expertStatus = expertStatus
                ref="expertScheduleDetail"
            >
            </expertScheduleDetail>
        </el-dialog>
    </div>
</template>

<script>
    import qs from "qs";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    import expertScheduleDetail from "./expertScheduleDetail.vue";
    export default {
        data() {
            return {
                isLoading : true,
                companyNameList: [], //船公司
                portStartList: [], //起运港
                portEndList: [], //目的港
                tableData: [], //表格数据
                sortableState: true,
                dialogDetailVisible: false, //详情页显示隐藏
                pathId: '', //往详情页传的路径id
                expertStatus: 0, //当前双击行的专家状态
                ruleForm: {
                    expertStatus: '',//专家状态
                    platFormStatus: '',//平台状态
                    opinionStatus: '',//是否正确
                    state: '',//类型
                    pol: '', //起始港
                    polCode: '', //起始港五字码
                    routeCn: '', //航线Id
                    pod: '', //目的港
                    podCode: '', //目的港五字码
                    companyName: 'ANL', //船公司
                    scac: 'ANNU', //船公司四字码
                    transitCount: '', //路径数
                    path: '', //路径
                    etd: "", //etd（周英文三字简写）
                    area: 0, //出口进口
                    startTime: '',  //确认时间（开始）
                    endTime: '',  //确认时间（结束
                    updateStartTime: '',  //操作时间（开始）
                    updateEndTime: '',  //操作时间（结束
                },
                stateList: [
                    {
                        value: '',
                        label: "全部"
                    },
                    {
                        value: 0,
                        label: "常用"
                    },
                    {
                        value: 1,
                        label: "加班"
                    },
                    {
                        value: 2,
                        label: "无效"
                    },
                    {
                        value: 3,
                        label: "待定"
                    },
                ],
                //是否中转
                isTransitList: [
                    {
                        value: "",
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "直达"
                    },
                    {
                        value: 2,
                        label: "2程"
                    },
                    {
                        value: 3,
                        label: "3程"
                    },
                    {
                        value: 4,
                        label: "4程"
                    },
                ],
                ETDList : [
                    {
                        value : "",
                        label : '全部',
                    },
                    {
                        value : 'MON',
                        label : 'MON',
                    },
                    {
                        value : 'TUE',
                        label : 'TUE',
                    },
                    {
                        value : 'WED',
                        label : 'WED',
                    },
                    {
                        value : 'THU',
                        label : 'THU',
                    },
                    {
                        value : 'FRI',
                        label : 'FRI',
                    },
                    {
                        value : 'SAT',
                        label : 'SAT',
                    },
                    {
                        value : 'SUN',
                        label : 'SUN',
                    },
                    {
                        value : '未知',
                        label : '未知',
                    }
                ],
                expertList : [
                    {
                        value : "",
                        label : '全部',
                    },
                    {
                        value : 0,
                        label : '未确认',
                    },
                    {
                        value : 1,
                        label : '已确认',
                    }
                ],
                platformList : [ 
                    {
                        value : "",
                        label : '全部',
                    },
                    {
                        value : 0,
                        label : '未审核',
                    },
                    {
                        value : 1,
                        label : '已审核',
                    },
                ],
                opinionList : [ 
                    {
                        value : "",
                        label : '全部',
                    },
                    {
                        value : 0,
                        label : '正确',
                    },
                    {
                        value : 1,
                        label : '新增',
                    },
                    {
                        value : 2,
                        label : '错误',
                    },
                ],
                areaList : [ 
                    {
                        value : 0,
                        label : '出口',
                    },
                    {
                        value : 1,
                        label : '进口',
                    },
                ],
                multipleSelection: [],
                routeList: [],
                AccessToken:"",
                authorization:"",
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
                matched:"",
            }
        },
        components : {
            ThePagination,
            Breadcrumb,
            loading,
            noData,
            expertScheduleDetail,
        },
        methods: {
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //双击专家列表
            tabRouteChange(row){
                this.dialogDetailVisible = true
                this.pathId = row.pathId
                this.expertStatus = row.expertStatus
            },
            //页面初始化
            searchList(reload){
                this.isLoading = true
                this.$refs.table.clearSort()
                if(reload == 'reload'){
                    this.ruleForm.expertStatus = '' //专家状态
                    this.ruleForm.platFormStatus = '' //平台状态
                    this.ruleForm.opinionStatus = '' //是否正确
                    this.ruleForm.state = '' //类型
                    this.ruleForm.pol = '' //起始港
                    this.ruleForm.polCode = '' //起始港五字码
                    this.ruleForm.routeCn = '' //航线Id
                    this.ruleForm.pod = '' //目的港
                    this.ruleForm.podCode = '' //目的港五字码
                    this.ruleForm.companyName = 'ANL' //船公司
                    this.ruleForm.scac = 'ANNU' //船公司四字码
                    this.ruleForm.transitCount = '' //路径数
                    this.ruleForm.path = '' //路径
                    this.ruleForm.etd = '' //etd（周英文三字简写）
                    this.ruleForm.area = 0 //出口进口
                    this.ruleForm.startTime = '' //确认时间（开始）
                    this.ruleForm.endTime = '' //确认时间（结束）
                    this.ruleForm.updateStartTime = '' //操作时间（开始）
                    this.ruleForm.updateEndTime = '' //操作时间（结束
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
                if(this.ruleForm.updateStartTime == '' || this.ruleForm.updateStartTime == null) {
                    this.ruleForm.updateStartTime = ''
                }else{ //开始时间要 拼上 '00:00:00'
                    if(this.ruleForm.updateStartTime.indexOf('00:00:00') !== -1){
                        this.ruleForm.updateStartTime = this.ruleForm.updateStartTime
                    }else{
                        this.ruleForm.updateStartTime = this.ruleForm.updateStartTime + ' ' + '00:00:00'
                    }
                }
                if(this.ruleForm.updateEndTime == '' || this.ruleForm.updateEndTime == null) {
                    this.ruleForm.updateEndTime = ''
                }else{ //结束时间要拼上 '23:59:59'
                    if(this.ruleForm.updateEndTime.indexOf('23:59:59') !== -1){
                        this.ruleForm.updateEndTime = this.ruleForm.updateEndTime
                    }else{
                        this.ruleForm.updateEndTime = this.ruleForm.updateEndTime + ' ' + '23:59:59'
                    }
                }
                this.$axios.get(this.commonJs.localUrl +`/expert/mission/getExpertPath?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&expertStatus=${this.ruleForm.expertStatus
                }&platFormStatus=${this.ruleForm.platFormStatus
                }&opinionStatus=${this.ruleForm.opinionStatus
                }&state=${this.ruleForm.state
                }&polCode=${this.ruleForm.polCode
                }&routeId=${this.ruleForm.routeCn
                }&podCode=${this.ruleForm.podCode
                }&scac=${this.ruleForm.scac
                }&transitCount=${this.ruleForm.transitCount
                }&routeWay=${this.ruleForm.path
                }&etd=${this.ruleForm.etd
                }&area=${this.ruleForm.area
                }&expertConfirmDateStart=${this.ruleForm.startTime
                }&expertConfirmDateEnd=${this.ruleForm.endTime
                }&updateDateStart=${this.ruleForm.updateStartTime
                }&updateDateEnd=${this.ruleForm.updateEndTime
                }`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
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
                                for(let i=0; i<this.tableData.length; i++){
                                    if(this.tableData[i].etd.replace(/\s/g,'') !== ''){
                                        this.tableData[i].etd = this.commonJs.getMounthDay(this.tableData[i].etd.toUpperCase().replace(/\s/g,''))
                                        if(this.tableData[i].etd == 'MON'){
                                            this.tableData[i].etdNum = 1
                                        }else if(this.tableData[i].etd == 'TUE'){
                                            this.tableData[i].etdNum = 2
                                        }else if(this.tableData[i].etd == 'WED'){
                                            this.tableData[i].etdNum = 3
                                        }else if(this.tableData[i].etd == 'THU'){
                                            this.tableData[i].etdNum = 4
                                        }else if(this.tableData[i].etd == 'FRI'){
                                            this.tableData[i].etdNum = 5
                                        }else if(this.tableData[i].etd == 'SAT'){
                                            this.tableData[i].etdNum = 6
                                        }else if(this.tableData[i].etd == 'SUN'){
                                            this.tableData[i].etdNum = 7
                                        }else{
                                            this.tableData[i].etdNum = 0
                                        }
                                    }else{
                                       this.tableData[i].etd = ''
                                       this.tableData[i].etdNum = 0
                                    }
                                    this.tableData[i].expertConfirm = new Date(this.tableData[i].expertConfirmDate)
                                    this.tableData[i].polTerminalPinYin = this.tableData[i].polTerminal?this.commonJs.getPinYin(this.tableData[i].polTerminal):''
                                    this.tableData[i].podTerminalPinYin = this.tableData[i].podTerminal?this.commonJs.getPinYin(this.tableData[i].podTerminal):''
                                    this.tableData[i].standardRouteCnPinYin = this.tableData[i].standardRouteCn?this.commonJs.getPinYin(this.tableData[i].standardRouteCn):''
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
                //如果所有搜索条件为空 查询会慢
                if(this.ruleForm.expertStatus == '' && 
                this.ruleForm.platFormStatus == '' && 
                this.ruleForm.opinionStatus == '' && 
                this.ruleForm.state == '' && 
                this.ruleForm.polCode == '' && 
                this.ruleForm.routeCn == '' && 
                this.ruleForm.podCode == '' && 
                this.ruleForm.scac == '' && 
                this.ruleForm.transitCount == '' && 
                this.ruleForm.path === '' && 
                this.ruleForm.etd === '' && 
                this.ruleForm.area === '' && 
                (this.ruleForm.startTime == '' || this.ruleForm.startTime == null) && 
                (this.ruleForm.endTime == '' || this.ruleForm.endTime == null) && 
                (this.ruleForm.updateStartTime == '' || this.ruleForm.updateStartTime == null) && 
                (this.ruleForm.updateEndTime == '' || this.ruleForm.updateEndTime == null)
                ){
                    this.$message({ type:"error", message: '请至少选择一个搜索条件进行查询'})
                    return
                }
                this.$refs.refPagination.handleCurrentChange(1);
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
            //详情页关闭事件
            handleCloseDetail() {
                this.dialogDetailVisible = false
            },
            //更新列表
            updatInfor() {
                this.searchList()
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
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
            //单独给第一列添加样式
            headerStyle({row, column, rowIndex, columnIndex}) {
                if(columnIndex == 1) {
                    return 'columnPadding'
                }
            },
            classNameRow({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return {background: 'rgba(241, 245, 247, 1) !important'}
                }
            },
        },
        destroyed(){
            this.$bus.off('clickMenu');
        },
        mounted(){
            this.matched = this.$route.matched
            this.searchList('reload')
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.$refs.table.clearSort()
                this.searchList('reload')
            });
        }
    }
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
    .serachBtn{
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .contentLeft{
        float: left;
        width: 90%;
    }
    .contenRight{
        position: absolute;
        right: 20px;
        bottom: 5px;
    }    
    .dialogAddVisible{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
        }
    }
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: 0;
        top: 1px;
    }
    .basicPortContent{
        position: relative;
        overflow: hidden;
        padding: 20px 20px 0px 20px ;
        .serachBack{
            background-color: #fff ;
            padding: 20px 20px 0px 20px ;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage{
            background-color: #fff ;
            padding: 20px 20px 60px 20px;
        }
        .refPagination{
            width: 100%;
            background-color: #fff ;
        }
    }
    
    label:nth-of-type(2){
        width: 10px !important;
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
</style>