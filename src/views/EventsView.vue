<template>
  <div>
    <h1 class="text-center">Community Events</h1>
    <p class="text-center text-muted mb-4">Local activities for learning and connection.</p>

    <div class="list-group">
      <div v-for="event in events" :key="event.title" class="list-group-item py-3">
        <div class="row align-items-center">
          <div class="col-12 col-md-3 fw-bold">{{ event.date }}</div>
          <div class="col-12 col-md-5">
            <h2 class="h5 mb-1">{{ event.title }}</h2>
            <p class="mb-0 text-muted">{{ event.location }}</p>
          </div>
          <div class="col-12 col-md-4 mt-2 mt-md-0 text-md-end">{{ event.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const events = [
  {
    date: '24 July 2026',
    title: 'Gentle Movement Morning',
    location: 'Riverside Community Centre',
    time: '10:00 am - 11:00 am',
  },
  {
    date: '31 July 2026',
    title: 'Tea and Technology Help',
    location: 'Northside Library',
    time: '1:30 pm - 3:00 pm',
  },
  {
    date: '8 August 2026',
    title: 'Carer Information Session',
    location: 'Online',
    time: '6:00 pm - 7:00 pm',
  },
]
</script>
