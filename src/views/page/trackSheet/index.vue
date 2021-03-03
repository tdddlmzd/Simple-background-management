<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="船公司数据" name="companyData">
                <companyData v-if="companyData"></companyData>
            </el-tab-pane>
            <el-tab-pane label="码头数据" name="terminalData">
                <terminalData v-if="terminalData"></terminalData>
            </el-tab-pane>
            <el-tab-pane label="船舶计划" name="shippPlan">
                <shippPlan v-if="shippPlan"></shippPlan>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue"
    import companyData from "./companyData.vue"
    import terminalData from "./terminalData.vue"
    import shippPlan from "./shippPlan.vue"
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'companyData',
                companyData: true,
                terminalData: false,
                shippPlan: false,
            }
        },
        // computed:{
        //     nowCourse(){
        //         return this.$store.state.common.nowCourse
        //     },
        // },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '船公司数据') {
                    this.companyData = true
                    this.terminalData = false
                    this.shippPlan = false

                }else if(tab.label == '码头数据'){
                    this.companyData = false
                    this.terminalData = true
                    this.shippPlan = false
                }else if(tab.label == '船舶计划'){
                    this.companyData = false
                    this.terminalData = false
                    this.shippPlan = true
                }
            },
        },
        components: {
            Breadcrumb,
            companyData,
            terminalData,
            shippPlan
        },
        mounted() {
            this.reload()
            this.matched = this.$route.matched
        },
    };
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