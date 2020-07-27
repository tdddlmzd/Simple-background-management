import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export const constantRouterMap = [
    // 登录
    {
        path: '/Login',
        component: resolve => require(['@/views/page/login/index.vue'], resolve),
        name: 'Login'
    },
    //注册
    { 
        path: '/Register',
        component: resolve => require(['@/views/page/register/index.vue'], resolve),
        name: 'register' 
    },
    //忘记密码
    {
        path: '/ResetPassword',
        component: resolve => require(['@/views/page/resetPassword/index.vue'], resolve),
        name: 'ResetPassword' 
    },
    // 404
    { 
        path: '/NotFind',
        component: resolve => require(['@/views/page/notFind/index.vue'], resolve),
        name: 'notFind'
    },
    //首页
    {
        path: '/Home',
        name: 'Home',
        meta: {
            title: '首页',
            icon: 'basis',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
    },
    //船期管控
    {
        path: '/ScheduleControl',
        name: 'ScheduleControl',
        meta: {
            class:'ScheduleControl',
            title: '船期管控',
            icon: 'el-icon-document-copy',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [
            {
                path: 'TrendsaileDate',
                name: 'TrendsaileDate',
                meta: {
                    title: '路径管理',
                },
                component: resolve => require(['@/views/page/trendsaileDate/index.vue'], resolve)
            },
            {
                path: 'routeManageMent',
                name: 'routeManageMent',
                meta: {
                    title: '航线管理',
                },
                component: resolve => require(['@/views/page/route/index.vue'], resolve),
            },
        ]
    },
    //跟踪管控
    {
        path: '/TrackControl',
        name: 'TrackControl',
        meta: {
            class:'TrackControl',
            title: '跟踪管控',
            icon: 'el-icon-coin',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [
            {
                path: 'WaybTrack',
                name: 'WaybTrack',
                meta: {
                    title: '箱货跟踪',
                },
                component: resolve => require(['@/views/page/waybTrack/index.vue'], resolve)
            },
            {
                path: 'ShipTraje',
                name: 'ShipTraje',
                meta: {
                    title: '船舶跟踪',
                },
                component: resolve => require(['@/views/page/shipTraje/index.vue'], resolve)
            },
        ]
    },
    //统计分析
    {
        path: '/Statistical',
        name: 'Statistical',
        meta: {
            class:'Statistical',
            title: '统计分析',
            icon: 'el-icon-document-copy',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [
            {
                path: 'Statistics',
                name: 'Statistics',
                meta: {
                    title: '查询记录',
                },
                component: resolve => require(['@/views/page/statistics/index.vue'], resolve),
            },
            {
                path: 'DataGrabbing',
                name: 'DataGrabbing',
                meta: {
                    title: '数据抓取',
                },
                component: resolve => require(['@/views/page/dataGrabbing/index.vue'], resolve),
            },
            {
                path: 'Crawler',
                name: 'Crawler',
                meta: {
                    title: '爬虫校验',
                },
                component: resolve => require(['@/views/page/crawler/index.vue'], resolve),
            },
        ]
    },
    //基础数据
    {
        path: '/BasicData',
        name: 'BasicData',
        meta: {
            class:'BasicData',
            title: '基础数据',
            icon: 'el-icon-coin',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [
            {
                path: 'BasicPort',
                name: 'BasicPort',
                meta: {
                    title: '基础港口',
                },
                component: resolve => require(['@/views/page/basicPort/index.vue'], resolve)
            },
            {
                path: 'Country',
                name: 'Country',
                meta: {
                    title: '国家',
                },
                component: resolve => require(['@/views/page/country/index.vue'], resolve)
            },
            {
                path: 'City',
                name: 'City',
                meta: {
                    title: '城市',
                },
                component: resolve => require(['@/views/page/city/index.vue'], resolve)
            },
            {
                path: 'AirLine',
                name: 'AirLine',
                meta: {
                    title: '航线',
                },
                component: resolve => require(['@/views/page/airLine/index.vue'], resolve)
            },
            {
                path: 'Dock',
                name: 'Dock',
                meta: {
                    title: '码头',
                },
                component: resolve => require(['@/views/page/dock/index.vue'], resolve)
            },
        ]
    },
    //定时任务
    {
        path: '/Timing',
        name: 'Timing',
        meta: {
            class:'Timing',
            title: '定时任务',
            icon: 'el-icon-document-copy',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [
            {
                path: 'timinTask',
                name: 'timinTask',
                meta: {
                    title: '定时任务',
                },
                component: resolve => require(['@/views/page/timinTask/index.vue'], resolve),
            },
        ]
    },
    
    //用户管理
    // {
    //     path: '/User',
    //     name: 'User',
    //     meta: {
    //         title: '用户管理',
    //         icon: 'el-icon-coin',
    //         requiresAuth: true
    //     },
    //     component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
    //     children: [
    //         {
    //             path: 'Userinfor',
    //             name: 'Userinfor',
    //             meta: {
    //                 title: '用户列表',
    //             },
    //             component: resolve => require(['@/views/page/userinfor/index.vue'], resolve)
    //         },
    //     ]
    // },
    //重定向到home
    {
        path: '*',
        redirect: '/Home',
    },
]
export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: constantRouterMap
})
