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
            <label class="headeraddOrEdit">{{addOrEdit}}</label>
            <i class="headeraddOrEditClose el-icon-close lr" @click="closePath"></i>
        </div>
            <div :style="{maxHeight: innerHeight}"  class="scrollDiv">
                <ul class="routeUl">
                    <li class="routeLi">
                        <div class="title">
                            <span>基础信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item prop="pol" label="起运港:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.pol ? this.ruleForm.pol : ''">{{this.ruleForm.pol ? this.ruleForm.pol : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="polCode" label="起运港五字码:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.polCode ? this.ruleForm.polCode : ''">{{this.ruleForm.polCode ? this.ruleForm.polCode : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="polTerminal" label="起运港码头:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.polTerminal ? this.ruleForm.polTerminal : ''">{{this.ruleForm.polTerminal ? this.ruleForm.polTerminal : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="onTime" label="历史准班率:" class="el_formContent">
                                    <span class='colSpan'>-</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item prop="pod" label="目的港:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.pod ? this.ruleForm.pod : ''">{{this.ruleForm.pod ? this.ruleForm.pod : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="podCode" label="目的港五字码:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.podCode ? this.ruleForm.podCode : ''">{{this.ruleForm.podCode ? this.ruleForm.podCode : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="podTerminal" label="目的港码头:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.podTerminal ? this.ruleForm.podTerminal : ''">{{this.ruleForm.podTerminal ? this.ruleForm.podTerminal : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="stop" label="停航率:" class="el_formContent">
                                    <span class='colSpan'>-</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item prop="carrier" label="船公司:" class="el_formContent" :rules="[{ required: true, message: '请选择船公司', trigger: 'blur'}]">
                                    <!-- <span class='colSpan' :title="this.ruleForm.carrier ? this.ruleForm.carrier : ''">{{this.ruleForm.carrier ? this.ruleForm.carrier : '-'}}</span> -->
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
                                        :disabled="isTrue"
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
                                <el-form-item prop="etd" label="ETD:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.etd ? commonJs.getMounthDay(this.ruleForm.etd.toUpperCase()) : ''">{{this.ruleForm.etd ? commonJs.getMounthDay(this.ruleForm.etd.toUpperCase()) : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="transitTime" label="动态总航程:" class="el_formContent">
                                    <span class='colSpan'>{{ruleForm.transitTime ? ruleForm.transitTime : '-'}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="companyName" label="路径数:" class="el_formContent">
                                    <span class='colSpan'>{{this.ruleForm.transitCount == 1 ? '直达' : this.ruleForm.transitCount == 2 ? '2程' : this.ruleForm.transitCount == 3 ? '3程' : this.ruleForm.transitCount == 4 ? '4程' : '-'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item prop="state" label="状态:" class="el_formContent" :rules="[{ required: true, message: '请选择状态', trigger: 'blur'}]">
                                    <el-select
                                        v-model="ruleForm.state"
                                        style="width:100%;"
                                        placeholder="请选择"
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
                                <el-form-item prop="type" label="类型:" class="el_formContent">
                                    <span class='colSpan'>人工</span>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="editTransitTime" label="人工总航程:" class="el_formContent">
                                    <el-input v-model="ruleForm.editTransitTime" placeholder="请输入" clearable @input="ruleForm.editTransitTime = ruleForm.editTransitTime.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item prop="lineCount" label="LINE程:" class="el_formContent">
                                    <span class='colSpan'>{{this.ruleForm.lineCount}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title lf">
                            <span>路径详情</span>
                        </div>
                        <el-button size="small" class="clickColor" @click="addRouter">新增</el-button>
                        <el-button size="small" class="clickColor abnormal" @click="delectRouter">删除</el-button>
                        <el-table
                            :data="pathDetails"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="table"
                            @selection-change="selecRoute"
                            @row-dblclick="tabRouteChange"
                        >
                            <el-table-column
                                type="selection"
                                width="45"
                            >
                            </el-table-column>
                            <el-table-column prop="" label="序号" align="left" :show-overflow-tooltip="true" min-width="50">
                                <template slot-scope="scope">
                                    <span>{{scope.row.index + 1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="transitType" label="运输方式" align="left" :show-overflow-tooltip="true" min-width="110">
                                
                            </el-table-column>
                            <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="170">
                                
                            </el-table-column>
                            <el-table-column prop="polTerminal" label="起运港码头" align="left" :show-overflow-tooltip="true" min-width="120">
                                
                            </el-table-column>
                            <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="170">
                                
                            </el-table-column>
                            <el-table-column prop="podTerminal" label="目的港码头" align="left" :show-overflow-tooltip="true" min-width="120">
                               
                            </el-table-column>
                            <el-table-column prop="disPlayName" label="航线代码(显示)" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <span :class= "scope.row.routeCode &&  scope.row.routeCode !== 'UNDEFINED' ? 'voyageClass' : ''" @click="appearRout(scope.row)">{{scope.row.disPlayName &&  scope.row.disPlayName !== "UNDEFINED" ? scope.row.disPlayName : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="etd" label="ETD" align="left" :show-overflow-tooltip="true" min-width="90">
                                <template slot-scope="scope">
                                    <span>{{scope.row.etd ? commonJs.getMounthDay(scope.row.etd.toUpperCase()) : '' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="eta" label="ETA" align="left" :show-overflow-tooltip="true" min-width="90">
                                <template slot-scope="scope">
                                    <span>{{scope.row.eta ? commonJs.getMounthDay(scope.row.eta.toUpperCase()) : '' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="transitTime" label="航程" align="left" :show-overflow-tooltip="true" min-width="90">
                                
                            </el-table-column>
                            <template slot="empty">
                                <div class="dataPage" :style="{width: dataWidth + 'px'}">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                    <li class="routeLi" v-if="isAripty">
                        <div class="title lf">
                            <span>航线共舱信息</span>
                        </div>
                        <el-table
                            :data="samePathList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="table"
                        >
                            <el-table-column prop="type" label="类型" align="left" :show-overflow-tooltip="true" width="200">
                                <template slot-scope="scope">
                                    <span>{{scope.row.type}}</span>
                                    <span v-if="scope.row.type == '该路径常规共舱'" class="pathRecover" @click="pathRecover()">恢复</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="companyInfor" label="共舱船公司（航线）信息" align="left" min-width="700">
                                <template slot-scope="scope">
                                   <ul class='comRoutUl' v-if="scope.row.isUpdate == '0'">
                                       <li v-for="(item,index) in scope.row.companyInfor" class='comRoutLi' :key="index"><span @click="updaComRout(item,scope.row.isClick)" class='routP'>{{scope.row.isRoute == '1' ? (item.carrier+'('+ item.displayName +')' + item.affectWeek) : (item.carrier+'('+ item.routeCode +')' + item.affectWeek)}}</span><span v-if="index !== scope.row.companyInfor.length-1">/</span></li>
                                   </ul>
                                   <ul class='portRoute' v-if="scope.row.isUpdate == '1'">
                                    <li
                                        v-for="(item,index) in scope.row.companyInfor"
                                        :key="index"
                                        :title="item.carrier+'('+item.routeCode+')' + item.affectWeek"
                                        class="comRoutLi"
                                        :style="item.isNew == 1 ? 'margin-left:30px' : 'margin-left:5px'"
                                    >
                                        <img src="@/assets/images/route/ident.png" class="newIdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="scope.row.isRoute == '1' ? (item.carrier+'('+ item.displayName +')' + item.affectWeek) : (item.carrier+'('+ item.routeCode +')' + item.affectWeek)">{{scope.row.isRoute == '1' ? (item.carrier+'('+ item.displayName +')' + item.affectWeek) : (item.carrier+'('+ item.routeCode +')' + item.affectWeek)}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click="delRout(scope.row.companyInfor,item,scope.row.type)"></i>
                                    </li>
                                   </ul>
                                </template>
                            </el-table-column>
                            <template slot="empty">
                                <div class="dataPage" :style="{width: dataWidth + 'px'}">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                    <li class="routeLi" v-if="isAripty">
                        <div class="title">
                            <span>动态船舶</span>
                        </div>
                            <el-button size="small" class="clickColor" @click="addShip" v-if="isAddShip">新增</el-button>
                            <!-- v-if="isAddShip" -->
                            <el-button size="small" class="clickColor abnormal" @click="delectShip">删除</el-button>
                        <el-table
                            :data="dynamicList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabColClassName"
                            tooltip-effect="dark"
                            ref="tableDynamic"
                            @selection-change="selectShip"
                            @row-dblclick="dnyamicChange"
                            :default-expand-all=false
                        >
                            <el-table-column
                                type="selection"
                                width="45"
                            >
                            </el-table-column>
                            <el-table-column prop="weekNo" label="周序号" align="left" :show-overflow-tooltip="true" width="80" fixed>
                                <template slot-scope="scope">
                                    <!-- <span>{{currentYear + '-' + scope.row.weekNo}}</span> -->
                                    <span>{{scope.row.weekNo}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pathTitle" label="路段" align="left" :show-overflow-tooltip="true" width="50" fixed>
                                <template>
                                    <span>头程</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expandChange" label="" align="left" :show-overflow-tooltip="true" width="50" fixed>
                                <template slot-scope="scope">
                                    <span style="color:#3bafda;cursor: pointer;user-select: none" @click.stop="toogleExpand(scope.row)" v-if="pathDetails.length > 1">{{scope.row.expandChange ? '收起' : '展开'}}</span>
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="vessel" label="船名" align="left" :show-overflow-tooltip="true" width="140" fixed>
                                
                            </el-table-column>
                            <el-table-column prop="voyage" label="航次" align="left" :show-overflow-tooltip="true" width="120" fixed>
                                
                            </el-table-column>
                            <el-table-column prop="sameRoute" label="共舱" align="left" :show-overflow-tooltip="true" width="80">
                                <template slot-scope="scope" v-if="scope.row.sameRoute">
                                    <el-popover trigger="hover" placement="right" @show="getVessel(scope.row.sameRoute)" ref="popover" style="cursor: pointer;">
                                        <table border="0" class="vesselTable">
                                            <tr v-for="item in getVesseTitle" :key="item.routeCode">
                                                <th>{{item.carrier}}</th>
                                                <th>{{item.routeCode}}</th>
                                            </tr>
                                            <tr v-for="(item,index) in getVesselList" :key="index">
                                                <td><span class="routeCode">{{item.carrier}}</span></td>
                                                <td>{{item.routeCode}}</td>
                                            </tr>
                                        </table>
                                        <div slot="reference" class="name">
                                            <span>{{ scope.row.sameRoute.length }}</span>
                                        </div>
                                    </el-popover>
                                </template>
                                <template v-else>
                                    <span>-</span>
                                </template>                
                            </el-table-column>
                            <el-table-column prop="carrier" label="网站显示" align="left" :show-overflow-tooltip="true" width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.carrier ? scope.row.carrier : ruleForm.carrier}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="staticEtd" label="ETD-静态" align="left" :show-overflow-tooltip="true" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.staticEtd ? getDateTime(scope.row.staticEtd) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="etd" label="ETD-动态" align="left" :show-overflow-tooltip="true" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.etd ? getDateTime(scope.row.etd) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="atd" label="ATD" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.atd ? getDateTime(scope.row.atd) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="staticEta" label="ETA-静态" align="left" width="130" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <span>{{scope.row.staticEta ? getDateTime(scope.row.staticEta) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="eta" label="ETA-动态" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.eta ? getDateTime(scope.row.eta) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ata" label="ATA" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.ata ? getDateTime(scope.row.ata) : ''}}</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="vgmCutoff" label="截VGM" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.vgmCutoff ? getDateTime(scope.row.vgmCutoff) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cyCutOff" label="截关" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.cyCutOff ? getDateTime(scope.row.cyCutOff) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="manIfEstCutoff" label="截AMS/ENS" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.manIfEstCutoff ? getDateTime(scope.row.manIfEstCutoff) : ''}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="siCutOff" label="截SI" align="left" width="130">
                                <template slot-scope="scope">
                                    <span>{{scope.row.siCutOff ? getDateTime(scope.row.siCutOff) : ''}}</span>
                                </template>
                            </el-table-column> -->
                            <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true" width="142">
                                
                            </el-table-column>
                            <el-table-column prop="warning" label="ETD预警" align="left" :show-overflow-tooltip="true" width="70">
                                <template slot-scope="scope">
                                    <span>{{scope.row.warning}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand" align="left" v-if="pathDetails.length > 1" width="1">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.additLeg.length > 0">
                                        <el-table :data="scope.row.additLeg" :show-header=false class="tes_table" @row-dblclick="dnyChilder(scope.row)">
                                            <el-table-column type="selection" width="45">
                                            </el-table-column>
                                            <el-table-column prop="weekNo" label="周序号" align="left" :show-overflow-tooltip="true" width="80">
                                                <template>
                                                    <span></span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="f" label="路段" align="left" :show-overflow-tooltip="true" width="50">
                                                <template slot-scope="scope">
                                                    <span>{{(scope.$index + 1) == 1 ? '2程' : (scope.$index + 1) == 2 ? '3程' : (scope.$index + 1) == 3 ? '4程' : ''}}</span>
                                                </template>                                           
                                            </el-table-column>
                                            <el-table-column prop="" label="" align="left" :show-overflow-tooltip="true" width="50">
                                            </el-table-column>
                                            <el-table-column prop="vessel" label="船名" align="left" :show-overflow-tooltip="true" width="140">
                                                
                                            </el-table-column>
                                            <el-table-column prop="voyage" label="航次" align="left" :show-overflow-tooltip="true" width="120">
                                                
                                            </el-table-column>
                                            <el-table-column prop="sameRoute" label="共舱" align="left" :show-overflow-tooltip="true" width="80">
                                                <template slot-scope="scope" v-if="scope.row.sameRoute">
                                                    <el-popover trigger="hover" placement="right" @show="getVessel(scope.row.sameRoute)" ref="popover" style="cursor: pointer;">
                                                        <table border="0" class="vesselTable">
                                                            <tr v-for="item in getVesseTitle" :key="item.routeCode">
                                                                <th>{{item.carrier}}</th>
                                                                <th>{{item.routeCode}}</th>
                                                            </tr>
                                                            <tr v-for="(item,index) in getVesselList" :key="index">
                                                                <td><span class="routeCode">{{item.carrier}}</span></td>
                                                                <td>{{item.routeCode}}</td>
                                                            </tr>
                                                        </table>
                                                        <div slot="reference" class="name">
                                                            <span>{{ scope.row.sameRoute.length }}</span>
                                                        </div>
                                                    </el-popover>
                                                </template>    
                                                <template v-else>
                                                    <span>-</span>
                                                </template>                
                                            </el-table-column>
                                            <el-table-column prop="carrier" label="网站显示" align="left" :show-overflow-tooltip="true" width="100">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.carrier ? scope.row.carrier : ruleForm.carrier}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="staticEtd" label="ETD-静态" align="left" :show-overflow-tooltip="true" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.staticEtd ? getDateTime(scope.row.staticEtd) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="etd" label="ETD-动态" align="left" :show-overflow-tooltip="true" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.etd ? getDateTime(scope.row.etd) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="atd" label="ATD" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.atd ? getDateTime(scope.row.atd) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="staticEta" label="ETA-静态" align="left" width="130" :show-overflow-tooltip="true">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.staticEta ? getDateTime(scope.row.staticEta) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="eta" label="ETA-动态" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.eta ? getDateTime(scope.row.eta) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="ata" label="ATA" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.ata ? getDateTime(scope.row.ata) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <!-- <el-table-column prop="vgmCutoff" label="截VGM" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.vgmCutoff ? getDateTime(scope.row.vgmCutoff) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="cyCutOff" label="截关" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.cyCutOff ? getDateTime(scope.row.cyCutOff) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="manIfEstCutoff" label="截AMS/ENS" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.manIfEstCutoff ? getDateTime(scope.row.manIfEstCutoff) : ''}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="siCutOff" label="截SI" align="left" width="130">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.siCutOff ? getDateTime(scope.row.siCutOff) : ''}}</span>
                                                </template>
                                            </el-table-column> -->
                                            <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true" width="142">
                                                
                                            </el-table-column>
                                            <el-table-column prop="warning" label="ETD预警" align="left" :show-overflow-tooltip="true" width="70">
                                                
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </template> 
                            </el-table-column>
                            <template slot="empty">
                                <div class="dataPage" :style="{width: dataWidth + 'px'}">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <!-- <el-button class="saveBtn" @click="handleSaveClick()">{{missionCount > 0 ? "保存并同步" : '保存'}}</el-button> -->
                    <el-button class="saveBtn" @click="handleSaveClick('保存并同步')" v-if="isTong">保存并同步</el-button>
                    <el-button class="saveBtn" @click="handleSaveClick('保存')" v-else>保存</el-button>
                </div>
            </div>
        </el-form>
        <el-dialog
            class="dialogAddPtah"
            :visible.sync="dialogAddPtah"
            v-if="dialogAddPtah"
            width="660px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <addPtah
                :routeTitle="routeTitle"
                :pathRoute="pathRoute"
                :portDesti="portDesti"
                @closePathRouter="closePathRouter"
                :scac="this.ruleForm.scac"
                @pathValue="pathValue"
                ref="routeManageInner"
            >
            </addPtah>
        </el-dialog>
        <el-dialog
            class="dialogShipDyname"
            :visible.sync="dialogShipDyname"
            v-if="dialogShipDyname"
            width="1150px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <shipDyname
                :shipTitle="shipTitle"
                :pathNumber="pathNumber"
                :tesEtd="tesEtd"
                :tesEta="tesEta"
                @shipValue="shipValue"
                :shipRow="shipRow"
                @closeship="closeship"
                ref="shipDyname"
            >
            </shipDyname>
        </el-dialog>
        <el-dialog
            class="routeAtta"
            :visible.sync="routeAtta"
            v-if="routeAtta"
            ref="routeAtta"
            width="80%"
            top="0"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <routeDetail
                :dialogStatus="routeText"
                :rowId="routeId"
                :withArry="withArry"
                :code="code"
                :isText="isText"
                @handleClose="handleClose"
                @updatManage="manageUpdat"
                @artifi="artifi"
                isDongT="true"
            >
            </routeDetail>
        </el-dialog>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    import addPtah from "./addPtah.vue";
    import shipDyname from "./shipDyname.vue";
    import routeDetail from "../route/routeManageAdd.vue";
    import RouteMap from '@/components/RouteMap/RouteMap'
    import api from '@/components/RouteMap/api'
    export default {
        props: [
            "pathTitle",
            "rowId",
            "gcId",
            "isAripty",
            "async"
            ],
        data() {
            return {
                dataWidth: '',
                innerHeight: '',
                screenHeight: '',
                screenWidth: document.body.clientWidth, // 设置默认值
                addOrEdit: "", // 新增 修改
                isLoading: true, //Loading
                isTong: true, //是否同步
                ruleForm:{
                    id:"", // 路径id（跟取详情的id一样）
                    gcId: "", // 头程第一段共舱id
                    etd: "", // 头程第一段ETD
                    carrier: "", // 船公司
                    scac: '', // 船公司五子码
                    pol:"",// 起始港
                    pod:"",// 目的港
                    polCode: "", // 起始港五字码
                    podCode: "", // 目的港五字码
                    polId:'',//起始港Id
                    podId:'',//目的港Id
                    polCityId:'',//起始港Id
                    podCityId:'',//目的港Id
                    polTerminal: '',//起始港码头
                    polTerminalId: '',//起始港码头ID
                    podTerminal: '',//目的港码头ID
                    podTerminalId: '',//目的港码头
                    transitCount:'',//路径数
                    transitTime:'',
                    editTransitTime: '',
                    gcCount:'', //共舱数量
                    state: 0, //状态
                    type: 1, //类型
                    vId:0 ,// 默认穿0,
                    onTime:0,// 默认穿0,
                    stop:0,// 默认穿0,
                    missCount:0,// 默认穿0,
                    totalCount:0,// 默认穿0,
                },
                headRoute:{ //头程航线信息 查询共舱数据
                    staticId: '',
                    polCode: '',
                    podCode: '',
                },
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
                        label: "屏蔽中"
                    },
                ],
                typeL: '',
                missionCount: 0,
                currentYear: '',
                isTrue: false,
                //路径详情
                routePathList: [],
                dialogAddPtah: false,
                routeTitle: '',
                pathRoute: '',
                pathIndex: '',
                pathDetails: [],//路径详情 页面显示的
                delecPathList: [], //删除的路径详情
                portDesti: [], //最后一段的目的港信息
                //航线详情
                routeAtta: false,
                routeId: '', //航线挂靠港详情页ID
                routeText: '',//航线挂靠港详情页Text
                withArry: [],//给挂靠港口带的无五子码的数组
                code: [],
                isText: '人工路径详情',
                isIndex: '',
                //动态船舶详情
                dialogShipDyname: false,
                shipTitle: '',
                shipPathList:[],
                companyNameList: [], //船公司
                isAddShip: false,
                dynamicList: [], //动态船舶信息
                pathNumber: 0,
                shipArry: [],
                shipRow: [],
                shipIndex: '',
                wholeDelect: [], //整个删除 并且有id
                tesEtd: '', //头程第一段ETD
                tesEta: '', //头程第一段ETA
                ///共舱详情
                getVesselList: [], //共舱列表
                getVesseTitle: [], //共舱标题
                samePathList: [], //航线共舱信息
                commonIdsInner: [],//常规共舱
                isLine : false, //头程是否海运
                ovtIdsInner: [],//临时共舱
            };
        },
        components: {
            loading,
            RouteMap,
            addPtah,
            shipDyname,
            routeDetail
        },
        methods: {
            //取路径详情
            pathDetail(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/getNewPath?id=${this.rowId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.isLoading = false
                        this.pathDetails = res.data.content.pathList
                        this.ruleForm.id = res.data.content.id // 路径id（跟取详情的id一样）
                        this.ruleForm.carrier = res.data.content.carrier // 船公司
                        this.ruleForm.scac = res.data.content.scac // 船公司五子码
                        this.ruleForm.state = res.data.content.state //状态
                        if(res.data.content.state == 3){
                            this.stateList = [
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
                            ]
                        }
                        this.ruleForm.lineCount = res.data.content.lineCount
                        this.typeL = res.data.content.type //
                        this.missionCount = res.data.content.missionCount //

                        setTimeout(()=>{
                            this.ruleForm.etd = res.data.content.etd // 头程第一段ETD
                            this.ruleForm.pol = res.data.content.pol // 起始港
                            this.ruleForm.pod = res.data.content.pod // 目的港
                            this.ruleForm.polCode = res.data.content.polCode // 起始港五字码
                            this.ruleForm.podCode = res.data.content.podCode // 目的港五字码
                            this.ruleForm.polCityId = res.data.content.polCityId //起始港Id
                            this.ruleForm.podCityId = res.data.content.podCityId //目的港Id
                            this.ruleForm.transitCount = res.data.content.transitCount //路径数
                            this.ruleForm.transitTime = res.data.content.transitTime
                            this.ruleForm.editTransitTime = res.data.content.editTransitTime
                            this.ruleForm.gcId = res.data.content.gcId // 头程第一段共舱id
                            this.ruleForm.gcCount = res.data.content.gcCount //共舱数量
                            this.ruleForm.polTerminal = res.data.content.polTerminal //起始港码头
                            this.ruleForm.podTerminal = res.data.content.podTerminal //目的港码头
                        },500)
                        //动态船舶的数据 全局监听
                        this.shipArry = res.data.content.dynamicList
                        
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
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
                        this.companyNameList = res.data.content
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
                        this.companyNameList = res.data.content
                    }
                })
            },
            //船公司change事件
            companyNameChange(value){
                if(value === ''){
                    this.ruleForm.scac = ''
                }else{
                    for (let i = 0; i < this.companyNameList.length; i++) {
                        if(this.companyNameList[i].companyName === value){
                            this.ruleForm.scac = this.companyNameList[i].scac
                        }
                    }
                }    
            },
            //选择路径详情
            selecRoute(val){
                this.routePathList = val
            },
            //新增路径
            addRouter(){
                if(this.ruleForm.carrier){
                    if(this.pathDetails.length > 3){
                        this.$message({
                            type: "error",
                            message: "路径最多4程"
                        });
                    }else{
                        this.routeTitle = '新增'
                        this.dialogAddPtah = true
                        this.portDesti = []
                        if(this.pathDetails.length > 0){ //需要带
                            this.portDesti = [{
                                pod : this.pathDetails[this.pathDetails.length - 1].pod, // 最后一段的目的港
                                podCode : this.pathDetails[this.pathDetails.length - 1].podCode, // 最后一段的目的港五字码
                                podId : this.pathDetails[this.pathDetails.length - 1].podId, //最后一段的目的港Id
                                podCityId : this.pathDetails[this.pathDetails.length - 1].podCityId, //最后一段的目的港Id
                                podTerminal : this.pathDetails[this.pathDetails.length - 1].podTerminal, //最后一段的目的港码头
                                podTerminalId : this.pathDetails[this.pathDetails.length - 1].podTerminalId, //最后一段的目的港码头
                            }]
                        }
                    }
                }else{
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                }
            },
            //双击路径
            tabRouteChange(row){
                this.routeTitle = '修改'
                this.dialogAddPtah = true
                this.pathRoute = row
                this.pathIndex = row.index
                this.portDesti = []
                if(this.pathIndex > 0){ //需要带
                    this.portDesti = [{
                        pod : this.pathDetails[this.pathIndex - 1].pod, // 最后一段的目的港
                        podCode : this.pathDetails[this.pathIndex - 1].podCode, // 最后一段的目的港五字码
                        podId : this.pathDetails[this.pathIndex - 1].podId, //最后一段的目的港Id
                        podCityId : this.pathDetails[this.pathIndex - 1].podCityId, //最后一段的目的港Id
                        podTerminal : this.pathDetails[this.pathIndex - 1].podTerminal, //最后一段的目的港码头
                        podTerminalId : this.pathDetails[this.pathIndex - 1].podTerminalId, //最后一段的目的港码头
                    }]
                }
            },
            //路径传过来的值
            pathValue(value){
                if (this.routeTitle === "新增") {
                    // for (var i = 0; i < this.pathDetails.length; i++) {
                    //     if (parseInt(value.order) === parseInt(this.pathDetails[i].order)) {
                    //         this.$message({
                    //             type: "error",
                    //             message: "已有重复数据"
                    //         });
                    //         return;
                    //     }
                    // }
                    this.pathDetails.push(JSON.parse(JSON.stringify(value)))
                    this.changShip('','新增')
                } else {
                    // for (var i = 0; i < this.pathDetails.length; i++) {
                    //     if (i === this.pathIndex) {
                    //         continue;
                    //     }
                    //     if (parseInt(value.order) === parseInt(this.pathDetails[i].order)) {
                    //         this.$message({
                    //             type: "error",
                    //             message: "已有重复数据"
                    //         });
                    //         return;
                    //     }
                    // }
                    this.pathDetails.splice(
                        this.pathIndex,
                        1,
                        JSON.parse(JSON.stringify(value))
                    );
                }
                this.dialogAddPtah = false
            },
            //关闭路径
            closePathRouter(){
                this.dialogAddPtah = false
            },
            //删除路径
            delectRouter(){
                var val = this.routePathList
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
                    this.pathDetails = this.pathDetails.filter(items => {
                        if (!val.includes(items)) return items;
                    })
                    val.forEach((item,index)=>{
                        if(item.id){
                            item.delFlag = 1
                            this.delecPathList.push(item)
                        }
                    })

                    //这里我还要处理动态船舶的新增和删除
                    this.changShip(val,'删除')
                }).catch(_ => {});
            },
            //路径改变 比如增删改查了 那动态船舶也要跟着改
            changShip(val,nature){
                if(nature == '新增'){
                    //若是动态船舶有值  说明之前添加了动态船舶
                    //此时新增路径 则往后添加程
                    for (let p = 0; p < this.shipArry.length; p++) { //循环每一组
                        var ship = this.shipArry[p] // 每一组里面的每一个数组 往此数组里 push 一个空对象
                        var week = this.shipArry[p][0].weekNo
                        ship.push({
                            id: '',
                            delFlag: 0,
                            weekNo:week,// 周次
                            vessel: "",//船名
                            voyage: "",//航次
                            staticEtd: "",//静态etd （都是正常时间戳即可）
                            staticEta: "",//静态eta
                            etd: "",//离港时间
                            eta: "",//到港时间
                            atd: "",//实际atd
                            ata: "",//实际ata
                            vgmCutoff: "",//截vgm
                            cyCutOff:  "",//截关
                            manIfEstCutoff: "",//截AMS/ENS
                            siCutOff: "",//截SI
                        })
                    }
                }else if(nature == '删除'){
                    if(val.length > 0){ //说明是在删除
                        //动态船舶已经有值了
                        var indexList = []
                        for (let i = 0; i < val.length; i++) {
                            var index = val[i].index
                            indexList.push(index)
                        }
                        indexList.sort(function(a, b) { return b - a}) // indexList索引进行排序
                        for (let p = 0; p < this.shipArry.length; p++) { //循环每一组
                            var ship = this.shipArry[p]
                            indexList.forEach(function(index) { 
                                if(ship.id){ //如果有id 说明是之前保存过的
                                    ship['delFlag'] == 1
                                }else{
                                    ship.splice(index, 1)
                                }
                            }
                        )
                            // indexList.forEach(function(index) { ship.splice(index, 1) })
                        }
                    }
                }
                
            },
            //选择动态船舶详情
            selectShip(val){
                this.shipPathList = val
            },
            //新增动态船舶
            addShip(){
                this.pathNumber = this.pathDetails.length
                this.shipTitle = '新增'
                this.dialogShipDyname = true
            },
            //关闭动态船舶
            closeship(){
                this.dialogShipDyname = false
            },
            //动态船舶传过来的值
            shipValue(value,weekNo){
                if (this.shipTitle === "新增") {
                    // for (var i = 0; i < this.dynamicList.length; i++) {
                    //     if (parseInt(weekNo) === parseInt(this.dynamicList[i].weekNo)) {
                    //         this.$message({
                    //             type: "error",
                    //             message: "已有重复数据"
                    //         });
                    //         return;
                    //     }
                    // }
                        this.shipArry.push(JSON.parse(JSON.stringify(value))) //把数据进行处理
                        this.$refs.shipDyname.restInform()                
                } else {
                    // for (var i = 0; i < this.dynamicList.length; i++) {
                    //     if (i === this.shipIndex) {
                    //         continue;
                    //     }
                    //     if (parseInt(weekNo) === parseInt(this.dynamicList[i].weekNo)) {
                    //         this.$message({
                    //             type: "error",
                    //             message: "已有重复数据"
                    //         });
                    //         return;
                    //     }
                    // }
                    this.shipArry.splice(
                        this.shipIndex,
                        1,
                        JSON.parse(JSON.stringify(value))
                    );
                    this.dialogShipDyname = false
                }
            },
            //删除动态船舶
            delectShip(){
                var val = this.shipPathList
                console.log(this.shipArry,'this.shipArry')
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
                    var indexList = [] //选择的数组
                    for (let i = 0; i < val.length; i++) {
                        var index = val[i].index
                        indexList.push(index)
                    }
                    indexList.sort(function(a, b) { return b - a}) // indexList索引进行排序
                    var suoyin = [] //存放整个数组的索引
                    for (let p = 0; p < this.shipArry.length; p++) {
                        suoyin.push(p)
                    }
                    var c = suoyin.filter(item=> !indexList.includes(item))   //[6]    过滤出suoyin没有包含在indexList里面的元素，放入一个数组
                    var newList = []
                    if(c.length > 0){ //说明有的没有删除 
                        for (let a = 0; a < c.length; a++) {
                            var ii = c[a]
                            newList.push(this.shipArry[ii]) //这里面放的是没有删除的
                        }
                    }

                    //检查删除的里面是否有id  indexList  此地方是整个的删除
                    for (let d = 0; d < indexList.length; d++) {
                        var dd = indexList[d] //这里是 最外层数组this.shipArry
                        var newPP = [] //创建一个空数组
                        for (let v = 0; v < this.shipArry[dd].length; v++) { //当前要删除的数组
                            var pp = (this.shipArry[dd])[v]
                            pp.delFlag = 1 //先让所有对象的delFlag 都为1
                            if(pp.id){ //如果此对象有id 说明之前本身就有
                                newPP.push(pp) //放入数组中
                            }
                        }
                        if(newPP.length > 0){ //说明 删除的数组里 有id
                            //则把整个数组放入 wholeDelect中
                            this.wholeDelect.push(newPP)
                        }
                    }
                    this.shipArry = newList
                }).catch(_ => {});
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
            //双击动态船舶
            dnyamicChange(row){
                this.getShipList(row)
                this.shipTitle = '修改'
                this.dialogShipDyname = true
                this.shipIndex = row.index
            },
            // 双击 二程 三程 4程
            dnyChilder(val){
                this.getShipList(val)
                this.shipTitle = '修改'
                this.dialogShipDyname = true
                this.shipIndex = val.index
            },
            //双击动态船舶时做的事情
            getShipList(val){
                var arry = []
                for (let i = 0; i < val.additLeg.length; i++) {
                    arry.push(val.additLeg[i])
                }
                var first = val
                arry.unshift(first)
                this.shipRow = arry
                this.pathNumber = arry.length
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
            //点击航线代码显示
            appearRout(val){
                if(val.routeCode){
                    this.routeAtta = true
                    this.routeText = '修改'
                    this.routeId = val.staticId
                    this.isIndex = val.index
                }
            },
            //航线代码方返回的数据
            artifi(disPlayName,routeCode){
                this.pathDetails[this.isIndex].disPlayName = disPlayName
                this.pathDetails[this.isIndex].routeCode = routeCode
            },
            //航线共舱信息
            comRouteInfor(sameRoute,commonIds,ovtIds) {
                var convenTank = [] //该路径常规共舱
                // var standard = [] //该路径常规共舱（标准）
                var TemporTank = [] //该路径临时共舱（标准）
                var collectRoute = [] //总航线常规共舱（标准）
                //处理常用共舱
                if(commonIds && commonIds.length > 0){
                    for (let i = 0; i < commonIds.length; i++) {
                        if(commonIds[i].routeCode) {
                            convenTank.push({ //放入该路径常规共舱
                                routeCode: commonIds[i].routeCode ? commonIds[i].routeCode : '-',
                                displayName: commonIds[i].displayName ? commonIds[i].displayName : '-',
                                staticId: commonIds[i].staticId,// 航线id
                                carrier: commonIds[i].carrier, //船公司
                                id:commonIds[i].id,
                                affectWeek: commonIds[i].affectWeek ? (' ' + this.currentYear + '-' + commonIds[i].affectWeek) : '',// 开始应用周数
                                isNew:commonIds[i].isNew, //
                                polCode: commonIds[i].polCode,
                                podCode: commonIds[i].podCode,
                            })
                        }
                        
                    }
                }
                //处理临时共舱
                if(ovtIds && ovtIds.length > 0){
                    for (let i = 0; i < ovtIds.length; i++) {
                        if(ovtIds[i].routeCode) {  //放入该路径临时共舱（标准）
                            TemporTank.push({
                                routeCode: ovtIds[i].routeCode ? ovtIds[i].routeCode : '-',
                                displayName: ovtIds[i].displayName ? ovtIds[i].displayName : '-',
                                staticId: ovtIds[i].staticId,// 航线id
                                carrier: ovtIds[i].carrier, //船公司
                                id:ovtIds[i].id,
                                affectWeek: ovtIds[i].affectWeek ? (' ' + this.currentYear + '-' + ovtIds[i].affectWeek) : '',// 开始应用周数
                                isNew:ovtIds[i].isNew, //
                                polCode: ovtIds[i].polCode,
                                podCode: ovtIds[i].podCode,
                            })
                        }
                        
                    }
                }

                //处理共舱sameRoute
                if(sameRoute.length > 0) {
                    for (let i = 0; i < sameRoute.length; i++) {
                        if(sameRoute[i].routeCode) { //放入总航线常规共舱（标准）
                            collectRoute.push({
                                routeCode: sameRoute[i].routeCode ? sameRoute[i].routeCode : '-',
                                displayName: sameRoute[i].displayName ? sameRoute[i].displayName : '-',
                                staticId: sameRoute[i].staticId,
                                carrier: sameRoute[i].carrier,
                                isNew: sameRoute[i].isNew ? sameRoute[i].isNew : '', //
                                affectWeek: sameRoute[i].affectWeek ? (' ' + this.currentYear + '-' + sameRoute[i].affectWeek) : '',
                                polCode: sameRoute[i].polCode,
                                podCode: sameRoute[i].podCode,
                            })
                        }
                    }
                }
                this.samePathList = [
                    {
                        type: '该路径常规共舱',
                        companyInfor: convenTank,
                        isUpdate:'1', //是否可以编辑 0 不可  1 可
                        isRoute: '0', //是显示route还是displame  0 route  1 displame
                        isClick: '0', //是否可点击 0 不可 1 可
                    },
                    {
                        type: '该路径常规共舱（标准）',
                        companyInfor: convenTank,
                        isUpdate:'0', //是否可以编辑 0 不可  1 可
                        isRoute: '1', //是显示route还是displame  0 route  1 displame
                        isClick: '1',//是否可点击 0 不可 1 可
                    },
                    {
                        type: '该路径临时共舱（标准）',
                        companyInfor: TemporTank,
                        isUpdate:'1', //是否可以编辑 0 不可  1 可
                        isRoute: '1', //是显示route还是displame  0 route  1 displame
                        isClick: '0',//是否可点击 0 不可 1 可
                    },
                    {
                        type: '总航线常规共舱（标准）',
                        companyInfor: collectRoute,
                        isUpdate:'0', //是是否可以编辑 0 不可  1 可
                        isRoute: '1', //是显示route还是displame  0 route  1 displame
                        isClick: '1',//是否可点击 0 不可 1 可
                    },
                ]
            },
            //恢复共舱
            pathRecover(){
                if(this.pathDetails.length > 0){
                    var polCode = this.pathDetails[0].polCode
                    var podCode = this.pathDetails[0].podCode
                    var staticId = this.pathDetails[0].staticId
                    this.$axios.get(this.commonJs.localUrl + `/schedules/path/recoverCabin?gcId=${this.ruleForm.gcId}&polCode=${polCode}&podCode=${podCode}&staticId=${staticId}`
                    ,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            if(res.data.content.length > 0){
                                //常规共舱恢复  this.samePathList数组  第一个 和 第二个 参数 companyInfor
                                // res.data.content.commonIds = res.data.content.commonIds.filter(item => item.staticId !== this.firstStaticId)
                                var companyInfor = []
                                for (let i = 0; i < res.data.content.length; i++) {
                                    var commonIds = res.data.content[i]
                                    companyInfor.push({
                                        routeCode: commonIds.routeCode ? commonIds.routeCode : '-',
                                        displayName: commonIds.displayName ? commonIds.displayName : '-',
                                        staticId: commonIds.staticId,
                                        carrier: commonIds.carrier,
                                        id:commonIds.id,
                                        affectWeek: commonIds.affectWeek ? (' ' + this.currentYear + '-' + commonIds.affectWeek) : '',// 开始应用周数
                                        isNew:commonIds.isNew,
                                    })                        
                                }
        
                                // //该路径常规共舱
                                this.samePathList[0].companyInfor = companyInfor
                                // //该路径常规共舱（标准）
                                this.samePathList[1].companyInfor = companyInfor
        
                                // //之前放删除常规共舱的数组 放 接口返回的数据
                                this.commonIdsInner = res.data.content
                            }else{
                                this.$message({
                                    type: "error",
                                    message: "该路径没有共舱"
                                });
                            }
                        }else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                    })
                }
            },
            //删除共舱
            delRout(companyInfor,val,type){
                if(type == '该路径常规共舱'){
                    //找出删除的这条
                    if(this.commonIdsInner.length > 0){ //代表用户有删除操作
                        //循环数组 找出删除的那条共舱
                        for (let j = 0; j < this.commonIdsInner.length; j++) {
                            if(val.staticId == this.commonIdsInner[j].staticId){
                                this.commonIdsInner.splice(j,1)
                            }
                        }
                    }
                    val.delFlag = '1'
                    this.commonIdsInner.push(val)
                    for (let i = 0; i < companyInfor.length; i++) {
                        if(val.staticId == companyInfor[i].staticId){
                            companyInfor.splice(i,1)
                        }
                    }
                }else if(type == '该路径临时共舱（标准）'){
                    this.ovtIdsInner.push({
                        // id: val.id,// id删除必填如果不填就是添加
                        // delFlag: '1', // 是否删除，1是删除，如果不填就是添加，
                        staticId: val.staticId,// 航线id
                        // week: val.week, // 开始应用周数          
                        polCode: val.polCode,
                        podCode: val.podCode,
                    })
                    for (let i = 0; i < companyInfor.length; i++) {
                        if(val.staticId == companyInfor[i].staticId){
                            companyInfor.splice(i,1)
                        }
                    }
                }
            },
            //修改航线共舱信息 挂靠港
            updaComRout(val,isClick) {
                if(isClick == '1') { //可以点击打开
                    this.routeAtta = true
                    this.routeText = '修改'
                    this.routeId = val.staticId
                }
            },
            // 关闭挂靠港详情页
            handleClose() {
                this.routeAtta = false
                this.winResize()
            },
            manageUpdat(){
                console.log('重新渲染页面')
            },
            //显示共仓
            getVessel(val) {
                this.getVesselList = []
                this.getVesseTitle = []
                if(val){
                    if(val.length >= 1){
                        this.getVesselList = val
                        this.getVesseTitle = [{
                            carrier: '船公司',
                            routeCode: '航线代码',
                        }]
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
            tabColClassName({ row, rowIndex }){
                row.index = rowIndex;
                let index = rowIndex + 1;
                // if (index % 2 == 0) {
                //     return "warning-row";
                // }
                return "warning-row";
            },
            //关闭事件
            closePath() {
                this.$emit("closePath");
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
            //此页面点击保存 修改路径
            handleSaveClick(valText) {
                var valText = valText
                this.isLoading = true

                //保存要传的数据  ruleForm     pathDetails: [],//路径详情 页面显示的   delecPathList: [], //删除的路径详情   
                //动态船舶  this.shipArry 

                //路径详情 给每一条都添加  sortOrder

                //处理polCityId
                if(this.ruleForm.polCityId){
                }else{
                    this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=2&port=${this.ruleForm.pol}`,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                        }
                        }).then(res => {
                            if (res.data.status == 1) {
                                var port = res.data.content
                                for (let i = 0; i < port.length; i++) {
                                    if(this.ruleForm.polId == port[i].id){
                                        this.ruleForm.polCityId = port[i].cityId
                                    }
                                }
                        }
                    });
                }
                //处理podCityId
                if(this.ruleForm.podCityId){
                }else{
                    this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=2&port=${this.ruleForm.pod}`,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                        }
                        }).then(res => {
                            if (res.data.status == 1) {
                                var port = res.data.content
                                for (let i = 0; i < port.length; i++) {
                                    if(this.ruleForm.podId == port[i].id){
                                        this.ruleForm.podCityId = port[i].cityId
                                    }
                                }
                            }
                        });
                }
                if(this.pathDetails.length == 0){
                    this.$message({
                        type: "error",
                        message: "请添加路径"
                    });
                    this.isLoading = false
                    return
                }
                for (let i = 0; i < this.pathDetails.length; i++) {
                    this.pathDetails[i].id = (this.addOrEdit == "新增" && !this.isAripty) ? '' : this.pathDetails[i].id, //如果当前新增 并且是从专家船期过来的  默认 id为空
                    this.pathDetails[i].sortOrder = i+1 
                    this.pathDetails[i].transitSort = i+1 
                }
                //处理路径的
                let pathList = []
                pathList = this.pathDetails.concat(this.delecPathList)

                //处理动态船舶的
                var dynamicList = []
                for (let p = 0; p < this.shipArry.length; p++) { //循环最外层的
                    var dyList = []
                    for (let m = 0; m < this.shipArry[p].length; m++) { //循环里面的
                        var instea = this.shipArry[p][m]
                        console.log(instea,'insteainsteainstea')
                        dyList.push({
                            id: instea.id,
                            pathOrder: m+1,
                            delFlag: instea.delFlag,
                            weekNo: instea.weekNo, // 周次
                            vessel: instea.vessel, //船名
                            voyage: instea.voyage, //航次
                            staticEtd: instea.staticEtd, //静态etd （都是正常时间戳即可）
                            staticEta: instea.staticEta, //静态eta
                            etd: instea.etd, //离港时间
                            eta: instea.eta, //到港时间
                            atd: instea.atd, //实际atd
                            ata: instea.ata, //实际ata
                            vgmCutoff: instea.vgmCutoff, //截vgm
                            cyCutOff:  instea.cyCutOff, //截关
                            manIfEstCutoff: instea.manIfEstCutoff, //截AMS/ENS
                            siCutOff: instea.siCutOff, //截SI
                            warning: this.getWaring(instea) //预警
                        })
                    }
                    dynamicList.push(dyList)                    
                }

                if(dynamicList.length > 0){
                    this.ruleForm.totalCount = dynamicList.length
                }
                dynamicList = dynamicList.concat(this.wholeDelect)

                let query = this.ruleForm

                query['commonIds'] = this.commonIdsInner  //常用共舱
                query['ovtIds'] = this.ovtIdsInner //临时共舱
                query['pathList'] = pathList
                if(this.isAripty){ //需要传动态船舶
                    query['dynamicList'] = dynamicList
                }
                if(this.pathTitle === "修改"){
                    query["id"] = this.rowId;
                }
                this.$axios.post(this.commonJs.localUrl + `/schedules/path/handlePath`,query,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    if (res.data.status == 1) {
                        if(valText == '保存'){
                            this.$emit("updatRoute")
                            this.$message({
                                type: "success",
                                message: "保存成功"
                            });
                            this.closePath()
                        }
                    }else if (res.data.status == 5) {
                        this.$message({
                            type: "error",
                            message: "存在相同路径"
                        });
                        this.isLoading = false
                    }else if (res.data.status == 6) {
                        this.$message({
                            type: "error",
                            message: "该路径的航线或港口组合是无效状态，请将路径设置为屏蔽"
                        });
                        this.isLoading = false
                    }else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据保存失败 请重新加载页面"
                        });
                    }
                })
            },
            //判断预警下拉框 准点、提前、延误、空班
            getWaring(val){
                if(val.staticEtd && val.etd){ //有静态etd 和 动态 etd
                    var staticEtd = new Date(val.staticEtd).getTime()  //静态
                    var etd = new Date(val.etd).getTime() //动态
                    if(staticEtd == etd){ //静态等于动态
                        return '准点'
                    }else if(staticEtd > etd){ //静态大于动态
                        return '提前'
                    }else{
                        return '延误'
                    }
                }else{
                    return '空班'
                }
            },
            //从专家船期传过来的新增
            expertSchedule(){
                this.$axios.get(this.commonJs.localUrl + `/expert/path/details?id=${this.rowId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                        if(res.data.status == 1){
                            this.isLoading = false
                            this.pathDetails = res.data.content.pathList
                            this.ruleForm.carrier = res.data.content.carrier // 船公司
                            this.ruleForm.scac = res.data.content.scac // 船公司五子码
                            this.ruleForm.state = res.data.content.state //状态
                            this.typeL = res.data.content.type // 类型
                            setTimeout(()=>{
                                this.ruleForm.id = this.async == 1 ? res.data.content.id : '' // 路径id（跟取详情的id一样）
                                this.ruleForm.etd = res.data.content.etd // 头程第一段ETD
                                this.ruleForm.pol = res.data.content.pol // 起始港
                                this.ruleForm.pod = res.data.content.pod // 目的港
                                this.ruleForm.polCode = res.data.content.polCode // 起始港五字码
                                this.ruleForm.podCode = res.data.content.podCode // 目的港五字码
                                this.ruleForm.polCityId = res.data.content.polCityId //起始港Id
                                this.ruleForm.podCityId = res.data.content.podCityId //目的港Id
                                this.ruleForm.transitCount = res.data.content.transitCount //路径数
                                this.ruleForm.transitTime = res.data.content.transitTime
                                this.ruleForm.editTransitTime = res.data.content.editTransitTime
                                this.ruleForm.gcId = res.data.content.gcId // 头程第一段共舱id
                                this.ruleForm.gcCount = res.data.content.gcCount //共舱数量
                                this.ruleForm.polTerminal = res.data.content.polTerminal //起始港码头
                                this.ruleForm.podTerminal = res.data.content.podTerminal //目的港码头
                            },500)
                        } else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                    });
            },
        },
        mounted() {
            var d1 = new Date()
            this.currentYear = d1.getFullYear()
            if(this.pathTitle == "新增"){
                if(this.isAripty){ //说明本身就是路径管理的新增
                    this.addOrEdit = "新增"
                    this.typeL = 1
                    this.isLoading = false
                }else{ //从专家船期传过来的新增
                    this.addOrEdit = "新增"
                    this.isTong = false
                    this.expertSchedule()
                }
            }else if(this.pathTitle == "修改"){
                this.addOrEdit = "修改"
                this.pathDetail() //取路径详情
            }
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
            //头程信息的变化
            headRoute: {
                handler: function(val) {
                    if(val.staticId){
                        var query = {
                            staticId: val.staticId,
                            polCode:val.polCode,
                            podCode: val.podCode,
                        }
                        this.$axios.post(this.commonJs.localUrl +`/schedules/path/getGcInfoByStaticPath`,query,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                            }
                        }).then(res => {
                            if (res.data.status == 1) {
                                this.ruleForm.gcId = res.data.content.gcId //头程id
                                this.comRouteInfor(res.data.content.sameRoute,res.data.content.commonIds,res.data.content.ovtIds)//航线共舱信息
                            }
                        })
                    }else{
                        this.ruleForm.gcId = ''
                        this.samePathList = []
                    }
                    

                    //只要我头程有改变
                    // 则之前被删除的  常规共舱 和  临时共舱  数据为空
                    
                    this.commonIdsInner = []
                    this.ovtIdsInner = []
                },
                deep: true
            },
            //路径详情
            pathDetails(val){//监听路径的变化
                if(val.length > 0){//也就是 有路径
                    this.isTrue = true //添加了路径详情 船公司不可修改
                    this.ruleForm.etd = val[0].etd // 头程第一段ETD
                    this.ruleForm.pol =val[0].pol // 头程第一段起始港
                    this.ruleForm.polCode = val[0].polCode // 头程第一段起始港五字码
                    this.ruleForm.polCityId =val[0].polCityId //头程第一段起始港Id
                    this.ruleForm.polId =val[0].polId //头程第一段起始港Id
                    this.ruleForm.polTerminal = val[0].polTerminal //头程第一段起始港码头
                    this.ruleForm.polTerminalId = val[0].polTerminalId //头程第一段起始港码头
                    this.ruleForm.pod = val[val.length - 1].pod // 最后一段的目的港
                    this.ruleForm.podCode = val[val.length - 1].podCode // 最后一段的目的港五字码
                    this.ruleForm.podCityId = val[val.length - 1].podCityId //最后一段的目的港Id
                    this.ruleForm.podId = val[val.length - 1].podId //最后一段的目的港Id
                    this.ruleForm.podTerminal = val[val.length - 1].podTerminal //最后一段的目的港码头
                    this.ruleForm.podTerminalId = val[val.length - 1].podTerminalId //最后一段的目的港码头
                    this.ruleForm.transitCount = val.length //路径数
                    this.headRoute.staticId = val[0].staticId
                    this.headRoute.polCode = val[0].polCode
                    this.headRoute.podCode = val[0].podCode

                    this.tesEtd = val[0].etd // 头程第一段ETD
                    this.tesEta = val[val.length - 1].eta // 末程ETA
                    var transitTime = 0
                    for (let i = 0; i < val.length; i++) {
                        transitTime = transitTime + (val[i].transitTime ? Number(val[i].transitTime) : 0)
                    }
                    this.isAddShip = true

                    //判断头程是否是非海运
                    this.isLine = this.pathDetails[0].transitType && this.pathDetails[0].transitType.toUpperCase() == 'LINE' ? true : false

                }else{
                    this.isTrue = false //路径详情为空 船公司可修改
                    this.shipArry = []
                    this.ruleForm.etd = "" // 头程第一段ETD
                    this.ruleForm.pol ="" // 头程第一段起始港
                    this.ruleForm.polCode = "" // 头程第一段起始港五字码
                    this.ruleForm.polCityId ='' //头程第一段起始港Id
                    this.ruleForm.polId ='' //头程第一段起始港Id
                    this.ruleForm.polTerminal = '' //头程第一段起始港码头
                    this.ruleForm.polTerminalId = '' //头程第一段起始港码头
                    this.ruleForm.pod ="" // 最后一段的目的港
                    this.ruleForm.podCode = "" // 最后一段的目的港五字码
                    this.ruleForm.podCityId ='' //最后一段的目的港Id
                    this.ruleForm.podId ='' //最后一段的目的港Id
                    this.ruleForm.podTerminal = '' //最后一段的目的港码头
                    this.ruleForm.podTerminalId = '' //最后一段的目的港码头
                    this.ruleForm.transitCount ='' //路径数
                    this.isAddShip = false

                    this.ruleForm.gcId = "" // 头程第一段共舱id
                    this.samePathList = []
                    this.headRoute.staticId = ''
                    this.headRoute.polCode = ''
                    this.headRoute.podCode = ''

                    this.tesEtd = '' // 头程第一段ETD
                    this.tesEta = '' // 末程ETA

                    this.commonIdsInner = []
                    this.ovtIdsInner = []
                    this.isLine = false
                }
            },
            //动态船舶
            shipArry:{ //监听动态船舶的变化
                handler: function(value) {
                    var val = JSON.parse(JSON.stringify(value))
                    this.dynamicList = []
                    for (let i = 0; i < val.length; i++) {
                        //  // 这里处理预警信息 //  //  //  //  //  //  //  //  // 
                        for (let p = 0; p < val[i].length; p++) {
                            var element = val[i][p];
                            element.warning = this.getWaring(element)
                            element.expandChange = false
                        }
                        var item = val[i]
                        var firstObject = item[0] //头程的数据
                        var additLeg = [] //放 2 3 4程数据
                        for (let j = 1; j < item.length; j++) {  //下面是 2 3 4程数据
                            additLeg.push(item[j])
                        }
                        firstObject["additLeg"] = additLeg
                        this.dynamicList.push(firstObject)
                    }
                },
                deep: true
            },

            //头程ETD
            tesEtd(val){
                console.log(this.shipArry,'shipArry')
                if(val){
                    console.log(val)
                    for (let i = 0; i < this.shipArry.length; i++) {
                        if(this.pathIndex || this.pathIndex === 0){
                            this.shipArry[i][this.pathIndex].staticEtd = ''
                        }
                    }
                }
            },
            //末程ETA
            tesEta(val){
                if(val){
                    for (let i = 0; i < this.shipArry.length; i++) {
                        if(this.pathIndex || this.pathIndex === 0){
                            this.shipArry[i][this.pathIndex].staticEta = ''
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
    .routeAtta{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
        }
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
    .scrollDiv{
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
</style>