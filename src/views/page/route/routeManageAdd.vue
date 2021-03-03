<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
            label-width="130px"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">{{addOrEdit}}</label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <div :style="{maxHeight: heightInner}" class="scrollP">
                <ul class="routeUl">
                    <li class="routeLi" v-if="this.dialogStatus !== '航线复制' && this.dialogStatus !== '航线复制并关联船舶'">
                        <div class="title">
                            <span>基础信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item
                                    prop="companyName"
                                    label="船公司"
                                    class="el_formContent"
                                    :rules="[{ required: true, message: '请输入船公司名', trigger: 'blur'}]"
                                >
                                    <el-select
                                        v-model="ruleForm.companyName"
                                        style="width:100%;"
                                        placeholder="请输入并选择"
                                        filterable
                                        clearable
                                        v-if="!companyDisabled"
                                        remote
                                        :remote-method="remoteCompanyNameMethod"
                                        @change="handleCompanyNameChange"
                                        @focus="handleCompanyNameFounc"
                                    >
                                        <el-option
                                            v-for="item in companyNameList"
                                            :key="item.scac"
                                            :label="item.companyName"
                                            :value="item.scac"
                                        >
                                        </el-option>
                                    </el-select>
                                    <el-input v-model="ruleForm.companyName" readOnly v-else></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="航线" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.route" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item 
                                    label="属性" 
                                    prop="matchType" 
                                    :rules="[{ required: true, message: '请输入属性', trigger: 'blur'}]"
                                    v-if="this.dialogStatus == '新增'"
                                >
                                    <el-select 
                                        v-model="ruleForm.matchType" 
                                        placeholder="请选择" 
                                        style="width:100%"
                                        @change="switchProper"
                                    >
                                        <el-option
                                            v-for="item in attributeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item 
                                    label="属性" 
                                    prop="matchType" 
                                    :rules="[{ required: true, message: '请输入属性', trigger: 'blur'}]"
                                    v-else
                                >
                                    <el-input v-model="matchType" readOnly></el-input>   
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item
                                    prop="displayName"
                                    label="航线代码(显示)"
                                    class="el_formContent"
                                    :rules="[{ required: true, message: '请输入航线代码', trigger: 'blur'}]"
                                >
                                    <el-input
                                        class="inputWidth"
                                        v-model="ruleForm.displayName"
                                        placeholder="请输入"
                                        clearable
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item
                                    prop="routeCode"
                                    label="航线代码"
                                    class="el_formContent"
                                    :rules="[{ required: true, message: '请输入航线代码', trigger: 'blur'}]"
                                >
                                    <el-input
                                        class="inputWidth"
                                        v-model="ruleForm.routeCode"
                                        placeholder="请输入"
                                        clearable
                                        :readonly="isMerge"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="服务" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.service" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:auto;minWidth:44%;maxWidth:66%">
                                <el-form-item label="共舱航线" class="el_formContent">
                                    <div class="commonul">
                                        <div class="commonulDiv">
                                            <ul class="commonCabinRoute" ref="commonCabin">
                                                <li
                                                    v-for="(item,index) in commonCabinRouteList"
                                                    :key="index"
                                                    :title="item"
                                                    ref="commonCabinLi"
                                                    v-if="item"
                                                >
                                                    <span class="spanLI">{{item}}</span>
                                                </li>
                                            </ul>
                                            <span class="elJian" @click="selecticon" v-show="arrowtip" icon="el-icon-arrow-down">
                                                <i class="el-icon-arrow-down"></i>
                                            </span>
                                        </div>
                                            <ul class="selecticonList" v-if="upselectDate">
                                                <li
                                                    v-for="(item,index) in commonCabinRouteList"
                                                    :key="index"
                                                    :title="item"
                                                    v-if="index>(number-1)"
                                                >
                                                    <span class="spanLI">{{item}}</span>
                                                </li>
                                        </ul>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="类别">
                                    <el-select v-model="ruleForm.routeType" placeholder="请选择" style="width:100%">
                                        <el-option
                                            v-for="item in category"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>   
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi" v-if="this.dialogStatus === '航线复制' || this.dialogStatus == '航线复制并关联船舶'">
                        <div class="title">
                            <span>基础信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:30%">
                                <el-form-item
                                    prop="companyName"
                                    label="船公司"
                                    class="el_formContent"
                                    :rules="[{ required: true, message: '请输入船公司名', trigger: 'blur'}]"
                                >
                                    <el-select
                                        v-model="ruleForm.companyName"
                                        style="width:100%;"
                                        placeholder="请输入并选择"
                                        filterable
                                        clearable
                                        remote
                                        :remote-method="remoteCompanyNameMethod"
                                        @change="handleCompanyNameChange"
                                        @focus="handleCompanyNameFounc"
                                    >
                                        <el-option
                                            v-for="item in companyNameList"
                                            :key="item.scac"
                                            :label="item.companyName"
                                            :value="item.scac"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item
                                    prop="routeCode"
                                    label="航线代码(服务)" 
                                    :rules="[{ required: true, message: '请输入航线代码(服务)', trigger: 'blur'}]"
                                >
                                    <el-select 
                                        remote
                                        clearable 
                                        filterable  
                                        v-model="ruleForm.routeCode" 
                                        placeholder="请输入并选择"
                                        :remote-method="lineCodeRemote"
                                        @focus="lineCodeFocus"
                                        @change="lineCodeChange"
                                        style="width:100%"
                                    >
                                        <el-option
                                            v-for="item in lineCodeList"
                                            :key="item.id"
                                            :label="item.routeCode"
                                            :value="item.routeCode"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title lf">
                            <span>挂靠港口</span>
                        </div>
                        <el-button size="small" class="clickColor" @click="handleAddClick" v-if="dialogStatus !== '航线复制' && dialogStatus !== '航线复制并关联船舶'">新增</el-button>
                        <el-button size="small" class="clickColor abnormal" @click="delectClick" v-if="dialogStatus !== '航线复制' && dialogStatus !== '航线复制并关联船舶'">删除</el-button>
                        <el-button size="small" class="clickColor tempocal" @click="tempocalClick" v-if="dialogStatus !== '航线复制' && dialogStatus !== '航线复制并关联船舶'">临时挂靠</el-button>
                        <el-table
                            :data="dockingArray"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            @row-dblclick="tabRowChange"
                            @selection-change="handleSelectionChange"
                            :header-cell-class-name="addclass"
                            ref="multipleTable"
                        >
                            <el-table-column
                                type="selection"
                                width="45"
                                v-if="dialogStatus !== '航线复制' && dialogStatus !== '航线复制并关联船舶'"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="portNumber"
                                label="挂靠顺序"
                                align="left"
                                min-width="80px"
                                :show-overflow-tooltip="false"
                            >
                                <template slot-scope="scope">
                                    <div class="inputDiv">
                                        <input 
                                            v-model="scope.row.portNumber"
                                            @focus="frontValue(scope.row.portNumber)"
                                            @keyup.enter="inputBlur(scope.row.portNumber,scope.$index)" 
                                            @blur="inputBlur(scope.row.portNumber,scope.$index)" 
                                            @input="scope.row.portNumber = commonJs.handleInputNo(scope.row.portNumber)" 
                                            :class="(scope.$index+1) % 2 !== 0?'inputport':'inputportColor'"
                                            :readonly="dialogStatus == '航线复制' || dialogStatus == '航线复制并关联船舶'"
                                            />
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column
                                prop="port"
                                label="港口英文名"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="110"
                            >
                                <template slot-scope="scope" class="identImage">
                                    <img src="@/assets/images/route/ident.png" class="newIdent" ref="ident" v-if="scope.row.isSnap === 0 && scope.row.flag === '1'">
                                    <img src="@/assets/images/route/copy2.png" class="ident" ref="ident" v-if="scope.row.isSnap === 0 && scope.row.flag === '4'">
                                    <img src="@/assets/images/route/calllse.png" class="calllse" ref="identp" v-show="scope.row.isSnap === 1">
                                    <span style='padding-left:10px' :class="scope.row.isRedT == 1 ? 'isRedT' : ''">
                                        {{scope.row.port}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="portCode"
                                label="港口五字码"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="90"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="terminal"
                                label="码头"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="100"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="baseTerminal"
                                label="标准码头"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="150"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="eta"
                                label="ETA"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="60px"
                            >
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                            scope.row.eta ? commonJs.getMounthDay(scope.row.eta.toUpperCase()) : ''
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="etd"
                                label="ETD"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="60px"
                            >
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                            scope.row.etd ? commonJs.getMounthDay(scope.row.etd.toUpperCase()) : ''
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="transitTime"
                                label="航程"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="50px"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="direction"
                                label="方向"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="60px"
                            >
                                <template slot-scope="scope">
                                    <span>
                                        {{scope.row.direction.toUpperCase()}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="isPol"
                                label="POL"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="50px"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.isPol === ''?'':(scope.row.isPol === 1 || scope.row.isPol === 3)?'√':''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="isPol"
                                label="POD"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="60px"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.isPol === ''?'':(scope.row.isPol === 2 || scope.row.isPol === 3) ?'√':''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="创建时间"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="142px"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="updateTime"
                                label="操作时间"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="142px"
                            >
                            </el-table-column>
                        </el-table>
                    </li>
                    <li class="routeLi" v-if="this.dialogStatus !== '航线复制' && this.isDongT !== 'true'">
                        <div class="title">
                            <span>船舶信息</span>
                        </div>
                        <el-button size="small" class="clickColor" @click="addShip" v-if="ruleForm.matchType == 1">新增</el-button>
                        <el-button size="small" class="clickColor abnormal" @click="delectShip" v-if="dialogStatus !== '航线复制' && this.dialogStatus !== '航线复制并关联船舶'">删除</el-button>
                        <el-table
                            :data="shipList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            @row-dblclick="getShipVesse"
                            tooltip-effect="dark"
                            @selection-change="selectionChangeShip"
                            ref="table"
                        >
                            <el-table-column
                                type="selection"
                                width="45"
                                v-if="dialogStatus !== '航线复制' && dialogStatus !== '航线复制并关联船舶'"
                            >
                            </el-table-column>
                            <el-table-column prop="week" label="周次" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span v-if="ruleForm.matchType == 1">{{scope.row.year ? scope.row.year + '-' : ''}}{{scope.row.week}}</span>
                                    <span v-else>{{currentYear + '-' + scope.row.week}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="vessel" label="船名" align="left" :show-overflow-tooltip="true" min-width="100">

                            </el-table-column>
                            <el-table-column prop="voyage" label="航次" align="left" :show-overflow-tooltip="true" min-width="100">
                                
                            </el-table-column>
                            <el-table-column prop="standerVesselName" label="标准船名" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span :class="dialogStatus !== '航线复制' && dialogStatus !== '航线复制并关联船舶' ? 'standerVessel' : ''" @click="changeShip(scope.row)">{{scope.row.standerVesselName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="imo" label="IMO" align="left" :show-overflow-tooltip="true" min-width="100">
                                
                            </el-table-column>
                            <el-table-column prop="mmsi" label="MMSI" align="left" :show-overflow-tooltip="true" min-width="100">
                                
                            </el-table-column>
                            <el-table-column prop="carrier" label="母船" align="left" :show-overflow-tooltip="true" min-width="100">

                            </el-table-column>
                            <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" min-width="142">

                            </el-table-column>
                            <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true"  min-width="142">
                                                
                            </el-table-column>
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="handleSaveClick('ruleForm')">保存</el-button>
                </div>
            </div>
        </el-form>
        <el-dialog
            class="dialogAddInnerVisible"
            :visible.sync="dialogAddInnerVisible"
            v-if="dialogAddInnerVisible"
            width="660px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <routeManageInnerAdd
                :dialogInnerStatus="dialogInnerStatus"
                :tablePortruleForm="tablePortruleForm"
                :scac="this.ruleForm.scac"
                @handleInnerClose="handleInnerClose"
                @childByValue="handleInnerValue"
                ref="routeManageInner"
            >
            </routeManageInnerAdd>
        </el-dialog>
        <el-dialog
            class="dialogshipInforAdd"
            :visible.sync="dialogshipInforAdd"
            v-if="dialogshipInforAdd"
            width="950px"
            top="230px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <shipInforAdd
                :shipInforStatus="shipInforStatus"
                :shipRow="shipRow"
                :shipScac="shipScac"
                :isMatchType="isMatchType"
                @closeShipClick="closeShipClick"
                @shipByValue="shipByValue"
                ref="shipInforAdd"
            >
            </shipInforAdd>
        </el-dialog>
        <el-dialog
            class="dialogshipInforAdd"
            :visible.sync="InforShipAdd"
            v-if="InforShipAdd"
            width="1100px"
            top="50px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <informateShip
                ref="informateShip"
                :vesselInforName="vesselInforName"
                :shipId="shipId"
                @closeShipInfor="closeShipInfor"
                @UpdatShip="UpdatShip"
            >
            </informateShip>
        </el-dialog>
    </div>
</template>

<script>
    import qs from "qs";
    import routeManageInnerAdd from "./routeManageInnerAdd.vue";
    import shipInforAdd from "./shipInforAdd.vue";
    import informateShip from "./informateShip.vue";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props: [
            "dialogStatus", 
            "rowId",
            "isText",
            "isDongT",
            "withArry",
            "code"
        ],
        data() {
            return {
                isLoading: true,
                dialogInnerStatus: "",
                dialogAddInnerVisible: false,
                addOrEdit: "",
                dialogshipInforAdd:false,
                shipInforStatus: '',
                shipRow: '',
                shipScac: '',
                isMatchType: '',
                shipIndex: 0,
                InforShipAdd:false,
                shipId: '',
                vesselInforName: '',
                upselectDate: false,
                arrowtip: false,
                companyDisabled: false,
                voyageOrVessel: "",
                number: 0,
                inputPort: false,
                isMerge: false,
                ruleForm: {
                    companyName: "",
                    scac: "",
                    route: "",
                    service: "",
                    routeCode: "",
                    displayName: "",
                    matchType: 0,
                    routeType: '',
                    // commonCabinRoute : '',
                },
                typeRoute: '',
                attributeList:[
                    {
                        value: 0,
                        label: '航线'
                    },
                    {
                        value: 1,
                        label: '船舶'
                    },
                ],
                category: [
                    {
                        value: 0,
                        label: 'LINE'
                    },
                    {
                        value: 1,
                        label: '内支线'
                    },
                ],
                staticId: '',
                commonCabinRouteList: [],
                companyNameList: [],
                dockingArray: [], //挂靠港口
                copyDock: [], //复制的挂靠港口
                multipleSelection:[],
                tableTransitRouteData: [],
                tableDynamicShipData: [],
                tableRouteWarningData: [],
                tablePortruleForm: {},
                rowIndex: 0,
                delectDocking: [],
                inputValue: '',
                heightInner: '',
                heightScreen: '',
                lineCodeList: [],
                routeLisd: [],//要带回路径管理详情里的数据
                shipList: [], //船舶信息数据
                currentYear: '', //今年
                shipSelectList: [], //船舶信息选择的数组
                delectShipList: [], //删除的船舶信息数组
                matchType: '', //修改时改显示的属性
            };
        },
        components: {
            informateShip,
            shipInforAdd,
            routeManageInnerAdd,
            loading
        },
        methods: {
            searchList() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryDetails?id=${this.rowId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.ruleForm.companyName = res.data.content.routeInfo.carrier
                            this.ruleForm.scac = res.data.content.routeInfo.scac
                            this.ruleForm.route = res.data.content.routeInfo.routeParent
                            this.ruleForm.service = res.data.content.routeInfo.routeNameEn
                            this.ruleForm.routeCode = res.data.content.routeInfo.routeCode
                            this.ruleForm.displayName = res.data.content.routeInfo.displayName
                            this.ruleForm.matchType = res.data.content.routeInfo.matchType ? res.data.content.routeInfo.matchType : 0
                            this.ruleForm.routeType = res.data.content.routeInfo.routeType ? res.data.content.routeInfo.routeType : 0

                            //标注typeRoute 
                            this.typeRoute = JSON.parse(JSON.stringify(this.ruleForm.routeType))
                            this.matchType = res.data.content.routeInfo.matchType == 0 ? '航线' : res.data.content.routeInfo.matchType == 1 ? '船舶' : '航线'
                            if(res.data.content.routeInfo.isMerge == 1 || res.data.content.schedulesCount > 1){
                                this.isMerge = true
                            }
                            if(this.isText == '航线共舱组'){
                                this.getShippInfor(this.ruleForm.matchType)
                            }
                            // this.isLoading = false
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            // this.isLoading = false;
                        }else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            // this.isLoading = false;
                        }
                });
            },
            //保存
            async handleSaveClick(ruleForm) {
                this.routeLisd = []
                for (let i = 0; i < this.dockingArray.length; i++) {
                    if(this.dockingArray[i].isRedT == 1 || this.dockingArray[i].isRedT == 2) { //isRedT 等于 1 是从路径详情带来的
                        if(this.dockingArray[i].portCode) {
                            this.routeLisd.push({
                                portCode: this.dockingArray[i].portCode,
                                isRoute: this.dockingArray[i].isRoute,
                                index: this.dockingArray[i].indexPo
                            })
                        }else{
                            this.$message({
                                type: "error",
                                message: "有挂靠港口未选港口五子码"
                            });
                            return
                        }
                    }
                }

                //港口判断 是否有挂靠顺序相同 并且 港口五子码相同
                for (var p = 0; p < this.dockingArray.length - 1; p++) {
                    for (var j = p + 1; j < this.dockingArray.length; j++) {
                        //挂靠顺序相同 并且 港口五子码相同
                        if (this.dockingArray[p].portNumber == this.dockingArray[j].portNumber && this.dockingArray[p].portCode == this.dockingArray[j].portCode) {
                            this.$message({
                                type: "error",
                                message: "存在港口五字码相同并且挂靠顺序都为空的挂靠港口"
                            });
                            return
                        }
                    }
                }                        
                try {
                    let valid = await this.$refs[ruleForm].validate();
                    if (!valid) return;
                    this.$confirm(this.commonJs.confirm_save,"",
                    {
                        cancelButtonClass: "btnCustomCencel",
                        confirmButtonClass: "btnCustomSubmit",
                        customClass: "customClass",
                        dangerouslyUseHTMLString: true
                    }).then(_ => {
                        this.isLoading = true
                        let dockingArray = this.dockingArray.concat(this.delectDocking)
                        let routecodeVesselVoy = this.shipList.concat(this.delectShipList)
                        for (var index = 0; index < dockingArray.length; index++) {
                            var element = dockingArray[index]
                            if(!element.id){
                                element['updateFlag'] = 0 //新增的数据 不用管  etd 的修改
                            }
                            for (var copy = 0; copy < this.copyDock.length; copy++) {
                                var dock = this.copyDock[copy]
                                if(element.id){
                                    if(element.id == dock.id){
                                        if(element.etd == dock.etd){
                                            element['updateFlag'] = 0 
                                        }else{
                                            element['updateFlag'] = 1 //etd 进行了修改
                                        }
                                    }
                                }
                            }
                        }
                        let query = {
                            routeCode: this.ruleForm.routeCode,
                            routeNameEn: this.ruleForm.service,
                            routeParent: this.ruleForm.route,
                            scac: this.ruleForm.scac,
                            displayName: this.ruleForm.displayName,
                            matchType: this.ruleForm.matchType,
                            routeType: this.typeRoute === this.ruleForm.routeType ? '' : this.ruleForm.routeType,
                            dockingArray: dockingArray,
                            routecodeVesselVoy: routecodeVesselVoy,
                        };
                        if (this.dialogStatus === "新增") {
                            // 新增航线
                            this.$axios.post(this.commonJs.localUrl + `/schedules/route/add`, query, {
                                headers: {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token")
                                }
                                }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("updatManage");
                                    this.$message({
                                        type: "success",
                                        message: "保存成功"
                                    });
                                    this.handleCloseClick();
                                } else if (res.data.status == 3) {
                                    this.$message({
                                        type: "error",
                                        message: "航线代码已存在"
                                    });
                                    this.isLoading = false
                                    return;
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            });
                        } else if(this.dialogStatus === "修改") {
                        // 修改航线
                            if(this.code && this.code.length > 0){
                                query["polCode"] = this.code[0].polCode
                                query["podCode"] = this.code[0].podCode
                            }
                            query["id"] = this.rowId;
                            this.$axios.post(this.commonJs.localUrl + `/schedules/route/update`, query, {
                                headers: {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token")
                                }
                                }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("updatManage",this.routeLisd);
                                    this.$message({
                                        type: "success",
                                        message: res.data.message
                                    });
                                    if(this.isText == '人工路径详情'){
                                        this.$emit("artifi",this.ruleForm.displayName,this.ruleForm.routeCode);
                                    }
                                    this.handleCloseClick();
                                } else if (res.data.status == 3) {
                                    this.$message({
                                        type: "error",
                                        message: "航线代码已存在"
                                    });
                                    this.isLoading = false
                                    return;
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            });
                        }else if(this.dialogStatus === "航线复制"){
                            let copydockingArray = JSON.parse(JSON.stringify(dockingArray))
                            for (let i = 0; i < copydockingArray.length; i++) {
                                copydockingArray[i].flag = '4';
                            }
                            let newCopy = {
                                dockingArray: copydockingArray,
                                targetId: this.staticId
                            }
                            this.$axios.post(this.commonJs.localUrl + `/schedules/route/copyPort`, newCopy,{
                                headers: {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token")
                                }
                            }).then(res =>{
                                if (res.data.status == 1) {
                                    this.$emit("updatManage");
                                    this.$message({
                                        type: "success",
                                        message: "保存成功"
                                    });
                                    this.handleCloseClick();
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            })
                        }else if(this.dialogStatus === "航线复制并关联船舶"){
                            this.$axios.get(this.commonJs.localUrl +`/schedules/route/copyRoute?oldId=${this.staticId}&newId=${this.rowId}`,{
                                headers: {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                                }
                            }).then(res =>{
                                if (res.data.status == 1) {
                                    this.$emit("updatManage")
                                    this.$message({
                                        type: "success",
                                        message: "保存成功"
                                    });
                                    this.handleCloseClick()
                                }else if (res.data.status == 6) {
                                    this.$message({
                                        type: "error",
                                        message: "来源/目的航线不能为空"
                                    });
                                    this.isLoading = false
                                }else if (res.data.status == 7) {
                                    this.$message({
                                        type: "error",
                                        message: "来源航线必须是航线属性"
                                    });
                                    this.isLoading = false
                                }else if (res.data.status == 8) {
                                    this.$message({
                                        type: "error",
                                        message: "目的航线必须是船舶属性"
                                    });
                                    this.isLoading = false
                                }else if (res.data.status == 9) {
                                    this.$message({
                                        type: "error",
                                        message: "两个航线必须是共舱"
                                    })
                                    this.isLoading = false
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    })
                                    this.isLoading = false
                                }
                            })                 
                        }
                    })
                    .catch(_ => {});
                } catch (e) {}
            },
            //新增
            handleAddClick() {
                this.dialogAddInnerVisible = true;
                this.dialogInnerStatus = "新增";
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //删除
            delectClick() {
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行删除',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_delete, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoadings = true;
                    this.dockingArray = this.dockingArray.filter(items => {
                        if (!val.includes(items)) return items;
                    })
                    if(this.dialogStatus === "航线复制"){
                        // val.forEach((item,index)=>{
                        //     this.delectDocking.push(item)
                        // })
                    }else{
                        val.forEach((item,index)=>{
                            if(item.id){
                                item.delFlag = "1"
                                this.delectDocking.push(item)
                            }
                        })
                    }
                }).catch(_ => {});
            },
            //单独给第二列添加样式
            addclass({row, column, rowIndex, columnIndex}) {
                if(columnIndex == 2) {
                    return 'columnPadding'
                }
            },
            //临时挂靠
            tempocalClick() {
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请至少选择一个挂靠港口',
                    });
                    return
                };
                var temporary = [] // isSnap == 1
                var notempor = [] // isSnap == 0
                for (let j = 0; j < this.dockingArray.length; j++) {
                    for (let i = 0; i < val.length; i++) {
                        if(val[i] === this.dockingArray[j]) {
                            if(this.dockingArray[j].isSnap == 0) {
                                notempor.push(this.dockingArray[j])
                            }else{
                                temporary.push(this.dockingArray[j])
                            }
                        }
                    }
                }
                if(temporary.length == val.length) { //说明都是isSnap == 1 现在要取消
                    this.$confirm("<div class='tesDiv'><div>是否取消临时挂靠？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                        confirmButtonClass:"btnCustomSubmit",
                        customClass:"customClass",
                        dangerouslyUseHTMLString:true,
                    }).then(() => {
                        for (let j = 0; j < this.dockingArray.length; j++) {
                            for (let i = 0; i < temporary.length; i++) {
                                if(temporary[i] === this.dockingArray[j]){ // 说明是已经有的
                                    this.dockingArray[j].isSnap = 0
                                }                
                            }
                        }
                        this.$refs.multipleTable.clearSelection();
                }).catch(_ => {});
                }else if(notempor.length == val.length){ // 说明都是isSnap == 0 现在也是要保存
                    this.$confirm("<div class='tesDiv'><div>是否设置临时挂靠？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                        confirmButtonClass:"btnCustomSubmit",
                        customClass:"customClass",
                        dangerouslyUseHTMLString:true,
                    }).then(() => {
                        for (let j = 0; j < this.dockingArray.length; j++) {
                            for (let i = 0; i < notempor.length; i++) {
                                if(notempor[i] === this.dockingArray[j]){ // 说明是已经有的
                                    this.dockingArray[j].isSnap = 1
                                }                
                            }
                        }
                        this.$refs.multipleTable.clearSelection();
                }).catch(_ => {});
                }else{ // 说明有的为isSnap == 0 有的为isSnap == 1  现在要取消
                    this.$confirm("<div class='tesDiv'><div>是否取消临时挂靠？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                        confirmButtonClass:"btnCustomSubmit",
                        customClass:"customClass",
                        dangerouslyUseHTMLString:true,
                    }).then(() => {
                        for (let j = 0; j < this.dockingArray.length; j++) {
                            for (let i = 0; i < notempor.length; i++) {
                                if(notempor[i] === this.dockingArray[j]){ // 说明是已经有的
                                    this.dockingArray[j].isSnap = 1
                                }                
                            }
                            for (let i = 0; i < temporary.length; i++) {
                                if(temporary[i] === this.dockingArray[j]){ // 说明是已经有的
                                    this.dockingArray[j].isSnap = 0
                                }                
                            }
                        }
                        this.$refs.multipleTable.clearSelection();
                    }).catch(_ => {});
                }
            },
            //船公司
            remoteCompanyNameMethod(value) {
                if (!value) {
                    value = "";
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/behavior/queryCompany?companyName=${value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                    }
                    }).then(res => {
                        this.companyNameList = res.data.content;
                });
            },
            handleCompanyNameChange(value) {
                if (value === null) {
                    return;
                }
                let obj = this.companyNameList.find(item => {
                    return item.scac == value;
                });
                if (obj) {
                    this.ruleForm.companyName = obj.companyName;
                    this.ruleForm.scac = obj.scac;
                }
                if (this.ruleForm.companyName === "") {
                    this.ruleForm.companyName = "";
                    this.ruleForm.scac = "";
                }
            },
            handleCompanyNameFounc() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/behavior/queryCompany`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token")
                    }
                    }).then(res => {
                        this.companyNameList = res.data.content;
                });
            },
            //切换属性
            switchProper(val){
                if(val == 0){
                    //当前是航线 如果之前的有添加船舶信息 直接清除
                    this.shipList = []
                    this.delectShipList = []
                }
            },
            //航线代码(服务)搜索
            lineCodeRemote(value){
                if(this.ruleForm.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?routeCode=${value}&scac=${this.ruleForm.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeList = res.data.content
                    }
                })
            },
            //航线代码(服务)focus事件
            lineCodeFocus(){
                if(this.ruleForm.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?scac=${this.ruleForm.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeList = res.data.content
                    }
                })
            },
            //航线代码(服务)change事件
            lineCodeChange(value){
                for (let i = 0; i < this.lineCodeList.length; i++) {
                    if(this.lineCodeList[i].routeCode === value){
                        this.staticId = this.lineCodeList[i].id
                    }
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
            //关闭事件
            handleCloseClick() {
                this.$emit("handleClose");
            },
            handleInnerClose() {
                this.dialogAddInnerVisible = false;
            },
            handleInnerClick(value) {},
            //新增数据 修改数据
            handleInnerValue(value, from) {
                if (this.dialogInnerStatus === "新增") {
                    for (var i = 0; i < this.dockingArray.length; i++) {
                        if (parseInt(value.portNumber) === parseInt(this.dockingArray[i].portNumber)) {
                            this.$message({
                                type: "error",
                                message: "已有重复数据"
                            });
                            return;
                        }
                    }
                    this.dockingArray.push(JSON.parse(JSON.stringify(value)));
                    this.dockingArray.sort(this.compare('portNumber'))
                    this.$refs.routeManageInner.resetFrom(from);
                    this.$refs.routeManageInner.ruleForm.isPol = '';
                    this.$refs.routeManageInner.checkList = []
                    this.$refs.routeManageInner.ruleForm.direction = '';
                    this.$refs.routeManageInner.direction = []
                } else {
                    for (var i = 0; i < this.dockingArray.length; i++) {
                        if (i === this.rowIndex) {
                            continue;
                        }
                        if (parseInt(value.portNumber) === parseInt(this.dockingArray[i].portNumber)) {
                            this.$message({
                                type: "error",
                                message: "已有重复数据"
                            });
                            return;
                        }
                    }
                    this.dockingArray.splice(
                        this.rowIndex,
                        1,
                        JSON.parse(JSON.stringify(value))
                    );
                    this.dockingArray.sort(this.compare('portNumber'))
                    this.$refs.routeManageInner.handleCloseClick();
                }
            },
            //挂靠港口 挂靠顺序排序
            compare(portNumber){
                return function(a,b){
                    var value1 = a[portNumber];
                    var value2 = b[portNumber];
                    return value1 - value2;
                }
            },     
            //点击修改挂靠港口
            tabRowChange(row, column, event) {
                if(this.dialogStatus !== '航线复制' && this.dialogStatus !== '航线复制并关联船舶'){
                    this.rowIndex = row.index;
                    this.dialogAddInnerVisible = true;
                    this.dialogInnerStatus = "修改";
                    this.tablePortruleForm = row;
                }
            },
            //单独修改挂靠顺序
            // cellDblclick(index){
            //    this.dockingArray[index].inputPort = true;
               
            // },
            //挂靠顺序 聚焦时候的value
            frontValue(value){
                this.inputValue = value
            },
            //挂靠顺序 失去失去焦点时
            inputBlur(value,index){
                if(this.dialogStatus !== '航线复制' && this.dialogStatus !== '航线复制并关联船舶'){
                    if(value === ''){
                        this.$message({
                            type: "error",
                            message: "挂靠数据不能为空"
                        });
                        this.dockingArray[index].portNumber = this.inputValue;
                    }else{
                        if(this.dockingArray[index].portNumber == this.inputValue){
                                this.dockingArray[index].portNumber = value;
                        }else{
                            for (var i = 0; i < this.dockingArray.length; i++) {
                                if(index !== i){
                                    if (parseInt(value) === parseInt(this.dockingArray[i].portNumber)) {
                                        this.$message({
                                            type: "error",
                                            message: "已有重复挂靠数据"
                                        });
                                        this.dockingArray[index].portNumber = this.inputValue
                                        return;
                                    }
                                }
                            }
                            this.dockingArray.sort(this.compare('portNumber'))
                        }
                    }
                }
            },
            // 点击获取航线预警详情
            tableShipChange(voyage, vessel) {
                if(voyage.length <= 0){
                    voyage = ""
                }else{
                    var str = voyage.substring(0, voyage.indexOf("("));
                }
                if (voyage.indexOf("(") === -1) {
                    this.voyageOrVessel = vessel + "/" + voyage;
                } else {
                    this.voyageOrVessel = vessel + "/" + str;
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryDynamicEta?staticId=${this.rowId}&vessel=${vessel}&voyage=${voyage.indexOf("(") === -1 ? voyage : str}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.tableRouteWarningData = res.data.content;
                        }
                });
                this.isLoading = false;
            },
            //初次获取船舶信息
            getShippInfor(matchType){
                this.$axios.get(this.commonJs.localUrl + `/schedules/vessel/searchVellesVoy?staticId=${this.rowId}&flag=${matchType}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.shipList = res.data.content.dynamicVessel
                        this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //选择船舶信息
            selectionChangeShip(val){
                this.shipSelectList = val
            },
            //新增船舶信息
            addShip(){
                if(this.ruleForm.scac){
                    this.dialogshipInforAdd = true
                    this.shipInforStatus = '新增'
                    this.shipScac = this.ruleForm.scac
                    this.isMatchType = this.ruleForm.matchType
                }else{
                    this.$message({
                        type: "error",
                        message: "请先选择船公司, 才能添加船舶信息"
                    });
                    return
                }
            },
            //修改船舶信息
            getShipVesse(row){
                if(this.dialogStatus !== '航线复制' && this.dialogStatus !== '航线复制并关联船舶'){
                    if(this.ruleForm.scac){
                        this.dialogshipInforAdd = true
                        this.shipInforStatus = '修改'
                        this.shipRow = row
                        this.shipScac = this.ruleForm.scac
                        this.isMatchType = this.ruleForm.matchType
                        this.shipRow.week = row.week ? parseInt(row.week) : ''
                        this.shipIndex = row.index
                    }else{
                        this.$message({
                            type: "error",
                            message: "请先选择船公司, 才能修改船舶信息"
                        });
                        return
                    }
                }
            },
            //删除船舶信息
            delectShip(){
                var val = this.shipSelectList
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行删除',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_delete, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoadings = true;
                    this.shipList = this.shipList.filter(items => {
                        if (!val.includes(items)) return items;
                    })
                    val.forEach((item,index)=>{
                        if(item.id){
                            item.delFlag = "1"
                            this.delectShipList.push(item)
                        }
                    })
                }).catch(_ => {});
            },
            //船舶信息 新增修改
            shipByValue(value){
                var newVal = JSON.parse(JSON.stringify(value))
                if (this.shipInforStatus === "新增") {
                    for (var i = 0; i < this.shipList.length; i++) {
                        if (newVal.vessel.toUpperCase() == this.shipList[i].vessel.toUpperCase() && newVal.voyage.toUpperCase() == this.shipList[i].voyage.toUpperCase() && newVal.year == this.shipList[i].year) {
                            this.$message({
                                type: "error",
                                message: "该船名航次已存在"
                            });
                            return;
                        }
                    }
                    this.shipList.push(newVal)
                    this.$refs.shipInforAdd.resetFrom()
                }else{
                    for (var i = 0; i < this.shipList.length; i++) {
                        if (i === this.shipIndex) {
                            continue
                        }
                        if (newVal.vessel.toUpperCase() == this.shipList[i].vessel.toUpperCase() && newVal.voyage.toUpperCase() == this.shipList[i].voyage.toUpperCase() && newVal.year == this.shipList[i].year) {
                            this.$message({
                                type: "error",
                                message: "该船名航次已存在"
                            });
                            return;
                        }
                    }
                    this.shipList.splice(this.shipIndex,1,newVal)
                    this.dialogshipInforAdd = false
                }
            },
            //关闭船舶信息弹框
            closeShipClick(){
                this.dialogshipInforAdd = false
            },
            //点击标准船名
            changeShip(row){
                if(this.dialogStatus !== '航线复制' && this.dialogStatus !== '航线复制并关联船舶'){
                    this.InforShipAdd = true
                    this.shipId = row.shipId
                    this.vesselInforName = '修改'
                }
            },
            UpdatShip(query){
                for (let i = 0; i < this.shipList.length; i++) { //循环数组
                    if((this.shipList[i].shipId).toUpperCase() == (query.id).toUpperCase()){ //看当前shipId是否等于传过来值的id 一样说明是修改的这一条
                        // this.shipList[i].vessel = query.vesselName //船名
                        this.shipList[i].standerVesselName = query.nameEn //标准船名
                        this.$axios.get(this.commonJs.localUrl +`/schedules/vessel/searchStanderVessel?flag=0&officeVessel=${query.nameEn}`, //调接口 根据船名取标准船名
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                            }
                        }).then(res => {
                            if (res.data.status == 1) {
                                if(res.data.content.length > 0){ //有数据
                                    var stand = res.data.content[0]
                                    this.shipList[i].mmsi = stand.mmsi // 新的mmsi
                                    this.shipList[i].imo = stand.imo //新的imo
                                    this.shipList[i].carrier = stand.carrier //新的船公司
                                    this.shipList[i].shipId = stand.id //新的shipId
                                }else{ //如果没有数据 也就是船名没有匹配到标准船名 ////一般不会出现这种情况
                                    this.shipList[i].mmsi = ''
                                    this.shipList[i].imo = ''
                                    this.shipList[i].carrier = ''
                                    this.shipList[i].shipId = ''
                                }
                            }
                        })
                    }
                }
            },
            //关闭标准船名打开的弹框
            closeShipInfor(){
                this.InforShipAdd = false
            },
            // 共舱航线 下拉数据
            selecticon() {
                this.upselectDate = !this.upselectDate;
            },
            //请求共舱航线
            getCommonCabinRoute(){
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/getSameRouteList?staticId=${this.rowId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                    }
                }).then(res => {
                    this.commonCabinRouteList = res.data.content;
                    // this.commonCabinRouteList = ["1","2","3","4","5","6","7","8","9","10","11"]
                        this.$nextTick(()=>{
                        // debugger
                        // if(this.$refs.commonCabin){
                            var comWidth = this.$refs.commonCabin.offsetWidth-2-2
                            this.number = Math.floor(comWidth / 102);
                            if (this.commonCabinRouteList.length > this.number) {
                                this.arrowtip = true;
                                if(this.number == 0){
                                    this.number = 1
                                }
                            }else{
                                this.arrowtip = false;
                                this.upselectDate = false
                            }
                        // }
                            window.addEventListener("resize", this.getWidth);
                        })
                });
            },
            getWidth() {
                // 获取UL的宽度，得到可以放几个的数量
                // debugger
                var comWidth = this.$refs.commonCabin.offsetWidth-2-2
                this.number = Math.floor(comWidth / 102);
                if (this.commonCabinRouteList.length > this.number) {
                    this.arrowtip = true;
                    if(this.number == 0){
                        this.number = 1
                    }
                }else{
                    this.arrowtip = false;
                    this.upselectDate = false
                }
            },
            //航线复制 请求挂靠港
            copySearchList() {
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryPortByRouteId?id=${this.rowId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.dockingArray = res.data.content
                        if(this.withArry && this.withArry.length > 0) { //判断从 路径管理--路径详情--航线代码里过来的数组
                            for (let i = 0; i < this.dockingArray.length; i++) {
                                for (let j = 0; j < this.withArry.length; j++) {
                                    if(this.dockingArray[i].port === this.withArry[j].port){
                                        //说明有同名的 这个时候就push进要传出的数组里routeLisd
                                        this.withArry[j].portCode = this.dockingArray[i].portCode
                                        this.withArry[j].isShow = true //代表这条数据不应该显示
                                        // this.routeLisd.push({
                                        //     portCode: this.dockingArray[i].portCode,
                                        //     isRoute: this.withArry[j].isRoute,
                                        //     index: this.withArry[j].indexPo
                                        // })
                                        this.dockingArray[i].isRedT = 2
                                        this.dockingArray[i].isRoute = this.withArry[j].isRoute
                                        this.dockingArray[i].indexPo = this.withArry[j].indexPo
                                    }                                
                                }
                            }
                            this.dockingArray = this.dockingArray.concat(this.withArry)
                            this.dockingArray = this.dockingArray.filter(items => { //过滤出最后的数组
                                if (!items.isShow) return items
                            })
                        }
                        this.copyDock = JSON.parse(JSON.stringify(this.dockingArray))
                        this.isLoading = false                        
                    }else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        this.isLoading = false;
                    }
                })
            },
            //监听窗口变化
            winResize() {
                const that = this
                that.heightScreen = document.body.clientHeight;
                window.onresize = () => {
                    return (() => {
                        window.screenHeight = document.body.clientHeight 
                        that.heightScreen = window.screenHeight
                    })();
                };
            },
        },
        mounted() {
            var d1 = new Date()
            this.currentYear = d1.getFullYear()
            if (this.dialogStatus === "新增") {
                this.addOrEdit = "新增"
                this.isLoading = false
                this.companyDisabled = false
                this.ruleForm.routeType = 0
            } else if (this.dialogStatus === "修改") {
                this.addOrEdit = "修改"
                this.getCommonCabinRoute()
                this.searchList()
                this.copySearchList()
                this.companyDisabled = true
            }else if (this.dialogStatus === "航线复制") {
                this.addOrEdit = "航线复制"
                this.copySearchList()
            }else if (this.dialogStatus === "航线复制并关联船舶") {
                this.addOrEdit = "航线复制并关联船舶"
                this.copySearchList()
                this.getShippInfor(0)
            }
            this.winResize()
        },
        watch:{
            heightScreen (val) {
               var height = val - 80
               this.heightInner = height  + 'px'
            }    
        },
        destroyed() {
            window.removeEventListener("resize", this.getWidth);
        },
    };
</script>

<style lang="scss" scoped>
    /deep/ .el-table .warning-row {
        background: rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover {
        background: rgba(241, 245, 247, 1);
    }
    /deep/.el-dialog__body{
        padding: 10px !important;
    }
    /deep/ .el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/ .el-table th{
        height: 30px;
        padding: 0;
    }
    .routeAdd {
        position: relative;
        overflow: hidden;
    }
    .lf {
        float: left;
    }
    .lr {
        float: right;
    }
    .clicksColor {
        color: #fff;
        background-color: #3bafda;
        float: right;
    }
    .headerContent {
        border-bottom: 1px solid #797979;
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit {
        margin-left: 10px;
        font-size: 18px;
    }
    .headeraddOrEditClose {
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .tableFormUl {
        padding-top: 20px;
        li:nth-of-type(1) {
            margin-top: 0px;
        }
        li {
            margin-top: 20px;
            .el-form-item {
                display: inline-block;
                width: 300px;
                margin-right: 20px;
            }
        }
    }
    // .el_formContent{
    //     width: 300px;
    //     display: inline-block;
    //     // margin-right: 20px;
    //     vertical-align: top;
    // }
    // .el_formContent:nth-last-of-type(1){
    //     width: 620px;
    //     vertical-align: top;
    // }
    .scrollP{
        overflow-y: auto;
        height:'400px'
    }
    .routeUl {
        padding-right: 10px;
        .routeLi {
            margin-top: 20px;
        }
    }
    .title {
        // width: 85px;
        // height: 35px;
        // line-height: 35px;
        text-align: center;
        // background-color: #3bafda;
        margin-bottom: 10px;
        display: inline-block;
        margin-right: 20px;
        span {
            color: #3bafda;
            font-weight: 600;
        }
    }
    .clickColor {
        background-color: #ff9000;
        color: #fff;
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
    .tempocal{
        border: 1px solid #3bafda;
        color: #3bafda;
        background-color: #fff;
        margin-right:10px;
        padding: 9px 23px;
    }
    .save {
        width: 100%;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: rgba(4, 153, 255, 1);
            margin-bottom: 10px;
        }
    }
    .voyageClass {
        display: inline-block;
        color: #3bafda;
        margin-right: 20px;
        // border-bottom: 1px solid rgba(4, 153, 255, 1);
        text-decoration: underline;
        cursor: pointer;
    }
    .redclass {
        color: red;
    }
    .commonul {
        width: 100%;
        height: 26px;
        border-radius: 4px 4px 0px 0px;
        border: 1px solid #dcdfe6;
        position: relative;
    }
    .commonulDiv{
        width: 100%;
        height: 26px;
        display: flex;
        overflow: hidden;
    }
    .commonCabinRoute {
        display: inline-block;
        flex: 1;
        height: 26px;
        border-radius: 4px 4px 0px 0px;
        padding: 2px 0px;
        padding-right: 2px;
        // overflow-y: hidden;
        overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        li {
            display: inline-block;
            width: 90px;
            line-height: 17px;
            background: #dcdfe6;
            margin-left: 2px;
            padding: 2px 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            // user-select:none;
            span {
                display: inline-block;
                width: 90px;
                height: 10px;
                line-height: 10px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        li:first-child{
            margin-left: 2px;
        }
    }
    .selecticonList {
        position: absolute;
        left: -1px;
        top: 27px;
        width: 100%;
        min-height: 30px;
        max-height: 150px;
        border-radius: 0px 0px 4px 4px;
        overflow: auto;
        background: #ffffff;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        // justify-content: space-around;
        li {
            display: inline-block;
            width: 90px;
            line-height: 17px;
            margin: 5px;
            margin-left: 2px;
            margin-right: 0;
            padding: 0 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: #dcdfe6;
            // user-select:none;
            span {
                display: inline-block;
                width: 90px;
                height: 10px;
                line-height: 10px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .elJian {
        display: inline-block;
        width: 30px;
        height: 30px;
        // margin-left: 40px;
        text-align: center;
        line-height: 30px;
    }
    .el-icon-arrow /deep/.el-icon-arrow-down {
        color: #3bafda;
    }
    .voyageOrVessel {
        font-size: 12px;
    }
    /deep/.el-col {
        margin-right: 0px !important;
    }
    /deep/.el-col:nth-child(3) {
        // margin-right: 20px !important;
    }
    .inputDiv{
        width: 100%;
        height: 30px;
    }
    .inputport{
        width: 60px;
        background:rgba(241, 245, 247, 1);
        height: 25px;
        outline: none;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
    }
    .inputportColor{
        width: 60px;
        height: 25px;
        outline: none;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
        // background:rgba(241, 245, 247, 1)
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
    .calllse{
        position: absolute;
        width: 16px;
        height: 16px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    // ::-webkit-scrollbar { /*滚动条整体样式*/
        
    // }
    // ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    //     // border-radius: 10px;
    //     // box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    //     background: #EDEDED;
    // }
    // ::-webkit-scrollbar-track { /*滚动条里面轨道*/
    //     // box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    //     // border-radius: 10px;
    //     background: #ffffff;
    // }
    /deep/th.columnPadding{
        padding-left: 10px !important;
    }
    .isRedT{
        color: red;
    }
    .standerVessel{
        color: #3bafda;
        text-decoration: underline;
        cursor: pointer;
    }
</style>