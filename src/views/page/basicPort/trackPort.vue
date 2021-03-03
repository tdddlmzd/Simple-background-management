<template>
    <div class="basicPortContent" ref="basicPortContent">
        <Loading v-show="isLoading" ref="loading" class="loading"></Loading>
        <el-form
            label-position="right"
            label-width="90px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="searhContent">
                <el-form-item
                    prop="searchStr"
                    class="searchStrb"
                    style="display:inline-block;width:200px;margin-bottom:10px;"
                >
                    <el-input v-model="ruleForm.searchStr" placeholder="请输入搜索内容" @input="handleInputClick"></el-input>
                </el-form-item>
                <span class="source">数据来源：跟踪数据所涉及港口发生地</span>
                <el-checkbox v-model="ruleForm.isNotMatch" @change="checkChange">未匹配</el-checkbox>
            </div>
            <div class="tablePage">
                <el-table 
                    :data="tableData" 
                    style="width: 100%" 
                    :header-cell-style="{backgroundColor:'rgba(59, 175, 218, 1)' ,color:'white',fontSize:'12px'}"
                    :row-class-name="tabRowClassName"
                    ref="multipleTables"
                    tooltip-effect="dark"
                >
                    <el-table-column prop="id" align="left" label="序号" width="50px">
                        <template slot-scope="scope">
                            {{scope.$index +1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="place" label="发生地" align="left" :show-overflow-tooltip=true min-width="200" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="scac" label="船公司" align="left" :show-overflow-tooltip=true min-width="80" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="baseCode" label="标准五字码" align="left" :show-overflow-tooltip=true min-width="130" :sortable="sortableState" :filters="[]">
                        <template slot-scope="scope">
                            <div class="sel-el">
                                <el-select 
                                    v-model="scope.row.baseCode" 
                                    style="width:100%"  
                                    placeholder="请输入并选择"
                                    filterable
                                    clearable
                                    remote
                                    :remote-method="remoteportCode"
                                    @focus="portCodeFocus"
                                    @change="changeBase($event,scope.row)"
                                >
                                    <el-option
                                        v-for="item in portList"
                                        :key="item.id"
                                        :label="item.code"
                                        :value="item.code"
                                    >
                                    <template>
                                        {{item.portCode}}
                                    </template>
                                    </el-option>
                                </el-select>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baseTerminalCn" label="标准码头" align="left" :show-overflow-tooltip=true min-width="120" :sortable="sortableState" :filters="[]">
                        <template slot-scope="scope">
                            <div class="sel-el">
                                <el-select 
                                    v-model="scope.row.baseTerminalCn" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                    @focus="focusBaseTer(scope.row.baseCode)"
                                    @change="changeBaseTer($event,scope.row)"
                                >
                                    <el-option
                                        v-for="item in terminalList"
                                        :key="item.id"
                                        :label="item.terminalCn"
                                        :value="item.terminalCn"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                        <template slot-scope="scope">
                            {{scope.row.updateUser ? scope.row.updateUser.toUpperCase() : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip=true width="142" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip=true width="142" :sortable="sortableState" :filters="[]">
                        
                    </el-table-column>
                    <template slot="empty">
                        <noData></noData>
                    </template>
                </el-table>
            </div>
        </el-form>
        <!--分页-->
        <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination" v-if="isTrackShow"></ThePagination>
    </div>
</template>

<script>
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import Loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                isLoading : true,
                sortableState: true,
                isTrackShow: false,
                ruleForm : {
                    searchStr: '',
                    isNotMatch: true,
                },
                tableData : [],
                terminalList: [], //标准码头
                portList: [], //五字码
                // 引用 ThePagination组件
                refPagination: {},
                // 为 ThePagination组件 属性赋值
                paginationAttribute: {
                    handleChange: this.handleChange
                },
                //分页的默认状态
                pageNumber : -1,
                page: {
                    // 当前页数
                    pageNo: 1,
                    // 每页默认显示条数
                    pageSize: 10,
                    // 总条数
                    total: 0
                },
            }
        },
        methods : {
            //输入查询列表
            handleInputClick(value){
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1
                    this.pageNumber = 1
                };
                setTimeout(() => {
                    this.isLoading = true;
                    this.$refs.multipleTables.clearSort()
                    this.$axios.get(this.commonJs.localUrl + `/schedules/trackAllPort/list?isNotMatch=${this.ruleForm.isNotMatch ? '1' : ''
                    }&pageNumber=${this.page.pageNo
                    }&pageSize=${this.page.pageSize
                    }&searchStr=${value
                    }`,{
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            this.tableData = res.data.content
                            for (let i = 0; i < this.tableData.length; i++) {
                                if(this.tableData[i].baseCode){
                                    this.tableData[i].baseCode = this.tableData[i].baseCode.toUpperCase()
                                }
                            }
                            if(this.$refs.refPagination){
                                this.$refs.refPagination.page.total = res.data.total;
                                this.$refs.refPagination.changeValue()
                            }
                            this.isLoading = false
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            })
                        }
                    })
                },1000)
            },
            //查询列表
            trackSearch(newOrAdd){
                this.isLoading = true;
                this.$refs.multipleTables.clearSort()
                if(newOrAdd){
                    if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                        this.page.pageNo = 1
                        this.pageNumber = 1
                    };
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/trackAllPort/list?isNotMatch=${this.ruleForm.isNotMatch ? '1' : ''
                }&pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&searchStr=${this.ruleForm.searchStr
                }`,{
                    headers : {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token"),
                    }
                }).then(res => {
                    if(res.data.status == 1){
                        this.tableData = res.data.content
                        if(this.$refs.refPagination){
                            this.$refs.refPagination.page.total = res.data.total;
                            this.$refs.refPagination.changeValue()
                        }
                        this.isLoading = false
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        })
                    }
                })
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true
                this.page.pageSize = params.pageSize
                this.page.pageNo = params.pageNo
                this.trackSearch()
                this.pageNumber = -1
            },
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.dialogAddVisible = false;
                    this.trackSearch(data);
                }
            },
            //五子码 远程查询
            remoteportCode(value) {
                this.$axios.get(this.commonJs.localUrl + `/schedules/terminal/queryBaseCode?baseCode=${value}`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res =>{
                    if(res.data.status == 1){
                        this.portList = res.data.content
                    }
                })
            },
            //五子码  focus
            portCodeFocus() {
                this.$axios.get(this.commonJs.localUrl + `/schedules/terminal/queryBaseCode`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res =>{
                    if(res.data.status == 1){
                        this.portList = res.data.content
                    }
                })
            },
            //改变标准五字码
            changeBase(event,item){
                //取当前时间
                var nowTime = this.commonJs.getDateTime('YY-mm-dd HH:MM:SS', new Date())
                item.updateTime = nowTime
                //取当前登录人
                item.updateUser = this.getCookie('userName')
                if(event){ //如果输入标准五字码有值
                    this.terminalList = []
                    this.$axios.get(this.commonJs.localUrl + `/schedules/port/getTerminaByPortCd?portcd=${event}`,{
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }).then(res => {
                        this.terminalList = res.data.content
                        if(res.data.content.length > 0){
                            item.baseCode = event
                            item.baseTerminalCn = res.data.content[0].terminalCn
                            item.baseTerminal = res.data.content[0].terminal
                            item.baseTerminalId = res.data.content[0].id
                        }else{
                            item.baseTerminalCn = ""
                            item.baseTerminal = ''
                            item.baseTerminalId = ''
                        }
                        this.saveList(item)
                    })
                }else{
                    item.baseCode = ''
                    item.baseTerminalCn = ""
                    item.baseTerminal = ''
                    item.baseTerminalId = ''
                    for (let i = 0; i < this.tableData.length; i++) {
                        if(this.tableData[i].id == item.id){

                        }
                    }
                    this.saveList(item)
                }
            },
            //获取标准码头
            focusBaseTer(baseCode){
                this.terminalList = []
                this.$axios.get(this.commonJs.localUrl + `/schedules/port/getTerminaByPortCd?portcd=${baseCode}`,{
                    headers : {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token"),
                    }
                }).then(res => {
                    this.terminalList = res.data.content
                })
            },
            //改变标准码头
            changeBaseTer(event,item){
                //取当前时间
                var nowTime = this.commonJs.getDateTime('YY-mm-dd HH:MM:SS', new Date())
                item.updateTime = nowTime
                //取当前登录人
                item.updateUser = this.getCookie('userName')
                if(event){ //如果输入标准五字码有值
                    console.log(event,'event')
                    for (let i = 0; i < this.terminalList.length; i++) {
                        if(event == this.terminalList[i].terminalCn){
                            item.baseTerminalCn = this.terminalList[i].terminalCn
                            item.baseTerminal = this.terminalList[i].terminal
                            item.baseTerminalId = this.terminalList[i].id
                            this.saveList(item)
                        }
                    }
                }else{
                    item.baseTerminal = ''
                    item.baseTerminalId = ''
                    this.saveList(item)
                }
            },
            //保存数据
            saveList(item){
                var saveObj = {
                    id: item.id,
                    baseCode: item.baseCode,
                    baseTerminalId: item.baseTerminalId ? item.baseTerminalId : null
                }
                this.$axios.post(this.commonJs.localUrl + `/schedules/trackAllPort/update`,
                    saveObj,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res =>{
                    if(res.data.status == 1){
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "保存失败"
                        })
                        this.isLoading = false
                    }
                })
            },
            //是否匹配
            checkChange(){
                this.$refs.refPagination.handleCurrentChange(1)
            },
        },
        components : {
            ThePagination,
            Loading,
            noData
        },
        mounted(){
            this.$bus.on('clickMenu', content => {
                this.isLoading = true
                this.$refs.multipleTables.clearSort()
                this.ruleForm.searchStr = ''
                this.ruleForm.isNotMatch = true
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1
                    this.pageNumber = 1
                };
                this.trackSearch()
            })
        },
        destroyed(){
            this.$bus.off('clickMenu')
        },
    }
</script>

<style lang="scss" scoped>
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
    .basicPortContent{
        position: relative;
        overflow: hidden;
    }
    /deep/.el-form-item__content{
        margin: 0 !important;
    }
    /deep/.el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/.el-table th{
        height: 30px;
        padding: 0;
     }
    /deep/.el-table .warning-row{
        background:rgba(241, 245, 247, 1) !important;
    }
    /deep/.el-table .warning-row:hover{
        background:rgba(241, 245, 247, 1);
    }
    /deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
        // background-color:transparent;
        // background-color:#3bb0da50;
        // cursor: pointer;
    }
    /deep/ .refPagination input{
        width: 100px!important;
    }
    .refPagination{
        width: 100%;
        background-color: #fff ;
    }
    /deep/.el-table__empty-text{
        width: 100%;
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
    .source{
        color: red;
        margin-left: 20px;
        margin-right: 20px;
    }
    // /deep/ .el-checkbox{
    //     margin-top: 5px;
    // }
</style>