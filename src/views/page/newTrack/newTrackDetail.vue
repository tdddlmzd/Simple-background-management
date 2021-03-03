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
                    <li class="routeLi">
                        <div class="title">
                            <span>运单信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="运单号" label-width="93px">
                                    <el-input v-model="ruleForm.referenceno" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="起运港" label-width="93px">
                                    <el-input v-model="ruleForm.pol" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="目的港" label-width="93px">
                                    <el-input v-model="ruleForm.dtp" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="中转港" label-width="93px">
                                    <el-input v-model="ruleForm.trspplace" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="ETA" label-width="93px">
                                    <el-input v-model="ruleForm.etapld" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="ETD" label-width="93px">
                                    <el-input v-model="ruleForm.etdpol" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="船公司" label-width="93px">
                                    <el-input v-model="ruleForm.carriercd" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="船名" label-width="93px">
                                    <el-input v-model="ruleForm.vslname" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="航次" label-width="93px">
                                    <el-input v-model="ruleForm.voy" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="航程" label-width="93px">
                                    <el-input v-model="ruleForm.days" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="箱型/箱量" label-width="93px">
                                    <el-input v-model="ruleForm.ctnrType" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:48%">
                                <el-form-item label="备注" label-width="93px">
                                    <el-input v-model="ruleForm.remark" placeholder="" readonly></el-input>
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
                                <el-form-item label="服务码头" label-width="93px">
                                    <el-input v-model="ruleForm.terminal" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="开港时间" label-width="93px">
                                    <el-input v-model="ruleForm.opentime" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="截港时间" label-width="93px">
                                    <el-input v-model="ruleForm.closetime" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <span class="promptIn">提示：信息由码头提供！</span>
                        </el-row>
                        <el-row>
                            <el-col style="width:27%">
                                <el-form-item label="截VGM时间" label-width="93px">
                                    <el-input v-model="ruleForm.vgmtime" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="截AMS/ENS" label-width="93px">
                                    <el-input v-model="ruleForm.amstime" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:27%">
                                <el-form-item label="截关时间" label-width="93px">
                                    <el-input v-model="ruleForm.etctime" placeholder="" readonly></el-input>
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
                                <el-form-item label="计划靠泊">
                                    <el-input v-model="ruleForm.eta" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="实际靠泊">
                                    <el-input v-model="ruleForm.ata" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:30%">
                                <el-form-item label="计划离泊">
                                    <el-input v-model="ruleForm.etd" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="实际离泊">
                                    <el-input v-model="ruleForm.atd" placeholder="" readonly></el-input>
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
                                <el-form-item label="计划靠泊">
                                    <el-input v-model="ruleForm.dlpttime" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="实际靠泊">
                                    <el-input v-model="ruleForm.dschtime" placeholder="" readonly></el-input>
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
                                <el-form-item label="船期路径">
                                    <el-input v-model="ruleForm.routeway" placeholder="" readonly></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:30%">
                                <el-form-item label="周次">
                                    <el-input v-model="ruleForm.staticweek" placeholder="" readonly></el-input>
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
                            <el-table-column prop="ctnrno" label="箱号" align="left" :show-overflow-tooltip="true" min-width="120">
                               <template slot-scope="scope">
                                    <span>{{scope.row.ctnrno ? scope.row.ctnrno : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sealno" label="封号" align="left" :show-overflow-tooltip="true" min-width="120">
                                <template slot-scope="scope">
                                    <span>{{scope.row.sealno ? scope.row.sealno : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="csize" label="箱型" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.csize ? scope.row.csize + scope.row.ctype : '-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pieces" label="件数" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.pieces ? '-' : '-'}}</span>
                                    <!-- scope.row.pieces ? scope.row.pieces : '-' -->
                                </template>
                            </el-table-column>
                            <el-table-column prop="grosswgt" label="毛重" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.grosswgt ? '-' : '-'}}</span>
                                    <!-- scope.row.grosswgt ? scope.row.grosswgt + 'KG' : '-' -->
                                </template>
                            </el-table-column>
                            <el-table-column prop="volume" label="体积" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.volume ? '-' : '-'}}</span>
                                    <!-- {{ scope.row.volume ? scope.row.volume + 'CBM' : '-'}} -->
                                </template> 
                            </el-table-column>
                            <el-table-column prop="newest" label="最新状态" align="left" :show-overflow-tooltip="true" min-width="240">
                                <template slot-scope="scope">
                                    {{scope.row.newest ? scope.row.newest : '-'}}
                                </template> 
                            </el-table-column>
                            <el-table-column prop="" label="详情" align="left" :show-overflow-tooltip="true" min-width="60">
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
                            <el-table-column prop="currentName" label="标准状态" align="left" :show-overflow-tooltip="true" min-width="80">

                            </el-table-column>
                            <el-table-column prop="statustime" label="计划时间" align="left" :show-overflow-tooltip="true" min-width="147">
                                <template slot-scope="scope">
                                    <span>{{scope.row.isest == 'Y' && scope.row.statustime ? getProcessTime('YY-mm-dd HH:MM:SS', new Date(scope.row.statustime)) : ''}}</span>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="statustime" label="发生时间" align="left" :show-overflow-tooltip="true" min-width="147">
                                <template slot-scope="scope">
                                    <span>{{scope.row.isest == 'N' && scope.row.statustime ? getProcessTime('YY-mm-dd HH:MM:SS', new Date(scope.row.statustime)) : ''}}</span>
                                 </template> 
                            </el-table-column>
                            <el-table-column prop="statedescription_en" label="原始状态" align="left" :show-overflow-tooltip="true" min-width="250">
                                <template slot-scope="scope">
                                    <span>{{scope.row.statedescription_en ? scope.row.statedescription_en : ''}}</span>
                                 </template>                                 
                            </el-table-column>
                            <el-table-column prop="statusplace" label="发生地" align="left" :show-overflow-tooltip="true" min-width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.statusplace ? scope.row.statusplace : ''}}</span>
                                 </template>                                 
                            </el-table-column>
                            <el-table-column prop="vslname" label="船名" align="left" :show-overflow-tooltip="true" min-width="170">
                                <template slot-scope="scope">
                                    <span>{{scope.row.vslname ? scope.row.vslname : ''}}</span>
                                 </template>                                 
                            </el-table-column>
                            <el-table-column prop="voy" label="航次" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.voy ? scope.row.voy : ''}}</span>
                                 </template>                                 
                            </el-table-column>
                            <!-- <el-table-column prop="source" label="来源" align="left" :show-overflow-tooltip="true" min-width="80">

                            </el-table-column> -->
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="handleClickImmediate">立即刷新</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    import RouteMap from '@/components/RouteMap/RouteMap'
    export default {
        props: [
            "tratckText",
            "refmd5",
            "recordId",
        ],
        data() {
            return {
                addOrEdit: "", //标题
                isLoading: false, //loading
                isYundang: false, //是否可以立即更新
                referenceno: '',
                ruleForm:{
                    carriercd: "",
                    ckeyid: "",
                    ctnrType: "",
                    dlpttime: "",
                    dschtime: "",
                    dtp: "",
                    etapld: "",
                    etdpol: "",
                    isctnr: "",
                    okeyid: "",
                    pol: "",
                    referenceno: "",
                    remark: "",
                    terminal: "",
                    trspplace: "",
                    vesselPlan: "",
                    voy: "",
                    vslname: "",

                    opentime: '',
                    closetime: '',
                    vgmtime: '',
                    amstime: '',
                    etctime: '',

                    etd: '',
                    atd: '',
                    eta: '',
                    ata: '',

                    cntList: [],
                },

                cargoList: [], //运单号详情表
                innerHeight: '',
                screenHeight: '',
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
                this.$axios.get(this.commonJs.localUrl + `/schedules/trace/newTrackDetails?recordId=${this.recordId}&refmd5=${this.refmd5}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.isYundang = res.data.content.isYundang //是否可以立即更新
                        this.ruleForm.carriercd= res.data.content.carriercd
                        this.ruleForm.ckeyid= res.data.content.ckeyid
                        this.ruleForm.ctnrType= res.data.content.ctnrType
                        this.ruleForm.dtp= res.data.content.dtp
                        this.ruleForm.etapld= res.data.content.etapld
                        this.ruleForm.etdpol= res.data.content.etdpol
                        this.ruleForm.isctnr= res.data.content.isctnr
                        this.ruleForm.okeyid= res.data.content.okeyid
                        this.ruleForm.pol= res.data.content.pol
                        this.ruleForm.referenceno= res.data.content.referenceno
                        this.ruleForm.remark= res.data.content.remark
                        this.ruleForm.terminal= res.data.content.terminalCode ? res.data.content.terminalCode : res.data.content.terminal ? res.data.content.terminal : ''
                        this.ruleForm.trspplace= res.data.content.trspplace
                        this.ruleForm.vesselPlan= res.data.content.vesselPlan
                        this.ruleForm.voy= res.data.content.voy
                        this.ruleForm.vslname= res.data.content.vslname
                        this.ruleForm.days = res.data.content.days
                        this.ruleForm.routeway = res.data.content.routeway
                        this.ruleForm.staticweek = res.data.content.staticweek


                        this.ruleForm.dlpttime= res.data.content.dlpttime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.dlpttime)) : ''
                        this.ruleForm.dschtime= res.data.content.dschtime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(res.data.content.dschtime)) : ''

                        this.ruleForm.opentime = ''
                        this.ruleForm.closetime = ''
                        this.ruleForm.vgmtime = ''
                        this.ruleForm.amstime = ''
                        this.ruleForm.etctime = ''

                        this.ruleForm.etd = ''
                        this.ruleForm.atd = ''
                        this.ruleForm.eta = ''
                        this.ruleForm.ata = ''

                        // 说明有船舶计划
                        if(res.data.content.vesselPlan){
                            var item = res.data.content.vesselPlan
                            this.ruleForm.opentime = item.opentime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.opentime)) : ''
                            this.ruleForm.closetime = item.closetime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.closetime)) : ''
                            this.ruleForm.vgmtime = item.vgmtime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.vgmtime)) : ''
                            this.ruleForm.amstime = item.amstime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.amstime)) : ''
                            this.ruleForm.etctime = item.etctime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.etctime)) : ''

                            this.ruleForm.etd = item.etd ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.etd)) : ''
                            this.ruleForm.atd = item.atd ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.atd)) : ''
                            this.ruleForm.eta = item.eta ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.eta)) : ''
                            this.ruleForm.ata = item.ata ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(item.ata)) : ''
                        }

                        if(res.data.content.ctnrnoInfos.length > 0) {
                                this.ruleForm.cntList = res.data.content.ctnrnoInfos
                                //处理最新状态
                                for (let pt = 0; pt < this.ruleForm.cntList.length; pt++) {
                                    var at = this.ruleForm.cntList[pt]
                                    at.newest = ''
                                    if(at.stateList.length > 0){
                                        var newTime = at.stateList[0].statustime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(at.stateList[0].statustime)) + ' ' : ''
                                        var newCode = at.stateList[0].statuscd ? this.getCurrentName(at.stateList[0].statuscd) + ' ' : '未知' + ' '
                                        var newPlace = at.stateList[0].statusplace ? at.stateList[0].statusplace + ' ' : ''
                                        at.newest = newTime + newCode + newPlace
                                    }
                                    
                                }
                                this.lookVessel(this.ruleForm.cntList[0])
                        }else{
                            this.ruleForm.cntList = []
                            this.cargoList = []
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
            //点箱货跟踪的查看
            lookVessel(val) {
                this.referenceno = val.ctnrno
                if(val.stateList && val.stateList.length > 0){
                    for (let i = 0; i < val.stateList.length; i++) {
                        //处理来源
                        if(
                            val.stateList[i].statuscd == 'GITM' ||
                            val.stateList[i].statuscd == 'PASS' ||
                            val.stateList[i].statuscd == 'TMPS' ||
                            val.stateList[i].statuscd == 'PRLD' ||
                            val.stateList[i].statuscd == 'LOBD'
                        ){
                            val.stateList[i]['source'] = '码头'
                        }else{
                            val.stateList[i]['source'] = '船公司'
                        }

                        //处理节点
                        val.stateList[i]['currentTime'] = val.stateList[i].statustime ? new Date(val.stateList[i].statustime).getTime() : ''

                        //预计时间
                        val.stateList[i].estimated = ''
                        if(val.stateList[i].isest == 'Y'){
                            val.stateList[i].estimated = val.stateList[i].statustime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(val.stateList[i].statustime)) : ''
                        }

                        //实际时间
                        val.stateList[i].timetOccu = ''
                        if(val.stateList[i].isest == 'N'){
                            val.stateList[i].timetOccu = val.stateList[i].statustime ? this.getProcessTime('YY-mm-dd HH:MM:SS', new Date(val.stateList[i].statustime)) : ''
                        }                
                    }

                    //处理节点
                    val.stateList = this.process(val.stateList).sort(this.compare('currentTime'))
                    
                    this.cargoList = val.stateList

                    //处理未知节点
                    for (let p = 0; p < this.cargoList.length; p++) {
                        this.cargoList[p]['currentName'] = '未知'
                        if(this.cargoList[p].statuscd){
                            this.cargoList[p]['currentName'] = this.getCurrentName(this.cargoList[p].statuscd)
                        }else{
                            if(this.ruleForm.carriercd && this.cargoList[p].statedescription_en){
                                this.getDesc(this.cargoList[p],p)
                            }
                        }
                    }
                }else{
                    this.cargoList = []
                }
0            },
            getDesc(item,index){
                var that = this
                that.$axios.get(this.commonJs.localUrl + `/trace/detail/nodeTranslate?carrier=${this.ruleForm.carriercd}&desc=${item.statedescription_en}`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                },
                }).then(res => {
                    if (res.data.status == 1) {
                        if(res.data.content && (res.data.content.webNodeCn || res.data.content.webNodeEn)){ //返回有值
                            item.currentName = res.data.content.webNodeCn ? res.data.content.webNodeCn : '未知'
                        }
                    }
                    this.cargoList.splice(index,1,item)
                })
            },
            getCurrentName(data){
                let node = {
                    BKCF: '订舱',
                    EPRL: '放箱',
                    STSP: '提箱',
                    FCGI: '返场',
                    CGGI: '入货',
                    CLOD: '装箱',
                    CYTC: '集港',
                    GITM: '进场',
                    PASS: '海放',
                    TMPS: '码放',
                    PRLD: '配载',
                    LOBD: '装货',
                    DLPT: '离开',
                    TSGT: '进场',
                    TSDP: '离开',
                    TSLB: '装货',
                    TSBA: '到达',
                    TSCA: '停泊',
                    TSDC: '卸货',
                    IRLB: '装货',
                    IRDP: '离开',
                    IRAR: '到达',
                    IRDS: '卸货',
                    BDAR: '到达',
                    POCA: '停泊',
                    DSCH: '卸货',
                    STCS: '提货',
                    RCVE: '还箱',
                    SUOT: '退关',
                    CUIP: '查验',
                    FDLB: '装货',
                    FDDP: '离开',
                    FDBA: '到达',
                    FDDC: '卸货',
                }
                if(node[data]){
                    return node[data]
                }else{
                    return '未知'
                };
            },
            //获取到的节点排序
            compare(property){
                return function(a,b){
                    var value1 = a[property]
                    var value2 = b[property]
                    return value1 - value2
                }
            },            
            //节点筛选
            process(arr) {
                // 缓存用于记录
                var cacheN = [] //N的数组
                var cacheY = [] //Y的数组
                for(var i = 0; i< arr.length; i++){
                    if(arr[i].isest == 'N'){
                        cacheN.push(arr[i])
                    }
                    if(arr[i].isest == 'Y'){
                        cacheY.push(arr[i])
                    }
                }
                for (let j = 0; j < cacheN.length; j++) {
                    for (let q = 0; q < cacheY.length; q++) {
                        if (cacheY[q].statuscd == cacheN[j].statuscd) {
                            //发现有实际有预计 则 删除预计 把预计的时间放到实际处
                            cacheN[j].estimated = cacheY[q].estimated
                            cacheY.splice(q, 1)
                        }
                    }
                    
                }
                var cache = cacheN.concat(cacheY)
                return cache
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
                this.$emit("closeDetail");
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
        },
        mounted() {
            if(this.tratckText == "修改" ){
                this.addOrEdit = "修改"
                this.detailTrack()
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