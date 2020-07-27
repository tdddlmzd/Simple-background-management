<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <breadcrumb :matched="matched"></breadcrumb>
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                :model="ruleForm"
                ref="ruleForm"
                label-width="110px"
            > 
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%" >
                            <el-form-item label="使用状态">
                                <el-select 
                                    v-model="ruleForm.dateType" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
                                >
                                    <el-option
                                        v-for="item in dateTypeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="认证状态">
                                <el-select 
                                    v-model="ruleForm.dateTypes" 
                                    clearable 
                                    placeholder="请选择"
                                    style="width:100%"   
                                >
                                    <el-option
                                        v-for="item in haveVesselList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>   
                        </el-col>
                        <el-col style="width:22%" >
                            <el-form-item label="注册时间" class="searchTime">
                                <el-date-picker
                                    v-model="ruleForm.startDate"
                                    type="date"
                                    style="width:100%"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择开始日期"
                                >   
                                </el-date-picker>
                            </el-form-item> 
                        </el-col> 
                    </el-row> 
                    <el-row>
                        <el-col style="width:22%"> 
                            <el-form-item label="手机号">
                                <el-input class="inputWidth" v-model="ruleForm.routeCode" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="邀请码">
                                <el-input class="inputWidth" v-model="ruleForm.displayName" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%"> 
                            <el-form-item label="被邀请码">
                                <el-input class="inputWidth" v-model="ruleForm.docking" placeholder="请输入" clearable>

                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="contenRight">
                    <el-button size="small" class="serachBtn">搜索</el-button>
                </div>
                <div style="clear:both;"></div>
            </el-form>
        </div>
        <div class="tablePage">
            <el-button size="small" class="normal normals">停用</el-button>
            <el-button size="small" class="normal">激活</el-button>
            <el-button size="small" class="clickColor">新增</el-button>
            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                tooltip-effect="dark"
                ref="table"
            >
                <el-table-column
                    type="selection"
                    width="45"
                >
                </el-table-column>
                <el-table-column  prop="companyName"  label="使用状态"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="username" label="认证状态"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="companyName"  label="手机号"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="username" label="邀请码"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="companyName"  label="被邀请码"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="username" label="注册时间"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="companyName"  label="审核通过时间"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
                <el-table-column  prop="username" label="操作时间"  :show-overflow-tooltip=true align="left" min-width="140"> </el-table-column>
            </el-table>
            <!--分页-->
            <ThePagination ref="refPagination"  :pageNumber="pageNumber" :attribute="paginationAttribute" class="lr refPagination"></ThePagination>  
        </div>
         <div>
        <el-button type="primary" icon="el-icon-plus" @click.native.prevent="addMaintain(-1)">新增</el-button>

        <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%;">
            <el-table-column label="序号" width="80px" align='center'>
                <template slot-scope="scope">
                    <span>{{ scope.$index +1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="oneID" label="oneID" align='center'></el-table-column>
            <el-table-column prop="twoID" label="twoID" align='center'></el-table-column>
            <el-table-column prop="name" label="name" align='center'></el-table-column>
            <el-table-column prop="type" label="协办人" align='center'></el-table-column>
            <el-table-column fixed="right" label="操作" align='center' width="220">
                <template slot-scope="scope">
                    <el-button type="text" v-if="oneList.some(e => {return e.index + e.length === scope.$index + 1})" @click.native.prevent="addLargeRecords(scope.row)" size="small">新增第二层大类</el-button>
                    <el-button type="text" @click.native.prevent="addRecords(scope.row)" size="small">新增</el-button>
                    <el-button type="text" @click.native.prevent="delRecords(scope.$index, tableData, scope.row)" size="small">删除</el-button>
                    <el-button type="text" v-if="twoList.some(e => {return e.index + e.length === scope.$index + 1})" @click.native.prevent="delTwoRecords(scope.$index, tableData, scope.row)" size="small">删除第二大类</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import loading from "@/components/Loading/loading.vue";
    import ThePagination from "@/components/ThePagination/ThePagination.vue";
    export default {
        data() {
            return {
                matched: "",
                isLoading: true,
                ruleForm: { },
                tableData: [],
                // 使用状态 -1 全部 1正常 2停用
                dateTypeList:[
                    {
                        value: -1,
                        label:'全部'
                    },
                    {
                        value: 1,
                        label: '正常'
                    },
                    {
                        value: 2,
                        label: '停用'
                    },
                ],
                //认证状态
                haveVesselList:[
                    {
                        value: -1,
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '未认证'
                    },
                    {
                        value: 1,
                        label: '待审核'
                    },
                ],
                pageNo:1,
                pageSize:10,
                total:0,
                // 引用 ThePagination组件
                refPagination: {},
                paginationAttribute: {
                    handleChange: this.handleChange
                },
                //分页默认状态
                pageNumber : -1,
                page: {
                    // 当前页数
                    pageNo: 1,
                    // 每页默认显示条数
                    pageSize: 10,
                    // 总条数
                    total: 0
                },
                tableData: [
                {
                    oneID: 1,
                    twoID: 1,
                    name: '王小虎'
                }, {
                    oneID: 1,
                    twoID: 1,
                    name: '王小虎'
                }, {
                    oneID: 1,
                    twoID: 2,
                    name: '王小虎'
                }, {
                    oneID: 1,
                    twoID: 2,
                    name: '王小虎'
                }, {
                    oneID: 2,
                    twoID: 1,
                    name: '王小虎'
                }, {
                    oneID: 2,
                    twoID: 2,
                    name: '王小虎'
                }, {
                    oneID: 3,
                    twoID: 1,
                    name: '王小虎'
                }, {
                    oneID: 4,
                    twoID: 1,
                    name: '王小虎'
                }]
            }
        },
        computed: {
            oneList(){
                let iList = [];
                this.tableData.forEach((row, rowIndex) => {
                    let eIndex = iList.findIndex(e => { return e.oneID == row.oneID});
                    if(eIndex !== -1){
                        iList[eIndex].length += 1;
                    } else {
                        iList.push({
                            oneID: row.oneID,
                            length: 1,
                            index: rowIndex
                        })
                    }
                })
                return iList
            },
            twoList(){
                let tList = [];
                this.tableData.forEach((row, rowIndex) => {
                    let eIndex = tList.findIndex(e => { return e.twoID == `${row.oneID}_${row.twoID}`});
                    if(eIndex !== -1){
                        tList[eIndex].length += 1;
                    } else {
                        tList.push({
                            twoID: `${row.oneID}_${row.twoID}`,
                            length: 1,
                            index: rowIndex
                        })
                    }
                })
                return tList
            }
        },
        components: {
            ThePagination,
            Breadcrumb,
            loading,
        },
        methods: {
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
            //给分页传的属性
            handleChange(params) {
                this.isLoading = true;
                this.page.pageSize = params.pageSize;
                this.page.pageNo = params.pageNo;
                this.searchList();
                this.pageNumber = -1;
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                    if (columnIndex === 1) {
                        // console.log('oneList',row, column, rowIndex, columnIndex,this.oneList)
                        let iIndex = this.oneList.findIndex(e => { return e.index == rowIndex});
                        if (iIndex !== -1) {
                            return [this.oneList[iIndex].length, 1];
                        } else {
                            return [0, 0];
                        }
                    }
                    if (columnIndex === 2) {
                        // console.log('oneList',row, column, rowIndex, columnIndex,this.oneList)
                        let iIndex = this.twoList.findIndex(e => { return e.index == rowIndex});
                        if (iIndex !== -1) {
                            return [this.twoList[iIndex].length, 1];
                        } else {
                            return [0, 0];
                        }
                    }
                },
                // 删除第二大类
                delTwoRecords(index, rows, row){
                    let rIndex = this.twoList.findIndex(e => { return e.twoID == `${row.oneID}_${row.twoID}`});
                    rows.splice(this.twoList[rIndex].index, this.twoList[rIndex].length);
                },
                delRecords(index, rows, row){
                    // rows.splice(index, 1);
                    // return

                    // 最后一条数据不能删除，只能清空子级数据
                    let rIndex = this.twoList.findIndex(e => { return e.twoID == `${row.oneID}_${row.twoID}`});
                    if(this.twoList[rIndex].length !== 1){
                        rows.splice(index, 1);
                    } else {
                        rows.splice(index, 1, {
                            oneID: row.oneID,
                            twoID: row.twoID,
                            name: ''
                        });
                    }
                },
                addMaintain(){
                    if(this.tableData.length){
                        this.tableData.push({
                            oneID: this.oneList[this.oneList.length - 1].oneID + 1,
                            twoID: 1,
                            name: `外层新增`
                        })
                    } else {
                        this.tableData.push({
                            oneID: 1,
                            twoID: 1,
                            name: `外层新增`
                        })
                    }
                },
                addLargeRecords(row){
                    let rIndex = this.oneList.findIndex(e => { return e.oneID == row.oneID});
                    if(rIndex > -1){
                        let num = this.oneList[rIndex].index + this.oneList[rIndex].length
                        this.tableData.splice(num, 0, {
                            oneID: row.oneID,
                            twoID: row.twoID + 1,
                            name: `新增大类 -- ${num}`
                        })
                    }
                },
                addRecords(row){
                    let rIndex = this.twoList.findIndex(e => { return e.twoID == `${row.oneID}_${row.twoID}`});
                    if(rIndex > -1){
                        let num = this.twoList[rIndex].index + this.twoList[rIndex].length
                        this.tableData.splice(num, 0, {
                            oneID: row.oneID,
                            twoID: row.twoID,
                            name: `新增 -- ${num}`
                        })
                    }
                }
            },
        mounted() {
            this.matched = this.$route.matched;
            this.isLoading = false
            this.$refs.refPagination.changeValue();
        }
    };
</script>

<style lang="scss" scoped>
    /deep/ .demo-table-expand {
        font-size: 0;
    }
    /deep/ .demo-table-expand label {
        width: 250px;
        color: #99a9bf;
    }
    /deep/.el-row .el-col:nth-last-of-type(1){
        margin-right: 0;
    }
    /deep/ .el-col{
        // min-width: 250px;
        margin-right: 20px;
    }
    /deep/ .refPagination input{
        width: 100px!important;
    }
    /deep/ .el-table__expand-icon{
        visibility: hidden !important;
    }
    /deep/ .el-table__expanded-cell{
        text-align:center !important;
        color: #3bafda
    }
    /deep/ .el-table th, .el-table tr{
        height: 30px;
    }
    /deep/ .el-table th{
        height: 30px;
        padding: 0;
    }  
    /deep/ .dateTime div:nth-child(1){
        margin-left: 11px !important;
    }
    /deep/ .el-scrollbar__view .el-select-dropdown__list li:nth-of-type(1){
        color:#409EFF;
        font-weight:700
    }
  
    /deep/ .el-table .warning-row{
        background:rgba(241, 245, 247, 1) !important;
    }
    /deep/ .el-table .warning-row:hover{
        background:rgba(241, 245, 247, 1);
    }
    /deep/.el-dialog__body{
        padding: 10px 0px 10px 10px !important;
    }
    .basicPortContent {
        position: relative;
        overflow: hidden;
        padding: 20px 20px 20px 20px;
        .serachBack{
            background-color: #fff ;
            padding: 20px 20px 0px 20px ;
            margin-bottom: 10px;
            position: relative;
            .contenRight{
                position: absolute;
                right: 20px;
                bottom: 5px;
                .serachBtn{
                    padding: 9px 35px;
                    color: #fff;
                    background-color: rgba(4, 153, 255, 1);
                    margin-bottom: 10px;
                    border: 1px solid #3bafda;
                }
            }
        }
        .tablePage{
            background-color: #fff ;
            padding: 20px 20px 20px 20px;
            .clickColor{
                background-color: #ff9000;
                color: #fff;
                // padding: 6px 17px;
                padding: 9px 35px;
                float: right;
                margin-bottom: 10px;
            }
            .normal{
                color:#3bafda;
                border: 1px solid #3bafda;
                font-size: 12px;
                border-radius: 3px;
                padding: 7px 15px;
                display: inline-block;
                white-space: nowrap;
                cursor: pointer;
                background: #fff;
                -webkit-appearance: none;
                text-align: center;
                box-sizing: border-box;
                outline: 0;
                margin: 0;
                transition: .1s;
                font-weight: 500;
                border-spacing: 2px;
                height: 28px;
                line-height: 14px;
                margin-right: 20px;
            }
            .normals{
                color: red;
                border: 1px solid red;
            }
        }

    }
</style>