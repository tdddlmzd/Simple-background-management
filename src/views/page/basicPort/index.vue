<template>
    <div class="basicPortContent">
        <breadcrumb :matched="matched"></breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础港口" name="key1">
                <basicPorts ref="isGangShow"></basicPorts>
            </el-tab-pane>
            <el-tab-pane label="船公司港口" name="key2">
                <shippingCompanyPorts ref="isRouteShow"></shippingCompanyPorts>
            </el-tab-pane>
            <el-tab-pane label="跟踪港口" name="key3">
                <trackPort ref="isTrackShow"></trackPort>
            </el-tab-pane>
            <el-tab-pane label="AIS港口" name="key4">
                <aisPort ref="isAsiShow"></aisPort>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue"
    import basicPorts from "./basicPorts.vue"
    import shippingCompanyPorts from "./shippingCompanyPorts.vue"
    import trackPort from "./trackPort.vue"
    import aisPort from "./aisPort.vue"
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'key1',
            }
        },
        components: {
            Breadcrumb,
            basicPorts,
            shippingCompanyPorts,
            trackPort,
            aisPort,
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '船公司港口'){
                    //船公司港口
                    this.$refs.isRouteShow.isRouteShow = true
                    this.$refs.isRouteShow.ruleForm.baseCode = ''
                    this.$refs.isRouteShow.ruleForm.state = ''
                    this.$refs.isRouteShow.ruleForm.scac = ''
                    this.$refs.isRouteShow.ruleForm.portScac = ''
                    this.$refs.isRouteShow.ruleForm.companyName = '全部'
                    this.$refs.isRouteShow.page.pageSize = 10
                    this.$refs.isRouteShow.page.pageNo = 1
                    this.$refs.isRouteShow.tableData = []
                    this.$refs.isRouteShow.handeleGetList()

                    //其他分页false
                    this.$refs.isGangShow.isGangShow = false
                    this.$refs.isTrackShow.isTrackShow = false
                    this.$refs.isAsiShow.isAsiShow = false
                }else if(tab.label == '基础港口'){
                    //基础港口
                    this.$refs.isGangShow.isGangShow = true
                    this.$refs.isGangShow.ruleForm.fliterTable = ''
                    this.$refs.isGangShow.page.pageSize = 10
                    this.$refs.isGangShow.page.pageNo = 1
                    this.$refs.isGangShow.handeleSearchList()

                    //其他分页false
                    this.$refs.isRouteShow.tableData = []
                    this.$refs.isRouteShow.isRouteShow = false
                    this.$refs.isTrackShow.isTrackShow = false
                    this.$refs.isAsiShow.isAsiShow = false
                }else if(tab.label == '跟踪港口'){
                    this.$refs.isTrackShow.ruleForm.searchStr = ''
                    this.$refs.isTrackShow.isTrackShow = true
                    this.$refs.isTrackShow.trackSearch()

                    //其他分页false
                    this.$refs.isRouteShow.tableData = []
                    this.$refs.isRouteShow.isRouteShow = false
                    this.$refs.isGangShow.isGangShow = false
                    this.$refs.isAsiShow.isAsiShow = false
                }else if(tab.label == 'AIS港口'){
                    this.$refs.isAsiShow.ruleForm.searchStr = ''
                    this.$refs.isAsiShow.isAsiShow = true
                    this.$refs.isAsiShow.aisSearch()

                    //其他分页false
                    this.$refs.isRouteShow.tableData = []
                    this.$refs.isRouteShow.isRouteShow = false
                    this.$refs.isGangShow.isGangShow = false
                    this.$refs.isTrackShow.isTrackShow = false
                }
                this.$store.commit("handleNowAdd",false);
            },
        },
        computed:{
            nowAdd(){
                return this.$store.state.common.nowAdd
            },
        },
        watch:{
            'nowAdd':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        this.activeName = 'key1'
                        // this.$refs.isGangShow.isGangShow = true
                        // this.$refs.isGangShow.handeleSearchList()

                        // this.$refs.isGangShow.isGangShow = false
                        // this.$refs.isTrackShow.isTrackShow = false
                        // this.$refs.isAsiShow.isAsiShow = false
                    }
                }
            }
        },
        mounted(){
            this.reload()
            this.matched = this.$route.matched
            this.$bus.on('handleTurn',content => {
                this.activeName = 'key2'
                // this.$refs.isRouteShow.isRouteShow = true
                // this.$refs.isGangShow.isGangShow = false
                // this.$refs.isRouteShow.handeleSearchList()
            });
        },
        destroyed(){
            this.$bus.off('handleTurn')
        }
    }
</script>

<style lang="scss" scoped>
    .basicPortContent{
        padding: 20px 20px 0px 20px;
        .el-tabs{
            background-color: #fff;
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