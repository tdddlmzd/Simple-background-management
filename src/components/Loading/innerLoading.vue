 <template>
    <div id="loading">
        <div class="loading" ref="loading">
            <div class="loadingIcon" ref="loadingIcon">
                <div class="loaddd">
                    <i class="el-icon-loading"></i>
                    <span>正在处理</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            if(this.$store.state.common.sidebar){
                document.querySelector('.loadingIcon').style.left = '201px'
            }else{
                document.querySelector('.loadingIcon').style.left = '65px'
            }
        },
        computed:{
            changeSider() {
                return this.$store.state.common.sidebar
            },
        },
        watch:{
            changeSider(val,newval){
                if(val == true){
                    document.querySelector('.loadingIcon').style.left = '201px'
                }else{
                    document.querySelector('.loadingIcon').style.left = '65px'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #loading{
        .loading{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #fff;
            opacity: .9;
            z-index: 999;
            left: 1px;
            .loadingIcon{
                width: 100%;
                height: 100%;
                color: #000;
                font-size: 16px;
                display: inline-block;
                position: fixed;
                background-color: #fff;
                // background-color: red;
                left: 201px;
                top: 90px;
                opacity: .9;
                display: flex;
                justify-content: center;
                align-items: center;
                // left: 55%;
                // top: 50% !important;
                // transform: translate(-50%,-50%);
                // margin-left: 200px;
                .loaddd{
                    margin-left: -200px;
                }
            }
        }
    }
</style>