/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    name: 'Boss',
    component: () => import('@/layouts/AppSider.vue'),
    redirect: { name: 'Bosscollection' },
    children: [
      {
        path: '/Bosscollection',
        name: 'Bosscollection',
        component: () => import('@/views/boss/collection/Index.vue')
      },
      {
        path: '/Bossdelivery',
        name: 'Bossdelivery',
        component: () => import('@/views/boss/delivery/Index.vue')
      },
    ]
  },
]

export default constantRouterMap