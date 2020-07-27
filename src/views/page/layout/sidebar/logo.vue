<template>
    <div class="logo">
        <transition-group name="fade">
            <template>
                <!-- <img src="@/assets/images/log/logo.png" width="100" height="45" class="logo_title is-bold" key="1"> -->
                <span class="logo_subtitle" key="1">
                    <img src="@/assets/images/login/logo4.png" class="logo_title1" v-if="isCollapse === false">
                    <img src="@/assets/images/login/logo5.png" class="logo_title" ref="logoTitle" v-else>
                </span>
                <!-- <span class="logo_subtitle" key="2">{{website.author}}</span> -->
                <!-- <span class="logo_subtitle" key="2">
                    <img src="@/assets/images/login/logo.png" class="logo_title1">
                </span> -->
            </template>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "logo",
    data() {
        return {
            isLog : true,
        };
    },
    
    props: ["isCollapse"],

    created() {},
    computed: {
        // ...mapGetters(["website",]),
    },
    methods: {
        
    },
    watch : {
        // 'isCollapse':{
        //     immediate:true,
        //     handler(newVal,oldVal){
        //         if(newVal === true){
        //             setTimeout(() => {
        //                 this.$refs.logoTitle.style.width = '30px';
        //                 this.$refs.logoTitle.style.height = '25px';
        //                 this.$refs.logoTitle.style.lineHeight = '25px';
        //                 this.$refs.logoTitle.style.margin = '8px 0 0 0';
        //             },300)
        //         }else{
        //             setTimeout(() => {
        //                 this.$refs.logoTitle.style.width = '60px';
        //                 this.$refs.logoTitle.style.height = '50px';
        //                 this.$refs.logoTitle.style.lineHeight = '25px';
        //                 this.$refs.logoTitle.style.margin = '13px 10px 0 -10px';
        //             },300)
        //         }
        //     }
        // }
    },
    mounted() {}
};
</script>

<style scoped="scoped" lang="scss">
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-active {
    transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.logo {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 230px;
    height: 50px;
    line-height: 50px;
    background: #3bafda;
    color: #fdfdfd;
    text-align: center;
    font-size: 18px;
    overflow: hidden;
    box-sizing: border-box;
}
.logo_title {
    width: 32px;
    height: 21px;
    line-height: 25px;
    margin: 14px 0 0 0;
    color: #fff;
    font-size: 18px;
    &.is-bold {
    }
}
.logo_title1{
    width: 95px;
    margin-top: 18px;
}
.is-text {
    position: absolute;
    top: 0;
    // left: 20px;
}
.is-img {
    position: absolute;
    top: 10px;
    left: 10px;
}
.logo_subtitle {
    display: inline-block;
    font-size: 16px;
    padding-top: 5px;
}
</style>