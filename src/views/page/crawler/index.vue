<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="changeClick">
            <el-tab-pane label="爬虫校验" name="efficacy">
                <efficacy ref="isXiao"></efficacy>
            </el-tab-pane>
            <el-tab-pane label="爬取组合" name="combin">
                <combin ref="isQu"></combin>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import efficacy from "./efficacy.vue";
    import combin from "./combin.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'efficacy',
            }
        },
        computed:{
            nowCrawl(){
                return this.$store.state.common.nowCrawl
            },
        },
        methods: {
            changeClick(tab, event) {
                if(tab.label == '爬虫校验') {
                    this.$refs.isXiao.isGangPage = true
                    this.$refs.isQu.isRouterPage = false
                    this.$refs.isXiao.page.pageSize = 10
                    this.$refs.isXiao.page.pageNo = 1
                    this.$refs.isXiao.tableData = []
                    this.$refs.isXiao.searchList('reload')
                }else if(tab.label == '爬取组合'){
                    this.$refs.isQu.isRouterPage = true
                    this.$refs.isXiao.isGangPage = false
                    this.$refs.isQu.page.pageSize = 10
                    this.$refs.isQu.page.pageNo = 1
                    this.$refs.isQu.tableData = []
                    this.$refs.isQu.searchGetList('reload')
                }
                this.$store.commit("handCrawl",false);
            },
        },
        components: {
            Breadcrumb,
            efficacy,
            combin
        },
        watch:{
            'nowCrawl':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        this.activeName = 'efficacy'
                        this.$refs.isXiao.isGangPage = true
                        this.$refs.isQu.isRouterPage = false
                        this.$refs.isGangShow.searchList()
                    }
                    // else if(newVal === "路径管理") {
                    //     this.activeName = 'combin'
                    // }
                }
            }
        },
        mounted() {
            this.reload();
            this.matched = this.$route.matched;
            this.$bus.on('chaneCrawlTab',content => {
                this.activeName = 'combin';
            });
        },
        destroyed(){
            this.$bus.off('chaneCrawlTab')
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