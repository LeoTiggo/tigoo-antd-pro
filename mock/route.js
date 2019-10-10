export default {
  '/api/auth_routes': {
    '/form/advanced-form': { authority: ['admin', 'user'] },
  },
  '/api/menus': {
    routes: [
      // elderlyInfo
      {
        path: '/elderlyInfo',
        icon: 'null',
        name: '老龄健康',
        routes: [
          {
            path: '/elderlyInfo/pending/list',
            name: '待核实老龄人口信息',
            component: './elderlyInfo/pending/List',
          },
          {
            path: '/elderlyInfo/normal/list',
            name: '老龄人口信息管理',
            component: './elderlyInfo/normal/List',
          },
          {
            path: '/elderlyInfo/disability/list',
            name: '失能老人管理',
            component: './elderlyInfo/disability/List',
          },
        ],
      },
      // elderlyInfo
      {
        path: '/serviceOrg',
        icon: 'null',
        name: '医养机构',
        routes: [
          {
            path: '/serviceOrg/baseInfo/list',
            name: '服务机构基本信息',
            component: './serviceOrg/BaseInfo/List',
          },
          {
            path: '/serviceOrg/service/list',
            name: '服务机构服务项目信息',
            component: './serviceOrg/Service/List',
          },
          {
            path: '/serviceOrg/workers/list',
            name: '服务机构工作人员信息',
            component: './serviceOrg/Workers/List',
          },
          {
            path: '/serviceOrg/serviceRec/list',
            name: '服务机构服务记录',
            component: './serviceOrg/ServiceRec/List',
          },
        ],
      },
      // elderlyInfo
      {
        path: '/elderlyInfo2',
        icon: 'null',
        name: '居家社区',
        routes: [
          {
            path: '/elderlyInfo/tablelist',
            name: 'searchtable',
            component: './elderlyInfo/TableList',
          },
          {
            path: '/elderlyInfo/basiclist',
            name: 'basiclist',
            component: './elderlyInfo/BasicList',
          },
        ],
      },
      // 
      {
        path: '/policy',
        icon: 'null',
        name: '政策文件',
        routes: [
          {
            path: '/policy/list',
            name: '政策文件',
            component: './Policy/List',
          }
        ],
      },
      // work
      {
        path: '/work',
        icon: 'null',
        name: '工作管理',
        routes: [
          {
            path: '/work/notice/list',
            name: '通知公告',
            component: './work/Notice/List',
          },
          {
            path: '/work/task/list',
            name: '工作任务',
            component: './work/Task/List',
          },
          {
            path: '/work/report/list',
            name: '工作报告',
            component: './work/Report/List',
          },
          {
            path: '/work/rule/list',
            name: '工作机制建设',
            component: './work/Rule/List',
          },
        ],
      },
      
      // statistic
      {
        path: '/statistic',
        icon: 'null',
        name: ' 统计分析',
        routes: [
          {
            path: '/statistic/report/detail',
            name: '统计报表',
            component: './statistic/Report/Detail',
          }
        ],
      },
      // system
      {
        path: '/system',
        icon: 'null',
        name: '系统管理',
        // authority: ['admin'],
        routes: [
          {
            path: '/system/unit/list',
            name: '单位管理',
            // authority: ['admin'],
            component: './system/Unit/List',
          },
          {
            path: '/system/usr/list',
            name: '用户管理',
            component: './system/Usr/List',
          },
          {
            path: '/system/log/list',
            name: '系统日志',
            component: './system/Log/List',
          },
         
        ],
      },
      
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/forms',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/forms/basicform',
      //       name: 'basicform',
      //     },
      //     {
      //       path: '/forms/stepform',
      //       name: 'stepform',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/forms/stepform/info',
      //           name: 'info',
      //         },
      //         {
      //           path: '/forms/stepform/confirm',
      //           name: 'confirm',
      //         },
      //         {
      //           path: '/forms/stepform/result',
      //           name: 'result',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/forms/advancedform',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/tablelist',
      //       name: 'searchtable',
      //     },
      //     {
      //       path: '/list/basiclist',
      //       name: 'basiclist',
      //     },
      //     {
      //       path: '/list/cardlist',
      //       name: 'cardlist',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       routes: [
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basicprofile',
      //       name: 'basic',
      //     },
      //     {
      //       path: '/profile/advancedprofile',
      //       name: 'advanced',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //     },
      //     { path: '/result/fail', name: 'fail' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       routes: [
      //         {
      //           path: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       routes: [
      //         {
      //           path: '/account/settings/baseview',
      //         },
      //         {
      //           path: '/account/settings/security',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name: 'editor',
      //   icon: 'highlight',
      //   path: '/editor',
      //   routes: [
      //     {
      //       path: '/editor/flow',
      //       name: 'flow',
      //     },
      //     {
      //       path: '/editor/mind',
      //       name: 'mind',
      //     },
      //     {
      //       path: '/editor/koni',
      //       name: 'koni',
      //     },
      //   ],
      // },
    ],
  },
};
