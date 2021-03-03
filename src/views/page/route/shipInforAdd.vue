<template>
    <div class="routeAdd">
        <el-form
            label-position="right"
            label-width="80px"
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
            <ul class="tableFormUl">
                <li>
                    <el-form-item
                        prop="week"
                        label="周次" 
                        :rules="[{ required: true, message: '请输入周次', trigger: 'blur'}]"
                    >
                        <el-select
                            v-model="ruleForm.yearWeek"
                            style="width:100%;"
                            placeholder="请选择"
                            default-first-option
                            :disabled="isMatchType == 0"
                            @change="changeWeek"
                        >
                            <el-option
                                v-for="item in weekList"
                                :key="item.yearWeek"
                                :label="item.yearWeek"
                                :value="item.yearWeek"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="vessel"
                        label="船名"
                        :rules="[{ required: true, message: '请输入船名', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.vessel" :placeholder="isMatchType == 0 ? '' : '请输入'" clearable @change="changeVessle" :readonly="isMatchType == 0" type="text"></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="voyage"
                        label="航次"
                        :rules="[{ required: true, message: '请输入航次', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.voyage" :placeholder="isMatchType == 0 ? '' : '请输入'" clearable :readonly="isMatchType == 0"></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="standerVesselName"
                        label="标准船名"
                        :rules="[{ required: true, message: '请输入标准船名', trigger: 'blur'}]"
                    >
                        <el-select
                            remote  
                            filterable  
                            v-model="ruleForm.standerVesselName"
                            placeholder="请输入并选择"
                            :remote-method="vesselRemote"
                            @focus="vesselFocus"
                            @change="vesselChange"
                            style="width:100%"
                        >
                            <el-option
                                v-for="item in standardList"
                                :key="item.id"
                                :label="item.vessel"
                                :value="item.vessel"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </li>
                <li class="teshu">
                    <el-form-item
                        prop="mmsi"
                        label="MMSI"
                    >
                        <el-input v-model="ruleForm.mmsi" placeholder="" clearable readonly></el-input>
                    </el-form-item>
                </li>
                <li class="teshu">
                    <el-form-item
                        prop="imo"
                        label="IMO"
                    >
                        <el-input v-model="ruleForm.imo" placeholder="" clearable readonly></el-input>
                    </el-form-item>
                </li>
                <li class="teshu">
                    <el-form-item
                        prop="operator"
                        label="母船"
                    >
                        <el-input v-model="ruleForm.operator" placeholder="" clearable readonly></el-input>
                    </el-form-item>
                </li>
                <li>
                    <el-form-item
                        prop="operator"
                        label="运营方"
                    >
                        <el-input v-model="ruleForm.operator" placeholder="" clearable readonly></el-input>
                    </el-form-item>
                </li>
                <!-- v-if="isShowAdd" 之前判断‘‘标准船名未找到’’是否要显示 后期取消了这个判断 但是要有的话也可以加上这个判断-->
                <li class="saveLi">
                    <p>标准船名未找到？<span style="color:#3bafda;cursor: pointer;" @click="addShipName()">立即添加</span></p>
                </li>
                <li class="save">
                    <el-button size="small" class="saveBtn" @click="saveClick('ruleForm')">保存</el-button>
                </li>
                <li style="clear:both"></li>
            </ul>
        </el-form>
        <el-dialog
            class="shipDetail"
            :visible.sync="InforShipDetail"
            v-if="InforShipDetail"
            width="1100px"
            top="50px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <shipDetail
                ref="shipDetail"
                :vesselInforName="vesselInforName"
                :shipId="shipId"
                @closeShipInfor="closeShipInfor"
                @UpdatShip="UpdatShip"
            >
            </shipDetail>
        </el-dialog>
    </div>
</template>

<script>
    import qs from "qs";
    import shipDetail from "./informateShip.vue";
    export default {
        props:[
            'shipInforStatus',
            'isMatchType',
            'shipRow',
            'shipScac'
        ],
        data() {
            return {
                addOrEdit : '',
                InforShipDetail: false,
                vesselInforName: '',
                shipId: '',
                ruleForm : {
                    id: '', //船舶航次表id
                    vessel : '', //船名
                    voyage : '', //航次
                    shipId: '', //标准船名id
                    standerVesselName : '', //标准船名
                    mmsi: '',//mmsi
                    imo: '',//imo
                    carrier: '',//母船
                    operator: '',//运营方
                    createTime: '', //创建时间
                    updateTime: '', //操作时间
                    week: '',//周次
                    year: '', //年份
                    yearWeek: '', //周次加年
                },
                currentYear: '',
                isShowAdd: false,
                standardList: [], //标准船名
                weekList: [], //周次
                // isStanderVessel: '0', //标准船名是显示   '0' input 框 '1'匹配到了 下拉框  '2' 未匹配到下拉框
            }
        },
        components: {
            shipDetail,
        },
        methods: {
            //保存
            async saveClick(ruleForm){
                try{
                    var now = new Date()
                    var year=now.getFullYear(); 
                    var month=('00' + (now.getMonth()+1)).slice(-2); 
                    var date=('00' + now.getDate()).slice(-2); 
                    var hour=('00' + now.getHours()).slice(-2); 
                    var minute=('00' + now.getMinutes()).slice(-2); 
                    var second=('00' + now.getSeconds()).slice(-2); 
                    if(!this.ruleForm.createTime){
                        this.ruleForm.createTime =  year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                    }
                    this.ruleForm.updateTime =  year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;

                    //在这里判断是否在其他航线下存在此船名航次

                    this.$axios.get(this.commonJs.localUrl + `/schedules/route/searchExistVellesVoy?shipId=${this.ruleForm.shipId}&voyage=${this.ruleForm.voyage}&scac=${this.shipScac}&id=${this.ruleForm.id}&year=${this.ruleForm.year}`,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            if(res.data.content.length > 0 ){ //说明有航线存在此船名航次
                                if(res.data.content.length == 1){
                                    this.$message({
                                        type: "error",
                                        message: `当前船名航次在${res.data.content[0]}航线下已存在，删除后才可继续添加！`,
                                    })
                                }else{
                                    var routeName = res.data.content.join(',')
                                    this.$message({
                                        type: "error",
                                        message: `当前船名航次在${routeName}等航线下已存在，删除后才可继续添加！`,
                                    })
                                }
                            }else{
                                this.$emit('shipByValue', this.ruleForm,ruleForm)
                            }
                        }else{
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                    })
                }catch(e){}
            },
            resetFrom(){ //清空所有的选择
                this.ruleForm.week = ''
                this.ruleForm.year = ''
                this.ruleForm.yearWeek = ''
                this.ruleForm.vessel = ''
                this.ruleForm.voyage = ''
                this.ruleForm.shipId = '' //船名id
                this.ruleForm.standerVesselName = '' //船名
                this.ruleForm.mmsi = '' //mmsi
                this.ruleForm.imo = '' //imo
                this.ruleForm.carrier = '' //母船
                this.ruleForm.operator = '' //运营方
                this.standardList = []
            },

            //标准船名清空必要信息
            emptyInfor(){
                this.standardList = [] //清空标准船名列表
                this.ruleForm.shipId = '' //清空标准船名id
                this.ruleForm.mmsi = '' //清空mmsi
                this.ruleForm.imo = '' //清空imo
                this.ruleForm.carrier = '' //清空母船
                this.ruleForm.operator = '' //清空运营方
            },
            //改变船名
            changeVessle(val){
                //说明当前改变了船名 若是改变了船名 而标准船名也有选择 则情况
                this.isShowAdd = false
                this.ruleForm.standerVesselName = '' //船名
                this.emptyInfor() //清空标准船名的信息

                if(val == ''){ //说明用户没有输入船名

                }else{ //用户有改变值 调接口
                    this.$axios.get(this.commonJs.localUrl +`/schedules/vessel/searchStanderVessel?flag=0&officeVessel=${this.ruleForm.vessel}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.standardList = res.data.content
                            if(res.data.content.length <= 0){ //当前没有匹配到标准船名
                                this.isShowAdd = true
                                this.emptyInfor() //清空标准船名的信息
                            }else{ //当前有匹配到标准船名 默认第一个
                                this.isShowAdd = false
                                //默认大家都是第一个
                                this.ruleForm.shipId = res.data.content[0].id //船名
                                this.ruleForm.standerVesselName = res.data.content[0].vessel //船名
                                this.ruleForm.mmsi = res.data.content[0].mmsi //mmsi
                                this.ruleForm.imo = res.data.content[0].imo //imo
                                this.ruleForm.carrier = res.data.content[0].carrier //母船
                                this.ruleForm.operator = res.data.content[0].operator //运营方
                            }
                        }
                    })
                }
            },
            //匹配标准船名vesselRemote
            vesselRemote(value){
                //说明在远程搜索
                this.$axios.get(this.commonJs.localUrl +`/schedules/vessel/getStanderVesselByShip?flag=1&officeVessel=${value}`,
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
            },
            //匹配到的标准船名focus
            vesselFocus(){
                this.$axios.get(this.commonJs.localUrl +`/schedules/vessel/getStanderVesselByShip?flag=1`,
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
            },
            //匹配到的标准船名change
            vesselChange(val){
                if(val){
                    for (let i = 0; i < this.standardList.length; i++) {
                        if(val == this.standardList[i].vessel){
                            this.ruleForm.shipId = this.standardList[i].id //标准船名id
                            this.ruleForm.mmsi = this.standardList[i].mmsi //mmsi
                            this.ruleForm.imo = this.standardList[i].imo //imo
                            this.ruleForm.carrier = this.standardList[i].carrier //母船
                            this.ruleForm.operator = this.standardList[i].operator //运营方
                        }
                    }
                }else{
                    this.emptyInfor() //清空标准船名的信息
                }
            },

            //标准船名未找到 立即添加标准船名
            addShipName(){
                this.InforShipDetail = true
                this.vesselInforName = '新增'
            },
            closeShipInfor(){
                this.InforShipDetail = false
            },
            //更新数据
            UpdatShip(){
                this.vesselFocus()
            },
            //关闭事件
            closeClick(){
                this.$emit('closeShipClick');
            },
            //获取今年有多少周
            weekNumber() {
                var yearWeek = this.commonJs.getYearWeeks(new Date().getFullYear())
                var todayWeek = this.commonJs.getTodayWeek()
                this.weekList = this.commonJs.getWeekly(todayWeek,yearWeek)     
            },
            //改变周次
            changeWeek(val){
                for (let i = 0; i < this.weekList.length; i++) {
                    if(this.weekList[i].yearWeek == val){
                        this.ruleForm.week =  this.weekList[i].week
                        this.ruleForm.year =  this.weekList[i].year
                    }
                    
                }
            },
        },
        mounted() {
            var d1 = new Date()
            this.currentYear = d1.getFullYear()
            this.weekNumber()
            if(this.shipInforStatus  === '新增'){
                this.addOrEdit = '新增';
            }else{
                this.addOrEdit = '修改';
                this.ruleForm = JSON.parse(JSON.stringify(this.shipRow))
                if(this.isMatchType == 0){ //航线 用的当前年
                    this.ruleForm.yearWeek = this.currentYear + '-' + this.ruleForm.week
                }else{ //船舶 用的数据返回的年
                    this.ruleForm.yearWeek = this.ruleForm.year + '-' + this.ruleForm.week
                }
                // if(this.ruleForm.standerVesselName){ //说明当前有标准船名 或者 当前是航线
                //     //我这个时候就是 input框
                //     this.isStanderVessel = '0'
                // }else{
                //     //调接口 根据船名匹配标准船名的接口
                //     this.vesselFocus()
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-dialog__body{
        padding: 10px !important;
    }
    .routeAdd {
        position: relative;
        overflow: hidden;
    }
    .shipDetail{
        overflow: hidden;
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
            display: inline-block;
            width: 300px;
        }
        li.teshu{
            width: 200px;
        }
    }
    li.saveLi{
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
    li.save {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: rgba(4, 153, 255, 1);
            margin-bottom: 10px;
            cursor: pointer;
        }
    }

</style>