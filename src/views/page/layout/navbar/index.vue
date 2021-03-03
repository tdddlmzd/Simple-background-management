<template>
    <div class="navbar">
        <div class="header">
            <span class="hamburger-span">
                <Hamburger
                    style="line-height: 0px;"
                    class="hamburger-container"
                    :toggleClick="toggleSideBar"
                    :isActive="true"
                ></Hamburger>
            </span>
            <div class="headerRight">
                <div class="infor_div" @click="changeHome">
                    <img src="../../../../assets/images/login/small_tong.png" class="infro_image"/>
                    <div class="isDot" v-if="numberCount > 0">{{numberCount > 99 ? '99+' : numberCount}}</div>
                </div>
                <span class="welcome">欢迎用户</span>
                <span class="user">{{this.getCookie('userName')}}</span>
                <el-dropdown
                    class="avatar-container right-menu-item"
                    trigger="click"
                    placement="bottom"
                >
                    <span class="el-dropdown-link">
                        <i class="el-icon-switch-button" style="cursor: pointer;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="dialogOut" ref="dialogOut">
                        <el-dropdown-item divided>
                            <span @click="logout" style="display:block;" class="logout">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import Hamburger from "@/components/Hamburger";
    export default {
        data(){
            return {
                user : '',
            }
        },
        components: {
            Hamburger
        },
        computed:{
            numberCount(){
                return this.$store.state.common.numberCount
            },
        },
        methods : {
            logout() {
                this.$confirm("<div class='tesDiv'><div>确认退出吗</div></div>", "", {
                  cancelButtonClass: "btnCustomCencel", 
                  confirmButtonClass:"btnCustomSubmit",
                  customClass:"customClass",
                  dangerouslyUseHTMLString:true,
                }).then(() => {
                        this.$router.push({ path: "/Login" });
                }).catch(() => {});
            },
            toggleSideBar() {
                this.$store.dispatch("ToggleSideBar");
            },
            changeHome(){
                if(this.$route.path !== "/Home"){
                    this.$router.push({ path: "/Home" })
                }
            },
        },
        watch: {
            numberCount(newVal){
                console.log(newVal,'newVal')
            },        
        },
    }
</script>

<style lang="scss" scoped>
    /deep/.el-header{
        padding: 0 !important;
    }
    /deep/.el-dropdown-menu__item--divided{
        border: 0;
        margin: 0px;
        padding: 0;
    }
    /deep/.el-dropdown-menu__item--divided:before{
        margin: 0;
    }
    .header{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #3bafda;
        color: #fff;
        position: relative;
    }
    .headerLeft{
        display: inline-block;
    }
    .hamburger-span{
        float: left;
    }
    .hamburger-container{
        line-height: 60px !important;
    }
    .headerRight{
        position: absolute;
        right: 40px;
        color: #fff;
        display: flex;
        align-items: center;
        .infor_div{
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
        }
        .infro_image{
            width: 17px;
            height: 17px;
            margin-right: 30px;
            margin-top: -2px;
        }
        .isDot{
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: #ff4848;
            border-radius: 50%;     
            line-height: 20px;
            text-align: center;
            left: 10px;
            top: -7px;            
            color: #fff;
            font-size: 11px;
        }
        .welcome{
            margin-right: 30px;
        }
        .user{
            margin-right: 30px;
        }
    }
    .logout{
        padding: 0 20px;
    }

</style>