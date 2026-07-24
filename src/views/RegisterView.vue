<template>
  <div class="account-page">
    <h1 class="text-center">Create an Account</h1>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="register-name" class="form-label">Full name</label>
        <input
          id="register-name"
          v-model="formData.fullName"
          type="text"
          class="form-control"
          @blur="() => validateName(true)"
          @input="() => validateName(false)"
        />
        <div v-if="errors.fullName" class="text-danger">{{ errors.fullName }}</div>
      </div>

      <div class="mb-3">
        <label for="register-email" class="form-label">Email address</label>
        <input
          id="register-email"
          v-model="formData.email"
          type="email"
          class="form-control"
          @blur="() => validateEmail(true)"
          @input="() => validateEmail(false)"
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>

      <div class="mb-3">
        <label for="register-password" class="form-label">Password</label>
        <input
          id="register-password"
          v-model="formData.password"
          type="password"
          class="form-control"
          @blur="() => validatePassword(true)"
          @input="
            () => {
              validatePassword(false)
              validateConfirmPassword(false)
            }
          "
        />
        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input
          id="confirm-password"
          v-model="formData.confirmPassword"
          type="password"
          class="form-control"
          @blur="() => validateConfirmPassword(true)"
          @input="() => validateConfirmPassword(false)"
        />
        <div v-if="errors.confirmPassword" class="text-danger">
          {{ errors.confirmPassword }}
        </div>
      </div>

      <p v-if="accountError" class="text-danger">{{ accountError }}</p>

      <div class="text-center">
        <button type="submit" class="btn btn-success">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../auth'

const router = useRouter()

const formData = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({
  fullName: null,
  email: null,
  password: null,
  confirmPassword: null,
})

const accountError = ref('')

const validateName = (blur) => {
  if (formData.value.fullName.trim().length < 3) {
    if (blur) errors.value.fullName = 'Name must be at least 3 characters.'
  } else {
    errors.value.fullName = null
  }
}

const validateEmail = (blur) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(formData.value.email.trim())) {
    if (blur) errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  if (password.length < 8) {
    if (blur) errors.value.password = 'Password must be at least 8 characters.'
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain an uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain a lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain a number.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const submitForm = () => {
  accountError.value = ''

  validateName(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)

  if (
    !errors.value.fullName &&
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirmPassword
  ) {
    const result = register(
      formData.value.fullName,
      formData.value.email,
      formData.value.password,
    )

    if (result.success) {
      router.push({
        path: '/login',
        query: { registered: 'true' },
      })
    } else {
      accountError.value = result.message
    }
  }
}
</script>

<style scoped>
.account-page {
  max-width: 500px;
  margin: 0 auto;
}
</style>
