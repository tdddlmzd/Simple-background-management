<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="网站查询" name="webSiteDate">
                <webSite v-if="webSiteDate"></webSite>
            </el-tab-pane>
            <el-tab-pane label="航线信息" name="routeInfor">
                <routeInfor v-if="routeInfor"></routeInfor>
            </el-tab-pane>
            <el-tab-pane label="港到港实时船期" name="portToPort">
                <portToPort v-if="portToPort"></portToPort>
            </el-tab-pane>
            <el-tab-pane label="航线船名航次" name="nameRoute">
                <nameRoute v-if="nameRoute"></nameRoute>
            </el-tab-pane>
            <el-tab-pane label="船名查询" name="nameQuery">
                <nameQuery v-if="nameQuery"></nameQuery>
            </el-tab-pane>
            <el-tab-pane label="航线挂靠港预计日期" name="estimatDate">
                <estimatDate v-if="estimatDate"></estimatDate>
            </el-tab-pane>
            <el-tab-pane label="港口五字码" name="fiveCode">
                <fiveCode v-if="fiveCode"></fiveCode>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue"
    import webSite from "./webSite.vue"
    import routeInfor from "./routeInfor.vue"
    import portToPort from "./portToPort.vue"
    import nameRoute from "./nameRoute.vue"
    import nameQuery from "./nameQuery.vue"
    import estimatDate from "./estimatDate.vue"
    import fiveCode from "./fiveCode.vue"
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'webSiteDate',
                webSiteDate: true,
                routeInfor: false,
                portToPort: false,
                nameRoute: false,
                nameQuery:false,
                estimatDate: false,
                fiveCode: false
            }
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '网站查询') {
                    this.webSiteDate = true
                    this.routeInfor = false
                    this.portToPort = false
                    this.nameRoute = false
                    this.nameQuery = false
                    this.estimatDate = false
                    this.fiveCode = false
                }else if(tab.label == '航线信息'){
                    this.webSiteDate = false
                    this.routeInfor = true
                    this.portToPort = false
                    this.nameRoute = false
                    this.nameQuery = false
                    this.estimatDate = false
                    this.fiveCode = false
                }else if(tab.label == '港到港实时船期'){
                    this.webSiteDate = false
                    this.routeInfor = false
                    this.portToPort = true
                    this.nameRoute = false
                    this.nameQuery = false
                    this.estimatDate = false
                    this.fiveCode = false
                }else if(tab.label == '航线船名航次'){
                    this.webSiteDate = false
                    this.routeInfor = false
                    this.portToPort = false
                    this.nameRoute = true
                    this.nameQuery = false
                    this.estimatDate = false
                    this.fiveCode = false
                }else if(tab.label == '船名查询'){
                    this.webSiteDate = false
                    this.routeInfor = false
                    this.portToPort = false
                    this.nameRoute = false
                    this.nameQuery = true
                    this.estimatDate = false
                    this.fiveCode = false
                }else if(tab.label == '航线挂靠港预计日期'){
                    this.webSiteDate = false
                    this.routeInfor = false
                    this.portToPort = false
                    this.nameRoute = false
                    this.nameQuery = false
                    this.estimatDate = true
                    this.fiveCode = false
                }else if(tab.label == '港口五字码'){
                    this.webSiteDate = false
                    this.routeInfor = false
                    this.portToPort = false
                    this.nameRoute = false
                    this.nameQuery = false
                    this.estimatDate = false
                    this.fiveCode = true
                }
            },
        },
        components: {
            Breadcrumb,
            webSite,
            routeInfor,
            portToPort,
            nameRoute,
            nameQuery,
            estimatDate,
            fiveCode
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