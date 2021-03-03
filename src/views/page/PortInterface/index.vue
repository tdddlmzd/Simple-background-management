<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="上海港实时接口" name="PortInterfaceName">
                <PortInterface v-if="PortInterface"></PortInterface>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue"
    import PortInterface from "./PortInterface.vue"
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                PortInterfaceName: 'PortInterface',
                PortInterface: true,
                activeName: 'PortInterfaceName',
            }
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '上海港实时接口') {
                    this.PortInterface = true
                }
            },
        },
        components: {
            Breadcrumb,
            PortInterface,
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