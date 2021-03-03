<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop">
        <el-input :value="value" @input="$emit('input', $event)" type="textarea" placeholder="逗号分隔"/>
    </el-form-item>
</template>

<script>
export default {
    inheritAttrs: false,
    type: [7, 8, 9],
    props: {
        label: String,
        value: String
    },
}
</script>

<style scoped>

</style>