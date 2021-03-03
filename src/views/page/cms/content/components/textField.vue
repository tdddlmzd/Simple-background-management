<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop">
        <el-input :value="value" @input="$emit('input', $event)" :disabled="disabled" :type="$attrs.type === 2 ? 'textarea' : 'text'"/>
    </el-form-item>
</template>

<script>
export default {
    inheritAttrs: false,
    type: [1, 2, 4, 5, 6],

    props: {
        label: String,
        value: String,
        disabled: Boolean
    },
}
</script>

<style scoped>

</style>