<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="港港组合" name="thailand">
                <thailand ref="isGange"></thailand>
            </el-tab-pane>
            <el-tab-pane label="路径管理" name="pathActor">
                <pathActor ref="isRouter"></pathActor>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import thailand from "./thailand.vue";
    import pathActor from "./pathActor.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'thailand',
            }
        },
        computed:{
            nowTab(){
                return this.$store.state.common.nowTab
            },
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '港港组合') {
                    this.$refs.isGange.isGangPage = true
                    this.$refs.isRouter.isRouterPage = false
                    this.$refs.isGange.page.pageSize = 10
                    this.$refs.isGange.page.pageNo = 1
                    this.$refs.isGange.tableData = []
                    this.$refs.isGange.searchList('reload')
                }else if(tab.label == '路径管理'){
                    this.$refs.isRouter.isRouterPage = true
                    this.$refs.isGange.isGangPage = false
                    this.$refs.isRouter.page.pageSize = 10
                    this.$refs.isRouter.page.pageNo = 1
                    this.$refs.isRouter.tableData = []
                    this.$refs.isRouter.searchGetList('reload')
                }
                this.$store.commit("handleNowTab",false);
            },
        },
        components: {
            Breadcrumb,
            thailand,
            pathActor
        },
        watch:{
            'nowTab':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        this.activeName = 'thailand'
                        this.$refs.isGange.isGangPage = true
                        this.$refs.isRouter.isRouterPage = false
                        this.$refs.isGangShow.searchList()
                    }
                    // else if(newVal === "路径管理") {
                    //     this.activeName = 'pathActor'
                    // }
                }
            }
        },
        mounted() {
            this.reload();
            this.matched = this.$route.matched;
            this.$bus.on('switchTab',content => {
                this.activeName = 'pathActor';
            });
        },
        destroyed(){
            this.$bus.off('switchTab')
        },
    };
</script>

<style lang="scss" scoped>
    .basicPortContent{
        padding: 20px 20px 0px 20px;
        .el-tabs{
            background-color: #fff;
            // padding: 10px 20px 20px 20px;
            padding: 10px 0px 20px 0px;
        }
        /deep/.el-tabs__item.is-active{
            color: #333;
            font-weight: bold;
        }
        /deep/.el-tabs__item:hover{
            color: #333;
        }
        /deep/.el-tabs__item{
            font-size: 13px;
        }
        /deep/.el-tabs__nav-scroll{
            padding-left: 20px;
        }    
    }
</style>