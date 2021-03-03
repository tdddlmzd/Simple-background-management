<template>
    <div class="basicPortContent">
        <!--路由分隔-->
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础船舶" name="basicShip">
                <basicShip v-if="basicShip"></basicShip>
            </el-tab-pane>
            <el-tab-pane label="船期船舶" name="dataShip">
                <dataShip v-if="dataShip"></dataShip>
            </el-tab-pane>
            <el-tab-pane label="跟踪船舶" name="trackShip">
                <trackShip v-if="trackShip"></trackShip>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import basicShip from "./basicShip.vue";
    import dataShip from "./dataShip.vue";
    import trackShip from "./trackShip.vue";
    export default {
        data() {
            return {
                matched: "",
                activeName: 'basicShip',
                basicShip: true,
                dataShip: false,
                trackShip: false,
            };
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '基础船舶') {
                    this.basicShip = true
                    this.dataShip = false
                    this.trackShip = false
                }else if(tab.label == '船期船舶'){
                    this.basicShip = false
                    this.dataShip = true
                    this.trackShip = false
                }else if(tab.label == '跟踪船舶'){
                    this.basicShip = false
                    this.dataShip = false
                    this.trackShip = true
                }
            }
        },
        components: {
            Breadcrumb,
            basicShip,
            dataShip,
            trackShip,
        },
        mounted() {
            this.matched = this.$route.matched;
        },
        destroyed(){
            this.$bus.off('clickMenu');
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