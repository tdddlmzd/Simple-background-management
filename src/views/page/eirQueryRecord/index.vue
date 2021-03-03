<template>
<!-- 报关查询记录 -->
    <div class="basicPortContent" ref="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="上海港EIR批量订阅" name="portSub">
                <portSub v-if="portSub"></portSub>
            </el-tab-pane>
            <el-tab-pane label="上海港EIR实时" name="portReal">
                <portReal v-if="portReal"></portReal>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import portSub from "./portSub.vue";
    import portReal from "./portReal.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'portSub',
                portSub: true,
                portReal: false
            }
        },
        components : {
            portSub,
            portReal,
            Breadcrumb
        },
        methods: {
           handleClick(tab) {
                if(tab.label == '上海港EIR批量订阅') {
                    this.portSub = true
                    this.portReal = false
                }else if(tab.label == '上海港EIR实时'){
                    this.portSub = false
                    this.portReal = true
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
