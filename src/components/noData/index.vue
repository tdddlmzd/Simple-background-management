<template>
    <div class="dataPage" :style="{width: dataWidth + 'px'}">
        暂无数据
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataWidth: '',
            isOpen: true,
            screenWidth: document.body.clientWidth, // 设置默认值
        }
    },
    methods:{

    },
    computed:{
        changeSider() {
            return this.$store.state.common.sidebar
        },
    },
    mounted() {
        this.dataWidth = document.body.clientWidth - 200 - 80
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth   
                that.screenWidth = window.screenWidth
            })()
        }
    },
    watch:{
        changeSider(val,newval){
            this.isOpen = val
            if(val == true){ //打开
                this.dataWidth = this.screenWidth - 200 - 80
            }else{ //关闭
                this.dataWidth = this.screenWidth - 65 - 80
            }
        },
        screenWidth (val) {
            this.screenWidth = val
            if(this.screenWidth <= 500){
                this.dataWidth = this.dataWidth
            }else{
                if(this.isOpen){
                    this.dataWidth = this.screenWidth - 200 - 80
                }else{
                    this.dataWidth = this.screenWidth - 65 - 80
                }
            }
        }    
    },
    destroyed() {

    }
}
</script>
<style scoped>

</style>