<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <breadcrumb :matched="matched"/>
        <!--loading-->
        <loading v-show="isLoading"/>
        <!--el-from-->
<!--        <div class="serachBack">-->
<!--            <el-form-->
<!--                size="mini"-->
<!--                label-position="right"-->
<!--                label-width="70px">-->
<!--                <div class="contentLeft">-->
<!--                    <el-row>-->
<!--                        <el-col style="width:22%">-->
<!--                            <el-form-item label="标题">-->
<!--                                <el-input placeholder="请输入" clearable maxlength="32" v-model="condition.title"/>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                </div>-->
<!--                <div class="contenRight">-->
<!--                    <el-button size="small" class="serachBtn" @click="list()">搜索</el-button>-->
<!--                </div>-->
<!--                <div style="clear:both;"></div>-->
<!--            </el-form>-->
<!--        </div>-->
        <!--el-table-->
        <div class="tablePage">
            <div class="buttonTop">
                <el-button size="small" class="clickColor normals" @click="list()">刷新</el-button>
                <el-button size="small" class="clickColor butn" @click="openDialog()">新增</el-button>
            </div>

            <el-table
                :data="tableData"
                row-key="id"
                style="width: 100%;"
                :header-cell-style="{background:'#3bafda',color:'#ffffff',fontSize:'12px'}"
                :row-class-name="({rowIndex}) => rowIndex % 2 ? 'warning-row' : ''"
                tooltip-effect="dark"
                @row-dblclick="handleClick"
                @selection-change="selections = $event"
                @sort-change="onSortChange"
                ref="table">
                <el-table-column prop="columnName" label="标题" align="left" show-overflow-tooltip min-width="200">
                    <el-link :underline="false" slot-scope="{row}"
                             @click="$router.push({name: 'ContentManager', params: {columnId: row.id}})">
                        {{ row.columnName }} <span>[{{ row.contentCount }}]</span>
                    </el-link>
                </el-table-column>

                <el-table-column prop="directoryName" label="目录" align="left" show-overflow-tooltip min-width="200"/>


                <el-table-column prop="isHidden" label="隐藏" align="left" show-overflow-tooltip width="80">
                    <span slot-scope="{row}">
                        {{ row.isHidden ? '是' : '否' }}
                    </span>
                </el-table-column>

                <el-table-column prop="createTime" label="创建时间" align="left" show-overflow-tooltip width="150">
                    <span slot-scope="{row}">
                        {{ row.createTime | date }}
                    </span>
                </el-table-column>

                <el-table-column prop="update_time" label="更新时间" align="left" show-overflow-tooltip width="150">
                    <template slot-scope="{row}">
                        {{ row.updateTime | date }}
                    </template>
                </el-table-column>

                <el-table-column prop="operator" label="操作人" align="left" show-overflow-tooltip width="150"/>

                <el-table-column align="left" width="150" label="操作">
                    <div slot-scope="{row}">
                        <el-link :disabled="row.id === 0" type="primary" style="margin-right: 10px" :underline="false"
                                 @click="openDialog({parentId: row.id})">添加子栏目
                        </el-link>
                        <el-link :disabled="row.id === 0" type="danger" :underline="false" @click="remove(row)">删除
                        </el-link>
                    </div>
                </el-table-column>

                <template slot="empty">
                    <noData></noData>
                </template>
            </el-table>

            <el-dialog
                :visible.sync="dialog"
                v-if="dialog"
                width="950px"
                top="10vh"
                append-to-body
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false">
                <column-add :column-id="current.id" :parent-id="current.parentId" :columns="tableData"
                            @close="closeDialog"/>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
import loading from "@/components/Loading/outLoading.vue";
import noData from "@/components/noData/index.vue";
import columnAdd from "@/views/page/cms/column/columnAdd";
import dayjs from 'dayjs';
import {listColumn, confirm} from '../utils';

export default {

    mixins: [confirm],

    filters: {
        date(value, format = 'YYYY-MM-DD HH:mm:ss') {
            return value ? dayjs(value).format(format) : '';
        }
    },

    data() {
        return {
            matched: "", //路径
            isLoading: false, //
            dialog: false,

            page: {
                num: 1,
                size: 10
            },

            condition: {},

            tableData: [],
            selections: [],
            current: {}
        };
    },
    components: {
        Breadcrumb,
        loading,
        noData,
        columnAdd
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
            if (row.id !== 0) {
                this.openDialog({id: row.id});
            }
        },

        list() {
            this.isLoading = true;
            return listColumn(true).then(res => {
                this.tableData = res.content || [];
            }).catch(reason => {
                this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '查询错误');
            }).finally(() => this.isLoading = false);
        },

        remove(row) {

            this.$confirm2('确定删除该栏目? 栏目下内容将会移入草稿箱内').then(() => {
                this.isLoading = true;
                return this.$http.get('/schedules/cms/removeColumn/' + row.id, this.page).then(res => {
                    this.$message.success('删除成功');
                    this.$nextTick(() => this.list());
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '删除错误');
                }).finally(() => this.isLoading = false);
            }).catch(() => null);

        }
    },

    mounted() {
        this.matched = this.$route.matched;
        this.list();
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
    text-align: right;

    .clickColor {
        background-color: #fff;
        padding: 9px 27px;
        margin-right: 10px;

        & + & {
            margin-left: 10px;
        }
    }

    .normals {

        background-color: rgba(4, 153, 255, 1);
        color: #fff;
        padding: 9px 35px;
        margin-bottom: 20px;
        margin-right: 0;
        border: 1px solid #3bafda;
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