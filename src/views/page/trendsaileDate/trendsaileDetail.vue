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
            <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
        </div>
            <div :style="{maxHeight: innerHeight}"  class="scrollDiv">
                <ul class="routeUl">
                    <!-- <li class="routeLi">
                        <div class="shipData">      
                            <RouteMap :route-info="routeInfo"></RouteMap>
                        </div>   
                    </li>                      -->
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
                                    <span class='colSpan' :title="this.ruleForm.onTime ? this.ruleForm.onTime + '%' : ''">{{this.ruleForm.onTime ? this.ruleForm.onTime + '%' : '-'}}</span>
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
                                    <span class='colSpan' :title="this.ruleForm.stop ? this.ruleForm.stop + '%' : ''">{{this.ruleForm.stop ? this.ruleForm.stop + '%' : '-'}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item prop="carrier" label="船公司:" class="el_formContent">
                                    <span class='colSpan' :title="this.ruleForm.carrier ? this.ruleForm.carrier : ''">{{this.ruleForm.carrier ? this.ruleForm.carrier : '-'}}</span>
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
                                    <span class='colSpan'>爬虫</span>
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
                        <el-table
                            :data="pathDetails"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="table"
                        >
                            <el-table-column prop="pathOrder" label="顺序" align="left" :show-overflow-tooltip="true" min-width="50">

                            </el-table-column>
                            <el-table-column prop="transitType" label="运输方式" align="left" :show-overflow-tooltip="true" min-width="110">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-model="scope.row.transitType"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            v-if="scope.row.isView !== 0"
                                        >
                                            <el-option
                                                v-for="item in transPort"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-input v-model="scope.row.transitType" readOnly v-else></el-input>
                                     </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="170">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0 && scope.row.index == 0">
                                        <el-input v-model="scope.row.pol" readOnly></el-input>
                                    </div>
                                    <div class="sel-el" v-else-if="scope.row.isView !== 0 && scope.row.index !== 0">
                                        <el-select
                                            remote
                                            filterable
                                            clearable
                                            v-model="scope.row.pol"
                                            placeholder="请输入并选择"
                                            :remote-method="startRemote"
                                            @blur="startBlur(scope.row.pol,scope.row.index)"
                                            @focus="startFocus"
                                            @change="startChange($event,scope.row.index)"
                                            style="width:100%"
                                        >
                                            <el-option
                                                v-for="item in startList"
                                                :key="item.id"
                                                :label="item.portEn"
                                                :value="item.id"
                                                :title='item.portEn+"("+ item.portCode+")"'
                                            >
                                                <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <span v-else>{{scope.row.pol}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="polTerminal" label="起运港码头" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0">
                                        <el-select
                                            v-model="scope.row.polTerminal"
                                            placeholder="请选择"
                                            clearable
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
                                                <!-- <span>{{item.portEn+"("+ item.portCode+")" }}</span> -->
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <span v-else>{{scope.row.polTerminal}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="170">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0">
                                        <el-input v-model="scope.row.pod" readOnly v-if="scope.row.index == pathDetails.length - 1"></el-input>
                                        <el-select
                                            remote
                                            clearable
                                            filterable
                                            v-model="scope.row.pod"
                                            placeholder="请输入并选择"
                                            :remote-method="portEndRemote"
                                            @blur="endBlur(scope.row.pod,scope.row.index)"
                                            @focus="portEndFocus"
                                            @change="portEndChange($event,scope.row.index)"
                                            v-else
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
                                    </div>
                                    <span v-else>{{scope.row.pod}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="podTerminal" label="目的港码头" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0">
                                        <el-select
                                            v-model="scope.row.podTerminal"
                                            placeholder="请选择"
                                            clearable
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
                                    </div>
                                    <span v-else>{{scope.row.podTerminal ? scope.row.podTerminal : '-'}}</span>
                                </template>

                            </el-table-column>
                            <el-table-column prop="routeCode" label="航线代码(显示)" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <span :class= "scope.row.routeCode && scope.row.routeCode !== 'UNDEFINED' && scope.row.isView === 0 ? 'voyageClass' : ''" @click="appearRout(scope.row)">{{scope.row.displayName &&  scope.row.displayName !== "UNDEFINED" ? scope.row.displayName : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="etd" label="ETD" align="left" :show-overflow-tooltip="true" min-width="90">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0">
                                        <el-select
                                            v-model="scope.row.etd"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                        >
                                            <el-option
                                                v-for="item in ETDList"
                                                :key="item.id"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <span v-else>{{scope.row.etd ? commonJs.getMounthDay(scope.row.etd.toUpperCase()) : '' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="eta" label="ETA" align="left" :show-overflow-tooltip="true" min-width="90">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0">
                                        <el-select
                                            v-model="scope.row.eta"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                        >
                                            <el-option
                                                v-for="item in ETAList"
                                                :key="item.id"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <span v-else>{{scope.row.eta ? commonJs.getMounthDay(scope.row.eta.toUpperCase()) : '' }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="transitTime" label="航程" align="left" :show-overflow-tooltip="true" min-width="90">
                                <template slot-scope="scope">
                                    <div class="sel-el" v-if="scope.row.isView !== 0">
                                        <el-input
                                            v-model="scope.row.transitTime"
                                            @input="scope.row.transitTime = scope.row.transitTime.replace(/[^\d]/g,'')"
                                        />
                                    </div>
                                    <span v-else>{{scope.row.transitTime ? scope.row.transitTime : '-'}}</span>
                                </template> 
                            </el-table-column>
                            <!--  查看差 v-if="isViewShow" -->
                            <!-- <el-table-column prop="isView" label="操作" align="left" :show-overflow-tooltip="true" min-width="50" v-if="isViewShow"> 
                                <template slot-scope="scope"> 
                                    <span v-if="scope.row.isView == 0" class="look" @click="lookVesselList(scope.row,ruleForm.carrier)">查看</span>
                                    <span v-if="scope.row.isView == 1">查看</span>
                                </template>
                            </el-table-column> -->
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
                        <el-table
                            :data="dynamicList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabColClassName"
                            tooltip-effect="dark"
                            ref="tableDynamic"
                            :default-expand-all=false
                        >
                            <el-table-column prop="weekNo" label="周序号" align="left" width="80" fixed>
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-model="scope.row.weekNo"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                            @change="changeWeek(scope.row)"
                                        >
                                            <el-option
                                                v-for="item in weekList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
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
                            <el-table-column prop="isChange" label="" align="left" :show-overflow-tooltip="true" width="17" fixed>
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
                            <el-table-column prop="vessel" label="船名" align="left" width="188" fixed>
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-model="scope.row.vessel"
                                            @change="changeIpu(scope.row)"
                                            :readonly="scope.row.isVessel"
                                        />
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="voyage" label="航次" align="left" width="120" fixed>
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-model="scope.row.voyage"
                                            @change="changeIpu(scope.row)"
                                            :readonly="scope.row.isVoyage"
                                        />
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="sameRoute" label="共舱" align="left" :show-overflow-tooltip="true" width="60">
                                <template slot-scope="scope">
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
                            </el-table-column>
                            <el-table-column prop="carrier" label="网站显示" align="left" :show-overflow-tooltip="true" width="90">

                            </el-table-column>
                            <el-table-column prop="staticEtd" label="ETD-静态" :show-overflow-tooltip="true" align="left" width="120">
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                            scope.row.staticEtd ? commonJs.getFaysMounthDay(scope.row.staticEtd.toUpperCase()) : '-'
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="dynamicEtd" label="ETD-动态" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.dynamicEtd"
                                            type="datetime"
                                            @focus="focusDate(scope.row.dynamicEtd,scope.row,'dynamicEtd','Etd')"
                                            @change="changeDate($event,scope.row,'dynamicEtd','Etd')"
                                            @blur="changeDate(scope.row.dynamicEtd,scope.row,'dynamicEtd','Etd')"
                                            placeholder="选择时间日期"
                                            :format="scope.row.dynamicEtdEtd"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template>
                            </el-table-column>
                            <el-table-column prop="atd" label="ATD" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.atd"
                                            type="datetime"
                                            @focus="focusDate(scope.row.atd,scope.row,'atd','ATD')"
                                            @change="changeDate($event,scope.row,'atd','ATD')"
                                            @blur="changeDate(scope.row.atd,scope.row,'atd','ATD')"
                                            placeholder="选择时间日期"
                                            :format="scope.row.atdATD"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="staticEta" label="ETA-静态" :show-overflow-tooltip="true" align="left" width="120">
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                            scope.row.staticEta ? commonJs.getFaysMounthDay(scope.row.staticEta.toUpperCase()) : '-'
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="dynamicEta" label="ETA-动态" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.dynamicEta"
                                            type="datetime"
                                            @focus="focusDate(scope.row.dynamicEta,scope.row,'dynamicEta','dEta')"
                                            @change="changeDate($event,scope.row,'dynamicEta','dEta')"
                                            @blur="changeDate(scope.row.dynamicEta,scope.row,'dynamicEta','dEta')"
                                            placeholder="选择时间日期"
                                            :format="scope.row.dynamicEtadEta"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="ata" label="ATA" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.ata"
                                            type="datetime"
                                            @focus="focusDate(scope.row.ata,scope.row,'ata','ATA')"
                                            @change="changeDate($event,scope.row,'ata','ATA')"
                                            @blur="changeDate(scope.row.ata,scope.row,'ata','ATA')"
                                            placeholder="选择时间日期"
                                            :format="scope.row.ataATA"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <!-- <el-table-column prop="vgm" label="截VGM" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.vgm"
                                            type="datetime"
                                            @change="changeDate($event,scope.row,'vgm','VGM')"
                                            placeholder="选择时间日期"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="cutoff" label="截关" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.cutoff"
                                            type="datetime"
                                            @change="changeDate($event,scope.row,'cutoff','cuto')"
                                            placeholder="选择时间日期"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="amsEns" label="截AMS/ENS" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.amsEns"
                                            type="datetime"
                                            @change="changeDate($event,scope.row,'amsEns','ams')"
                                            placeholder="选择时间日期"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="siCutOff " label="截SI" align="left" width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.siCutOff "
                                            type="datetime"
                                            @change="changeDate($event,scope.row,'siCutOff','siCutOffsicut')"
                                            placeholder="选择时间日期"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column> -->
                            <el-table-column prop="updateTime" label="更新时间" align="left" width="142" :show-overflow-tooltip="true">
                            
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
                                            <el-table-column prop="vessel" label="船名" align="left" width="188">
                                                <template slot-scope="scope">
                                                    <div class="sel-el">
                                                        <el-input
                                                            v-model="scope.row.vessel"
                                                            @change="changeIpu(scope.row)"
                                                            :readonly="scope.row.isVessel"
                                                        />
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="voyage" label="航次" align="left" width="120">
                                                <template slot-scope="scope">
                                                    <div class="sel-el">
                                                        <el-input
                                                            v-model="scope.row.voyage"
                                                            @change="changeIpu(scope.row)"
                                                            :readonly="scope.row.isVoyage"
                                                        />
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="sameRoute" label="共舱" align="left" :show-overflow-tooltip="true" width="60">
                                                <template slot-scope="scope">
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
                                            </el-table-column>
                                            <el-table-column prop="carrier" label="网站显示" align="left" :show-overflow-tooltip="true" width="90">

                                            </el-table-column>
                                            <el-table-column prop="staticEtd" label="ETD-静态" align="left" width="120">
                                                <template slot-scope="scope">
                                                    <span>
                                                        {{
                                                            scope.row.staticEtd ? commonJs.getFaysMounthDay(scope.row.staticEtd.toUpperCase()) : '-'
                                                        }}
                                                    </span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="dynamicEtd" label="ETD-动态" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.dynamicEtd"
                                                            type="datetime"
                                                            @focus="focusDate(scope.row.dynamicEtd,scope.row,'dynamicEtd','Etd')"
                                                            @change="changeDate($event,scope.row,'dynamicEtd','Etd')"
                                                            @blur="changeDate(scope.row.dynamicEtd,scope.row,'dynamicEtd','Etd')"
                                                            placeholder="选择时间日期"
                                                            :format="scope.row.dynamicEtdEtd"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="atd" label="ATD" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.atd"
                                                            type="datetime"
                                                            @focus="focusDate(scope.row.atd,scope.row,'atd','ATD')"
                                                            @change="changeDate($event,scope.row,'atd','ATD')"
                                                            @blur="changeDate(scope.row.atd,scope.row,'atd','ATD')"
                                                            placeholder="选择时间日期"
                                                            :format="scope.row.atdATD"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="staticEta" label="ETA-静态" align="left" width="120">
                                                <template slot-scope="scope">
                                                    <span>
                                                        {{
                                                            scope.row.staticEta ? commonJs.getFaysMounthDay(scope.row.staticEta.toUpperCase()) : '-'
                                                        }}
                                                    </span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="dynamicEta" label="ETA-动态" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.dynamicEta"
                                                            type="datetime"
                                                            @focus="focusDate(scope.row.dynamicEta,scope.row,'dynamicEta','dEta')"
                                                            @change="changeDate($event,scope.row,'dynamicEta','dEta')"
                                                            @blur="changeDate(scope.row.dynamicEta,scope.row,'dynamicEta','dEta')"
                                                            placeholder="选择时间日期"
                                                            :format="scope.row.dynamicEtadEta"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="ata" label="ATA" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.ata"
                                                            type="datetime"
                                                            @focus="focusDate(scope.row.ata,scope.row,'ata','ATA')"
                                                            @change="changeDate($event,scope.row,'ata','ATA')"
                                                            @blur="changeDate(scope.row.ata,scope.row,'ata','ATA')"
                                                            placeholder="选择时间日期"
                                                            :format="scope.row.ataATA"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <!-- <el-table-column prop="vgm" label="截VGM" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.vgm"
                                                            type="datetime"
                                                            @change="changeDate($event,scope.row,'vgm','VGM')"
                                                            placeholder="选择时间日期"
                                                            format="yyyy-MM-dd HH:mm:ss"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="cutoff" label="截关" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.cutoff"
                                                            type="datetime"
                                                            @change="changeDate($event,scope.row,'cutoff','cuto')"
                                                            placeholder="选择时间日期"
                                                            format="yyyy-MM-dd HH:mm:ss"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="amsEns" label="截AMS/ENS" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.amsEns"
                                                            type="datetime"
                                                            @change="changeDate($event,scope.row,'amsEns','ams')"
                                                            placeholder="选择时间日期"
                                                            format="yyyy-MM-dd HH:mm:ss"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column>
                                            <el-table-column prop="siCutOff " label="截SI" align="left" width="180">
                                                <template slot-scope="scope">
                                                    <div class="sel-input">
                                                        <el-date-picker
                                                            v-model="scope.row.siCutOff "
                                                            type="datetime"
                                                            @change="changeDate($event,scope.row,'siCutOff','siCutOffsicut')"
                                                            placeholder="选择时间日期"
                                                            format="yyyy-MM-dd HH:mm:ss"
                                                            >
                                                        </el-date-picker>
                                                    </div>
                                                </template> 
                                            </el-table-column> -->
                                            <el-table-column prop="updateTime" label="更新时间" align="left" width="142" :show-overflow-tooltip="true">
                                            
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
                                <div class="dataPage" :style="{width: dataWidth + 'px'}">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="handleSaveClick">保存</el-button>
                </div>
            </div>
        </el-form>
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
                @handleClose="handleClose"
                @updatManage="manageUpdat"
                isDongT="true"
            >
            </routeDetail>
        </el-dialog>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    // import routeDetail from "./routeDetail.vue";
    import routeDetail from "../route/routeManageAdd.vue";
    import RouteMap from '@/components/RouteMap/RouteMap'
    import api from '@/components/RouteMap/api'
    export default {
        props: [
            "dialogInnerDetail",
            "rowId",
            "gcId",
            "isAripty"
            ],
        data() {
            return {
                dataWidth: '',
                screenWidth: document.body.clientWidth, // 设置默认值
                routeInfo: null,
                addOrEdit: "", // 新增 修改
                isLoading: true, //Loading
                isViewShow: false, //路径详情是否可点击查看
                routeAtta: false, //航线挂靠港详情页
                routeId: '', //航线挂靠港详情页ID
                routeText: '',//航线挂靠港详情页Text
                withArry: '',//给挂靠港口带的无五子码的数组
                code: [],
                ruleForm:{
                    id: '', //ID
                    spiderId: '', // 港口组合id
                    carrier: '', //船公司
                    scac: '', //船公司五子码
                    transitTime: '', //动态总航程
                    editTransitTime: '', //人工编辑总航程
                    transitCount: '', //中转次数，0：直达；1： 2程；2：3程 ；3：4程
                    pol: '', //起始港
                    polCode: '', //起始港五字码
                    polTerminal: '', //起始港码头
                    pod: '', //目的港
                    podCode: '', //目的港五字码
                    podTerminal: '', //目的港码头
                    onTime: '', //准班率
                    stop: '', //停航
                    etd: '',//周几etd
                    state: '', //状态
                },
                typeL: '', //类型 人工 爬虫
                POL: '', //起始港
                POD: '', //目的港
                getVesselList: [], //共舱列表
                getVesseTitle: [], //共舱标题
                shiplList: [], //换船列表
                shipTitle: [], //换船标题            
                tableDynamicShipData: [], //动态船舶信息
                samePathList: [], //航线共舱信息
                pathDetails: [],//路径详情
                portStartList: [], //第一条起始港列表
                startList: [], //第一条起始港列表
                portEndList: [], //目的港列表
                startPort: [], //起始港码头列表
                endPort: [], //目的港码头列表
                storeUpdat: [], //存放修改之后的动态船舶
                transPort: [
                    // {
                    //     value : '海运',
                    //     label : 'LINE',
                    // },
                    {
                        value : 'FEEDER',
                        label : 'FEEDER',
                    },
                    {
                        value : 'RAIL',
                        label : 'RAIL',
                    },
                    {
                        value : 'TRUCK',
                        label : 'TRUCK',
                    },
                ],
                ETAList: [
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
                //预警下拉框 准点、提前、延误、停航、跳港、待更新
                alertDrop:[
                    {
                        value : '1',
                        label : '准点',
                    },
                    {
                        value : '2',
                        label : '提前',
                    },
                    {
                        value : '3',
                        label : '延误',
                    },
                    {
                        value : '4',
                        label : '空班',
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
                        label: "屏蔽中"
                    },
                ],
                weekList: [], //周序号
                weeks: '', //今年一共有多少周
                innerHeight: '',
                screenHeight: '',
                commonIdsInner: [],//常规共舱
                isLine : false, //头程是否海运
                ovtIdsInner: [],//临时共舱
                currentYear: '',
                shipArry: [], //动态船舶
                dynamicList: [], //动态船舶循环的
                gauRouteA: [], //修改的动态船舶 需要传给后端
                missionCount: 0, //是否同步 大于零就为同步
                isTrueUpdate: false, //是否重新渲染的详情页
            };
        },
        components: {
            loading,
            routeDetail,
            RouteMap,
        },
        methods: {
            //取路径详情
            pathDetail(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/details?id=${this.rowId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.pathDetails = res.data.content.pathList //取路径详情
                        //判断路径头程是否是海运
                        if(this.pathDetails.length > 0){
                            this.isLine = this.pathDetails[0].transitType && this.pathDetails[0].transitType.toUpperCase() == 'LINE' ? true : false
                        }
                        for (let h = 0; h < this.pathDetails.length; h++) {
                            if(this.pathDetails[h].etd){
                                this.pathDetails[h].etd = this.pathDetails[h].etd ? this.commonJs.getMounthDay(this.pathDetails[h].etd.toUpperCase()) : ''
                            }
                            if(this.pathDetails[h].eta){
                                this.pathDetails[h].eta = this.pathDetails[h].eta ? this.commonJs.getMounthDay(this.pathDetails[h].eta.toUpperCase()) : ''
                            }
                        }
                        if(res.data.content.pathList){
                            if(res.data.content.pathList.length < 1){ //当前路径数无
                                this.isViewShow = false
                                this.tableDynamicShipData = []
                                this.isLoading = false //无路径信息
                            }else{
                                this.isViewShow = false
                                var id = ""
                                var ids = []
                                for (let i = 0; i < this.pathDetails.length; i++) {
                                    ids.push(this.pathDetails[i].id)
                                    this.storeUpdat.push([])
                                    if(this.pathDetails[i].isView == 0) {
                                        this.isViewShow = true
                                    }
                                }
                                id = ids.join('-')
                                this.InitiaRouer(res.data.content.pathList) //初始化处理 起始港码头ID 目的港码头ID

                                if(this.isAripty){//调动态船舶
                                    this.lookVesselList(id,res.data.content.carrier) //获取的动态船舶
                                }else{
                                    this.isLoading = false
                                }
                            }
                        }
                        //基础信息
                        this.ruleForm.spiderId = res.data.content.spiderId
                        this.ruleForm.carrier = res.data.content.carrier //船公司
                        this.ruleForm.scac = res.data.content.scac //船公司五子码
                        this.ruleForm.transitCount = res.data.content.transitCount //程数
                        this.ruleForm.podTerminal = res.data.content.podTerminal //目的港码头
                        this.ruleForm.pod = res.data.content.pod //目的港
                        this.ruleForm.podCode = res.data.content.podCode //目的港五子码
                        this.ruleForm.pol = res.data.content.pol //起始港
                        this.ruleForm.polTerminal = res.data.content.polTerminal //起始港码头
                        this.ruleForm.polCode = res.data.content.polCode //起始港五子码
                        this.ruleForm.onTime = res.data.content.onTime //准班率
                        this.ruleForm.stop =res.data.content.stop //停航
                        this.ruleForm.lineCount =res.data.content.lineCount
                        this.ruleForm.etd =res.data.content.etd //周几etd
                        this.typeL = res.data.content.type
                        this.missionCount = res.data.content.missionCount

                        if(!this.isTrueUpdate){
                            this.ruleForm.transitTime = res.data.content.transitTime //航程
                            this.ruleForm.editTransitTime = res.data.content.editTransitTime //航程
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
                        }
                        // this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
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
                            })
                            // standard.push({//放入该路径常规共舱（标准）
                            //     routeCode: commonIds[i].routeCode ? commonIds[i].routeCode : '-',
                            //     displayName: commonIds[i].displayName ? commonIds[i].displayName : '-',
                            //     staticId: commonIds[i].staticId,// 航线id
                            //     carrier: commonIds[i].carrier, //船公司
                            //     id:commonIds[i].id,
                            //     affectWeek: commonIds[i].affectWeek,// 开始应用周数
                            // })
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
                                affectWeek: sameRoute[i].affectWeek ? (' ' + this.currentYear + '-' + sameRoute[i].affectWeek) : ''
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
            //初始化处理 起始港码头ID 目的港码头ID
            InitiaRouer(val) {
                for (let i = 0; i < val.length; i++) {
                    //处理起始港码头
                    if(val[i].polTerminal == '') { //起始港码头为空
                        val[i].polTerminalId = ''
                    }else{
                        this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${val[i].polCode}`,
                            {
                                headers : {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token"),
                                }
                            }
                        ).then(res => {
                            var sport = res.data.content
                            for (let j = 0; j < sport.length; j++) {
                                if(sport[j].terminalCn == val[i].polTerminal) {
                                    val[i].polTerminalId = sport[j].id
                                }
                            }
                        })
                    }
                    //处理目的港码头
                    if(val[i].podTerminal == '') { //起始港码头为空
                        val[i].podTerminalId = ''
                    }else{
                        this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${val[i].podCode}`,
                            {
                                headers : {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token"),
                                }
                            }
                        ).then(res => {
                            var eport = res.data.content
                            for (let j = 0; j < eport.length; j++) {
                                if(eport[j].terminalCn == val[i].podTerminal) {
                                    val[i].podTerminalId = eport[j].id
                                }
                            }
                        })
                    }
                }
            },
            //获取动态船舶
            lookVesselList(id,carrier) {
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/getDynamicVessel?id=${id}&carrier=${carrier}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        var tableDy = res.data.content.dynamicVessel
                        var dynamicList = []
                        for (let i = 0; i < tableDy.length; i++) {
                            var item = tableDy[i]
                            var firstObject = item[0] //头程的数据
                            var additLeg = [] //放 2 3 4程数据
                            for (let j = 1; j < item.length; j++) {  //下面是 2 3 4程数据
                                additLeg.push(item[j])
                            }
                            firstObject["additLeg"] = additLeg
                            dynamicList.push(firstObject)
                        }
                        if(dynamicList.length > 0){
                            this.dynamicList = this.Initialize(dynamicList)
                        }else{
                            this.dynamicList = []
                        }
                        // this.shipArry = res.data.content.dynamicVessel
                        this.comRouteInfor(res.data.content.sameRoute,res.data.content.commonIds,res.data.content.ovtIds)//航线共舱信息
                        this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //修改航线共舱信息 挂靠港
            updaComRout(val,isClick) {
                if(isClick == '1') { //可以点击打开
                    this.routeAtta = true
                    this.routeText = '修改'
                    this.routeId = val.staticId
                }

            },
            //恢复共舱
            pathRecover(){
                if(this.pathDetails.length > 0){
                    var polCode = this.pathDetails[0].polCode
                    var podCode = this.pathDetails[0].podCode
                    var staticId = this.pathDetails[0].staticId
                    this.$axios.get(this.commonJs.localUrl + `/schedules/path/recoverCabin?gcId=${this.gcId}&polCode=${polCode}&podCode=${podCode}&staticId=${staticId}`
                    ,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            //常规共舱恢复  this.samePathList数组  第一个 和 第二个 参数 companyInfor
                            // res.data.content.commonIds = res.data.content.commonIds.filter(item => item.staticId !== this.firstStaticId)
                            if(res.data.content.length > 0){ //说明有共舱
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
                                        isNew:commonIds.isNew, //commonIds.isNew
                                    })                        
                                }
        
                                // //该路径常规共舱
                                //先判断路径常规共舱有没有 含在接口返回的共舱里
                                // if(this.samePathList[0].companyInfor.length > 0){
                                //     for (let j = 0; j < companyInfor.length; j++) {
                                //         for (let p = 0; p < this.samePathList[0].companyInfor.length; p++) {
                                //             if(companyInfor[j].staticId == this.samePathList[0].companyInfor[p].staticId){
                                //                 companyInfor[j].isNew = this.samePathList[0].companyInfor[p].isNew
                                //             }
                                //         }
                                        
                                //     }
                                // }else{
                                //     companyInfor = companyInfor.filter(item => item.isNew = 1)
                                // }
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
                        id: val.id,// id删除必填如果不填就是添加
                        delFlag: '1', // 是否删除，1是删除，如果不填就是添加，
                        staticId: val.staticId,// 航线id
                        week: val.week// 开始应用周数                    
                    })
                    for (let i = 0; i < companyInfor.length; i++) {
                        if(val.staticId == companyInfor[i].staticId){
                            companyInfor.splice(i,1)
                        }
                    }
                }
            },
            //点击路径详情的航线代码 修改航线共舱信息 挂靠港
            appearRout(val) {
                if(val.isView == 0 && val.routeCode) { //有航线代码 可点击
                    var withArry = []
                    var code = [{
                        polCode:val.polCode ? val.polCode : '',
                        podCode: val.podCode ? val.podCode : ''
                    }]
                    console.log(val)
                    if(val.polCode == ''){ //如果起始港五子码为空
                        withArry.push({
                            id: '',
                            staticId: '',
                            portNumber: '', //挂靠顺序
                            port: val.pol, //港口英文名
                            portCode: val.polCode, //港口五子码
                            isPol: "", // 是POL还是POD，0是POL，1是POD
                            terminal: val.polTerminal, //码头,
                            terminalId: '',
                            eta: val.eta, //eta
                            etd: val.etd, //etd
                            transitTime: '', //航程
                            direction: '', // 方向
                            isSnap: 0, //是否临时挂靠
                            flag: "0", // 1是动态生成，显示new图标
                            baseTerminal: '', // 标准码头
                            createTime: '', //创建时间
                            updateTime: '', //更新时间
                            isRedT: 1, //是否显示红色
                            isRoute: 1 , //1是起始港 2是目的港 
                            indexPo: val.index , //索引      
                        })
                    }
                    if(val.podCode == ''){  //如果目的港五子码为空
                        withArry.push({
                            id: '',
                            staticId: '',
                            portNumber: '', //挂靠顺序
                            port: val.pod, //港口英文名
                            portCode: val.podCode, //港口五子码
                            isPol: "", // 是POL还是POD，0是POL，1是POD
                            terminal: val.podTerminal, //码头,
                            terminalId: '',
                            eta: val.eta, //eta
                            etd: val.etd, //etd
                            transitTime: '', //航程
                            direction: '', // 方向
                            isSnap: 0, //是否临时挂靠
                            flag: "0", // 1是动态生成，显示new图标
                            baseTerminal: '', // 标准码头
                            createTime: '', //创建时间
                            updateTime: '', //更新时间
                            isRedT: 1, //是否显示红色
                            isRoute: 2 , //1是起始港
                            indexPo: val.index , //索引             
                        })
                    }
                    this.routeAtta = true
                    this.routeText = '修改'
                    this.routeId = val.staticId
                    this.withArry = withArry
                    this.code = code
                }
            },
            // 关闭挂靠港详情页
            handleClose() {
                this.routeAtta = false
                this.winResize()
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

            //头程动态船舶的斑马线
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
            handleCloseClick() {
                this.$emit("handleCloseDetail");
            },
            //第一条起运港 搜索
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
            //第一条起运港 foucs
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
            //第一条起运港 change
            portStartChange(val,index) {
                if(this.pathDetails[index].polTerminal) {  //若起始港码头有选择值 则设为空
                    this.pathDetails[index].polTerminal = ''
                }
                if(val == '') {
                    this.pathDetails[index].polCode = ''
                }else{
                    for (let i = 0; i < this.portStartList.length; i++) { //修改当前列表起始港五子码
                        if(this.portStartList[i].portEn === val)
                            this.pathDetails[index].polCode = this.portStartList[i].portCode
                    }
                }
            },
            //除了第一条起运港 搜索
            startRemote(value) {
                this.$axios.get(this.commonJs.localUrl +  `/schedules/path/queryPort?pol=1&port=${value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.startList = res.data.content;
                    }
                });
            },
            //除了第一条起运港 foucs
            startFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/path/queryPort?pol=1`, {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer", "Jwt")
                    }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.startList = res.data.content;
                    }
                });
            },
            //失去焦点时触发
            startBlur(val,index){
                if(val == '') {
                    this.pathDetails[index].polCode = ''
                }else{
                    for (let i = 0; i < this.startList.length; i++) { //修改当前列表起始港五子码
                        if(this.startList[i].portEn === val)
                            this.pathDetails[index].polCode = this.startList[i].portCode
                    }
                }
            },
            //除了第一条起运港 change
            startChange(val,index) {
                if(this.pathDetails[index].polTerminal) {  //若起始港码头有选择值 则设为空
                    this.pathDetails[index].polTerminal = ''
                }
                if(val == '') {
                    this.pathDetails[index].polCode = ''
                }else{
                    for (let i = 0; i < this.startList.length; i++) { //修改当前列表起始港五子码
                        if(this.startList[i].id === val)
                            this.pathDetails[index].polCode = this.startList[i].portCode
                    }
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
            portEndChange(val,index) {
                if(this.pathDetails[index].podTerminal) {  //若目的港码头有选择值 则设为空
                    this.pathDetails[index].podTerminal = ''
                }
                if(val == '') {
                    this.pathDetails[index].podCode = ''
                }else{
                    for (let i = 0; i < this.portEndList.length; i++) { //修改当前列表目的港五子码
                        if(this.portEndList[i].id === val)
                            this.pathDetails[index].podCode = this.portEndList[i].portCode
                    }
                }
            },
            //目的港endBlur
            endBlur(val,index){
                if(val == '') {
                    this.pathDetails[index].podCode = ''
                }else{
                    for (let i = 0; i < this.portEndList.length; i++) { //修改当前列表目的港五子码
                        if(this.portEndList[i].portEn === val)
                            this.pathDetails[index].podCode = this.portEndList[i].portCode
                    }
                }
            },
            //起始港码头focus
            startPortFocus(val){
                this.startPort = []
                if(val){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${val}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.startPort = res.data.content;
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: "请选择起始港"
                    });
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
                this.endPort = []
                if(val){
                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryTerminal?portCode=${val}`,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        this.endPort = res.data.content
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: "请选择目的港"
                    });
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
            //日期聚焦 
            focusDate(val,value,name,att) {
                var name = name //当前点击列表的属性
                var att = att //当前点击列表显示的属性
                if(val){
                    var newObj = value
                    newObj[name] = new Date(val) //用于数据
                    newObj[name + att] = "yyyy-MM-dd HH:mm:ss"
                }
            },
            //改变日期
            changeDate(val,value,name,att){
                var name = name //当前点击列表的属性
                var att = att //当前点击列表显示的属性
                var newObj = value
                if(val){
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
                    //得到想要的日期格式  年-月-日 （周） 进行赋值
                    newObj[name] = resDate + ' ' + resTime//用于数据
                    newObj[att] = resDate + '('+ W + ')' //用于页面显示
                    newObj[name + att] = newObj[att]
                }else{
                    newObj[name] = '' //用于数据
                    newObj[att] = '' //用于页面显示
                    newObj[name + att] = newObj[att]
                }
                this.pRout(value)
            },
            //初始话修改日期时间格式
            InitMod(val,value,name,att){
                var name = name //当前点击列表的属性
                var att = att //当前点击列表显示的属性
                var newObj = value
                if(val){
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
                    //得到想要的日期格式  年-月-日 （周） 进行赋值
                    newObj[name] = resDate + ' ' + resTime//用于数据
                    newObj[att] = resDate + '('+ W + ')' //用于页面显示
                    newObj[name + att] = newObj[att]
                }else{
                    newObj[name] = '' //用于数据
                    newObj[att] = '' //用于页面显示
                    newObj[name + att] = newObj[att]
                }
            },            
            p(s) {
                return s < 10 ? '0' + s : s
            },
            //初始化处理动态船舶
            Initialize(value){
                for (let i = 0; i < value.length; i++) {
                    var firstIn = value[i] //当前为头程 处理头程
                    firstIn.expandChange = false
                    firstIn.getUuid = this.commonJs.getUuid() + i
                    if(firstIn.dynamicEtd) { //处理ETD-动态
                        this.InitMod(firstIn.dynamicEtd,firstIn,'dynamicEtd','Etd')
                        firstIn.dynamicEtdEtd = firstIn.Etd
                    }
                    if(firstIn.atd) { //处理ATD
                        this.InitMod(firstIn.atd,firstIn,'atd','ATD')
                        firstIn.atdATD = firstIn.ATD
                    }
                    if(firstIn.dynamicEta) { //处理ETA-动态
                        this.InitMod(firstIn.dynamicEta,firstIn,'dynamicEta','dEta')
                        firstIn.dynamicEtadEta = firstIn.dEta
                    }
                    if(firstIn.ata) { //处理ATA
                        this.InitMod(firstIn.ata,firstIn,'ata','ATA')
                        firstIn.ataATA = firstIn.ATA
                    }
                    if(firstIn.vessel) { // 如果当前有船名 则船名不可修改
                        firstIn.isVessel = true
                    }
                    if(firstIn.voyage) { // 如果当前有航次 则船次不可修改
                        firstIn.isVoyage = true
                    }
                    //处理周次
                    var weekNo = ''
                    if(firstIn.weekNo) {
                        weekNo = firstIn.weekNo.split('-')
                    }
                    firstIn.weekNo = weekNo[weekNo.length - 1]
                    for (let j = 0; j < firstIn.additLeg.length; j++) {
                        var otherIn = firstIn.additLeg[j]
                        otherIn.expandChange = false
                        otherIn.getUuid = this.commonJs.getUuid() + i + j
                        if(otherIn.dynamicEtd) { //处理ETD-动态
                            this.InitMod(otherIn.dynamicEtd,otherIn,'dynamicEtd','Etd')
                            otherIn.dynamicEtdEtd = otherIn.Etd
                        }
                        if(otherIn.atd) { //处理ATD
                            this.InitMod(otherIn.atd,otherIn,'atd','ATD')
                            otherIn.atdATD = otherIn.ATD
                        }
                        if(otherIn.dynamicEta) { //处理ETA-动态
                            this.InitMod(otherIn.dynamicEta,otherIn,'dynamicEta','dEta')
                            otherIn.dynamicEtadEta = otherIn.dEta
                        }
                        if(otherIn.ata) { //处理ATA
                            this.InitMod(otherIn.ata,otherIn,'ata','ATA')
                            otherIn.ataATA = otherIn.ATA
                        }
                        if(otherIn.vessel) { // 如果当前有船名 则船名不可修改
                            otherIn.isVessel = true
                        }
                        if(otherIn.voyage) { // 如果当前有航次 则船次不可修改
                            otherIn.isVoyage = true
                        }
                        //处理周次
                        var weekNo = ''
                        if(otherIn.weekNo) {
                            weekNo = otherIn.weekNo.split('-')
                        }
                        otherIn.weekNo = weekNo[weekNo.length - 1]
                    }
                }
                return value
            },
            //监控船名和航次的修改
            changeIpu(val){
                this.pRout(val)
            },
            //监听周序号的修改
            changeWeek(val){
                this.pRout(val)
                if(val.additLeg.length > 0){ //说明有二程 三程或者 四程
                    for (let i = 0; i < val.additLeg.length; i++) {
                        val.additLeg[i].weekNo = val.weekNo
                        this.pRout(val.additLeg[i])
                    }
                }
            },
            //检查是否有重复提交的动态船舶
            pRout(list){
                if(this.gauRouteA.length > 0) {
                    for (let i = 0; i < this.gauRouteA.length; i++) {//如果存储用户修改的数组里有值 根据id比较一下
                        // if(list.id){ //说明是非空班数据  此时用id比较
                        //     if(list.id == this.gauRouteA[i].id){ //找出当前修改的是否有重复的id 有覆盖添加
                        //         this.gauRouteA.splice(i,1,list)
                        //         return
                        //     }
                        // }else{ //当前是空班数据
                        //     if(list.pathOrder == this.gauRouteA[i].pathOrder && list.weekNo == this.gauRouteA[i].weekNo){ //找出当前修改的是否有重复的id 有覆盖添加
                        //         this.gauRouteA.splice(i,1,list)
                        //         return
                        //     }
                        // }
                        if(list.getUuid && list.getUuid == this.gauRouteA[i].getUuid){ //找出当前修改的是否有重复的id 有覆盖添加
                            this.gauRouteA.splice(i,1,list)
                            return
                        }
                    }
                    this.gauRouteA.push(list)
                }else{
                    this.gauRouteA.push(list)
                }
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
            //获取航线信息
            getRouteInfo (id) {
                // debugger
                // api.getRouteInfoByPort(id).then(res => {
                //     this.routeInfo = res
                // })
            },
            //监听窗口变化
            winResize() {
                this.dataWidth = document.body.clientWidth - 180
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
            handleSaveClick() {
                this.isLoading = true
                // newPathList 新的路径详情 整理出需要的统一放在newPathList数组里
                var newPathList = []
                console.log(this.pathDetails)
                for (let q = 0; q < this.pathDetails.length; q++) {

                    if(this.ruleForm.state !== 2){
                        if(this.pathDetails[q].polCode == '') {
                            this.isLoading = false
                            this.$message({
                                type: "error",
                                message: '第' + `${this.pathDetails[q].pathOrder}` + '条起始港五字码为空,请选择起始港'
                            });
                            return
                        }
                        if(this.pathDetails[q].podCode == '') {
                            this.isLoading = false
                            this.$message({
                                type: "error",
                                message: '第' + `${this.pathDetails[q].pathOrder}` + '条目的港五字码为空，请选择目的港'
                            });
                            return
                        }
                    }
                    // if(this.pathDetails[q].isView == 1){
                        var id = this.pathDetails[q].id // 港到港路径id
                        var staticId = this.pathDetails[q].staticId // 航线id
                        var pathOrder = this.pathDetails[q].pathOrder //返给后端 标明当前数据是第几行
                        var scac = this.pathDetails[q].scac // 船公司四字码
                        var pol = this.pathDetails[q].pol // 起始港
                        var pod = this.pathDetails[q].pod // 目的港
                        var polCode = this.pathDetails[q].polCode // 起始港五字码
                        var podCode = this.pathDetails[q].podCode // 目的港五字码
                        var polTerminalId = this.pathDetails[q].polTerminalId // 起始港码头Id
                        var podTerminalId = this.pathDetails[q].podTerminalId // 目的港码头Id
                        var routeCode = this.pathDetails[q].routeCode // 航线代码
                        var displayName = this.pathDetails[q].displayName // 航线代码
                        var transitType = this.pathDetails[q].transitType // 运输类型
                        var etd = this.pathDetails[q].etd // etd
                        var eta = this.pathDetails[q].eta // eta
                        var transitTime = this.pathDetails[q].transitTime // 航程 ,如果返回的是0那么页面要显示-  
                        newPathList.push({
                            id:id,
                            staticId:staticId,
                            pathOrder:pathOrder,
                            scac:scac,
                            pol:pol,
                            pod:pod,
                            polCode:polCode,
                            podCode:podCode,
                            polTerminalId:polTerminalId,
                            podTerminalId:podTerminalId,
                            routeCode:routeCode,
                            displayName:displayName,
                            transitType:transitType,
                            etd:etd,
                            eta:eta,
                            transitTime:transitTime
                        })                  
                    // }
                }
                var query = {
                    state: this.ruleForm.state,
                    transitTime:this.ruleForm.transitTime,
                    editTransitTime:this.ruleForm.editTransitTime,
                    id: this.rowId, // 路径id（跟取详情的id一样）
                    gcId: this.gcId, // 共舱id
                    spiderId: this.ruleForm.spiderId, // 港口组合id
                    commonIds:this.commonIdsInner, //常用共舱
                    ovtIds:this.ovtIdsInner, //临时共舱
                    pathList: newPathList,
                    polCode: this.ruleForm.polCode, //起始港五子码
                    podCode: this.ruleForm.podCode, //目的港五子码
                    scac: this.ruleForm.scac, //船公司五子码
                }
                if(this.isAripty){ //需要传动态船舶
                    var dynamic = this.gauRouteA
                    var newAddArry = [] //存到后端的动态船舶数据数据
                    for (let p = 0; p < dynamic.length; p++) {
                        if(dynamic[p].id == '') { //当前数据没有船名航次
                            if(dynamic[p].vessel == ''){ //说明用户没有输入船名
                                this.isLoading = false
                                this.$message({
                                    type: "error",
                                    message: '请输入船名'
                                });
                                return
                            }
                            if(dynamic[p].voyage == ''){ //说明用户没有输入航次
                                this.isLoading = false
                                this.$message({
                                    type: "error",
                                    message: '请输入航次'
                                });
                                return
                            }
                        }
                        var weekNo = dynamic[p].weekNo //周序号
                        if(weekNo.indexOf('-') !== -1){ //如果当前周序号是 '2020-2'则截取后面的 2 转为数字
                            let noWeek = weekNo
                            weekNo = Number(noWeek.slice(noWeek.indexOf('-')+1)) //周序号
                        }
                        var id = dynamic[p].id //航次id
                        var pathOrder = dynamic[p].pathOrder
                        var p2pPathId = dynamic[p].p2pPathId // 港到港路径id
                        var part = dynamic[p].part // part
                        var dynamicId = dynamic[p].dynamicId // 动态时间id
                        var vesselId = dynamic[p].vesselId // 船id
                        var vessel = dynamic[p].vessel //船名
                        var voyage = dynamic[p].voyage //航次
                        var dynamicEtd = dynamic[p].dynamicEtd ? dynamic[p].dynamicEtd : '' //动态etd
                        var atd = dynamic[p].atd ? dynamic[p].atd : '' //实际atd
                        var dynamicEta = dynamic[p].dynamicEta ? dynamic[p].dynamicEta : '' //动态eta
                        var ata = dynamic[p].ata ? dynamic[p].ata : '' //实际ata
                        var vgm = dynamic[p].vgm ? dynamic[p].vgm : '' //截vgm
                        var cutoff = dynamic[p].cutoff ? dynamic[p].cutoff : '' //截关
                        var amsEns = dynamic[p].amsEns ? dynamic[p].amsEns : '' //截AMS/ENS
                        var siCutOff = dynamic[p].siCutOff ? dynamic[p].siCutOff : '' //截AMS/ENS
                        var updateTime = dynamic[p].updateTime ? dynamic[p].updateTime : '' //当前数据的更新时间
                        var warning = dynamic[p].warning ? dynamic[p].warning : '' //预警
                        var carrier = dynamic[p].carrier ? dynamic[p].carrier : '' //网站显示
                        newAddArry.push({
                            id:id,
                            pathOrder: pathOrder,
                            p2pPathId:p2pPathId,
                            part:part,
                            dynamicId:dynamicId,
                            vesselId:vesselId,
                            weekNo:weekNo,
                            vessel:vessel,
                            voyage:voyage,
                            dynamicEtd:dynamicEtd,
                            atd:atd,
                            dynamicEta:dynamicEta,
                            ata:ata,
                            vgm:vgm,
                            cutoff:cutoff,
                            amsEns:amsEns,
                            siCutOff:siCutOff,
                            updateTime:updateTime,
                            warning:warning,
                            carrier:carrier
                        })
                    }
                    query['dynamicList'] = newAddArry
                }
                this.$axios.post(this.commonJs.localUrl + `/schedules/path/modify`,query,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    if (res.data.status == 1) {
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.$emit("updatInfor");
                        this.handleCloseClick()
                        this.isLoading = false
                    }else if (res.data.status == 6) {
                        this.$message({
                            type: "error",
                            message: "该路径的航线或港口组合是无效状态，请将路径设置为屏蔽"
                        });
                        this.isLoading = false
                    }else if (res.data.status == 7) {
                        this.$message({
                            type: "error",
                            message: "存在相同船名航次"
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
            //在有班期调过来有五子码的时候保存
            fiveCode(){
                this.isLoading = true
                // newPathList 新的路径详情 整理出需要的统一放在newPathList数组里
                var newPathList = []
                for (let q = 0; q < this.pathDetails.length; q++) {
                        var id = this.pathDetails[q].id // 港到港路径id
                        var staticId = this.pathDetails[q].staticId // 航线id
                        var pathOrder = this.pathDetails[q].pathOrder //返给后端 标明当前数据是第几行
                        var scac = this.pathDetails[q].scac // 船公司四字码
                        var pol = this.pathDetails[q].pol // 起始港
                        var pod = this.pathDetails[q].pod // 目的港
                        var polCode = this.pathDetails[q].polCode // 起始港五字码
                        var podCode = this.pathDetails[q].podCode // 目的港五字码
                        var polTerminalId = this.pathDetails[q].polTerminalId // 起始港码头Id
                        var podTerminalId = this.pathDetails[q].podTerminalId // 目的港码头Id
                        var routeCode = this.pathDetails[q].routeCode // 航线代码
                        var displayName = this.pathDetails[q].displayName // 航线代码
                        var transitType = this.pathDetails[q].transitType // 运输类型
                        var etd = this.pathDetails[q].etd // etd
                        var eta = this.pathDetails[q].eta // eta
                        var transitTime = this.pathDetails[q].transitTime // 航程 ,如果返回的是0那么页面要显示-  
                        newPathList.push({
                            id:id,
                            staticId:staticId,
                            pathOrder:pathOrder,
                            scac:scac,
                            pol:pol,
                            pod:pod,
                            polCode:polCode,
                            podCode:podCode,
                            polTerminalId:polTerminalId,
                            podTerminalId:podTerminalId,
                            displayName:displayName,
                            transitType:transitType,
                            etd:etd,
                            eta:eta,
                            transitTime:transitTime
                        })                  
                    // }
                }
                var query = {
                    state: this.ruleForm.state,
                    transitTime:this.ruleForm.transitTime,
                    editTransitTime:this.ruleForm.editTransitTime,
                    id: this.rowId, // 路径id（跟取详情的id一样）
                    spiderId: this.ruleForm.spiderId, // 港口组合id
                    gcId: this.gcId, // 共舱id
                    commonIds:this.commonIdsInner, //常用共舱
                    ovtIds:this.ovtIdsInner, //临时共舱
                    pathList: newPathList,
                    polCode: this.ruleForm.polCode, //起始港五子码
                    podCode: this.ruleForm.podCode, //目的港五子码
                    scac: this.ruleForm.scac, //船公司五子码
                }

                if(this.isAripty){ //需要传动态船舶
                    var dynamic = this.gauRouteA
                    var newAddArry = [] //存到后端的动态船舶数据数据
                    for (let p = 0; p < dynamic.length; p++) {
                        if(dynamic[p].id == '') { //当前数据没有船名航次
                            if(dynamic[p].vessel == ''){ //说明用户没有输入船名
                                this.isLoading = false
                                this.$message({
                                    type: "error",
                                    message: '请输入船名'
                                });
                                return
                            }
                            if(dynamic[p].voyage == ''){ //说明用户没有输入航次
                                this.isLoading = false
                                this.$message({
                                    type: "error",
                                    message: '请输入航次'
                                });
                                return
                            }
                        }
                        var weekNo = dynamic[p].weekNo //周序号
                        if(weekNo.indexOf('-') !== -1){ //如果当前周序号是 '2020-2'则截取后面的 2 转为数字
                            let noWeek = weekNo
                            weekNo = Number(noWeek.slice(noWeek.indexOf('-')+1)) //周序号
                        }
                        var id = dynamic[p].id //航次id
                        var p2pPathId = dynamic[p].p2pPathId // 港到港路径id
                        var part = dynamic[p].part // part
                        var dynamicId = dynamic[p].dynamicId // 动态时间id
                        var vesselId = dynamic[p].vesselId // 船id
                        var vessel = dynamic[p].vessel //船名
                        var voyage = dynamic[p].voyage //航次
                        var dynamicEtd = dynamic[p].dynamicEtd ? dynamic[p].dynamicEtd : '' //动态etd
                        var atd = dynamic[p].atd ? dynamic[p].atd : '' //实际atd
                        var dynamicEta = dynamic[p].dynamicEta ? dynamic[p].dynamicEta : '' //动态eta
                        var ata = dynamic[p].ata ? dynamic[p].ata : '' //实际ata
                        var vgm = dynamic[p].vgm ? dynamic[p].vgm : '' //截vgm
                        var cutoff = dynamic[p].cutoff ? dynamic[p].cutoff : '' //截关
                        var amsEns = dynamic[p].amsEns ? dynamic[p].amsEns : '' //截AMS/ENS
                        var siCutOff = dynamic[p].siCutOff ? dynamic[p].siCutOff : '' //截AMS/ENS
                        var updateTime = dynamic[p].updateTime ? dynamic[p].updateTime : '' //当前数据的更新时间
                        var warning = dynamic[p].warning ? dynamic[p].warning : '' //预警
                        var carrier = dynamic[p].carrier ? dynamic[p].carrier : '' //网站显示
                        newAddArry.push({
                            id:id,
                            p2pPathId:p2pPathId,
                            part:part,
                            dynamicId:dynamicId,
                            vesselId:vesselId,
                            weekNo:weekNo,
                            vessel:vessel,
                            voyage:voyage,
                            dynamicEtd:dynamicEtd,
                            atd:atd,
                            dynamicEta:dynamicEta,
                            ata:ata,
                            vgm:vgm,
                            cutoff:cutoff,
                            amsEns:amsEns,
                            siCutOff:siCutOff,
                            updateTime:updateTime,
                            warning:warning,
                            carrier:carrier
                        })
                    }
                    query['dynamicList'] = newAddArry
                }
                this.$axios.post(this.commonJs.localUrl + `/schedules/path/modify`,query,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    if (res.data.status == 1) {
                        this.pathDetail()
                    }else if (res.data.status == 0) {
                       
                    }
                })
            },
            // 子组件新增 或者 修改数据 成功  父组件重新渲染页面
            manageUpdat(val) {
                this.isTrueUpdate = true
                if(val.length > 0) { //说明挂靠港有往路径详情里带数据
                    for (let i = 0; i < val.length; i++) {
                        var index = val[i].index
                        if(val[i].isRoute == 1){ //说明是起始港
                            this.pathDetails[index].polCode = val[i].portCode
                        }
                        if(val[i].isRoute == 2){ //说明是目的港
                            this.pathDetails[index].podCode = val[i].portCode
                        }
                    }
                    this.fiveCode()
                }else{
                    this.pathDetail()
                }
            },
            //获取周序号 从 1 获取到当前 + 4
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
                var weekYear = s2 + 4 //这个是当前第几周 + 4
                if(s2 + 4 < this.weeks){ //如果 当前第几周+4小于今年多少周 则
                    weekYear = s2 + 4
                }else{ //否则
                    weekYear = this.weeks
                }
                for (let i = 0; i < weekYear; i++) {
                    this.weekList.push({
                        value : Y + '-' + i,
                        label : Y + '-' + i,
                    })
                }
            },
            //获取今年有多少周
            weekNumber() {
                var d1 = new Date()
                var Y = d1.getFullYear()
                var S = Y + '-' + '01' + '-' + '01' //一年的开始时间
                var E = Y + '-' + '12' + '-' + '31' //一年的结束时间
                let currentYearDays = this.isLeapYear(Y) ? 366 : 365
                let beforeDays = 7 - this.getDate(S)+1
                let afterDays = this.getDate(E)
                let vaildDays = currentYearDays - beforeDays - afterDays
                this.weeks = (vaildDays / 7) + 1 //加的这一 若是这周是从星期三开始的 我减去了前面的天数
                for (let i = 0; i <= this.weeks; i++) {
                    this.weekList.push({
                        value : '' + i,
                        label : '' + i,
                    })
                }
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
        mounted() {
            var d1 = new Date()
            this.currentYear = d1.getFullYear()
            this.weekNumber() //获取今年一共有多少周 周序号全部
            // this.getWeekYear() //获取周序号 从 1 获取到当前 + 4
            if(this.dialogInnerDetail == "详情" ){
                this.addOrEdit = "详情"
                this.getRouteInfo(this.rowId) //获取航线信息
                this.pathDetail() //取路径详情
                this.winResize() //监听窗口变化
            }
        },
        watch:{
            screenWidth (val) {
                this.screenWidth = val
                if(this.screenWidth <= 500){
                    this.dataWidth = this.dataWidth
                }else{
                this.dataWidth = this.screenWidth - 180
                }
            },
            screenHeight (val) {
               var height = val - 80
               this.innerHeight = height  + 'px'
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
        margin-right: 20px !important;
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
    .pathRecover{
        display: inline-block;
        margin-left: 10px;
        vertical-align: top;
        color: red;
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
    .comRoutUl{
        width: 100%;
        overflow: hidden;
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
    .huan{
        position: absolute;
        width: 17px;
        height: 15px;
        left: 0px;
        top: 12px;    
    }
</style>