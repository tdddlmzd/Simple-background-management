<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop" class="image-field">
        <el-image :src="value" fit="cover" @click.native="openImage">
            <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"/>
            </div>
        </el-image>
        <el-link icon="el-icon-delete" type="danger" :underline="false"
                 @click="$emit('input', '')"
                 style="font-size: 18px; margin-left: 10px" v-if="value"/>
        <choose-image v-model="imageDialog" :images.sync="images2" @choose="onSelect"/>
    </el-form-item>
</template>

<script>
import chooseImage from "../chooseImage";

export default {

    inheritAttrs: false,

    type: [3],

    props: {
        label: String,
        value: String,

        images: Array
    },

    data() {
        return {
            imageDialog: false
        }
    },

    computed: {
        images2: {
            get() {
                return this.images || [];
            },

            set(value) {
                this.$emit('update:images', value);
            }
        }
    },

    components: {
        chooseImage
    },

    methods: {
        onSelect(file) {
            console.log(file);
            this.$emit('input', file.url);
            this.imageDialog = false;
        },

        openImage() {
            this.imageDialog = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.image-field {
    .el-image {
        cursor: pointer;
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
}
</style>