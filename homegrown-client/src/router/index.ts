import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import useAdminService from "@/services/useAdminService"
import useStoreService from '@/services/useStoreService'

const { authorizeAdmin } = useAdminService()
const { getStoreItem } = useStoreService()

const authorize = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    let authorization = await authorizeAdmin()
    authorization !== false && authorization.isAdmin === true ? next() : next({name: 'home'}) 
}

const fetchStoreItem = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const storeItem = await getStoreItem(to.params.id + "")
    to.meta.storeItem = storeItem
    next()
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/store',
            name: 'store',
            component: () => import('@/views/StoreView.vue')
        },
        {
            path: '/store/:id',
            name: 'store-item',
            component: () => import('@/views/StoreItemView.vue'),
            // beforeEnter: fetchStoreItem 
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: () => import('@/views/CheckoutView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('@/views/ContactView.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/DashboardView.vue'),
            // beforeEnter: (to:RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            //     to.meta.action = "register"
            //     next()
            // }

        },
        {
            path: '/users/register',
            name: 'register',
            component: () => import('@/views/LoginView.vue'),
            beforeEnter: (to:RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
                to.meta.action = "register"
                next()
            }

        },
        {
            path: '/users/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            beforeEnter: (to:RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
                to.meta.action = "login"
                next()
            }
        },
        {
            path: '/admin/upload',
            name: 'upload',
            component: () => import('@/views/admin/UploadView.vue'),
            beforeEnter: authorize
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notfound",
            component: () => import("@/views/NotFound.vue"),
        }
    ]
})

export default router
