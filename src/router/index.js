//路由文件
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
      //独享守卫
    beforeEnter(to,from,next){
        next()
     }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
//全局守卫
router.beforeEach((to,from,next)=>{
	next()
})

router.beforeResolve((to,from,next)=>{
	next()
})

router.afterEach((to,from)=>{
	
})

export default router;
