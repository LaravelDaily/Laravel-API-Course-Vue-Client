import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/auth/RegisterView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import ProtectedView from '@/views/ProtectedView.vue';
import CreateView from '@/views/categories/CreateView.vue';

function auth(to, from, next) {
    const isAuthenticated = !!localStorage.getItem('access_token')

    if (isAuthenticated) {
        next()
    }

    next({ name: 'login' })
}

function guest(to, from, next) {
    const isAuthenticated = !!localStorage.getItem('access_token')

    if (!isAuthenticated) {
        next()
    }

    next({ name: 'home' })
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/register',
            name: 'register',
            beforeEnter: guest,
            component: RegisterView,
        },
        {
            path: '/login',
            name: 'login',
            beforeEnter: guest,
            component: LoginView,
        },
        {
            path: '/protected',
            name: 'protected',
            component: ProtectedView,
            beforeEnter: auth,
        },
        {
            path: '/categories/create',
            name: 'categories.create',
            component: CreateView,
        },
    ],
})

export default router
