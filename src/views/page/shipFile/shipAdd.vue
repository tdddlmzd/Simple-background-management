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
            <div class="scrollP">
                <ul class="routeUl">
                    <li class="routeLi">
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="船名">
                                    <el-input v-model="ruleForm.nameEn" :readonly="isUpdate" placeholder="" clearable></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item
                                    prop="standardNameEn"
                                    label="标准船名"
                                    :rules="[{ required: true, message: '请输入标准船名', trigger: 'blur'}]"
                                >
                                    <el-select
                                        remote  
                                        filterable
                                        clearable
                                        v-model="ruleForm.standardNameEn"
                                        placeholder="标准船名(IMO)"
                                        :remote-method="vesselRemote"
                                        @focus="vesselFocus"
                                        @change="vesselChange"
                                        style="width:100%"
                                    >
                                        <el-option
                                            v-for="item in standardList"
                                            :key="item.id"
                                            :label="item.nameEn"
                                            :value="item.nameEn"
                                            :title="item.nameEn + '(' + item.imo +')'"
                                        >
                                            {{item.nameEn + '(' + item.imo +')'}}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="IMO">
                                    <el-input v-model="ruleForm.imo" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="MMSI">
                                    <el-input v-model="ruleForm.mmsi" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="呼号">
                                    <el-input v-model="ruleForm.callSign" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="船旗">
                                    <el-input v-model="ruleForm.flagName" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="载重吨">
                                    <el-input v-model="ruleForm.dwt" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="width:33%">
                                <el-form-item label="箱量">
                                    <el-input v-model="ruleForm.shipContainerNum" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="建造日期">
                                    <el-input v-model="ruleForm.dateBuild" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col style="width:33%">
                                <el-form-item label="运营方">
                                    <el-input v-model="ruleForm.shipOwnerCn" placeholder="" :readonly="isUpdate" :disabled="isUpdate"></el-input>
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
            'origin'
        ],
        data() {
            return {
                addOrEdit : '',
                isUpdate: true,
                ruleForm:{
                    id:"",
                    nameEn:"",//船名
                    standardNameEn:"",//标准船名
                    imo:"",//IMO
                    mmsi:"",//MMSI
                    callSign:"",//呼号
                    flagName:"",//船旗
                    dwt:"",//载重吨
                    shipContainerNum:"",//箱量
                    dateBuild:"",//建造日期
                    shipOwnerCn:"",//运营方
                },
                standardList: [], //标准船名
                isLoading: true, //isLoading
            }
        },
        components: {
            loading
        },
        methods: {
            //匹配标准船名
            vesselRemote(value){
                //说明在远程搜索
                this.$axios.get(this.commonJs.localUrl +`/schedules/baseVessel/getVesselByName?name=${value}`,
                {//船期船舶
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.standardList = res.data.content
                    }
                })
            },
            //匹配到的标准船名focus
            vesselFocus(value){
                if(this.ruleForm.standardNameEn != ''){
                    this.$axios.get(this.commonJs.localUrl +`/schedules/baseVessel/getVesselByName?name=${this.ruleForm.standardNameEn}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.standardList = res.data.content
                        }
                    })
                }else{
                    this.emptyInfor() //清空标准船名的信息
                }
            },
            //匹配到的标准船名change
            vesselChange(val){
                if(val){
                    for (let i = 0; i < this.standardList.length; i++) {
                        if(val == this.standardList[i].nameEn){
                            this.ruleForm.id = this.standardList[i].id //id
                            this.ruleForm.imo = this.standardList[i].imo//IMO
                            this.ruleForm.mmsi = this.standardList[i].mmsi//MMSI
                            this.ruleForm.callSign = this.standardList[i].callSign//呼号
                            this.ruleForm.flagName = this.standardList[i].flagName//船旗
                            this.ruleForm.dwt = this.standardList[i].dwt//载重吨
                            this.ruleForm.shipContainerNum = this.standardList[i].shipContainerNum//箱量
                            this.ruleForm.dateBuild = this.standardList[i].dateBuild//建造日期
                            this.ruleForm.shipOwnerCn = this.standardList[i].shipOwnerCn//运营方
                        }
                    }
                }else{
                    this.emptyInfor() //清空标准船名的信息
                }
            },
            //标准船名清空必要信息
            emptyInfor(){
                this.standardList = [] //清空标准船名列表
                this.ruleForm.id = '' //清空id
                this.ruleForm.imo = ''//清空IMO
                this.ruleForm.mmsi = ''//清空MMSI
                this.ruleForm.callSign = ''//清空呼号
                this.ruleForm.flagName = ''//清空船旗
                this.ruleForm.dwt = ''//清空载重吨
                this.ruleForm.shipContainerNum = ''//清空箱量
                this.ruleForm.dateBuild = ''//清空建造日期
                this.ruleForm.shipOwnerCn = ''//清空运营方
            },
            //初始化调接口
            getShipInfor(){
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/baseVessel/vesselDetails?id=${this.vesselId
                }&origin=${this.origin}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        this.ruleForm.nameEn = res.data.content.nameEn //船名
                        this.ruleForm.standardNameEn = res.data.content.standardNameEn //标准船名
                        this.ruleForm.imo = res.data.content.imo//IMO
                        this.ruleForm.mmsi = res.data.content.mmsi//MMSI
                        this.ruleForm.callSign = res.data.content.callSign//呼号
                        this.ruleForm.flagName = res.data.content.flagName//船旗
                        this.ruleForm.dwt = res.data.content.dwt//载重吨
                        this.ruleForm.shipContainerNum = res.data.content.shipContainerNum//箱量
                        this.ruleForm.dateBuild = res.data.content.dateBuild//建造日期
                        this.ruleForm.shipOwnerCn = res.data.content.shipOwnerCn//运营方
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
            saveClick(ruleForm){
                this.$refs[ruleForm].validate((valid)=>{
                    if(valid){
                        if(this.addOrEdit == '修改'){
                            this.isLoading = true
                            this.$axios.get(this.commonJs.localUrl + `/schedules/baseVessel/matchAdd?id=${this.vesselId
                            }&shipId=${this.ruleForm.id
                            }&origin=${this.origin
                            }`,{
                                headers: {
                                    Authorization: `Bearer ${this.getAuthorization()}`,
                                    AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                                }
                            }).then(res =>{
                                if(res.data.status == 1){
                                    this.$emit("updatShip")
                                    this.$message({
                                        type: "success",
                                        message: '保存成功'
                                    });
                                    this.closeClick();
                                }else{
                                    this.$message({
                                        type: "error",
                                        message: "数据加载失败 请重新加载页面"
                                    });
                                }
                                this.isLoading = false
                            })
                        }
                    }else{
                        return false
                    }
                });
            },
            //关闭事件
            closeClick(){
                this.$emit('closeShipInfor')
            },
        },
        mounted() {
            if(this.shipManag  === '修改'){
                this.addOrEdit = '修改'
                this.getShipInfor()
            }
        },
        watch:{ 
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