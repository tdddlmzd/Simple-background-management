<template>
    <div class="basicPortContent">
        <Breadcrumb :matched="matched"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础船舶" name="shipFile">
                <shipFile v-if="isShipFile"></shipFile>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
    import shipFile from "./shipFile.vue";
    export default {
        inject:['reload'],
        data() {
            return {
                matched:"",
                activeName: 'shipFile',
                isShipFile: true
            }
        },
        computed:{
            nowCourse(){
                return this.$store.state.common.nowCourse
            },
        },
        methods: {
            handleClick(tab, event) {
                if(tab.label == '基础船舶') {

                }else if(tab.label == '船公司航线'){
                }
            },
        },
        components: {
            Breadcrumb,
            shipFile
        },
        mounted() {
            this.reload();
            this.matched = this.$route.matched;
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