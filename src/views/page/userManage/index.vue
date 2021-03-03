<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <breadcrumb :matched="matched"></breadcrumb>
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <!--el-from-->
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="70px"
            >
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="状态">
                                <el-select 
                                    v-model="ruleForm.status" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in statusList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="登录账号">
                                <!-- <el-input v-model="ruleForm.mobile" placeholder="请输入" clearable @input="ruleForm.mobile = ruleForm.mobile.replace(/[^\d]/g,'')" maxlength="11"></el-input> -->
                                <el-input v-model="ruleForm.mobile" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="用户名">
                                <el-input v-model="ruleForm.userName" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="角色">
                                <el-select
                                    v-model="ruleForm.typeCode"
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                    @focus="roleFocue"
                                    @change="roleChange"
                                >
                                    <el-option
                                        v-for="item in typeList"
                                        :key="item.roleCode"
                                        :label="item.roleName"
                                        :value="item.roleCode"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="公司">
                                <el-input v-model="ruleForm.companyName" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="邀请人">
                                <el-input v-model="ruleForm.inviteName" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="创建时间">
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
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="用户类型">
                                <el-select
                                    v-model="ruleForm.userType"
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                    @focus="userTypeFocue"
                                    @change="userTypeChange"
                                >
                                    <el-option
                                        v-for="item in userList"
                                        :key="item.value"
                                        :label="item.lable"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="用户类别">
                                <el-select 
                                    v-model="ruleForm.userCategory" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in userCateList"
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
        <!--el-table-->
        <div class="tablePage">
            <div class="buttonTop">
                <el-button size="small" class="clickColor butn" @click="handleAddClick">新增</el-button>
                <!-- <el-button size="small" class="clickColor dered" @click="delectDate">删除</el-button> -->
                <el-button size="small" class="clickColor normals" @click="effective">正常</el-button>
                <el-button size="small" class="clickColor abnormal" @click="shielding">屏蔽</el-button>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
              :row-class-name="tabRowClassName"
              tooltip-effect="dark"
              @row-dblclick="userDetail"
              @selection-change="selectedCheck"
              ref="table"
            >
                <el-table-column type="selection" width="45" max="1">

                </el-table-column>
                <el-table-column prop="status" label="状态" align="left" :show-overflow-tooltip="true" min-width="70" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.status === 0 ?'正常':scope.row.status === 1 ?'屏蔽':''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="登录账号" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="userName" label="用户名" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="userCategory" label="用户类别" align="left" :show-overflow-tooltip="true" min-width="100" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.userCategory === 0 ?'普通用户':scope.row.userCategory === 1 ?'付费用户':'普通用户'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="post" label="职位" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="companyName" label="公司" align="left" :show-overflow-tooltip="true" min-width="120" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="userType" label="用户类型" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        <span>{{scope.row.userType == 1 ? '网站' : scope.row.userType == 2 ? 'API' : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="角色" align="left" :show-overflow-tooltip="true" min-width="140" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="inviteName" label="邀请人" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" min-width="80" :sortable="sortableState" :filters="[]">
                    <template slot-scope="scope">
                        {{scope.row.updateUser ? scope.row.updateUser.toUpperCase() : ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" width="142" :sortable="sortableState" :filters="[]">

                </el-table-column>
                <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip="true" width="142" :sortable="sortableState" :filters="[]">

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
            ></ThePagination>
            <!-- 新增用户 -->
            <el-dialog
                class="addUserDeatil"
                :visible.sync="addUserDeatil"
                v-if="addUserDeatil"
                ref="addUserDeatil"
                width="950px"
                top="0"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
            >
                <addNewUser
                    :addUserText = addUserText
                    :addUserId="addUserId"
                    @closeUserDetail="closeUserDetail"
                    @updatUser="updatUser"
                    ref="addNewUser"
                >
                </addNewUser>
            </el-dialog>
            <!-- 修改 -->
            <el-dialog
                class="updateUserDeatil"
                :visible.sync="updateUserDeatil"
                v-if="updateUserDeatil"
                ref="updateUserDeatil"
                width="1000px"
                top="60px"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
            >
                <moUserInfor
                    :updateUserText = updateUserText
                    :updateUserId = updateUserId
                    :updateState = updateState
                    @closeUpdateUser="closeUpdateUser"
                    @updatUser="updatUser"
                    ref="moUserInfor"
                >
                </moUserInfor>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import addNewUser from "./addNewUser.vue";
    import moUserInfor from "./moUserInfor.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import loading from "@/components/Loading/outLoading.vue";
    import noData from "@/components/noData/index.vue";
    export default {
        data() {
            return {
                matched: "", //路径
                isLoading: true, //
                tableData: [], //表格数据
                sortableState: true, // 排序方式
                multipleSelection: [], // 选择
                //新增用户
                addUserDeatil:false,
                addUserText: '',
                addUserId: '',

                //修改用户
                updateUserDeatil:false,
                updateUserText: '',
                updateUserId: '',
                updateState: '',
                //ruleForm
                ruleForm: {
                    status: '', //用户状态
                    mobile: '', //手机
                    userName: '', //用户名
                    typeCode: '', //角色
                    userType: '', //用户类型
                    userCategory: '',
                    companyName: '', //公司
                    inviteName: '', //邀请人
                    startTime: '', //创建时间
                    endTime: '', //结束时间
                },
                //用户状态 0/1 正常/屏蔽
                statusList: [
                    {
                        value:'',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '正常'
                    },
                    {
                        value: 1,
                        label: '屏蔽'
                    },
                ],
                //用户类型
                userCateList: [
                    {
                        value: '',
                        label:'全部'
                    },
                    {
                        value: 0,
                        label: '普通用户'
                    },
                    {
                        value: 1,
                        label: '付费用户'
                    },
                ],
                typeList: [], //角色
                userList:[ //用户类型
                    {
                        value: '',
                        lable: "全部",
                    },
                    {
                        value: 1,
                        lable: "网站",
                    },
                    {
                        value: 2,
                        lable: "API",
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
            };
        },
        methods: {
            //页面初始化
            searchList(reload){
                this.isLoading = true;
                this.$refs.table.clearSort()
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
                this.$axios.get(this.commonJs.localUrl +`/schedules/userManager/getUserList?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&status=${this.ruleForm.status
                }&mobile=${this.ruleForm.mobile
                }&userName=${this.ruleForm.userName
                }&typeCode=${this.ruleForm.typeCode
                }&companyName=${this.ruleForm.companyName
                }&userType=${this.ruleForm.userType
                }&userCategory=${this.ruleForm.userCategory
                }&inviteName=${this.ruleForm.inviteName
                }&startTime=${this.ruleForm.startTime
                }&endTime=${this.ruleForm.endTime
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
                                    for (let i = 0; i < this.tableData.length; i++) {
                                        var types = this.tableData[i]
                                        if(types.userType == 1){ //网站
                                            if(types.type.indexOf('普通用户') == -1){
                                                types.type = '普通用户,' + types.type
                                            }
                                        }
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
                        if(reload == 'upda'){
                            this.isLoadings = false
                            this.$message({ type:"success", message: '状态修改成功'});
                        }else if(reload == 'delect'){
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
                })
            },
            //给分页传的属性
            handleChange(params) {
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchList();
                this.pageNumber = -1;
            },
            //子组件传来的值
            handleStatus(data){
                if(data === 1 || data.status === 1){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                    this.dialogAddVisible = false;
                    this.searchList(data);
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
            //角色focue
            roleFocue(){
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/getRoles`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.typeList = res.data.content;
                })
            },
            //角色change
            roleChange(val){
                // console.log(val)
            },
            //用户类型focus
            userTypeFocue(){
            },
            //用户类型change
            userTypeChange(){
            },
            //搜索
            serchBtn() {
                this.$refs.refPagination.handleCurrentChange(1)
            },
            //新增
            handleAddClick() {
                this.addUserDeatil = true
                this.addUserText = '新增'
            },
            //关闭新增
            closeUserDetail(){
                this.addUserDeatil = false
            },
            //双击详情
            userDetail(row) {
                if(row.userType == 1){ //网站
                    this.updateUserDeatil = true
                    this.updateUserText = '修改'
                    this.updateUserId = row.id
                    this.updateState = row.status
                }else if(row.userType == 2){ //API
                    this.addUserDeatil = true
                    this.addUserText = '修改'
                    this.addUserId = row.id
                }
            },
            //关闭双击详情
            closeUpdateUser(){
                this.updateUserDeatil = false
            },
            //更新新增或者双击详情
            updatUser(){
                this.searchList()            
            },
            //删除
            delectDate() {
                var val = this.multipleSelection;
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
                    var that = this
                    var routeList = []
                    for (let i = 0; i < val.length; i++) {
                        routeList.push(val[i].id);
                    }
                    let query = {
                        ids: routeList,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/vessel/delete`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchList("delect");
                        }
                    })
                }).catch(_ => {});
            },
            //正常
            effective(){
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_normal, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var models = []
                    for (let i = 0; i < val.length; i++) {
                        models.push({
                            id: val[i].id,
                            userType: val[i].userType
                        });
                    }
                    let query = {
                        models: models,
                        status: 0,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/userManager/updateStatusById`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchList("upda");
                        }
                    })
                }).catch(_ => {});
            },
            //屏蔽
            shielding() {
                var val = this.multipleSelection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条进行设置',
                    });
                    return
                }
                var confirm = "<div class='tesDiv'><div>是否将状态变为屏蔽？</div></div>"
                for (let i = 0; i < val.length; i++) {
                    if(val[i].userType == 1){ //网站用户
                        confirm = "<div class='tesDiv'><div>是否将状态变为屏蔽？</div><div style='color:red;font-size:12px'>屏蔽用户会导致其下的航线认证记录被删除</div></div>"
                    }
                }
                this.$confirm(confirm, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    this.isLoading = true
                    var that = this;
                    var models = []
                    for (let i = 0; i < val.length; i++) {
                        models.push({
                            id: val[i].id,
                            userType: val[i].userType
                        });
                    }
                    let query = {
                        models: models,
                        status: 1,
                    }
                    this.$axios.post(this.commonJs.localUrl +`/schedules/userManager/updateStatusById`,
                        query,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.searchList("upda");
                        }
                    })
                }).catch(_ => {});
            },
            //选择
            selectedCheck(val) {
                this.multipleSelection = val;
            },
        },
        components: {
            ThePagination,
            Breadcrumb,
            loading,
            addNewUser,
            moUserInfor,
            noData
        },
        mounted() {
            this.matched = this.$route.matched;
            this.searchList();
            this.$refs.refPagination.changeValue()
            this.$bus.on('clickMenu', content => {
                if(Math.ceil(this.tableData.length / this.page.pageSize) < this.page.pageNo){
                    this.page.pageNo = 1;
                    this.pageNumber = 1;
                };
                this.ruleForm.status = '', //用户状态
                this.ruleForm.mobile = '', //手机
                this.ruleForm.userName = '', //用户名
                this.ruleForm.typeCode = '', //角色
                this.ruleForm.userType = '', //用户类型
                this.ruleForm.userCategory = '',
                this.ruleForm.companyName = '', //
                this.ruleForm.inviteName = '', //
                this.ruleForm.startTime = '', //创建时间
                this.ruleForm.endTime = '', //结束时间
                this.searchList();
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
    .addUserDeatil{
        overflow: hidden !important;
        padding-top: 50px;
        /deep/.el-dialog{
            height: auto;
            // overflow-y: auto;
        }
    }
    .basicPortContent {
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        .serachBack {
            background-color: #fff;
            padding: 20px 20px 0px 20px;
            margin-bottom: 10px;
            position: relative;
        }
        .tablePage {
            background-color: #fff;
            padding: 20px 20px 60px 20px;
        }
        .refPagination {
            width: 100%;
            background-color: #fff;
        }
    }
    /deep/.el-table__empty-text{
        width: 100%;
    }
    .contentLeft {
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
        .butn {
            margin-right: 0;
            background-color: #ff9000;
            border: 1px solid #ff9000;
            color: #fff;
            padding: 9px 35px;
            float: right;
            margin-bottom: 20px;
        }
        .dered{
            float: right;
            border: 1px solid #FF0000;
            color: #FF0000;
            padding: 9px 35px;
            background-color: #fff;
            margin-right:10px;
        }
    }

</style>