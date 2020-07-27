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
            <div :style="{height: innerHeight}"  class="scrollDiv">
                <ul class="routeUl">
                    <li class="routeLi" v-if="this.dialogStatus !== '复制'">
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
                                        :disabled="companyDisabled"
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
                            <el-col style="width:22%">
                                <el-form-item label="航线" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.route" placeholder="请输入" clearable></el-input>
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
                                        :disabled="isMerge"
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
                        </el-row>
                    </li>
                    <li class="routeLi" v-if="this.dialogStatus === '复制'">
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
                            <el-col style="width:22%">
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
                        <el-button size="small" class="clickColor" @click="handleAddClick">新增</el-button>
                        <el-button size="small" class="clickColor abnormal" @click="delectClick">删除</el-button>
                        <el-button size="small" class="clickColor tempocal" @click="tempocalClick">临时挂靠</el-button>
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
                                    <img src="@/assets/images/route/ident.png" class="ident" ref="ident" v-if="scope.row.isSnap === 0 && scope.row.flag === '1'">
                                    <img src="@/assets/images/route/copy2.png" class="ident" ref="ident" v-if="scope.row.isSnap === 0 && scope.row.flag === '4'">
                                    <img src="@/assets/images/route/calllse.png" class="calllse" ref="identp" v-show="scope.row.isSnap === 1">
                                    <span style='padding-left:10px'>
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
                                min-width="50px"
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
                                min-width="50px"
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
                                min-width="50px"
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
                                    <span>{{scope.row.isPol === ''?'':Number(scope.row.isPol) === 0?'√':''}}</span>
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
                                    <span>{{scope.row.isPol === ''?'':Number(scope.row.isPol) === 1?'√':''}}</span>
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
                    <!-- <li class="routeLi">
                            <div class="title">
                                <span>中转航线</span>
                            </div>
                            <el-table
                                :data="tableTransitRouteData"
                                style="width: 100%;"
                                :header-cell-style="{background:'#3bafda',color:'#ffffff'}"
                                :row-class-name="tabRowClassName"
                                tooltip-effect="dark"
                                ref="table"
                            >
                                <el-table-column prop="portCode" label="序号" align="left" :show-overflow-tooltip=true>
                                        
                                </el-table-column>
                                <el-table-column prop="portCode" label="中转港" align="left" :show-overflow-tooltip=true>
                                        
                                </el-table-column>
                                <el-table-column prop="portCode" label="中转航线" align="left" :show-overflow-tooltip=true>
                                        
                                </el-table-column>
                            </el-table>
                    </li>-->
                    <li class="routeLi" v-if="this.dialogStatus !== '复制' && this.isDongT !== 'true'">
                        <div class="title">
                            <span>动态船舶</span>
                        </div>
                        <el-table
                            :data="tableDynamicShipData"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="table"
                        >
                            <el-table-column
                                prop="index"
                                label="序号"
                                align="left"
                                width="50"
                                :show-overflow-tooltip="true"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.index+1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="vessel"
                                label="船名"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="100"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="carrierName"
                                label="运营方"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="100"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="imoNumber"
                                label="IMO"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="100"
                            >
                            </el-table-column>
                            <!-- <el-table-column prop="imoNumber" label="箱量" align="left" :show-overflow-tooltip=true>
                                                
                            </el-table-column>-->
                            <el-table-column prop="voyage" label="航次" align="left" width="300">
                                <template slot-scope="scope">
                                    <span
                                        class="voyageClass"
                                        v-for="item in (scope.row.voyage)"
                                        :key="item"
                                        @click="tableShipChange(item,scope.row.vessel)"
                                    >
                                        {{item}}
                                    </span>
                                </template>
                                <!-- <el-link type="primary">主要链接</el-link> -->
                            </el-table-column>
                        </el-table>
                    </li>
                    <li class="routeLi" v-if="this.dialogStatus !== '复制' && this.isDongT !== 'true'">
                        <div>
                            <div class="title">
                                <span>航线预警</span>
                            </div>
                            <span class="voyageOrVessel">{{"船名航次：" + voyageOrVessel}}</span>
                        </div>

                        <el-table
                            :data="tableRouteWarningData"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="table"
                        >
                            <el-table-column
                                prop="id"
                                label="序号"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="50"
                            >
                                <template slot-scope="scope">{{scope.$index +1}}</template>
                            </el-table-column>
                            <el-table-column
                                prop="port"
                                label="挂靠港"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="static"
                                label="固定ETD/ETA"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="dynamic"
                                label="动态ETD/ETA"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="warning"
                                label="预警信息"
                                align="left"
                                :show-overflow-tooltip="true"
                                min-width="120"
                            >
                                <template slot-scope="scope">
                                    <span :class="scope.row.warning === '准点'?'':'redclass'">{{scope.row.warning}}</span>
                                </template>
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
    </div>
</template>

<script>
    import qs from "qs";
    import routeManageInnerAdd from "./routeDetailAdd.vue";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props: [
            "dialogStatus", 
            "rowId",
            "isDongT"
        ],
        data() {
            return {
                isLoading: true,
                dialogInnerStatus: "",
                dialogAddInnerVisible: false,
                addOrEdit: "",
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
                    displayName: ""
                    // commonCabinRoute : '',
                },
                staticId: '',
                commonCabinRouteList: [],
                companyNameList: [],
                dockingArray: [],
                multipleSelection:[],
                tableTransitRouteData: [],
                tableDynamicShipData: [],
                tableRouteWarningData: [],
                tablePortruleForm: {},
                rowIndex: 0,
                delectDocking: [],
                inputValue: '',
                innerHeight: '',
                lineCodeList: []
            };
        },
        components: {
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
                            // this.dockingArray = res.data.content.dockingPort;
                            this.tableDynamicShipData = res.data.content.dynamicVessel;
                            this.ruleForm.companyName = res.data.content.routeInfo.carrier;
                            this.ruleForm.scac = res.data.content.routeInfo.scac;
                            this.ruleForm.route = res.data.content.routeInfo.routeParent;
                            this.ruleForm.service = res.data.content.routeInfo.routeNameEn;
                            this.ruleForm.routeCode = res.data.content.routeInfo.routeCode;
                            this.ruleForm.displayName = res.data.content.routeInfo.displayName
                            if(res.data.content.routeInfo.isMerge == 1 || res.data.content.schedulesCount > 1){
                                this.isMerge = true
                            }
                            if (res.data.content.dynamicVessel.length > 0) {
                                let vessel = res.data.content.dynamicVessel[0].vessel;
                                let voyageArry = res.data.content.dynamicVessel[0].voyage;
                                if(voyageArry.length > 0){
                                    let voyage = res.data.content.dynamicVessel[0].voyage;
                                    let obj = voyage.find(item => {
                                        return item.indexOf("当前") != -1;
                                    });
                                    let str = obj.substring(0, obj.indexOf("("));
                                    this.voyageOrVessel = vessel + "/" + str;
                                    this.tableShipChange(obj, vessel);
                                }else{
                                    this.voyageOrVessel = vessel;
                                    this.isLoading = false;
                                }
                            }else{
                                this.isLoading = false;
                            }
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            this.isLoading = false;
                        }
                });
            },
            //保存
            async handleSaveClick(ruleForm) {
                try {
                    let valid = await this.$refs[ruleForm].validate();
                    if (!valid) return;
                    this.$confirm("<div class = 'line'></div></br><span>确认保存吗?</span>","提示",
                    {
                        cancelButtonClass: "btnCustomCencel",
                        confirmButtonClass: "btnCustomSubmit",
                        customClass: "customClass",
                        dangerouslyUseHTMLString: true
                    }).then(_ => {
                        let dockingArray = this.dockingArray.concat(this.delectDocking)
                        let query = {
                            routeCode: this.ruleForm.routeCode,
                            routeNameEn: this.ruleForm.service,
                            routeParent: this.ruleForm.route,
                            scac: this.ruleForm.scac,
                            displayName: this.ruleForm.displayName,
                            dockingArray: dockingArray
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
                                    return;
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            });
                        } else if(this.dialogStatus === "修改") {
                        // 修改航线
                            query["id"] = this.rowId;
                            this.$axios.post(this.commonJs.localUrl + `/schedules/route/update`, query, {
                                headers: {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token")
                                }
                                }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("updatManage");
                                    this.$message({
                                        type: "success",
                                        message: res.data.message
                                    });
                                    this.handleCloseClick();
                                } else if (res.data.status == 3) {
                                    this.$message({
                                        type: "error",
                                        message: "航线代码已存在"
                                    });
                                    return;
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            });
                        }else if(this.dialogStatus === "复制"){
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
                this.$confirm("<div class = 'line'></div></br><span>是否确认删除？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoadings = true;
                    this.dockingArray = this.dockingArray.filter(items => {
                        if (!val.includes(items)) return items;
                    })
                    if(this.dialogStatus === "复制"){
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
                    this.$confirm("<div class = 'line'></div></br><span>是否取消临时挂靠？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
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
                    this.$confirm("<div class = 'line'></div></br><span>是否设置临时挂靠？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
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
                    this.$confirm("<div class = 'line'></div></br><span>是否取消临时挂靠？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
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
                        if (
                            parseInt(value.portNumber) ===
                            parseInt(this.dockingArray[i].portNumber)
                        ) {
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
                    this.$refs.routeManageInner.ruleForm.isPol = 1;
                    this.$refs.routeManageInner.ruleForm.newIsPol = "POD";
                } else {
                    for (var i = 0; i < this.dockingArray.length; i++) {
                        if (i === this.rowIndex) {
                            continue;
                        }
                        if (
                            parseInt(value.portNumber) ===
                            parseInt(this.dockingArray[i].portNumber)
                        ) {
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
                this.rowIndex = row.index;
                this.dialogAddInnerVisible = true;
                this.dialogInnerStatus = "修改";
                this.tablePortruleForm = row;
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
            //复制 请求挂靠港
            copySearchList() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryPortByRouteId?id=${this.rowId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.dockingArray = res.data.content
                        this.isLoading = false;
                    }else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        this.isLoading = false;
                    }
                })
            },
        },
        mounted() {
            // var windowInnerHeight = document.body.clientHeight
            if (this.dialogStatus === "新增") {
                this.addOrEdit = "新增";
                this.isLoading = false;
                this.companyDisabled = false;
            } else if (this.dialogStatus === "修改") {
                this.addOrEdit = "修改";
                this.getCommonCabinRoute();
                this.searchList();
                this.copySearchList();
                this.companyDisabled = true;
            }else if (this.dialogStatus === "复制") {
                this.addOrEdit = "复制";
                this.copySearchList();
            }
        },
        updated() {
            var height = document.body.clientHeight - 80
            if(document.querySelector('.scrollDiv').offsetHeight > height){
                this.innerHeight = height  + 'px'
            }
        },
        destroyed() {
            window.removeEventListener("resize", this.getWidth);
        }
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
    .scrollDiv{
        overflow-y: auto;
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
</style>