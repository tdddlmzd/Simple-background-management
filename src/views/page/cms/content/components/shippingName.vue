<template>
    <el-form-item :label="label" :required="$attrs.isRequired" :prop="$attrs.prop">
        <el-select v-model="value" :loading="loading" style="width: 100%" filterable>
            <el-option v-for="opt in shipping" :key="opt.code" :value="opt.code" :label="getLabel(opt)"/>
        </el-select>
    </el-form-item>
</template>

<script>
import {getShipping} from '../../utils';

export default {
    name: "shippingName",
    inheritAttrs: false,
    props: {
        label: String
    },

    data() {
        return {
            shipping: [],
            loading: false
        }
    },

    computed: {
        value: {
            get() {
                return this.$attrs.variables.shippingCode;
            },
            set(value) {
                this.$emit('update:shippingCode', value);
                const opt = (this.shipping.find(it => it.code === value) || {});
                this.$emit('input', opt.nameScn || opt.nameCn);
            }
        }
    },

    methods: {

        getLabel(opt) {
            return `${opt.nameScn || opt.nameCn}(${opt.code})`
        }

    },

    mounted() {
        this.loading = true;
        getShipping().then(({content}) => {
            this.shipping = content || [];
        }).finally(() => this.loading = false);
    }
}
</script>

<style scoped lang="scss">

</style>