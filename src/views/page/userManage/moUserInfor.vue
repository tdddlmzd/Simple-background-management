<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="90px"
        :model="ruleForm"
        ref="ruleForm"
        size="mini"
        class="ruleForm"
        >
            <div :style="{maxHeight: heightInner}" class="scrollP">
                <i class="addOrEditClose el-icon-close" @click="closeUpdateUser"></i>
                <el-tabs v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane label="基础信息" name="basicInfor">
                        <div>
                            <ul class="routeUl">
                                <li class="routeLi">
                                    <div class="title">
                                        <span>个人信息</span>
                                    </div>
                                    <el-row>
                                        <el-col style="width:24%">
                                            <el-form-item label="登录账号" class="el_formContent" prop="vesselName">
                                                <el-input v-model="ruleForm.userMobile" placeholder="请输入" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:24%">
                                            <el-form-item label="密码" class="el_formContent">
                                                <el-input v-model="ruleForm.passWord" placeholder="请输入" type="password" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:24%">
                                            <el-form-item label="用户名" class="el_formContent" prop="userName" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur'}]">
                                                <el-input v-model="ruleForm.userName" placeholder="请输入" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:24%">
                                            <el-form-item label="邮箱" class="el_formContent">
                                                <el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col style="width:24%">
                                            <el-form-item label="邀请人" class="el_formContent" prop="inviterName">
                                                <el-input v-model="ruleForm.inviterName" placeholder="请输入" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:48%">
                                            <el-form-item label="角色" class="tesElForm">
                                                <el-select
                                                    multiple
                                                    v-model="roles"
                                                    style="width:100%;"
                                                    placeholder="请选择"
                                                    @change="typeChange"
                                                >
                                                    <el-option
                                                        v-for="item in typeList"
                                                        :key="item.roleCode"
                                                        :label="item.roleName"
                                                        :value="item.roleName"
                                                        :disabled="item.roleCode == 'NORMAL'"
                                                    >
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col style="width:30%">
                                            <el-form-item label="用户类别" prop="userCategory" :rules="[{ required: true, message: '请输入用户类别', trigger: 'blur'}]">
                                                <el-select 
                                                    v-model="ruleForm.userCategory" 
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
                                </li>
                                <li class="routeLi">
                                    <div class="title">
                                        <span>公司信息</span>
                                    </div>
                                    <el-row>
                                        <el-col style="width:24%">
                                            <el-form-item label="公司名称" class="el_formContent" prop="vesselName">
                                                <el-input v-model="ruleForm.companyName" placeholder="请输入" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:24%">
                                            <el-form-item label="职位" class="el_formContent">
                                                <el-input v-model="ruleForm.companyPosition" placeholder="请输入" clearable></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col style="width:24%">
                                            <el-form-item label="手机号" class="el_formContent">
                                                <el-input v-model="ruleForm.workPhone" placeholder="请输入" clearable @input="ruleForm.workPhone = ruleForm.workPhone.replace(/[^\d]/g,'')" maxlength="11"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </li>
                            </ul>
                            <div class="save">
                                <el-button class="saveBtn" @click="saveClick('ruleForm')">保存</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="航线认证" name="certifiCourse" v-if="isHangx">
                        <div>
                            <div class="tablePage">
                                <div class="buttonTop">
                                    <el-button size="small" class="clickColor butn" @click="AddCourse" v-if="updateState === 0">新增</el-button>
                                    <el-button size="small" class="clickColor butnDele" @click="delectCourse">删除</el-button>
                                </div>
                                <el-table
                                    :data="tableData"
                                    style="width: 100%;"
                                    :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                                    :row-class-name="tabRowClassName"
                                    tooltip-effect="dark"
                                    ref="table"
                                    @row-dblclick="changeCourse"
                                    @selection-change="selectCourse"
                                >
                                    <el-table-column
                                        type="selection"
                                        width="45"
                                    >
                                    </el-table-column>
                                    <el-table-column prop="id" label="序号" align="left" :show-overflow-tooltip="true" width="50px">
                                        <template slot-scope="scope">
                                            {{scope.$index +1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="portName" label="口岸" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="70">
                                    
                                    </el-table-column>
                                    <el-table-column prop="companyName" label="船公司" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="150">
                                    
                                    </el-table-column>
                                    <el-table-column prop="routeName" label="航线" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="150">
                                    
                                    </el-table-column>
                                    <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="142">
                                    
                                    </el-table-column>
                                    <el-table-column prop="updateUser" label="操作人" align="left" :show-overflow-tooltip="true" :sortable="sortableState" :filters="[]" min-width="100">
                                    
                                    </el-table-column>
                                </el-table>
                                <!--分页-->
                                <ThePagination ref="refPagination" :pageNumber="pageNumber" :attribute="paginationAttribute" class="refPagination"></ThePagination>
                            </div>
                            <div class="save">
                                <el-button class="saveBtn" @click="saveClick('ruleForm')">保存</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-form>
        <el-dialog
            class="courseDetail"
            :visible.sync="courseDetail"
            v-if="courseDetail"
            ref="courseDetail"
            width="980px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <courseAdd
                :userId="userId"
                :courseText="courseText"
                :courseInfor="courseInfor"
                @courseClose="courseClose"
                @courseUpdate="courseUpdate"
                ref="courseAdd"
            >
            </courseAdd>
        </el-dialog>
    </div>
</template>
<script>
    import loading from "@/components/Loading/loading.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    import courseAdd from "./courseAdd.vue";
    export default {
        props: [
            "updateUserText",
            "updateUserId",
            "updateState",
            ],
        data() {
            return {
                heightInner: '',
                heightScreen: '',
                activeName: 'basicInfor',
                addOrEdit: "", //新增或者修改
                isLoading: true, //isLoading
                sortableState: true,
                isShanChu: false,
                ////航线认证
                isHangx: false,
                courseDetail: false,
                courseText: false,
                userId: '',
                courseInfor: '',
                ruleForm:{
                    id: '',
                    userMobile: "",
                    userType: "",
                    inviterName: "", //邀请人姓名
                    inviterCode: "", //邀请人手机号
                    passWord: "123456", //密码
                    userName: "", //用户名
                    email: "",
                    userCategory: '',
                    companyName: "",
                    companyPosition: "", //公司职位
                    workPhone: "", //公司电话
                },
                //已选择的用户类型
                roles: ['普通用户'],
                //用户类型
                userCateList: [
                    {
                        value: 0,
                        label: '普通用户'
                    },
                    {
                        value: 1,
                        label: '付费用户'
                    },
                ],
                //用户类型
                typeList: [],
                selection: [],
                tableData: [],
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
        components: {
            loading,
            ThePagination,
            courseAdd
        },
        methods: {
            //取详情
            basicInfor(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/getWebUserDetails?id=${this.updateUserId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.isLoading = false
                        this.ruleForm.id = res.data.content.id
                        this.ruleForm.userMobile = res.data.content.userMobile
                        this.ruleForm.userType = res.data.content.userType
                        this.ruleForm.inviterName = res.data.content.inviterName
                        this.ruleForm.inviterCode = res.data.content.inviterCode
                        this.ruleForm.passWord = '123456'
                        this.ruleForm.userName = res.data.content.userName
                        this.ruleForm.email = res.data.content.email
                        this.ruleForm.companyName = res.data.content.companyName
                        this.ruleForm.companyPosition = res.data.content.companyPosition
                        this.ruleForm.workPhone = res.data.content.workPhone
                        this.ruleForm.userCategory =res.data.content.userCategory
                        if(res.data.content.roles.length > 0){ //说明有选择用户类型
                            for (let i = 0; i < res.data.content.roles.length; i++) {
                                if(res.data.content.roles[i].roleCode !== 'NORMAL'){
                                    this.roles.push(res.data.content.roles[i].roleName)
                                }
                                if(res.data.content.roles[i].roleCode == 'ROUTE_EXPERT'){ //说明有航线专家
                                    this.isHangx = true
                                    this.isShanChu = true
                                }
                            }
                        }else{
                            this.roles = ['NORMAL']//用户类型 必有的普通用户  
                        }
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //切换
            tabClick(tab, event){
                if(tab.label == '航线认证'){
                    this.certCourse() //调航线认证接口
                }else{ //点击的就是基础信息
                    this.page.pageNo = 1
                    this.pageNumber = 1
                }
            },
            //用户类型的改变
            typeChange(val){
                if(val.length > 0){ //说明有东西
                    for (let i = 0; i < val.length; i++) {
                        if(val[i] == '航线专家'){ //代表有航线专家
                            this.isHangx = true
                            return
                        }
                    }
                    this.isHangx = false
                }else{
                    this.isHangx = false
                }
                console.log(this.typeList,'this.typeList')
            },
            typeFocus(){
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/getRoles`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.typeList = res.data.content.filter((item,index)=>{
                        if(item.type == 1){//新增只新增API用户
                            return true
                        }
                    });
                })
            },
            //航线认证接口信息
            certCourse(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/expert/expertAuth/getExpertAuth?pageNumber=${this.page.pageNo
                }&pageSize=${this.page.pageSize
                }&userId=${this.ruleForm.id}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.tableData = res.data.content
                        this.$refs.refPagination.page.total = res.data.total;
                        this.$refs.refPagination.changeValue()
                        this.isLoading = false
                    } else if (res.data.status == 0) {
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        })
                    }
                })
            },
            //选择航线认证
            selectCourse(val){
                this.selection = val
            },
            //新增航线认证
            AddCourse(){
                this.userId = this.ruleForm.id
                this.courseDetail = true
                this.courseText = '新增'
            },
            //双击航线认证
            changeCourse(row){
                // this.courseDetail = true
                // this.courseText = '修改'
                // this.courseInfor = row
            },
            //关闭航线认证
            courseClose(){
                this.courseDetail = false
            },
            //更新航线认证
            courseUpdate(){
                this.certCourse()
            },
            //删除航线认证
            delectCourse(){
                var val = this.selection;
                if(val.length <= 0){
                    this.$message({
                        type : 'error',
                        message : '请选择一条或者多条航线删除',
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
                    var id = ''
                    var delectRouteList = []
                    for (let i = 0; i < val.length; i++) {
                        delectRouteList.push(val[i].uuId);
                    }
                    id = delectRouteList.join(',')
                    this.$axios.get(this.commonJs.localUrl +`/expert/expertAuth/delExpertAuth?id=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res =>{
                        if(res.data.status == 1){
                            that.$message({
                                type: "success",
                                message: `删除成功`
                            });
                            that.certCourse()
                        }else{
                            this.$message({
                                type: "error",
                                message: "删除失败"
                            });
                            that.isLoading = false
                        }
                    })
                }).catch(_ => {});
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.certCourse();
                this.pageNumber = -1;
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
            closeUpdateUser() {
                this.$emit("closeUpdateUser");
            },
            //保存
            async saveClick(ruleForm) {
                try {
                    let valid = await this.$refs[ruleForm].validate();
                    if (!valid) return
                    var confirm = "<div class='tesDiv'><div>是否确认保存？</div></div>"
                    if((this.isShanChu && !this.isHangx) || (!this.isHangx && this.tableData.length > 0)){
                        //条件一：本身有航线认证 后期取消航线认证
                        //条件二：本身没有航线认证 后期添加航线认证 并且再次进行删除（this.tableData的数组不为空）
                        confirm = "<div class='tesDiv'><div>是否确认保存？</div><div style='color:red;font-size:12px'>删除该用户航线专家权限,将导致其航线认证记录被删除</div></div>"
                    }
                    this.$confirm(confirm,"",
                    {
                        cancelButtonClass: "btnCustomCencel",
                        confirmButtonClass: "btnCustomSubmit",
                        customClass: "customClass",
                        dangerouslyUseHTMLString: true
                    }).then(_ => {
                        this.isLoading = true
                        var roles = []
                        console.log(this.typeList,'this.typeList')
                        for (let i = 0; i < this.roles.length; i++) {
                            for (let j = 0; j < this.typeList.length; j++) {
                                if(this.roles[i] == this.typeList[j].roleName){
                                    roles.push(this.typeList[j])
                                }
                            }
                        }
                        var query = this.ruleForm
                        query['passWord'] = ''
                        query['roles'] = roles
                        this.$axios.post(this.commonJs.localUrl + `/schedules/userManager/updateWebUser`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("updatUser")
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.closeUpdateUser()
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            })
                    }).catch(_ => {})
                } catch (e) {}
            },
            //监听窗口变化
            winResize() {
                const that = this
                that.heightScreen = document.body.clientHeight;
                window.onresize = () => {
                    return (() => {
                        window.screenHeight = document.body.clientHeight 
                        that.heightScreen = window.screenHeight
                    })();
                };
            },
        },
        mounted() {
            this.isLoading = false
            if(this.updateUserText == "修改"){
                this.addOrEdit = "修改"
                this.basicInfor() //取船舶详情基础信息接口
            }
            this.winResize()
            this.typeFocus()
        },
        watch:{
            heightScreen (val) {
               var height = val - 150
               this.heightInner = height  + 'px'
            }    
        },
        destroyed() {
            window.removeEventListener("resize", this.getWidth);
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
    /deep/.el-tabs__item.is-active{
        color: #333;
        font-weight: bold;
    }
    /deep/.el-tabs__item:hover{
        color: #333;
    }
    /deep/.el-tabs__item{
        font-size: 13px;
    }
    /deep/.el-tabs__nav-scroll{
        padding-left: 20px;
    }    
    .scrollP{
        position: relative;
        overflow-y: auto;
        height:'400px'
    }
    .routeAdd {
        position: relative;
        overflow: hidden;
    }
    .addOrEditClose {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 16px;
        cursor: pointer;
        z-index: 4;
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
    .tablePage {
        background-color: #fff;
        padding: 0px 0px 20px 0px;
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
    .clickColor {
        background-color: #fff;
        padding: 9px 27px;
        margin-right: 10px;
    }
    .butn {
        margin-right: 0;
        background-color: #ff9000;
        color: #fff;
        padding: 9px 35px;
        float: right;
        margin-bottom: 20px;
    }
    .butnDele{
        margin-right: 10px;
        border: 1px solid #ff0000;
        color: #ff0000;
        padding: 9px 35px;
        float: right;
        margin-bottom: 20px;
    }

    /deep/.tesElForm .el-select .el-tag:nth-child(1) .el-tag__close.el-icon-close{
        display: none;
    }
</style>