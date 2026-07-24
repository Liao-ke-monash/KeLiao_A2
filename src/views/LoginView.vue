<template>
  <div class="account-page">
    <h1 class="text-center">Login</h1>

    <p v-if="route.query.registered" class="alert alert-success">
      Registration was successful. You can now log in.
    </p>

    <p v-if="route.query.redirect" class="alert alert-warning">
      Please log in before opening that page.
    </p>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="login-email" class="form-label">Email address</label>
        <input id="login-email" v-model="email" type="email" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input id="login-password" v-model="password" type="password" class="form-control" />
      </div>

      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

      <div class="text-center">
        <button type="submit" class="btn btn-success">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { currentUser, login } from '../auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const route = useRoute()
const router = useRouter()

const handleLogin = () => {
  const success = login(email.value, password.value)

  if (!success) {
    errorMessage.value = 'Incorrect email or password.'
    return
  }

  if (route.query.redirect) {
    router.push(route.query.redirect)
  } else if (currentUser.value.role === 'admin') {
    router.push('/admin')
  } else {
    router.push('/user')
  }
}
</script>

<style scoped>
.account-page {
  max-width: 500px;
  margin: 0 auto;
}
</style>
