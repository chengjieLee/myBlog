import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/profile',
    children: [{
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '个人中心', icon: 'user'}
    }]
  },
  {
    path: '/article',
    component: Layout,
    meta: {title: 'Blogs'},
    redirect: '/article',
    children:[
      {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表', icon: 'article'}
      },
      {
        path: '/article/detail',
        name: 'Detail',
        component: () => import('@/views/article/detail'),
        meta: { title: '文章详情'},
        hidden: true
      }
    ]
  },
  {
    path: '/edit',
    component: Layout,
    children:[
      {
        path: '/edit',
        name: 'Edit',
        component: () => import('@/views/editor/index'),
        meta: { title: '文章编辑', icon: 'edit'}
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://47.103.116.19',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
