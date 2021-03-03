<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
            label-position="right"
            label-width="170px"
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
            <div :style="{maxHeight: heightInner}" class="scrollP">
                <ul class="routeUl">
                    <li class="routeLi">
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船名(中文)" prop="nameCn">
                                    <el-input v-model="ruleForm.nameCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="IMO" prop="imo" :rules="[{ required: true, message: 'IMO不能为空', trigger: 'blur'}]">
                                    <el-input v-model="ruleForm.imo" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.imo = ruleForm.imo.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="MMSI" prop="mmsi" :rules="[{ required: true, message: 'MMSI不能为空', trigger: 'blur'}]">
                                    <el-input v-model="ruleForm.mmsi" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.mmsi = ruleForm.mmsi.replace(/[^\d]/g,'')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船名(英文)" prop="nameEn" :rules="[{ required: true, message: '船名不能为空', trigger: 'blur'}]">
                                    <el-input v-model="ruleForm.nameEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="呼号" prop="callSign">
                                    <el-input v-model="ruleForm.callSign" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船旗" prop="flagName">
                                    <el-input v-model="ruleForm.flagName" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船籍港">
                                    <el-input v-model="ruleForm.homePort" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="平均吃水">
                                    <el-input v-model="ruleForm.avgDraft" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.avgDraft = ruleForm.avgDraft.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="满载吃水">
                                    <el-input v-model="ruleForm.fullLoaded" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.fullLoaded = ruleForm.fullLoaded.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="总吨">
                                    <el-input v-model="ruleForm.gt" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.gt = ruleForm.gt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="净吨">
                                    <el-input v-model="ruleForm.nt" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.nt = ruleForm.nt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="载重吨">
                                    <el-input v-model="ruleForm.dwt" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.dwt = ruleForm.dwt.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船长">
                                    <el-input v-model="ruleForm.length" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.length = ruleForm.length.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船宽">
                                    <el-input v-model="ruleForm.breadth" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.breadth = ruleForm.breadth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船深">
                                    <el-input v-model="ruleForm.depth" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.depth = ruleForm.depth.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="客位">
                                    <el-input v-model="ruleForm.passSpa" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.passSpa = ruleForm.passSpa.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="车位">
                                    <el-input v-model="ruleForm.carPort" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.carPort = ruleForm.carPort.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="箱量">
                                    <el-input v-model="ruleForm.shipContainerNum" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.shipContainerNum = ruleForm.shipContainerNum.match(/^\d*(\.?\d{0,2})/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="联系方式">
                                    <el-input v-model="ruleForm.call" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.call = ruleForm.call.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="传真">
                                    <el-input v-model="ruleForm.fox" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="法人">
                                    <el-input v-model="ruleForm.ownerLegalPerson" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="联系方式(night)">
                                    <el-input v-model="ruleForm.callNight" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" @input="ruleForm.callNight = ruleForm.callNight.match(/^\d*/g)[0] || null"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="运营方">
                                    <el-input v-model="ruleForm.shipOwnerCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶类型">
                                    <el-input v-model="ruleForm.shipType" clearable readonly v-if="isUpdate"></el-input>
                                    <el-select 
                                        v-model="ruleForm.shipType" 
                                        clearable
                                        style="width:100%"
                                        placeholder="请选择"
                                        v-else
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
                            <el-col style="width:33%">
                                <el-form-item label="ism 管理">
                                    <el-input v-model="ruleForm.ismManager" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="ism 管理地址">
                                    <el-input v-model="ruleForm.ismAddress" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="ism 生效日期">
                                    <el-input v-model="ruleForm.ismDateEofEffect" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人(中文)">
                                    <el-input v-model="ruleForm.shipOwnerCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人地址(中文)">
                                    <el-input v-model="ruleForm.ownerAddressCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶管理者(中文)">
                                    <el-input v-model="ruleForm.shipManagerCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人(英文)">
                                    <el-input v-model="ruleForm.shipOwnerEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人地址(英文)">
                                    <el-input v-model="ruleForm.ownerAddressEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶管理者(英文)">
                                    <el-input v-model="ruleForm.shipManagerEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船厂中文">
                                    <el-input v-model="ruleForm.builderCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶建造地址中文">
                                    <el-input v-model="ruleForm.shipBuildAddrCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船管地址(中文)">
                                    <el-input v-model="ruleForm.shipManagerAddressCn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船厂英文">
                                    <el-input v-model="ruleForm.builderEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶建造地址英文">
                                    <el-input v-model="ruleForm.shipBuildAddrEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船管地址(英文)">
                                    <el-input v-model="ruleForm.shipManagerAddressEn" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="建造日期">
                                    <div class="sel-inner">
                                        <el-date-picker
                                            v-model="ruleForm.dateBuild"
                                            style="width:100%"   
                                            type="date" 
                                            value-format="yyyy-MM-dd"
                                            :placeholder="isUpdate ? '' : '选择日期'"
                                        >
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船舶所有人地址生效日期">
                                    <el-input v-model="ruleForm.ownerDateOfEffect" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col style="width:33%">
                                <el-form-item label="船管地址生效日期">
                                    <el-input v-model="ruleForm.shipManagerDateOfEffect" :placeholder="isUpdate ? '' : '请输入'" clearable :readonly="isUpdate" ></el-input>
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
            'shipManag',
            'vesselId',
        ],
        data() {
            return {
                addOrEdit : '',
                isUpdate: false,
                heightInner: '',
                heightScreen: '',
                ruleForm:{
                    id:"",
                    imo:"",
                    mmsi:"",
                    carrier:"",
                    nameEn:"", //船舶英文名
                    nameCn:"", //船舶中文名
                    shipType:"", //船舶类型
                    callSign:"",  //呼号
                    flagName:"",  //船旗
                    homePort:"",  //船籍港
                    length:"",  //船长（米) double
                    breadth:"",  //船宽（米）double
                    depth:"",  //船深（米）double
                    avgDraft:"",  //平均吃水（米）double
                    fullLoaded:"",  //满载吃水（米）double
                    gt:"",  //总吨（吨）double
                    nt:"",  //净吨（吨）double
                    dwt:"",  //"载重吨（吨）double
                    carPort:"",  //车位（位）int
                    passSpa:"",  //客位（位）int
                    shipContainerNum:"",  //箱量（箱) int
                    builderCn:"",  //船厂中文名
                    builderEn:"",  //船厂英文名
                    dateBuild:"",  //建造日期
                    shipBuildAddrCn:"",  //建造地址中文
                    shipBuildAddrEn:"",  //建造地址英文
                    ismManager:"",  //ism管理
                    ismAddress:"",  //ism管理地址
                    ismDateEofEffect:"",  //ism生效日期
                    shipOwnerEn:"",  ///船舶所有人英文
                    shipOwnerCn:"",  //运营方/船舶所有人中文
                    ownerLegalPerson:"",  //法人
                    fox:"",  //传真
                    call:"",  //联系方式
                    callNight:"",  //联系方式（night）
                    ownerAddressEn:"",  //船舶所有人地址英文
                    ownerAddressCn:"",  //船舶所有人地址中文
                    ownerDateOfEffect:"",  //生效日期
                    shipManagerEn:"",  //船舶管理者英文
                    shipManagerCn:"",  //船舶管理者中文
                    shipManagerAddressEn:"",  //船管地址英文
                    shipManagerAddressCn:"",  //船管地址中文
                    shipManagerDateOfEffect:"",  //生效日期
                    delFlag:"", 
                    classIfICationSociety:"", //协会社 
                    dateKeelLaid:"", //龙骨安放时间
                    createTime:"",
                    updateTime:"", 
                    updateUser:""
                },
                isLoading: true, //isLoading
                shipDate: [ //类型
                    {
                        value: '集装箱船',
                        label: '集装箱船'
                    },
                    {
                        value: '飞翼',
                        label: '飞翼'
                    },
                    {
                        value: '渔船',
                        label: '渔船'
                    },
                    {
                        value: '拖带船',
                        label: '拖带船'
                    },
                    {
                        value: '作业船',
                        label: '作业船'
                    },
                    {
                        value: '帆船',
                        label: '帆船'
                    },
                    {
                        value: '休闲游艇',
                        label: '休闲游艇'
                    },
                    {
                        value: '高速船',
                        label: '高速船'
                    },
                    {
                        value: '引航船',
                        label: '引航船'
                    },
                    {
                        value: '搜救船',
                        label: '搜救船'
                    },
                    {
                        value: '拖轮',
                        label: '拖轮'
                    },
                    {
                        value: '港口供应船',
                        label: '港口供应船'
                    },
                    {
                        value: '执法船',
                        label: '执法船'
                    },
                    {
                        value: '医疗运输船',
                        label: '医疗运输船'
                    },
                    {
                        value: '客船',
                        label: '客船'
                    },
                    {
                        value: '货船',
                        label: '货船'
                    },
                    {
                        value: '油船',
                        label: '油船'
                    },
                    {
                        value: '其它类型',
                        label: '其它类型'
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
                        this.ruleForm.id = res.data.content.id
                        this.ruleForm.imo = res.data.content.imo
                        this.ruleForm.mmsi = res.data.content.mmsi
                        this.ruleForm.carrier = res.data.content.carrier
                        this.ruleForm.nameEn = res.data.content.nameEn
                        this.ruleForm.nameCn = res.data.content.nameCn
                        this.ruleForm.shipType = res.data.content.shipType
                        this.ruleForm.callSign = res.data.content.callSign
                        this.ruleForm.flagName = res.data.content.flagName
                        this.ruleForm.homePort = res.data.content.homePort
                        this.ruleForm.length = res.data.content.length
                        this.ruleForm.breadth = res.data.content.breadth
                        this.ruleForm.depth = res.data.content.depth
                        this.ruleForm.avgDraft = res.data.content.avgDraft
                        this.ruleForm.fullLoaded = res.data.content.fullLoaded
                        this.ruleForm.gt = res.data.content.gt
                        this.ruleForm.nt = res.data.content.nt
                        this.ruleForm.dwt = res.data.content.dwt
                        this.ruleForm.carPort = res.data.content.carPort
                        this.ruleForm.passSpa = res.data.content.passSpa
                        this.ruleForm.shipContainerNum = res.data.content.shipContainerNum
                        this.ruleForm.builderCn = res.data.content.builderCn
                        this.ruleForm.builderEn = res.data.content.builderEn
                        this.ruleForm.dateBuild = res.data.content.dateBuild
                        this.ruleForm.shipBuildAddrCn = res.data.content.shipBuildAddrCn
                        this.ruleForm.shipBuildAddrEn = res.data.content.shipBuildAddrEn
                        this.ruleForm.ismManager = res.data.content.ismManager
                        this.ruleForm.ismAddress = res.data.content.ismAddress
                        this.ruleForm.ismDateEofEffect = res.data.content.ismDateEofEffect
                        this.ruleForm.shipOwnerEn = res.data.content.shipOwnerEn
                        this.ruleForm.shipOwnerCn = res.data.content.shipOwnerCn
                        this.ruleForm.ownerLegalPerson = res.data.content.ownerLegalPerson
                        this.ruleForm.fox = res.data.content.fox
                        this.ruleForm.call = res.data.content.call
                        this.ruleForm.callNight = res.data.content.callNight
                        this.ruleForm.ownerAddressEn = res.data.content.ownerAddressEn
                        this.ruleForm.ownerAddressCn = res.data.content.ownerAddressCn
                        this.ruleForm.ownerDateOfEffect = res.data.content.ownerDateOfEffect
                        this.ruleForm.shipManagerEn = res.data.content.shipManagerEn
                        this.ruleForm.shipManagerCn = res.data.content.shipManagerCn
                        this.ruleForm.shipManagerAddressEn = res.data.content.shipManagerAddressEn
                        this.ruleForm.shipManagerAddressCn = res.data.content.shipManagerAddressCn
                        this.ruleForm.shipManagerDateOfEffect = res.data.content.shipManagerDateOfEffect
                        this.ruleForm.delFlag = res.data.content.delFlag
                        this.ruleForm.classIfICationSociety = res.data.content.classIfICationSociety
                        this.ruleForm.dateKeelLaid = res.data.content.dateKeelLaid
                        this.ruleForm.createTime = res.data.content.createTime
                        this.ruleForm.updateTime = res.data.content.updateTime
                        this.ruleForm.updateUser = res.data.content.updateUser
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
                this.addOrEdit = '修改'
                this.isUpdate = false
                this.getShipInfor()
            }
            var that = this
            that.heightScreen = document.body.clientHeight;
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight 
                    that.heightScreen = window.screenHeight
                })();
            }
        },
        watch:{
            heightScreen (val) {
               var height = val - 80
               this.heightInner = height  + 'px'
            }    
        },
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
    .scrollP{
        overflow-y: auto;
        height:'400px'
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