<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop">
        <el-input :value="value" @input="oninput"/>
    </el-form-item>
</template>

<script>
export default {
    inheritAttrs: false,
    type: [5, 6],

    props: {
        label: String,
        value: String
    },

    methods: {

        oninput(value) {
            if (this.$attrs.type === 5) {
                this.$emit('input', /^\d+$/.test(value) ? value : this.value);
            } else {
                this.$emit('input', /^\d+(\.\d{0,})?$/.test(value) ? value : this.value);
            }
        }
    }
}
</script>

<style scoped>

</style>