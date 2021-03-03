<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <breadcrumb :matched="matched"></breadcrumb>
        <!--loading-->
        <loading v-show="isLoading"></loading>
        <!--el-from-->
        <div class="serachBack">
            <el-form
                size="mini"
                label-position="right"
                label-width="70px">
                <div class="contentLeft">
                    <el-row>
                        <el-col style="width:22%">
                            <el-form-item label="标题">
                                <el-input placeholder="请输入" clearable maxlength="32" v-model="condition.title"/>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:22%">
                            <el-form-item label="栏目">
                                <el-cascader clearable v-model="condition.columnId" :props="{ checkStrictly: true }"
                                             style="width: 100%"
                                             @focus="listColumn"
                                             :loading="searching"
                                             placeholder="请选择栏目" :options="columns"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="contenRight">
                    <el-button size="small" class="serachBtn" @click="list()">搜索</el-button>
                </div>
                <div style="clear:both;"></div>
            </el-form>
        </div>
        <!--el-table-->
        <div class="tablePage">
            <div class="buttonTop">
                <el-button size="small" class="clickColor butn" @click="openDialog()">新增</el-button>
            </div>

            <el-table
                :data="tableData"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="({rowIndex}) => rowIndex % 2 ? 'warning-row' : ''"
                tooltip-effect="dark"
                @row-dblclick="handleClick"
                @selection-change="selections = $event"
                @sort-change="onSortChange"
                ref="table">
                <el-table-column label="序号" width="45">
                    <template slot-scope="{$index}">
                        {{ $index + 1 }}
                    </template>
                </el-table-column>

                <el-table-column prop="title" label="标题" align="left" show-overflow-tooltip/>

                <el-table-column prop="directoryName" label="内容目录" align="left" show-overflow-tooltip width="200">
                    <div slot-scope="{row}">
                        {{ row.directoryName }}
                    </div>
                </el-table-column>

                <el-table-column prop="column.columnName" label="栏目" align="left" show-overflow-tooltip width="200">
                    <div slot-scope="{row}">
                        {{ row.column.columnName }}
                        <span v-if="row.column.directoryName">
                            ({{ row.column.directoryName }})
                        </span>
                    </div>
                </el-table-column>

                <el-table-column prop="create_time" label="创建时间" align="left" show-overflow-tooltip width="150"
                                 sortable="custom">
                    <template slot-scope="{row}">
                        {{ row.createTime | date }}
                    </template>
                </el-table-column>

                <el-table-column prop="update_time" label="更新时间" align="left" show-overflow-tooltip width="150"
                                 sortable="custom">
                    <template slot-scope="{row}">
                        {{ row.updateTime | date }}
                    </template>
                </el-table-column>

                <el-table-column prop="operator" label="操作人" align="left" show-overflow-tooltip width="150"/>

                <el-table-column align="left" width="80" label="操作">
                    <template slot-scope="{row}">
                        <el-link type="danger" :underline="false" @click="remove(row)">删除</el-link>
<!--                        <el-link type="danger" :underline="false" style="margin-left: 10px">移入草稿箱</el-link>-->
                    </template>
                </el-table-column>

                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>
            <!--分页-->
            <the-pagination
                ref="refPagination"
                :pageNumber="page.num"
                :attribute="{handleChange}"
                class="lr refPagination"/>

            <el-dialog
                :visible.sync="dialog"
                v-if="dialog"
                width="950px"
                top="10vh"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false">
                <content-add :content-id="current.id" @close="closeDialog"/>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
import loading from "@/components/Loading/outLoading.vue";
import ThePagination from "@/components/ThePagination/ThePagination.vue";
import noData from "@/components/noData/index.vue";
import contentAdd from "@/views/page/cms/content/contentAdd";
import {handleColumn, listColumn, lookFor, confirm} from '../utils';
import dayjs from "dayjs";

export default {

    mixins: [confirm],

    filters: {
        date(value, format = 'YYYY-MM-DD HH:mm:ss') {
            return value ? dayjs(value).format(format) : '';
        }
    },

    props: {
        columnId: Number
    },

    computed: {
        columns() {
            return handleColumn(this.dropdown.columns || [], false);
        }
    },

    data() {
        return {
            matched: "", //路径
            isLoading: false, //
            dialog: false,
            searching: false,

            page: {
                num: 1,
                size: 10
            },

            condition: {
                columnId: [],
                title: ''
            },

            tableData: [],
            selections: [],
            current: {},

            dropdown: {
                columns: null
            }
        };
    },

    components: {
        Breadcrumb,
        loading,
        noData,
        ThePagination,
        contentAdd
    },

    methods: {
        closeDialog(force) {
            (force ? Promise.resolve() : this.$confirm2('确认关闭?')).then(() => {
                this.dialog = false;
                this.$nextTick(() => this.list());
            }).catch(() => null);
        },

        openDialog(row) {
            this.current = row || {};
            this.dialog = true;
        },

        handleChange({pageNo, pageSize}) {
            this.page.num = pageNo;
            this.page.size = pageSize;
            return this.list();
        },

        onSortChange({prop, order}) {
            if (order === 'ascending') {
                this.condition.orderBy = `${prop}`;
            } else if (order === 'descending') {
                this.condition.orderBy = `${prop} desc`;
            } else {
                this.condition.orderBy = null;
            }
            return this.list();
        },

        handleClick(row) {
            this.openDialog(row);
        },

        list() {
            this.isLoading = true;
            return this.$http.post('/schedules/cms/listContent', {
                ...this.condition,
                columnId: (this.condition.columnId || []).slice(-1)[0]
            }, {params: this.page}).then(res => {
                this.tableData = res.content || [];
                this.$refs.refPagination.page.total = res.total;
                this.$refs.refPagination.page.pageNo = res.pageNum;
                this.page.num = res.pageNum;
                this.$refs.refPagination.changeValue();
            }).catch(reason => {
                this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '查询错误');
            }).finally(() => this.isLoading = false);
        },

        remove(row) {
            this.$confirm2('确定删除?').then(() => {
                this.isLoading = true;
                return this.$http.get('/schedules/cms/removeContent/' + row.id, this.page).then(res => {
                    this.$message.success('删除成功');
                    this.$nextTick(() => this.list());
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '删除错误');
                }).finally(() => this.isLoading = false);
            }).catch(() => null);
        },

        listColumn() {
            if (!Array.isArray(this.dropdown.columns)) {
                this.seaching = true;
                return listColumn().then(res => {
                    this.dropdown.columns = res.content || [];
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '删除错误');
                }).finally(() => this.seaching = false);
            }
            return Promise.resolve();

        },

        lookFor(id) {
            return lookFor(id, this.columns);
        }
    },

    mounted() {
        this.matched = this.$route.matched;

        if (typeof this.columnId === 'number') {
            this.isLoading = true;
            this.listColumn().then(() => {
                this.condition.columnId = this.lookFor(this.columnId);
                return this.list();
            }).finally(() => this.isLoading = false);
        } else {
            this.list();
        }
    }
};
</script>

<style lang="scss" scoped>
/deep/ .el-row .el-col:nth-last-of-type(1) {
    margin-right: 0;
}

/deep/ .el-col {
    margin-right: 20px;
}

/deep/ .el-table th, /deep/ .el-table tr {
    height: 30px;
}

/deep/ .el-table th {
    height: 30px;
    padding: 0;
}

/deep/ .refPagination input {
    width: 100px !important;
}

/deep/ .pagination {
    float: right !important;
    padding-top: 10px;
}

/deep/ .el-table .warning-row {
    background: rgba(241, 245, 247, 1) !important;
}

/deep/ .el-table .warning-row:hover {
    background: rgba(241, 245, 247, 1);
}

/deep/ .el-table .cell {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.tablePage /deep/ .el-icon-arrow-down::before {
    color: red;
    display: none;
    margin-left: -10px;
    height: 0;
}

/deep/ .el-table__column-filter-trigger {
    width: 0px;
    height: 0px;
}

/deep/ .el-table .caret-wrapper {
    height: 23px;
}

/deep/ .el-table .sort-caret.ascending {
    top: 0px;
}

/deep/ .el-table .sort-caret.descending {
    bottom: 1px;
}

.addUserDeatil {
    overflow: hidden !important;
    padding-top: 50px;

    /deep/ .el-dialog {
        height: auto;
        // overflow-y: auto;
    }
}

.basicPortContent {
    position: relative;
    overflow: hidden;
    padding: 20px 20px 20px 20px;

    .serachBack {
        background-color: #fff;
        padding: 20px 20px 0px 20px;
        margin-bottom: 10px;
        position: relative;
    }

    .tablePage {
        background-color: #fff;
        padding: 20px 20px 60px 20px;
    }

    .refPagination {
        width: 100%;
        background-color: #fff;
    }
}

/deep/ .el-table__empty-text {
    width: 100%;
}

.contentLeft {
    float: left;
    width: 90%;
}

.contenRight {
    position: absolute;
    right: 20px;
    bottom: 5px;
}

.serachBtn {
    padding: 9px 35px;
    color: #fff;
    background-color: rgba(4, 153, 255, 1);
    margin-bottom: 10px;
    border: 1px solid #3bafda;
}

.buttonTop {
    margin-bottom: 20px;

    .clickColor {
        background-color: #fff;
        padding: 9px 27px;
        margin-right: 10px;
    }

    .normals {
        border: 1px solid #3bafda;
        color: #3bafda;
    }

    .abnormal {
        border: 1px solid #ff0000;
        color: #ff0000;
    }

    .butn {
        margin-right: 0;
        background-color: #ff9000;
        border: 1px solid #ff9000;
        color: #fff;
        padding: 9px 35px;
        float: right;
        margin-bottom: 20px;
    }

    .dered {
        float: right;
        border: 1px solid #FF0000;
        color: #FF0000;
        padding: 9px 35px;
        background-color: #fff;
        margin-right: 10px;
    }
}

</style>