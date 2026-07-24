<template>
  <div>
    <h1 class="text-center">Administrator Area</h1>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6">
        <div class="border p-3 h-100">
          <h2 class="h5">Registered users</h2>
          <p class="display-6 mb-0">{{ users.length }}</p>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="border p-3 h-100">
          <h2 class="h5">Support requests</h2>
          <p class="display-6 mb-0">{{ requests.length }}</p>
        </div>
      </div>
    </div>

    <h2 class="h4">User Accounts</h2>

    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const savedUsers = JSON.parse(localStorage.getItem('users')) || []
const users = ref(savedUsers.filter((user) => user.role === 'user'))
const requests = ref(JSON.parse(localStorage.getItem('supportRequests')) || [])
</script>
