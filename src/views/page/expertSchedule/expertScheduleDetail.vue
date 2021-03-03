<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="120px"
        :model="ruleForm"
        ref="ruleForm"
        size="mini"
        class="ruleForm"
        >
        <div class="headerContent">
            <label class="headeraddOrEdit">专家船期详情</label>
            <i class="headeraddOrEditClose el-icon-close lr" @click="closePath"></i>
        </div>
            <div :style="{maxHeight: innerHeight}"  class="scrollDiv">
                <ul class="routeUl">
                    <li class="routeLi">
                        <div class="title">
                            <span>基础信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="起运港">
                                    <el-input v-model="ruleForm.pol" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="目的港">
                                    <el-input v-model="ruleForm.pod" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%"> 
                                <el-form-item label="船公司">
                                    <el-input v-model="ruleForm.companyName" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="ETD">
                                    <el-input v-model="ruleForm.etd" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="总航程">
                                    <el-input 
                                    v-model="ruleForm.transitTime"
                                    placeholder=""
                                    @input="ruleForm.transitTime = ruleForm.transitTime.replace(/[^0-9]/g,'')">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%"> 
                                <el-form-item label="路径数">
                                    <el-select
                                    v-model="ruleForm.transitCount"
                                        style="width:100%"
                                        class="transitCount"
                                        :disabled="true"
                                        placeholder=""
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
                            <el-col style="width:24%">
                                <el-form-item label="类型">
                                    <el-select
                                        v-model="ruleForm.state"
                                        style="width:100%;"
                                        placeholder=""
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
                    </li>
                    <li class="routeLi">
                        <div class="title lf">
                            <span>路径详情</span>
                        </div>
                        <el-table
                            :data="pathDetails"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="table"
                        >
                            <el-table-column  prop="userName" label="序号" :show-overflow-tooltip="true" align="left" min-width="50"> 
                                <template slot-scope="scope">
                                    {{scope.$index +1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="transitType" label="运输方式" align="left" :show-overflow-tooltip="true" min-width="70">           
                            </el-table-column>
                            <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="70">           
                            </el-table-column>
                            <el-table-column prop="polTerminal" label="起运港码头" align="left" :show-overflow-tooltip="true" min-width="80">           
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-model="scope.row.polTerminal"
                                            v-if="scope.row.transitType != 'LINE'"
                                            placeholder=""
                                            clearable
                                            :loading="selectLoading"
                                            @focus="startPortFocus(scope.row.polCode)"
                                            @change="startPortChange($event,scope.row.index)"
                                            style="width:100%"
                                        >
                                            <el-option
                                                v-for="item in startPort"
                                                :key="item.id"
                                                :label="item.terminalCn"
                                                :value="item.terminalCn"
                                            >
                                            </el-option>
                                        </el-select>
                                        <span v-else>{{scope.row.polTerminal}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="60">
                            </el-table-column>
                            <el-table-column prop="podTerminal" label="目的港码头" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-if="scope.row.transitType != 'LINE'"
                                            v-model="scope.row.podTerminal"
                                            placeholder=""
                                            clearable
                                            :loading="selectLoading"
                                            @focus="endPortFocus(scope.row.podCode)"
                                            @change="endPortChange($event,scope.row.index)"
                                            style="width:100%"
                                        >
                                            <el-option
                                                v-for="item in endPort"
                                                :key="item.id"
                                                :label="item.terminalCn"
                                                :value="item.terminalCn"
                                            >
                                            </el-option>
                                        </el-select>
                                        <span v-else>{{scope.row.podTerminal}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="routeCode" label="航线代码" align="left" :show-overflow-tooltip="true" min-width="68">   
                                <template slot-scope="scope">
                                    <span v-if="scope.row.transitType == 'LINE' && expertStatus" style="color: #007ce3;cursor: pointer" @click="handleClickRouteCode(scope.row)">{{scope.row.routeCode != 'UNDEFINED'?scope.row.routeCode:'-'}}</span>
                                    <span v-else>{{scope.row.routeCode != 'UNDEFINED' ? scope.row.routeCode : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="etd" label="ETD" align="left" min-width="70">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-if="scope.row.transitType != 'LINE'"
                                            v-model="scope.row.etd"
                                            style="width:100%;"
                                            placeholder=""
                                            default-first-option
                                        >
                                            <el-option
                                                v-for="item in ETDList"
                                                :key="item.id"
                                                :label="item.value"
                                                :value="item.label"
                                            >
                                            </el-option>
                                        </el-select>
                                        <span v-else>{{scope.row.etd}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="eta" label="ETA" align="left" min-width="70">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-if="scope.row.transitType != 'LINE'"
                                            v-model="scope.row.eta"
                                            style="width:100%;"
                                            placeholder=""
                                            default-first-option
                                        >
                                            <el-option
                                                v-for="item in ETDList"
                                                :key="item.id"
                                                :label="item.value"
                                                :value="item.label"
                                            >
                                            </el-option>
                                        </el-select>
                                        <span v-else>{{scope.row.eta}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="transitTime" label="航程" align="left" :show-overflow-tooltip="true" min-width="68">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-if="scope.row.transitType != 'LINE'"
                                            v-model="scope.row.transitTime"
                                            placeholder=""
                                            @input="scope.row.transitTime = scope.row.transitTime.replace(/[^0-9]/g,'')"
                                        />
                                        <span v-else>{{scope.row.transitTime}}</span>
                                    </div>
                                </template>
                            </el-table-column> 
                            <template slot="empty">
                                <div class="dataPage">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>航线共舱信息</span>
                        </div>
                        <div class="SharedCabin_table">
                            <div class="table_line">
                                <div class="type">类型</div>
                                <div class="info">共舱船公司(航线)信息</div>
                            </div>
                            <div class="table_line">
                                <div class="type">该路径常规共舱(标准)</div>
                                <div class="info" v-if="isEditCabin">
                                    <template v-if="isShowCabin">
                                        <div class="info_item_box" v-for="item in AllCabinList" :key="item.staticId">
                                            <div class="info_item" v-if="item.isSelect">
                                                <div>{{item.carrier + '(' + item.displayName + ')'}}</div>
                                                <i class="el-icon-close" @click="handleClickDelCabin(item)"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <i class="el-icon-circle-plus-outline add_btn" @click="handleClickEditCabin"></i>
                                </div>
                                <div class="info" v-else>
                                    <div class="noCabin">暂无共舱船公司(航线)信息</div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>动态船舶</span>
                        </div>
                        <el-table
                            :data="dynamicList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabColClassName"
                            tooltip-effect="dark"
                            ref="tableDynamic"
                        >
                            <el-table-column prop="weekNo" label="周序号" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{getWeekNo(scope.row.weekNo)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expandChange" label="" align="left" :show-overflow-tooltip="true" width="50">
                                <template slot-scope="scope">
                                    <span style="color:#3bafda;cursor: pointer;user-select: none" @click.stop="toogleExpand(scope.row)" v-if="pathDetails.length > 1">{{scope.row.expandChange ? '收起' : '展开'}}</span>
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="isChange" label="" align="left" :show-overflow-tooltip="true" width="17">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="right" @show="getChangeShips(scope.row.changeShips)" ref="popover" style="cursor: pointer;" v-if="scope.row.changeShips.length > 0">
                                        <table border="0" class="shipTable">
                                            <tr v-for="(item,index) in shipTitle" :key="item.voyage + index">
                                                <th class="vessel">{{item.vessel}}</th>
                                                <th class="vessel">{{item.voyage}}</th>
                                                <th>{{item.dynamicEtd}}</th>
                                                <th>{{item.dynamicEta}}</th>
                                                <th>{{item.updateTime}}</th>
                                            </tr>
                                            <tr v-for="(item,index) in shiplList" :key="index">
                                                <td class="vessel">{{item.vessel}}</td>
                                                <td class="vessel">{{item.voyage}}</td>
                                                <td>{{item.dynamicEtd}}</td>
                                                <td>{{item.dynamicEta}}</td>
                                                <td>{{item.updateTime}}</td>
                                            </tr>
                                        </table>
                                        <div slot="reference" class="name">
                                            <img src="@/assets/images/route/huan.png" class="huan">
                                        </div>
                                    </el-popover>
                                    <span v-else></span>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="vessel" label="船名" align="left" :show-overflow-tooltip="true" min-width="140">
                            </el-table-column>
                            <el-table-column prop="voyage" label="航次" align="left" :show-overflow-tooltip="true" min-width="120">
                            </el-table-column>
                            <el-table-column prop="staticEtd" label="ETD-静态" align="left" :show-overflow-tooltip="true" min-width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.staticEtd}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="etd" label="ETD-动态" align="left" :show-overflow-tooltip="true" min-width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.etd}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="staticEta" label="ETA-静态" align="left" min-width="130" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <span>{{scope.row.staticEta}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="eta" label="ETA-动态" align="left" min-width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.eta}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="warning" label="ETD预警" align="left" width="70">
                                <template slot-scope="scope">
                                    <span>{{scope.row.warning}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand" align="left" v-if="pathDetails.length > 1" width="1">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.additLeg.length > 0">
                                        <el-table :data="scope.row.additLeg" :show-header=false class="tes_table">
                                            <el-table-column prop="weekNo" label="周序号" align="left" :show-overflow-tooltip="true" min-width="80">
                                                <template>
                                                    <span></span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="" label="" align="left" :show-overflow-tooltip="true" width="50">
                                            </el-table-column>
                                            <el-table-column prop="isChange" label="" align="left" :show-overflow-tooltip="true" width="17">
                                                <template slot-scope="scope">
                                                    <el-popover trigger="hover" placement="right" @show="getChangeShips(scope.row.changeShips)" ref="popover" style="cursor: pointer;" v-if="scope.row.changeShips.length > 0">
                                                        <table border="0" class="shipTable">
                                                            <tr v-for="(item,index) in shipTitle" :key="item.voyage + index">
                                                                <th class="vessel">{{item.vessel}}</th>
                                                                <th class="vessel">{{item.voyage}}</th>
                                                                <th>{{item.dynamicEtd}}</th>
                                                                <th>{{item.dynamicEta}}</th>
                                                                <th>{{item.updateTime}}</th>
                                                            </tr>
                                                            <tr v-for="(item,index) in shiplList" :key="index">
                                                                <td class="vessel">{{item.vessel}}</td>
                                                                <td class="vessel">{{item.voyage}}</td>
                                                                <td>{{item.dynamicEtd}}</td>
                                                                <td>{{item.dynamicEta}}</td>
                                                                <td>{{item.updateTime}}</td>
                                                            </tr>
                                                        </table>
                                                        <div slot="reference" class="name">
                                                            <img src="@/assets/images/route/huan.png" class="huan">
                                                        </div>
                                                    </el-popover>
                                                    <span v-else></span>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="vessel" label="船名" align="left" :show-overflow-tooltip="true" min-width="140">
                                            </el-table-column>
                                            <el-table-column prop="voyage" label="航次" align="left" :show-overflow-tooltip="true" min-width="120">
                                            </el-table-column>
                                            <el-table-column prop="staticEtd" label="ETD-静态" align="left" :show-overflow-tooltip="true" min-width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.staticEtd}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="etd" label="ETD-动态" align="left" :show-overflow-tooltip="true" min-width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.etd}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="staticEta" label="ETA-静态" align="left" min-width="130" :show-overflow-tooltip="true">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.staticEta}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="eta" label="ETA-动态" align="left" min-width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.eta}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="warning" label="ETD预警" align="left" width="70">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.warning}}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </template> 
                            </el-table-column>
                            <template slot="empty">
                                <div class="dataPage">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                    <li class="routeLi">
                        <div class="title lf">
                            <span>修改记录</span>
                        </div>
                        <el-table
                            :data="recordTableData"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="recordTableData"
                        >
                            <el-table-column prop="updateUser" label="修改人" align="left" :show-overflow-tooltip="true" width="110">           
                            </el-table-column>
                            <el-table-column prop="updateType" label="修改模块" align="left" :show-overflow-tooltip="true" width="110">           
                            </el-table-column>
                            <el-table-column prop="updateTime" label="修改时间" align="left" :show-overflow-tooltip="true" width="180">           
                            </el-table-column>
                            <el-table-column prop="updateContent" label="修改内容" align="left" :show-overflow-tooltip="true">           
                            </el-table-column>
                            <template slot="empty">
                                <div class="dataPage">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" v-if="expertStatus" @click="handleSaveClick()">保存并同步</el-button>
                </div>
            </div>
        </el-form>
        <el-dialog
            class="routeDetail"
            :visible.sync="routeDetailDialogVisible"
            v-if="routeDetailDialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="80%"
            top="0"
            append-to-body
            :show-close="false"
            center
        >
            <PortOfCall
                :staticId="staticId"
                :polCode="polCode"
                :podCode="podCode"
                :routeCode="routeCode"
                :scac="ruleForm.scac"
                @initDetailData="initDetailData"
                @handleInnerClose="handleInnerClose"
            ></PortOfCall>
        </el-dialog>
        <el-dialog
            class="SharedCabinAdd"
            :visible.sync="SharedCabinDialogVisible"
            v-if="SharedCabinDialogVisible"
            width="500px"
            center
            append-to-body
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <SharedCabinAdd
            :AllCabinList="AllCabinList"
            @SharedCabinAddOk="SharedCabinAddOk"
            @SharedCabinAddCancel="SharedCabinAddCancel"
            >
            </SharedCabinAdd>
        </el-dialog>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    import PortOfCall from "./PortOfCall.vue";
    import SharedCabinAdd from "./SharedCabinAdd.vue";
    export default {
        props: [
            'pathId',
            'expertStatus'
        ],
        data() {
            return {
                dataWidth: '',
                innerHeight: '',
                screenHeight: '',
                screenWidth: document.body.clientWidth, // 设置默认值
                isLoading: false, //Loading
                selectLoading: false,
                ruleForm:{
                    pol: '',//起运港
                    polCode: '',//起运港五子码
                    polCityId: '',//起始港城市Id
                    polId: '',//起始港Id
                    polTerminal: '',//起始港码头
                    polTerminalId: '',//起始港码头id
                    pod: '',//目的港
                    podCode: '',//目的港五子码
                    podCityId: '',//目的港城市Id
                    podId: '',//目的港Id
                    polTerminal: '',//目的港码头
                    podTerminalId: '',//目的港码头id 
                    companyName: '',//船公司
                    companyId: '',//船公司id
                    scac: '',//船公司四字码
                    gcId: '',//新增头程共舱id
                    etd: '',//ETD
                    transitTime: '',//总航程
                    transitCount: '',//路径数
                    state: '',//类型
                },
                //ETD列表
                ETDList : [
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
                stateList: [
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
                    }
                ],
                //路径数
                isTransitList: [
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
                PortScheduleDetail: [],//港港船期详情数据
                recordTableData: [],//修改记录数据
                pathDetails: [],//路径详情 页面显示的
                startPort: [],//起始港数据
                endPort: [],//目的港数据
                AllCabinList:[],//共舱数据
                gcId: '',//共舱Id
                dynamicList: [], //动态船舶信息
                shiplList: [], //换船列表
                shipTitle: [], //换船标题
                isEditCabin: false,//是否可编辑共舱
                isShowCabin: false,//是否展示共舱
                SharedCabinDialogVisible: false,//共舱弹窗状态
                routeDetailDialogVisible: false,//挂靠港弹窗
                staticId: '',
                polCode: '',
                podCode: '',
                routeCode: '',
            };
        },
        components: {
            loading,
            PortOfCall,
            SharedCabinAdd
        },
        methods: {
            // 初始化详情页
            initDetailData(){
                this.pathDetail()
                this.getRecords()
            },
            //取路径详情
            pathDetail(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/expert/path/details?pathId=${this.pathId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.PortScheduleDetail = res.data.content;
                        this.pathDetails = this.PortScheduleDetail.pathList
                        this.gcId = this.PortScheduleDetail.gcId?this.PortScheduleDetail.gcId:''
                        this.ruleForm.pol = this.PortScheduleDetail.pol
                        this.ruleForm.polCode = this.PortScheduleDetail.polCode
                        this.ruleForm.pod = this.PortScheduleDetail.pod
                        this.ruleForm.podCode = this.PortScheduleDetail.podCode
                        this.ruleForm.companyName = this.PortScheduleDetail.carrier
                        this.ruleForm.scac = this.PortScheduleDetail.scac
                        this.ruleForm.etd = this.PortScheduleDetail.etd
                        this.ruleForm.transitTime = this.PortScheduleDetail.transitTime
                        this.ruleForm.transitCount = this.PortScheduleDetail.transitCount
                        this.ruleForm.state = this.PortScheduleDetail.state
                        this.getVesselList(this.PortScheduleDetail.type)
                        if(this.pathDetails.length == 1){
                            this.getCabinData()
                        }else{
                            this.isEditCabin = false
                        }
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                    this.isLoading = false
                })
            },
            // 获取修改记录
            getRecords(){
                this.$axios.get(this.commonJs.localUrl + `/expert/mission/getRecords?pathId=${this.pathId}`,{
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                },
                }).then(res => {
                    if(res.data.status == 1){
                        this.recordTableData = res.data.content
                    }
                })
            },
            //获取共舱信息
            getCabinData(){
                this.$axios.get(this.commonJs.localUrl + `/expert/path/selectCabinPathById?gcId=${this.gcId
                }&staticId=${this.pathDetails[0].staticId
                }&polCode=${this.pathDetails[0].polCode
                }&podCode=${this.pathDetails[0].podCode}`,{
                headers: {
                    Authorization: `Bearer ${this.getAuthorization()}`,
                    AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                },
                }).then(res => {
                    this.AllCabinList = res.data.content
                    if(this.AllCabinList.length){
                        this.isEditCabin = true
                        // 头程新增取共舱id
                        this.ruleForm.gcId = this.AllCabinList[0].cabinId
                        for(let i=0; i<this.AllCabinList.length; i++){
                            if(this.AllCabinList[i].flag == 0){
                                this.AllCabinList[i].isSelect = true
                            }else{
                                this.AllCabinList[i].isSelect = false
                            }
                        }
                    }else{
                        this.isEditCabin = false
                    }
                })
            },
            //共舱标签关闭
            handleClickDelCabin(value) {
                var item = value
                for(let i=0; i<this.AllCabinList.length; i++){
                    if(this.AllCabinList[i].staticId == item.staticId){
                        item.isSelect = false
                        this.AllCabinList.splice(i,1,item)
                    }
                }
            },
            //添加共舱信息
            handleClickEditCabin(){
                this.SharedCabinDialogVisible = true
            },
            //关闭共舱弹窗
            SharedCabinAddCancel(){
                this.SharedCabinDialogVisible = false
            },
            //共舱弹窗保存传回来的数据
            SharedCabinAddOk(value){
                this.AllCabinList = value
            },
            //获取动态船舶
            getVesselList(type){
                this.isLoading = true
                // 爬虫数据
                if(type == 0){
                    var id = ""
                    var ids = []
                    for (let i = 0; i < this.pathDetails.length; i++) {
                        ids.push(this.pathDetails[i].eachId)
                    }
                    id = ids.join('-')
                    this.$axios.get(this.commonJs.localUrl + `/schedules/path/getDynamicVessel?id=${id}&carrier=${this.ruleForm.companyName}`
                    ,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            this.dynamicList = this.handleVesselData(res.data.content.dynamicVessel,type)
                        }else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                        this.isLoading = false
                    })
                }else if(type == 1){//人工数据
                    this.dynamicList = []
                }
            },
            // 处理动态船舶数据
            handleVesselData(data,type){
                var dynamicList = []
                for (let i = 0; i < data.length; i++) {
                    var item = data[i]
                    //爬虫的动态船舶数据
                    for (let p = 0; p < item.length; p++) {
                        if(type == 0){
                            //动态ETD
                            item[p].etd = item[p].dynamicEtd
                            //动态ETA
                            item[p].eta = item[p].dynamicEta
                        }
                    }
                    var firstObject = item[0] //头程的数据
                    var additLeg = [] //放 2 3 4程数据
                    for (let j = 1; j < item.length; j++) {  //下面是 2 3 4程数据
                        additLeg.push(item[j])
                    }
                    firstObject["additLeg"] = additLeg
                    dynamicList.push(firstObject)
                }
                return dynamicList
            },
            //显示换船
            getChangeShips(val){
                this.shiplList = []
                this.shipTitle = []
                if(val){
                    if(val.length >= 1){
                        this.shiplList = val
                        this.shipTitle = [{
                            vessel: '船名',
                            voyage: '航次',
                            dynamicEta: "ETA 动态",
                            dynamicEtd: "ETD 动态",
                            updateTime: "更新时间"
                        }]
                    }
                }
            },
            //起始港码头focus
            startPortFocus(val){
                this.selectLoading = true
                this.startPort = []
                if(val){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${val}`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    },
                    }).then(res => {
                        this.startPort = res.data.content;
                        this.selectLoading = false
                    })
                }
            },
            //起始港码头change
            startPortChange(val,index){
                if(val){ //选择了起始港码头
                    for (let i = 0; i < this.startPort.length; i++) {
                        if(this.startPort[i].terminalCn == val) {
                            this.pathDetails[index].polTerminalId = this.startPort[i].id
                        }
                        
                    }
                }else {
                    this.pathDetails[index].polTerminalId = ''
                }
            },
            //目的港码头focus
            endPortFocus(val){
                this.selectLoading = true
                this.endPort = []
                if(val){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${val}`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    },
                    }).then(res => {
                        this.endPort = res.data.content
                        this.selectLoading = false
                    })
                }
            },
            //目的港码头change
            endPortChange(val,index){
                if(val){ //选择了起始港码头
                    for (let i = 0; i < this.endPort.length; i++) {
                        if(this.endPort[i].terminalCn == val) {
                            this.pathDetails[index].podTerminalId = this.endPort[i].id
                        }
                    }
                }else {
                    this.pathDetails[index].podTerminalId = ''
                }
            },
            //跳转航线代码弹窗
            handleClickRouteCode(row){
                this.routeDetailDialogVisible = true
                this.staticId = row.staticId
                this.polCode = row.polCode
                this.podCode = row.podCode
                this.routeCode = row.routeCode
            },
            //关闭航线代码弹窗
            handleInnerClose(){
                this.routeDetailDialogVisible = false
            },
            //点击展开
            toogleExpand(row){
                let $table = this.$refs.tableDynamic;
                this.dynamicList.map((item,index) => {
                    if (row.index != index) {
                        item.expandChange = false
                        $table.toggleRowExpansion(item, false)
                    }else{
                        item.expandChange = !item.expandChange
                    }
                })
                $table.toggleRowExpansion(row)            
            },
            //周次转换
            getWeekNo(time){
                var weekNo = ''
                weekNo = time.split('-')
                weekNo = weekNo[weekNo.length - 1]
                return weekNo
            },
            //时间转换
            getDateTime(val){
                //下面是处理时间
                var d = new Date(val)
                var Y = d.getFullYear()
                var M = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
                var D = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
                var resDate = Y + '-' + M + '-' + D
                var resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
                //下面是获取周
                //因为fommat格式解析问题所以另下面的用于解析显示
                var weekDay = ["'S'UN", "'M'ON", "TUE", "WE'D'", "T'H'U", "FRI", "'S''A''T'"];
                var W = weekDay[new Date(Date.parse(resDate)).getDay()]; //显示时候需要放的
                //下面的用于返给后台数据
                var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                var S = week[new Date(Date.parse(resDate)).getDay()]; //显示时候需要放的
                return resDate + '('+ S + ')'
            },
            p(s) {
                return s < 10 ? '0' + s : s
            },
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
                }
            },
            tabColClassName({ row, rowIndex }){
                //如果路径是直达的 则一个
                if(this.pathDetails.length == 1){
                    row.index = rowIndex;
                    let index = rowIndex + 1;
                    if (index % 2 !== 0) {
                        return "warning-row";
                    }
                }else{
                    row.index = rowIndex;
                    let index = rowIndex + 1;
                    return "warning-row";
                }
            },
            //关闭事件
            closePath() {
                this.$emit("handleCloseDetail");
            },
            //监听窗口变化
            winResize() {
                this.dataWidth = document.body.clientWidth * 0.8 - 40
                const that = this
                that.screenHeight = document.body.clientHeight;
                window.onresize = () => {
                    return (() => {
                        window.screenWidth = document.body.clientWidth   
                        that.screenWidth = window.screenWidth
                        window.screenHeight = document.body.clientHeight 
                        that.screenHeight = window.screenHeight
                    })()
                }
            },
            //此页面点击保存
            handleSaveClick() {
                //总航程为空
                if(this.ruleForm.transitTime === ''){
                    this.$message({
                        type: "error",
                        message: "请输入总航程"
                    });
                    return
                }
                //直达路径的航程必须和路径详情里的航程一致
                if(this.pathDetails.length == 1){
                    if(this.pathDetails[0].transitTime == null){
                        this.$message({
                            type: "error",
                            message: "页面航程需要保持一致"
                        });
                        return
                    }else if(this.pathDetails[0].transitTime.toString().replace(/\s/g,'') !== this.ruleForm.transitTime.toString().replace(/\s/g,'')){
                        this.$message({
                            type: "error",
                            message: "页面航程需要保持一致"
                        });
                        return
                    }
                }
                if(this.AllCabinList.length){
                    for(let i=0; i<this.AllCabinList.length; i++){
                        // 删除的共舱
                        if(this.AllCabinList[i].flag == 0 && this.AllCabinList[i].isSelect == false){
                            this.AllCabinList[i].delFlag = 1
                        }
                        // 新增的共舱
                        if(this.AllCabinList[i].flag == 1 && this.AllCabinList[i].isSelect == true){
                            this.AllCabinList[i].delFlag = 0
                        }
                    }
                    this.AllCabinList = this.AllCabinList.filter(item=>{
                        if(item.delFlag !== null){
                            return true
                        }
                    })
                }
                let query = {
                    id: this.PortScheduleDetail.id,
                    userId: '',
                    shType: 1,
                    transitTime: this.ruleForm.transitTime,
                    state: this.ruleForm.state,
                    pathList: this.pathDetails,
                    commonIds: this.AllCabinList
                }
                this.loading = true
                this.$axios.post(this.commonJs.localUrl + `/expert/path/updatePath`, query, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                },
                }).then(res => {
                    if(res.data.status == 1){
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.closePath()
                        this.$emit("updatInfor");
                    }
                    this.loading = false
                }).catch((err)=>{
                    this.$message({
                        type: "error",
                        message: "数据保存失败 请重新加载页面"
                    });
                })
            }
        },
        mounted() {
            this.initDetailData()
            this.winResize() //监听窗口变化
        },
        watch:{
            screenWidth (val) {
                this.screenWidth = val
                this.dataWidth = this.screenWidth * 0.8 - 40
            },
            screenHeight (val) {
               var height = val - 80
               this.innerHeight = height  + 'px'
            },
            //共舱展示标签
            AllCabinList(val){
                for(let i=0; i<val.length; i++){
                    if(this.pathDetails[0].staticId == val[i].staticId){
                        if(val[i].isSelect == false){
                            this.isShowCabin = false
                            //共舱去掉自己时，所有共舱关系清空
                            for(let j=0; j<this.AllCabinList.length; j++){
                                this.AllCabinList[j].isSelect = false
                            }
                        }else{
                            this.isShowCabin = true
                        }
                    }
                }
            },
        },
    };
</script>

<style lang="scss" scoped>

    /*这个地方处理的是 table expand 展开隐藏的样式*/
    /deep/.el-table__expand-icon>.el-icon{
        display: none;
    }
    /deep/.el-table__expand-column{
        width: 1px !important;
    }
    /deep/.el-table__expand-column div.cell{
        width: 1px !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    /deep/.tes_table  .el-table__body-wrapper::-webkit-scrollbar{
        /*width: 0;宽度为0隐藏*/
        width: 0px;
        height: 0px;
        border: 0px;
    }
    /*截止地方*/

    /deep/ .el-table .warning-row {
        background: rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover {
        background: rgba(241, 245, 247, 1);
    }
    /deep/.el-dialog__body{
        padding: 10px !important;
    }
    /deep/.el-col {
        margin-right: 0px !important;
    }
    /deep/.el-row .el-col:nth-last-of-type(1){
        margin-right: 0;
    }
    .routeAdd {
        position: relative;
        overflow: hidden;
    }
    .routeDetail{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
        }
    }
    .lf {
        float: left;
    }
    .lr {
        float: right;
    }
    .headerContent {
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
    .scrollDiv{
        overflow-y: auto;
        height:'400px'
    }
    .routeUl {
        padding-right: 10px;
        .routeLi {
            margin-top: 20px;
            .SharedCabin_table{
                .table_line{
                    display: flex;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    color: #282828;
                    .type{
                        width: 137px;
                        padding-left: 11px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .info{
                        flex: 1;
                        width: 0;
                        padding-left: 10px;
                        display: flex;
                        flex-wrap: wrap;
                        .info_item{
                            height: 24px;
                            background-color: #f2f2f2;
                            border-radius: 2px;
                            border: solid 1px #f2f2f2;
                            font-size: 12px;
                            line-height: 22px;
                            color: #282828;
                            display: flex;
                            margin-right: 10px;
                            div{
                                padding-left: 6px;
                                padding-right: 3px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            i{
                                cursor: pointer;
                                width: 12px;
                                font-size: 12px;
                                line-height: 24px;
                                margin-right: 3px;
                                color: #909090;
                            }
                        }
                        .add_btn{
                            cursor: pointer;
                            font-size: 14px;
                            color: #909090;
                            margin-top: 6px;
                            margin-bottom: 12px;
                        }
                    }
                }
                .table_line:first-of-type{
                    background: #f2f2f2;
                }
                .table_line:last-of-type{
                    background: #fff;
                    height: auto;
                    .type{
                        width: 135px;
                        border: solid 1px #f2f2f2;
                        border-top: none;
                        padding-left: 10px;
                        display: flex;
                        align-items: center;
                        line-height: 12px;
                    }
                    .info{
                        border-right: solid 1px #f2f2f2;
                        border-bottom: solid 1px #f2f2f2;
                        padding-top: 8px;
                        .info_item_box{
                            margin-bottom: 8px;
                        }
                        .noCabin{
                            color: #909090;
                            line-height: 24px;
                            margin-bottom: 8px;
                        }
                    }
                }
            }
        }
    }
    .title {
        text-align: center;
        margin-bottom: 10px;
        display: inline-block;
        margin-right: 20px;
        span {
            color: #3bafda;
            font-weight: 600;
        }
    }
    .voyageOrVessel {
        font-size: 12px;
    }
    .pathRecover{
        display: inline-block;
        margin-left: 10px;
        vertical-align: top;
        color: red;
        cursor: pointer;
    }
    .redclass {
        color: red;
    }
    .colSpan{
        width: 100%;
        display: inline-block;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;    
    }
    .look{
        color:#3bafda;
        cursor: pointer;
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
    .slotRed{
        position: absolute;
        right: 10px;
        top: 2px;
    }
    .inputport{
        width: 100%;
        background:rgba(241, 245, 247, 1);
        height: 25px;
        outline: none;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
    }
    .inputportColor{
        width: 100%;
        height: 25px;
        outline: none;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
        // background:rgba(241, 245, 247, 1)
    }
    .comRoutUl{
        width: 100%;
        overflow: hidden;
        // display: flex;
        .comRoutLi{
            display: inline-block;
            .routP{
                cursor: pointer;
                margin-left: 5px;
                margin-right: 5px;
                color: #3bafda;
                text-decoration: underline;
            }
            .rouC{
                margin-left: 5px;
                margin-right: 5px;
            }
        }
    }
    .shipData{
        width: 100%;
        height: 400px;
        margin-bottom: 20px;
        overflow: hidden;
    }
    .sel-el{
        overflow: hidden;
        width: 100%;
        height: 28px;
    }
    .sel-el /deep/.el-input__inner{
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 10px;
    }
    .sel-el /deep/ .el-input__icon{
        line-height: 28px;
    }
    .sel-el /deep/ .el-input__suffix {
        right: 0;
    }
    .sel-input{
        overflow: hidden;
        width: 100%;
        height: 28px;
    }
    .sel-input /deep/.el-input__inner{
        height: 28px;
        line-height: 28px;
        padding-left: 25px;
        padding-right: 10px;
        font-size: 10px;
    }
    .sel-input /deep/ .el-input__icon{
        line-height: 28px;
    }
    .sel-input /deep/ .el-input__suffix {
        right: 0;
    }
    .sel-input /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    .sel-input /deep/ .el-input.is-disabled .el-input__inner{
        background-color: #ffffff;
        color: #606266;
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
    .voyageClass {
        display: inline-block;
        color: #3bafda;
        margin-right: 20px;
        text-decoration: underline;
        cursor: pointer;
    }
    .portRoute {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        // height: 26px;
        padding: 2px 0px;
        padding-right: 2px;
        overflow: hidden;
        li {
            width: auto;
            position: relative;
            display: flex;
            align-content: center;
            height: 18px;
            line-height: 18px;
            background: #e4e4e4;
            padding: 2px 5px;
            margin-bottom: 2px;
            border-radius: 10px;
            span {
                display: inline-block;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .delec{
                font-size: 12px;
                margin-top: 4px;
            }
        }
    }
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: -26px;
        top: -2px;    
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
    .shipTable{
        overflow-y: hidden;
        overflow-x: auto;
        tr th{
            padding: 5px;
            box-sizing:content-box;
            background: black !important;
            color: #fff !important;
            &.vessel{
                background: red;
                width: 90px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        tr td{
            padding: 5px;
            box-sizing:content-box;
            background: black !important;
            color: #fff !important;
            &.vessel{
                background: red;
                width: 90px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
    .huan{
        position: absolute;
        width: 17px;
        height: 15px;
        left: 0px;
        top: 12px;    
    }
</style>