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
                                <el-form-item label="模型名" prop="modelName" required>
                                    <el-input v-model="content.modelName" maxlength="64" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="组件名" prop="componentName" required>
                                    <el-input v-model="content.componentName" maxlength="32" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="缩略图" prop="isThumbnail">
                                    <el-checkbox v-model="content.isThumbnail"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-for="(field, index) in fields" :key="field.index">
                            <el-col :span="7">
                                <el-form-item label="字段名" :prop="`fields[${index}].name`" required>
                                    <el-input v-model="field.org.name" placeholder="请输入字段名" clearable maxlength="64"/>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="属性名" :prop="`fields[${index}].property`" label-width="80px" required>
                                    <el-input v-model="field.org.property" placeholder="请输入属性名" clearable maxlength="32"/>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="类型" :prop="`fields[${index}].type`" label-width="80px" required>
                                    <el-select v-model="field.org.type" placeholder="请选择类型" :loading="searching">
                                        <el-option v-for="(opt, index) in types" :key="opt.id" :label="opt.label"
                                                   :value="opt.id"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="3">
                                <el-form-item label="必填" :prop="`fields[${index}].isRequired`" label-width="80px">
                                    <el-checkbox v-model="field.org.isRequired"/>
                                </el-form-item>
                            </el-col>

                            <el-col :span="2">
                                <el-form-item label-width="20px">
                                    <el-link @click="addField(field.index)" icon="el-icon-plus" :underline="false"
                                             style="margin-right: 10px"/>
                                    <el-link @click="removeField(field.index)" icon="el-icon-close" type="danger"
                                             :underline="false" v-if="fields.length > 1"/>
                                </el-form-item>
                            </el-col>

                            <el-col :span="24" v-if="field.org.type === 1">
                                <el-form-item label="默认值" :prop="`fields[${index}].defaultValue`">
                                    <el-input v-model="field.org.defaultValue" placeholder="请输入默认值" clearable maxlength="125"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
                <div class="save" v-if="getCookie('userName') === 'chenxiwang'">
                    <el-button class="saveBtn" @click="save">保存</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>


import loading from "@/components/Loading/loading.vue";

export default {

    props: {
        modelId: Number
    },

    computed: {
        addOrEdit() {
            return this.modelId ? '修改' : '新增';
        },

        isRequired() {
            const isDef = (value) => {
                return value !== '' && typeof value !== 'undefined' && value !== null;
            }
            if (this.content.fields.length === 1) {
                const field = this.content.fields[0];
                return isDef(field.name) || isDef(field.property) || isDef(field.type);
            }
            return true;
        },

        fields() {
            const fields = [];
            this.content.fields.forEach((i, j) => {
                if (!i.delFlag) {
                    fields.push({...i, index: j, org: i});
                }
            });
            return fields;
        }
    },

    data() {
        return {
            heightInner: '',
            heightScreen: '',
            isLoading: false,
            searching: false,

            types: [],

            content: {
                id: null,
                componentName: '',
                modelName: '',
                isThumbnail: false,
                fields: []
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

        getModel() {
            if (this.content.id) {
                this.isLoading = true;
                this.$http.get('/schedules/cms/model/' + this.content.id).then(res => {
                    this.content = res.content || {};

                    if (!this.content.fields || !this.content.fields.length) {
                        this.content.fields = [];
                        this.addField(0);
                    }
                }).catch((reason) => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '获取栏目错误');
                    this.content.id = null;
                }).finally(() => this.isLoading = false);
            } else {
                this.addField(0);
            }
        },

        save() {
            this.$refs.form.validate().then(() => {

                const fields = this.content.fields.filter(it => !it.delFlag);

                if (new Set(fields.filter(it => !it.delFlag).map(it => it.name)).size !== fields.length) {
                    return this.$message.warning('字段名不能重复');
                }

                if (new Set(fields.map(it => it.property)).size !== fields.length) {
                    return this.$message.warning('属性名不能重复');
                }

                this.content.fields.forEach(field => {
                    if (field.type !== 1) {
                        field.defaultValue = null;
                    }
                });

                this.isLoading = true;
                this.$http.post('/schedules/cms/addModel', {...this.content, createTime: null, updateTime: null, operator: null}).then(() => {
                    this.$emit('close', true);
                    this.$message.success('保存成功!');
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '保存错误');
                }).finally(() => this.isLoading = false);

            }).catch(() => {
                this.$message.warning('请填写必填字段');
            });
        },

        addField(index) {

            const field = this.content.fields[index] || {};

            this.content.fields.splice(index + 1, 0, {
                name: '',
                type: '',
                isRequired: false,
                ...field,
                property: '',
                defaultValue: '',
                id: null
            });
        },
        removeField(index) {
            const field = this.content.fields[index];
            if (field.id) {
                this.$set(field, 'delFlag', true);
            } else {
                this.content.fields.splice(index, 1);
            }
        },

        listType() {
            if (!Array.isArray(this.types) || !this.types.length) {
                this.searching = true;
                this.$http.get('/schedules/cms/listType').then((res) => {
                    this.types = res.content || [];
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '类型查询错误');
                }).finally(() => this.searching = false);
            }
        }
    },

    mounted() {
        this.$set(this.content, 'id', this.modelId);
        this.listType();
        this.getModel();
        // this.winResize();


    },

    watch: {
        heightScreen(val) {
            this.heightInner = (val - 80) + 'px'
        },

        'fields'(fields) {
            if (fields.length === 1) {
                this.$nextTick()
                    .then(() => {
                        this.$refs.form.clearValidate(fields.flatMap((i, j) => Object.keys(i).map(k => `fields[${j}].${k}`)));
                    });
            }
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
    min-height: 75vh;
}
</style>