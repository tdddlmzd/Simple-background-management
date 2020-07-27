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
                <li class="eleAddFrom">
                    <el-form-item
                        prop="cabinName"
                        label="共舱组名称"
                        :rules="[{ required: true, message: '请输入共舱组名称', trigger: 'blur'}]"
                    >
                        <el-input v-model="ruleForm.cabinName" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                </li>
                <li class="eleAddFrom">
                    <el-form-item
                        prop="portCn"
                        label="常规共舱航线"
                    >
                        <!-- <el-input v-model="ruleForm.portCn" placeholder="请输入" clearable></el-input> -->
                        <div class="portCnUL">
                            <div class="portCnDiv">
                                <ul class="portCnDivRoute">
                                    <li
                                        v-for="(item,index) in commonArry"
                                        :key="index"
                                        ref="commonCabinLi"
                                        class="routineLi"
                                        v-if="index <= 4"
                                    >
                                        <img src="@/assets/images/route/newLittle.png" class="newILittdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="item.value">{{item.value}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click.prevent="deleRoutine(item,index)"></i>
                                    </li>
                                </ul>
                                <span class="elJian" @click="comSelecticon" v-show="comSelect" icon="el-icon-arrow-down">
                                    <i class="el-icon-arrow-down"></i>
                                </span>
                                <ul class="selecticonList" v-if="comUpselect">
                                    <li
                                        v-for="(item,index) in commonArry"
                                        :key="index"
                                        ref="commonCabinLi"
                                        class="routineLi"
                                        v-if="index > 4"
                                    >
                                        <img src="@/assets/images/route/newLittle.png" class="newILittdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="item.value">{{item.value}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click.prevent="deleRoutine(item,index)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <span style="marginLeft:5px;vertical-align:top;color:#3bafda;cursor: pointer" @click.prevent="addRoutine">
                            <!-- <i class="el-icon-plus" style="color:#3bafda;cursor: pointer"></i> -->
                            添加
                        </span>
                    </el-form-item>
                </li>
                <li class="eleAddFrom">
                    <el-form-item
                        prop="portCn"
                        label="临时共舱航线"
                    >
                        <div class="portCnUL">
                            <div class="portCnDiv">
                                <ul class="portCnDivRoute">
                                    <li
                                        v-for="(item,index) in ovtArry"
                                        :key="index"
                                        :title="item.value"
                                        v-if="index <= 4"
                                        ref="commonCabinLi"
                                        class="routesLi"
                                    >
                                        <img src="@/assets/images/route/newLittle.png" class="newILittdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="item.value">{{item.value}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click.prevent="deleRoutes(item,index)"></i>
                                    </li>
                                </ul>
                                <span class="elJian" @click="temSelecticon" v-show="temSelect" icon="el-icon-arrow-down">
                                    <i class="el-icon-arrow-down"></i>
                                </span>
                                <ul class="selecticonList" v-if="temUpselect">
                                    <li
                                        v-for="(item,index) in ovtArry"
                                        :key="index"
                                        :title="item.value"
                                        v-if="index > 4"
                                        ref="commonCabinLi"
                                        class="routesLi"
                                    >
                                        <img src="@/assets/images/route/newLittle.png" class="newILittdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="item.value">{{item.value}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click.prevent="deleRoutes(item,index)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- <span style="marginLeft:5px;vertical-align:top;color:#3bafda;cursor: pointer" @click.prevent="addRoutes">
                            添加
                        </span> -->
                    </el-form-item>
                </li>
                <li class="eleAddFrom">
                    <el-form-item
                        prop="portCn"
                        label="新增常规共舱航线"
                    >
                        <div class="portCnUL">
                            <div class="portCnDiv">
                                <ul class="portCnDivRoute">
                                    <li
                                        v-for="(item,index) in temp"
                                        :key="index"
                                        :title="item.value"
                                        v-if="index <= 4"
                                        ref="commonCabinLi"
                                        class="routesLi"
                                    >
                                        <img src="@/assets/images/route/newLittle.png" class="newILittdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="item.value">{{item.value}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click.prevent="deleSelect(item,index)"></i>
                                    </li>
                                </ul>
                                <span class="elJian" @click="addSelecticon" v-show="addSelect" icon="el-icon-arrow-down">
                                    <i class="el-icon-arrow-down"></i>
                                </span>
                                <ul class="selecticonList" v-if="addUpselect">
                                    <li
                                        v-for="(item,index) in temp"
                                        :key="index"
                                        :title="item.value"
                                        v-if="index > 4"
                                        ref="commonCabinLi"
                                        class="routesLi"
                                    >
                                        <img src="@/assets/images/route/newLittle.png" class="newILittdent" ref="ident" v-if="item.isNew === 1">
                                        <span class="spanLI" :title="item.value">{{item.value}}</span>
                                        <i class="el-icon-error delec" style="color:red;cursor: pointer" @click.prevent="deleSelect(item,index)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-form-item>
                </li>
                <li class="eleAddFrom">
                    <el-form-item
                        prop="portCn"
                        label="标准化航线"
                    >
                        <el-input v-model="ruleForm.standardRoute" :readonly=true></el-input>
                    </el-form-item>
                </li>
                <li class="eleAddFrom">
                    <el-form-item
                        prop="portCn"
                        label="历史共舱航线"
                    >
                        <el-input v-model="history" :readonly=true></el-input>
                    </el-form-item>
                </li>
                <li class="saveLi">
                    <el-button size="small" class="clicksColor" @click="updateSaveClick('ruleForm')">确认</el-button>
                </li>
                <li style="clear:both"></li>
            </ul>
        </el-form>
        <el-dialog
            class="dialogInner"
            :visible.sync="dialogInner"
            v-if="dialogInner"
            width="500px"
            top="230px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <addInnerPort
                :dialogTex="dialogTex"
                @closeClick="closeClick"
                @conveyInfor='conveyInfor'
                :cabinId="cabinId"
                ref="dialogTex"
            >
            </addInnerPort>
        </el-dialog>
    </div>
</template>

<script>
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    import qs from "qs";
    import loading from "@/components/Loading/loading.vue";
    import addInnerPort from "./addInnerPort.vue";
    export default {
        props:[
            'innerStatus',
            'rowId',
            'isNewListFlag'
        ],
        data() {
            return {
                addOrEdit : '',
                dialogInner: false,
                dialogTex: '',
                isLoading: true,
                comSelect: false, //常用共舱下拉框是否显示
                comUpselect: false, //常用共舱下拉框是否显示
                temSelect: false, //临时共舱下拉框是否显示
                temUpselect: false, //临时共舱下拉框是否显示
                addSelect: false, //新增常规共舱下拉框是否显示
                addUpselect: false, //新增常规共舱下拉框是否显示
                cabinId: '',
                ruleForm:{
                    cabinName: '', //共舱名
                    standardRoute: '', //标准化航线
                },
                commonArry: [], //常规共舱
                ovtArry: [], //临时共舱
                temp: [], //新增常规共舱航线
                delTemp: [], //删除 新增常规共舱航线
                delCommonIds: [], //删除的常规共舱
                delOvtIds: [], //删除的临时共舱
                history: '', //历史共舱航线
                currentYear: '',
                isStand: false,
            }
        },
        methods: {
            //取详情页信息
            pickDetails(){
                this.$axios.get(this.commonJs.localUrl + `/schedules/cabin/details?id=${this.rowId}&isNewListFlag=${this.isNewListFlag}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.ruleForm.cabinName = res.data.content.cabinName //共舱名
                            this.ruleForm.standardRoute = res.data.content.commonIds.length > 0 ? res.data.content.standardRoute : '' //标准化航线 暂时不用掉接口
                            this.history = res.data.content.history //历史共舱

                            this.commonArry = res.data.content.commonIds //常规共舱
                            for (let i = 0; i < this.commonArry.length; i++) {
                                let common = this.commonArry[i]
                                //处理页面显示
                                common.value = common.carrier + '(' + common.routeCode + ')' + ' ' + this.currentYear + '-' + common.affectWeek
                                // common.delFlag = ''
                            }

                            this.ovtArry =  res.data.content.ovtIds //临时共舱
                            for (let j = 0; j < this.ovtArry.length; j++) {
                                let ovt = this.ovtArry[j]
                                //处理页面显示
                                ovt.value = ovt.carrier + '(' + ovt.routeCode + ')' + ' ' + this.currentYear + '-' + ovt.affectWeek
                                // ovt.delFlag = ''
                            }

                            this.temp = res.data.content.temp //新增常规共舱航线
                            for (let j = 0; j < this.temp.length; j++) {
                                let tem = this.temp[j]
                                //处理页面显示
                                tem.value = tem.carrier + '(' + tem.routeCode + ')' + ' ' + this.currentYear + '-' + tem.affectWeek
                            }

                            setTimeout(()=>{
                                this.isStand = true
                            },500)
                            this.isLoading = false
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            this.isLoading = false
                        }
                });
            },
            //取标准化航线
            standRoute(id){
                this.$axios.get(this.commonJs.localUrl + `/schedules/cabin/getStandardRoute?ids=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.ruleForm.standardRoute = res.data.content
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                            this.isLoading = false;
                        }
                });
            },
            //新增修改保存
            async updateSaveClick(ruleForm){
                try{
                    let valid = await this.$refs[ruleForm].validate();
                    if(!valid) return;
                    this.isLoading = true
                    ////在这里处理 常规共舱 与  新增常规共舱重复数据问题
                    if(this.commonArry.length > 0 && this.temp.length > 0){
                        //此地方说明既有常规共舱又有新增共舱
                        for (let p = 0; p < this.commonArry.length; p++) {
                            var com = this.commonArry[p]
                            for (let q = 0; q < this.temp.length; q++) {
                                var te = this.temp[q]
                                if(com.staticId == te.staticId && com.carrier == te.carrier && com.affectWeek == te.affectWeek){
                                    this.$message({
                                        type: "error",
                                        message: "常规共舱航线与新增常规共舱航线存在重复数据"
                                    });
                                    this.isLoading = false
                                    return;
                                }
                            }
                        }
                    }

                    var commonIds = [] //最终传入后端的常规共舱数组
                    var ovtIds = [] //最终传入后端的临时共舱数组
                    var temps = [] //最终传入后端的新增常规共舱数组

                    //循环现有的commonArry 找出新增的常规共舱
                    for (let i = 0; i < this.commonArry.length; i++) {
                        if(this.commonArry[i].id){ //有id说明是旧数据 而且没有修改 不用往数组里传
                            // commonIds.push({
                            //     id: this.commonArry[i].id,
                            //     staticId:this.commonArry[i].staticId,
                            //     week:this.commonArry[i].affectWeek + '',
                            // })
                        }else{
                            commonIds.push({
                                staticId:this.commonArry[i].staticId,
                                week:this.commonArry[i].affectWeek + '',
                            })
                        }
                        
                    }
                    //循环删除的delCommonIds 既然有删除的说明都是旧数据 常规共舱
                    for (let i = 0; i < this.delCommonIds.length; i++) {
                        commonIds.push({
                            id: this.delCommonIds[i].id,
                            staticId:this.delCommonIds[i].staticId,
                            week:this.delCommonIds[i].affectWeek + '',
                            delFlag:this.delCommonIds[i].delFlag
                        })
                        
                    }

                    //循环现有的ovtArry 临时共舱
                    for (let j = 0; j < this.ovtArry.length; j++) {
                        if(this.ovtArry[j].id){
                            // ovtIds.push({
                            //     id: this.ovtArry[j].id,
                            //     staticId:this.ovtArry[j].staticId,
                            //     week:this.ovtArry[j].affectWeek + '',
                            // })
                        }else{
                            ovtIds.push({
                                staticId:this.ovtArry[j].staticId,
                                week:this.ovtArry[j].affectWeek + '',
                            })
                        }
                        
                    }
                    //循环现有的delOvtIds 临时共舱 有删除说明都是旧数据
                    for (let j = 0; j < this.delOvtIds.length; j++) {
                        ovtIds.push({
                            id: this.delOvtIds[j].id,
                            staticId:this.delOvtIds[j].staticId,
                            week:this.delOvtIds[j].affectWeek + '',
                            delFlag:this.delOvtIds[j].delFlag
                        })
                        
                    }
                    // 循环现有的temp 新增常规共舱航线
                    for (let j = 0; j < this.temp.length; j++) {
                        if(this.temp[j].id){
                            // ovtIds.push({
                            //     id: this.ovtArry[j].id,
                            //     staticId:this.ovtArry[j].staticId,
                            //     week:this.ovtArry[j].affectWeek + '',
                            // })
                        }else{
                            temps.push({
                                staticId:this.temp[j].staticId,
                                week:this.temp[j].affectWeek + '',
                            })
                        }
                        
                    }
                    //循环现有的deltemp 临时共舱 有删除说明都是旧数据
                    for (let j = 0; j < this.delTemp.length; j++) {
                        temps.push({
                            id: this.delTemp[j].id,
                            staticId:this.delTemp[j].staticId,
                            week:this.delTemp[j].affectWeek + '',
                            delFlag:this.delTemp[j].delFlag
                        })
                    }
                    let query = {
                        cabinName: this.ruleForm.cabinName,
                        standardRoute: this.commonArry.length > 0 ? this.ruleForm.standardRoute : '',
                        commonIds : commonIds,
                        ovtIds: ovtIds,
                        temp: temps,
                    }
                    if(this.addOrEdit == '新增'){
                        this.$axios.post(this.commonJs.localUrl + `/schedules/cabin/add` , query,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                        }).then(res=>{
                            if(res.data.status == 1){
                                this.handleCloseClick()
                                this.$message({
                                    type: "success",
                                    message: "保存成功"
                                });
                                this.$emit("innerUpdat")
                            } else if (res.data.status == 3) {
                                    this.$message({
                                        type: "error",
                                        message: "共舱组名称已存在"
                                    });
                                    this.isLoading = false
                                    return;
                            }else{
                                this.$message({
                                    type: "error",
                                    message: "数据保存失败 请重新加载页面"
                                });
                                // this.isLoading = false
                            }
                        })
                    }else if(this.addOrEdit == '修改'){
                        // let uuid = this.commonJs.getUuid()
                        // try {
                        //     var that = this
                        //     //地址+端点路径，构建websocket链接地址
                        //     var socket = new SockJS(this.commonJs.websocketUrl + `/websocket`); //连接SockJS的endpoint名称为"websocket"
                        //     var stompClient = Stomp.over(socket);
                        //     stompClient.connect({}, function(frame) {
                        //         console.log(frame,'frameframe')
                        //         stompClient.subscribe(
                        //             "/user/" + uuid + "/updateOrInsertCabin",
                        //             function(response) {
                        //                 console.log(response,'response')
                        //                 that.handleCloseClick()
                        //                 that.$message({
                        //                     type: "success",
                        //                     message: "修改成功"
                        //                 });
                        //                 that.wbeScrot()
                        //             }
                        //         );
                        //     });
                        // } catch (err) {
                        //     console.log("WebSocket error!");
                        // }
                        // query['socketId'] = uuid
                        query['id'] = this.rowId
                        this.$axios.post(this.commonJs.localUrl + `/schedules/cabin/update` , query,
                        {
                            headers: {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token")
                            }
                        }).then(res=>{
                            if(res.data.status == 1){
                                this.handleCloseClick()
                                this.$message({
                                    type: "success",
                                    message: "修改成功"
                                });
                                this.$emit("innerUpdat")
                            } else if (res.data.status == 3) {
                                    this.$message({
                                        type: "error",
                                        message: "共舱组名称已存在"
                                    });
                                    this.isLoading = false
                                    return;
                            }else{
                                this.$message({
                                    type: "error",
                                    message: "数据保存失败 请重新加载页面"
                                });
                                // this.isLoading = false
                            }
                        })
                    }
                }catch(e){}
            },
            //新增常规共舱航线
            addRoutine(){
                this.temUpselect = false
                this.comUpselect = false
                this.dialogInner = true
                this.dialogTex = '新增常规共舱航线'
                // setTimeout(()=>{
                //     document.querySelector('.dialogInner .el-dialog').style.left = '-100px'
                //     document.querySelector('.dialogInner .el-dialog').style.top = '135px'
                // },10)
            },
            //删除常规共舱航线
            deleRoutine(val,index){
                this.commonArry.splice(index,1)
                if(val.id){ //说明当前删除的是旧数据
                    //则把delFlag改为 1 代表删除
                    val.delFlag = '1'
                    this.delCommonIds.push(val)
                }
            },
            // 常用共舱航线 下拉数据
            comSelecticon() {
                this.comUpselect = !this.comUpselect;
                this.temUpselect = false
            },
            addSelecticon() {
                this.addUpselect = !this.addUpselect
            },
            // 临时共舱航线 下拉数据
            temSelecticon(){
                this.temUpselect = !this.temUpselect;
                this.comUpselect = false
            },
            //新增临时共舱航线
            addRoutes(){
                this.temUpselect = false
                this.comUpselect = false
                this.dialogInner = true
                this.dialogTex = '新增临时共舱航线'
                // setTimeout(()=>{
                //     document.querySelector('.dialogInner .el-dialog').style.left = '-100px'
                //     document.querySelector('.dialogInner .el-dialog').style.top = '180px'
                // },10)
            },
            //删除临时共舱航线
            deleRoutes(val,index){
                this.ovtArry.splice(index,1)
                if(val.id){ //说明当前删除的是旧数据
                    //则把delFlag改为 1 代表删除
                    val.delFlag = '1'
                    this.delOvtIds.push(val)
                }
            },
            //删除新增常规共舱航线
            deleSelect(val,index){
                this.temp.splice(index,1)
                if(val.id){ //说明当前删除的是旧数据
                    //则把delFlag改为 1 代表删除
                    val.delFlag = '1'
                    this.delTemp.push(val)
                }
            },
            //子组件传过来的值
            conveyInfor(val){
                // console.log(val)
                if(val.name == '新增常规共舱航线'){
                    //判断看之前是否有重复设置的常用共舱
                    for (let i = 0; i < this.commonArry.length; i++) {
                        var p = this.commonArry[i]
                        if(val.ruleForm.companyName == p.carrier && val.id == p.staticId){
                            this.$message({
                                type: "error",
                                message: "有重复的公司名、航线代码"
                            });
                            return
                        }
                    }
                    //判断看之前是否有重复设置的临时共舱
                    // for (let i = 0; i < this.ovtArry.length; i++) {
                    //     var p = this.ovtArry[i]
                    //     if(val.ruleForm.companyName == p.carrier && val.id == p.staticId){
                    //         this.$message({
                    //             type: "error",
                    //             message: "此共舱已添加为临时共舱"
                    //         });
                    //         return
                    //     }
                    // }
                    //船公司 + 航线代码 + 周次
                    var value = val.ruleForm.companyName + '(' + val.ruleForm.routeCode + ')' + ' ' + this.currentYear + '-' + val.ruleForm.affectWeek
                    this.commonArry.unshift({
                        value: value, //页面要显示
                        staticId: val.id, //航线id
                        affectWeek: val.ruleForm.affectWeek, //周次
                        carrier: val.ruleForm.companyName, //船公司
                        routeCode: val.ruleForm.routeCode, //航次代码
                        // delFlag: '', //代表的是新增的
                        // id: '', //''代表是新数据 1代表是常规共舱 2代表临时共舱
                        // isAdd: '1', //代表新增的数据
                        isNew: '', //是否显示new标识
                        flag: 0,//常用共舱
                    })
                    this.$refs.dialogTex.resetFrom()
                }else if(val.name == '新增临时共舱航线'){
                    //判断看之前是否有重复设置的常用共舱
                    // for (let i = 0; i < this.commonArry.length; i++) {
                    //     var p = this.commonArry[i]
                    //     if(val.ruleForm.companyName == p.carrier && val.id == p.staticId){
                    //         this.$message({
                    //             type: "error",
                    //             message: "此共舱已添加为常用共舱"
                    //         });
                    //         return
                    //     }
                    // }
                    //判断看之前是否有重复设置的临时共舱
                    for (let i = 0; i < this.ovtArry.length; i++) {
                        var p = this.ovtArry[i]
                        if(val.ruleForm.companyName == p.carrier && val.id == p.staticId && val.ruleForm.affectWeek == p.affectWeek){
                            this.$message({
                                type: "error",
                                message: "有重复的公司名、航线代码、周次"
                            });
                            return
                        }
                    }
                    //船公司 + 航线代码 + 周次
                    var value = val.ruleForm.companyName + '(' + val.ruleForm.routeCode + ')' + ' ' + this.currentYear + '-' + val.ruleForm.affectWeek
                    this.ovtArry.unshift({
                        value: value, //页面要显示
                        staticId: val.id, //航线id
                        affectWeek: val.ruleForm.affectWeek, //周次
                        carrier: val.ruleForm.companyName, //船公司
                        routeCode: val.ruleForm.routeCode, //航次代码
                        // delFlag: '', //代表的是新增的
                        // id: '', //''代表是新数据 1代表是常规共舱 2代表临时共舱
                        // isAdd: '1', //代表新增的数据
                        isNew: '', //是否显示new标识
                        flag: 1,//临时共舱
                    })
                    this.$refs.dialogTex.resetFrom()
                }
            },
            //关闭新增共舱航线
            closeClick(){
                this.dialogInner = false
            },
            //关闭事件
            handleCloseClick(){
                this.$emit('innerClose');
            },
            wbeScrot(){
                this.$emit("innerUpdat")
            },
        },
        components: {
            loading,
            addInnerPort
        },
        mounted() {
            this.addOrEdit = this.innerStatus
            var d1 = new Date()
            this.currentYear = d1.getFullYear()
            if(this.addOrEdit == '新增'){
                this.isLoading = false
                this.isStand = true

            }else if(this.addOrEdit == '修改'){
                this.isLoading = true
                this.pickDetails()
                this.cabinId = this.rowId
            }
        },
        computed:{
            allArry(){
                var arrAll = this.commonArry.concat(this.ovtArry)
                var ids = []
                for (let i = 0; i < arrAll.length; i++) {
                    ids.push(arrAll[i].staticId)
                }
                let c = Array.from(new Set(ids))
                let idss = c.join(',')//储存常用共舱和临时共舱 取标准航线
                return idss
            },
        },
        watch:{
            commonArry:{ //监听常用共舱的数组变化
                handler(newVal,oldVal){
                    if(newVal.length <= 5){
                        this.comSelect = false //常用共舱下拉框是否显示
                        this.comUpselect = false //常用共舱下拉框是否显示
                    }else{
                        this.comSelect = true //常用共舱下拉框是否显示
                    }
                }
            },
            ovtArry:{ //监听临时共舱的数组变化
                handler(newVal,oldVal){
                    if(newVal.length <= 5){
                        this.temSelect = false //常用共舱下拉框是否显示
                        this.temUpselect = false //常用共舱下拉框是否显示
                    }else{
                        this.temSelect = true //常用共舱下拉框是否显示
                    }
                }
            },
            temp:{ //监听临时共舱的数组变化
                handler(newVal,oldVal){
                    if(newVal.length <= 5){
                        this.addSelect = false //常用共舱下拉框是否显示
                        this.addUpselect = false //常用共舱下拉框是否显示
                    }else{
                        this.addSelect = true //常用共舱下拉框是否显示
                    }
                }
            },
            allArry:{ //监听取标准航线数组的变化
                handler(newVal,oldVal){
                   if(this.isStand){ //刚进页面不能掉
                       this.standRoute(newVal)
                   }
                },
            },
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-radio__input{
        float: right;
    }
    /deep/.el-radio__label{
        padding: 0;
        margin-right: 20px;
    }
    .eleAddFrom /deep/.el-form-item{
        height: 28px;
    }
    .innerInput /deep/.el-input {
        width: 48%;
    }
    .innerInput /deep/.el-input:nth-child(2){
        margin-left: 20px;
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
            width: 900px;
        }
    }
    li /deep/.el-input{
        width: 94%;
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
    .portCnUL{
        display: inline-block;
        width: 94%;
        height: 26px;
        // border-radius: 4px 4px 0px 0px;
        // border: 1px solid #dcdfe6;
        position: relative;
    }
    .portCnDiv{
        // width: 100%;
        height: 26px;
        display: flex;
        overflow: hidden;
        border-radius: 4px 4px 0px 0px;
        border: 1px solid #e4e4e4;
    }
    .portCnDivRoute {
        display: flex;
        flex: 1;
        height: 26px;
        border-radius: 4px 4px 0px 0px;
        padding: 2px 0px;
        padding-right: 2px;
        overflow: hidden;
        li {
            position: relative;
            display: flex;
            align-content: center;
            height: 18px;
            line-height: 18px;
            background: #e4e4e4;
            margin-left: 2px;
            padding: 2px 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            span {
                display: inline-block;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .delec{
                font-size: 12px;
                margin-top: 4px;
            }
        }
        li.routineLi{
            width: 120px;
            span{
                width: 120px;
            }
        }
        li.routesLi{
            width: 120px;
            span{
               width: 120px;
            }
        }
        li:first-child{
            margin-left: 2px;
        }
    }
    .selecticonList {
        position: absolute;
        left: -1px;
        top: 27px;
        width: 98%;
        min-height: 100px;
        background: #fff;
        border: 1px solid #ccc;
        border-top: 0;
        border-radius: 4px 4px 0px 0px;
        padding: 2px;
        overflow: hidden;
        z-index: 1;
        display: flex;
        flex-direction: row;
        flex: 1;
        flex-wrap: wrap;
        align-content: flex-start;
        li {
            position: relative;
            display: flex;
            align-content: center;
            height: 18px;
            line-height: 18px;
            background: #e4e4e4;
            margin-left: 2px;
            margin-bottom: 2px;
            padding: 2px 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            span {
                display: inline-block;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .delec{
                font-size: 12px;
                margin-top: 4px;
            }
        }
        li.routineLi{
            width: 120px;
            span{
                width: 120px;
            }
        }
        li.routesLi{
            width: 120px;
            span{
               width: 120px;
            }
        }
    }
    .elJian {
        display: inline-block;
        width: 30px;
        height: 30px;
        // margin-left: 40px;
        text-align: center;
        line-height: 30px;
    }
    .ident{
        position: absolute;
        width: 20px;
        height: 20px;
        left: 0;
        top: 0;
    }
    .newILittdent{
        position: absolute;
        width: 22px;
        height: 8px;
        left: 0;
        top: -1px;
    }
</style>