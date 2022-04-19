
export default [
    //重定向
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: "/home",
        component: () => import('@/pages/Home'), //路由懒加载
        meta: {
            showHeader: true
        }
    },
    {
        // 起个名字，搭配对象写法的路由传参方式
        name: 'search',
        path: "/search/:keyWord?",
        component: () => import('@/pages/Search'),
        meta: {
            showFooter: true
        }
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: {
            showFooter: false
        }
    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: {
            showFooter: false
        }
    },
    {
        path: "/clientcomm",
        component: () => import('@/pages/clientComm'),
        meta: {
            showHeader: true
        }
    },
    {
        path: '/admin',
        component: () => import('@/pages/admin'),
        redirect: '/admin/qatable',
        children: [
        {
            path: 'communicating',
            name: 'communicating',
            component: () => import('@/pages/admin/communicating'),
            meta: { title: '首页', icon: 'el-icon-pie-chart',showFooter: false }
          },
          {
            path: 'qatable',
            name: 'qatable',
            component: () => import('@/pages/admin/qaTable'),
            meta: { title: '首页', icon: 'el-icon-pie-chart',showFooter: false }
          },
    ]
      },


]