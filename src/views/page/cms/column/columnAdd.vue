<template>
    <div class="routeAdd">
        <loading v-show="isLoading"/>
        <el-form
            label-position="right"
            label-width="120px"
            :show-message="false"
            :model="content"
            ref="form"
            size="mini">
            <div class="headerContent">
                <label class="headeraddOrEdit">{{ addOrEdit }}</label>
                <i class="headeraddOrEditClose el-icon-close lr" @click="$emit('close', true)"></i>
            </div>
            <div class="scrollP">
                <ul class="routeUl">
                    <li class="routeLi">
                        <el-row>
                            <el-col>
                                <el-form-item label="标题" prop="columnName" required>
                                    <el-input v-model="content.columnName" maxlength="128" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="父栏目" prop="parentId" required>
                                    <el-cascader v-model="content.parentId" :props="{ checkStrictly: true }"
                                                 style="width: 100%"
                                                 placeholder="请选择栏目" :options="cols"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-form-item label="目录名" prop="directoryName">
                                    <el-input v-model="content.directoryName" maxlength="25" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="隐藏" prop="isHidden">
                                    <el-checkbox v-model="content.isHidden"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="排序" prop="sort">
                                    <el-input-number v-model="content.sort" :max="100" :min="0"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </li>
                </ul>
                <div class="save">
                    <el-button class="saveBtn" @click="save">保存</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>


import loading from "@/components/Loading/loading.vue";
import {handleColumn, lookFor, confirm} from '../utils';

export default {

    mixins: [confirm],

    props: {
        columnId: Number,
        parentId: Number,
        columns: Array
    },

    computed: {
        addOrEdit() {
            return this.columnId ? '修改' : '新增';
        },

        cols() {
            return handleColumn(this.columns, true);
        },

        columnMap() {
            const m = new Map, each = (array) => {
                (array || []).forEach(col => {
                    m.set(col.value, col);
                    each(col.children);
                });
            };
            each(this.cols);
            return m;
        }
    },

    data() {
        return {
            heightInner: '',
            heightScreen: '',
            isLoading: false,
            searching: false,

            content: {
                id: null,
                columnName: '',
                parentId: [],
                directoryName: '',
                isHidden: false,
                sort: 0
            }
        };
    },
    components: {
        loading
    },

    methods: {

        //监听窗口变化
        winResize() {
            this.heightScreen = document.body.clientHeight;
            window.onresize = () => {
                window.screenHeight = document.body.clientHeight
                this.heightScreen = window.screenHeight
            };
        },

        getColumn() {
            if (this.content.id) {
                this.isLoading = true;
                this.$http.get('/schedules/cms/column/' + this.content.id).then(res => {
                    this.content = res.content || {};
                    this.content.parentId = this.lookFor(this.content.parentId || 0);
                }).catch((reason) => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '获取栏目错误');
                    this.content.id = null;
                }).finally(() => this.isLoading = false);
            }
        },

        save() {

            this.$refs.form.validate().then(() => {
                this.isLoading = true;

                const parentId = this.content.parentId.slice(-1)[0] || 0;

                this.$http.post('/schedules/cms/addColumn', {
                    ...this.content,
                    parentId: parentId,
                    model: null,
                    contents: null,
                    createTime: null,
                    operator: null,
                    updateTime: null,
                    children: null
                }).then(() => {
                    this.$emit('close', true);
                    this.$message.success('保存成功!');
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '保存错误');
                }).finally(() => this.isLoading = false);

            }).catch(() => {
                this.$message.warning('请填写必填字段');
            });
        },

        lookFor(id) {
            return lookFor(id, this.cols);
        },

    },

    mounted() {
        this.$set(this.content, 'id', this.columnId);
        this.content.parentId = this.lookFor(this.parentId || 0);

        this.getColumn();
        // his.winResize();


    },

    watch: {
        heightScreen(val) {
            this.heightInner = (val - 80) + 'px'
        }
    },
    destroyed() {
        // window.removeEventListener("resize", this.getWidth);
    },
};
</script>
<style lang="scss" scoped>
/deep/ .el-table .warning-row {
    background: rgba(241, 245, 247, 1) !important;
}

/deep/ .el-table .warning-row:hover {
    background: rgba(241, 245, 247, 1);
}

/deep/ .el-dialog__body {
    padding: 10px !important;
}

/deep/ .el-col {
    margin-right: 0px !important;
}

/deep/ .el-row .el-col:nth-last-of-type(1) {
    margin-right: 0;
}

.routeAdd {
    position: relative;
    overflow: auto;
}

.lf {
    float: left;
}

.lr {
    float: right;
}

.headerContent {
    border-bottom: 1px solid #797979;
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

.switchClass {
    position: absolute;
    left: -50px;
    top: 5px;
}

.scrollP {
    overflow-y: auto;
    height: 75vh;
}
</style>