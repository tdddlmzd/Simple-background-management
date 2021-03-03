<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop" ref="item" class="html-field">
        <quill-editor :options="editorOption" @blur="onBlur" @focus="onFocus" :value="value"
                      @input="$emit('input', $event)"
                      @change="onChange"
                      ref="quillEditor" :class="{'is-focus': isFocus}"/>
        <choose-image v-model="imageDialog" @choose="onSelect" :images.sync="images2"/>
    </el-form-item>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor';
import chooseImage from "../chooseImage";

export default {
    type: [0],

    inheritAttrs: false,

    props: {
        label: String,
        value: String,
        images: Array
    },

    components: {
        quillEditor,
        chooseImage
    },

    data() {
        return {
            imageDialog: false,
            isFocus: false
        }
    },

    computed: {
        editorOption() {
            return {
                placeholder: "请在这里输入内容",
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                        ['blockquote'],     //引用，代码块
                        [{'header': 1}, {'header': 2}],        // 标题，键值对的形式；1、2表示字体大小
                        [{'list': 'ordered'}, {'list': 'bullet'}],     //列表
                        [{'script': 'sub'}, {'script': 'super'}],   // 上下标
                        [{'indent': '-1'}, {'indent': '+1'}],     // 缩进
                        // [{'size': ['small', false, 'large', 'huge']}], // 字体大小
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],     //几级标题
                        // [{'font': []}],     //字体
                        [{'align': []}],    //对齐方式
                        [{'color': []}, {'background': []}],     // 字体颜色，字体背景颜色
                        ['clean'],    //清除字体样式
                        ['image']    //上传图片
                    ]
                }
            }
        },

        quill() {
            return this.$refs.quillEditor.quill;
        },

        images2: {
            get() {
                return this.images || [];
            },

            set(value) {
                this.$emit('update:images', value);
            }
        }
    },

    methods: {
        openImage() {
            this.range = this.quill.getSelection();
            this.imageDialog = true;
        },

        onSelect(file) {
            const range = this.range || this.quill.getSelection();
            this.quill.insertEmbed(range !== null ? range.index : 0, 'image', file.url, 'user');
            this.imageDialog = false;
        },

        onBlur() {
            this.isFocus = false;
            this.$refs.item.onFieldBlur();
        },

        onFocus() {
            this.isFocus = true;
        },

        onChange() {
            this.$refs.item.onFieldChange();
        }
    },

    mounted() {
        this.quill.getModule('toolbar').addHandler('image', this.openImage);
    }
}
</script>

<style scoped lang="scss">
.html-field {
    .quill-editor {

        /deep/ .ql-editor {
            height: 300px;
        }

        /deep/ .ql-toolbar, /deep/ .ql-container {
            border: none;
        }

        border-radius: 4px;
        border: #DCDFE6 1px solid;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);

        &.is-focus {
            border-color: #409EFF;
        }
    }

    &.is-error {
        .quill-editor {
            border-color: #F56C6C !important;
        }
    }
}
</style>