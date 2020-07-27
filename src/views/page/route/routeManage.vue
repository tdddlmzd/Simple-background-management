<template>
    <div class="portContent" ref="basicPortContent">
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="110px"
            > 
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%" >
                            <el-form-item label="状态">
                                <el-select v-model="ruleForm.state" placeholder="请选择" style="width:100%" clearable>
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
                        <el-col style="width:22%">
                            <el-form-item label="类型">
                                <el-select v-model="ruleForm.dateType" placeholder="请选择" style="width:100%" clearable>
                                    <el-option
                                        v-for="item in dateTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="NEW">
                                <el-select v-model="ruleForm.newFlag" placeholder="请选择" style="width:100%">
                                    <el-option
                                        v-for="item in newList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="静态完善度">
                                <el-select v-model="ruleForm.yn" placeholder="请选择" style="width:100%" clearable>
                                    <el-option
                                        v-for="item in staticlList"
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
                            <el-form-item label="标准化航线">
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
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="船舶">
                                <el-select v-model="ruleForm.haveVessel" placeholder="请选择" style="width:100%" clearable>
                                    <el-option
                                        v-for="item in haveVesselList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="挂靠港口">
                                <el-input class="inputWidth" v-model="ruleForm.docking" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%"> 
                            <el-form-item label="航线代码">
                                <el-input class="inputWidth" v-model="ruleForm.routeCode" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="航线代码(显示)">
                                <el-input class="inputWidth" v-model="ruleForm.displayName" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="更新时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.updateTimeStart"
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
                                    v-model="ruleForm.updateTimeEnd"
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
                            <el-form-item label="服务">
                                <el-input class="inputWidth" v-model="ruleForm.service" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="航线">
                                <el-input class="inputWidth" v-model="ruleForm.route" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="属性">
                                <el-select v-model="ruleForm.matchType" placeholder="请选择" style="width:100%" clearable>
                                    <el-option
                                        v-for="item in attributeList"
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
        <div class="tablePage">
            <el-button size="small" class="normal normals" @click="effective">有效</el-button>
            <el-button size="small" class="normal abnormal" @click="invalids">无效</el-button>
            <el-button size="small" class="normal normals" @click="routeConsolida">航线合并</el-button>
            <el-button size="small" class="normal normals" @click="routeReplication">航线复制</el-button>
            <el-checkbox v-model="ruleForm.isShow" @change="checkChange" :disabled="checkDisable">显示共舱</el-checkbox>
            <el-button size="small" class="clickColor" @click="handleAddClick">新增</el-button>
            <!-- <el-button size="small" class="clickColor abnormal" @click='delectRoute'>删除</el-button> -->
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                @row-dblclick="tabRowChange"
                ref="table"
                @selection-change="handleSelectionChange"
                @sort-change="sortChange"
                :header-cell-class-name="headerStyle"
            >
                <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column>
                <el-table-column prop="state" label="状态" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <img src="@/assets/images/route/ident.png" class="newIdent" ref="ident" v-if="scope.row.docking.flag === '1'">
                        <img src="@/assets/images/route/copy2.png" class="ident" ref="ident" v-if="scope.row.docking.flag === '4'">
                        <span style='padding-left:10px'>{{ scope.row.state === 0 ? '有效' : scope.row.state === 2 ? '无效' : '有效' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="flag" label="类型" align="left" :show-overflow-tooltip=true min-width="80px" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope" class="identImage">
                        <span>
                            {{scope.row.flag === '0'?'系统':scope.row.flag === '1'?'动态生成':scope.row.flag === '2'?'人工':'手动添加'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="matchType" label="属性" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.matchType == 0 ? '航线' : scope.row.matchType == 1 ? '船舶' : '航线'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="routeParent" label="航线" align="left" :show-overflow-tooltip=true min-width="150" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="pinyinRoute" label="标准化航线" align="left" :show-overflow-tooltip=true min-width="150" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.routeCodesCn}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="routeNameEn" label="服务" align="left" :show-overflow-tooltip=true min-width="150" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.routeNameEn.replace('','')}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="alias" label="航线代码" align="left" :show-overflow-tooltip=true min-width="150" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="displayName" label="航线代码(显示)" align="left" :show-overflow-tooltip=true min-width="150" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.displayName ? scope.row.displayName.toUpperCase() : ''}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="dockSort" label="挂靠顺序" align="left" :show-overflow-tooltip=true min-width="150" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{(scope.row.docking.port.join('-'))}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="sameRouteCount" label="共舱" align="left" :show-overflow-tooltip=true min-width="80px" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <!-- <el-popover trigger="hover" placement="right" @show="getVessel(scope.row.sameRoute)" ref="popover" style="cursor: pointer;">
                            <span class="vesselTable">
                                {{getVesselObje}}
                            </span>
                            <div slot="reference" class="name">
                                <span>{{ scope.row.sameRouteCount }}</span>
                            </div>
                        </el-popover> -->
                        <!-- <el-tooltip placement="top" v-if="scope.row.sameRouteArry">
                            <div slot="content">{{scope.row.sameRouteArry.join(',')}}</div>
                            <span style="cursor: pointer;">{{scope.row.sameRouteCount}}</span>
                        </el-tooltip> -->
                        <el-tooltip placement="top" v-if="scope.row.sameRouteCount > 0" style="cursor: pointer;">
                            <div slot="content">
                                <span>{{scope.row.commonCabin}}</span>
                                <span v-if="(scope.row.commonCabin && scope.row.ovtCabin)">/</span>
                                <span class="temport">{{scope.row.ovtCabin}}</span>
                            </div>
                            <ul class="codeOverRoute">
                                <span>{{ scope.row.sameRouteCount}}</span>
                                <!-- <span>{{scope.row.commonCabin}}</span>
                                <span v-if="(scope.row.commonCabin && scope.row.ovtCabin)">/</span>
                                <span class="temport">{{scope.row.ovtCabin}}</span> -->
                            </ul>
                        </el-tooltip>
                        <span v-else style="cursor: pointer;">{{scope.row.sameRouteCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="yn" label="静态完善度" align="left" :show-overflow-tooltip=true min-width="110px" :sortable="sortableState" :filters="[]">
                    
                </el-table-column>
                <el-table-column prop="vesselCount" label="船舶数" align="left" :show-overflow-tooltip=true min-width="80px" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip=true min-width="140px" :sortable="sortableState" :filters="[]">
                            
                </el-table-column>
                <el-table-column prop="operateUser" label="操作人" align="left" :show-overflow-tooltip=true min-width="80px" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
            <!--分页-->
            <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination" v-if="isShippLine"></ThePagination>  
        </div>
        
        <el-dialog 
            class="dialogAddVisible"
            :visible.sync="dialogAddVisible"
            v-if="dialogAddVisible"
            ref="dialogAddVisible"
            width="80%"
            top="0"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <routeManageAdd
                :dialogStatus="dialogStatus"
                @handleClose="handleClose"
                :rowId="rowId"
                :isText="isText"
                @updatManage="updatManage"
            >
            </routeManageAdd>
        </el-dialog>
        <el-dialog
            class="routeInnerAdd"
            :visible.sync="routeInnerAdd"
            v-if="routeInnerAdd"
            width="650px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <routeConsolidaAdd
                :routeInnerStatus="routeInnerStatus"
                @handleInnerClose="handleInnerClose"
                ref="routeMangerInnerAdd"
                @updatSearchManage="updatSearchManage"
            >
            </routeConsolidaAdd>
        </el-dialog>
    </div>
</template>

<script>
    import qs from "qs";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import routeManageAdd from "./routeManageAdd.vue";
    import routeConsolidaAdd from './routeConsolidaAdd.vue'
    import noData from "@/components/noData/index.vue";
    import { relative } from 'path';
    // socket功能
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
import { uptime } from 'os';
    export default {
        data() {
            return {
                isLoading : false,
                dialogAddVisible : false,
                routeInnerAdd: false,
                sortableState: true,
                dialogStatus : '',
                routeInnerStatus: '',
                checkDisable: true,
                getVesselObje: '',
                ruleForm:{
                    id: '', //航线ID
                    //类型
                    dateType : '',
                    //船公司四字码
                    scac : '',
                    //标准化航线
                    routeId : '',
                    //服务
                    service : '',
                    //属性
                    matchType: '',
                    //航线
                    route : '',
                    //航线代码
                    routeCode : '',
                    // 船舶数
                    haveVessel : '',
                    //挂靠港口
                    docking : '',
                    //船公司
                    companyName: '全部',
                    //航线代码显示
                    displayName: '',
                    // 排序
                    sort: '',
                    // 静态完善度
                    yn: '',
                    // 是否显示共仓 0：不显示；1：显示 
                    isShow: 0,
                    staticId: '', //如果isShow传了1，这个字段必填
                    state: '',
                    newFlag: 0, //NEW
                    updateTimeStart: '', //更新时间开始
                    updateTimeEnd: '', //更新时间结束
                },
                tableData: [],
                oldTableArry: [],
                // 类型 1系统 2人工
                dateTypeList:[
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '系统'
                    },
                    {
                        value: 1,
                        label: '动态生成'
                    },
                    {
                        value: 2,
                        label: '人工'
                    },
                    {
                        value: 3,
                        label: '手动添加'
                    },
                ],
                //状态
                stateList:[
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '有效'
                    },
                    {
                        value: 2,
                        label: '无效'
                    },
                ],
                haveVesselList:[
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '有'
                    },
                    {
                        value: 1,
                        label: '无'
                    },
                ],
                staticlList:[
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 'Y',
                        label: 'Y'
                    },
                    {
                        value: 'N',
                        label: 'N'
                    },
                ],
                newList:[
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: 'NEW'
                    },
                ],
                attributeList:[
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '航线'
                    },
                    {
                        value: 1,
                        label: '船舶'
                    },
                ],
                companyNameList:[],
                routeList:[],
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
                matched:"",
                rowIndex:0,
                rowId : '',
                isText : '',
                handleSelection: [],
                isShippLine : false, //Pagination 分页
            }
        },
        components : {
            ThePagination,
            Breadcrumb,
            routeManageAdd,
            loading,
            routeConsolidaAdd,
            noData
        },
        methods: {
            // 点击搜索搜索
            searchList(reload){
                this.isLoading = true;
                this.$refs.table.clearSort()
                if(reload){
                    this.ruleForm.dateType = '';
                    this.ruleForm.scac = '';
                    this.ruleForm.routeId = '';
                    this.ruleForm.state = '';
                    this.ruleForm.newFlag = 0;
                    this.ruleForm.updateTimeStart = '', //更新时间开始
                    this.ruleForm.updateTimeEnd = '', //更新时间结束
                    this.ruleForm.service = '';
                    this.ruleForm.matchType = '';
                    this.ruleForm.route = '';
                    this.ruleForm.routeCode = '';
                    this.ruleForm.companyName = '全部';
                    this.ruleForm.haveVessel = '';
                    this.ruleForm.displayName = ''
                    this.ruleForm.docking = '';
                    this.ruleForm.sort = ''
                    this.ruleForm.isShow = 0, //是否显示共仓 0：不显示；1：显示 
                    this.ruleForm.id = ''
                    this.ruleForm.yn = ''//静态完善度
                }
                if(this.ruleForm.updateTimeStart == '' || this.ruleForm.updateTimeStart == null) {
                    this.ruleForm.updateTimeStart = ''
                }
                if(this.ruleForm.updateTimeEnd == '' || this.ruleForm.updateTimeEnd == null) {
                    this.ruleForm.updateTimeEnd = ''
                }
                this.$axios.get(this.commonJs.localUrl +`/schedules/route/getRecordList?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&type=${this.ruleForm.dateType
                }&scac=${this.ruleForm.scac
                }&routeId=${this.ruleForm.routeId
                }&state=${this.ruleForm.state
                }&newFlag=${this.ruleForm.newFlag
                }&service=${this.ruleForm.service
                }&matchType=${this.ruleForm.matchType
                }&route=${this.ruleForm.route
                }&displayName=${this.ruleForm.displayName
                }&routeCode=${this.ruleForm.routeCode
                }&haveVessel=${this.ruleForm.haveVessel
                }&docking=${this.ruleForm.docking
                }&yn=${this.ruleForm.yn == '全部' ? '' : this.ruleForm.yn
                }&isShow=${this.ruleForm.isShow
                }&id=${this.ruleForm.isShow == 1 ? this.ruleForm.id : ''
                }&sort=${this.ruleForm.sort
                }&updateTimeStart=${this.ruleForm.updateTimeStart
                }&updateTimeEnd=${this.ruleForm.updateTimeEnd
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
                                    var docking = {
                                        flag: '',
                                        port: ''
                                    }
                                    this.tableData.forEach(item => {
                                        item.pinyinRoute = this.commonJs.getPinYin(item.routeCodesCn)
                                        var portArr = []
                                        for(var i = 0;i < item.docking.length;i++){
                                            portArr.push(item.docking[i].port)
                                        }
                                        item.docking.port = portArr
                                        for(var i = 0;i < item.docking.length;i++){
                                            if(item.docking[i].flag === '1'){
                                                item.docking.flag = '1'
                                            }
                                        }
                                        if(portArr.length > 0){
                                            item.dockSort = portArr.join('-')
                                        }else{
                                            item.dockSort = ''
                                        }
                                        if(item.sameRoute && item.sameRoute.length >=1){
                                            var common = []//存放常规共舱
                                            var ovt = []//存放临时共舱
                                            var totalCode = '' //整个共舱
                                            var sameRouteArry = []
                                            for (let i = 0; i < item.sameRoute.length; i++) {
                                                sameRouteArry.push((item.sameRoute[i]).carrier + '(' + ((item.sameRoute[i]).displayName ? (item.sameRoute[i]).displayName : (item.sameRoute[i]).routeCode) + ')')
                                                var samePath = item.sameRoute[i]
                                                if(samePath.flag == 0){ //常规共舱
                                                    let a = samePath.carrier + '(' + (samePath.displayName ? samePath.displayName : samePath.routeCode) + ')'
                                                    common.push(a)
                                                }
                                                if(samePath.flag == 1){ //临时共舱
                                                    let b = samePath.carrier + '(' + (samePath.displayName ? samePath.displayName : samePath.routeCode) + ')'
                                                    ovt.push(b)
                                                }
                                            }
                                            item.sameRouteArry = sameRouteArry
                                            item.commonCabin = common.join('/')
                                            item.ovtCabin = ovt.join('/')
                                            if(item.commonCabin){ //如果有常规共舱 commonCabin
                                                totalCode = item.commonCabin
                                                if(item.ovtCabin){ //并且有 临时共舱ovtCabin
                                                    totalCode = totalCode + '/' + item.ovtCabin
                                                }
                                            }else{ //没有常规共舱
                                                if(item.ovtCabin){ //有临时共舱
                                                    totalCode = item.ovtCabin
                                                }
                                            }
                                            item.totalCode = totalCode
                                        }
                                    });
                                    // this.$nextTick(() => {
                                    //     this.$refs.basicPortContent.style.position = 'relative'
                                    // })
                                    if(this.$refs.refPagination){
                                        this.$refs.refPagination.page.total = res.data.total;
                                        this.$refs.refPagination.changeValue();
                                    }           
                                }
                                if(this.$refs.refPagination){
                                    if(Math.ceil(this.$refs.refPagination.page.total/ this.page.pageSize) < this.page.pageNo){
                                        this.$refs.refPagination.handleCurrentChange(1);
                                    };
                                }
                            }
                        }
                        this.oldTableArry = JSON.parse(JSON.stringify(this.tableData))
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

            handleClick(row,index){

            },
            handleCurrentChange(row){

            },
            //新增
            handleAddClick(){
                this.dialogAddVisible = true;
                this.dialogStatus = '新增';
                // if(this.sidebarOpen === true){
                //     this.$nextTick(() => {
                //         this.$refs.dialogAddVisible.$vnode.elm.style.marginLeft = "200px";
                //     })
                // }else{
                //     this.$nextTick(() => {
                //         this.$refs.dialogAddVisible.$vnode.elm.style.marginLeft = "64px";
                //     })
                // }
            },
            //子组件传来的关闭事件
            handleClose(){
                this.dialogAddVisible = false;
            },
            //单独给第一列添加样式
            headerStyle({row, column, rowIndex, columnIndex}) {
                if(columnIndex == 1) {
                    return 'columnPadding'
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
            //航线合并
            routeConsolida() {
                this.routeInnerAdd = true
                this.routeInnerStatus = '航线合并'
            },
            handleInnerClose() {
                this.routeInnerAdd = false;
            },
            //搜索
            serchBtn(){
                this.ruleForm.isShow = 0
                this.$refs.refPagination.handleCurrentChange(1);
                // this.searchList();
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
            //点击表格一行
            tabRowChange(row, column, event){
                this.rowIndex = row.index
                this.dialogAddVisible = true;
                this.dialogStatus = '修改';
                this.rowId = row.id
                this.isText = '航线共舱组'
            },
            // 子组件新增 或者 修改数据 成功  父组件重新渲染页面
            updatManage(){
                this.searchList()
            },
            updatSearchManage(){
                this.searchList()
            },
            //全选
            handleSelectionChange(val) {
                this.handleSelection = val
                if(this.handleSelection.length == 1){
                    this.checkDisable = false
                    // this.ruleForm.isShow = 1
                }else{
                    this.checkDisable = true
                    // this.ruleForm.isShow = 0
                }
            },
            //是否搜索共仓
            checkChange(val){
                this.ruleForm.dateType = '';
                this.ruleForm.scac = '';
                this.ruleForm.routeId = '';
                this.ruleForm.service = '';
                this.ruleForm.matchType = '';
                this.ruleForm.route = '';
                this.ruleForm.routeCode = '';
                this.ruleForm.state = '';
                this.ruleForm.newFlag = 0;
                this.ruleForm.companyName = '全部';
                this.ruleForm.haveVessel = '';
                this.ruleForm.displayName = ''
                this.ruleForm.docking = '';
                this.ruleForm.sort = ''
                this.ruleForm.isShow = 1
                this.ruleForm.id = this.handleSelection[0].id
                this.ruleForm.yn = ''//静态完善度
                this.ruleForm.updateTimeStart = '', //更新时间开始
                this.ruleForm.updateTimeEnd = '', //更新时间结束
                this.$refs.refPagination.handleCurrentChange(1);
                this.searchList()
            },
            getVessel(val){
                this.getVesselObje = ''
                var getVesselArry = []
                if(val){
                    if(val.length >= 1){
                        for (let i = 0; i < val.length; i++) {
                            getVesselArry.push(val[i].carrier + '(' +val[i].routeCode + ')')
                        }
                        this.getVesselObje = getVesselArry.join(',')
                    }
                }
            },
            //航线复制
            routeReplication() {
                var val = this.handleSelection;
                if(val.length !== 1){
                    this.$message({
                        type : 'error',
                        message : '请选择一条航线复制',
                    });
                    return
                };
                this.dialogAddVisible = true;
                this.dialogStatus = '复制';
                this.rowId = val[0].id
            },
            //有效
            effective() {
                var val = this.handleSelection
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
                    var that = this
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        staticIds: routeList,
                        state: 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/route/updateRouteState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.$message({ type:"success", message: '状态修改成功'})
                            that.searchList()
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'})
                            that.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //无效
            invalids(){
                var val = this.handleSelection;
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
                    var that = this
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        staticIds: routeList,
                        state: 2,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/route/updateRouteState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.$message({ type:"success", message: '状态修改成功'})
                            that.searchList()
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'})
                            that.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //删除
            delectRoute() {
                var val = this.handleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条航线删除',
                    });
                    return
                };
                // for (let i = 0; i < val.length; i++) {
                //     if(val[i].flag !== '2'){
                //         this.$message({
                //             type : 'error',
                //             message : '只能选择人工类型进行删除',
                //         });
                //         return
                //     }
                // }
                this.$confirm("<div class = 'line'></div></br><span>是否确认删除？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    let uuid = this.commonJs.getUuid();
                    var that = this;
                    var delectRouteList = []
                    for (let i = 0; i < val.length; i++) {
                        delectRouteList.push(val[i].id);
                    }
                    let query = {
                        idList: delectRouteList,
                        socketId:uuid,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/route/delete`, query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            // var rows = res.data.content.rows ? res.data.content.rows : 0
                            // that.$message({
                            //     type: "success",
                            //     message: `成功删除${rows}条数据`
                            // });
                            // that.searchList()
                            if(res.data.content){
                                that.$message({ type:"error", message: `${res.data.content}` + ' ' + '下有共舱或者动态数据删除失败'});
                            }else{
                                that.$message({ type:"success", message: '删除成功'});
                            }
                            that.searchList()                         
                        }else{
                            this.$message({
                                type: "error",
                                message: "删除失败"
                            });
                            that.isLoading = false;
                        }
                    })
                }).catch(_ => {});
            },
            //sortChange 排序
            sortChange(column) {
                if(column.order == null){//无
                    // this.tableData = JSON.parse(JSON.stringify(this.oldTableArry))
                }
                // if(column.order == "ascending"){ // 上
                //     if(column.prop === 'docking'){
                //         this.ruleForm.sort = 'port' + ' ' + 'ASC'
                //     }else{
                //         this.ruleForm.sort = column.prop + ' ' + 'ASC'
                //     }
                // }else if(column.order == "descending"){ //下
                //     if(column.prop === 'docking'){
                //         this.ruleForm.sort = 'port' + ' ' + 'DESC'
                //     }else{
                //         this.ruleForm.sort = column.prop + ' ' + 'DESC'
                //     }
                // }else if(column.order == null){ //无
                //     this.ruleForm.sort = ''
                // }
                // this.searchList()
            },
            ascending(property){ // 上序
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }
            },
            descending(property){ // 下序
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            },
            compare(prop) {
                return function () {
                    let obj1, obj2
                    var val1 = obj1[prop]
                    var val2 = obj2[prop]
                    if (val1 > val2) {
                        return -1
                    } else if (val1 < val2) {
                        return 1
                    } else {
                        return 0
                    }
                }
            }
        },
        computed: {
            sidebarOpen(){
                if (this.$route.path =="/Home") {
                    this.showBackground = true
                }else {
                    this.showBackground = false
                }
                return this.$store.state.app.sidebar.opened;
            },
        },
        destroyed(){
            this.$bus.off('clickMenu');
        },
        mounted(){
            this.matched = this.$route.matched
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                if(this.isShippLine){
                    this.$refs.table.clearSort()
                    this.searchList('reload')
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    // /deep/ .el-table--enable-row-hover  .el-table__body tr:hover>td{
        // background-color:transparent;
        // background-color:#3bb0da50;
        // cursor: pointer;
    // }
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
        // min-width: 250px;
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
    /deep/.el-dialog__body{
        padding: 10px 0px 10px 10px !important;
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
    /deep/th.columnPadding{
        padding-left: 10px !important;
    }


    .serachUL {
        list-style:none;margin:0;
    }
    .serachUL li{
        display: inline-block;
    }
    .serachBtn{
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .exception{
        color: #FF0000;
        border: 1px solid #FF0000;                
        font-size: 12px;
        border-radius: 3px;
        padding: 7px 15px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        border-spacing: 2px;
        height: 28px;
        line-height: 14px;
    }
    .normal{
        color:#3bafda;
        border: 1px solid #3bafda;
        // padding: 9px 15px;
        width: 80px;
        cursor: pointer;
        background: #fff;
        text-align: center;
        margin-right: 20px;
        // font-size: 12px;
        // border-radius: 3px;
        // display: inline-block;
        // white-space: nowrap;
        // -webkit-appearance: none;
        // box-sizing: border-box;
        // outline: 0;
        // margin: 0;
        // transition: .1s;
        // font-weight: 500;
        // border-spacing: 2px;
        // height: 28px;
        // line-height: 14px;
    }
    .contentLeft{
        float: left;
        // position: absolute;
        // left: 20px;
        width: 90%;
    }
    .contenRight{
        // float: right;
        position: absolute;
        right: 20px;
        bottom: 5px;
        // width: 10%;
    }
    .noClick{
        color:#B3C0D1
    }
    .isClick{
        color: #409EFF;
        cursor:pointer
    }
  
    .portContent{
        position: relative;
        overflow: hidden;
        // position: relative;
        .serachBack {
            background-color: #fff;
            margin-bottom: 10px;
            position: relative;
            padding: 0px 20px 0px 20px;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 0px 20px;
            border-top: 10px solid #f5f6f8;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
            // float: right !important;
        }
    }
  
    label:nth-of-type(2){
        width: 10px !important;
    }
    .clickColor{
        background-color: #ff9000;
        color: #fff;
        border: 1px solid #ff9000;
        // padding: 6px 17px;
        padding: 9px 35px;
        float: right;
        margin-bottom: 10px;
    }
    .abnormal{
        border: 1px solid #FF0000;
        color: #FF0000;
        background-color: #fff;
        margin-right:10px;
    }
    .normals{
        color:#3bafda;
    }
    .dialogAddVisible{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
            // overflow-y: auto;
        }
    }
    .identImage{
        position: relative;
    }
    .ident{
        position: absolute;
        width: 20px;
        height: 20px;
        left: 0;
        top: 0;
    }
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: 0;
        top: 1px;
    }
    .vesselTable{
        padding: 3px 5px;
        width: 500px;
        height: auto;
        text-align: center;
        background: black;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display:inline-block;
        overflow: hidden;
    }
    .codeOverRoute{
        height: 23px;
        li{
            display: inline-block;
        }
        span{
            width: auto;
            height: 23px;
            overflow: hidden;
        }
    }
    .temport{
        color: red;
    }
</style>
