<template>
    <div class="portCoverage">
        <el-form
            label-position="right"
            :model="ruleForm"
            ref="ruleForm"
            size="mini"
            class="ruleForm"
        >
            <div class="headerContent">
                <label class="headeraddOrEdit">
                    {{'港口覆盖'}}
                </label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="handleCloseClick"></i>
            </div>
            <el-form-item
                prop="companyName"
                label="船公司"
                class="el_formContent"
                label-width="60px"
            >
                <el-select
                    v-model="ruleForm.companyName"
                    style="width:100%;"
                    placeholder="请输入并选择"
                    filterable
                    remote
                    :remote-method="remoteCompanyNameMethod"
                    @change="handleCompanyNameChange"
                    @focus="handleCompanyNameFounc"
                    clearable
                >
                    <el-option
                        v-for="item in companyNameList"
                        :key="item.scac"
                        :label="item.companyName"
                        :value="item.scac"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                prop="coverage"
                label="覆盖情况"
                class="el_formContent el_formContentMargin"
                label-width="70px"
            >
                <el-select
                    v-model="ruleForm.coverage"
                    style="width:100%;"
                    placeholder="请输入并选择"
                    @change="handleCoverageChange"
                >
                    <el-option
                        v-for="item in coverageList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-table 
                :data="tableData" 
                style="width: 100%;max-height:500px"
                height="500"
                :header-cell-style="{backgroundColor:'rgba(59, 175, 218, 1)' ,color:'white',fontSize:'12px'}"
                :row-class-name="tabRowClassName"
                ref="multipleTable"
                tooltip-effect="dark"
            >
                <el-table-column prop="id" align="center" label="序号" width="50px">
                    <template slot-scope="scope">
                        {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column prop="carriercd" label="船公司" align="center" :show-overflow-tooltip=true>
                    
                </el-table-column>
                <el-table-column prop="state" label="覆盖情况" align="center" :show-overflow-tooltip=true>
                    <template slot-scope="scope">
                        <span :class="scope.row.state === 1 ? blue : red">
                            {{scope.row.state === 1 ? '已覆盖' : '未覆盖'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="portEn" label="操作" align="center" :show-overflow-tooltip=true>
                    <template slot-scope="scope">
                        <span class="blue" style="cursor: pointer;" @click="handleViewClick(scope.$index,scope.row)">查看</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: [
            'tableCoverageRow'
        ],
        data(){
            return {
                blue : 'blue',
                red : 'red',
                ruleForm : {
                    companyName : '',
                    scac : '',
                    coverage : '',
                    coverageId : '',
                },
                companyNameList : [],
                coverageList : [
                    {
                        id: 0,
                        label: '全部',
                    },
                    {
                        id: 1,
                        label: '已覆盖',
                    },
                    {
                        id: 2,
                        label: '未覆盖',
                    }
                ],
                tableData : [],
            }
        },
        methods: { 
            //查询列表
            getTables(){
                this.$axios.get(this.commonJs.localUrl +
                 `/schedules/port/queryPortCoverage?portCode=${
                        this.tableCoverageRow.portCode
                    }&scac=${this.ruleForm.scac}&state=${
                         this.ruleForm.coverageId
                    }`,{
                    headers : {
                        Authorization: `Bearer ${this.getAuthorization()}`,
                        AccessToken: this.getCookie("token"),
                    }
                }).then(res => {
                    this.tableData = res.data.content;
                })
            },
            //船公司
            remoteCompanyNameMethod(value){
                if (!value) {
                   value = '';
                };
                this.$axios.get(this.commonJs.localUrl + 
                `/schedules/behavior/queryCompany?companyName=${value}`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.companyNameList = res.data.content;
                })
            },
            handleCompanyNameChange(value){
                if (value === null) {
                    return;
                };
                let obj = this.companyNameList.find(item => {
                    return (item.scac == value);
                });
                if(obj){
                    this.ruleForm.companyName = obj.companyName;
                    this.ruleForm.scac = obj.scac;
                };
                if(this.ruleForm.companyName === ''){
                    this.ruleForm.companyName = '';
                    this.ruleForm.scac = '';
                };
                this.getTables();
            },
            handleCompanyNameFounc(){
                this.$axios.get(this.commonJs.localUrl + 
                `/schedules/behavior/queryCompany`,
                    {
                        headers : {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token"),
                        }
                    }
                ).then(res => {
                    this.companyNameList = res.data.content;
                })
            },
            //覆盖的change事件
            handleCoverageChange(value){
                if (value === null) {
                    return;
                };
                let obj = this.coverageList.find(item => {
                    return (item.id == value);
                });
                if(obj){
                   this.ruleForm.coverage = obj.label;
                   this.ruleForm.coverageId = obj.id;
                };
                if(this.ruleForm.coverage === ''){
                    this.ruleForm.coverage = '';
                    this.ruleForm.coverageId = '';
                };
                this.getTables();
            },
            //查看
            handleViewClick(index,row){
                this.$bus.emit('handleTurn',row);
                this.$store.commit('handleTurnC',this.tableCoverageRow)
            },
            //关闭事件
            handleCloseClick(){
                this.$emit('handlePortCoverageClose');
            },
            //表格的斑马线
            tabRowClassName({row,rowIndex}){
                let index = rowIndex + 1;
                if(index %2 !== 0){
                    return 'warning-row'
                }
            },
        },
        mounted(){
            this.ruleForm.coverage = this.coverageList[0].label;
            this.ruleForm.coverageId = this.coverageList[0].id;
            this.getTables();
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-table th, /deep/.el-table tr{
        height: 30px;
    }
    /deep/.el-table th{
        height: 30px;
        padding: 0;
     }
    /deep/.el-table .warning-row{
        background:rgba(241, 245, 247, 1) !important;
    }
    /deep/.el-table .warning-row:hover{
        background:rgba(241, 245, 247, 1);
    }
    /deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
        // background-color:transparent;
        // background-color:#3bb0da50;
        // cursor: pointer;
    }
    
    .lr{
        float: right;
    }
    .lf{
        float: left;
    }
    .el_formContent{
        width: 300px;
        display: inline-block;
        /deep/.el-form-item__content{
            margin-left: 60px !important;
        }
    }
    .el_formContentMargin{
        margin-left: 20px;
        /deep/.el-form-item__content{
            margin-left: 70px !important;
        }
    }
    .headerContent{
        border-bottom: 1px solid #797979;
        margin-bottom: 10px;
    }
    .headeraddOrEdit{
        font-size: 18px;
    }
    .headeraddOrEditClose{
        font-size: 16px;
        cursor: pointer;
    }
    .blue{
        color : #3bafda;
    }
    .red{
        color : red;
    }
</style>