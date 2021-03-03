<template>
    <div class="basicPortContent" ref="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <loading v-show="isLoadings"></loading>
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="120px"
            > 
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:24%"> 
                            <el-form-item label="账号">
                                <el-input v-model="ruleForm.username" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>  
                        </el-col>
                        <el-col style="width:24%"> 
                            <el-form-item label="公司">
                                <el-input v-model="ruleForm.company" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:24%"> 
                            <el-form-item label="起运港">
                                <el-input v-model="ruleForm.pol" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:24%"> 
                            <el-form-item label="卸货港">
                                <el-input v-model="ruleForm.dtp" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>                        
                    </el-row>
                    <el-row>
                        <el-col style="width:24%"> 
                            <el-form-item label="单号">
                                <el-input v-model="ruleForm.referenceno" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:24%"> 
                            <el-form-item label="箱号">
                                <el-input v-model="ruleForm.ctnrno" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:24%"> 
                            <el-form-item label="船公司">
                                <el-input v-model="ruleForm.carrier" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:24%"  > 
                            <el-form-item label="查询结果">
                                <el-select 
                                    v-model="ruleForm.resultType" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                <el-option
                                    v-for="item in resultList"
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
                        <el-col style="width:24%" >
                            <el-form-item label="第一次订阅时间">
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
                        <el-col style="width:24%">
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
                        <el-col style="width:24%" >
                            <el-form-item label="操作时间">
                                <el-date-picker
                                    v-model="ruleForm.operStartTime"
                                    type="date"
                                    style="width:100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="开始日期"
                                >   
                                </el-date-picker>
                            </el-form-item> 
                        </el-col> 
                        <el-col style="width:24%">
                            <el-form-item label="——">
                                <el-date-picker
                                    v-model="ruleForm.operEndTime"
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
                        <el-col style="width:24%">
                            <el-form-item label="用户类型">
                                <el-select 
                                    v-model="ruleForm.userType" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
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
                        <el-col style="width:24%">
                            <el-form-item label="是否收费">
                                <el-select 
                                    v-model="ruleForm.chargeType" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
                                >
                                <el-option
                                    v-for="item in chargeList"
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
        <div class="tablePage">
            <div class="buttonTop">
                <el-button size="small" class="teshunormal" @click="handleExportClick">导出</el-button>
                <el-button size="small" class="teshunormal" @click="handleClickSubscribe">重新订阅</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @selection-change="handleSelectionChange"
            >
                <el-table-column  prop="userType"  label="用户类型"  :show-overflow-tooltip=true align="left" width="100" :sortable="sortableState" :filters="[]"> 
                   
                </el-table-column>
                <el-table-column  prop="username" label="账号"  :show-overflow-tooltip=true align="left" min-width="100" :sortable="sortableState" :filters="[]"> 

                </el-table-column>
                <el-table-column  prop="company"  label="公司"  :show-overflow-tooltip=true align="left" min-width="120" :sortable="sortableState" :filters="[]"> 

                </el-table-column>
                <el-table-column  prop="pol" label="起运港"  :show-overflow-tooltip=true align="left" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="dtp" label="卸货港"  :show-overflow-tooltip=true align="left" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="referenceno" label="单号"  :show-overflow-tooltip=true align="left" min-width="160" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="ctnrno" label="箱号"  :show-overflow-tooltip=true align="left" min-width="160" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="carrier"  label="船公司"  :show-overflow-tooltip=true align="left" min-width="100" :sortable="sortableState" :filters="[]"> 

                </el-table-column>
                <el-table-column  prop="result" label="查询结果" :show-overflow-tooltip=true align="left" min-width="100" :sortable="sortableState" :filters="[]"> 
                    
                </el-table-column>
                <el-table-column  prop="firstUploadTime"  label="第一次订阅时间" :show-overflow-tooltip=true align="left" width="162" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="firstDownloadTime"  label="第一次下载时间" :show-overflow-tooltip=true align="left" width="162" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="firstHasdataTime"  label="数据第一次返回时间" :show-overflow-tooltip=true align="left" width="172" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="isCharge"  label="是否收费" :show-overflow-tooltip=true align="left" width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="firstVesselPlanTime"  label="第一次获取到船舶计划时间" :show-overflow-tooltip=true align="left" width="200" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="firstTerminalTime"  label="第一次获取到港区数据时间" :show-overflow-tooltip=true align="left" width="200" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="firstCarrierTime"  label="第一次获取到船东数据时间" :show-overflow-tooltip=true align="left" width="200" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="eta"  label="预计靠泊" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="ata"  label="实际靠泊" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="etd"  label="预计离港" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="atd"  label="实际离港" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="gitm"  label="进港(GITM)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="pass"  label="海放(PASS)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="tmps"  label="码放(TMPS)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="lobd"  label="装船(LOBD)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="stsp"  label="提空箱(STSP)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="dlpt"  label="离港(DLPT)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="bdar"  label="到港(BDAR)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="dsch"  label="卸船(DSCH)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="stcs"  label="提货(STCS)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="rcve"  label="还空(RCVE)" :show-overflow-tooltip=true align="left" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column  prop="remark"  label="备注" :show-overflow-tooltip=true align="left" width="280" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <el-input
                         class="sel-el"
                        v-model="scope.row.remark"
                        maxlength="30"
                        placeholder="最多输入30字"
                        @change="changeRemark(scope.row)"
                        >
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="operuser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.row.operuser ? scope.row.operuser.toUpperCase() : ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="operTime" label="操作时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="142">
                
                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                  </template>
            </el-table>
            <!--分页-->
          <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>  
        </div>
        <el-dialog
            class="subscribe"
            :visible.sync="subscribe"
            v-if="subscribe"
            ref="subscribe"
            width="800px"
            append-to-body
            top="200px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <reSubscription
                :subscribe="subscribe"
                @closeSubscribe="handleClose"
                @updatShip="updatShip"
                ref="reSubscription"
            >
            </reSubscription>
        </el-dialog>
    </div>
</template>

<script>
    import qs from "qs";
    import reSubscription from "./reSubscription.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
                return {
                    isLoadings : true,
                    subscribe : false,
                    sortableState: true, //排序
                    ruleForm:{
                        username: "",//用户名
                        company: "",//公司
                        userType: "",//用户类型
                        pol: '', //起始港
                        referenceno: "", //订阅号
                        ctnrno:"",
                        dtp:"",
                        carrier:"",
                        resultType:"", //查询结果
                        chargeType: '', //是否收费
                        startTime:"", //开始时间
                        endTime:"",//结束时间
                        operStartTime: '', //操作开始
                        operEndTime: '', //操作开始
                    },
                    tableData: [],
                    multipleSelection: [],
                    //查询结果集合 0：成功 1：暂无数据
                    resultList: [
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 0,
                            label: '有数据'
                        },
                        {
                            value: 1,
                            label: '无数据'
                        },
                        {
                            value: 2,
                            label: '未订阅'
                        }
                    ],
                    // 类型
                    typeList:[
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 1,
                            label: 'API'
                        },
                        {
                            value: 2,
                            label: '平台'
                        }
                    ],
                    chargeList:[
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 1,
                            label: '是'
                        },
                        {
                            value: 0,
                            label: '否'
                        }
                    ],
                    pageNo:1,
                    pageSize:10,
                    total:0,
                    // 引用 ThePagination组件
                    refPagination: {},
                    paginationAttribute: {
                        handleChange: this.handleChange
                    },
                    //分页默认状态
                    pageNumber : -1,
                    page: {
                        // 当前页数
                        pageNo: 1,
                        // 每页默认显示条数
                        pageSize: 10,
                        // 总条数
                        total: 0
                    },
                    matched:"",
                }
        },
        components : {
            ThePagination,
            reSubscription,
            Breadcrumb,
            loading,
            noData
        },
        methods: {
            searchList(abnormal){
                this.isLoadings = true
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }else{ //开始时间要 拼上 '00:00:00'
                    if(this.ruleForm.startTime.indexOf('00:00:00') !== -1){
                        this.ruleForm.startTime = this.ruleForm.startTime
                    }else{
                        this.ruleForm.startTime = this.ruleForm.startTime + ' ' + '00:00:00'
                    }
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }else{ //结束时间要拼上 '23:59:59'
                    if(this.ruleForm.endTime.indexOf('23:59:59') !== -1){
                        this.ruleForm.endTime = this.ruleForm.endTime
                    }else{
                        this.ruleForm.endTime = this.ruleForm.endTime + ' ' + '23:59:59'
                    }
                }

                if(this.ruleForm.operStartTime == '' || this.ruleForm.operStartTime == null) {
                    this.ruleForm.operStartTime = ''
                }else{ //开始时间要 拼上 '00:00:00'
                    if(this.ruleForm.operStartTime.indexOf('00:00:00') !== -1){
                        this.ruleForm.operStartTime = this.ruleForm.operStartTime
                    }else{
                        this.ruleForm.operStartTime = this.ruleForm.operStartTime + ' ' + '00:00:00'
                    }
                }
                if(this.ruleForm.operEndTime == '' || this.ruleForm.operEndTime == null) {
                    this.ruleForm.operEndTime = ''
                }else{ //结束时间要拼上 '23:59:59'
                    if(this.ruleForm.operEndTime.indexOf('23:59:59') !== -1){
                        this.ruleForm.operEndTime = this.ruleForm.operEndTime
                    }else{
                        this.ruleForm.operEndTime = this.ruleForm.operEndTime + ' ' + '23:59:59'
                    }
                }

                this.$axios.get(this.commonJs.localUrl +`/schedules/trace/report?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&username=${this.ruleForm.username
                }&company=${this.ruleForm.company
                }&userType=${this.ruleForm.userType
                }&referenceno=${this.ruleForm.referenceno
                }&ctnrno=${this.ruleForm.ctnrno
                }&dtp=${this.ruleForm.dtp
                }&carrier=${this.ruleForm.carrier
                }&pol=${this.ruleForm.pol
                }&resultType=${this.ruleForm.resultType
                }&chargeType=${this.ruleForm.chargeType
                }&startTime=${this.ruleForm.startTime
                }&endTime=${this.ruleForm.endTime
                }&operStartTime=${this.ruleForm.operStartTime
                }&operEndTime=${this.ruleForm.operEndTime
                }`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        if(res.data.content){
                            if(res.data.content.length <= 0){
                                this.tableData=[];
                                if(this.$refs.refPagination){
                                    this.$refs.refPagination.page.total = res.data.total
                                    this.$refs.refPagination.changeValue()                            
                                };        
                            }else{
                                if (res.data.status == 1) {
                                    this.tableData=[]
                                    this.tableData = res.data.content
                                    if(this.$refs.refPagination){
                                        this.$refs.refPagination.page.total = res.data.total
                                        this.$refs.refPagination.changeValue()
                                    }           
                                };
                                if(this.$refs.refPagination){
                                    if(Math.ceil(this.$refs.refPagination.page.total / this.page.pageSize) < this.page.pageNo){
                                        this.$refs.refPagination.handleCurrentChange(1);
                                    };
                                };
                            }
                            if(abnormal){
                                this.isLoadings = false;
                                this.$message.success("设置成功")
                                let scroll = document.getElementById('elmain');
                                scroll.style.overflowY = "auto";
                            }else{
                                this.isLoadings = false;
                            }
                        }
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        // this.isLoadings = false;
                    }
                })  
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //导出
            handleExportClick(){
                if(this.$refs.refPagination.page.total > 1000000){
                    this.$message({
                        type: "error",
                        message: "单次导出不可大于100万条"
                    });
                    return
                }
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }
                if(this.ruleForm.operStartTime == '' || this.ruleForm.operStartTime == null) {
                    this.ruleForm.operStartTime = ''
                }
                if(this.ruleForm.operEndTime == '' || this.ruleForm.operEndTime == null) {
                    this.ruleForm.operEndTime = ''
                }
                this.$axios({method: 'get',url: this.commonJs.localUrl +`/schedules/trace/exportReport?total=${this.$refs.refPagination.page.total
                    }&username=${this.ruleForm.username
                    }&company=${this.ruleForm.company
                    }&userType=${this.ruleForm.userType
                    }&referenceno=${this.ruleForm.referenceno
                    }&ctnrno=${this.ruleForm.ctnrno
                    }&dtp=${this.ruleForm.dtp
                    }&carrier=${this.ruleForm.carrier
                    }&pol=${this.ruleForm.pol
                    }&resultType=${this.ruleForm.resultType
                    }&chargeType=${this.ruleForm.chargeType
                    }&startTime=${this.ruleForm.startTime
                    }&endTime=${this.ruleForm.endTime
                    }&operStartTime=${this.ruleForm.operStartTime
                    }&operEndTime=${this.ruleForm.operEndTime
                    }`,
                    responseType: 'blob',
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then((res) => {
                    let url = window.URL.createObjectURL(res.data);
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    let contentDisposition = res.headers['content-disposition'];
                    if(contentDisposition){
                        let fileName = res.headers['content-disposition'].split('filename=');
                        link.setAttribute('download', fileName[1]);
                        document.body.appendChild(link);
                        link.click();
                    }else{
                        this.$message.error("暂无数据")
                    }
                });
            },
            //重新订阅
            handleClickSubscribe(){
                this.subscribe = true
            },
            //关闭事件
            handleClose() {
                this.subscribe = false
            },
            updatShip(){
                this.searchList()
            },
            serchBtn(){
                if(this.ruleForm.startTime === ''){
                    this.ruleForm.startTime = null;
                };
                if(this.ruleForm.endTime  === ''){
                    this.ruleForm.endTime = null;
                };
                if(this.ruleForm.startTime != null && this.ruleForm.endTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入查询时间的结束时间',
                    });
                    return;
                }else if(this.ruleForm.endTime != null && this.ruleForm.startTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入查询时间的开始时间',
                    });
                    return;
                }
                if(this.ruleForm.operStartTime === ''){
                    this.ruleForm.operStartTime = null;
                };
                if(this.ruleForm.operEndTime  === ''){
                    this.ruleForm.operEndTime = null;
                };
                if(this.ruleForm.operStartTime != null && this.ruleForm.operEndTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入操作时间的结束时间',
                    });
                    return;
                }else if(this.ruleForm.operEndTime != null && this.ruleForm.operStartTime == null){
                    this.$message({
                        type : 'error',
                        message : '请输入操作时间的开始时间',
                    });
                    return;
                }
                this.$refs.refPagination.handleCurrentChange(1);
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoadings = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchList();
                this.pageNumber = -1;
            },
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },

            //添加备注
            changeRemark(item){
                this.$axios.get(this.commonJs.localUrl +`/schedules/trace/updateRemark?id=${item.id}&remark=${item.remark}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        //取当前时间
                        var nowTime = this.commonJs.getDateTime('YY-mm-dd HH:MM:SS', new Date())
                        item.operTime = nowTime
                        //取当前登录人
                        item.operuser = this.getCookie('userName')
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        })
                    }
                })  

            },
        },
        mounted(){
            this.matched = this.$route.matched;
            this.searchList();
            this.$bus.on('clickMenu', content => {
                this.$refs.table.clearSort()
                this.ruleForm.username = "",//用户名
                this.ruleForm.company = "",//公司
                this.ruleForm.userType = "",
                this.ruleForm.referenceno = "",
                this.ruleForm.ctnrno = "",
                this.ruleForm.dtp = "",
                this.ruleForm.carrier ="",
                this.ruleForm.pol ="", //起运港
                this.ruleForm.resultType ="", //查询结果
                this.ruleForm.chargeType ="",
                this.ruleForm.startTime ="", //开始时间
                this.ruleForm.endTime =""//结束时间
                this.ruleForm.operStartTime =""
                this.ruleForm.operEndTime =""
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.searchList();
            });
        },
        destroyed(){
            this.$bus.off('clickMenu');
        },
    }
  </script>

<style lang="scss" scoped>
    /deep/ .demo-table-expand {
        font-size: 0;
    }
    /deep/ .demo-table-expand label {
        width: 250px;
        color: #99a9bf;
    }
    /deep/.el-row .el-col:nth-last-of-type(1){
            margin-right: 0;
    }
    /deep/ .refPagination input{
        width: 100px!important;
    }
    /deep/ .el-table__expand-icon{
        visibility: hidden !important;
    }
    /deep/ .el-table__expanded-cell{
        text-align:center !important;
        color: #3bafda
    }
    /deep/ .el-table th, .el-table tr{
            height: 30px;
    }
    /deep/ .el-table th{
            height: 30px;
            padding: 0;
    }  
    /deep/ .dateTime div:nth-child(1){
        margin-left: 11px !important;
    }
    /deep/ .el-scrollbar__view .el-select-dropdown__list li:nth-of-type(1){
        color:#409EFF;
        font-weight:700
    }
    
    /deep/ .el-table .warning-row{
        background:rgba(241, 245, 247, 1) !important;
    }
    // /deep/ .el-table .el-table__row:hover td{
    //     background:rgba(241, 245, 247, 1);
    // }
    /deep/.el-table .cell{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
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
    .tablePage /deep/.el-icon-arrow-down::before{
        color: red;
        display: none;
        margin-left:-10px;
        height: 0;
    }
    /deep/.el-table__column-filter-trigger{
        width: 0;
        height: 0;
    }
    .serachUL {
        list-style:none;margin:0;
    }
    .serachUL li{
        display: inline-block;
    }
    .serachBtn{
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .subscribe{
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
    .exception{
        color: #FF0000;
        border: 1px solid #FF0000;
        font-size: 12px;
        border-radius: 3px;
        padding: 7px 15px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        border-spacing: 2px;
        height: 28px;
        line-height: 14px;
    }
    .normal{
        color:#3bafda;
        border: 1px solid #3bafda;
        padding: 9px 15px;
        cursor: pointer;
        background: #fff;
        text-align: center;
        margin-right: 20px;
    }
    .exceptions{
        color: #FF0000;
    }
    .normals{
        color:#3bafda;
    }
    .contentLeft{
        float: left;
        width: 90%;
    }
    .contenRight{
        position: absolute;
        right: 20px;
        bottom: 5px;
    }
    .noClick{
        color:#B3C0D1
    }
    .isClick{
        color: #409EFF;
        cursor:pointer
    }
    
    .basicPortContent{
        position: relative;
        overflow: hidden;
        padding: 20px 20px 0px 20px ;
        .serachBack{
            background-color: #fff ;
            padding: 20px 0px 0px 0px ;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage{
            background-color: #fff ;
            padding: 20px 20px 20px 20px;
        }
        .refPagination{
            width: 100%;
            background-color: #fff ;
        }
    }
    
    label:nth-of-type(2){
        width: 10px !important;
    }
    .buttonTop{
        margin-bottom: 20px;
        .clickColor{
            background-color: #fff;
            padding: 9px 15px;
            margin-right: 10px;
        }
        .teshunormal{
            color:#3bafda;
            border: 1px solid #3bafda;
            width: 80px;
            cursor: pointer;
            background: #fff;
            text-align: center;
            margin-right: 10px;
        }
        .normals{
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .abnormal{
            border: 1px solid #FF0000;
            color: #FF0000;
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }

</style>
