<template>
    <div class="layout">
        <el-container>  
            <el-aside width="200px" ref="elaside">
                <sidebar></sidebar>
            </el-aside>
            <el-container>
                <el-header>
                    <navbar></navbar>
                </el-header>
                <el-main ref="elmain" id="elmain">
                    <img  v-if="showBackground" src="../../../assets/images/login/home.png" width='100%'>
                    <app-main></app-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template> 

<script>
    import sidebar from './sidebar/index.vue';
    import navbar from './navbar/index.vue';
    import appMain from "./appMain.vue";
    export default {
        data(){
            return {
                showBackground:false,
            }
        },
        components: {
            sidebar,
            navbar,
            appMain
        },
        computed: {
            sidebarOpen(){
                if (this.$route.path =="/Home") {
                    this.showBackground = true
                }else {
                    this.showBackground = false
                }
                return this.$store.state.app.sidebar.opened;
            },
        },
        methods:{
        },
        watch:{
            'sidebarOpen':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        this.$nextTick(() => {
                            this.$refs.elmain.$vnode.elm.style.marginLeft = "200px";
                            this.$refs.elaside.$vnode.elm.style.width = "200px";
                        })
                    }else{
                        this.$nextTick(() => {
                            this.$refs.elmain.$vnode.elm.style.marginLeft = "64px";
                            this.$refs.elaside.$vnode.elm.style.width = "64px";
                        })
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    /deep/.el-header{
        padding: 0;
        height: 50px !important;
    }
    /deep/.el-main{
        padding: 0;
        position: absolute;
        top: 50px;
        overflow-y: auto;
        left: 0;
        right: 0;
        bottom: 0;
        margin-left: 200px;
    }
    // ::-webkit-scrollbar { 
    //     display: none; 
    // }
</style>