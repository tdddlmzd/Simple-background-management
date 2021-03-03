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
                label-width="80px"
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
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="路径">
                                <el-input class="inputWidth" v-model="ruleForm.pathStr" placeholder="请输入" clearable></el-input>
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
                        <el-col style="width:22%" >
                            <el-form-item label="操作时间" class="searchTime">
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
                                <el-select
                                    v-model="ruleForm.type"
                                    style="width:100%;"
                                    placeholder="请选择"
                                    clearable
                                    default-first-option
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
                            <el-form-item label="进/出口">
                                <el-select
                                    v-model="ruleForm.area"
                                    clearable
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
                        <el-col style="width:22%"> 
                            <el-form-item label="航线">
                                <el-select 
                                    remote  
                                    clearable 
                                    filterable  
                                    v-model="ruleForm.routeName"
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
                                        :value="item.routeCn"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="LINE程">
                                <el-select
                                    v-model="ruleForm.lineCount"
                                    clearable
                                    style="width:100%"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in lineList"
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
                    <el-button size="small" class="clickColor normals" @click="commonused">常用</el-button>
                    <el-button size="small" class="clickColor abnormal" @click="workover">加班</el-button>
                    <el-button size="small" class="clickColor abnormal" @click="shielding">屏蔽</el-button>
                    <el-checkbox v-model="ruleForm.isGc" @change="checkChange" :disabled="checkDisable">
                        显示共舱
                    </el-checkbox>
                <el-button size="small" class="clickColor butn" @click="addClick">新增</el-button>
                <el-button size="small" class="clickColor butnDele" @click='delectRoute'>删除</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @selection-change="handleSelectionChange"
                @row-dblclick="tabRowChange"
                :header-cell-class-name="headerStyle"
            >
                <el-table-column type="selection" width="45">

                </el-table-column>
                <el-table-column prop="state" label="状态" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <img src="@/assets/images/route/ident.png" class="newIdent" v-if="scope.row.isNew === 1">
                        <span style='padding-left:10px'>{{scope.row.state === 0 ?'常用':scope.row.state === 1?'加班' : scope.row.state === 2?'屏蔽中' : scope.row.state === 3 ? '待定':'无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope" class="identImage">
                        <span>
                            {{scope.row.type === 0 ? '爬虫' : scope.row.type === 1 ? '人工' : scope.row.type }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="routeName" label="航线" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope" class="identImage">
                        <!-- <img src="@/assets/images/route/ident.png" class="ident" ref="ident"> -->
                        <span>
                            {{scope.row.pol}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

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
                <el-table-column prop="etdWeek" label="ETD" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>
                            {{
                                scope.row.etd ? commonJs.getMounthDay(scope.row.etd.toUpperCase()) : ''
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="transitTime" label="航程" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.transitTime ? scope.row.transitTime === 0 ? '' : scope.row.transitTime : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="lineCount" label="LINE程" align="left" :show-overflow-tooltip="true" min-width="90" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.lineCount}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pathStr" label="路径" align="left" :show-overflow-tooltip="true" min-width="150" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="samePathNames" label="共舱" align="left" :show-overflow-tooltip="true" min-width="180" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <!-- <el-popover trigger="hover" placement="right" @show="getVessel(scope.row.samePath)" ref="popover" style="cursor: pointer;">
                            <table border="0" class="vesselTable">
                                <tr v-for="item in getVesseTitle" :key="item.routeCode">
                                    <th>{{item.routeCode}}</th>
                                    <th>{{item.carrier}}</th>
                                    <th>{{item.vessel}}</th>
                                </tr>
                                <tr v-for="(item,index) in getVesselList" :key="index">
                                    <el-badge class="isslotRed" is-dot></el-badge>
                                    <td><span class="routeCode">{{item.routeCode}}</span></td>
                                    <td>{{item.carrier}}</td>
                                    <td>{{item.vessel}}</td>
                                </tr>
                            </table>
                            <div slot="reference" class="name">
                                <span>{{ scope.row.samePath.length }}</span>
                            </div>
                        </el-popover> -->
                        <!-- <el-tooltip placement="top" v-if="scope.row.samePathLength > 0" style="cursor: pointer;"> -->
                            <!-- <div slot="content"> -->
                                <!-- <span>{{scope.row.commonCabin}}</span>
                                <span v-if="(scope.row.commonCabin && scope.row.ovtCabin)">/</span>
                                <span class="temport">{{scope.row.ovtCabin}}</span> -->
                                <!-- <span>{{ scope.row.samePathNames}}</span> -->
                            <!-- </div> -->
                            <!-- <ul class="codeOverRoute">
                                <span>{{ scope.row.samePathNames}}</span>
                            </ul> -->
                        <!-- </el-tooltip>
                        <span v-else style="cursor: pointer;">{{scope.row.samePathNames}}</span> -->
                        {{scope.row.samePathNames}}
                    </template>                
                </el-table-column>
                <el-table-column prop="onTime" label="准班率" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{ scope.row.onTime ? scope.row.onTime + '%' : '-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="missCount" label="空班船期" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="totalCount" label="总船期" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="username" label="操作人" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="spiderUpdateTime" label="更新时间" align="left" :show-overflow-tooltip="true" min-width="142" :sortable="sortableState" :filters="[]">

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
                v-if="isRouterPage"
            ></ThePagination>
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
            <trendsaileDetail
                :dialogInnerDetail="dialogInnerDetail"
                @handleCloseDetail="handleCloseDetail"
                @updatInfor="updatInfor"
                :rowId = rowId
                :async = async
                :gcId = gcId
                :isAripty="isAripty"
                ref="trendsaileDetail"
            >
            </trendsaileDetail>
        </el-dialog>
        <el-dialog
            class="dialogAddVisible"
            :visible.sync="airpath"
            v-if="airpath"
            ref="airpath"
            width="80%"
            top="0"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <artifiPath
                :pathTitle="pathTitle"
                @closePath="closePath"
                @updatRoute="updatRoute"
                @updatInfor="updatInfor"
                :isAripty="isAripty"
                :rowId = rowId
                :async = async
                :gcId = gcId
                ref="artifiPath"
            >
            </artifiPath>
        </el-dialog>

    </div>
</template>

<script>
    import trendsaileDetail from "./trendsaileDetail.vue";
    import artifiPath from "./artifiPath.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "", //路径
                isRouterPage: false, //Pagination 分页
                isLoading: false, //loading
                dialogDetailVisible: false, //详情页显示隐藏
                dialogInnerDetail: "", //详情页需要传的值
                rowId: '', //往详情页传的id
                async: '',
                gcId: '', //往详情页传的共舱id
                airpath: false,
                pathTitle: '',
                isAripty: true, //是否显示动态船舶
                sortableState: true, //排序
                checkDisable: true, //控制共舱是否可点击
                companyNameList: [], //船公司
                portStartList: [], //起运港
                portEndList: [], //目的港
                tableData: [], //表格数据
                ruleForm: {
                    scac: 'ANNU', //船公司四字码
                    companyName: 'ANL', //船公司
                    pol: '', //起始港
                    pod: '', //目的港
                    polCode: '', //起始港五字码
                    podCode: '', //目的港五字码
                    etd: "", //etd（周英文三字简写）
                    pathStr: '', //路径
                    area: '', //进出口
                    routeName: '', //航线
                    lineCount: '',
                    transitCount: '', //中转次数，0：直达；1： 2程；2：3程 ；3：4程
                    state: '', //路径状态0常用，1加班
                    type: '',// 类型 0 爬虫 1 人工
                    startTime: '',  //更新时间（开始）
                    endTime: '',  //更新时间（结束）
                    isGc: 0, //是否共仓，0否，1是
                    id: '', //显示共仓的话 要传列表id
                    gcId: '', //显示共仓的话 要传列表gcId
                    scacList: '', //共舱传的scac
                    polCodeList: '', //显示共仓的话 要传列表polCode
                    podCodeList: '', //显示共仓的话 要传列表podCode
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
                        label: "屏蔽中"
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
                //Line程
                lineList: [
                    {
                        value: "",
                        label: "全部"
                    },
                    {
                        value: 0,
                        label: "0"
                    },
                    {
                        value: 1,
                        label: "1"
                    },
                    {
                        value: 2,
                        label: "2"
                    },
                    {
                        value: 3,
                        label: "3"
                    },
                    {
                        value: 4,
                        label: "4"
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
                typeList : [
                    {
                        value : "",
                        label : '全部',
                    },
                    {
                        value : 0,
                        label : '爬虫',
                    },
                    {
                        value : 1,
                        label : '人工',
                    },
                ],
                areaList : [
                    {
                        value : '',
                        label : '全部',
                    },
                    {
                        value : 0,
                        label : '出口',
                    },
                    {
                        value : 1,
                        label : '进口',
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
                routeList: [], //航线
                multipleSelection: [], //选择
                getVesselList: [], //共舱列表
                getVesseTitle: [], //共舱标题
            };
        },
        methods: {
            //页面初始化
            searchGetList(reload){
                this.isLoading = true;
                this.$refs.table.clearSort()
                if(reload == 'reload'){
                    this.ruleForm.companyName = 'ANL',
                    this.ruleForm.scac = 'ANNU', //船公司四字码
                    this.ruleForm.pol = '', //起始港
                    this.ruleForm.pod = '', //目的港
                    this.ruleForm.polCode = '', //起始港五字码
                    this.ruleForm.podCode = '', //目的港五字码
                    this.ruleForm.etd = '', //etd（周英文三字简写）
                    this.ruleForm.pathStr = '', //路径
                    this.ruleForm.area = '', //进出口
                    this.ruleForm.routeName = '', //航线
                    this.ruleForm.transitCount = '', //中转次数，0：直达；1： 2程；2：3程 ；3：4程
                    this.ruleForm.state = '', //路径状态0常用，1加班
                    this.ruleForm.type = '',// 类型 0 爬虫 1 人工
                    this.ruleForm.startTime = '',  //更新时间（开始）
                    this.ruleForm.endTime = '',  //更新时间（结束）
                    this.ruleForm.isGc = 0 //是否共仓，0否，1是
                    this.ruleForm.id = ''
                    this.ruleForm.gcId = ''
                    this.ruleForm.scacList = ''
                    this.ruleForm.polCodeList = ''
                    this.ruleForm.podCodeList = ''
                    this.ruleForm.lineCount = ''
                }
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }
                this.$axios.get(this.commonJs.localUrl +`/schedules/path/getPathList?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&scac=${this.ruleForm.scac
                }&polCode=${this.ruleForm.polCode
                }&podCode=${this.ruleForm.podCode
                }&etd=${this.ruleForm.etd == '全部' ? '' : this.ruleForm.etd
                }&pathStr=${this.ruleForm.pathStr
                }&area=${this.ruleForm.area
                }&routeName=${this.ruleForm.routeName
                }&transitCount=${this.ruleForm.transitCount
                }&state=${this.ruleForm.state
                }&type=${this.ruleForm.type
                }&lineCount=${this.ruleForm.lineCount
                }&startTime=${this.ruleForm.startTime
                }&endTime=${this.ruleForm.endTime
                }&isGc=${this.ruleForm.isGc
                }&id=${this.ruleForm.isGc == 1 ? this.ruleForm.id : ''
                }&gcId=${this.ruleForm.isGc == 1 ? this.ruleForm.gcId : ''
                }&scacList=${this.ruleForm.isGc == 1 ? this.ruleForm.scacList : ''
                }&polCodeList=${this.ruleForm.isGc == 1 ? this.ruleForm.polCodeList : ''
                }&podCodeList=${this.ruleForm.isGc == 1 ? this.ruleForm.podCodeList : ''
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
                                        var etdWeek = this.tableData[i].etd ? this.getEtdWeek(this.commonJs.getMounthDay(this.tableData[i].etd.toUpperCase())) : ''
                                        var common = []//存放常规共舱
                                        var ovt = []//存放临时共舱
                                        var totalCode = '' //整个共舱
                                        for (let j = 0; j < this.tableData[i].samePath.length; j++) {
                                            var samePath = this.tableData[i].samePath[j]
                                            if(samePath.flag == 0){ //常规共舱
                                                let a = samePath.carrier + '(' + (samePath.displayName ? samePath.displayName : samePath.routeCode) + ')'
                                                common.push(a)
                                            }
                                            if(samePath.flag == 1){ //临时共舱
                                                let b = samePath.carrier + '(' + (samePath.displayName ? samePath.displayName : samePath.routeCode) + ')'
                                                ovt.push(b)
                                            }
                                        }
                                        this.tableData[i].commonCabin = common.join('/')
                                        this.tableData[i].ovtCabin = ovt.join('/')
                                        if(this.tableData[i].commonCabin){ //如果有常规共舱 commonCabin
                                            totalCode = this.tableData[i].commonCabin
                                            if(this.tableData[i].ovtCabin){ //并且有 临时共舱ovtCabin
                                                totalCode = totalCode + '/' + this.tableData[i].ovtCabin
                                            }
                                        }else{ //没有常规共舱
                                            if(this.tableData[i].ovtCabin){ //有临时共舱
                                                totalCode = this.tableData[i].ovtCabin
                                            }
                                        }
                                        this.tableData[i].totalCode = totalCode
                                        this.tableData[i].etdWeek = etdWeek
                                        // this.tableData[i].samePathLength = this.tableData[i].samePath.length
                                        this.tableData[i].samePathLength = common.length
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
                            // this.$message({ type:"success", message: '状态修改成功'});
                        }else if(reload == 'delect'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '删除成功'});
                        }else if(reload == 'pingbi'){
                            this.isLoadings = false
                            // this.$message({ type:"success", message: '屏蔽成功'});
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
                if(this.ruleForm.scac == '' && this.ruleForm.polCode == '' && this.ruleForm.podCode == '' && (this.ruleForm.etd == '全部' || this.ruleForm.etd == '') && this.ruleForm.pathStr == '' && this.ruleForm.area === '' && this.ruleForm.routeName == '' && this.ruleForm.transitCount == '' && this.ruleForm.state == '' && this.ruleForm.type === '' && (this.ruleForm.startTime == '' || this.ruleForm.startTime == null) && (this.ruleForm.endTime == '' || this.ruleForm.endTime == null)){
                    this.$message({ type:"error", message: '请至少选择一个搜索条件进行查询'})
                    return
                }
                this.ruleForm.isGc = 0
                this.$refs.refPagination.handleCurrentChange(1);
                // this.searchGetList();
            },
            //常用
            commonused() {
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_comused, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i]);
                    }
                    let query = {
                        paths: routeList,
                        state: 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/path/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.content == 0){
                            that.$message({ type:"success", message: '状态修改成功'});
                            that.searchGetList("upda");
                        }else if(res.data.content == 1){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else if(res.data.content == 2){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else if(res.data.content == 3){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //加班
            workover() {
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_workover, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i]);
                    }
                    let query = {
                        paths: routeList,
                        state: 1,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/path/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.content == 0){
                            that.$message({ type:"success", message: '状态修改成功'});
                            that.searchGetList("upda");
                        }else if(res.data.content == 1){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else if(res.data.content == 2){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else if(res.data.content == 3){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //屏蔽
            shielding(){
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行屏蔽',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_shield, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i]);
                    }
                    let query = {
                        paths: routeList,
                        state: 2,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/path/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.content == 0){
                            that.$message({ type:"success", message: '状态修改成功'});
                            that.searchGetList("upda");
                        }else if(res.data.content == 1){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else if(res.data.content == 2){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
                        }else if(res.data.content == 3){
                            that.$message({ type:"error", message: '请先将航线或港口组合设置为有效状态'});
                            that.isLoading = false
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
                if(this.multipleSelection.length == 1){
                    this.checkDisable = false
                }else{
                    this.checkDisable = true
                }
            },
            //新增
            addClick(){
                this.airpath = true
                this.pathTitle = '新增'
            },
            //关闭
            closePath(){
                this.airpath = false
            },
            //刷新 页面初始化
            updatRoute(){
                this.searchGetList()
            },
            //删除
            delectRoute(){
                var val = this.multipleSelection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行删除',
                    });
                    return
                };

                var crawler = [] //爬虫
                var routeList = [] //人工
                for (let i = 0; i < val.length; i++) {
                    if(val[i].type == 0){ //爬虫
                        crawler.push(val[i].id)
                    }else if(val[i].type == 1){ //人工
                        routeList.push(val[i].id);
                    }
                }
                if(crawler.length == val.length){ //爬虫的数据长度 == 选择的数据长度 说明选择的都是爬虫的
                    this.$message({
                        type : 'error',
                        message : '请选择人工路径进行删除',
                    });
                    return
                }
                this.$confirm(this.commonJs.confirm_delete, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var id = routeList.join(',')
                    // let query = {
                    //     ids: routeList,
                    //     delFlag: 1
                    // }
                    this.$axios.get(this.commonJs.localUrl +`/schedules/path/deletePath?ids=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.searchGetList("delect");
                        }else{
                            this.$message({ type:"error", message: '删除失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //给分页传的属性
            handleChange(params) {
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchGetList();
                this.pageNumber = -1;
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.searchGetList(data);
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
            routeChange(){},
            //显示共仓
            getVessel(val) {
                this.getVesselList = []
                this.getVesseTitle = []
                if(val){
                    if(val.length >= 1){
                        this.getVesselList = val
                        this.getVesseTitle = [{
                            routeCode: '航线代码',
                            carrier: '船公司',
                            vessel: '船名',
                        }]
                    }
                }
            },
            //是否搜索共仓
            checkChange(val){
                this.ruleForm.companyName = '全部',
                this.ruleForm.scac = '', //船公司四字码
                this.ruleForm.pol = '', //起始港
                this.ruleForm.pod = '', //目的港
                this.ruleForm.polCode = '', //起始港五字码
                this.ruleForm.podCode = '', //目的港五字码
                this.ruleForm.etd = '', //etd（周英文三字简写）
                this.ruleForm.pathStr = '', //路径
                this.ruleForm.area = '', //进出口
                this.ruleForm.routeName = '', //航线
                this.ruleForm.transitCount = '', //中转次数，0：直达；1： 2程；2：3程 ；3：4程
                this.ruleForm.state = '', //路径状态0常用，1加班
                this.ruleForm.type = '',// 类型 0 爬虫 1 人工
                this.ruleForm.startTime = '',  //更新时间（开始）
                this.ruleForm.endTime = '',  //更新时间（结束）
                this.ruleForm.lineCount = '',
                this.ruleForm.isGc = 1 //是否共仓，0否，1是
                this.ruleForm.id = this.multipleSelection[0].id
                this.ruleForm.gcId = this.multipleSelection[0].gcId
                this.ruleForm.scacList = this.multipleSelection[0].scacList
                this.ruleForm.polCodeList = this.multipleSelection[0].polCodeList ? this.multipleSelection[0].polCodeList : ''
                this.ruleForm.podCodeList = this.multipleSelection[0].podCodeList ? this.multipleSelection[0].podCodeList : ''
                this.$refs.refPagination.handleCurrentChange(1);
                this.searchGetList()
            },
            //双击列表行
            tabRowChange(row) {
                if(row.type == 0){ //爬虫
                    this.dialogDetailVisible = true
                    this.dialogInnerDetail = '详情'
                    this.rowId = row.id
                    this.gcId = row.gcId
                }else if(row.type == 1){ //人工
                    this.airpath = true
                    this.pathTitle = '修改'
                    this.rowId = row.id
                }
            },
            //详情页关闭事件
            handleCloseDetail() {
                this.dialogDetailVisible = false
            },
            //更新列表
            updatInfor() {
                console.log('我当前子传父')
                this.searchGetList()
            },
            //换取etd的周数
            getEtdWeek(data){
                let weekList = {
                    '-': -2,
                    '': -1,
                    'MON' : 1,
                    'TUE' : 2,
                    'WED' : 3,
                    'THU' : 4,
                    'FRI' : 5,
                    'SAT' : 6,
                    'SUN' : 7,
                }
                if(weekList[data]){
                    return weekList[data]
                }else{
                    console.log(data)
                    return data
                };
            },
        },
        components: {
            ThePagination,
            loading,
            trendsaileDetail,
            artifiPath,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                if(this.isRouterPage){
                    // this.companyNameRemote(this.ruleForm.companyName)
                    this.$refs.table.clearSort()
                    this.searchGetList('reload');
                    this.$refs.refPagination.changeValue()
                }
            });
            this.$bus.on('switchTab',(content) => {
                this.isRouterPage = true
                this.isLoading = true
                setTimeout(() => {
                    if(content.scac){
                        this.ruleForm.scac = content.scac
                        if(content.scac.indexOf('-') !== -1)
                        this.ruleForm.scac = content.scac.substring(0, content.scac.lastIndexOf('-')); //船公司四字码
                    };
                    this.ruleForm.companyName = content.companyName, //船公司
                    //掉船公司接口  
                    // this.companyNameRemote(content.companyName)
                    this.ruleForm.pol = content.pol,
                    this.ruleForm.pod = content.pod,
                    this.ruleForm.polCode = content.polCode, //起始港五字码
                    this.ruleForm.podCode = content.podCode //目的港五字码

                    this.ruleForm.etd = '', //etd（周英文三字简写）
                    this.ruleForm.pathStr = '', //路径
                    this.ruleForm.area = '', //进出口
                    this.ruleForm.routeName = '', //航线
                    this.ruleForm.transitCount = '', //中转次数，0：直达；1： 2程；2：3程 ；3：4程
                    this.ruleForm.state = '', //路径状态0常用，1加班
                    this.ruleForm.type = '',// 类型 0 爬虫 1 人工
                    this.ruleForm.startTime = '',  //更新时间（开始）
                    this.ruleForm.endTime = '',  //更新时间（结束）
                    this.ruleForm.isGc = 0 //是否共仓，0否，1是
                    this.ruleForm.id = ''
                    this.ruleForm.lineCount = ''
                    this.ruleForm.gcId = ''
                    this.ruleForm.scacList = ''
                    this.ruleForm.polCodeList = ''
                    this.ruleForm.podCodeList = ''
                    this.searchGetList();
                },500)
            })
        },
        destroyed(){
            this.$bus.off('clickMenu');
            this.$bus.off('switchTab');
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
    /deep/th.columnPadding{
        padding-left: 10px !important;
    }
    .dialogAddVisible{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
            // overflow-y: auto;
        }
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
            padding: 0px 20px 0px 20px;
            margin-bottom: 10px;
            position: relative;
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
        .butnDele{
            margin-right: 10px;
            border: 1px solid #ff0000;
            color: #ff0000;
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
    .vesselTable{
        background: #fff;
        width: 600px;
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        tr th{
            padding: 5px 10px;
            background: black !important;
            color: #fff !important;
        }
        tr td{
            padding: 5px 10px;
            background: black !important;
            color: #fff !important;
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
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
    .routeCode{
        // margin-left: 10px;
    }
    .isslotRed{
    }
    .tabUl{
        background: #fff;
        display: flex;
        padding-left: 20px;
        padding-right: 20px;
    }
    .tabLI{
        padding: 7px 35px;
        border: 1px solid #ccc;
        font-size: 12px;
        cursor: pointer;
        transition: all .2s;
    }
    .tabLI:first-child {
        border-radius: 5px 0 0 5px;
    }
    .tabLI:last-child {
        border-radius: 0 5px 5px 0;
    }
    li:not(:first-child) {
        border-left: 0;
    }
    .tabColor{
        color: #fff;
        background: #3bafda;
    }
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: 0;
        top: 1px;
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