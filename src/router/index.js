import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import EventsView from '../views/EventsView.vue'
import AboutView from '../views/AboutView.vue'
import SupportView from '../views/SupportView.vue'


const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/resources', name: 'resources', component: ResourcesView },
  { path: '/events', name: 'events', component: EventsView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/support', name: 'support', component: SupportView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
