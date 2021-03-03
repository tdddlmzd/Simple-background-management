<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="170px"
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
                    <li class="routeLi">
                        <div class="title">
                            <span>船舶信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船名(中文)" prop="nameCn">
                                    <el-input v-model="ruleForm.nameCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="IMO" prop="imo">
                                    <el-input v-model="ruleForm.imo" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.imo = ruleForm.imo.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="MMSI" prop="mmsi">
                                    <el-input v-model="ruleForm.mmsi" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.mmsi = ruleForm.mmsi.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船名(英文)" prop="nameEn">
                                    <el-input v-model="ruleForm.nameEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="呼号" prop="callSign">
                                    <el-input v-model="ruleForm.callSign" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船旗" prop="flagName">
                                    <el-input v-model="ruleForm.flagName" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船籍港">
                                    <el-input v-model="ruleForm.homePort" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="平均吃水">
                                    <el-input v-model="ruleForm.avgDraft" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.avgDraft = ruleForm.avgDraft.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="满载吃水">
                                    <el-input v-model="ruleForm.fullLoaded" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.fullLoaded = ruleForm.fullLoaded.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="总吨">
                                    <el-input v-model="ruleForm.gt" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.gt = ruleForm.gt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="净吨">
                                    <el-input v-model="ruleForm.nt" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.nt = ruleForm.nt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="载重吨">
                                    <el-input v-model="ruleForm.dwt" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.dwt = ruleForm.dwt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船长">
                                    <el-input v-model="ruleForm.length" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.length = ruleForm.length.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船宽">
                                    <el-input v-model="ruleForm.breadth" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.breadth = ruleForm.breadth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船深">
                                    <el-input v-model="ruleForm.depth" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.depth = ruleForm.depth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="客位">
                                    <el-input v-model="ruleForm.passSpa" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.passSpa = ruleForm.passSpa.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="车位">
                                    <el-input v-model="ruleForm.carPort" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.carPort = ruleForm.carPort.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="箱量">
                                    <el-input v-model="ruleForm.shipContainerNum" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.shipContainerNum = ruleForm.shipContainerNum.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="联系方式">
                                    <el-input v-model="ruleForm.call" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.call = ruleForm.call.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="传真">
                                    <el-input v-model="ruleForm.fox" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="法人">
                                    <el-input v-model="ruleForm.ownerLegalPerson" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="联系方式(night)">
                                    <el-input v-model="ruleForm.callNight" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.callNight = ruleForm.callNight.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="运营方">
                                    <el-input v-model="ruleForm.shipOwnerCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶类型">
                                    <el-input v-model="ruleForm.shipType" clearable readonly v-if="isUpdate"></el-input>
                                    <el-select 
                                        v-model="ruleForm.shipType" 
                                        clearable
                                        style="width:100%"
                                        placeholder="请选择"
                                        v-else
                                    >
                                        <el-option
                                            v-for="item in shipDate"
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
                            <el-col style="width:33%">
                                <el-form-item label="ism 管理">
                                    <el-input v-model="ruleForm.ismManager" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="ism 管理地址">
                                    <el-input v-model="ruleForm.ismAddress" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="ism 生效日期">
                                    <el-input v-model="ruleForm.ismDateEofEffect" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人(中文)">
                                    <el-input v-model="ruleForm.shipOwnerCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人地址(中文)">
                                    <el-input v-model="ruleForm.ownerAddressCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶管理者(中文)">
                                    <el-input v-model="ruleForm.shipManagerCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人(英文)">
                                    <el-input v-model="ruleForm.shipOwnerEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人地址(英文)">
                                    <el-input v-model="ruleForm.ownerAddressEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶管理者(英文)">
                                    <el-input v-model="ruleForm.shipManagerEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船厂中文">
                                    <el-input v-model="ruleForm.builderCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶建造地址中文">
                                    <el-input v-model="ruleForm.shipBuildAddrCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船管地址(中文)">
                                    <el-input v-model="ruleForm.shipManagerAddressCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船厂英文">
                                    <el-input v-model="ruleForm.builderEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶建造地址英文">
                                    <el-input v-model="ruleForm.shipBuildAddrEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船管地址(英文)">
                                    <el-input v-model="ruleForm.shipManagerAddressEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="建造日期">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.dateBuild"
                                            style="width:100%"   
                                            type="date" 
                                            value-format="yyyy-MM-dd"
                                            :placeholder="isUpdate ? '' : '选择日期'"
                                            :readonly="isUpdate"
                                        >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人地址生效日期">
                                    <el-input v-model="ruleForm.ownerDateOfEffect" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col style="width:33%">
                                <el-form-item label="船管地址生效日期">
                                    <el-input v-model="ruleForm.shipManagerDateOfEffect" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>船舶运营信息</span>
                        </div>
                        <!-- tab标签切换 -->
                        <ul class='tabUl' v-if="addOrEdit == '修改' && shipdeList.length > 0">
                            <li v-for="(item, index) in shipdeList" :key="index" @click="switchTab(index,item)" class='tabLI' :class="tabIndex == index ? 'tabColor' : ''">{{item.carrier}}</li>
                        </ul>
                        <ul class="shipUL" v-if="addOrEdit == '修改'">
                            <li class="shipLI" v-for="(ship, shipindex) in shipDetaList.routeList" :key="shipindex" @click="switchPort(shipDetaList.routeList,shipindex)"><span :class="shipIndex == shipindex ? 'coloGreen' : ''" >{{ship.routeCode}}</span><span v-if="shipindex !==shipDetaList.routeList.length-1">/</span></li>
                        </ul>
                        <div class="noRoute" v-if="addOrEdit == '新增' || shipdeList.length < 1">
                            <p>暂无数据</p>
                        </div>
                    </li>
                    <li class="routeLi">
                        <div class="title">
                            <span>船舶轨迹</span>
                        </div>                  
                        <el-table
                            :data="routePortList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="multipleTable"
                        >
                            <el-table-column prop="basePort" label="标准挂靠港" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.basePort}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="apiPort" label="数据源港口" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.apiPort ? scope.row.apiPort : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="routeCode" label="航线代码" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <span class="voyageClass" @click="appearRout(scope.row)">{{scope.row.routeCode ? scope.row.routeCode : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inVoyage" label="进口航次" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-model="scope.row.inVoyage"
                                            clearable
                                            @input="changeInV($event,scope.row.index,scope.row)"
                                            :readonly="scope.row.isIn == true"
                                        />
                                    </div>
                                    <!-- <span v-else>{{scope.row.inVoyage ? scope.row.inVoyage : '-'}}</span> -->
                                </template> 
                            </el-table-column>
                            <el-table-column prop="outVoyage" label="出口航次" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-model="scope.row.outVoyage"
                                            @input="changeOutV($event,scope.row.index,scope.row)"
                                            clearable
                                            :readonly="scope.row.isOut == true"
                                        />
                                    </div>
                                    <!-- <span v-else>{{scope.row.outVoyage ? scope.row.outVoyage : '-'}}</span> -->
                                </template> 
                            </el-table-column>
                            <el-table-column prop="timeZone" label="时区" align="left" :show-overflow-tooltip="true" min-width="80">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-model="scope.row.timeZone"
                                            clearable
                                            @change="changInput(scope.row)"
                                        />
                                    </div>
                                    <!-- <span v-else>{{scope.row.timeZone ? scope.row.timeZone : '-'}}</span> -->
                                    <!-- <span v-else>{{'-'}}</span> -->
                                </template> 
                            </el-table-column>
                            <el-table-column prop="staticEta" label="ETA-静态" align="left" :show-overflow-tooltip="true" width="120">
                                <template slot-scope="scope">
                                    <span>{{scope.row.staticEta ? commonJs.getMounthDay(scope.row.staticEta.toUpperCase()) : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="atd" label="ATD" align="left" :show-overflow-tooltip="true" min-width="170">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.atd"
                                            clearable
                                            type="date"
                                            @focus="focusDate(scope.row.atd)"
                                            @change="changeDate($event,scope.row.index,'atd','ATD',scope.row)"
                                            placeholder="选择日期"
                                            :format="scope.row.ATD"
                                            >
                                        </el-date-picker>
                                    </div>
                                    <!-- <span v-else>{{scope.row.atd ? changeDate(scope.row.atd,scope.row.index,'atd','ATD',scope.row) : '-'}}</span> -->
                                    <!-- <span v-else>{{'-'}}</span> -->
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="staticEtd" label="ETD-静态" align="left" :show-overflow-tooltip="true" width="120">
                                <template slot-scope="scope">
                                    <span>{{scope.row.staticEtd ? commonJs.getMounthDay(scope.row.staticEtd.toUpperCase()) : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ata" label="ATA" align="left" :show-overflow-tooltip="true" min-width="170">
                                <template slot-scope="scope">
                                    <div class="sel-input">
                                        <el-date-picker
                                            v-model="scope.row.ata"
                                            clearable
                                            type="date"
                                            @focus="focusDate(scope.row.ata)"
                                            @change="changeDate($event,scope.row.index,'ata','ATA',scope.row)"
                                            placeholder="选择日期"
                                            :format="scope.row.ATA"
                                            >
                                        </el-date-picker>
                                    </div>
                                    <!-- <span v-else>{{scope.row.ata ? changeDate(scope.row.ata,scope.row.index,'ata','ATA',scope.row) : '-'}}</span> -->
                                    <!-- <span v-else>{{'-'}}</span> -->
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="stayinport" label="在港停留时间" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-input
                                            v-model="scope.row.stayinport"
                                            clearable
                                            @change="changInput(scope.row)"
                                        />
                                    </div>
                                    <!-- <span v-else>{{scope.row.stayinport ? scope.row.stayinport : '-'}}</span> -->
                                    <!-- <span v-else>{{'-'}}</span> -->
                                </template> 
                            </el-table-column>
                            <el-table-column prop="warning" label="预警" align="left" :show-overflow-tooltip="true" min-width="80">

                            </el-table-column>
                            <template slot="empty">
                                <div class="dataPage" :style="{width: dataWidth + 'px'}">
                                    暂无数据
                                </div>
                            </template>
                        </el-table>
                    </li>
                        <ul class='startBtn'>
                            <li class='BtnLI' @click="switchBtn(portRoute,0)" :class="btnIndex == 0 ? 'tabColor' : ''">上一航次</li>
                            <li class='BtnLI' @click="switchBtn(portRoute,1)" :class="btnIndex == 1 ? 'tabColor' : ''">下一航次</li>
                        </ul>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="saveClick('ruleForm')">保存</el-button>
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
                isText="船舶跟踪"
                :withArry="withArry"
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
    import routeDetail from "../route/routeManageAdd.vue";
    export default {
        props: [
            "shipText",
            "rowId",
            "shipId",
            ],
        data() {
            return {
                isUdate: true,
                querObject: {},
                staticId: '',
                dataWidth: '',
                screenWidth: document.body.clientWidth, // 设置默认值
                isUpdate: false,
                mapId: '', //地图需要的id 航次id
                vesselId: '', //地图需要的id 船id
                addOrEdit: "", //新增或者修改
                isLoading: true, //isLoading
                tabIndex: 0, //船舶公司当前的 index
                btnIndex: 0, //上下航次的index
                shipIndex: 0, // 船舶航线当前的饿index
                shipdeList: [], // 共仓船数组
                shipDetaList: [], //共舱船数组下的航线
                companyNameList: [], //船公司列表
                routeAtta: false, //航线挂靠港详情页
                routeId: '', //航线挂靠港详情页ID
                routeText: '',//航线挂靠港详情页Text
                writeBack: [], //用户存储船舶轨迹用户填写的信息
                changeUseInf: [], //用户修改的船舶轨迹
                withArry: [], //
                ruleForm:{
                    id:"",
                    imo:"",
                    mmsi:"",
                    carrier:"",
                    nameEn:"", //船舶英文名
                    nameCn:"", //船舶中文名
                    shipType:"", //船舶类型
                    callSign:"",  //呼号
                    flagName:"",  //船旗
                    homePort:"",  //船籍港
                    length:"",  //船长（米) double
                    breadth:"",  //船宽（米）double
                    depth:"",  //船深（米）double
                    avgDraft:"",  //平均吃水（米）double
                    fullLoaded:"",  //满载吃水（米）double
                    gt:"",  //总吨（吨）double
                    nt:"",  //净吨（吨）double
                    dwt:"",  //"载重吨（吨）double
                    carPort:"",  //车位（位）int
                    passSpa:"",  //客位（位）int
                    shipContainerNum:"",  //箱量（箱) int
                    builderCn:"",  //船厂中文名
                    builderEn:"",  //船厂英文名
                    dateBuild:"",  //建造日期
                    shipBuildAddrCn:"",  //建造地址中文
                    shipBuildAddrEn:"",  //建造地址英文
                    ismManager:"",  //ism管理
                    ismAddress:"",  //ism管理地址
                    ismDateEofEffect:"",  //ism生效日期
                    shipOwnerEn:"",  ///船舶所有人英文
                    shipOwnerCn:"",  //运营方/船舶所有人中文
                    ownerLegalPerson:"",  //法人
                    fox:"",  //传真
                    call:"",  //联系方式
                    callNight:"",  //联系方式（night）
                    ownerAddressEn:"",  //船舶所有人地址英文
                    ownerAddressCn:"",  //船舶所有人地址中文
                    ownerDateOfEffect:"",  //生效日期
                    shipManagerEn:"",  //船舶管理者英文
                    shipManagerCn:"",  //船舶管理者中文
                    shipManagerAddressEn:"",  //船管地址英文
                    shipManagerAddressCn:"",  //船管地址中文
                    shipManagerDateOfEffect:"",  //生效日期
                    delFlag:"", 
                    classIfICationSociety:"", //协会社 
                    dateKeelLaid:"", //龙骨安放时间
                    createTime:"",
                    updateTime:"", 
                    updateUser:""
                },
                shipDate: [ //类型
                    {
                        value: 'Container ship',
                        label: '集装箱船'
                    },
                ],
                portRoute: [], //存放当前航次下的多个数组
                arrayIndex: 0, //当前数组的索引
                routePortList: [], //船舶轨迹表格
                innerHeight: '',
                screenHeight: '',
                isTrue: false,
            };
        },
        components: {
            loading,
            routeDetail
        },
        methods: {
            //取船舶详情基础信息接口
            basicInfor(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/baseVessel/getDetailById?id=${this.shipId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.ruleForm.imo = res.data.content.imo
                        this.ruleForm.mmsi = res.data.content.mmsi
                        this.ruleForm.carrier = res.data.content.carrier
                        this.ruleForm.nameEn = res.data.content.nameEn
                        this.ruleForm.nameCn = res.data.content.nameCn
                        this.ruleForm.shipType = res.data.content.shipType
                        this.ruleForm.callSign = res.data.content.callSign
                        this.ruleForm.flagName = res.data.content.flagName
                        this.ruleForm.homePort = res.data.content.homePort
                        this.ruleForm.length = res.data.content.length
                        this.ruleForm.breadth = res.data.content.breadth
                        this.ruleForm.depth = res.data.content.depth
                        this.ruleForm.avgDraft = res.data.content.avgDraft
                        this.ruleForm.fullLoaded = res.data.content.fullLoaded
                        this.ruleForm.gt = res.data.content.gt
                        this.ruleForm.nt = res.data.content.nt
                        this.ruleForm.dwt = res.data.content.dwt
                        this.ruleForm.carPort = res.data.content.carPort
                        this.ruleForm.passSpa = res.data.content.passSpa
                        this.ruleForm.shipContainerNum = res.data.content.shipContainerNum
                        this.ruleForm.builderCn = res.data.content.builderCn
                        this.ruleForm.builderEn = res.data.content.builderEn
                        this.ruleForm.dateBuild = res.data.content.dateBuild
                        this.ruleForm.shipBuildAddrCn = res.data.content.shipBuildAddrCn
                        this.ruleForm.shipBuildAddrEn = res.data.content.shipBuildAddrEn
                        this.ruleForm.ismManager = res.data.content.ismManager
                        this.ruleForm.ismAddress = res.data.content.ismAddress
                        this.ruleForm.ismDateEofEffect = res.data.content.ismDateEofEffect
                        this.ruleForm.shipOwnerEn = res.data.content.shipOwnerEn
                        this.ruleForm.shipOwnerCn = res.data.content.shipOwnerCn
                        this.ruleForm.ownerLegalPerson = res.data.content.ownerLegalPerson
                        this.ruleForm.fox = res.data.content.fox
                        this.ruleForm.call = res.data.content.call
                        this.ruleForm.callNight = res.data.content.callNight
                        this.ruleForm.ownerAddressEn = res.data.content.ownerAddressEn
                        this.ruleForm.ownerAddressCn = res.data.content.ownerAddressCn
                        this.ruleForm.ownerDateOfEffect = res.data.content.ownerDateOfEffect
                        this.ruleForm.shipManagerEn = res.data.content.shipManagerEn
                        this.ruleForm.shipManagerCn = res.data.content.shipManagerCn
                        this.ruleForm.shipManagerAddressEn = res.data.content.shipManagerAddressEn
                        this.ruleForm.shipManagerAddressCn = res.data.content.shipManagerAddressCn
                        this.ruleForm.shipManagerDateOfEffect = res.data.content.shipManagerDateOfEffect
                        this.ruleForm.delFlag = res.data.content.delFlag
                        this.ruleForm.classIfICationSociety = res.data.content.classIfICationSociety
                        this.ruleForm.dateKeelLaid = res.data.content.dateKeelLaid
                        this.ruleForm.createTime = res.data.content.createTime
                        this.ruleForm.updateTime = res.data.content.updateTime
                        this.ruleForm.updateUser = res.data.content.updateUser
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            basicList(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/vessel/details?id=${this.rowId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.ruleForm.id = res.data.content.id
                        this.vesselId = res.data.content.id //船id
                        this.shipShar(res.data.content.id) //船舶详情共仓接口
                        // this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
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
                    }
                })
            },
            //船公司Focus事件
            companyNameFocus(){
                let companyName = this.ruleForm.carrier;
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCompany`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.companyNameList = res.data.content; 
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
            //切换船公司tab页
            switchTab(index,item) {
                this.isTrue = false
                this.tabIndex = index //当前船公司的index样式
                this.shipIndex = 0 //航次的index为0
                if(item.routeList.length > 0) { //判断当前船公司下routeList的有航次
                    this.switchPort(item.routeList,0) //获取初始化船舶轨迹
                }else{
                    this.isLoading = false
                }
                this.shipDetaList = item
                this.btnIndex = 0 //当前为上一航次的样式
            },
            //点击上一航次 下一航次
            switchBtn(item,index) {
                this.portRoute = item
                if(this.addOrEdit == '修改' && item.length > 0){ //当前页面为修改页面
                    if(item.length == 1){ //说明此船公司当前航次下只有一个数组
                        this.btnIndex = 0 //此时只能为上一航次
                        this.arrayIndex = 0 // 当前选取的数组为1
                        this.routePortList = this.portRoute[0] //当前渲染页面的为 总数组的第一个
                        for (let i = 0; i < this.routePortList.length; i++) {
                            if(this.routePortList[i].atd) { //ATA
                                this.changeDate(this.routePortList[i].atd,i,'atd','ATD')
                            }                                
                            if(this.routePortList[i].ata) { //ATA
                                this.changeDate(this.routePortList[i].ata,i,'ata','ATA')
                            }                                
                            if(this.routePortList[i].inVoyage) { //如果有进口航次
                                this.routePortList[i].isOut = true //进口航次不能填
                                this.routePortList[i].isIn = true
                            }                                
                            if(this.routePortList[i].outVoyage) { //如果有出口航次
                                this.routePortList[i].isIn = true //出口航次不能填
                                this.routePortList[i].isOut = true
                            }                                
                        }
                        this.isLoading = false

                    }else{ //当前航次下有多个数组 可以切换上一航次和下一航次
                        this.btnIndex = index //此时只能为上一航次
                        if(index == 0) { //点击上一航次
                            if(this.arrayIndex > 0) {
                                this.arrayIndex = this.arrayIndex - 1
                                this.routePortList = this.portRoute[this.arrayIndex]
                            }else if(this.arrayIndex == 0){
                                this.routePortList = this.portRoute[0]
                                if(this.isTrue){
                                    this.$message({
                                        type: "warning",
                                        message: "没有上一航次了"
                                    });
                                }
                            }
                        }else if(index == 1) {
                            if(this.arrayIndex < (this.portRoute.length - 1)){
                                this.arrayIndex = this.arrayIndex + 1
                                this.routePortList = this.portRoute[this.arrayIndex]
                            }if(this.arrayIndex == (this.portRoute.length - 1)){
                                this.arrayIndex = this.portRoute.length - 1
                                this.routePortList = this.portRoute[this.arrayIndex]
                                this.isTrue = true
                                this.$message({
                                    type: "warning",
                                    message: "没有下一航次了"
                                });
                            }
                        }
                        for (let i = 0; i < this.routePortList.length; i++) {
                            if(this.routePortList[i].atd) { //ATA
                                this.changeDate(this.routePortList[i].atd,i,'atd','ATD')
                            }                                
                            if(this.routePortList[i].ata) { //ATA
                                this.changeDate(this.routePortList[i].ata,i,'ata','ATA')
                            }                                
                            if(this.routePortList[i].inVoyage) { //如果有进口航次
                                this.routePortList[i].isOut = true //进口航次不能填
                                this.routePortList[i].isIn = true
                            }                                
                            if(this.routePortList[i].outVoyage) { //如果有出口航次
                                this.routePortList[i].isIn = true //出口航次不能填
                                this.routePortList[i].isOut = true
                            }                                
                        }
                        this.isLoading = false
                    }
                }
            },

            //取船舶运营信息
            switchPort(item,index) {
                this.isTrue = false
                this.isLoading = true
                this.querObject = {
                    item: item,
                    index: index
                }
                this.shipIndex = index
                this.staticId = item[index].staticId
                //this.writeBack 存用户改的内容若此数组有则直接用 若没有在走接口调用
                if(this.isUdate){
                    for (let i = 0; i < this.writeBack.length; i++) {
                        if(item[index].staticId == this.writeBack[i].id) { //如果有id一样的 说明之前已经调取过 直接使用
                            // this.routePortList = this.writeBack[i].inFor
                            this.arrayIndex = 0 //此时为'上一航次'
                            this.switchBtn(this.writeBack[i].inFor,0)
                            this.isLoading = false
                            return
                        }
                    }
                }
                    this.isLoading = true
                    var staticId = item[index].staticId //根据航线取挂靠港
                    this.shipIndex = index //当前航线的index样式
                    this.$axios.get(this.commonJs.localUrl + `/schedules/vessel/getDocking?id=${this.ruleForm.id}&staticId=${staticId}`
                    ,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            this.isUdate = true
                            this.portRoute = res.data.content.list //当前船公司的下当前航次的当前挂靠港 里面存放的是多个数组 来切换下一航次和上一航次
                            if(res.data.content.list.length > 0) {
                                for (let j = 0; j < this.writeBack.length; j++) {
                                    if(this.staticId == this.writeBack[j].id) {
                                        this.switchBtn(res.data.content.list,this.btnIndex)
                                        this.writeBack.splice(j,1,{
                                            id: this.writeBack[j].id,
                                            inFor: res.data.content.list
                                        })
                                        return 
                                    }
                                }
                                this.switchBtn(res.data.content.list,0) //切换第一个数组的航次
                                this.writeBack.push({
                                    id: item[index].staticId,
                                    inFor: this.portRoute
                                })
                            }else{
                                this.isLoading = false
                            }
                        }else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                    })
                // }
            },
            //关闭事件
            handleCloseClick() {
                this.$emit("closeDetail");
            },
            //船舶详情共仓接口
            shipShar(id) {
                this.$axios.get(this.commonJs.localUrl + `/schedules/vessel/getSameVessel?id=${id}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.shipdeList = res.data.content
                        //当前的数据可能是个数组 存放船公司的也就是母船的信息
                        if(res.data.content.length > 0){ //如果shipdeList的长度大于0
                            this.switchTab(0,res.data.content[0]) //默认选择第一个船公司
                        }else{
                            this.isLoading = false
                        }
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //船舶轨迹修改 focus
            frontValue(attr,value){ //当前点击的是列表的哪列 数据的哪个属性

            },
            //船舶轨迹修改 keyup.enter blur
            inputBlur(attr,value,index) {//第一个参数 属性 第二个value值 第三个 表格的index

            },
            //日期聚焦 
            focusDate(val) {

            },
            //改变时区 和 在港停留时间
            changInput(list){
                this.cunChu(list) //存储修改的动态船舶
            },
            //改变日期
            changeDate(val,index,name,att,list){
                if(list) {
                    this.cunChu(list) //存储修改的动态船舶
                }
                var name = name //当前点击列表的属性
                var att = att //当前点击列表显示的属性
                var newObj = this.routePortList[index]
                if(val) {
                    //下面是处理时间
                    var d = new Date(val)
                    var Y = d.getFullYear()
                    var M = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
                    var D = d.getDate() > 9 ? d.getDate() : '0' + d.getDate()
                    var resDate = Y + '-' + M + '-' + D
                    //下面是获取周
                    //因为fommat格式解析问题所以另下面的用于解析显示
                    var weekDay = ["'S'UN", "'M'ON", "TUE", "WE'D'", "T'H'U", "FRI", "'S''A''T'"];
                    var W = weekDay[new Date(Date.parse(resDate)).getDay()]; //显示时候需要放的
                    //下面的用于返给后台数据
                    var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                    var S = week[new Date(Date.parse(resDate)).getDay()]; //显示时候需要放的
                    //得到想要的日期格式  年-月-日 （周） 进行赋值
                    newObj[name] = resDate + '('+ S + ')' //用于数据
                    newObj[att] = resDate + '('+ W + ')' //用于页面显示
                }
                else{
                    newObj[name] = '' //用于数据
                    newObj[att] = '' //用于页面显示
                }
            },
            //点击路径详情的航线代码 修改航线共舱信息 挂靠港
            appearRout(val) {
                if(val.routeCode) { //有航线代码
                    this.routeAtta = true
                    this.routeText = '修改'
                    this.routeId = val.staticId
                    this.withArry = []
                }
            },
            // 关闭挂靠港详情页
            handleClose() {
                this.routeAtta = false
                this.winResize()
            },
            // 子组件新增 或者 修改数据 成功  父组件重新渲染页面
            manageUpdat() {
                this.isUdate = false
                this.switchPort(this.querObject.item,this.querObject.index) //取船舶详情基础信息接口
            },
            //监控进口航次的填写
            changeInV(val,index,list){
                this.cunChu(list) //存储修改的动态船舶
                if (val) { //如果用户填写了进口航次 则出口航次不能填写
                    this.routePortList[index].isOut = true
                }else{ //否则可以填写
                    this.routePortList[index].isOut = false
                }
            },
            //监控出口航次的填写
            changeOutV(val,index,list){
                this.cunChu(list) //存储修改的动态船舶
                if (val) { //如果用户填写了出口航次 则进口航次不能填写
                    this.routePortList[index].isIn= true
                }else{ //否则可以填写
                    this.routePortList[index].isIn = false
                }
            },
            //存储修改的动态船舶到changeUseInf
            cunChu(list){
                if(this.changeUseInf.length > 0) {
                    for (let i = 0; i < this.changeUseInf.length; i++) {//如果存储用户修改的数组里有值 根据id比较一下
                        if(list.dockingId == this.changeUseInf[i].dockingId){ //找出当前修改的是否有重复的id 有覆盖添加
                            this.changeUseInf.splice(i,1,list)
                            return 
                        }
                    }
                    this.changeUseInf.push(list)
                }else{
                    this.changeUseInf.push(list)
                }
            },
            //保存
             async saveClick(ruleForm) {
                try {
                    let valid = await this.$refs[ruleForm].validate();
                    if (!valid) return;
                    if(this.addOrEdit == "新增") {
                        this.isLoading = true
                        var query = this.ruleForm
                        if(this.ruleForm.carrier == '全部') {
                            query.carrier = ''
                        }
                        this.$axios.post(this.commonJs.localUrl + `/schedules/vessel/add`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("UpdatParent");
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.handleCloseClick();
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else if (res.data.status == 2) {
                                    this.$message({
                                        type: "error",
                                        message: "有重复船名"
                                    });
                                    this.isLoading = false
                                }
                            }).catch(_ => {});
    
                    }else if(this.addOrEdit == "修改") {
                        this.isLoading = true
                        var list = []
                        //this.changeUseInf 数组存放的就是修改的船舶轨迹
                        if(this.changeUseInf.length > 0) {
                            for (let i = 0; i < this.changeUseInf.length; i++) {
                                if(this.changeUseInf[i].id == ''){
                                    if(this.changeUseInf[i].inVoyage == '' && this.changeUseInf[i].outVoyage == ''){
                                        this.$message({
                                            type: "error",
                                            message: `${this.changeUseInf[i].carrier}船公司下有修改的出口航次或者进口航次未填`
                                        });
                                        this.isLoading = false
                                        return
                                    }
                                }
                                // if(this.changeUseInf[i].id !== ''){
                                    var id = this.changeUseInf[i].id // 轨迹id
                                    var dockingId = this.changeUseInf[i].dockingId // 轨迹id
                                    var scac = this.changeUseInf[i].scac // 轨迹id
                                    var basePort = this.changeUseInf[i].basePort //标准挂靠港
                                    var apiPort = this.changeUseInf[i].apiPort //数据源挂靠港
                                    var routeCode = this.changeUseInf[i].routeCode //航线代码
                                    var inVoyage = this.changeUseInf[i].inVoyage //进口航次
                                    var outVoyage = this.changeUseInf[i].outVoyage //出口航次
                                    var shiptype = this.changeUseInf[i].shiptype //类型
                                    var timeZone = this.changeUseInf[i].timeZone //时区
                                    var staticEta = this.changeUseInf[i].staticEta //静态eta
                                    var staticEtd = this.changeUseInf[i].staticEtd //静态etd
                                    var ata = this.changeUseInf[i].ata //ATA
                                    var atd = this.changeUseInf[i].atd //ATD
                                    var stayinport = this.changeUseInf[i].stayinport //在港停留时间（小时）
                                    var warning = this.changeUseInf[i].warning //预警
                                    list.push({
                                        id:id,
                                        dockingId:dockingId,
                                        scac:scac,
                                        basePort:basePort,
                                        apiPort:apiPort,
                                        routeCode:routeCode,
                                        inVoyage:inVoyage,
                                        outVoyage:outVoyage,
                                        shiptype:shiptype,
                                        timeZone:timeZone,
                                        staticEta:staticEta,
                                        staticEtd:staticEtd,
                                        ata:ata,
                                        atd:atd,
                                        stayinport:stayinport,
                                        warning:warning,
                                    })
                                // }
                            }
                        }
                        var query = this.ruleForm
                        query['list'] = list
                        this.$axios.put(this.commonJs.localUrl + `/schedules/vessel/modify`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("UpdatParent");
                                    this.$message({
                                        type: "success",
                                        message: res.data.message
                                    });
                                    this.handleCloseClick();
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else if (res.data.status == 2) {
                                    this.$message({
                                        type: "error",
                                        message: "有重复船名"
                                    });
                                    this.isLoading = false
                                }
                            }).catch(_ => {});
                    }
                } catch (e) {}
            },
            //监听窗口变化
            winResize() {
                this.dataWidth = document.body.clientWidth - (this.screenWidth * 0.22222 )
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
        },
        watch:{
            screenWidth (val) {
                if(val <= 500){
                    this.dataWidth = this.dataWidth
                }else{
                    this.dataWidth = val - (val * 0.22222 )
                }
            },
            screenHeight (val) {
               var height = val - 80
               this.innerHeight = height  + 'px'
            }    
        },
        mounted() {
            this.winResize() //监听窗口变化
            if(this.shipText == "新增"){
                this.addOrEdit = "新增"
                this.isLoading = false
            }else if(this.shipText == "修改"){
                this.addOrEdit = "修改"
                this.basicInfor() //取船舶详情基础信息接口
                this.basicList() //取表格数据
                this.isUpdate = true
            }
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
    /deep/.el-col {
        margin-right: 0px !important;
    }
    /deep/.el-row .el-col:nth-last-of-type(1){
        margin-right: 0;
    }
    .sel-inner /deep/.el-input__inner{
        padding-left: 25px;
        padding-right: 10px;
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
    .routeAdd {
        position: relative;
        overflow: hidden;
    }
    .routeAtta{
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
    .redclass {
        color: red;
    }
    .look{
        color:#3bafda;
        cursor: pointer;
    }
    .slotRed{
        position: absolute;
        right: 10px;
        top: 2px;
    }
    .tabUl{
        background: #fff;
        display: flex;
        padding-right: 20px;
        flex-wrap: wrap;
    }
    .tabLI{
        width: 70px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid #ccc;
        font-size: 12px;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .tabLI:last-child {
        border-radius: 0 5px 5px 0;
    }
    .tabLI:first-child {
        border-radius: 5px 0 0 5px;
    }
    li:not(:first-child) {
        border-left: 0;
    }
    .tabLI:only-child {
        border-radius: 5px;
    }
    .tabColor{
        color: #fff;
        background: #3bafda;
    }
    .shipUL{
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 20px;
    }
    .shipLI{
        cursor: pointer;
        .coloGreen{
            color: #199ED8;
            border-bottom: 1px solid #199ED8;
        }
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
            cursor: pointer;
        }
    }
    .startBtn{
        background: #fff;
        display: flex;
        padding-right: 20px;
        margin-top: 40px;
    }
    .BtnLI{
        padding: 7px 35px;
        border: 1px solid #ccc;
        font-size: 12px;
        cursor: pointer;
    }
    .BtnLI:first-child {
        border-radius: 5px 0 0 5px;
    }
    .BtnLI:last-child {
        border-radius: 0 5px 5px 0;
    }
    .noRoute{
        width: 100%;
        height: 40px;
        position: relative;
        p{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: #909399;
            font-size: 12px;
        }
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
    .shipData{
        width: 100%;
        height: 400px;
        margin-bottom: 20px;
        overflow: hidden;
    }
    .voyageClass {
        display: inline-block;
        color: #3bafda;
        margin-right: 20px;
        // border-bottom: 1px solid rgba(4, 153, 255, 1);
        text-decoration: underline;
        cursor: pointer;
    }
    .hui{
        color: #999;
    }
</style>