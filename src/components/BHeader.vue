<template>
  <div class="container py-3">
    <RouterLink class="site-name" to="/">Healthy Ageing Support</RouterLink>


    <nav aria-label="Main navigation">
      <ul class="nav nav-pills justify-content-center flex-wrap gap-1 mt-3">
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/services">Services</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/resources">
            Resources
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/reviews">Reviews</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/events">Events</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/about">About</RouterLink>
        </li>
        <li class="nav-item" v-if="isAuthenticated && currentUser.role === 'user'">
          <RouterLink class="nav-link" active-class="active" to="/support">Get Support</RouterLink>
        </li>
        <li class="nav-item" v-if="isAuthenticated && currentUser.role === 'user'">
          <RouterLink class="nav-link" active-class="active" to="/user">User Area</RouterLink>
        </li>
        <li class="nav-item" v-if="isAuthenticated && currentUser.role === 'admin'">
          <RouterLink class="nav-link" active-class="active" to="/admin">Admin</RouterLink>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <RouterLink class="nav-link" active-class="active" to="/register">Register</RouterLink>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <RouterLink class="nav-link" active-class="active" to="/login">Login</RouterLink>
        </li>
        <li class="nav-item" v-else>
          <button type="button" class="nav-link logout-button" @click="handleLogout">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { currentUser, isAuthenticated, logout } from '../auth'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.site-name {
  display: block;
  color: #146c63;
  font-size: 1.35rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
}

.nav-link {
  color: #343a40;
}

.nav-link.active {
  background-color: #146c63;
}

.logout-button {
  border: 0;
  background-color: transparent;
}
</style>
