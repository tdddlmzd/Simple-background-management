<template>
    <div>
        <el-form
            label-position="right"
            label-width="115px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">
                    {{addOrEdit}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="closeship"></i>
            </div>
            <ul class="tableFormUl" style="padding-top: 20px">
                <li>
                    <el-form-item prop="weekNo" label="周次" :rules="[{ required: true, message: '请输入周次', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.weekNo"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                            @change="changeWeek"
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
                </li>
            </ul>
            <ul class="tableFormUl" v-if="pathNumber > 0">
                <li class="title_head">头程</li>
                <li>
                    <el-form-item prop="vessel" label="船名"
                    >
                        <el-input v-model="firstleg.vessel" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="voyage" label="航次"
                    >
                        <el-input v-model="firstleg.voyage" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="staticEtd" label="ETD静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.staticEtd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.staticEtdFsEtd"
                            @focus="focusDate(firstleg.staticEtd,firstleg,'staticEtd','FsEtd')"
                            @change="changeDate(firstleg.staticEtd,firstleg,'staticEtd','FsEtd')"
                            @blur="changeDate(firstleg.staticEtd,firstleg,'staticEtd','FsEtd')"
                            :picker-options="firstlegOptions"
                            :default-value="firstTime"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="etd" label="ETD动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.etd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.etdFsEtd"
                            @focus="focusDate(firstleg.etd,firstleg,'etd','FsEtd')"
                            @change="changeDate(firstleg.etd,firstleg,'etd','FsEtd')"
                            @blur="changeDate(firstleg.etd,firstleg,'etd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="staticEta" label="ETA静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.staticEta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.staticEtaFEta"
                            @focus="focusDate(firstleg.staticEta,firstleg,'staticEta','FEta')"
                            @change="changeDate(firstleg.staticEta,firstleg,'staticEta','FEta')"
                            @blur="changeDate(firstleg.staticEta,firstleg,'staticEta','FEta')"
                            :picker-options="DfirstlegOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="eta" label="ETA动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.eta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.etaFEtas"
                            @focus="focusDate(firstleg.eta,firstleg,'eta','FEtas')"
                            @change="changeDate(firstleg.eta,firstleg,'eta','FEtas')"
                            @blur="changeDate(firstleg.eta,firstleg,'eta','FEtas')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="atd" label="ATD"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.atd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.atdatdS"
                            @focus="focusDate(firstleg.atd,firstleg,'atd','atdS')"
                            @change="changeDate(firstleg.atd,firstleg,'atd','atdS')"
                            @blur="changeDate(firstleg.atd,firstleg,'atd','atdS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="ata" label="ATA"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.ata"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.ataataS"
                            @focus="focusDate(firstleg.ata,firstleg,'ata','ataS')"
                            @change="changeDate(firstleg.ata,firstleg,'ata','ataS')"
                            @blur="changeDate(firstleg.ata,firstleg,'ata','ataS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="vgmCutoff" label="截VGM"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.vgmCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.vgmCutoffvgm"
                            @focus="focusDate(firstleg.vgmCutoff,firstleg,'vgmCutoff','vgm')"
                            @change="changeDate(firstleg.vgmCutoff,firstleg,'vgmCutoff','vgm')"
                            @blur="changeDate(firstleg.vgmCutoff,firstleg,'vgmCutoff','vgm')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="cyCutOff" label="截关"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.cyCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.cyCutOffcycu"
                            @focus="focusDate(firstleg.cyCutOff,firstleg,'cyCutOff','cycu')"
                            @change="changeDate(firstleg.cyCutOff,firstleg,'cyCutOff','cycu')"
                            @blur="changeDate(firstleg.cyCutOff,firstleg,'cyCutOff','cycu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="manIfEstCutoff" label="截AMS/ENS"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.manIfEstCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.manIfEstCutoffman"
                            @focus="focusDate(firstleg.manIfEstCutoff,firstleg,'manIfEstCutoff','man')"
                            @change="changeDate(firstleg.manIfEstCutoff,firstleg,'manIfEstCutoff','man')"
                            @blur="changeDate(firstleg.manIfEstCutoff,firstleg,'manIfEstCutoff','man')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="siCutOff" label="截SI"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="firstleg.siCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="firstleg.siCutOffsicu"
                            @focus="focusDate(firstleg.siCutOff,firstleg,'siCutOff','sicu')"
                            @change="changeDate(firstleg.siCutOff,firstleg,'siCutOff','sicu')"
                            @blur="changeDate(firstleg.siCutOff,firstleg,'siCutOff','sicu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item prop="warning" label="ETD预警"
                    >
                        <el-select
                            v-model="firstleg.warning"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                        >
                            <el-option
                                v-for="item in alertDrop"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </li>
            </ul>
            <ul class="tableFormUl" v-if="pathNumber > 1">
                <li class="title_head">二程</li>
                <li>
                    <el-form-item prop="vessel" label="船名"
                    >
                        <el-input v-model="senleg.vessel" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="voyage" label="航次"
                    >
                        <el-input v-model="senleg.voyage" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="staticEtd" label="ETD静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.staticEtd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.staticEtdFsEtd"
                            @focus="focusDate(senleg.staticEtd,senleg,'staticEtd','FsEtd')"
                            @change="changeDate(senleg.staticEtd,senleg,'staticEtd','FsEtd')"
                            @blur="changeDate(senleg.staticEtd,senleg,'staticEtd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="etd" label="ETD动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.etd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.etdFsEtd"
                            @focus="focusDate(senleg.etd,senleg,'etd','FsEtd')"
                            @change="changeDate(senleg.etd,senleg,'etd','FsEtd')"
                            @blur="changeDate(senleg.etd,senleg,'etd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="staticEta" label="ETA静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.staticEta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.staticEtaFEta"
                            @focus="focusDate(senleg.staticEta,senleg,'staticEta','FEta')"
                            @change="changeDate(senleg.staticEta,senleg,'staticEta','FEta')"
                            @blur="changeDate(senleg.staticEta,senleg,'staticEta','FEta')"
                            :picker-options="senlegOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="eta" label="ETA动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.eta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.etaFEtas"
                            @focus="focusDate(senleg.eta,senleg,'eta','FEtas')"
                            @change="changeDate(senleg.eta,senleg,'eta','FEtas')"
                            @blur="changeDate(senleg.eta,senleg,'eta','FEtas')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="atd" label="ATD"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.atd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.atdatdS"
                            @focus="focusDate(senleg.atd,senleg,'atd','atdS')"
                            @change="changeDate(senleg.atd,senleg,'atd','atdS')"
                            @blur="changeDate(senleg.atd,senleg,'atd','atdS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="ata" label="ATA"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.ata"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.ataataS"
                            @focus="focusDate(senleg.ata,senleg,'ata','ataS')"
                            @change="changeDate(senleg.ata,senleg,'ata','ataS')"
                            @blur="changeDate(senleg.ata,senleg,'ata','ataS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="vgmCutoff" label="截VGM"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.vgmCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.vgmCutoffvgm"
                            @focus="focusDate(senleg.vgmCutoff,senleg,'vgmCutoff','vgm')"
                            @change="changeDate(senleg.vgmCutoff,senleg,'vgmCutoff','vgm')"
                            @blur="changeDate(senleg.vgmCutoff,senleg,'vgmCutoff','vgm')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="cyCutOff" label="截关"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.cyCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.cyCutOffcycu"
                            @focus="focusDate(senleg.cyCutOff,senleg,'cyCutOff','cycu')"
                            @change="changeDate(senleg.cyCutOff,senleg,'cyCutOff','cycu')"
                            @blur="changeDate(senleg.cyCutOff,senleg,'cyCutOff','cycu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="manIfEstCutoff" label="截AMS/ENS"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.manIfEstCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.manIfEstCutoffman"
                            @focus="focusDate(senleg.manIfEstCutoff,senleg,'manIfEstCutoff','man')"
                            @change="changeDate(senleg.manIfEstCutoff,senleg,'manIfEstCutoff','man')"
                            @blur="changeDate(senleg.manIfEstCutoff,senleg,'manIfEstCutoff','man')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="siCutOff" label="截SI"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="senleg.siCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="senleg.siCutOffsicu"
                            @focus="focusDate(senleg.siCutOff,senleg,'siCutOff','sicu')"
                            @change="changeDate(senleg.siCutOff,senleg,'siCutOff','sicu')"
                            @blur="changeDate(senleg.siCutOff,senleg,'siCutOff','sicu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item prop="warning" label="ETD预警"
                    >
                        <el-select
                            v-model="senleg.warning"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                        >
                            <el-option
                                v-for="item in alertDrop"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </li>
            </ul>
            <ul class="tableFormUl" v-if="pathNumber > 2">
                <li class="title_head">三程</li>
                <li>
                    <el-form-item prop="vessel" label="船名"
                    >
                        <el-input v-model="tritleg.vessel" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="voyage" label="航次"
                    >
                        <el-input v-model="tritleg.voyage" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="staticEtd" label="ETD静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.staticEtd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.staticEtdFsEtd"
                            @focus="focusDate(tritleg.staticEtd,tritleg,'staticEtd','FsEtd')"
                            @change="changeDate(tritleg.staticEtd,tritleg,'staticEtd','FsEtd')"
                            @blur="changeDate(tritleg.staticEtd,tritleg,'staticEtd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="etd" label="ETD动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.etd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.etdFsEtd"
                            @focus="focusDate(tritleg.etd,tritleg,'etd','FsEtd')"
                            @change="changeDate(tritleg.etd,tritleg,'etd','FsEtd')"
                            @blur="changeDate(tritleg.etd,tritleg,'etd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="staticEta" label="ETA静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.staticEta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.staticEtaFEta"
                            @focus="focusDate(tritleg.staticEta,tritleg,'staticEta','FEta')"
                            @change="changeDate(tritleg.staticEta,tritleg,'staticEta','FEta')"
                            @blur="changeDate(tritleg.staticEta,tritleg,'staticEta','FEta')"
                            :picker-options="tritlegOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="eta" label="ETA动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.eta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.etaFEtas"
                            @focus="focusDate(tritleg.eta,tritleg,'eta','FEtas')"
                            @change="changeDate(tritleg.eta,tritleg,'eta','FEtas')"
                            @blur="changeDate(tritleg.eta,tritleg,'eta','FEtas')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="atd" label="ATD"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.atd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.atdatdS"
                            @focus="focusDate(tritleg.atd,tritleg,'atd','atdS')"
                            @change="changeDate(tritleg.atd,tritleg,'atd','atdS')"
                            @blur="changeDate(tritleg.atd,tritleg,'atd','atdS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="ata" label="ATA"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.ata"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.ataataS"
                            @focus="focusDate(tritleg.ata,tritleg,'ata','ataS')"
                            @change="changeDate(tritleg.ata,tritleg,'ata','ataS')"
                            @blur="changeDate(tritleg.ata,tritleg,'ata','ataS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="vgmCutoff" label="截VGM"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.vgmCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.vgmCutoffvgm"
                            @focus="focusDate(tritleg.vgmCutoff,tritleg,'vgmCutoff','vgm')"
                            @change="changeDate(tritleg.vgmCutoff,tritleg,'vgmCutoff','vgm')"
                            @blur="changeDate(tritleg.vgmCutoff,tritleg,'vgmCutoff','vgm')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="cyCutOff" label="截关"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.cyCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.cyCutOffcycu"
                            @focus="focusDate(tritleg.cyCutOff,tritleg,'cyCutOff','cycu')"
                            @change="changeDate(tritleg.cyCutOff,tritleg,'cyCutOff','cycu')"
                            @blur="changeDate(tritleg.cyCutOff,tritleg,'cyCutOff','cycu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="manIfEstCutoff" label="截AMS/ENS"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.manIfEstCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.manIfEstCutoffman"
                            @focus="focusDate(tritleg.manIfEstCutoff,tritleg,'manIfEstCutoff','man')"
                            @change="changeDate(tritleg.manIfEstCutoff,tritleg,'manIfEstCutoff','man')"
                            @blur="changeDate(tritleg.manIfEstCutoff,tritleg,'manIfEstCutoff','man')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="siCutOff" label="截SI"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="tritleg.siCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="tritleg.siCutOffsicu"
                            @focus="focusDate(tritleg.siCutOff,tritleg,'siCutOff','sicu')"
                            @change="changeDate(tritleg.siCutOff,tritleg,'siCutOff','sicu')"
                            @blur="changeDate(tritleg.siCutOff,tritleg,'siCutOff','sicu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item prop="warning" label="ETD预警"
                    >
                        <el-select
                            v-model="tritleg.warning"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                        >
                            <el-option
                                v-for="item in alertDrop"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </li>
            </ul>
            <ul class="tableFormUl" v-if="pathNumber > 3">
                <li class="title_head">四程</li>
                <li>
                    <el-form-item prop="vessel" label="船名"
                    >
                        <el-input v-model="fourleg.vessel" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="voyage" label="航次"
                    >
                        <el-input v-model="fourleg.voyage" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="staticEtd" label="ETD静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.staticEtd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.staticEtdFsEtd"
                            @focus="focusDate(fourleg.staticEtd,fourleg,'staticEtd','FsEtd')"
                            @change="changeDate(fourleg.staticEtd,fourleg,'staticEtd','FsEtd')"
                            @blur="changeDate(fourleg.staticEtd,fourleg,'staticEtd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="etd" label="ETD动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.etd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.etdFsEtd"
                            @focus="focusDate(fourleg.etd,fourleg,'etd','FsEtd')"
                            @change="changeDate(fourleg.etd,fourleg,'etd','FsEtd')"
                            @blur="changeDate(fourleg.etd,fourleg,'etd','FsEtd')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="staticEta" label="ETA静态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.staticEta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.staticEtaFEta"
                            @focus="focusDate(fourleg.staticEta,fourleg,'staticEta','FEta')"
                            @change="changeDate(fourleg.staticEta,fourleg,'staticEta','FEta')"
                            @blur="changeDate(fourleg.staticEta,fourleg,'staticEta','FEta')"
                            :picker-options="fourlegOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="eta" label="ETA动态"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.eta"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.etaFEtas"
                            @focus="focusDate(fourleg.eta,fourleg,'eta','FEtas')"
                            @change="changeDate(fourleg.eta,fourleg,'eta','FEtas')"
                            @blur="changeDate(fourleg.eta,fourleg,'eta','FEtas')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="atd" label="ATD"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.atd"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.atdatdS"
                            @focus="focusDate(fourleg.atd,fourleg,'atd','atdS')"
                            @change="changeDate(fourleg.atd,fourleg,'atd','atdS')"
                            @blur="changeDate(fourleg.atd,fourleg,'atd','atdS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="ata" label="ATA"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.ata"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.ataataS"
                            @focus="focusDate(fourleg.ata,fourleg,'ata','ataS')"
                            @change="changeDate(fourleg.ata,fourleg,'ata','ataS')"
                            @blur="changeDate(fourleg.ata,fourleg,'ata','ataS')"
                        >
                        </el-date-picker>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item prop="vgmCutoff" label="截VGM"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.vgmCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.vgmCutoffvgm"
                            @focus="focusDate(fourleg.vgmCutoff,fourleg,'vgmCutoff','vgm')"
                            @change="changeDate(fourleg.vgmCutoff,fourleg,'vgmCutoff','vgm')"
                            @blur="changeDate(fourleg.vgmCutoff,fourleg,'vgmCutoff','vgm')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="cyCutOff" label="截关"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.cyCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.cyCutOffcycu"
                            @focus="focusDate(fourleg.cyCutOff,fourleg,'cyCutOff','cycu')"
                            @change="changeDate(fourleg.cyCutOff,fourleg,'cyCutOff','cycu')"
                            @blur="changeDate(fourleg.cyCutOff,fourleg,'cyCutOff','cycu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="manIfEstCutoff" label="截AMS/ENS"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.manIfEstCutoff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.manIfEstCutoffman"
                            @focus="focusDate(fourleg.manIfEstCutoff,fourleg,'manIfEstCutoff','man')"
                            @change="changeDate(fourleg.manIfEstCutoff,fourleg,'manIfEstCutoff','man')"
                            @blur="changeDate(fourleg.manIfEstCutoff,fourleg,'manIfEstCutoff','man')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="siCutOff" label="截SI"
                    >
                        <el-date-picker
                            style="width:100%"
                            v-model="fourleg.siCutOff"
                            type="datetime"
                            placeholder="选择时间日期"
                            :format="fourleg.siCutOffsicu"
                            @focus="focusDate(fourleg.siCutOff,fourleg,'siCutOff','sicu')"
                            @change="changeDate(fourleg.siCutOff,fourleg,'siCutOff','sicu')"
                            @blur="changeDate(fourleg.siCutOff,fourleg,'siCutOff','sicu')"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item prop="warning" label="ETD预警"
                    >
                        <el-select
                            v-model="fourleg.warning"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                        >
                            <el-option
                                v-for="item in alertDrop"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </li>
            </ul>
            <ul class="tableFormUl">
                <li style="text-align: center;">
                    <el-button size="small" class="clicksColor" @click="handleSaveClick('ruleForm')">保存</el-button>
                </li>
                <li style="clear:both"></li>
            </ul>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    export default {
        props:[
            'shipTitle',
            "scac",
            "pathNumber",
            "shipRow",
            "tesEtd",
            "tesEta",
        ],
        data() {
            return {
                addOrEdit : '',
                ruleForm : {
                    weekNo:'',// 周次
                },
                firstlegOptions: {}, //头程ETD选择范围
                DfirstlegOptions: {}, //末程ETA选择范围
                senlegOptions: {}, //末程ETA选择范围
                tritlegOptions: {}, //末程ETA选择范围
                fourlegOptions: {}, //末程ETA选择范围
                firstTime: '', //默认etd时间
                senlegOptions: '', //默认
                weekList: [],
                 //头程
                firstleg: {
                    id: '',
                    delFlag: 0,
                    weekNo:'',// 周次
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
                    warning: '', //预警信息
                },
                 //二程
                senleg: {
                    id: '',
                    delFlag: 0,
                    weekNo:'',// 周次
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
                    warning: '', //预警信息
                },
                 //三程
                tritleg: {
                    id: '',
                    delFlag: 0,
                    weekNo:'',// 周次
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
                    warning: '', //预警信息
                },
                //四程
                fourleg: {
                    id: '',
                    delFlag: 0,
                    weekNo:'',// 周次
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
                    warning: '', //预警信息
                },

                //自定义空对象
                custEmpty: {
                    id: '',
                    delFlag: 0,
                    weekNo:'',// 周次
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
                    // warning: '', //预警信息
                },
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
                tfinalArray:[],//传给父亲最后整理的数组
            }
        },
        methods: {
            //保存
            async handleSaveClick(ruleForm){
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    this.tfinalArray = []
                    this.firstleg['weekNo'] = this.ruleForm.weekNo
                    this.senleg['weekNo'] = this.ruleForm.weekNo
                    this.tritleg['weekNo'] = this.ruleForm.weekNo
                    this.fourleg['weekNo'] = this.ruleForm.weekNo

                    if(this.pathNumber > 3){ //4程
                        this.tfinalArray.push(this.firstleg,this.senleg,this.tritleg,this.fourleg)
                    }else if(this.pathNumber > 2){ //3程
                        this.tfinalArray.push(this.firstleg,this.senleg,this.tritleg)
                    }else if(this.pathNumber > 1){ //2程
                        this.tfinalArray.push(this.firstleg,this.senleg)
                    }else if(this.pathNumber > 0){ //头程
                        this.tfinalArray.push(this.firstleg)
                    }
                    this.$emit('shipValue', this.tfinalArray,this.ruleForm.weekNo);
                }catch(e){}
            },
            restInform(){
                this.ruleForm.weekNo = ''
                this.firstleg = JSON.parse(JSON.stringify(this.custEmpty))
                this.senleg = JSON.parse(JSON.stringify(this.custEmpty))
                this.tritleg = JSON.parse(JSON.stringify(this.custEmpty))
                this.fourleg = JSON.parse(JSON.stringify(this.custEmpty))
                this.tfinalArray = []
            },
            //日期聚焦 
            focusDate(val,attri,name,att) {
                console.log('focusDate')
                var name = name //当前点击列表的属性
                var att = att //当前点击列表显示的属性
                if(val){
                    attri[name] = new Date(val) //用于数据
                    attri[name + att] = "yyyy-MM-dd HH:mm:ss"
                }
            },
            //改变日期
            changeDate(val,attri,name,att){
                console.log(val,attri,name,att)
                var name = name //当前点击列表的属性
                var att = att //当前点击列表显示的属性
                var attri = attri
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
                    attri[name] = resDate + ' ' + resTime//用于数据
                    attri[att] = resDate + '('+ W + ')' //用于页面显示
                    attri[name + att] = attri[att]
                }else{
                    attri[name] = '' //用于数据
                    attri[att] = '' //用于页面显示
                    attri[name + att] = attri[att]
                }
            },
            p(s) {
                return s < 10 ? '0' + s : s
            },
            getDates(currentTime,index) {//JS获取当前周从星期一到星期天的日期
                let currentDate = new Date(currentTime)
                let timesStamp = currentDate.getTime();
                let currenDay = currentDate.getDay();
                let dates = [];
                for (let i = 0; i < 7; i++) {
                    dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
                }

                var dat = ''
                if(index == 'SUN'){
                    dat = dates[6]
                }else if(index == 'MON'){
                    dat = dates[0]
                }else if(index == 'TUE'){
                    dat = dates[1]
                }else if(index == 'WED'){
                    dat = dates[2]
                }else if(index == 'THU'){
                    dat = dates[3]
                }else if(index == 'FRI'){
                    dat = dates[4]
                }else if(index == 'SAT'){
                    dat = dates[5]
                }
                return dat + ' ' + '00:00:00'
            },
            getDeflueTime(week,zhou){
                var isZhou = (7 - zhou) * 24 * 60 * 60 * 1000 //多余时间的毫秒数
                var d1 = new Date()
                var currentday = d1.getFullYear() + '-' + '01' + '-' + '01'
                var firtDay = new Date(currentday).getDay()  // 的出来2020-1-1号周几
                var currentH = currentday + ' ' + '00:00:00'
                var currentSort = new Date(currentday).getTime()
                var firstSort = (7-firtDay) * 24 * 60 * 60 * 1000
                var timeSort = ((week - 1) * 7) * 24 * 60 * 60 * 1000 - isZhou //除了第一周  第二周开始到目标日期的毫秒数

                var allSort = currentSort + firstSort + timeSort
                var desTime = this.getProcessTime("YY-mm-dd",new Date(allSort)) //格式化时间
                return desTime
            },
            //处理日期时间格式
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
                return fmt + ' ' + '00:00:00';
            },
            //关闭事件
            closeship(){
                this.$emit('closeship');
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
                for (let i = 1; i <= this.weeks; i++) {
                    this.weekList.push({
                        value : i,
                        label : Y + '-' + i,
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
            //周次
            changeWeek(val){
                this.getTimeDeal()
            },

            //时间限制的处理
            getTimeDeal(){
                //下面处理头程的限制 静态ETD的限制
                var that = this
                if(this.tesEtd){ //选择了头程的etd
                    if(that.ruleForm.weekNo){
                        that.firstTime = that.getDeflueTime(this.ruleForm.weekNo,that.commonJs.getNumDay(that.tesEtd))
                        that.firstleg.staticEtd  = that.firstTime
                        that.focusDate(that.firstleg.staticEtd,that.firstleg,'staticEtd','FsEtd')
                        that.changeDate(that.firstleg.staticEtd,that.firstleg,'staticEtd','FsEtd')
                    }
                    this.firstlegOptions = {
                        disabledDate(time) {
                            // if(!that.firstleg.staticEtd){
                            //     that.firstleg.staticEtd = that.getDates(new Date(),that.tesEtd)
                            // }
                            return new Date(time).getDay() !== that.commonJs.getNumDay(that.tesEtd)
                        }
                    }
                }

                //下面是处理末程的限制 静态ETA的限制
                if(this.tesEta){
                    if(that.pathNumber > 3){ //4程
                        that.fourlegOptions ={
                            disabledDate(time) {
                                if(!that.fourleg.staticEta){
                                    that.fourleg.staticEta = that.getDates(new Date(),that.tesEta)
                                }
                                return new Date(time).getDay() !== that.commonJs.getNumDay(that.tesEta)
                            }
                        }
                    }else if(that.pathNumber > 2){ //3程
                        that.tritlegOptions ={
                            disabledDate(time) {
                                if(!that.tritleg.staticEta){
                                    that.tritleg.staticEta = that.getDates(new Date(),that.tesEta)
                                }
                                return new Date(time).getDay() !== that.commonJs.getNumDay(that.tesEta)
                            }
                        }
                    }else if(that.pathNumber > 1){ //2程
                        that.senlegOptions ={
                            disabledDate(time) {
                                if(!that.senleg.staticEta){
                                    that.senleg.staticEta = that.getDates(new Date(),that.tesEta)
                                }
                                return new Date(time).getDay() !== that.commonJs.getNumDay(that.tesEta)
                            }
                        }
                    }else if(that.pathNumber > 0){ //头程
                        that.DfirstlegOptions ={
                            disabledDate(time) {
                                if(!that.firstleg.staticEta){
                                    that.firstleg.staticEta = that.getDates(new Date(),that.tesEta)
                                }
                                return new Date(time).getDay() !== that.commonJs.getNumDay(that.tesEta)
                            }
                        }
                    }
                }
            },
        },
        mounted() {
            this.weekNumber() //获取今年一共有多少周 周序号全部
            if(this.shipTitle  === '新增'){
                this.addOrEdit = '新增';
            }else{
                this.addOrEdit = '修改';
                var shipRow = JSON.parse(JSON.stringify(this.shipRow))
                this.ruleForm.weekNo = shipRow[0].weekNo
                if(this.pathNumber > 3){ //4程
                    this.firstleg = shipRow[0]
                    this.senleg = shipRow[1]
                    this.tritleg = shipRow[2]
                    this.fourleg = shipRow[3]
                }else if(this.pathNumber > 2){ //3程
                    this.firstleg = shipRow[0]
                    this.senleg = shipRow[1]
                    this.tritleg = shipRow[2]
                }else if(this.pathNumber > 1){ //2程
                    this.firstleg = shipRow[0]
                    this.senleg = shipRow[1]
                }else if(this.pathNumber > 0){ //头程
                    this.firstleg = shipRow[0]
                }

                this.getTimeDeal()
            }
        },
    }
</script>

<style lang="scss" scoped>
    .lf{
        float: left;
    }
    .lr{
        float: right;
    }
    .clicksColor{
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
    }
    .headerContent{
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit{
        margin-left: 10px;
        font-size: 18px;
    }
    .headeraddOrEditClose{
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .tableFormUl{
        // padding-top: 20px;
        li:nth-of-type(1){
            margin-top: 0px;
        }
        li{
            // margin-top: 20px;
            .el-form-item{
                display: inline-block;
                width: 265px;
            }
            .el-form-item:nth-of-type(2){
                margin-right: 0;
            }
        }
        li.title_head{
            padding-left: 20px;
            font-weight: 600;
        }
    }
    
</style>