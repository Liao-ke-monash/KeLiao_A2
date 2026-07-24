<template>
  <div>
    <h1 class="text-center">Health Resources</h1>
    <p class="text-center text-muted mb-4">
      Search for clear information about common health topics.
    </p>

    <!-- 输入或选择分类时更新 -->
    <div class="row g-3 mb-3">
      <div class="col-12 col-md-7">
        <label for="resource-search" class="form-label">Search resources</label>
        <input
          id="resource-search"
          v-model="searchText"
          type="search"
          class="form-control"
          placeholder="For example: falls, food, or exercise"
        />
      </div>

      <div class="col-12 col-md-5">
        <label for="resource-category" class="form-label">Category</label>
        <select id="resource-category" v-model="selectedCategory" class="form-select">
          <option value="All">All categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
      <p class="mb-0" aria-live="polite">
        {{ filteredResources.length }} resource<span v-if="filteredResources.length !== 1">s</span>
        found
      </p>
      <button
        v-if="searchText || selectedCategory !== 'All'"
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </div>

   

    <div v-if="filteredResources.length" class="row g-3">
      <div
        v-for="resource in filteredResources"
        :key="resource.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <article class="card h-100">
          <div class="card-body">
            <span class="badge text-bg-success mb-2">{{ resource.category }}</span>
            <h2 class="h5">{{ resource.title }}</h2>
            <p class="card-text">{{ resource.description }}</p>
            <small class="text-muted">{{ resource.readingTime }}</small>
          </div>
        </article>
      </div>
    </div>

    <div v-else class="alert alert-info" role="status">
      No matching resources were found. Try another keyword or category.
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import resources from '../assets/json/resources.json'

const searchText = ref('')
const selectedCategory = ref('All')



const categories = [...new Set(resources.map((resource) => resource.category))]



const filteredResources = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()

  return resources.filter((resource) => {
    const matchesCategory =
      selectedCategory.value === 'All' || resource.category === selectedCategory.value

    const matchesSearch =
      resource.title.toLowerCase().includes(keyword) ||
      resource.description.toLowerCase().includes(keyword) ||
      resource.category.toLowerCase().includes(keyword)

    return matchesCategory && matchesSearch
  })
})

const clearFilters = () => {
  searchText.value = ''
  selectedCategory.value = 'All'
}
</script>
