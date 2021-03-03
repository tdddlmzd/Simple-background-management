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
                        <el-col style="width:22%"> 
                            <el-form-item label="共舱组名称">
                                <el-input class="inputWidth" v-model="ruleForm.cabinName" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="标准化航线">
                                <el-input class="inputWidth" v-model="ruleForm.parentRoute" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="船公司">
                                <el-select 
                                    remote  
                                    clearable 
                                    filterable  
                                    v-model="ruleForm.companyName" 
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
                        <el-col style="width:22%"> 
                            <el-form-item label="航线代码">
                                <el-input class="inputWidth" v-model="ruleForm.routeCode" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> 
                    <el-row>
                        <el-col style="width:22%" >
                            <el-form-item label="更新时间" class="searchTime">
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
                        <el-col style="width:22%">
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
                <!-- <el-button size="small" class="clickColor normals" @click="commonused">常用</el-button> -->
                <!-- <el-button size="small" class="clickColor abnormal" @click="workover">临时</el-button> -->
                <!-- <p class="dataUpda"><span>提示：红色表示临时共舱</span></p> -->
                <el-button size="small" class="clickColor addZhun lr" @click="addClick">新增</el-button>
                <el-button size="small" class="clickColor abnormal delec lr" @click='delectRoute'>删除</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
                @row-dblclick="handleCurrentChange"
                @selection-change="selectionChange"
                :header-cell-class-name="headerStyle"
            >
                <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column>
                <el-table-column prop="cabinName" label="共舱组名称" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="120">
                    <template slot-scope="scope" class="identImage">
                        <img src="@/assets/images/route/ident.png" class="newIdent" ref="ident" v-if="scope.row.isNew == 1">
                        <img src="@/assets/images/route/loading.gif" class="flagLoad" ref="ident" v-if="scope.row.flag == '1'">
                        <span style='padding-left:10px'>
                            {{scope.row.cabinName}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="pinyinRoute" label="标准化航线" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="120">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.parentRoute}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="totalCode" label="共舱航线CODE" align="left" :sortable="sortableState" :filters="[]" min-width="200">
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">
                                <span>{{scope.row.commonCabin}}</span>
                                <span v-if="(scope.row.commonCabin && scope.row.ovtCabin)">/</span>
                                <span class="temport">{{scope.row.ovtCabin}}</span>
                            </div>
                            <ul class="codeOverRoute">
                                <span>{{scope.row.commonCabin}}</span>
                                <span v-if="(scope.row.commonCabin && scope.row.ovtCabin)">/</span>
                                <span class="temport">{{scope.row.ovtCabin}}</span>
                            </ul>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="commonCabinCount" label="常规共舱" align="left" :sortable="sortableState" :filters="[]" width="100">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.commonCabin">
                            <div slot="content">
                                {{scope.row.commonCabin}}
                            </div>
                            <span style="cursor: pointer;">{{scope.row.commonCabinCount}}</span>
                        </el-tooltip>
                        <span v-else style="cursor: pointer;"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="ovtCabinCount" label="临时共舱" align="left" :sortable="sortableState" :filters="[]" width="100">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.ovtCabin">
                            <div slot="content">
                                {{scope.row.ovtCabin}}
                            </div>
                            <span style="cursor: pointer;">{{scope.row.ovtCabinCount}}</span>
                        </el-tooltip>
                        <span v-else style="cursor: pointer;"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="100">
                
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="142">
                
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="142">
                
                </el-table-column>
                <el-table-column prop="operateTime" label="操作时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" width="142">
                
                </el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
            <!--分页-->
            <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination" v-if="isRouteCrew"></ThePagination>
        </div>
        <el-dialog
            class="dialogAddVisible"
            :visible.sync="dialogAddVisible"
            v-if="dialogAddVisible"
            ref="dialogAddVisible"
            width="980px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <addTemport
                :innerStatus="innerStatus"
                :rowId="rowId"
                :isNewListFlag="isNewListFlag"
                @innerClose="innerClose"
                @innerUpdat="innerUpdat"
                ref="cityManageAdd"
            >
            </addTemport>
        </el-dialog>
    </div>
</template>

<script>
    import addTemport from "./addTemport.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "",
                isLoading: true,
                sortableState: true,
                dialogAddVisible: false,
                innerStatus: "",
                rowId: '',
                isNewListFlag:'',
                ruleForm: {
                    cabinName: '',//共舱组名称
                    parentRoute: '', //大航线
                    scac: '', //船公司四字码
                    companyName: '全部', //船公司
                    routeCode: '', //共舱航线代码
                    startTime: '',  //更新时间（开始）
                    endTime: '',  //更新时间（结束）
                },
                tableData: [],
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
                selection: [],
                companyNameList: [], //船公司
                isRouteCrew: true,  //Pagination 分页
            };
        },
        methods: {
            //搜索 (页面初始化)
            handleClick(newOrAdd){
                this.isLoading = true
                this.$refs.table.clearSort()
                if(newOrAdd == 'reload'){
                    this.ruleForm.cabinName = '' //共舱组名称
                    this.ruleForm.parentRoute = '' //大航线
                    this.ruleForm.scac = '' //船公司四字码
                    this.ruleForm.companyName = '全部' //船公司
                    this.ruleForm.routeCode = '' //共舱航线代码
                    this.ruleForm.startTime = ''  //更新时间（开始）
                    this.ruleForm.endTime = ''  //更新时间（结束）
                }
                if(this.ruleForm.startTime == '' || this.ruleForm.startTime == null) {
                    this.ruleForm.startTime = ''
                }
                if(this.ruleForm.endTime == '' || this.ruleForm.endTime == null) {
                    this.ruleForm.endTime = ''
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/cabin/list?cabinName=${this.ruleForm.cabinName
                    }&parentRoute=${this.ruleForm.parentRoute
                    }&scac=${this.ruleForm.scac
                    }&routeCode=${this.ruleForm.routeCode
                    }&startTime=${this.ruleForm.startTime
                    }&endTime=${this.ruleForm.endTime
                    }&pageNumber=${this.page.pageNo
                    }&pageSize=${this.page.pageSize
                    }`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
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
                                        for (let i = 0; i < this.tableData.length; i++) {
                                            var code = this.tableData[i]
                                            code.pinyinRoute = this.commonJs.getPinYin(code.parentRoute)
                                            var totalCode = ''
                                            if(code.commonCabin){ //如果有常规共舱 commonCabin
                                                //则有标准航线
                                                totalCode = code.commonCabin
                                                if(code.ovtCabin){ //并且有 临时共舱ovtCabin
                                                    totalCode = totalCode + '/' + code.ovtCabin
                                                }
                                            }else{ //没有常规共舱
                                                // 则 必无标准航线
                                                code.parentRoute = ''
                                                code.pinyinRoute = ''
                                                if(code.ovtCabin){ //有临时共舱
                                                    totalCode = code.ovtCabin
                                                }
                                            }
                                            code.totalCode = totalCode
                                        }
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
                            if(newOrAdd == 'upda'){
                                this.isLoadings = false
                                this.$message({ type:"success", message: '状态修改成功'});
                            }else if(newOrAdd == 'delect'){
                                this.isLoadings = false
                                this.$message({ type:"success", message: '删除成功'});
                            }
                            this.isLoading = false
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            // this.isLoading = false;
                        }
                    });
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
                let companyName = this.ruleForm.companyName;
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
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.handleClick();
                this.pageNumber = -1;
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.dialogAddVisible = false;
                    this.handleClick(data);
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
            //单独给第一列添加样式
            headerStyle({row, column, rowIndex, columnIndex}) {
                if(columnIndex == 1) {
                    return 'columnPadding'
                }
            },
            //全选
            selectionChange(val) {
                this.selection = val
            },
            //常用
            commonused(){
                var val = this.selection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_comused, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        state: 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/path/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchGetList("upda");
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //临时
            workover(){
                var val = this.selection
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm("<div class='tesDiv'><div>是否将状态变为临时？</div></div>", "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        state: 1,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/path/updateState`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchGetList("upda");
                        }else{
                            that.$message({ type:"error", message: '状态修改失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //新增
            addClick() {
                this.dialogAddVisible = true;
                this.innerStatus = "新增";
            },
            //删除
            delectRoute(){
                var val = this.selection
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
                    this.isLoading = true
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                        delFlag: 1
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/cabin/delete`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.handleClick("delect");
                        }else{
                            that.$message({ type:"error", message: '删除失败'});
                            this.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //关闭事件
            innerClose() {
                // this.isLoading = true
                this.dialogAddVisible = false;
            },
            //更新事件
            innerUpdat(){
                this.handleClick()
            },
            //双击列表行
            handleCurrentChange(row) {
                this.dialogAddVisible = true;
                this.innerStatus = "修改";
                this.rowId = row.id
                this.isNewListFlag = row.isNew
            },
            //搜索
            serchBtn() {
                this.$refs.refPagination.handleCurrentChange(1);
                // this.handleClick();
            },
            shouHandle(){
                this.isLoading = false
                if(this.$refs.refPagination){
                    this.$refs.refPagination.page.total = 0
                    this.$refs.refPagination.changeValue()
                }           
            }
        },
        components: {
            ThePagination,
            Breadcrumb,
            loading,
            addTemport,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.isLoading = true
            this.shouHandle()
            // this.handleClick();
            this.$bus.on('clickMenu', content => {
                this.$refs.table.clearSort()

                this.ruleForm.cabinName = '' //共舱组名称
                this.ruleForm.parentRoute = '' //大航线
                this.ruleForm.scac = '' //船公司四字码
                this.ruleForm.companyName = '全部' //船公司
                this.ruleForm.routeCode = '' //共舱航线代码
                this.ruleForm.startTime = ''  //更新时间（开始）
                this.ruleForm.endTime = ''  //更新时间（结束）

                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.handleClick()
            });
        },
        destroyed(){
            this.$bus.off('clickMenu');
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
    /deep/th.columnPadding{
        padding-left: 10px !important;
    }
    .contentLeft{
        float: left;
        width: 90%;
    }
    .contenRight {
        position: absolute;
        right: 20px;
        bottom: 5px;
    }
    .serachBtn {
        padding: 9px 35px;
        color: #fff;
        background-color: rgba(4, 153, 255, 1);
        margin-bottom: 10px;
        border: 1px solid #3bafda;
    }
    .lr {
        float: right;
    }
    .buttonTop {
        .clickColor {
            background-color: #fff;
            padding: 9px 27px;
            margin-right: 10px;
            margin-bottom: 10px
        }
        .normals {
            border: 1px solid #3bafda;
            color: #3bafda;
        }
        .abnormal {
            border: 1px solid #ff0000;
            color: #ff0000;
        }
        .addZhun {
            background-color: #ff9000;
            border: 1px solid #ff9000;
            color: #fff;
            padding: 9px 35px;
            margin-right: 0px;
        }
        .delec{
            padding: 9px 35px;
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
    .portContent {
        position: relative;
        overflow: hidden;
        .serachBack {
            background-color: #fff;
            margin-bottom: 10px;
            position: relative;
            padding: 0px 20px 0px 20px;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 20px 20px;
            border-top: 10px solid #f5f6f8;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
            // float: right !important;
        }
    }
    .codeRoute{
        height: 23px;
        display: flex;
        align-items: center;
        // padding-left: 5px;
        // padding-right: 5px;
        // background: black;
        // color: #fff;
    }
    // .codeRouteLi{
    //     height: 23px;
    //     display: flex;
    //     align-items: center;
    //     span{
    //         height: 23px;
    //     }
    // }
    .temport{
        color: red;
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
    .newIdent{
        position: absolute;
        width: 32px;
        height: 12px;
        left: 0;
        top: 1px;
    }
    .flagLoad{
        position: absolute;
        width: 16px;
        height: 16px;
        left: 0;
        top: 13px;    
    }

</style>