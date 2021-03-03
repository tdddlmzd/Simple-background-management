<template>
    <div class="layout">
        <el-container>  
            <el-aside width="200px" ref="elaside">
                <sidebar></sidebar>
            </el-aside>
            <el-container>
                <el-header>
                    <navbar></navbar>
                </el-header>
                <el-main ref="elmain" id="elmain">
                    <!-- 首页 -->
                    <!-- <img v-if="showBackground" src="../../../assets/images/login/home.png" width='100%'> -->
                    <div v-if="showBackground" class="home_page">
                        <div class="userState">
                            <div class="box_statu">
                                <div class="box_top">
                                    <div class="box_top_left">
                                        <img src="../../../assets/images/login/web.png" class="api" />
                                        <p class="web">网站</p>
                                    </div>
                                </div>
                                <div class="box_bottom">
                                    <p class="box_p1">总注册量</p>
                                    <p class="box_p2">{{report.webTotal}}</p>
                                </div>
                            </div>
                            <div class="box_statu">
                                <div class="box_top">
                                    <div class="box_top_left">
                                        <img src="../../../assets/images/login/web.png" class="api" />
                                        <p class="web">网站</p>
                                    </div>
                                    <div class="box_top_right">
                                        <p class="box_day" :class="acitveNum == index ? 'box_day_active' : ''" v-for="(item,index) in report.dataList" :key="index" @click="clickDay(item,index)">{{item.day}}</p>
                                    </div>
                                    
                                </div>
                                <div class="box_bottom">
                                    <p class="box_p1">新增客户</p>
                                    <p class="box_p2">{{activeTotla}}</p>
                                </div>
                            </div>                        
                            <div class="box_statu">
                                <div class="box_top">
                                    <div class="box_top_left">
                                        <img src="../../../assets/images/login/api.png" class="api" />
                                        <p class="web">API</p>
                                    </div>
                                </div>
                                <div class="box_bottom">
                                    <p class="box_p1">账号开通总量</p>
                                    <p class="box_p2">{{report.apiTotal}}</p>
                                </div>
                            </div>                        
                            <div class="box_statu last_statu">
                                <div class="box_top">
                                    <div class="box_top_left">
                                        <img src="../../../assets/images/login/api.png" class="api" />
                                        <p class="web">API</p>
                                    </div>
                                </div>
                                <div class="box_bottom">
                                    <p class="box_p1">付费客户</p>
                                    <p class="box_p2">{{report.apiTotalCharged}}</p>
                                </div>
                            </div>                        
                        </div>
                        <p class="header_p">消息</p>
                        <div class="home_main">
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="所有通知" name="notifica">
                                    <notifica ref="allnotifications"></notifica>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                    <!-- 右测内容 -->
                    <app-main v-else></app-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template> 

<script>
    import sidebar from './sidebar/index.vue';
    import navbar from './navbar/index.vue';
    import appMain from "./appMain.vue";
    import notifica from "./notifica.vue";
    export default {
        data(){
            return {
                showBackground:false,
                activeName: 'notifica',

                //当前点击
                acitveNum: 0,
                activeTotla: '',

                report:{
                    webTotal: '',// 网站总数
                    apiTotalCharged: '',// API总付费数
                    apiTotal: '',// API总数
                    dataList: [
                        {
                            day: '昨日',
                            total: '',
                        },
                        {
                            day: '近一周',
                            total: '',
                        },
                        {
                            day: '近30天',
                            total: '',
                        },
                    ],
                }
            }
        },
        components: {
            sidebar,
            navbar,
            appMain,
            notifica
        },
        computed: {
            sidebarOpen(){
                if (this.$route.path =="/Home") {
                    this.showBackground = true
                    this.handNumber()
                }else {
                    this.showBackground = false
                }
                return this.$store.state.app.sidebar.opened;
            },
        },
        methods:{
            handleClick(){

            },
            handNumber(){
                var that = this
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/getUnRemind`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.$store.commit("handeCount",res.data.content)
                        } else if (res.data.status == 0) {
                            this.$message({
                                type: "error",
                                message: "数据加载失败 请重新加载页面"
                            });
                        }
                });
            },
            getReport(){
                var that = this
                this.$axios.get(this.commonJs.localUrl + `/schedules/userManager/report`,{
                        headers: {
                            Authorization: `Bearer ${this.getAuthorization()}`,
                            AccessToken: this.getCookie("token")
                        }
                    }).then(res => {
                        if(res.data.status == 1){
                            that.report.webTotal = res.data.content.webTotal ? res.data.content.webTotal : 0
                            that.report.apiTotalCharged = res.data.content.apiTotalCharged ? res.data.content.apiTotalCharged : 0
                            that.report.apiTotal = res.data.content.apiTotal ? res.data.content.apiTotal : 0

                            that.report.dataList[0].total = res.data.content.webYesterday ? res.data.content.webYesterday : 0 //昨日
                            that.report.dataList[1].total = res.data.content.webWeek ? res.data.content.webWeek : 0 //近一周
                            that.report.dataList[2].total = res.data.content.webMonth ? res.data.content.webMonth : 0 //近30天

                            that.activeTotla = res.data.content.webYesterday ? res.data.content.webYesterday : 0 //昨日
                        }
                });
            },
            clickDay(item,index){
                this.acitveNum = index
                this.activeTotla = item.total
            },
        },
        watch:{
            'sidebarOpen':{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal === true){
                        this.$nextTick(() => {
                            this.$refs.elmain.$vnode.elm.style.marginLeft = "200px";
                            this.$refs.elaside.$vnode.elm.style.width = "200px";
                        })
                    }else{
                        this.$nextTick(() => {
                            this.$refs.elmain.$vnode.elm.style.marginLeft = "64px";
                            this.$refs.elaside.$vnode.elm.style.width = "64px";
                        })
                    }
                }
            },
        },
        mounted(){
            this.handNumber()
            this.getReport()
        },
    }
</script>

<style lang="scss" scoped>
    /deep/.el-header{
        padding: 0;
        height: 50px !important;
    }
    /deep/.el-main{
        padding: 0;
        position: absolute;
        top: 50px;
        overflow-y: auto;
        left: 0;
        right: 0;
        bottom: 0;
        margin-left: 200px;
    }
    .userState{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    .box_statu{
        flex: 1;
        height: 146px;
        margin-right: 20px;
        background: #fff;
        margin-bottom: 10px;
    }
    .last_statu{
        margin-right: 0px;
    }
    .box_top{
        height: 45px;
        margin: 0 10px;
        border-bottom: 1px solid #e4e7ed;
        display: flex;
        align-items: center;
        min-width: 220px;
        justify-content: space-between;
    }
    .box_top_left{
        display: flex;
        align-items: center;
        .api{
            width: 24px;
	        height: 24px;
        }
        .web{
            color: #333333;
            font-size: 12px;
            margin-left: 10px;
        }
    }
    .box_top_right{
        display: flex;
        align-items: center;
        .box_day{
            padding: 2px 10px;
	        height: 20px;
            line-height: 20px;
            cursor: pointer;
            text-align: center;
            color: #333333;
        }
        .box_day_active{
            background-color: #3bafda;
	        border-radius: 4px;
            color: #ffffff;
        }
    }
    .box_bottom{
        width: 100%;
        height: 101px;
        overflow: hidden;
    }
    .box_p1{
        text-align: center;
        font-size: 12px;
        color: #606266;
        margin-top: 20px;
    }
    .box_p2{
        text-align: center;
        font-size: 30px;
        color: #333333;
        font-weight: 600;
        margin-top: 10px;
    }
    .home_page{
        position: relative;
        padding: 20px 20px 20px 20px;
        overflow: hidden;
    }
    .home_main{
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
    .header_p{
        color: #22527d;
        font-size: 14px;
        padding-bottom: 10px;
    }
</style>