<template>
    <div class="basicPortContent" ref="basicPortContent">
        <breadcrumb :matched="matched"></breadcrumb>
        <loading v-show="isLoadings"></loading>
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="80px"
            > 
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%"> 
                            <el-form-item label="用户名">
                                <el-input v-model="ruleForm.userName" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>  
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="手机号">
                                <el-input v-model="ruleForm.userMobile" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="公司">
                                <el-input v-model="ruleForm.companyName" clearable style="width:100%" placeholder="请输入" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="类型">
                                <el-select 
                                    v-model="ruleForm.dateType" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
                                >
                                <el-option
                                    v-for="item in dateTypeList"
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
                        <el-col style="width:22%" >
                            <el-form-item label="查询时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.startDate"
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
                                    v-model="ruleForm.endDate"
                                    style="width:100%"   
                                    type="date" 
                                    value-format="yyyy-MM-dd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>  
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="操作时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.uStartDate"
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
                                    v-model="ruleForm.uEndDate"
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
                        <el-col style="width:22%"> 
                            <el-form-item label="起始地">
                                <el-select 
                                    v-model="ruleForm.pol" 
                                    remote  
                                    clearable 
                                    filterable  
                                    :remote-method="polRemote" 
                                    @focus="polFocus"
                                    @change="polChange" 
                                    style="width:100%"
                                    placeholder="请输入并选择"
                                >
                                    <el-option
                                        v-for="item in polList"
                                        :key="item.id "
                                        :label="item.cityEn"
                                        :value="item.id"
                                    >
                                        <span style="float: left">{{item.cityEn+"("+ item.cityCn+")" }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col style="width:22%" > 
                            <el-form-item label="目的地">
                                <el-select 
                                    v-model="ruleForm.pod" 
                                    remote
                                    clearable 
                                    filterable 
                                    :remote-method="podRemote" 
                                    @focus="podFocus"
                                    @change="podChange" 
                                    style="width:100%"
                                    placeholder="请输入并选择"
                                >
                                    <el-option
                                        v-for="item in podList"
                                        :key="item.id"
                                        :label="item.cityEn"
                                        :value="item.id"
                                    >
                                        <span style="float: left">{{item.cityEn+"("+ item.cityCn+")" }}</span>
                                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"  > 
                            <el-form-item label="查询结果">
                                <el-select 
                                    v-model="ruleForm.isHaveData" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                <el-option
                                    v-for="item in havaDateList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <!-- <el-col style="width:22%" >
                            <el-form-item label="状态">
                                <el-select 
                                    v-model="ruleForm.isError" 
                                    style="width:100%"   
                                    clearable 
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in isErrorList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>  
                        </el-col> -->
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
              <!-- <el-button size="small" class="clickColor normals" @click="handleNormalClick">设为正常</el-button> -->
              <!-- <el-button size="small" class="clickColor abnormal" @click="handleAbnormalClick">设为异常</el-button> -->
              <el-button size="small" class="teshunormal" @click="handleExportClick">导出</el-button>
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
            <el-table-column
                type="selection"
                width="45"
            >
            </el-table-column>
            <el-table-column  prop="userName" label="用户名"  :show-overflow-tooltip=true align="left" min-width="100"> </el-table-column>
            <el-table-column  prop="userMobile" label="手机号"  :show-overflow-tooltip=true align="left" min-width="100"> </el-table-column>
            <el-table-column  prop="companyName"  label="公司"  :show-overflow-tooltip=true align="left" min-width="70"> </el-table-column>
            <el-table-column  prop="pol" label="起始地"   :show-overflow-tooltip=true align="left" min-width="100"></el-table-column>
            <el-table-column  prop="pod" label="目的地"   :show-overflow-tooltip=true align="left" min-width="100"></el-table-column>
            <!-- <el-table-column type="expand" width="1px" align="left">
                <template slot-scope="props">
                    <div v-if="props.row.dataList!=''">
                        <el-table  :data="props.row.dataList">
                            <el-table-column label="序号"  type="index">
                            </el-table-column>
                            <el-table-column label="起始港"  :show-overflow-tooltip=true  prop="startPort">
                            </el-table-column>
                            <el-table-column label="起始港五字码"  :show-overflow-tooltip=true  prop="startPortCode">
                            </el-table-column>
                            <el-table-column label="目的港" :show-overflow-tooltip=true   prop="endPort">
                            </el-table-column>
                            <el-table-column label="目的港五字码" :show-overflow-tooltip=true   prop="endPortCode">
                            </el-table-column>
                            <el-table-column label="更新时间"  :show-overflow-tooltip=true prop="updateTime" :formatter="formatDate">
                            </el-table-column>          
                        </el-table>
                    </div>
                    <div v-else >
                      <span >暂无港口组合</span>
                    </div>  
                </template> 
            </el-table-column> -->
            <el-table-column  prop="searchDate" label="日期"  :show-overflow-tooltip=true align="left" min-width="90"></el-table-column>
            <el-table-column  prop="dateType" label="类型"  align="left" min-width="50"> 
                <template slot-scope="scope">
                    <span v-if="scope.row.dateType==1" >离港</span>
                    <span v-if="scope.row.dateType==2" >到港</span>
                </template>
            </el-table-column>
            <el-table-column  prop="haveData" label="查询结果" :show-overflow-tooltip=true align="left" min-width="80"> 
                <template slot-scope="scope">
                    <span v-if="scope.row.haveData==false"  size="mini" align="left">无数据</span>
                    <span v-if="scope.row.haveData==true"  size="mini" align="left">有数据</span>
                </template>
            </el-table-column>                                                                      
            <!-- <el-table-column
                prop="error"
                align="left"
                label="状态"
                width="50">
                    <template slot-scope="scope"
                > -->
                    <!-- 如需按钮状态解封 -->
                    <!-- <button v-if="scope.row.error==true" class="exception" size="mini" @click="handleStatus(scope.row)">异常</button>
                    <button v-if="scope.row.error==false" class="normal"  size="mini">正常</button> -->
                    <!-- <span v-if="scope.row.error==true" class="exceptions">异常</span>
                    <span v-if="scope.row.error==false" class="normals">正常</span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column  prop="address"    label="操作" min-width="50">
                <template slot-scope="scope">   
                    <p  v-if="companyName == '全部'"  class='noClick' type="text" size="small" >查看</p>
                    <p  v-else  @click="handleClick(scope.row,scope.$index)" class="isClick"   type="text" size="small">查看</p>
                </template>
            </el-table-column> -->
            <el-table-column  prop="commitTime"  label="查询时间"  :formatter="formatDate" :show-overflow-tooltip=true align="left" min-width="140"></el-table-column>
            <el-table-column  prop="updateTime"  label="操作时间"  :formatter="formatDate"  :show-overflow-tooltip=true align="left" min-width="140"></el-table-column>
                <template slot="empty">
                    <noData></noData>
                </template>
          </el-table>
          <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>  
              <!--分页-->
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
                return {
                    isLoadings : true,
                    input:"",
                    companyName: '',
                    ruleForm:{
                        //起运地
                        pol:"",
                        //目的地
                        pod:"",
                        //日期
                        searchDate:"",
                        //类型
                        dateType:"",
                        //船公司
                        companyName:"",
                        //用户名
                        userName: "",
                        //用户手机号
                        userMobile:"",
                        //查询结果
                        isHaveData:"",
                        //查询时间
                        commitTime:"",
                        //解决时间
                        updateTime:"",
                        //状态
                        isError:"",
                        //结束时间
                        endDate:"",
                        //开始时间
                        startDate:"",
                        //操作时间开始
                        uStartDate: "",
                        //操作时间结束
                        uEndDate: "",
                    },
                    exportForm : {
                        //起运地
                        pol:"",
                        //目的地
                        pod:"",
                        //日期
                        searchDate:"",
                        //类型
                        dateType:"",
                        //船公司
                        companyName:"",
                        //用户名
                        userName: "",
                        //用户手机号
                        userMobile:"",
                        //查询结果
                        isHaveData:"",
                        //查询时间
                        commitTime:"",
                        //解决时间
                        updateTime:"",
                        //状态
                        isError:"",
                        //结束时间
                        endDate:"",
                        //开始时间
                        startDate:"",
                        //操作时间开始
                        uStartDate: "",
                        //操作时间结束
                        uEndDate: "",
                    },
                    tableData: [],
                    multipleSelection: [],
                    //查询结果集合
                    havaDateList: [
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: '0',
                            label: '有数据'
                        },
                        {
                            value: '1',
                            label: '无数据'
                        }
                    ],
                    //状态集合 0是 1否
                    isErrorList:[
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: 0,
                            label: '异常'
                        },
                        {
                            value: 1,
                            label: '正常'
                        }
                    ],
                    // 类型 1离港 2到港
                    dateTypeList:[
                        {
                            value:'',
                            label:'全部'
                        },
                        {
                            value: '1',
                            label: '离港'
                        },
                        {
                            value: '2',
                            label: '到港'
                        }
                    ],
                    polList:[],
                    podList:[],
                    AccessToken:"",
                    authorization:"",
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
            Breadcrumb,
            loading,
            noData
        },
        methods: {
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //正常
            handleNormalClick(){
                let val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为正常？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    let scroll = document.getElementById('elmain');
                    scroll.style.overflowY = "hidden"
                    this.isLoadings = true;
                    let temp = [];
                    for(var i = 0;i < val.length;i++){
                        temp.push(val[i].id);
                    };
                    let newStringList = temp.join(",");
                    let params = {
                        ids :  newStringList,
                        state : 1,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/behavior/updateRecordState`,
                        qs.stringify(params),
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        this.searchList('abnormal');
                    })
                }).catch(_ => {});
            },
            //异常
            handleAbnormalClick(){
                let val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为异常？</span> ", "提示", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    let scroll = document.getElementById('elmain');
                    scroll.style.overflowY = "hidden"
                    this.isLoadings = true;
                    let temp = [];
                    for(var i = 0;i < val.length;i++){
                        temp.push(val[i].id);
                    };
                    let newStringList = temp.join(",");
                    let params = {
                        ids :  newStringList,
                        state : 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/behavior/updateRecordState`,
                        qs.stringify(params),
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        this.searchList('abnormal');
                    })
                }).catch(_ => {});
            },
            //导出
            handleExportClick(){
                if(this.$refs.refPagination.page.total > 100000){
                    this.$message({
                        type: "error",
                        message: "单次导出不可大于10万条"
                    });
                    return
                }
                this.$axios({method: 'get',url: this.commonJs.localUrl +`/schedules/behavior/exportRecordExcel?total=${this.$refs.refPagination.page.total
                    }&companyName=${this.exportForm.companyName
                    }&dateType=${this.exportForm.dateType
                    }&endDate=${this.exportForm.endDate
                    }&isHaveData=${this.exportForm.isHaveData
                    }&isError=${this.exportForm.isError
                    }&podId=${this.exportForm.pod
                    }&polId=${this.exportForm.pol
                    }&startDate=${this.exportForm.startDate
                    }&userMobile=${this.exportForm.userMobile
                    }&userName=${this.exportForm.userName
                    }&uStartDate=${this.exportForm.uStartDate
                    }&uEndDate=${this.exportForm.uEndDate
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
            searchList(abnormal){
                this.isLoadings = true;
                this.matched = this.$route.matched
                // this.pageNumber = 1;
                if(this.ruleForm.startDate==null){
                    this.ruleForm.startDate ='';
                }
                if(this.ruleForm.endDate==null){
                    this.ruleForm.endDate ='';
                }
                if(this.ruleForm.uStartDate==null){
                    this.ruleForm.uStartDate ='';
                }
                if(this.ruleForm.uEndDate==null){
                    this.ruleForm.uEndDate ='';
                }
                this.companyName = this.ruleForm.companyName
                // this.authorization =  `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6IndlYkN1c3RvbWVyIiwib3JnYW5pemF0aW9uIjoxLCJpc3MiOiJTVU5GTE9XRVIiLCJleHAiOjE1Njk1NDk2MzgsInVzZXJOYW1lIjoid2ViQ3VzdG9tZXIiLCJ1c2VyUm9sZSI6IkRFVkVMT1AifQ.kfc6Kac9YHr3CEm77gJUKWKK0dHtErTS7Awc8zDNSS0`,
                // this.accessToken = `Jwt eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTVU5GTE9XRVIiLCJpZCI6MSwiZXhwIjoxNTY5NTUyNjQyLCJ1c2VyUm9sZSI6InN5c2FkbWluIn0.zPKsLjf5LVix6NGx1Vl29BdgRbxJdCSmoizhhayVCrU`,
                // this.AccessToken = this.getCookie('token');
                // this.authorization = `Bearer ${this.getAuthorization()}`;
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/getRecordList?pageNumber=${this.page.pageNo}&pageSize=${this.page.pageSize}&polId=${this.ruleForm.pol
                }&podId=${this.ruleForm.pod
                }&dateType=${this.ruleForm.dateType
                }&companyName=${this.ruleForm.companyName == '全部' ? '' : this.ruleForm.companyName
                }&userMobile=${this.ruleForm.userMobile
                }&userName=${this.ruleForm.userName
                }&isHaveData=${this.ruleForm.isHaveData
                }&isError=${this.ruleForm.isError
                }&startDate=${this.ruleForm.startDate
                }&endDate=${this.ruleForm.endDate
                }&uStartDate=${this.ruleForm.uStartDate
                }&uEndDate=${this.ruleForm.uEndDate
                }`,{
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
                                    this.$refs.refPagination.page.total = res.data.total;
                                    this.$refs.refPagination.changeValue()                            
                                };        
                            }else{
                                if (res.data.status == 1) {
                                    this.tableData=[];
                                    this.tableData = res.data.content;
                                    // this.$nextTick(()=>{
                                    //     // debugger
                                    //     this.$refs.basicPortContent.style.position = 'relative'
                                    // })
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
            handleClick(row,index){
                if(!this.tableData[index].dataList){
                    this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryP2p?podId=${row.podId}&polId=${row.polId}&scac=${row.companyName}`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.tableData[index].dataList = res.data.content;
                            let table = this.$refs.table;
                            table.toggleRowExpansion(row)
                        }
                    });
                }else{
                    let table = this.$refs.table;
                    table.toggleRowExpansion(row)
                }
            },
            handleStatus(row){
                this.$confirm("<div class = 'line'></div></br><span>是否将状态变为正常？</span> ", "提示", {
                    cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    let statusParams = {
                        id:row.id,
                        state :1
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/behavior/updateRecordState`,qs.stringify(statusParams),{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                        }).then(res => {
                        if (res.data.status == 1) {
                            this.$message({ showClose: true,type:"success", message: '状态修改成功'});
                            this.searchList();
                        }else{
                            this.$message({ showClose: true,type:"error", message: '状态修改失败'});
                            this.searchList();
                        }
                    });
                }).catch(() => {});
            },  
            //起运地搜索
            polRemote(value){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCity?pol=0&city=${value}`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                    }).then(res => {
                    if (res.data.status == 1) {
                        this.polList = res.data.content; 
                    }
                });
            },
            //起运地focus
            polFocus(){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCity?pol=0`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                    }).then(res => {
                    if (res.data.status == 1) {
                        this.polList = res.data.content; 
                        // this.ruleForm.pol = res.data.content[0].id;
                        // this.ruleForm.pol = "";
                    }
                });
            },
            //起运地change
            polChange(value){
                // if (value == "") {
                //   return;
                // }
                // let temp =  this.polList.find(item=>{
                //         return item.id==value 
                //   });
                //   this.ruleForm.pol = temp.cityCn;
            },
            //目的地搜索
            podRemote(value){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCity?pol=1&city=${value}`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                    }).then(res => {
                    if (res.data.status == 1) {
                        this.podList = res.data.content; 
                    }
                });
            },
            //目的地focus
            podFocus(value){
                this.$axios.get(this.commonJs.localUrl +`/schedules/behavior/queryCity?pol=1`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                    }).then(res => {  
                        if (res.data.status == 1) {
                            this.podList = res.data.content; 
                        }
                })
            },
            //目的地change
            podChange(){

            },
            serchBtn(){
                if(this.ruleForm.startDate === ''){
                    this.ruleForm.startDate = null;
                };
                if(this.ruleForm.endDate  === ''){
                    this.ruleForm.endDate = null;
                };
                if(this.ruleForm.startDate != null && this.ruleForm.endDate == null){
                    this.$message({
                        type : 'error',
                        message : '请输入查询时间的结束时间',
                    });
                    return;
                }else if(this.ruleForm.endDate != null && this.ruleForm.startDate == null){
                    this.$message({
                        type : 'error',
                        message : '请输入查询时间的开始时间',
                    });
                    return;
                }

                if(this.ruleForm.uStartDate === ''){
                    this.ruleForm.uStartDate = null;
                };
                if(this.ruleForm.uEndDate  === ''){
                    this.ruleForm.uEndDate = null;
                };
                if(this.ruleForm.uStartDate != null && this.ruleForm.uEndDate == null){
                    this.$message({
                        type : 'error',
                        message : '请输入操作时间的结束时间',
                    });
                    return;
                }else if(this.ruleForm.uEndDate != null && this.ruleForm.uStartDate == null){
                    this.$message({
                        type : 'error',
                        message : '请输入操作时间的开始时间',
                    });
                    return;
                }

                if (this.ruleForm.commitTime != "" && this.ruleForm.commitTime != null) {
                    this.ruleForm.startDate = this.ruleForm.commitTime[0];
                    this.ruleForm.endDate = this.ruleForm.commitTime[1];
                }
                this.exportForm = this.ruleForm;
                this.$refs.refPagination.handleCurrentChange(1);
                // this.searchList();
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
            //   getCookie (name) {
            //     var arr,
            //         reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            //     if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
            //     else return null;
            // }
            // filters:{
            //     date:function (value) {
            //       if (val != null) {
            //         var date = new Date(value);
            //         return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            //         }
            //     }
            // },
            // formatDate(value){
            //   let time = value.updateTime;
            //     if (time != null) {
            //     var date = new Date(time);
            //     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            //     }
            // },
            formatDate(row, column){  
                let  time =  row[column.property];
                if(typeof(time)=="undefined"){
                    return "";
                }
                var oDate = new Date(time),  
                oYear = oDate.getFullYear(),  
                oMonth = oDate.getMonth()+1,  
                oDay = oDate.getDate(),  
                oHour = oDate.getHours(),  
                oMin = oDate.getMinutes(),  
                oSen = oDate.getSeconds(),  
                oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay) +' '+ this.getzf(oHour) +':'+ this.getzf(oMin) +':'+this.getzf(oSen);//最后拼接时间  
                return oTime;  
            },
            //补0操作,当时间数据小于10的时候，给该数据前面加一个0  
            getzf(num){  
                if(parseInt(num) < 10){  
                    num = '0'+num;  
                }  
                return num;  
            }
        },
        destroyed(){
            this.$bus.off('clickMenu');
        },
        mounted(){
            this.searchList();
            this.polFocus();
            this.$bus.on('clickMenu', content => {
                this.$refs.refPagination.handleCurrentChange(1);
                this.ruleForm={//起运地
                    pol:"",
                    //目的地
                    pod:"",
                    //日期
                    searchDate:"",
                    //类型
                    dateType:"",
                    //船公司
                    companyName:"",
                    //用户名
                    userName: '',
                    //用户手机号
                    userMobile:"",
                    //查询结果
                    isHaveData:"",
                    //查询时间
                    commitTime:"",
                    //解决时间
                    updateTime:"",
                    //状态
                    isError:"",
                    //结束时间
                    endDate:"",
                    //开始时间
                    startDate:"",
                    //操作时间开始
                    uStartDate: "",
                    //操作时间结束
                    uEndDate: "",
                };
                this.companyName = '',
                this.searchList();
            });
        }
    }
  </script>

<style lang="scss" scoped>
    /deep/ .el-table--enable-row-hover  .el-table__body tr:hover>td{
            // background-color:transparent;
            // background-color:#3bb0da50;
            // cursor: pointer;
    }
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
    /deep/ .el-col{
        margin-right: 20px;
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
    /deep/ .el-table .warning-row:hover{
        background:rgba(241, 245, 247, 1);
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
        // position: absolute;
        // left: 20px;
        width: 90%;
    }
    .contenRight{
        // float: right;
        position: absolute;
        right: 20px;
        bottom: 5px;
        // width: 10%;
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
            padding: 20px 20px 0px 20px ;
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
            margin-right: 20px;
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
