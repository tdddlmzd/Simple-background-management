<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'App',
        //实现刷新可全局通用
        provide () {
            return {
                reload: this.reload,
            }
        },
        data () {
            return {
                isRouterAlive: true,
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>
<style lang="scss">
// 配置全局的样式根据根组件的font-size决定1rem等于多少px
    * {
        margin: 0;
        padding: 0;
    }
    html {
        width: 100%;
        height: 100%;
        font-size: 100px;
    }
    body {
        width: 100%;
        height: 100%;
        font-size: 12px;
        overflow-y: hidden;
    }
    #app {
        width: 100%;
        height: 100%;
        background-color: #f5f6f8;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    ul,
    li {
        list-style: none;
    }
    a {
        text-decoration: none;
    }
</style>
