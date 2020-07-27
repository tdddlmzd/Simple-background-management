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
                        <div class="title">
                            <span>船舶信息</span>
                        </div>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item label="船名" class="el_formContent" prop="vesselName" :rules="[{ required: true, message: '请输入船名', trigger: 'blur'}]">
                                    <el-input class="inputWidth" v-model="ruleForm.vesselName" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="IMO" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.imo" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="MMSI" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.mmsi" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="Callsign" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.callsign" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item label="Classification" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.classification" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="Flag" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.flag" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                            <el-form-item label="类型">
                                <el-select 
                                    v-model="ruleForm.shiptype" 
                                    clearable
                                    style="width:100%"  
                                    placeholder="请选择"
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
                            <el-col style="width:22%">
                                <el-form-item label="Date keel laid" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.dateKeelLaid" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item label="船长" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.shipLength" placeholder="请输入" clearable @input="ruleForm.shipLength = ruleForm.shipLength.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="船宽" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.shipWidth" placeholder="请输入" clearable @input="ruleForm.shipWidth = ruleForm.shipWidth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="船深" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.shipDeep" placeholder="请输入" clearable @input="ruleForm.shipDeep = ruleForm.shipDeep.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="总吨" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.totalTon" placeholder="请输入" clearable @input="ruleForm.totalTon = ruleForm.totalTon.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:22%">
                                <el-form-item label="净吨" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.netTon" placeholder="请输入" clearable @input="ruleForm.netTon = ruleForm.netTon.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="载重吨" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.deadWeight" placeholder="请输入" clearable @input="ruleForm.deadWeight = ruleForm.deadWeight.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="箱量" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.ctnVolume" placeholder="请输入" clearable @input="ruleForm.ctnVolume = ruleForm.ctnVolume.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="建造日期" class="el_formContent">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.buildDate"
                                            style="width:100%"   
                                            type="date" 
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:44%">
                                <el-form-item label="运营方" class="el_formContent">
                                    <el-input class="inputWidth" v-model="ruleForm.runner" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:22%">
                                <el-form-item label="母船">
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
                        </el-row>
                    </li>
                </ul>
                <div class="save">
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
            'vesselInforName',
            'vesselId',
        ],
        data() {
            return {
                addOrEdit : '',
                ruleForm:{
                    id: '', //ID
                    vesselName: '', //船名
                    imo: '', //imo
                    mmsi: '', //mmsi
                    callsign: '', //呼号
                    classification: '', //classification
                    flag: '', //旗帜
                    shiptype: '', //类型
                    dateKeelLaid: '', //dateKeelLaid
                    shipLength: '', //船长
                    shipWidth: '', //船宽
                    shipDeep: '', //船深
                    totalTon: '', //总吨
                    netTon: '', //净吨
                    deadWeight: '', //载重吨
                    ctnVolume: '', //箱量
                    buildDate: '', //建造日期
                    runner: '', //运营方
                    carrier: '', //母船
                    scac: '', //船公司五子码     
                },
                isLoading: true, //isLoading
                shipDate: [ //类型
                    {
                        value: 'Container ship',
                        label: '集装箱船'
                    },
                ],
                companyNameList: [], //船公司
            }
        },
        components: {
            loading
        },
        methods: {
            //初始话调接口
            getShipInfor(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/vessel/details?id=${this.vesselId}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.ruleForm.id = res.data.content.id //船id
                        this.ruleForm.vesselName = res.data.content.vesselName //船名
                        this.ruleForm.imo = res.data.content.imo //imo
                        this.ruleForm.mmsi = res.data.content.mmsi //mmsi
                        this.ruleForm.callsign = res.data.content.callsign //呼号
                        this.ruleForm.classification = res.data.content.classification //classification
                        this.ruleForm.flag = res.data.content.flag //旗帜
                        this.ruleForm.shiptype = res.data.content.shiptype //类型
                        this.ruleForm.dateKeelLaid = res.data.content.dateKeelLaid //dateKeelLaid
                        this.ruleForm.shipLength = res.data.content.shipLength //船长
                        this.ruleForm.shipWidth = res.data.content.shipWidth //船宽 
                        this.ruleForm.shipDeep = res.data.content.shipDeep //船深 
                        this.ruleForm.totalTon = res.data.content.totalTon //总吨 
                        this.ruleForm.netTon = res.data.content.netTon //净吨 
                        this.ruleForm.deadWeight = res.data.content.deadWeight //载重吨 
                        this.ruleForm.ctnVolume = res.data.content.ctnVolume //箱量 
                        this.ruleForm.buildDate = res.data.content.buildDate //建造日期 
                        this.ruleForm.runner = res.data.content.runner //运营方 
                        this.ruleForm.carrier = res.data.content.carrier //母船
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
                        this.$axios.post(this.commonJs.localUrl + `/schedules/vessel/add`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("UpdatShip")
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.closeClick();
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else if (res.data.status == 2) {
                                    this.$message({
                                        type: "error",
                                        message: "有重复船名"
                                    });
                                    this.isLoading = false
                                }
                            }).catch(_ => {});
                    }else{
                        query['list'] = []
                        this.$axios.put(this.commonJs.localUrl + `/schedules/vessel/modify`, query, {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                            }).then(res => {
                                if (res.data.status == 1) {
                                    this.$emit("UpdatShip",query)
                                    this.$message({
                                        type: "success",
                                        message: res.data.message
                                    });
                                    this.closeClick();
                                }else if (res.data.status == 0) {
                                    this.$message({
                                        type: "error",
                                        message: "数据保存失败 请重新加载页面"
                                    });
                                }else if (res.data.status == 2) {
                                    this.$message({
                                        type: "error",
                                        message: "有重复船名"
                                    });
                                    this.isLoading = false
                                }
                        }).catch(_ => {});
                    }
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
                let companyName = this.ruleForm.carrier;
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
                if(value === ''){
                    this.ruleForm.scac = ''
                }else{
                    for (let i = 0; i < this.companyNameList.length; i++) {
                        if(this.companyNameList[i].companyName === value){
                            this.ruleForm.scac = this.companyNameList[i].scac
                        }
                    }
                }    
            },
            //关闭事件
            closeClick(){
                this.$emit('closeShipInfor')
            }
        },
        mounted() {
            if(this.vesselInforName  === '新增'){
                this.addOrEdit = '新增'
                this.isLoading = false
            }else{
                this.addOrEdit = '修改';
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