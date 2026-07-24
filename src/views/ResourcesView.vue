<template>
  <div>
    <h1 class="text-center">Health Resources</h1>
    <p class="text-center text-muted mb-4">
      Short and clear information about common health topics.
    </p>

    <!-- will use dynamic data later -->
    <div class="row g-3">
      <div v-for="resource in resources" :key="resource.title" class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          <div class="card-body">
            <span class="badge text-bg-success mb-2">{{ resource.category }}</span>
            <h2 class="h5">{{ resource.title }}</h2>
            <p class="card-text">{{ resource.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// A small array keeps the current page easy to read.
const resources = [
  {
    category: 'Movement',
    title: 'Staying Active Safely',
    description: 'Simple ways to add safe movement and balance exercises to your week.',
  },
  {
    category: 'Nutrition',
    title: 'Healthy Eating as We Age',
    description: 'Practical meal and hydration ideas for energy and wellbeing.',
  },
  {
    category: 'Medication',
    title: 'Using Medicines Safely',
    description: 'Questions to ask and simple habits that support safe medicine use.',
  },
  {
    category: 'Safety',
    title: 'Preventing Falls at Home',
    description: 'A short checklist for making everyday spaces safer.',
  },
  {
    category: 'Wellbeing',
    title: 'Mental Wellbeing',
    description: 'Ways to stay connected and recognise when more support is needed.',
  },
]
</script>
