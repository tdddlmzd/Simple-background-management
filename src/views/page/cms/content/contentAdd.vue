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
                                <el-form-item label="标题" prop="title" required>
                                    <el-input v-model="content.title" maxlength="128" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="关键字" prop="keywords">
                                    <el-input v-model="content.keywords" maxlength="255" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="描述" prop="description">
                                    <el-input v-model="content.description" maxlength="255" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="目录" prop="directoryName">
                                    <el-input v-model="content.directoryName" maxlength="16" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-if="content.model.isThumbnail">
                            <el-col :span="24">
                                <el-form-item label="略缩图" prop="thumbnail">
                                    <el-image :src="content.thumbnail" @click.native="openImage()"
                                              style="cursor: pointer">
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                    <choose-image v-model="imageDialog" :images.sync="images" @choose="onImageSelect"/>
                                    <el-link icon="el-icon-delete" type="danger" :underline="false"
                                             @click="content.thumbnail = ''"
                                             style="font-size: 18px; margin-left: 10px" v-if="content.thumbnail"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="模型" prop="modelId" required>
                                    <el-select style="width: 100%" v-model="content.modelId" placeholder="请选择模型"
                                               filterable :loading="searching"
                                               @change="onChangeModel">
                                        <el-option v-for="opt in list.models" :key="opt.id" :label="opt.modelName"
                                                   :value="opt.id"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="栏目" prop="columnId" required>
                                    <el-cascader v-model="content.columnId" :props="{ checkStrictly: true }"
                                                 style="width: 100%"
                                                 placeholder="请选择栏目" :options="columns" ref="cascader"
                                                 @change="onCascaderChange"/>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <el-row v-for="(variable, index) in content.variables" :key="index">
                            <el-col :span="24">
                                <component :is="getComponent(variable.field.type, variable.field.property)"
                                           v-bind="getBindingData(variable, index)"
                                           v-on="listeners"
                                           :value="variable.value"
                                           @input="$set(variable, 'value', $event)" :images.sync="images"/>
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

import htmlField from "@/views/page/cms/content/components/htmlField";
import imageField from "@/views/page/cms/content/components/imageField.vue";
import linkField from "@/views/page/cms/content/components/linkField.vue";
import numberField from "@/views/page/cms/content/components/numberField.vue";
import selectField from "@/views/page/cms/content/components/selectField";
import textField from "@/views/page/cms/content/components/textField.vue";
import shippingName from "@/views/page/cms/content/components/shippingName";
import shippingCode from "@/views/page/cms/content/components/shippingCode";

import chooseImage from "@/views/page/cms/content/chooseImage";

import {lookFor, listColumn} from '../utils';

const components = [
    htmlField,
    imageField,
    linkField,
    numberField,
    selectField,
    textField,
];

export default {

    props: {
        contentId: Number
    },

    computed: {
        addOrEdit() {
            return this.contentId ? '修改' : '新增';
        },

        columns() {
            const map = (array) => {
                return array.map(it => ({
                    value: it.id,
                    label: it.columnName,
                    children: Array.isArray(it.children) && it.children.length ? map(it.children) : null
                }))
            }
            return map(this.list.columns || []);
        },

        variables() {
            const variables = {};
            this.content.variables.forEach(key => {
                variables[key.field.property] = key;
            });
            return variables;
        },

        listeners() {
            const listeners = {};
            Object.keys(this.variables).forEach(key => {
                listeners['update:' + key] = (value) => {
                    this.$set(this.variables[key], 'value', value);
                };
            });
            return listeners;
        }
    },

    data() {
        return {
            heightInner: '',
            heightScreen: '',
            isLoading: false,
            searching: false,
            imageDialog: false,

            images: [],

            content: {
                title: '',
                keywords: '',
                description: '',
                thumbnail: '',
                columnId: '',
                directoryName: '',
                variables: [],
                model: {
                    isThumbnail: false
                },
                modelId: ''
            },

            list: {
                models: [],
                columns: []
            },

            history: {}
        };
    },

    components: {
        loading,
        chooseImage,
        shippingName,
        shippingCode
    },

    methods: {

        onCascaderChange() {
            this.$nextTick(() => this.$refs['cascader'].toggleDropDownVisible(false));
        },

        //监听窗口变化
        winResize() {
            this.heightScreen = document.body.clientHeight;
            window.onresize = () => {
                window.screenHeight = document.body.clientHeight
                this.heightScreen = window.screenHeight
            };
        },

        getContent() {
            if (this.content.id) {
                this.isLoading = true;
                this.$http.get('/schedules/cms/content/' + this.content.id).then(res => {
                    this.content = res.content || {};
                    this.content.columnId = this.lookFor(this.content.columnId);
                }).catch((reason) => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '获取文章错误');
                    this.content.id = null;
                }).finally(() => this.isLoading = false);
            }
        },

        lookFor(id) {
            return lookFor(id, this.list.columns);
        },

        save() {
            this.$refs.form.validate().then(() => {
                this.isLoading = true;

                const columnId = (this.content.columnId || []).slice(-1)[0]

                this.$http.post('/schedules/cms/addContent', {
                    ...this.content,
                    columnId: columnId,
                    createTime: null,
                    updateTime: null,
                    column: null,
                    model: null,
                    operator: null
                }).then(res => {
                    this.$emit('close', true);
                    this.$message.success('保存成功!');
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '保存错误');
                }).finally(() => this.isLoading = false);
            }).catch((reason) => {
                console.error(reason);
                this.$message.warning('请填写必填字段');
            });
        },

        listModel() {
            if (!Array.isArray(this.list.models) || !this.list.models.length) {
                this.searching = true;
                this.$http.get('/schedules/cms/listModel').then(res => {
                    this.list.models = res.content || [];
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '错误');
                }).finally(() => this.searching = false);
            }
        },

        listColumn() {
            if (!Array.isArray(this.list.columns) || !this.list.columns.length) {
                this.isLoading = true;
                return listColumn().then(res => {
                    this.list.columns = res.content || [];
                }).catch(reason => {
                    this.$message.error(typeof reason === 'string' ? reason : reason && reason.message ? reason.message : '错误');
                }).finally(() => this.isLoading = false);
            }
            return Promise.resolve();
        },

        onChangeModel(id) {
            const model = this.list.models.find(it => it.id === id) || {}, fields = model.fields || [];
            if (!this.history.hasOwnProperty(model.id)) {
                this.history[model.id] = fields.map(it => {
                    return {
                        field: it,
                        fieldId: it.id
                    }
                });
            }

            this.content.model = model;
            this.content.variables = this.history[model.id];
        },

        getComponent(type, property) {
            if (type === 10) {
                let comp = components.find(it => it.name === property);
                if (!comp) {
                    comp = this.$options.components[property];
                    if (!comp) {
                        comp = Object.values(this.$options.components).find(it => it.name === property
                            || (Array.isArray(it.properties) && it.properties.includes(property)));
                        if (!comp) {
                            comp = {
                                render(h) {
                                    return h('span', {staticStyle: {color: 'red'}}, [`没有找到${property}组件`]);
                                }
                            }
                        }
                    }
                }
                return comp;
            } else {
                return components.find(it => it.type.includes(type));
            }
        },

        getBindingData(variable, index) {
            const variables = {};
            const object = {...variable.field, label: variable.field.name, prop: `variables[${index}].value`, variables};
            Object.keys(this.variables).forEach(key => {
                variables[key] = this.variables[key].value;
            });
            return object;
        },

        openImage() {
            this.imageDialog = true;
        },

        onImageSelect(file) {
            this.content.thumbnail = file.url;
            this.imageDialog = false;
        }
    },

    mounted() {
        this.$set(this.content, 'id', this.contentId);
        this.listModel();
        this.listColumn().then(() => this.getContent());
        // this.winResize();
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

.el-image {
    /deep/ .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background: #f5f7fa;
        color: #909399;
        font-size: 30px;
    }
}


</style>