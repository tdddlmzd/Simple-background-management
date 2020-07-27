<template>
    <div class="notFind" :style="{height: noClientHeight + 'px'}">
        <img src="@/assets/images/noFind/noFind.png" class="ident" ref="ident">
        <!-- <div class="notFind">请重新刷新页面</div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            noClientHeight: '',
        }
    },
    mounted() {
        this.noClientHeight = document.body.clientHeight - 50
        this.$message({
            type: "error",
            message: "数据加载失败 请重新刷新页面",
        });

    }
}
</script>
<style lang="scss" scoped>
    .notFind{
        width: 100%;
        background: #fff;
        border-left: 1px solid #e6e6e6;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        .ident{
            // width: 100%;
            // height: auto;
        }
        .notFind{
            width: 100%;
            height: 50px;
            line-height: 50px
        }
    }
</style>