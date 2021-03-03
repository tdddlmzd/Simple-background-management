<template>
    <div class="routeAdd">
        <loading v-show="isLoading"></loading>
        <el-form
        label-position="right"
        label-width="100px"
        size="mini"
        :model="ruleForm"
        ref="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">{{addOrEdit}}</label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <div :style="{maxHeight: innerHeight + 'px'}"  class="scrollDiv">
                <ul class="routeUl">
                    <li class="routeLi">
                        <el-table
                            :data="ruleForm.tableList"
                            style="width: 100%;"
                            :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                            :row-class-name="tabRowClassName"
                            tooltip-effect="dark"
                            ref="multipleTable"
                            :maxHeight="innerHeight - 140"
                        >
                            <el-table-column prop="index" label="序号" align="left" :show-overflow-tooltip="true" width="80">
                                <template slot-scope="scope">
                                    {{scope.$index +1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="carrier" label="船公司" align="left" :show-overflow-tooltip="true" min-width="80">

                            </el-table-column>
                            <el-table-column prop="status" label="状态码" align="left" :show-overflow-tooltip="true" min-width="100">
                                <template slot-scope="scope">
                                    <div class="sel-el">
                                        <el-select
                                            v-model="scope.row.statusZE"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                            @change="changeStatus($event,scope.row)"
                                            clearable
                                        >
                                            <el-option
                                                v-for="item in stateList"
                                                :key="item.value"
                                                :label="item.status + '('+ item.statusCn + ')'"
                                                :value="item.status"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="event" label="状态原始描述" align="left" :show-overflow-tooltip="true" min-width="200">

                            </el-table-column>
                            <el-table-column prop="isTransit" label="是否中转" align="left" width="120">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'tableList.' + scope.row.index + '.isTransit'" :rules='{required:scope.row.statusZE?true:false,type:"string",message:"请选择是否中转",trigger:"blur"}'>
                                        <el-select
                                            v-model="scope.row.isTransit"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                            clearable
                                        >
                                            <el-option
                                                v-for="item in transitList"
                                                :key="item.value"
                                                :label="item.lable"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column prop="transport" label="海运" align="left" :show-overflow-tooltip="true" width="120">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'tableList.' + scope.row.index + '.transport'" :rules='{required:scope.row.statusZE?true:false,type:"string",message:"请选择海运",trigger:"blur"}'>
                                        <el-select
                                            v-model="scope.row.transport"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                            clearable
                                        >
                                            <el-option
                                                v-for="item in transportList"
                                                :key="item.value"
                                                :label="item.lable"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column prop="isEqual" label="匹配规则" align="left" :show-overflow-tooltip="true" width="120">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'tableList.' + scope.row.index + '.isEqual'" :rules='{ required:scope.row.statusZE?true:false,type:"string",message:"请选择匹配规则",trigger:"blur"}'>
                                        <el-select
                                            v-model="scope.row.isEqual"
                                            style="width:100%;"
                                            placeholder="请选择"
                                            default-first-option
                                            clearable
                                        >
                                            <el-option
                                                v-for="item in equalList"
                                                :key="item.value"
                                                :label="item.lable"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </el-table>
                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="handleSaveClick('ruleForm')" v-if="isSave">保存</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    import RouteMap from '@/components/RouteMap/RouteMap'
    import api from '@/components/RouteMap/api'
    export default {
        props: [
            "owenerText",
            "rowCarrier",
            ],
        data() {
            return {
                addOrEdit: "", //标题
                isLoading: false, //loading
                innerHeight: '',
                screenHeight: '',
                isSave: false, //是否显示保存按钮
                oldList: [], //旧详情页的列表
                stateList: [], //状态码
                ruleForm: {
                    tableList: [], //详情页列表
                },
                //是否中转
                transitList: [
                    {
                        lable: '否',
                        value: '0',
                    },
                    {
                        lable: '是',
                        value: '1',
                    }
                ],
                //海运
                transportList:[
                    {
                        lable: '海运',
                        value: '0',
                    },
                    {
                        lable: '铁运',
                        value: '1',
                    },
                    {
                        lable: '卡车',
                        value: '2',
                    },
                    {
                        lable: '内支线',
                        value: '3',
                    },
                ],
                //匹配规则
                equalList:[
                    {
                        lable: '全等',
                        value: '0',
                    },
                    {
                        lable: '模糊匹配',
                        value: '1',
                    },
                    // {
                    //     lable: '人工判断',
                    //     value: 2,
                    // }
                ],
            };
        },
        components: {
            loading,
            RouteMap,
        },
        methods: {
            //取跟踪详情
            detailTrack(){
                var that = this
                this.isLoading = true
                this.$axios.get(this.commonJs.localUrl + `/schedules/shipOwner/getNodeByCarrier?carrier=${this.rowCarrier}`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        that.ruleForm.tableList = res.data.content
                        for (let i = 0; i < that.ruleForm.tableList.length; i++) {
                            //状态码
                            var statusZE = ''
                            if(that.ruleForm.tableList[i].status && that.ruleForm.tableList[i].statusCn){
                                statusZE = that.ruleForm.tableList[i].status + ' ' + '(' + that.ruleForm.tableList[i].statusCn + ')'
                            }

                            if(that.ruleForm.tableList[i].status && !that.ruleForm.tableList[i].statusCn){
                                statusZE = that.ruleForm.tableList[i].status
                            }

                            if(!that.ruleForm.tableList[i].status && that.ruleForm.tableList[i].statusCn){
                                statusZE = that.ruleForm.tableList[i].statusCn
                            }

                            if(!that.ruleForm.tableList[i].status && !that.ruleForm.tableList[i].statusCn){
                                statusZE = ''
                            }
                            that.ruleForm.tableList[i]['statusZE'] = statusZE
                            //是否中转 返回2 默认为空
                            if(that.ruleForm.tableList[i].isTransit == 2){
                                that.ruleForm.tableList[i].isTransit = ''
                            }else{
                                that.ruleForm.tableList[i].isTransit = String(that.ruleForm.tableList[i].isTransit)
                            }
                            //匹配规则 返回2 默认为空
                            if(that.ruleForm.tableList[i].isEqual == 2){
                                that.ruleForm.tableList[i].isEqual = ''
                            }else{
                                that.ruleForm.tableList[i].isEqual = String(that.ruleForm.tableList[i].isEqual)
                            }
                            //海运
                            that.ruleForm.tableList[i].transport = String(that.ruleForm.tableList[i].transport)
                        }
                        that.oldList = JSON.parse(JSON.stringify(that.ruleForm.tableList))
                        that.isLoading = false
                    }else{
                        that.$message({
                            type: "error",
                            message: "数据加载失败 请重新加载页面"
                        });
                    }
                })
            },
            //取状态码
            getStatus(){
                var that = this
                this.$axios.get(this.commonJs.localUrl + `/schedules/shipOwner/getShipOwnerNodeStatus`
                ,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                    }
                }).then(res =>{
                    if(res.data.status == 1){
                        that.stateList = res.data.content
                    }
                })
            },
            //改变状态
            changeStatus(val,item){
                var statusCn = ''
                if(val){
                    for (let i = 0; i < this.stateList.length; i++) {
                        if(val == this.stateList[i].status){
                            statusCn = this.stateList[i].statusCn
                        }
                    }
                    item.status = val
                    item.statusCn = statusCn
                    item.statusZE = val + ' ' + '(' + statusCn + ')'
                }else{
                    item.status = ''
                    item.statusCn = ''
                    item.statusZE = ''
                    item.isTransit = ''
                    item.transport = ''
                    item.isEqual = ''
                }

                for (let i = 0; i < this.ruleForm.tableList.length; i++) {
                    if(item.id == this.ruleForm.tableList[i].id){
                        this.ruleForm.tableList.splice(i,1,item)
                    }
                }
            },
            //关闭事件
            handleCloseClick() {
                this.$emit("closeDetail");
            },
            //保存
            async handleSaveClick(ruleForm) {
                try{
                    let valid = await this.$refs[ruleForm].validate(); //验证表单名为ruleForm的
                    if(!valid) return
                    this.isLoading = true
                    var newList = []
                    //比较现在的和之前的列表数组的不同项
                    for (let i = 0; i < this.ruleForm.tableList.length; i++) {
                        for (let j = 0; j < this.oldList.length; j++) {
                            if(this.ruleForm.tableList[i].id == this.oldList[j].id){ //id相同比较看是否改变了状态码
                                if((this.ruleForm.tableList[i].status !== this.oldList[j].status && this.ruleForm.tableList[i].statusCn !== this.oldList[j].statusCn) || this.ruleForm.tableList[i].isTransit !== this.oldList[j].isTransit || this.ruleForm.tableList[i].transport !== this.oldList[j].transport || this.ruleForm.tableList[i].isEqual !== this.oldList[j].isEqual){
                                    newList.push({
                                        id:this.ruleForm.tableList[i].id,
                                        status:this.ruleForm.tableList[i].status,
                                        statusCn:this.ruleForm.tableList[i].statusCn,
                                        isTransit: this.ruleForm.tableList[i].isTransit === '' ? 2 : this.ruleForm.tableList[i].isTransit === '0' ? 0 : Number(this.ruleForm.tableList[i].isTransit),
                                        transport: this.ruleForm.tableList[i].transport === '' ? '' : this.ruleForm.tableList[i].transport === '0' ? 0 : Number(this.ruleForm.tableList[i].transport),
                                        isEqual: this.ruleForm.tableList[i].isEqual === '' ? 2 : this.ruleForm.tableList[i].isEqual === '0' ? 0 : Number(this.ruleForm.tableList[i].isEqual),
                                        carrier: this.rowCarrier,
                                    })
                                }
                            }
                        }
                    }
                    this.$axios.post(this.commonJs.localUrl + `/schedules/shipOwner/updateNode`,newList,
                        {
                            headers : {
                                Authorization: `Bearer ${this.getAuthorization()}`,
                                AccessToken: this.getCookie("token"),
                            }
                        }
                    ).then(res => {
                        if (res.data.status == 1) {
                            this.isLoading = false
                            this.$emit("updatManage")
                            this.$message({
                                type: "success",
                                message: "保存成功"
                            });
                            this.handleCloseClick()
                        }else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据保存失败 请重新加载页面"
                            });
                        }
                    })
                }catch(e){}                
            },
            //表格的斑马线
            tabRowClassName({ row, rowIndex }) {
                row.index = rowIndex;
                let index = rowIndex + 1;
                if (index % 2 !== 0) {
                    return "warning-row";
                }
            },
            winResize(){
                const that = this
                that.screenHeight = document.body.clientHeight;
                window.onresize = () => {
                    return (() => {
                        window.screenWidth = document.body.clientWidth   
                        that.screenWidth = window.screenWidth
                        window.screenHeight = document.body.clientHeight 
                        that.screenHeight = window.screenHeight
                    })()
                }
            },
        },
        mounted() {
            this.winResize()
            if(this.owenerText == "修改" ){
                this.addOrEdit = "修改"
                this.getStatus()
                this.detailTrack()
            }
            if(this.getCookie('userName') == 'qing' || this.getCookie('userName') == 'gongjunqing'){
                this.isSave = true
            }
        },
        watch:{
            screenHeight (val) {
               var height = val - 80
               this.innerHeight = height
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
    /deep/.el-input__suffix .el-icon-arrow-up{
        display: none;
        // top: -10px !important;
        // color: red;
    }
    .routeAdd {
        position: relative;
        overflow: hidden;
    }
    .lf {
        float: left;
    }
    .lr {
        float: right;
    }
    .headerContent {
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit {
        margin-left: 10px;
        font-size: 18px;
    }
    .headeraddOrEditClose {
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .scrollDiv{
        overflow-y: auto;
    }
    .routeUl {
        padding-right: 10px;
        .routeLi {
            margin-top: 20px;
        }
    }
    .save{
        width: 100%;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: rgba(4, 153, 255, 1);
        }
    }
    /deep/.el-form-item--mini .el-form-item__content{
        margin-left: 0px !important;
    }
    /deep/.el-form-item__content{
        margin-left: 0px !important;
    }
    /deep/.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 0px !important;
    }
    .sel-el{
        overflow: hidden;
        width: 100%;
        height: 28px;
    }
    .sel-el /deep/.el-input__inner{
        height: 28px;
        line-height: 28px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 10px;
    }
    .sel-el /deep/ .el-input__icon{
        line-height: 28px;
    }
    .sel-el /deep/ .el-input__suffix {
        right: 0;
    }
    .sel-input{
        overflow: hidden;
        width: 100%;
        height: 28px;
    }
    .sel-input /deep/.el-input__inner{
        height: 28px;
        line-height: 28px;
        padding-left: 25px;
        padding-right: 10px;
        font-size: 10px;
    }
    .sel-input /deep/ .el-input__icon{
        line-height: 28px;
    }
    .sel-input /deep/ .el-input__suffix {
        right: 0;
    }
    .sel-input /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
    .sel-input /deep/ .el-input.is-disabled .el-input__inner{
        background-color: #ffffff;
        color: #606266;
    }
</style>