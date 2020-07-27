<template>
    <div>
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
            label-width="130px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">
                    {{addOrEdit}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <ul class="tableFormUl">
                <li>
                    <el-form-item
                        prop="companyName"
                        label="船公司" 
                        :rules="[{ required: true, message: '请输入船公司', trigger: 'blur'}]"
                    >
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
                </li>
                <li>
                    <el-form-item
                        prop="routeCode"
                        label="主航线" 
                        :rules="[{ required: true, message: '请输入主航线', trigger: 'blur'}]"
                    >
                        <el-select 
                            remote  
                            clearable 
                            filterable  
                            v-model="ruleForm.routeCode" 
                            placeholder="请输入并选择"
                            :remote-method="lineCodeRemote"
                            @focus="lineCodeFocus"
                            @change="lineCodeChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in lineCodeList"
                                :key="item.id"
                                :label="item.routeCode"
                                :value="item.routeCode"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="routeTwoCode"
                        label="合并航线" 
                        :rules="[{ required: true, message: '请输入合并航线', trigger: 'blur'}]"
                    >
                        <el-select 
                            remote  
                            clearable 
                            filterable  
                            v-model="ruleForm.routeTwoCode" 
                            placeholder="请输入并选择"
                            :remote-method="lineCodeTwoRemote"
                            @focus="lineCodeTwoFocus"
                            @change="lineCodeTwoChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in lineCodeTwoList"
                                :key="item.id"
                                :label="item.routeCode"
                                :value="item.routeCode"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="displayName"
                        label="航线代码(显示)"
                        :rules="[{ required: true, message: '请输入航线代码(显示)', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.displayName" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                </li>
                <li class="saveLi">
                    <el-button size="small" class="clicksColor" @click="handleSaveClick('ruleForm')">确认</el-button>
                </li>
                <li style="clear:both"></li>
            </ul>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props:[
            'routeInnerStatus',
        ],
        data() {
            return {
                addOrEdit : '',
                isLoading: false,
                ruleForm:{
                    companyName: '', //船公司
                    displayName: '', //航线代码重命名
                    routeCode: '', //航线代码1Code
                    routeTwoCode: '', //航线代码2Code
                },
                staticId: '', //第一个航线id
                staticId2: '', //第二个航线id
                scac: '', //船公司四字码
                companyNameList: [], //船公司列表
                lineCodeList: [], //航线代码1列表
                lineCodeTwoList: [], //航线代码2列表
            }
        },
        methods: {
            //保存
            async handleSaveClick(ruleForm){
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    this.isLoading = true
                    let query = {
                        displayName: this.ruleForm.displayName,
                        staticId : this.staticId,
                        staticId2: this.staticId2
                    }
                    this.$axios.post(this.commonJs.localUrl + `/schedules/route/merge` , qs.stringify(query) ,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res=>{
                        var timeSet = setTimeout(()=>{
                            if(this.isLoading == true){
                                this.handleCloseClick()
                                this.$message({
                                    type: "success",
                                    message: "合并成功"
                                });
                                this.$emit("updatSearchManage");
                                this.isLoading = false
                            }else{
                                clearTimeout(timeSet)
                            }
                        },1000 * 50)
                        if(res.data.status == 1){
                            clearTimeout(timeSet)
                            this.handleCloseClick()
                            this.$message({
                                type: "success",
                                message: "合并成功"
                            });
                            this.$emit("updatSearchManage");
                            this.isLoading = false
                        }else if(res.data.status == 3){
                            clearTimeout(timeSet)
                            // this.handleCloseClick()
                            this.$message({
                                type: "error",
                                message: "合并失败,必须是人工、系统、手动添加与动态生成合并"
                            });
                            // this.$emit("updatSearchManage");
                            this.isLoading = false
                        }else if(res.data.status == 4){
                            clearTimeout(timeSet)
                            // this.handleCloseClick()
                            this.$message({
                                type: "error",
                                message: "不同属性的航线不能合并!"
                            });
                            // this.$emit("updatSearchManage");
                            this.isLoading = false
                        }
                    })
                }catch(e){}
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
                let companyName = this.ruleForm.companyName;
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
                for (let i = 0; i < this.companyNameList.length; i++) {
                    if(this.companyNameList[i].companyName === value){
                        this.scac = this.companyNameList[i].scac
                    }
                }    
            },
            //航线代码1搜索
            lineCodeRemote(value){
                if(this.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?routeCode=${value}&scac=${this.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeList = res.data.content
                    }
                })
            },
            //航线代码1focus事件
            lineCodeFocus(){
                if(this.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?scac=${this.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeList = res.data.content
                    }
                })
            },
            //航线代码1change事件
            lineCodeChange(value){
                if(value !== ''){
                    if(value === this.ruleForm.routeTwoCode){
                        this.$message({
                            type: "error",
                            message: "航线代码重复"
                        });
                        this.ruleForm.routeCode = ''
                        return
                    }
                }
                for (let i = 0; i < this.lineCodeList.length; i++) {
                    if(this.lineCodeList[i].routeCode === value){
                        this.staticId = this.lineCodeList[i].id
                    }
                }    
            },
            //航线代码2搜索
            lineCodeTwoRemote(value){
                if(this.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?routeCode=${value}&scac=${this.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeTwoList = res.data.content
                    }
                })
            },
            //航线代码2focus事件
            lineCodeTwoFocus(){
                if(this.scac === ''){
                    this.$message({
                        type: "error",
                        message: "请选择船公司"
                    });
                    return
                }
                this.$axios.get(this.commonJs.localUrl + `/schedules/route/queryRouteByScac?scac=${this.scac}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res=>{
                    if(res.data.status == 1){
                        this.lineCodeTwoList = res.data.content
                    }
                })
            },
            //航线代码2change事件
            lineCodeTwoChange(value){
                if(value !== ''){
                    if(value === this.ruleForm.routeCode){
                        this.$message({
                            type: "error",
                            message: "航线代码重复"
                        });
                        this.ruleForm.routeTwoCode = ''
                        return
                    }
                }
                for (let i = 0; i < this.lineCodeTwoList.length; i++) {
                    if(this.lineCodeTwoList[i].routeCode === value){
                        this.staticId2 = this.lineCodeTwoList[i].id
                    }
                }    
            },
            //关闭事件
            handleCloseClick(){
                this.$emit('handleInnerClose');
            },
        },
        computed: {
            companyName(){
                return this.ruleForm.companyName
            }
        },
        components: {
            loading
        },
        watch:{ //监听船公司companyName变化
           companyName(value,oldValue){
               if(value == ""){
                   this.scac = ''
                   this.ruleForm.routeCode = ''
                   this.ruleForm.routeTwoCode = ''
                   this.lineCodeList = []
                   this.lineCodeTwoList = []
               }else if(value !== oldValue){
                   this.ruleForm.routeCode = ''
                   this.ruleForm.routeTwoCode = ''
                   this.lineCodeList = []
                   this.lineCodeTwoList = []
               }
           }
        },
        mounted() {
          this. addOrEdit = this.routeInnerStatus
        }
    }
</script>

<style lang="scss" scoped>
    // /deep/.el-form-item--mini .el-form-item__content{
    //     margin-left: 100px !important;
    // }
    // /deep/.el-form-item__content{
    //     margin-left: 100px !important;
    // }
    /deep/.el-radio__input{
        float: right;
    }
    /deep/.el-radio__label{
        padding: 0;
        margin-right: 20px;
    }
    .lf{
        float: left;
    }
    .lr{
        float: right;
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
        padding-top: 20px;
        li{
            width: 600px;
        }
    }
    li.saveLi{
        width: 100%;
        text-align: center;
        margin-top: 40px;
    }
    .clicksColor{
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
        // float: right;
    }

    
</style>