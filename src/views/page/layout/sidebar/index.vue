<template>
    <div class="sidebar">
        <logo :isCollapse="isCollapse"></logo>
        <el-menu
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            :collapse="isCollapse"
            text-color="#ccc"
            background-color="#fff"
            active-text-color="#3bafda"
            @select="selectMenu"
            :unique-opened="true"
        >
            <template v-for="item in permission_routers" v-if="item.name === 'Home'">
                <div class="homeMeta el-submenu__title is-active is-opened" @mouseover="handleOnClick" @mouseleave="handleLeClick">
                    <router-link
                        slot="title"
                        :to="isCollapse === false ? item.path : ''"
                        :key="item.name"
                        active-class="homeMetas"
                        class="homeMeta"
                    >
                        <span ref="homeMeta"  id="homeMeta" class=" homeMetasa el-icon-s-home" style="margin-right: 5px;"></span>
                        <span id="homeTitle" class="homeTitle" ref="homeTitle">
                            {{item.meta.title}}
                        </span>
                    </router-link>
                    <transition name="fade">
                        <div class="el-menu--vertical isActiveMenu" v-if="isActiveMenu">
                            <ul class="el-menu el-menu--popup el-menu--popup-right-start">
                                <li class="el-menu-item">
                                    <router-link :to="item.path" :key="item.name" active-class="homeMetas homeMetasd" class="homeMeta">首页</router-link>
                                </li>
                            </ul>
                        </div>
                    </transition>    
                </div>
            </template>
            <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import logo from "./logo.vue";
    import SidebarItem from "./SidebarItem";
    export default {
        data() {
            return {
                oldPath:"",
                count:0,
                newPath: true,
                isActiveMenu:false
            };
        },
        computed: {
            ...mapGetters(["sidebar","permission_routers"]),
            isCollapse() {
                this.$store.commit("handleChangeSider",this.sidebar.opened);
                return !this.sidebar.opened;
            },
            route(){
                return this.$route.path
            }
        },
        components: { 
            logo,
            SidebarItem

        },
        methods: {
            getRoutePath(){
                this.oldPath = this.$route.path;
                if(this.$route.path !=="/Home"){
                    let element = document.getElementById('homeTitle');
                    document.getElementById('homeMeta').style.color = '#666';
                    element.setAttribute("style","color:#666 !important")
                }else{
                    document.getElementById('homeMeta').style.color = '#3bafda';
                    document.getElementById('homeTitle').setAttribute("style","color:#3bafda !important")
                }
            },
            selectMenu(param){
                console.log(param)
                setTimeout(() => {
                    this.$bus.emit('clickMenu',this.newPath);
                },300)
            },
            handleOnClick(){
                this.isActiveMenu = true
            },
            handleLeClick(){
                this.isActiveMenu = false
            },

        },
        mounted(){
            this.getRoutePath()
        },
        watch : {
            // 'route':{
            //     immediate:true,
            //     handler(newVal,oldVal){
            //         if (oldVal){
            //             if(newVal !== "/Home"){
            //                 document.getElementById('homeMeta').style.color = '#666';
            //                 document.getElementById('homeTitle').setAttribute("style","color:#666 !important")
            //             }else{
            //                 document.getElementById('homeMeta').style.color = '#3bafda';
            //                 document.getElementById('homeTitle').setAttribute("style","color:#3bafda !important")
            //             }
            //         }
            //     }
            // },
            'isCollapse':{
                immediate:true,
                handler(newVal,oldVal){
                    // if(newVal === false){
                    //     if(this.route !== "/Home"){
                    //         setTimeout(() => {
                    //             this.$refs.homeMeta[0].style.color = '#666'
                    //             this.$refs.homeTitle[0].style.color = '#666'
                    //         },500)
                    //     }else{
                    //         setTimeout(() => {
                    //             this.$refs.homeMeta[0].style.color = '#3bafda'
                    //             this.$refs.homeTitle[0].style.color = '#3bafda'
                    //         },500)
                    //     }
                    // }else{
                    //     if(this.route !== "/Home"){
                    //         setTimeout(() => {
                    //             this.$refs.homeMeta[0].style.color = '#666'
                    //             this.$refs.homeTitle[0].style.color = '#666'
                    //         },500)
                    //     }else{
                    //         setTimeout(() => {
                    //             this.$refs.homeMeta[0].style.color = '#3bafda'
                    //             this.$refs.homeTitle[0].style.color = '#3bafda'
                    //         },500)
                    //     }
                    // }
                }
            },
        },
    }
</script>

<style scoped lang="scss">  
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        height: 100%;
        position: fixed;
        overflow-x: hidden;
    }
    .homeMetas{
        color: #3bafda;
        background-color: #fff;
        margin-right: 5px;
    }
    .homeMetasd{
        color: #3bafda !important;
    }
    .homeMetasa{
        display: inline-block;
        width: 24px;
        text-align: center;
    }
    .homeTitle{
        display: inline-block;
        width: 100%;
        font-weight: 600;
    }   
    .homeMeta{
        color:  #666 ;
        position: relative;
    }
    .el-icon-s-home{
        font-size: 18px;
    }
    .isActiveMenu{
        position: absolute;
        top: 0px;
        left:64px;
    }
    .homeMeta{
        display: inline-block;
        width: 100%;
        font-weight: 600;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>