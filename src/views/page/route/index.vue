<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="航线共舱组" name="routeCrew">
                <routeCrew ref="isRouteCrew"></routeCrew>
            </el-tab-pane>
            <el-tab-pane label="船公司航线" name="shippLine">
                <shippLine ref="isShippLine"></shippLine>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import routeCrew from "./routeCrew.vue";
    import shippLine from "./routeManage.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'routeCrew',
            }
        },
        computed:{
            nowCourse(){
                return this.$store.state.common.nowCourse
            },
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '航线共舱组') {
                    this.$refs.isRouteCrew.isRouteCrew = true
                    this.$refs.isShippLine.isShippLine = false
                    this.$refs.isRouteCrew.page.pageSize = 10
                    this.$refs.isRouteCrew.page.pageNo = 1
                    this.$refs.isRouteCrew.tableData = []
                    this.$refs.isRouteCrew.handleClick('reload')
                }else if(tab.label == '船公司航线'){
                    this.$refs.isShippLine.isShippLine = true
                    this.$refs.isRouteCrew.isRouteCrew = false
                    this.$refs.isShippLine.page.pageSize = 10
                    this.$refs.isShippLine.page.pageNo = 1
                    this.$refs.isShippLine.tableData = []
                    this.$refs.isShippLine.searchList('reload')
                }
                this.$store.commit("handCourse",false);
            },
        },
        components: {
            Breadcrumb,
            routeCrew,
            shippLine
        },
        watch:{
            'nowCourse':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        this.activeName = 'routeCrew'
                        this.$refs.isRouteCrew.isRouteCrew = true
                        this.$refs.isShippLine.isShippLine = false
                        this.$refs.isRouteCrew.handleClick('reload')
                    }
                }
            }
        },
        mounted() {
            this.reload();
            this.matched = this.$route.matched
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