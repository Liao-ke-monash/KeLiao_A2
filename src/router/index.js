import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import EventsView from '../views/EventsView.vue'
import AboutView from '../views/AboutView.vue'
import SupportView from '../views/SupportView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import AdminView from '../views/AdminView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import ReviewsView from '../views/ReviewsView.vue'
import { currentUser, isAuthenticated } from '../auth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/resources', name: 'resources', component: ResourcesView },
  { path: '/events', name: 'events', component: EventsView },
  { path: '/about', name: 'about', component: AboutView },
  {
    path: '/support',
    name: 'support',
    component: SupportView,
    meta: {
      requiresAuth: true,
      requiredRole: 'user',
    },
  },
  { path: '/reviews', name: 'reviews', component: ReviewsView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      requiresAuth: true,
      requiredRole: 'user',
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      requiredRole: 'admin',
    },
  },
  {
    path: '/access-denied',
    name: 'access-denied',
    component: AccessDeniedView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return { top: 0 }
  },
})


router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.requiredRole && currentUser.value.role !== to.meta.requiredRole) {
    return '/access-denied'
  }
})

export default router
