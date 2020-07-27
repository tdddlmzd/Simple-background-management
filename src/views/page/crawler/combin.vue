<template>
    <div class="portContent">
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <!--el-from-->
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="90px"
            >
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:25%">
                            <el-form-item label="船公司">
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
                        <el-col style="width:25%">
                            <el-form-item label="起运港">
                                <!-- <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.pol"
                                    placeholder="请输入并选择"
                                    :remote-method="portStartRemote"
                                    @focus="portStartFocus"
                                    @change="portStartChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        v-for="item in portStartList"
                                        :key="item.id"
                                        :label="item.portEn"
                                        :value="item.portEn"
                                        :title='item.portEn+"("+ item.portCode+")"'
                                    >
                                        <span>{{item.portEn+"("+ item.portCode+")" }}</span>
                                    </el-option>
                                </el-select> -->
                                <el-input v-model="ruleForm.pol" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:25%">
                            <el-form-item label="目的港">
                                <el-select
                                    remote
                                    clearable
                                    filterable
                                    v-model="ruleForm.pod"
                                    placeholder="请输入并选择"
                                    :remote-method="portEndRemote"
                                    @focus="portEndFocus"
                                    @change="portEndChange"
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
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:25%">
                            <el-form-item label="抓取结果">
                                <el-select
                                    v-model="ruleForm.dataNotAvailable"
                                    style="width:100%;"
                                    placeholder="请选择"
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
                        <el-col style="width:25%" >
                            <el-form-item label="更新时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.groupUpdateTimeStart"
                                    type="date"
                                    style="width:100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="开始日期"
                                >   
                                </el-date-picker>
                            </el-form-item> 
                        </el-col> 
                        <el-col style="width:25%">
                            <el-form-item label="——">
                                <el-date-picker
                                    v-model="ruleForm.groupUpdateTimeEnd"
                                    style="width:100%"   
                                    type="date" 
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
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
        <!--el-table-->
        <div class="tablePage">
            <div class="buttonTop">
                <!-- <el-button size="small" class="clickColor normals">常用</el-button> -->
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
            >
                <!-- @selection-change="handleSelectionChange" -->
                <!-- <el-table-column type="selection" width="45" max="1">

                </el-table-column> -->
                <el-table-column prop="dataNotAvailable" label="抓取结果" align="left" :show-overflow-tooltip="true" width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <img src="@/assets/images/route/ident.png" class="newIdent" v-if="scope.row.isNew === 1">
                        <span style='padding-left:10px'>{{scope.row.dataNotAvailable === 0 ?'无数据':scope.row.dataNotAvailable === 1?'有数据' :'有数据'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" width="90" :sortable="sortableState" :filters="[]">
                    
                </el-table-column>
                <el-table-column prop="pol" label="起运港" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope" class="identImage">
                        <!-- <img src="@/assets/images/route/ident.png" class="ident" ref="ident"> -->
                        <span>
                            {{scope.row.pol}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="pod" label="目的港" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="scacPol" label="船公司起运港" align="left" :show-overflow-tooltip="true" min-width="150" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="scacPod" label="船公司目的港" align="left" :show-overflow-tooltip="true" min-width="150" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="groupUpdateTime" label="更新时间" align="left" :show-overflow-tooltip="true" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
          <!--分页-->
            <ThePagination
                ref="refPagination"
                :pageNumber="pageNumber"
                :attribute="paginationAttribute"
                class="lr refPagination"
                v-if="isRouterPage"
            ></ThePagination>
        </div>
    </div>
</template>

<script>
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "", //路径
                isRouterPage: false, //Pagination 分页
                isLoading: false, //loading
                sortableState: true, //排序
                companyNameList: [], //船公司
                portStartList: [], //起运港
                portEndList: [], //目的港
                tableData: [], //表格数据
                ruleForm: {
                    scac: '', //船公司四字码
                    carrier: '全部', //船公司
                    pol: 'SHANGHAI', //起始港
                    polCode: 'CNSHA', //起始港五字码
                    pod: '', //目的港
                    podCode: '', //目的港五字码
                    dataNotAvailable: '', //路径状态0无数据，1有数据
                    groupUpdateTimeStart: '',  //更新时间（开始）
                    groupUpdateTimeEnd: '',  //更新时间（结束）
                },
                stateList: [
                    {
                        value: '',
                        label: "全部"
                    },
                    {
                        value: 1,
                        label: "有数据"
                    },
                    {
                        value: 0,
                        label: "无数据"
                    },
                ],
                //目的港等级
                podLevelList: [
                    {
                        value: 1,
                        label: 1
                    },
                    {
                        value: 2,
                        label: 2
                    },
                ],
                pageNo: 1,
                pageSize: 10,
                total: 0,
                // 引用 ThePagination组件
                refPagination: {},
                paginationAttribute: {
                    handleChange: this.handleChange
                },
                //分页默认状态
                pageNumber: -1,
                page: {
                    // 当前页数
                    pageNo: 1,
                    // 每页默认显示条数
                    pageSize: 10,
                    // 总条数
                    total: 0
                },
                multipleSelection: [], //选择
                getVesselList: [], //共舱列表
                getVesseTitle: [], //共舱标题
            };
        },
        methods: {
            //页面初始化
            searchGetList(reload){
                this.isLoading = true;
                this.$refs.table.clearSort()
                if(reload == 'reload'){
                    this.ruleForm.scac = '' //船公司四字码
                    this.ruleForm.carrier = '全部' //船公司四字码
                    this.ruleForm.pol = 'SHANGHAI' //起始港
                    this.ruleForm.polCode = 'CNSHA' //起始港五字码
                    this.ruleForm.pod = '' //目的港
                    this.ruleForm.podCode = '' //目的港五字码
                    this.ruleForm.dataNotAvailable = '' //路径状态0常用，1加班
                    this.ruleForm.groupUpdateTimeStart = ''  //更新时间（开始）
                    this.ruleForm.groupUpdateTimeEnd = ''  //更新时间（结束）
                }
                if(this.ruleForm.groupUpdateTimeStart == '' || this.ruleForm.groupUpdateTimeStart == null) {
                    this.ruleForm.groupUpdateTimeStart = ''
                }
                if(this.ruleForm.groupUpdateTimeEnd == '' || this.ruleForm.groupUpdateTimeEnd == null) {
                    this.ruleForm.groupUpdateTimeEnd = ''
                }
                this.$axios.get(this.commonJs.localUrl +`/schedules/scacPort/getPortComposeList?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&scac=${this.ruleForm.scac
                }&polCode=${this.ruleForm.polCode
                }&podCode=${this.ruleForm.podCode
                }&dataNotAvailable=${this.ruleForm.dataNotAvailable
                }&groupUpdateTimeStart=${this.ruleForm.groupUpdateTimeStart ? (this.ruleForm.groupUpdateTimeStart + ' 00:00:00') : ''
                }&groupUpdateTimeEnd=${this.ruleForm.groupUpdateTimeEnd ? (this.ruleForm.groupUpdateTimeEnd + ' 00:00:00') : ''
                }`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        if(res.data.content !== ''){
                            if(res.data.content.length <= 0){
                                this.tableData=[];
                                if(this.$refs.refPagination){
                                    this.$refs.refPagination.page.total = res.data.total;
                                    this.$refs.refPagination.changeValue()                            
                                }           
                            }else{
                                if (res.data.status == 1) {
                                    this.tableData=[];
                                    this.tableData = res.data.content;
                                    if(this.$refs.refPagination){
                                        this.$refs.refPagination.page.total = res.data.total;
                                        this.$refs.refPagination.changeValue()
                                    }           
                                };
                                if(this.$refs.refPagination){
                                    if(Math.ceil(this.$refs.refPagination.page.total / this.page.pageSize) < this.page.pageNo){
                                        this.$refs.refPagination.handleCurrentChange(1);
                                    };
                                };
                            }
                        }
                        if(reload == 'upda'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '状态修改成功'});
                        }else if(reload == 'delect'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '删除成功'});
                        }else if(reload == 'pingbi'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '屏蔽成功'});
                        }
                        this.isLoading = false;
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                        // this.isLoading = false;
                    }
                })
            },
            //搜索
            serchBtn() {
                this.ruleForm.isGc = 0
                this.$refs.refPagination.handleCurrentChange(1);
                // this.searchGetList();
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //给分页传的属性
            handleChange(params) {
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchGetList();
                this.pageNumber = -1;
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.searchGetList(data);
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
                        if(value == ''){
                            this.companyNameList.unshift({
                                companyName:"全部"
                            })
                        }
                    }
                })
            },
            //船公司Focus事件
            companyNameFocus(){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCompany`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.companyNameList = res.data.content; 
                        this.companyNameList.unshift({
                            companyName:"全部"
                        })
                    }
                })
            },
            //船公司change事件
            companyNameChange(value){
                if(value === '' || value === '全部'){
                    this.ruleForm.scac = ''
                }else{
                    for (let i = 0; i < this.companyNameList.length; i++) {
                        if(this.companyNameList[i].companyName === value){
                            this.ruleForm.scac = this.companyNameList[i].scac
                        }
                    }
                }    
            },
            //起运港 搜索
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
            //起运港 foucs
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
            //起运港 change
            portStartChange(val) {
                if(val){
                    for (let i = 0; i < this.portStartList.length; i++) {
                        if(this.portStartList[i].portEn == val){
                            this.ruleForm.polCode = this.portStartList[i].portCode
                        }
                        
                    }
                }else{
                    this.ruleForm.polCode = ''
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
            portEndChange(val) {
                if(val){
                    for (let i = 0; i < this.portEndList.length; i++) {
                        if(this.portEndList[i].id == val){
                            this.ruleForm.podCode = this.portEndList[i].portCode
                        }
                    }
                }else{
                    this.ruleForm.podCode = ''
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
                            routeCode: '航线代码',
                            carrier: '船公司',
                            vessel: '船名',
                        }]
                    }
                }
            },
            //换取etd的周数
            getEtdWeek(data){
                let weekList = {
                    '-': -2,
                    '': -1,
                    'MON' : 1,
                    'TUE' : 2,
                    'WED' : 3,
                    'THU' : 4,
                    'FRI' : 5,
                    'SAT' : 6,
                    'SUN' : 7,
                }
                if(weekList[data]){
                    return weekList[data]
                }else{
                    console.log(data)
                    return data
                };
            },
        },
        components: {
            ThePagination,
            loading,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                if(this.isRouterPage){
                    this.$refs.table.clearSort()
                    this.searchGetList('reload');
                    this.$refs.refPagination.changeValue()
                }
            });
            this.$bus.on('chaneCrawlTab',(content) => {
                this.isRouterPage = true
                this.isLoading = true
                setTimeout(() => {
                    this.ruleForm.carrier = content.carrier, //船公司
                    this.ruleForm.scac = content.scac //船公司四字码
                    this.ruleForm.pol = 'SHANGHAI' //起始港
                    this.ruleForm.polCode = 'CNSHA' //起始港五字码
                    this.ruleForm.pod = '' //目的港
                    this.ruleForm.podCode = '' //目的港五字码
                    this.ruleForm.dataNotAvailable = '' //路径状态0常用，1加班
                    this.ruleForm.groupUpdateTimeStart = ''  //更新时间（开始）
                    this.ruleForm.groupUpdateTimeEnd = ''  //更新时间（结束）
                    this.searchGetList();
                },500)
            })
        },
        destroyed(){
            this.$bus.off('clickMenu');
            this.$bus.off('chaneCrawlTab');
        },
    };
</script>

<style lang="scss" scoped>
    /deep/.el-row .el-col:nth-last-of-type(1) {
        margin-right: 0;
    }
    /deep/ .el-col {
        margin-right: 20px;
    }
    /deep/.el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/.el-table th{
        height: 30px;
        padding: 0;
     }
    /deep/ .refPagination input {
        width: 100px !important;
    }
    /deep/ .pagination {
        float: right !important;
        padding-top: 10px;
    }
    /deep/ .el-table .warning-row {
        background: rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover {
        background: rgba(241, 245, 247, 1);
    }
    /deep/.el-table .cell{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .tablePage /deep/.el-icon-arrow-down::before{
        color: red;
        display: none;
        margin-left:-10px;
        height: 0;
    }
    /deep/.el-table__column-filter-trigger{
        width: 0px;
        height: 0px;
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
    .dialogAddVisible{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
            // overflow-y: auto;
        }
    }
    .contentLeft {
        float: left;
        // position: absolute;
        // left: 20px;
        width: 90%;
    }
    .contenRight {
        // float: right;
        position: absolute;
        right: 20px;
        bottom: 5px;
        // width: 10%;
    }
    .serachBtn {
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .portContent {
        position: relative;
        overflow: hidden;
        // padding: 20px 20px 20px 20px;
        .serachBack {
            background-color: #fff;
            padding: 0px 20px 0px 20px;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 20px 20px;
            border-top: 10px solid #f5f6f8;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
        }
    }
    .buttonTop {
        margin-bottom: 20px;
        .clickColor {
            background-color: #fff;
            padding: 9px 27px;
            margin-right: 10px;
        }
        .normals {
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .abnormal {
            border: 1px solid #ff0000;
            color: #ff0000;
        }
        .export {
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .butn {
            margin-right: 0;
            background-color: #ff9000;
            color: #fff;
            padding: 9px 35px;
            float: right;
            margin-bottom: 20px;
        }
        .dataUpda{
            display: inline-block;
            margin-left: 40px;
            font-size: 14px;
            span{
                font-family:'Arial Negreta', 'Arial';
                font-weight:600;
                color:#FF0000;            
            }
        }
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
    /deep/.el-table__empty-text{
        width: 100%;
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
    .routeCode{
        // margin-left: 10px;
    }
    .isslotRed{
    }
    .tabUl{
        background: #fff;
        display: flex;
        padding-left: 20px;
        padding-right: 20px;
    }
    .tabLI{
        padding: 7px 35px;
        border: 1px solid #ccc;
        font-size: 12px;
        cursor: pointer;
        transition: all .2s;
    }
    .tabLI:first-child {
        border-radius: 5px 0 0 5px;
    }
    .tabLI:last-child {
        border-radius: 0 5px 5px 0;
    }
    li:not(:first-child) {
        border-left: 0;
    }
    .tabColor{
        color: #fff;
        background: #3bafda;
    }
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: 0;
        top: 1px;
    }
    .codeOverRoute{
        height: 23px;
        li{
            display: inline-block;
        }
        span{
            width: auto;
            height: 23px;
            overflow: hidden;
        }
    }
    .temport{
        color: red;
    }

</style>