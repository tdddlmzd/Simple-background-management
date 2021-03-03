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
            class: 'ScheduleControl',
            title: '船期管控',
            icon: 'el-icon-document-copy',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
                path: 'TrendsaileDate',
                name: 'TrendsaileDate',
                meta: {
                    title: '路径管理',
                },
                component: resolve => require(['@/views/page/trendsaileDate/index.vue'], resolve)
            },
            {
                path: 'RouteManageMent',
                name: 'RouteManageMent',
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
            class: 'TrackControl',
            title: '跟踪管控',
            icon: 'el-icon-coin',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
                path: 'WaybTrack',
                name: 'WaybTrack',
                meta: {
                    title: '箱货跟踪',
                },
                component: resolve => require(['@/views/page/waybTrack/index.vue'], resolve)
            },
            {
                path: 'NewTrack',
                name: 'NewTrack',
                meta: {
                    title: '新箱货跟踪',
                },
                component: resolve => require(['@/views/page/newTrack/index.vue'], resolve)
            },
            {
                path: 'ShipTraje',
                name: 'ShipTraje',
                meta: {
                    title: '船舶跟踪',
                },
                component: resolve => require(['@/views/page/shipTraje/index.vue'], resolve)
            },
            {
                path: 'OwnerNode',
                name: 'OwnerNode',
                meta: {
                    title: '船东节点',
                },
                component: resolve => require(['@/views/page/ownerNode/index.vue'], resolve)
            },
        ]
    },
    //统计分析
    {
        path: '/Statistical',
        name: 'Statistical',
        meta: {
            class: 'Statistical',
            title: '统计分析',
            icon: 'el-icon-document-copy',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
                path: 'ShippDate',
                name: 'ShippDate',
                meta: {
                    title: '船期查询记录',
                },
                component: resolve => require(['@/views/page/shippDate/index.vue'], resolve),
            },
            {
                path: 'DeclaraRecord',
                name: 'DeclaraRecord',
                meta: {
                    title: '报关查询记录',
                },
                component: resolve => require(['@/views/page/declaraRecord/index.vue'], resolve),
            },
            {
                path: 'shipDataRecord',
                name: 'shipDataRecord',
                meta: {
                    title: '船舶数据记录',
                },
                component: resolve => require(['@/views/page/shipDataRecord/index.vue'], resolve),
            },
            {
                path: 'AirRecord',
                name: 'AirRecord',
                meta: {
                    title: '空运查询记录',
                },
                component: resolve => require(['@/views/page/airRecord/index.vue'], resolve),
            },
            {
                path: 'ShipRecord',
                name: 'ShipRecord',
                meta: {
                    title: '船舶计划记录',
                },
                component: resolve => require(['@/views/page/shipRecord/index.vue'], resolve),
            },
            {
                path: 'TraceQuery',
                name: 'TraceQuery',
                meta: {
                    title: '海运跟踪记录',
                },
                component: resolve => require(['@/views/page/traceQuery/index.vue'], resolve),
            },
            // {
            //     path: 'TrackSheet',
            //     name: 'TrackSheet',
            //     meta: {
            //         title: '海运跟踪单一查询',
            //     },
            //     component: resolve => require(['@/views/page/trackSheet/index.vue'], resolve),
            // },
            // {
            //     path: 'USAWharf',
            //     name: 'USAWharf',
            //     meta: {
            //         title: '美国码头',
            //     },
            //     component: resolve => require(['@/views/page/USAWharf/index.vue'], resolve),
            // },
            {
                path: 'truckDataRecord',
                name: 'truckDataRecord',
                meta: {
                    title: '集卡数据记录',
                },
                component: resolve => require(['@/views/page/truckDataRecord/index.vue'], resolve),
            },
            {
                path: 'newTrackrRecord',
                name: 'newTrackrRecord',
                meta: {
                    title: '新海运跟踪记录',
                },
                component: resolve => require(['@/views/page/newTrackrRecord/index.vue'], resolve),
            },
            {
                path: 'eirQueryRecord',
                name: 'eirQueryRecord',
                meta: {
                    title: 'EIR查询记录',
                },
                component: resolve => require(['@/views/page/eirQueryRecord/index.vue'], resolve),
            },
            {
                path: 'PortInterface',
                name: 'PortInterface',
                meta: {
                    title: '港区实时接口',
                },
                component: resolve => require(['@/views/page/PortInterface/index.vue'], resolve),
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
            class: 'BasicData',
            title: '基础数据',
            icon: 'el-icon-coin',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
                path: 'BasicPort',
                name: 'BasicPort',
                meta: {
                    title: '基础港口',
                },
                component: resolve => require(['@/views/page/basicPort/index.vue'], resolve)
            },
            {
                path: 'ShipFile',
                name: 'ShipFile',
                meta: {
                    title: '船舶匹配',
                },
                component: resolve => require(['@/views/page/shipFile/index.vue'], resolve)
            },
            // {
            //     path: 'ShipInfor',
            //     name: 'ShipInfor',
            //     meta: {
            //         title: '船舶档案',
            //     },
            //     component: resolve => require(['@/views/page/shipInfor/index.vue'], resolve)
            // },
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
                path: 'BigLine',
                name: 'BigLine',
                meta: {
                    title: '大航线',
                },
                component: resolve => require(['@/views/page/bigLine/index.vue'], resolve)
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
    //订阅中心
    {
        path: '/SubscribCenter',
        name: 'SubscribCenter',
        meta: {
            class: 'SubscribCenter',
            title: '订阅中心',
            icon: 'el-icon-s-order',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
            path: 'ShippSubscrib',
            name: 'ShippSubscrib',
            meta: {
                title: '海运跟踪订阅记录',
            },
            component: resolve => require(['@/views/page/shippSubscrib/index.vue'], resolve),
        }, ]
    },
    //定时任务
    {
        path: '/Timing',
        name: 'Timing',
        meta: {
            class: 'Timing',
            title: '定时任务',
            icon: 'el-icon-document-copy',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
            path: 'TiminTask',
            name: 'TiminTask',
            meta: {
                title: '定时任务',
            },
            component: resolve => require(['@/views/page/timinTask/index.vue'], resolve),
        }, ]
    },
    //专家管控
    {
        path: '/ExpertControl',
        name: 'ExpertControl',
        meta: {
            class: 'ExpertControl',
            title: '专家管控',
            icon: 'el-icon-setting',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
                path: 'ExpertSchedule',
                name: 'ExpertSchedule',
                meta: {
                    title: '专家船期',
                },
                component: resolve => require(['@/views/page/expertSchedule/index.vue'], resolve),
            },
            {
                path: 'ClaimSta',
                name: 'ClaimSta',
                meta: {
                    title: '认证统计',
                },
                component: resolve => require(['@/views/page/claimSta/index.vue'], resolve),
            },
        ]
    },
    //用户管控
    {
        path: '/UserControl',
        name: 'UserControl',
        meta: {
            class: 'UserControl',
            title: '用户管控',
            icon: 'el-icon-user',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
            path: 'UserManage',
            name: 'UserManage',
            meta: {
                title: '用户管理',
            },
            component: resolve => require(['@/views/page/userManage/index.vue'], resolve)
        }, ]
    },
    //用户管控
    {
        path: '/ContentControl',
        name: 'ContentControl',
        meta: {
            class: 'ContentControl',
            title: '内容管理',
            icon: 'el-icon-reading',
            requiresAuth: true
        },
        component: resolve => require(['@/views/page/layout/layout.vue'], resolve),
        children: [{
            path: 'ContentManager',
            name: 'ContentManager',
            meta: {
                title: '内容管理',
            },
            props: true,
            component: resolve => require(['@/views/page/cms/content/index.vue'], resolve)
        }, {
            path: 'ColumnManager',
            name: 'ColumnManager',
            meta: {
                title: '栏目管理',
            },
            component: resolve => require(['@/views/page/cms/column/index.vue'], resolve)
        }, {
            path: 'ModelManager',
            name: 'ModelManager',
            meta: {
                title: '模型管理',
            },
            component: resolve => require(['@/views/page/cms/model/index.vue'], resolve)
        }]
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