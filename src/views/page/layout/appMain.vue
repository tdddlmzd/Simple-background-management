<template>
    <section class="app-main">
        <transition name="fade" mode="out-in">
            <transition>
                <router-view :key="key" class="child-view"></router-view>
            </transition>
        </transition>
    </section>
</template>

<script>
export default {
    name: "AppMain",
    computed: {
        key() {
            return this.$route.fullPath !== undefined? this.$route.fullPath + new Date(): this.$route + new Date()
        }
    }
};
</script>
<style lang="scss" scope>
.child-view {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(1000px, 0);
    transform: translate(1000px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-1000px, 0);
    transform: translate(-1000px, 0);
}
</style>
