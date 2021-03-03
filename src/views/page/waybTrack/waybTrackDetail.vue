<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="100px"
        :model="ruleForm"
        ref="ruleForm"
        size="mini"
        class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">{{addOrEdit}}</label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <div :style="{height: innerHeight}"  class="scrollDiv">
                <ul class="routeUl">
                    <!-- <li class="routeLi">
                        <div class="shipData">      
                            <RouteMap :route-info="routeInfo"></RouteMap>
                        </div>   
                    </li>                      -->
                    <li class="routeLi">
                        <div class="title">
                            <span>运单信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="运单号" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.referenceno" placeholder="请输入" :readonly ="isDisable" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="起运港" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.pol" placeholder="请输入" @focus='focusDete(ruleForm.pol,"起运港")' @blur='disBlur(ruleForm.pol,"pol")'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="目的港" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.dtp" placeholder="请输入" @focus='focusDete(ruleForm.dtp,"目的港")' @blur='disBlur(ruleForm.dtp,"dtp")'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="中转港" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.trspplace" placeholder="请输入" @focus='focusDete(ruleForm.trspplace,"中转港")' @blur='disBlur(ruleForm.trspplace,"trspplace")'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="ETA" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.etapld"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="etaEtdTime($event,'etapld')"
                                            @focus='focusDete(ruleForm.etapld,"ETA")' 
                                            @blur='disBlur(ruleForm.etapld,"etapld")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="ETD" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.etdpol"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="etaEtdTime($event,'etdpol')"
                                            @focus='focusDete(ruleForm.etdpol,"ETD")' 
                                            @blur='disBlur(ruleForm.etdpol,"etdpol")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="船公司" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.carriercd" placeholder="请输入" :readonly="isDisable"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="船名" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.vslname" placeholder="请输入" @focus='focusDete(ruleForm.vslname,"船名")' @blur='disBlur(ruleForm.vslname,"vslname")'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="航次" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.voy" placeholder="请输入" @focus='focusDete(ruleForm.voy,"航次")' @blur='disBlur(ruleForm.voy,"voy")'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="航程" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.voyage" placeholder="请输入" clearable :readonly="isDisable"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="箱型/箱量" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.ctypesize" placeholder="请输入" clearable :readonly="isDisable"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:48%">
                                <el-form-item label="备注" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.remark" placeholder="请输入" clearable :readonly="isNote"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>起运港码头服务</span>
                        </div>
                        <el-row>
                            <el-col style="width:27%">
                                <el-form-item label="服务码头" class="el_formContent" label-width="93px">
                                    <el-input class="inputWidth" v-model="ruleForm.terminal" placeholder="请输入" @focus='focusDete(ruleForm.terminal,"服务码头")' @blur='disBlur(ruleForm.terminal,"terminal")'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="开港时间" class="el_formContent" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.opentime"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'opentime')"
                                            @focus='focusDete(ruleForm.opentime,"开港时间")' 
                                            @blur='disBlur(ruleForm.opentime,"opentime")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="截港时间" class="el_formContent" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.closetime"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'closetime')"
                                            @focus='focusDete(ruleForm.closetime,"截港时间")' 
                                            @blur='disBlur(ruleForm.closetime,"closetime")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <span class="promptIn">提示：信息由码头提供！</span>
                        </el-row>
                        <el-row>
                            <el-col style="width:27%">
                                <el-form-item label="截VGM时间" class="el_formContent" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.vgmtime"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'vgmtime')"
                                            @focus='focusDete(ruleForm.vgmtime,"截VGM时间")' 
                                            @blur='disBlur(ruleForm.vgmtime,"vgmtime")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="截AMS/ENS" class="el_formContent" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.amstime"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'amstime')"
                                            @focus='focusDete(ruleForm.amstime,"截AMS/ENS")' 
                                            @blur='disBlur(ruleForm.amstime,"amstime")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="截关时间" class="el_formContent" label-width="93px">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.etctime"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'etctime')"
                                            @focus='focusDete(ruleForm.etctime,"截关时间")' 
                                            @blur='disBlur(ruleForm.etctime,"etctime")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <span class="promptIn">提示：信息由船公司提供！</span>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>起运港船舶计划</span>
                            <span class="promptIn">提示：信息由码头提供！</span>
                        </div>
                        <el-row>
                            <el-col style="width:30%">
                                <el-form-item label="计划靠泊" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.eta"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'eta')"
                                            @focus='focusDete(ruleForm.eta,"计划靠泊")' 
                                            @blur='disBlur(ruleForm.eta,"eta")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="实际靠泊" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.ata"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'ata')"
                                            @focus='focusDete(ruleForm.ata,"实际靠泊")' 
                                            @blur='disBlur(ruleForm.ata,"ata")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:30%">
                                <el-form-item label="计划离泊" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.etd"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'etd')"
                                            @focus='focusDete(ruleForm.etd,"计划离泊")' 
                                            @blur='disBlur(ruleForm.etd,"etd")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="实际离泊" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.atd"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'atd')"
                                            @focus='focusDete(ruleForm.atd,"实际离泊")' 
                                            @blur='disBlur(ruleForm.atd,"atd")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>目的港船舶计划</span>
                            <span class="promptIn">提示：信息由船期和AIS提供！</span>
                        </div>
                        <el-row>
                            <el-col style="width:30%">
                                <el-form-item label="计划靠泊" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.etdpol"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @change="appTime($event,'etdpol')"
                                            @focus='focusDete(ruleForm.etdpol,"计划靠泊")' 
                                            @blur='disBlur(ruleForm.etdpol,"etdpol")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="实际靠泊" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.dschtime"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            style="width:100%"
                                            @change="appTime($event,'dschtime')"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @focus='focusDete(ruleForm.dschtime,"实际靠泊")' 
                                            @blur='disBlur(ruleForm.dschtime,"dschtime")'
                                            >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>关联船期&船舶信息</span>
                            <span class="promptIn">提示：根据以上运单信息自动关联船期的起运港服务信息；关联船舶船期船舶计划和轨迹信息。</span>
                        </div>
                        <el-row>
                            <el-col style="width:60%">
                                <el-form-item label="船期路径" class="el_formContent">
                                    <el-select 
                                        remote  
                                        :clearable="!ruleForm.routewayTrue"
                                        filterable  
                                        v-model="ruleForm.routeway" 
                                        placeholder="请输入并选择"
                                        :remote-method="routewayRemote"
                                        @change="routewayChange"
                                        @focus='focusDete(ruleForm.routeway,"船期路径")'
                                        @blur='disBlur(ruleForm.routeway,"routeway")'
                                        style="width:100%"
                                    >
                                        <el-option
                                            v-for="item in routewayList"
                                            :key="item.id"
                                            :label="item.routeway"
                                            :value="item.routeway"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="周次" class="el_formContent">
                                    <el-select
                                        v-model="ruleForm.staticweek"
                                        :clearable="!ruleForm.staticweekTrue"
                                        style="width:100%;"
                                        placeholder="请选择"
                                        default-first-option
                                        @focus='focusDete(ruleForm.staticweek,"周次")' 
                                        @blur='disBlur(ruleForm.staticweek,"staticweek")'
                                    >
                                        <el-option
                                            v-for="item in weekList"
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
                        <div class="title">
                            <span>箱货跟踪</span>
                        </div>
                        <el-table
                            :data="ruleForm.cntList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="multipleTable"
                        >
                            <el-table-column prop="index" label="序号" align="left" width="50" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <span>{{scope.row.index+1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ctnrno" label="箱号" align="left" :show-overflow-tooltip="true" min-width="150">
                                <template slot-scope="scope">
                                    <!-- <div class="sel-input">
                                        <el-input v-model="scope.row.ctnrno"/>
                                    </div> -->
                                    {{scope.row.ctnrno}}
                                </template> 
                            </el-table-column>
                            <el-table-column prop="sealno" label="封号" align="left" :show-overflow-tooltip="true" min-width="150">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.sealno" @focus='focusBox(scope.row.sealno,"封号")' @blur='blurBox(scope.row.sealno,"sealno",scope.row.index)'/>
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="csize" label="箱型" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.csize" @input="scope.row.csize = scope.row.csize.toUpperCase() || ''" @focus='focusBox(scope.row.csize,"箱型")' @blur='blurBox(scope.row.csize,"csize",scope.row.index)'/>
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="pieces" label="件数" align="left" :show-overflow-tooltip="true" min-width="110">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.pieces" @input="scope.row.pieces = scope.row.pieces.match(/^\d*(\.?\d{0,2})/g)[0] || ''" @focus='focusBox(scope.row.pieces,"件数")' @blur='blurBox(scope.row.pieces,"pieces",scope.row.index)'/>
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="grosswgt" label="毛重" align="left" :show-overflow-tooltip="true" min-width="130">
                                <template slot-scope="scope">
                                    <div class="sel-ppp">
                                        <el-input v-model="scope.row.grosswgt" @input="scope.row.grosswgt = scope.row.grosswgt.match(/^\d*(\.?\d{0,2})/g)[0] || ''" @focus='focusBox(scope.row.grosswgt,"毛重")' @blur='blurBox(scope.row.grosswgt,"grosswgt",scope.row.index)'/>
                                        <span>{{ 'KG'}}</span>
                                    </div>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="volume" label="体积" align="left" :show-overflow-tooltip="true" min-width="130">
                                <template slot-scope="scope">
                                    <div class="sel-ppp" v-if="scope.row.from == 1">
                                        <el-input v-model="scope.row.volume" @input="scope.row.volume = scope.row.volume.match(/^\d*(\.?\d{0,2})/g)[0] || ''" @focus='focusBox(scope.row.volume,"体积")' @blur='blurBox(scope.row.volume,"volume",scope.row.index)'/>
                                        <span>{{ 'CBM'}}</span>
                                    </div>
                                    <span v-else>{{scope.row.volume ? scope.row.volume : '-'}}</span>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="newest" label="最新状态" align="left" :show-overflow-tooltip="true" min-width="200">
                                <!-- <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-input v-model="scope.row.newest"/>
                                    </div>
                                </template>  -->
                                <template slot-scope="scope">
                                    {{scope.row.newest ? scope.row.newest : '-'}}
                                </template> 
                            </el-table-column>
                            <el-table-column prop="ata" label="详情" align="left" :show-overflow-tooltip="true" min-width="60">
                                <template slot-scope="scope"> 
                                    <span class="look" @click="lookVessel(scope.row)">查看</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span style="color:#000;font-weight:normal">{{referenceno}}</span>
                        </div>
                        <el-table
                            :data="cargoList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="multipleTable"
                        >
                            <el-table-column prop="isest" label="预计/实际" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <span :class="scope.row.isest == 'Y' ? 'shen' : 'qian'">{{ scope.row.isest == 'Y' ? '预计' : scope.row.isest == 'N' ? '实际' : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="statedescription" label="标准状态" align="left" :show-overflow-tooltip="true" min-width="80">

                            </el-table-column>
                            <el-table-column prop="estimated" label="计划时间" align="left" :show-overflow-tooltip="true" min-width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            :class="scope.row.isest == 'Y' ? 'shen' : 'qian'"
                                            :clearable = false
                                            v-model="scope.row.estimated"
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            @change="fasTime($event,scope.row.index,'estimated')"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @focus='focusNode(scope.row.estimated,"计划时间")' 
                                            @blur='blurNode(scope.row.estimated,"estimated",scope.row.index)'
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="timetOccu" label="发生时间" align="left" :show-overflow-tooltip="true" min-width="180">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.timetOccu"
                                            :clearable = false
                                            type="datetime"
                                            placeholder="选择日期时间"
                                            @change="fasTime($event,scope.row.index,'timetOccu')"
                                            style="width:100%"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            @focus='focusNode(scope.row.timetOccu,"发生时间")' 
                                            @blur='blurNode(scope.row.timetOccu,"timetOccu",scope.row.index)'
                                            >
                                        </el-date-picker>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="statedescription_en" label="原始状态" align="left" :show-overflow-tooltip="true" min-width="250">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.statedescription_en" @change="upInput(scope.row.index)" @focus='focusNode(scope.row.statedescription_en,"原始状态")' @blur='blurNode(scope.row.statedescription_en,"statedescription_en",scope.row.index)'/>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="statusplace" label="发生地" align="left" :show-overflow-tooltip="true" min-width="150">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.statusplace" @change="upInput(scope.row.index)" @focus='focusNode(scope.row.statusplace,"发生地")' @blur='blurNode(scope.row.statusplace,"statusplace",scope.row.index)'/>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="vslname" label="船名" align="left" :show-overflow-tooltip="true" min-width="170">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.vslname" @change="upInput(scope.row.index)" @focus='focusNode(scope.row.vslname,"船名")' @blur='blurNode(scope.row.vslname,"vslname",scope.row.index)'/>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="voy" label="航次" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input v-model="scope.row.voy" @change="upInput(scope.row.index)" @focus='focusNode(scope.row.voy,"航次")' @blur='blurNode(scope.row.voy,"voy",scope.row.index)'/>
                                    </div>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="source" label="来源" align="left" :show-overflow-tooltip="true" min-width="80">

                            </el-table-column>
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" style="margin-right: 60px" @click="handleClickImmediate">立即刷新</el-button>
                    <el-button class="saveBtn" @click="handleSaveClick()">保存</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    import RouteMap from '@/components/RouteMap/RouteMap'
    import api from '@/components/RouteMap/api'
    export default {
        props: [
            "tratckText",
            "okeyid",
            "userType",
            "userid",
            ],
        data() {
            return {
                addOrEdit: "", //标题
                isDisable: false, //是否可修改
                isLoading: false, //loading
                referenceno: '', //运单号详情
                isYundang: false, //是否可以立即更新
                routeInfo: null,
                routewayList: [], //船期路径列表
                weekList: [], //周次
                isNote: false, //是否可以修改备注
                ruleForm:{
                    userId: '', //userId
                    keyid: '', //keyid
                    ckeyid: '', //
                    referenceno: '',//订阅号
                    pol: '',//起始港
                    polcd: '', //起始港五子码
                    dtp: '',//目的港
                    etapld: "",//计划到港时间 eta
                    carriercd: "",//船公司
                    vslname: "",//船名
                    etdpol: "",//计划离港时间 etd
                    voy: "",//航次
                    trspplace: "",//中转港
                    ctypesize: "",//箱型数量
                    voyage: "",//航程
                    remark: "",//备注 
                    terminal: "",//码头
                    opentime: "",//开港时间
                    closetime: "",//截港时间
                    vgmtime: "",//截VGM时间
                    amstime: "",//截AMS/ENS时间
                    etctime: "",//截关时间
                    // 码头船舶计划 开始
                    etd: "", //计划离
                    atd: "",//实际离
                    eta: "", //计划到
                    ata: "",//实际到
                    dschtime: "",
                    lkeyid: "", //船舶计划ID  若是 计划离 实际离 计划到 实际到都为空则往后端传 ""
                    // 码头船舶计划 结束
                    isCtnr: "",
                    routeway: "",//船期路径
                    mid: "",//mid 地图接口主键参数
                    staticweek: "",//周次
                    cntList: [], //箱子列表           
                },
                cargoList: [], //运单号详情表
                innerHeight: '',
                screenHeight: '',
                inputInner: '', //之前input框的值
                inputText: '', //当前input框的属性名
            };
        },
        components: {
            loading,
            RouteMap,
        },
        methods: {
            //取跟踪详情
            detailTrack(){
                this.isLoading = true
                var chuancan = {
                    okeyid: this.okeyid,
                    userType: this.userType == '1' ? 1 : this.userType == '2' ? 2 : '',
                    // userType: this.userType,
                    userid: this.userid
                }
                if(this.userType == '1') {
                    this.isNote = true
                }else{
                    this.isNote = false
                }
                this.$axios.post(this.commonJs.localUrl + `/schedules/trace/details`,chuancan
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.getRouteInfo(res.data.content.mid) //地图接口主键参数获取地图
                        this.isYundang = res.data.content.isYundang //是否可以立即更新
                        this.ruleForm.mid = res.data.content.mid //地图接口主键id
                        this.ruleForm.keyid = res.data.content.keyid //keyid
                        this.ruleForm.userId = res.data.content.userId //userId
                        this.ruleForm.ckeyid = res.data.content.ckeyid //ckeyid
                        this.ruleForm.referenceno = res.data.content.referenceno //订阅号
                        this.ruleForm.pol = res.data.content.pol //起始港
                        this.ruleForm.polTrue = res.data.content.pol ? true : false //判断第一次是否有值
                        this.ruleForm.polcd = res.data.content.polcd //起始港五子码
                        this.ruleForm.dtp = res.data.content.dtp //目的港
                        this.ruleForm.dtpTrue = res.data.content.dtp ? true : false //判断第一次是否有值
                        this.ruleForm.etapld = res.data.content.etapld ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.etapld)): '' //计划到港时间 eta
                        this.ruleForm.etapldTrue = res.data.content.etapld ? true : false //判断第一次是否有值
                        this.ruleForm.carriercd = res.data.content.carriercd //船公司
                        this.ruleForm.carriercdTrue = res.data.content.carriercd ? true : false //判断第一次是否有值
                        this.ruleForm.vslname = res.data.content.vslname //船名
                        this.ruleForm.vslnameTrue = res.data.content.vslname ? true : false //判断第一次是否有值
                        this.ruleForm.etdpol = res.data.content.etdpol ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.etdpol)): '' //计划离港时间 etd
                        this.ruleForm.etdpolTrue = res.data.content.etdpol ? true : false //判断第一次是否有值
                        this.ruleForm.voy = res.data.content.voy //航次
                        this.ruleForm.voyTrue = res.data.content.voy ? true : false //判断第一次是否有值
                        this.ruleForm.trspplace = res.data.content.trspplace //中转港
                        this.ruleForm.trspplaceTrue = res.data.content.trspplace ? true : false
                        this.ruleForm.ctypesize = res.data.content.ctypesize //箱型数量
                        this.ruleForm.ctypesizeTrue = res.data.content.ctypesize ? true : false //判断第一次是否有值
                        this.ruleForm.voyage = res.data.content.voyage //航程
                        this.ruleForm.voyageTrue = res.data.content.voyage ? true : false //判断第一次是否有值
                        this.ruleForm.remark = res.data.content.remark //备注 
                        this.ruleForm.remarkTrue = res.data.content.remark ? true : false //判断第一次是否有值
                        this.ruleForm.terminal = res.data.content.terminal //码头
                        this.ruleForm.terminalTrue = res.data.content.terminal ? true : false //判断第一次是否有值
                        this.ruleForm.opentime = res.data.content.opentime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.opentime)): '' //开港时间
                        this.ruleForm.opentimeTrue = res.data.content.opentime ? true : false //判断第一次是否有值
                        this.ruleForm.closetime = res.data.content.closetime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.closetime)): '' //截港时间
                        this.ruleForm.closetimeTrue = res.data.content.closetime ? true : false //判断第一次是否有值
                        this.ruleForm.vgmtime = res.data.content.vgmtime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.vgmtime)): '' //截VGM时间
                        this.ruleForm.vgmtimeTrue = res.data.content.vgmtime ? true : false //判断第一次是否有值
                        this.ruleForm.amstime = res.data.content.amstime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.amstime)): '' //截AMS/ENS时间
                        this.ruleForm.amstimeTrue = res.data.content.amstime ? true : false //判断第一次是否有值
                        this.ruleForm.etctime = res.data.content.etctime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.etctime)): '' //截关时间
                        this.ruleForm.etctimeTrue = res.data.content.etctime ? true : false //判断第一次是否有值
                        // // 码头船舶计划 开始
                        this.ruleForm.etd = res.data.content.etd ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.etd)): '' //计划离
                        this.ruleForm.etdTrue = res.data.content.etd ? true : false //判断第一次是否有值
                        this.ruleForm.atd = res.data.content.atd ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.atd)): '' //实际离
                        this.ruleForm.atdTrue = res.data.content.atd ? true : false //判断第一次是否有值
                        this.ruleForm.eta = res.data.content.eta ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.eta)): '' //计划到
                        this.ruleForm.etaTrue = res.data.content.eta ? true : false //判断第一次是否有值
                        this.ruleForm.ata = res.data.content.ata ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.ata)): '' //实际到
                        this.ruleForm.ataTrue = res.data.content.ata ? true : false //判断第一次是否有值
                        this.ruleForm.dschtime = res.data.content.dschtime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.dschtime)): '' //实际到
                        this.ruleForm.dschtimeTrue = res.data.content.dschtime ? true : false //判断第一次是否有值
                        this.ruleForm.lkeyid = res.data.content.lkeyid // 船舶计划id
                        // // 码头船舶计划 结束
                        this.ruleForm.isCtnr = res.data.content.isCtnr
                        this.ruleForm.routeway = res.data.content.routeway //船期路径
                        this.ruleForm.routewayTrue = res.data.content.routeway ? true :false //判断第一次是否有值
                        this.ruleForm.staticweek = res.data.content.staticweek ? this.chuWeek(res.data.content.staticweek) : '' //周次
                        this.ruleForm.staticweekTrue = res.data.content.staticweek ? true :false //判断第一次是否有值
                        // this.ruleForm.cntList = res.data.content.cntList //箱子列表
                        if(res.data.content.cntList.length > 0) {
                            this.entireBox(res.data.content.cntList)
                        }else{
                            this.ruleForm.cntList = []
                        }
                        this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //处理所有个箱子节点
            entireBox(val) {
                for (let i = 0; i < val.length; i++) { //循环箱货跟踪
                    var caroObject = val[i] //每个箱子对应的信息
                    caroObject.newest = '' //添加最新箱子状态
                    var ctype = caroObject.ctype
                    if(caroObject.csize) { //如果箱子返回的箱量有数据
                        if(caroObject.csize.indexOf(ctype) !== -1) { //如果带单位
                            caroObject.csize = caroObject.csize //则返回的什么就是什么
                        }else{ //否则就加上单位
                            caroObject.csize = caroObject.csize + ctype //箱量
                        }
                    }else{ //返回无数据则为’‘
                        caroObject.csize = ''
                    }
                    // if(caroObject.grosswgt) { //如果箱子返回的毛重有数据
                    //     if(caroObject.grosswgt.indexOf('KG') !== -1) { //如果带单位
                    //         caroObject.grosswgt = caroObject.grosswgt //则返回的什么就是什么
                    //     }else{ //否则就加上单位
                    //         caroObject.grosswgt = caroObject.grosswgt + 'KG' //毛重
                    //     }
                    // }else{ //返回无数据则为’‘
                    //     caroObject.grosswgt = ''
                    // }
                    // if(caroObject.volume) { //如果箱子返回的体积有数据
                    //     if(caroObject.volume.indexOf("CBM") !== -1) { //如果带单位
                    //         caroObject.volume = caroObject.volume //则返回的什么就是什么
                    //     }else{ //否则就加上单位
                    //         caroObject.volume = caroObject.volume + 'CBM' //体积
                    //     }
                    // }else{ //返回无数据则为’‘
                    //     caroObject.volume = ''
                    // }

                    // 在这里处理箱子信息 是否最开始的值为true还是false
                    caroObject.sealnoTrue = caroObject.sealno ? true : false
                    caroObject.csizeTrue = caroObject.csize ? true : false
                    caroObject.piecesTrue = caroObject.pieces ? true : false
                    caroObject.grosswgtTrue = caroObject.grosswgt ? true : false
                    caroObject.volumeTrue = caroObject.volume ? true : false

                    var stsp = {  //提空箱
                        statuscd: "STSP",
                        statedescription: "提空箱",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的id
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var fcgi = {  //返场
                        statuscd: "FCGI",
                        statedescription: "返场",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var cggi = {  //入场
                        statuscd: "CGGI",
                        statedescription: "入场",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var glod = {  //封箱
                        statuscd: "CLOD",
                        statedescription: "封箱",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var cytc = {  //集港
                        statuscd: "CYTC",
                        statedescription: "集港",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var gitm = {  //进场
                        statuscd: "GITM",
                        statedescription: "进场",
                        source: '码头',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var pass = { //海关放行
                        statuscd: "PASS",
                        statedescription: "海关放行",
                        source: '码头',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var tmps = { //码头放行
                        statuscd: "TMPS",
                        statedescription: "码头放行",
                        source: '码头',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var prld = { //配载
                        statuscd: "PRLD",
                        statedescription: "配载",
                        source: '码头',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var lobd = { //装船
                        statuscd: "LOBD",
                        statedescription: "装船",
                        source: '码头',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var dlpt = { //离港
                        statuscd: "DLPT",
                        statedescription: "开航",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var tsba = { //中转抵港
                        statuscd: "TSBA",
                        statedescription: "中转抵港",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var tsdc = { //中转卸船
                        statuscd: "TSDC",
                        statedescription: "中转卸船",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var tslb = { //中转装船 
                        statuscd: "TSLB",
                        statedescription: "中转装船",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var tsdp = { //中转开航
                        statuscd: "TSDP",
                        statedescription: "中转开航",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var bdar = { //抵港
                        statuscd: "BDAR",
                        statedescription: "抵港",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var dsch = { //卸船
                        statuscd: "DSCH",
                        statedescription: "卸船",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var stcs = { //提柜货
                        statuscd: "STCS",
                        statedescription: "提柜货",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    var rcve = { //还空
                        statuscd: "RCVE",
                        statedescription: "还空",
                        source: '船公司',
                        keyid: '' ,//用来区分用户是否有输入改变
                        fkeyid: '', //改变数据是要往后端存的
                        isModify: 0, // isModify 0 为未修改数据 1为老数据+新增数据
                        isest: '', //当前是预计还是实际 Y预计 N 实际
                        statedescription_en: '', //英文描述的地点
                        statusplace: '', //中文地点
                        voy: '', //航次
                        vslname: '', //船名
                    }
                    //caroObject 箱子新节点信息
                    caroObject.newStatus = [stsp,fcgi,cggi,glod,cytc,gitm,pass,tmps,prld,lobd,dlpt,tsba,tsdc,tslb,tsdp,bdar,dsch,stcs,rcve]
                    if(caroObject.stateList && caroObject.stateList.length > 0) { //如果箱子的节点信息数组大于0 
                        for (let index = 0; index < caroObject.newStatus.length; index++) {
                            var newStatus = caroObject.newStatus[index]
                            for (let j = 0; j < caroObject.stateList.length; j++){
                                var state = caroObject.stateList[j]
                                if(state.statuscd == newStatus.statuscd){
                                    newStatus.fkeyid = state.fkeyid // 父级id
                                    newStatus.keyid = state.keyid
                                    newStatus.isModify = 0 //当前为老数据
                                    newStatus.blno = state.blno //处理提单号
                                    newStatus.vslname = state.vslname //船名
                                    newStatus.voy = state.voy //航次
                                    newStatus.statuscd = state.statuscd //英文状态
                                    // newStatus.statedescription = state.statedescription //汉字状态
                                    if(state.isest == 'N') { //如果当前节点有N 除了预计时间其他的直接走N的数据
                                        newStatus.isest = state.isest //是否预计、实际
                                        newStatus.statedescription_en = state.statedescription_en //原始状态英文描述
                                        newStatus.statusplace = state.statusplace //发生地
                                        newStatus.createtime = state.createtime  ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(state.createtime)): ''
                                        newStatus.updatetime = state.updatetime  ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(state.updatetime)): ''
                                    }else if(state.isest == 'Y') { //当前节点为Y
                                        if(newStatus.isest !== 'N') { //当前节点为Y 并且之前当前节点并没有走N
                                            newStatus.isest = state.isest //是否预计、实际
                                            newStatus.statedescription_en = state.statedescription_en //原始状态英文描述
                                            newStatus.statusplace = state.statusplace //发生地
                                            newStatus.createtime = state.createtime  ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(state.createtime)): ''
                                            newStatus.updatetime = state.updatetime  ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(state.updatetime)): ''
                                        }
                                    }else{ //当前不知道预计实际 也就是没有isest
                                        newStatus.statedescription_en = state.statedescription_en //原始状态英文描述
                                        newStatus.statusplace = state.statusplace //发生地
                                        newStatus.createtime = state.createtime  ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(state.createtime)): ''
                                        newStatus.updatetime = state.updatetime  ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(state.updatetime)): ''
                                    }
                                    if(state.isest == 'Y') { //处理预计时间
                                        newStatus.estimated = state.statustime ? state.statustime : ''
                                    }
                                    if(state.isest == 'N') { //处理实际发生时间
                                        newStatus.timetOccu = state.statustime ? state.statustime : ''
                                    }
                                }
                            }
                        }
                    }
                    caroObject.newStatus = caroObject.newStatus.reverse()
                    console.log(caroObject.newStatus)
                    for (let index = 0; index < caroObject.newStatus.length; index++) {
                        var p = caroObject.newStatus[index]
                        // 这里处理每个字段是否有值
                        p.timetOccuTrue = p.timetOccu ? true : false
                        p.estimatedTrue = p.estimated ? true : false
                        p.statedescription_enTrue = p.statedescription_en ? true : false
                        p.statusplaceTrue = p.statusplace ? true : false
                        p.vslnameTrue = p.vslname ? true : false
                        p.voyTrue = p.voy ? true : false
                        if(caroObject.newStatus[index].isest == 'N') {
                            if(caroObject.newest == '') {
                                var time = caroObject.newStatus[index].timetOccu ? this.getDateTime('YY-mm-dd HH:MM', new Date(caroObject.newStatus[index].timetOccu)) : '-' //时间
                                var palce = caroObject.newStatus[index].statusplace ? caroObject.newStatus[index].statusplace : '-' //地方
                                var state = caroObject.newStatus[index].statedescription //当前状态
                                caroObject.newest = time + ' ' +palce + ' '+ state
                            }
                        }
                        
                    }
                }
                this.ruleForm.cntList = val
                this.lookVessel(val[0])
            },
            //格式化ETA ETD单独格式时间
            etaEtdTime(val,attr){
                var arr = arr //属性
                if(val) {
                    const d = new Date(val)
                    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
                    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
                    this.ruleForm[attr] = resDate + ' ' + resTime
                }else{
                    this.ruleForm[attr] = ''
                }
            },
            //格式化箱货跟踪的时间
            appTime(val,attr){
                var arr = arr //属性
                if(val) {
                    const d = new Date(val)
                    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
                    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
                    this.ruleForm[attr] = resDate + ' ' + resTime
                }else{
                    this.ruleForm[attr] = ''
                }
            },
            //格式化箱货跟踪的时间
            fasTime(val,index,attr){
                var arr = arr //属性
                var inFOR = this.cargoList[index]
                inFOR.isModify = 1
                if(val === null || val === ""){
                    inFOR[attr] = ''
                }else{
                    const d = new Date(val)
                    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
                    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
                    inFOR[attr] = resDate + ' ' + resTime
                    inFOR.isModify = 1
                }
            },
            p(s) {
                return s < 10 ? '0' + s : s
            },      
            c(s) {
                return s.length < 2 ? '0' + s : s
            },      
            //处理箱货跟踪列表最新状态时间
            getDateTime(fmt, date) {
                let ret;
                let opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "M+": date.getMinutes().toString(),         // 分
                    "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    };
                };
                return fmt.split(' ')[0];
            },
            //处理提单流程的详情列表时间
            getProcessTime(fmt, date) {
                let ret;
                let opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "M+": date.getMinutes().toString(),         // 分
                    "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    };
                };
                return fmt;
            },
            //改变CAIU4435317节点流程的input输入框
            upInput(index) {
                var inFOR = this.cargoList[index]
                inFOR.isModify = 1
            },
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
                }
            },
            //获取航线信息
            getRouteInfo (id) {
                // debugger
                // api.getRouteInfoByPort(id).then(res => {
                //     this.routeInfo = res
                // })
            },
            //关闭事件
            handleCloseClick() {
                this.$emit("closeDetail");
            },
            //点箱货跟踪的查看
            lookVessel(value) {
                this.referenceno = value.ctnrno ? value.ctnrno : '--'
                this.cargoList = [] = value.newStatus
0            },
            //船期路径 Remote
            routewayRemote(val){
                this.$axios.get(this.commonJs.localUrl +`/schedules/trace/searchRouteWay?way=${val}&polcd=${this.ruleForm.polcd}&dtp=${this.ruleForm.dtp}&carriercd=${this.ruleForm.carriercd}`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                       this.routewayList = res.data.content
                    }
                })
            },
            //船期路径 Focus
            routewayFocus(val) {
                // if(val) {
                //     this.$axios.get(this.commonJs.localUrl +`/schedules/trace/searchRouteWay?way=${val}`,{
                //         headers: {
                //             Authorization: `Bearer ${this.getAuthorization()}`,
                //             AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                //         }
                //     }).then(res => {
                //         if (res.data.status == 1) {
                //         this.routewayList = res.data.content
                //         }
                //     })
                // }else{
                //     this.routewayList = []
                // }

            },
            //船期路径 Change
            routewayChange(val) {
                // mid
                if(val) {
                    for (let i = 0; i < this.routewayList.length; i++) {
                        if(this.routewayList[i].routeway == val) {
                            this.ruleForm.mid = this.routewayList[i].id //若是修改了船期路径  则改变地图主键口的id
                        }
                    }
                }else{
                    this.ruleForm.mid = ''
                }
            },
            //处理页面显示的周次
            chuWeek(val){
                if(val.indexOf('-') !== -1){
                    var c = val.split('-')
                    return c[0] + '年' + '第' + c[1] + '周'
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
                let weeks = (vaildDays / 7) + 1
                for (let i = 0; i <= weeks; i++) {
                    this.weekList.push({
                        value : Y + '-' + (i+1),
                        label : Y + '年' + '第' + (i+1) + '周',
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
            //立即刷新
            handleClickImmediate(){
                var immediateList = []
                immediateList.push({
                    carriercd: this.ruleForm.carriercd,
                    referenceno: this.ruleForm.referenceno
                })
                if(!this.isYundang){
                    this.isLoading = true
                    this.$axios.post(this.commonJs.localUrl +`/schedules/trace/spiderTraceUpdate`,immediateList,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            this.$message({
                                type: "success",
                                message: "已经触发爬虫，请耐心等待。五分钟内请不要重复更新同一提单！"
                            });
                        }else{
                            this.$message({
                                type: "error",
                                message: "立即刷新加载失败"
                            });
                        }
                        this.isLoading = false
                    })
                }else{
                    this.$message({
                        type: "error",
                        message: this.ruleForm.referenceno + "不支持立即更新"
                    });
                }
            },
            //保存
            handleSaveClick() {
                this.isLoading = true
                // if(this.ruleForm.etd == '' && this.ruleForm.atd == '' && this.ruleForm.eta == '' && this.ruleForm.ata == ''){
                //      this.ruleForm.lkeyid = ''// 船舶计划id
                // }
                if(this.ruleForm.staticweek){ //看this.ruleForm.staticweek的返回格式是什么样的
                    if(this.ruleForm.staticweek.indexOf('-') !== -1){ //处理周的问题
                        this.ruleForm.staticweek = this.ruleForm.staticweek
                    }else{
                        var num1 = this.ruleForm.staticweek.replace(/[^\d]/g,'')
                        var num2 = this.ruleForm.staticweek.replace(/[^\d]/g,'')
                        var c = num1.slice(0,4) //截取到年 第四位
                        var d = num2.slice(4) //截取周 4后面的
                        this.ruleForm.staticweek = c + '-' + this.c(d)
                    }
                }
                //处理时间为null的问题
                this.ruleForm.etapld = this.ruleForm.etapld ? this.ruleForm.etapld : '' //计划到港时间 eta
                this.ruleForm.etdpol = this.ruleForm.etdpol ? this.ruleForm.etdpol : '' //计划离港时间 etd
                this.ruleForm.opentime = this.ruleForm.opentime ? this.ruleForm.opentime : '' //开港时间
                this.ruleForm.closetime = this.ruleForm.closetime ? this.ruleForm.closetime : '' //截港时间
                this.ruleForm.vgmtime = this.ruleForm.vgmtime ? this.ruleForm.vgmtime : '' //截VGM时间
                this.ruleForm.amstime = this.ruleForm.amstime ? this.ruleForm.amstime : '' //截AMS/ENS时间
                this.ruleForm.etctime = this.ruleForm.etctime ? this.ruleForm.etctime : '' //截关时间
                // // 码头船舶计划 开始
                this.ruleForm.etd = this.ruleForm.etd ? this.ruleForm.etd : '' //计划离
                this.ruleForm.atd = this.ruleForm.atd ? this.ruleForm.atd : '' //实际离
                this.ruleForm.eta = this.ruleForm.eta ? this.ruleForm.eta : '' //计划到
                this.ruleForm.ata = this.ruleForm.ata ? this.ruleForm.ata : '' //实际到
                this.ruleForm.dschtime = this.ruleForm.dschtime ? this.ruleForm.dschtime : '' //实际到
                var newPortObje = this.ruleForm.cntList
                var cntList = [] //新的箱子流程数组
                for (let i = 0; i < newPortObje.length; i++) {
                    var keyid = newPortObje[i].keyid //箱子主键id  
                    var ckeyid = newPortObje[i].ckeyid //箱子流程主键id
                    var from = newPortObje[i].from

                    //下面的是处理用户填写的箱型箱量的字段  
                    //用户输入的数字为 csize 用户输入的英文为 ctype
                    var ssize = newPortObje[i].csize ? newPortObje[i].csize.match(/[0-9]/ig) : '' //箱型大小
                    var stype = newPortObje[i].csize ? newPortObje[i].csize.match(/[a-zA-Z]/ig) : '' //箱型单位
                    var csize = ''
                    var ctype = ''
                    if(ssize){
                        for (let i = 0; i < ssize.length; i++) { ////箱型
                            csize = csize + ssize[i]
                        }
                    }
                    if(stype){
                        for (let j = 0; j < stype.length; j++) { //箱子的单位
                            ctype = ctype + stype[j]
                        }
                    }                    
                    var ctnrno = newPortObje[i].ctnrno //箱号 
                    var pieces = newPortObje[i].pieces //件数
                    var sealno = newPortObje[i].sealno //铅封号
                    var grosswgt = newPortObje[i].grosswgt //毛重的大小
                    var volume = newPortObje[i].volume //体积的大小
                    // //下面正则处理毛重 把用户输入的数字存入
                    // var sssGrosswgt = newPortObje[i].grosswgt ? newPortObje[i].grosswgt.match(/[0-9]/ig) : ''
                    // var grosswgt = ''
                    // if(sssGrosswgt){
                    //     for (let i = 0; i < sssGrosswgt.length; i++) { //毛重的大小
                    //         grosswgt = grosswgt + sssGrosswgt[i]
                    //     }
                    // }

                    // // 下面处理体积
                    // var sssVolume = newPortObje[i].volume ? newPortObje[i].volume.match(/[0-9]/ig) : ''
                    // var volume = ''
                    // if(sssVolume){
                    //     for (let i = 0; i < sssVolume.length; i++) { //体积的大小
                    //         volume = volume + sssVolume[i]
                    //     }
                    // }
                    // console.log(newPortObje[i])
                    var stateList = [] //存放最新的节点信息
                    for (let j = 0; j < newPortObje[i].newStatus.length; j++) {
                        if(newPortObje[i].newStatus[j].isModify == 1 && newPortObje[i].newStatus[j].keyid) { //说明用户修改过的 并且是老数据
                            newPortObje[i].newStatus[j].fkeyid = newPortObje[i].ckeyid
                            stateList.push(newPortObje[i].newStatus[j])
                        }
                        if (newPortObje[i].newStatus[j].isModify == 1 && newPortObje[i].newStatus[j].keyid == '') {//说明用户新增的数据
                            //判断此数据是否每一项是否有数据 若其中一个有则添加 否则不添加
                            let c = newPortObje[i].newStatus[j]
                            //计划时间 发生时间 船名 航次 发生地 英文描述地址
                            if(c.timetOccu || c.estimated || c.vslname || c.voy || c.statusplace || c.statedescription_en){
                                newPortObje[i].newStatus[j].fkeyid = newPortObje[i].ckeyid
                                stateList.push(newPortObje[i].newStatus[j])
                            }
                        }
                    }
                    cntList.push({
                        keyid: keyid,
                        ckeyid: ckeyid,
                        from: from,
                        csize: csize,
                        ctype: ctype,
                        ctnrno: ctnrno,
                        pieces: pieces,
                        sealno: sealno,
                        grosswgt: grosswgt,
                        volume: volume,
                        stateList: stateList,
                    })
                }
                this.ruleForm.cntList = cntList
                this.$axios.post(this.commonJs.localUrl + `/schedules/trace/modify`,this.ruleForm,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    if (res.data.status == 1) {
                        this.isLoading = false
                        this.$emit("updatManage");
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.handleCloseClick()
                    }else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据保存失败 请重新加载页面"
                        });
                    }
                })
            },
            winResize(){
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
            //聚焦iput框时的验证
            focusDete(val,text){
                this.inputInner = val
                this.inputText = text
            },
            disBlur(val,att){
                var att = att
                var isTrue = att + 'True' //第一个渲染的时候 判断有值为true 无值为false
                if(val == '' && this.inputInner !== '' && this.ruleForm[isTrue]){
                    this.ruleForm[att] = this.inputInner
                    this.$message({
                        type: "error",
                        message: `${this.inputText}只能修改不能删除`
                    });
                }
            },
            //聚焦箱子信息的时候
            focusBox(val,text){
                this.inputInner = val
                this.inputText = text
            },
            blurBox(val,att,index){
                var att = att
                var indexInf = this.ruleForm.cntList[index]
                var isTrue = att + 'True' //第一个渲染的时候 判断有值为true 无值为false
                if(val == '' && this.inputInner !== '' && indexInf[isTrue]){
                    indexInf[att] = this.inputInner
                    this.$message({
                        type: "error",
                        message: `${this.inputText}只能修改不能删除`
                    });
                }
            },
            //聚焦箱子节点信息的时候
            focusNode(val,text){
                this.inputInner = val
                this.inputText = text
            },
            blurNode(val,att,index){
                var att = att
                var indexInf = this.cargoList[index]
                var isTrue = att + 'True' //第一个渲染的时候 判断有值为true 无值为false
                if(val == '' && this.inputInner !== '' && indexInf[isTrue]){
                    indexInf[att] = this.inputInner
                    this.$message({
                        type: "error",
                        message: `${this.inputText}只能修改不能删除`
                    });
                }
            }
        },
        mounted() {
            if(this.tratckText == "修改" ){
                this.addOrEdit = "修改"
                this.isDisable = true //不可修改
                this.detailTrack()
                this.weekNumber()
                this.winResize()
            }
        },
        updated() {
            var height = document.body.clientHeight - 80
            if(document.querySelector('.scrollDiv').offsetHeight > height){
                this.innerHeight = height  + 'px'
            }
        },
        watch:{
            screenHeight (val) {
               var height = val - 80
               this.innerHeight = height  + 'px'
            }    
        },
    }
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
        span.promptIn{
            color: red;
            font-weight: normal;
            margin-left: 30px;
        }
    }
    .promptIn{
        color: red;
        font-weight: normal;
        margin-left: 10px;
        margin-top: 2px;
        display: inline-block;
        height: 23px;
        line-height: 23px;
        }
    .voyageOrVessel {
        font-size: 12px;
    }
    .redclass {
        color: red;
    }
    .look{
        color:#3bafda;
        cursor: pointer;
    }
    .save{
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
    .sel-inner{

    }
    .sel-inner /deep/.el-input__inner{
        padding-left: 25px;
        padding-right: 10px;
        font-size: 10px;
    }
    .sel-ppp{
        overflow: hidden;
        width: 100%;
        height: 28px;
    }
    .sel-ppp /deep/.el-input{
        width: 75%;
    }
    .sel-ppp /deep/.el-input__inner{
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 10px;
    }
    .sel-ppp /deep/ .el-input__icon{
        line-height: 28px;
    }
    .sel-ppp /deep/ .el-input__suffix {
        right: 0;
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
    .shen{
        color: #999;
    }
    .qian{
        color: #333;
    }
    .shipData{
        width: 100%;
        height: 400px;
        margin-bottom: 20px;
        overflow: hidden;
    }
</style>