<template>
    <!-- 船舶数据记录 -->
    <div class="basicPortContent" ref="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="船舶搜索" name="shipSearch">
                <shipSearch v-if="shipSearch"></shipSearch>
            </el-tab-pane>
            <el-tab-pane label="船舶详情" name="shipDetail">
                <shipDetail v-if="shipDetail"></shipDetail>
            </el-tab-pane>
            <el-tab-pane label="船舶挂靠港信息" name="shipPortInfo">
                <shipPortInfo v-if="shipPortInfo"></shipPortInfo>
            </el-tab-pane>
            <el-tab-pane label="船舶轨迹" name="shipTrail">
                <shipTrail v-if="shipTrail"></shipTrail>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import shipSearch from "./shipSearch.vue";
    import shipDetail from "./shipDetail.vue";
    import shipPortInfo from "./shipPortInfo.vue";
    import shipTrail from "./shipTrail.vue";
    export default {
        inject:['reload'],
        data() {
                return {
                    matched:"",
                    activeName: 'shipSearch',
                    shipSearch: true,
                    shipDetail: false,
                    shipPortInfo: false,
                    shipTrail: false,
                }
        },
        components : {
            shipSearch,
            shipDetail,
            shipPortInfo,
            shipTrail,
            Breadcrumb
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '船舶搜索') {
                    this.shipSearch = true
                    this.shipDetail = false
                    this.shipPortInfo = false
                    this.shipTrail = false
                }else if(tab.label == '船舶详情'){
                    this.shipSearch = false
                    this.shipDetail = true
                    this.shipPortInfo = false
                    this.shipTrail = false
                }else if(tab.label == '船舶挂靠港信息'){
                    this.shipSearch = false
                    this.shipDetail = false
                    this.shipPortInfo = true
                    this.shipTrail = false
                }else if(tab.label == '船舶轨迹'){
                    this.shipSearch = false
                    this.shipDetail = false
                    this.shipPortInfo = false
                    this.shipTrail = true
                }
            }
        },
        mounted(){
            this.reload()
            this.matched = this.$route.matched
        },
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
