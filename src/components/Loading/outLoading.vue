 <template>
    <div id="loading">
        <div class="loading" ref="loading">
            <div class="loadingIcon" ref="loadingIcon" :class="isShowLeft">
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
        data() {
            return {
                isShowLeft: 'largebarLeft'
            }
        },
        mounted(){
            if(this.$store.state.common.sidebar){
                this.isShowLeft = 'largebarLeft'
            }else{
                this.isShowLeft = 'smallbarLeft'
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
                    this.isShowLeft = 'largebarLeft'
                }else{
                    this.isShowLeft = 'smallbarLeft'
                }
            }
        },
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
            }
        }
    }
    .largebarLeft{
        left: 201px !important;
        .loaddd{
            position: absolute;
            left: 42%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }
    .smallbarLeft{
        left: 65px !important;
        .loaddd{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }
</style>