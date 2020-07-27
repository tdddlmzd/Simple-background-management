 <template>
    <div id="loading">
        <div class="loading" ref="loading">
            <div class="loadingIcon" ref="loadingIcon">
                <i class="el-icon-loading"></i>
                <span>正在处理</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            let clientHeight = document.body.clientHeight;
            this.$refs.loadingIcon.style.top = '' + clientHeight/2 + 'px';
        }
    }
</script>

<style lang="scss" scoped>
    #loading{
        overflow: hidden;
        .loading{
            position: absolute;
            width: 100%;
            height: auto;
            background-color: #fff;
            opacity: .9;
            z-index: 999;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin-top: 30px;
            .loadingIcon{
                width: 100px;
                color: #000;
                font-size: 16px;
                display: inline-block;
                position: absolute;
                left: 50%;
                top: 50% !important;
                transform: translate(-50%,-50%)
                // left: 50%;
                // transform: translateX(-50%)
            }
        }
    }
</style>