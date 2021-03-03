<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop">
        <el-input :value="value" @input="oninput"/>
    </el-form-item>
</template>

<script>
export default {
    inheritAttrs: false,
    type: [4],
    props: {
        label: String,
        value: String
    },

    methods: {

        oninput(value) {
            this.$emit('input', value);
        }
    }
}
</script>

<style scoped>

</style>