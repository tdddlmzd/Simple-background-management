<template>
<!-- 报关查询记录 -->
    <div class="basicPortContent" ref="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="报关状态" name="queryLog">
                <queryLog v-if="queryLog"></queryLog>
            </el-tab-pane>
            <el-tab-pane label="报关详情" name="customsDetail">
                <customsDetail v-if="customsDetail"></customsDetail>
            </el-tab-pane>
            <el-tab-pane label="预配舱单状态" name="manifestState">
                <manifestState v-if="manifestState"></manifestState>
            </el-tab-pane>
            <el-tab-pane label="预配舱单详情" name="manifestDetail">
                <manifestDetail v-if="manifestDetail"></manifestDetail>
            </el-tab-pane>
            <el-tab-pane label="原始舱单详情" name="originalManifestDetail">
                <originalManifestDetail v-if="originalManifestDetail"></originalManifestDetail>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import queryLog from "./queryLog.vue";
    import customsDetail from "./customsDetail.vue";
    import manifestState from "./manifestState.vue";
    import manifestDetail from "./manifestDetail.vue";
    import originalManifestDetail from "./originalManifestDetail.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'queryLog',
                queryLog: true,
                customsDetail: false, 
                manifestState: false,
                manifestDetail: false,
                originalManifestDetail: false
            }
        },
        components : {
            queryLog,
            customsDetail,
            manifestState,
            manifestDetail,
            originalManifestDetail,
            Breadcrumb
        },
        methods: {
           handleClick(tab, event) {
                if(tab.label == '报关状态') {
                    this.queryLog = true
                    this.customsDetail = false
                    this.manifestState = false
                    this.manifestDetail = false
                    this.originalManifestDetail = false
                }else if(tab.label == '报关详情'){
                    this.queryLog = false
                    this.customsDetail = true
                    this.manifestState = false
                    this.manifestDetail = false
                    this.originalManifestDetail = false
                }else if(tab.label == '预配舱单状态'){
                    this.queryLog = false
                    this.customsDetail = false
                    this.manifestState = true
                    this.manifestDetail = false
                    this.originalManifestDetail = false
                }else if(tab.label == '预配舱单详情'){
                    this.queryLog = false
                    this.customsDetail = false
                    this.manifestState = false
                    this.manifestDetail = true
                    this.originalManifestDetail = false
                }else if(tab.label == '原始舱单详情'){
                    this.queryLog = false
                    this.customsDetail = false
                    this.manifestState = false
                    this.manifestDetail = false
                    this.originalManifestDetail = true
                }
            } 
        },
        destroyed(){
        },
        mounted(){
            this.reload()
            this.matched = this.$route.matched
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
