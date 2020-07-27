<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden && item.children &&item.children.length > 0">
            <router-link
                v-if="hasOneShowingChildren(item.children) 
                && !item.children[0].children
                &&!item.alwaysShow"
                :to="item.path+'/'+item.children[0].path"
                :key="item.children[0].name"
            >
                <el-menu-item
                    :index="item.path+'/'+item.children[0].path"
                    :class="{'submenu-title-noDropdown':!isNest}"
                >
                    <span
                        v-if="item.children[0].meta&&item.children[0].meta.icon"
                        :class="item.children[0].meta.icon"
                    ></span>
                    <span
                        v-if="item.children[0].meta&&item.children[0].meta.title"
                        slot="title"
                    >{{(item.children[0].meta.title)}}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="item.name||item.path" :key="item.name">
                <template slot="title">
                    <span v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></span>
                    <span v-if="item.meta&&item.meta.title" slot="title">{{(item.meta.title)}}</span>
                </template>

                <template v-for="(child,index) in item.children" v-if="!child.hidden">
                    <sidebar-item
                        :is-nest="true"
                        class="nest-menu"
                        v-if="child.children&&child.children.length>0"
                        :routes="[child]"
                        :key="child.path"
                        ref="subMenuw"
                    ></sidebar-item>

                    <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <div class="isCollapse" :class="item.meta.class" @click.prevent.stop>{{goTitle(item.meta.title,index)}}</div>
                            <!-- <span v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></span> -->
                            <span
                                v-if="child.meta && child.meta.title"
                                slot="title"
                            >{{(child.meta.title)}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: "SidebarItem",
    props: {
        routes: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            isCollapse : 'isCollapse',
        }
    },
    methods: {
        hasOneShowingChildren(children) {
            const showingChildren = children.filter(item => {
                return !item.hidden;
            });
        },
        goTitle(title,index){
            if(index == 0){
                return title
            }
        },
    },
    watch:{
        $route(to,from){
            if(to){
                for(var i = 0; i < this.routes.length;i++){
                    if(this.routes[i].children && this.routes[i].meta.class){
                        for(var j = 0; j < this.routes[i].children.length;j++){
                            if(to.name == this.routes[i].children[j].name){
                                this.routes[i].meta.class = 'ChangeIsCollapse'
                            };
                            if(to.path.indexOf(this.routes[i].path) == -1){
                                this.routes[i].meta.class = 'isCollapse'
                            }
                        };
                    };
                };
            };
        },
    },
    mounted() {
        let route = this.$route
        for(var i = 0; i < this.routes.length;i++){
            if(this.routes[i].children && this.routes[i].meta.class){
                for(var j = 0; j < this.routes[i].children.length;j++){
                    if(route.name == this.routes[i].children[j].name && route.path.indexOf(this.routes[i].meta.class) > -1){
                        this.routes[i].meta.class = 'ChangeIsCollapse'
                    };
                }
            }
        }
    },
};
</script>
<style lang="scss" scoped>
    /deep/.el-menu-item{
        span{
            margin-left: 10px !important;
        }
    }
   /deep/ .el-menu-item, .el-submenu__title {
       height: auto !important;
   }
   .isCollapse{
       margin-left: 10px;
       font-weight: 600;
   }
   .ChangeIsCollapse{
       color: #3bafda;
       margin-left: 10px;
       font-weight: 600;
   }
</style>

