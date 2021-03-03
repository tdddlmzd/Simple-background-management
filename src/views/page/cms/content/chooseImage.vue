<template>
    <el-dialog :visible="value" @update:visible="$emit('input', $event)" center append-to-body>
        <el-upload
            class="choose-upload"
            :file-list="images"
            ref="upload"
            style="padding: 20px"
            accept="image/png, image/jpeg, image/gif"
            :action="action"
            :before-upload="beforeUpload"
            :on-success="upSuccess"
            :on-error="upError"
            :on-change="upChange"
            :on-remove="upChange"
            :http-request="upImage"
            list-type="picture-card">
            <i class="el-icon-plus"/>
            <div slot="file" slot-scope="{file}">
                <jz-image :src="file.url" class="el-upload-list__item-thumbnail"
                          @error="() => $set(file, 'status', 'error')"
                          @loaded="() => $set(file, 'status', 'success')"/>

                <template v-if="file.status === 'loading'">
                    <span class="el-upload-list__item-actions hover">
                        <span><i class="el-icon-loading"/></span>
                    </span>
                </template>
                <template v-else-if="file.status === 'success'">
                    <span class="el-upload-list__item-actions">
                        <span @click.prevent="onChoose(file)"><i class="el-icon-thumb"/></span>
                        <span @click.prevent="onRemove(file)"><i class="el-icon-delete"/></span>
                    </span>
                </template>
                <template v-else>
                    <span class="el-upload-list__item-actions">
                        <span @click.prevent="onRemove(file)"><i class="el-icon-delete"/></span>
                    </span>
                </template>
            </div>
        </el-upload>

    </el-dialog>
</template>

<script>

import ElementUI from 'element-ui';
import _ from 'lodash';

const JzImage = {
    mixins: [ElementUI.Image],

    created() {
        this.handleLoad = _.wrap(this.handleLoad, function (func) {
            func.apply(this, Array.prototype.slice.call(arguments, 1));
            this.$emit('loaded');
        })
    }
};

export default {
    name: "choose-image",

    props: {
        value: Boolean,
        images: Array
    },

    components: {
        JzImage
    },

    computed: {
        action() {
            return `/schedules/cms/upload`
        }
    },

    methods: {

        beforeUpload(file) {
            this.$set(file, 'status', 'loading');
        },

        upSuccess(realUrl, file) {
            file.url = realUrl;
            this.$emit('upload-success', file);
        },

        upError(error, file) {
            this.$set(file, 'status', 'error');
            this.$emit('upload-error', error, file);
        },

        upChange(file, fileList) {
            this.$emit('update:images', fileList);
        },

        upImage(option) {
            const data = new FormData;
            data.append(option.filename, option.file, option.file.name);

            return this.$http.post(option.action, data).then(res => Promise.resolve(res.content));
        },

        onRemove(file) {
            this.$refs.upload.handleRemove(file);
            this.$emit('remove', file);
        },

        onChoose(file) {
            this.$emit('choose', file);
        }
    }
}
</script>

<style lang="scss" scoped>

.choose-upload {

    /deep/ .el-upload-list__item {
        outline: none;
    }

    .el-upload-list__item-actions {
        cursor: pointer;
        outline: none;

        &:hover, &.hover {
            opacity: 1;

            span {
                display: inline-block;
            }
        }
    }
}


</style>