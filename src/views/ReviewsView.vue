<template>
  <div>
    <h1 class="text-center">Community Reviews</h1>
    <p class="text-center text-muted mb-4">Ratings for our support services.</p>

    <div class="text-center border py-3 mb-4">
      <p class="h2 mb-1">{{ averageRating }} / 5</p>
      <p class="mb-0">{{ ratings.length }} rating<span v-if="ratings.length !== 1">s</span></p>
    </div>

    <div v-if="isAuthenticated && currentUser.role === 'user'" class="rating-form mb-5">
      <h2 class="h4">Add Your Rating</h2>

      <p v-if="savedMessage" class="alert alert-success">{{ savedMessage }}</p>

      <form @submit.prevent="submitRating">
        <div class="mb-3">
          <label for="rating" class="form-label">Rating</label>
          <select
            id="rating"
            v-model="rating"
            class="form-select"
            @blur="() => validateRating(true)"
            @change="() => validateRating(false)"
          >
            <option value="" disabled>Select a rating</option>
            <option :value="1">1 - Poor</option>
            <option :value="2">2 - Fair</option>
            <option :value="3">3 - Good</option>
            <option :value="4">4 - Very good</option>
            <option :value="5">5 - Excellent</option>
          </select>
          <div v-if="errors.rating" class="text-danger">{{ errors.rating }}</div>
        </div>

        <div class="mb-3">
          <label for="review-comment" class="form-label">Comment</label>
          <textarea
            id="review-comment"
            v-model="comment"
            class="form-control"
            rows="3"
            maxlength="300"
            @blur="() => validateComment(true)"
            @input="() => validateComment(false)"
          ></textarea>
          <div class="d-flex justify-content-between">
            <div v-if="errors.comment" class="text-danger">{{ errors.comment }}</div>
            <small class="text-muted ms-auto">{{ comment.length }}/300</small>
          </div>
        </div>

        <button type="submit" class="btn btn-success">Save Rating</button>
      </form>
    </div>

    <p v-else-if="!isAuthenticated" class="alert alert-info">
      <RouterLink to="/login">Log in</RouterLink> to add a rating.
    </p>

    <p v-else class="alert alert-info">Administrator accounts cannot submit ratings.</p>

    <h2 class="h4">Latest Reviews</h2>

    <div v-if="ratings.length" class="row g-3">
      <div v-for="review in ratings" :key="review.id" class="col-12 col-md-6">
        <article class="border p-3 h-100">
          <div class="d-flex justify-content-between gap-3">
            <strong>{{ review.userName }}</strong>
            <span>{{ review.rating }} / 5</span>
          </div>
          <p class="my-2">{{ review.comment }}</p>
          <small class="text-muted">{{ formatDate(review.submittedAt) }}</small>
        </article>
      </div>
    </div>

    <p v-else class="alert alert-light border">No ratings have been submitted yet.</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { cleanText, currentUser, isAuthenticated } from '../auth'

const ratings = ref(JSON.parse(localStorage.getItem('communityRatings')) || [])
const rating = ref('')
const comment = ref('')
const savedMessage = ref('')

const errors = ref({
  rating: null,
  comment: null,
})


const averageRating = computed(() => {
  if (ratings.value.length === 0) {
    return '0.0'
  }

  const total = ratings.value.reduce((sum, review) => sum + review.rating, 0)
  return (total / ratings.value.length).toFixed(1)
})

const validateRating = (blur) => {
  if (!rating.value) {
    if (blur) errors.value.rating = 'Please select a rating.'
  } else {
    errors.value.rating = null
  }
}

const validateComment = (blur) => {
  if (comment.value.trim().length < 10) {
    if (blur) errors.value.comment = 'Comment must be at least 10 characters.'
  } else {
    errors.value.comment = null
  }
}

const submitRating = () => {
  savedMessage.value = ''

  validateRating(true)
  validateComment(true)

  if (!errors.value.rating && !errors.value.comment) {
    const existingIndex = ratings.value.findIndex(
      (review) => review.userEmail === currentUser.value.email,
    )

    const newReview = {
      id: existingIndex >= 0 ? ratings.value[existingIndex].id : Date.now(),
      userName: currentUser.value.fullName,
      userEmail: currentUser.value.email,
      rating: rating.value,
      comment: cleanText(comment.value),
      submittedAt: new Date().toISOString(),
    }

    if (existingIndex >= 0) {
      ratings.value[existingIndex] = newReview
    } else {
      ratings.value.push(newReview)
    }

    localStorage.setItem('communityRatings', JSON.stringify(ratings.value))

    rating.value = ''
    comment.value = ''
    savedMessage.value = 'Your rating was saved.'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.rating-form {
  max-width: 650px;
  margin: 0 auto;
}
</style>
