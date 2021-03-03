<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
            label-width="110px"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">
                    {{addOrEdit}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="closeClick"></i>
            </div>
            <div>
                <ul class="routeUl">
                    <li class="routeLi">
                        <!-- <div class="title">
                            <span>船舶信息</span>
                        </div> -->
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="船名" class="el_formContent" prop="nameEn" :rules="[{ required: true, message: '请输入船名', trigger: 'blur'}]">
                                    <el-input class="inputWidth" v-model="ruleForm.nameEn" placeholder="请输入" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="IMO" class="el_formContent" prop="imo" :rules="[{ required: true, message: '请输入IMO', trigger: 'blur'}]">
                                    <el-input class="inputWidth" v-model="ruleForm.imo" placeholder="请输入" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="类型">
                                    <el-select 
                                        v-model="ruleForm.shipType" 
                                        clearable
                                        style="width:100%"  
                                        placeholder="请选择"
                                        :disabled="isUpdate"
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
                            <el-col style="width:24%">
                                <el-form-item label="Date keel laid" class="el_formContent">
                                    <!-- <el-input class="inputWidth" v-model="ruleForm.dateKeelLaid" placeholder="请输入" clearable></el-input> -->
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.dateKeelLaid"
                                            style="width:100%"   
                                            type="datetime" 
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="选择日期"
                                            :readonly="isUpdate"
                                        >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="船长" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.length" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.length = ruleForm.length.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="船宽" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.breadth" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.breadth = ruleForm.breadth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="船深" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.depth" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.depth = ruleForm.depth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="净吨" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.nt" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.nt = ruleForm.nt.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="总吨" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.gt" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.gt = ruleForm.gt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:24%">
                                <el-form-item label="载重吨" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.dwt" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.dwt = ruleForm.dwt.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:24%">
                                <el-form-item label="箱量" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.shipContainerNum" placeholder="请输入" clearable :readonly="isUpdate" @input="ruleForm.shipContainerNum = ruleForm.shipContainerNum.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
                <div class="save" v-if="addOrEdit == '新增'">
                    <el-button class="saveBtn" @click="saveClick('ruleForm')">保存</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import qs from "qs";
    import loading from "@/components/Loading/loading.vue";
    export default {
        props:[
            'shipManag',
            'vesselId',
        ],
        data() {
            return {
                addOrEdit : '',
                isUpdate: false,
                ruleForm:{
                    id: '', //ID
                    nameEn: '', //船名
                    imo: '', //imo
                    shipType: '', //类型
                    dateKeelLaid: '', //dateKeelLaid
                    length: '', //船长
                    breadth: '', //船宽
                    depth: '', //船深
                    nt: '', //净吨
                    gt: '', //总吨
                    dwt: '', //载重吨
                    shipContainerNum: '', //箱量
                },
                isLoading: true, //isLoading
                shipDate: [ //类型
                    {
                        value: 'Container ship',
                        label: '集装箱船'
                    },
                ],
            }
        },
        components: {
            loading
        },
        methods: {
            //初始话调接口
            getShipInfor(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/baseVessel/getDetailById?id=${this.vesselId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.ruleForm.id = res.data.content.id //船id
                        this.ruleForm.nameEn = res.data.content.nameEn //船名
                        this.ruleForm.imo = res.data.content.imo //imo
                        this.ruleForm.mmsi = res.data.content.mmsi //mmsi
                        this.ruleForm.callSign = res.data.content.callSign //呼号
                        this.ruleForm.classIfICationSociety = res.data.content.classIfICationSociety //协会社 
                        this.ruleForm.homePort = res.data.content.homePort //船籍
                        this.ruleForm.shipType = res.data.content.shipType //类型
                        this.ruleForm.dateKeelLaid = res.data.content.dateKeelLaid //dateKeelLaid
                        this.ruleForm.length = res.data.content.length //船长
                        this.ruleForm.breadth = res.data.content.breadth //船宽 
                        this.ruleForm.depth = res.data.content.depth //船深 
                        this.ruleForm.gt = res.data.content.gt //总吨 
                        this.ruleForm.nt = res.data.content.nt //净吨 
                        this.ruleForm.dwt = res.data.content.dwt //载重吨 
                        this.ruleForm.shipContainerNum = res.data.content.shipContainerNum //箱量 
                        this.ruleForm.dateBuild = res.data.content.dateBuild //建造日期 
                        this.ruleForm.shipOwnerEn = res.data.content.shipOwnerEn //运营方 
                        this.ruleForm.carrier = res.data.content.carrier //母船
                        this.ruleForm.companyId = res.data.content.companyId //母船
                        this.isLoading = false
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //保存
            async saveClick(ruleForm){
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    this.isLoading = true
                    var query = this.ruleForm
                    if(this.addOrEdit == '新增'){
                        console.log(query,'query')
                        this.$axios.post(this.commonJs.localUrl + `/schedules/baseVessel/add`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("updatShip")
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.closeClick();
                                }else if (res.data.status == 5) {
                                    this.$message({
                                        type: "error",
                                        message: "有重复IMO"
                                    });
                                    this.isLoading = false
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                            }).catch(_ => {});
                    }else{
                        this.$axios.put(this.commonJs.localUrl + `/schedules/baseVessel/update`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("updatShip")
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.closeClick();
                                }else if (res.data.status == 5) {
                                    this.$message({
                                        type: "error",
                                        message: "有重复IMO"
                                    });
                                    this.isLoading = false
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }
                        }).catch(_ => {});
                    }
                }catch(e){}
            },
            //关闭事件
            closeClick(){
                this.$emit('closeShipInfor')
            }
        },
        mounted() {
            if(this.shipManag  === '新增'){
                this.addOrEdit = '新增'
                this.isLoading = false
                this.isUpdate = false
            }else{
                this.addOrEdit = '修改';
                this.isUpdate = true
                this.getShipInfor()
            }
        }
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
    .lf{
        float: left;
    }
    .lr{
        float: right;
    }
    .clicksColor{
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
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
</style>