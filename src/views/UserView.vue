<template>
  <div>
    <h1 class="text-center">User Area</h1>

    <div class="mb-4">
      <h2 class="h4">Account Details</h2>
      <p><strong>Name:</strong> {{ currentUser.fullName }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <p><strong>Role:</strong> {{ currentUser.role }}</p>
    </div>

    <h2 class="h4">My Support Requests</h2>

    <div v-if="myRequests.length" class="table-responsive">
      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Support type</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in myRequests" :key="request.referenceNumber">
            <td>{{ request.referenceNumber }}</td>
            <td>{{ request.requestType }}</td>
            <td>{{ formatDate(request.submittedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="alert alert-info">No support requests were found for this account.</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { currentUser } from '../auth'

const requests = ref(JSON.parse(localStorage.getItem('supportRequests')) || [])


const myRequests = computed(() => {
  return requests.value.filter(
    (request) => request.email.toLowerCase() === currentUser.value.email.toLowerCase(),
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>
