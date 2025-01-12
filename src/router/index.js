import { createRouter, createWebHashHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/newpage',
      name:'產品列表',
      component:()=>import('../views/NewPage.vue'),
      children:[
        {
          path:'a',
          name:'a',
          component:()=>import('../views/ComponentA.vue')
        },
        {
          path:'b',
          name:'b',
          component:()=>import('../views/ComponentB.vue')
        },

      ]
    },   {
      path: '/pricechange',
      name: 'pricechange',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PriceChange.vue')
    },
    
  ]
})

export default router
