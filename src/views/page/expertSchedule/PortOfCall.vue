<template>
    <div>
        <loading v-show="loading"></loading>
        <div class="headerContent">
            <label class="headeraddOrEdit">
                修改
            </label>
            <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
        </div>
        <div :style="{maxHeight: innerHeight}"  class="scrollDiv">
            <li class="routeLi">
                <div class="title lf">
                    <span>挂靠港口</span>
                </div>
                <el-button size="small" class="clickColor" @click="handleAddClick">新增</el-button>
                <el-button size="small" class="clickColor abnormal" @click="delectClick">删除</el-button>
                <el-table
                    :data="dockingArray"
                    style="width: 100%;"
                    :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                    :row-class-name="tabRowClassName"
                    tooltip-effect="dark"
                    @row-dblclick="tabRowChange"
                    @selection-change="handleSelectionChange"
                    :header-cell-class-name="addclass"
                    ref="multipleTable"
                >
                    <el-table-column type="selection" width="45">
                    </el-table-column>
                    <el-table-column prop="portNumber" label="挂靠顺序" align="left" min-width="80px" :show-overflow-tooltip="false">
                        <template slot-scope="scope">
                            <div class="inputDiv">
                                <input 
                                    v-model="scope.row.portNumber"
                                    @focus="frontValue(scope.row.portNumber)"
                                    @keyup.enter="inputBlur(scope.row.portNumber,scope.$index)" 
                                    @blur="inputBlur(scope.row.portNumber,scope.$index)" 
                                    @input="scope.row.portNumber = commonJs.handleInputNo(scope.row.portNumber)"
                                    :class="(scope.$index+1) % 2 !== 0?'inputport':'inputportColor'"
                                    />
                            </div>
                        </template> 
                    </el-table-column>
                    <el-table-column prop="port" label="港口英文名" align="left" :show-overflow-tooltip="true" min-width="110">
                    </el-table-column>
                    <el-table-column prop="portCode" label="港口五子码" align="left" :show-overflow-tooltip="true" min-width="90">
                    </el-table-column>
                    <el-table-column prop="terminal" label="码头" align="left" :show-overflow-tooltip="true" min-width="100">
                    </el-table-column>
                    <el-table-column prop="baseTerminal" label="标准码头" align="left" :show-overflow-tooltip="true" min-width="150">
                    </el-table-column>
                    <el-table-column prop="eta" label="ETA" align="left" :show-overflow-tooltip="true" min-width="60px">
                        <template slot-scope="scope">
                            <span>{{scope.row.eta != null ? commonJs.getMounthDay(scope.row.eta.toUpperCase()) : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="etd" label="ETD" align="left" :show-overflow-tooltip="true" min-width="60px">
                        <template slot-scope="scope">
                            <span>{{scope.row.etd != null ? commonJs.getMounthDay(scope.row.etd.toUpperCase()) : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="transitTime" label="航程" align="left" :show-overflow-tooltip="true" min-width="50px">
                    </el-table-column>
                    <el-table-column prop="direction" label="方向" align="left" :show-overflow-tooltip="true" min-width="60px">
                        <template slot-scope="scope">
                            <span>{{scope.row.direction}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isPol" label="POL" align="left" :show-overflow-tooltip="true" min-width="50px">
                        <template slot-scope="scope">
                            <span>{{scope.row.isPol === ''?'':(scope.row.isPol === 1 || scope.row.isPol === 3)?'√':''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isPol" label="POD" align="left" :show-overflow-tooltip="true" min-width="60px">
                        <template slot-scope="scope">
                            <span>{{scope.row.isPol === ''?'':(scope.row.isPol === 2 || scope.row.isPol === 3) ?'√':''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="left" :show-overflow-tooltip="true" min-width="142px">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="操作时间" align="left" :show-overflow-tooltip="true" min-width="142px">
                    </el-table-column>
                </el-table>
            </li>
            <div class="save">
                <el-button class="saveBtn" @click="handleSaveClick">保存</el-button>
            </div>
        </div>
        <el-dialog
            class="dialogAddInnerVisible"
            :visible.sync="dialogAddInnerVisible"
            v-if="dialogAddInnerVisible"
            width="660px"
            append-to-body
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <routeManageInnerAdd
                :dialogInnerStatus="dialogInnerStatus"
                :tablePortruleForm="tablePortruleForm"
                :scac="this.scac"
                @handleInnerClose="handleInnerClose"
                @childByValue="handleInnerValue"
                ref="routeManageInner"
            >
            </routeManageInnerAdd>
        </el-dialog>
    </div>
</template>

<script>
    import loading from "@/components/Loading/loading.vue";
    import routeManageInnerAdd from "../route/routeManageInnerAdd.vue";
    export default {
        props:[
            "staticId",
            "polCode",
            "podCode",
            "routeCode",
            "scac"
        ],
        data() {
            return {
                loading: false,
                dataWidth: '',
                innerHeight: '',
                screenHeight: '',
                inputValue: '',
                screenWidth: document.body.clientWidth, // 设置默认值
                dockingArray: [], //挂靠港口
                delDockingArray: [], //删除的挂靠港
                multipleSelection: [], //全选的数据
                dialogAddInnerVisible: false, //新增路径弹窗
                tablePortruleForm: {},
                dialogInnerStatus: '',
                rowIndex: 0,
            }
        },
        components: {
            loading,
            routeManageInnerAdd
        },
        methods: {
            // 获取挂靠港口
            getRouteDetail(){
                this.loading = true
                this.$axios.get(this.commonJs.localUrl + `/expert/path/queryPortByRouteId?id=${this.staticId}`,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                },
                }).then(res => {
                    if(res.data.status == 1){
                        this.dockingArray = res.data.content
                    }
                    this.loading = false
                })
            },
            //保存事件
            handleSaveClick(){
                var dockingPortModels = this.dockingArray.concat(this.delDockingArray)
                this.loading = true
                let query = {
                    staticId: this.staticId,
                    polCode: this.polCode,
                    podCode: this.podCode,
                    userId: '',
                    shType: 1,//管控系统编辑
                    routeCode: this.routeCode,
                    dockingPortModels: dockingPortModels
                }
                this.$axios.post(this.commonJs.localUrl + `/expert/path/editDocking`, query,{
                    headers: {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token").replace("Bearer","Jwt"),
                },
                }).then(res => {
                    if(res.data.status == 1){
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                        this.$emit("initDetailData");
                        this.handleCloseClick()
                    }else{
                        this.$message({
                            type: "error",
                            message: "数据保存失败 请重新加载页面"
                        });
                    }
                    this.loading = false
                }).catch((err)=>{
                    this.$message({
                        type: "error",
                        message: "数据保存失败 请重新加载页面"
                    });
                })
            },
            //关闭事件
            handleCloseClick(){
                this.$emit('handleInnerClose');
            },
            // 关闭详情弹窗
            handleInnerClose() {
                this.dialogAddInnerVisible = false;
            },
             //新增数据 修改数据
            handleInnerValue(value, from) {
                if (this.dialogInnerStatus === "新增") {
                    for (var i = 0; i < this.dockingArray.length; i++) {
                        if (parseInt(value.portNumber) === parseInt(this.dockingArray[i].portNumber)) {
                            this.$message({
                                type: "error",
                                message: "已有重复数据"
                            });
                            return;
                        }
                    }
                    this.dockingArray.push(JSON.parse(JSON.stringify(value)));
                    this.dockingArray.sort(this.compare('portNumber'))
                    this.$refs.routeManageInner.resetFrom(from);
                    this.$refs.routeManageInner.ruleForm.isPol = '';
                    this.$refs.routeManageInner.checkList = []
                    this.$refs.routeManageInner.ruleForm.direction = '';
                    this.$refs.routeManageInner.direction = []
                    this.$refs.routeManageInner.handleCloseClick();
                } else {
                    for (var i = 0; i < this.dockingArray.length; i++) {
                        if (i === this.rowIndex) {
                            continue;
                        }
                        if (parseInt(value.portNumber) === parseInt(this.dockingArray[i].portNumber)) {
                            this.$message({
                                type: "error",
                                message: "已有重复数据"
                            });
                            return;
                        }
                    }
                    this.dockingArray.splice(
                        this.rowIndex,
                        1,
                        JSON.parse(JSON.stringify(value))
                    );
                    this.dockingArray.sort(this.compare('portNumber'))
                    this.$refs.routeManageInner.handleCloseClick();
                }
            },
            //挂靠港口 挂靠顺序排序
            compare(portNumber){
                return function(a,b){
                    var value1 = a[portNumber];
                    var value2 = b[portNumber];
                    return value1 - value2;
                }
            },
            //新增
            handleAddClick(){
                this.dialogAddInnerVisible = true;
                this.dialogInnerStatus = "新增";
            },
            //删除
            delectClick(){
                if(this.multipleSelection.length <= 0){
                    this.$message({
                        type: "error",
                        message: "请选择一条或者多条进行删除",
                    });
                    return
                };
                this.$confirm(this.commonJs.confirm_delete, "", {cancelButtonClass: "btnCustomCencel", 
                    confirmButtonClass:"btnCustomSubmit",
                    customClass:"customClass",
                    dangerouslyUseHTMLString:true,
                }).then(() => {
                    var indexList = []
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        var index = this.multipleSelection[i].index
                        indexList.push(index)
                        if(this.multipleSelection[i].id){
                            this.multipleSelection[i].delFlag = 1
                            this.delDockingArray.push(this.multipleSelection[i])
                        }
                    }
                    indexList.sort((a, b)=>{ return b - a});
                    for (let i = 0; i < indexList.length; i++) {
                        this.dockingArray.splice(indexList[i], 1)
                    }
                }).catch(_ => {});
            },
            //点击修改挂靠港口
            tabRowChange(row, column, event) {
                this.rowIndex = row.index;
                this.dialogAddInnerVisible = true;
                this.dialogInnerStatus = "修改";
                this.tablePortruleForm = row;
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //挂靠顺序 聚焦时候的value
            frontValue(value){
                this.inputValue = value
            },
            //挂靠顺序 失去失去焦点时
            inputBlur(value,index){
                if(value === ''){
                    this.$message({
                        type: "error",
                        message: "挂靠数据不能为空"
                    });
                    this.dockingArray[index].portNumber = this.inputValue;
                }else{
                    if(this.dockingArray[index].portNumber == this.inputValue){
                            this.dockingArray[index].portNumber = value;
                    }else{
                        for (var i = 0; i < this.dockingArray.length; i++) {
                            if(index !== i){
                                if (parseInt(value) === parseInt(this.dockingArray[i].portNumber)) {
                                    this.$message({
                                        type: "error",
                                        message: "已有重复挂靠数据"
                                    });
                                    this.dockingArray[index].portNumber = this.inputValue
                                    return;
                                }
                            }
                        }
                        this.dockingArray.sort(this.compare('portNumber'))
                    }
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
            //单独给第二列添加样式
            addclass({row, column, rowIndex, columnIndex}) {
                if(columnIndex == 2) {
                    return 'columnPadding'
                }
            },
            //监听窗口变化
            winResize() {
                this.dataWidth = document.body.clientWidth * 0.8 - 40
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
            this.getRouteDetail()
            this.winResize()
        },
        watch:{
            screenWidth (val) {
                this.screenWidth = val
                this.dataWidth = this.screenWidth * 0.8 - 40
            },
            screenHeight (val) {
               var height = val - 80
               this.innerHeight = height  + 'px'
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
    /deep/ .el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/ .el-table th{
        height: 30px;
        padding: 0;
    }
    /deep/.el-form-item--mini .el-form-item__content{
        margin-left: 100px !important;
    }
    /deep/.el-form-item__content{
        margin-left: 100px !important;
    }
    /deep/.el-radio__input{
        float: right;
    }
    /deep/.el-radio__label{
        padding: 0;
        margin-right: 20px;
    }
    .checkbox /deep/.el-checkbox{
        width: 85px;
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
    .scrollDiv{
        overflow-y: auto;
        height:'400px'
    }
    .routeLi {
        margin-top: 20px;
    }
    .title {
        // width: 85px;
        // height: 35px;
        // line-height: 35px;
        text-align: center;
        // background-color: #3bafda;
        margin-bottom: 10px;
        display: inline-block;
        margin-right: 20px;
        span {
            color: #3bafda;
            font-weight: 600;
        }
    }
    .clickColor {
        background-color: #ff9000;
        color: #fff;
        padding: 9px 35px;
        float: right;
        margin-bottom: 10px;
    }
    .abnormal{
        border: 1px solid #FF0000;
        color: #FF0000;
        background-color: #fff;
        margin-right:10px;
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
        }
    }
    /deep/th.columnPadding{
        padding-left: 10px !important;
    }
    .inputDiv{
        width: 100%;
        height: 30px;
    }
    .inputport{
        width: 60px;
        background:rgba(241, 245, 247, 1);
        height: 25px;
        outline: none;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
    }
    .inputportColor{
        width: 60px;
        height: 25px;
        outline: none;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
    }
</style>