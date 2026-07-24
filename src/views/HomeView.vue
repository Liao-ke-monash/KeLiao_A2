<template>
  <div>
    <section class="home-banner">
      <div class="banner-text">
        <h1>Healthy Ageing Support</h1>
        <p>Clear health information and community support for older adults and their carers.</p>
        <RouterLink class="btn btn-success me-2" to="/support">Get Support</RouterLink>
        <RouterLink class="btn btn-outline-success" to="/resources">View Resources</RouterLink>
      </div>
    </section>

    <section class="mt-5">
      <h2 class="text-center mb-4">How we can help</h2>
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="h5">Health Resources</h3>
              <p class="card-text">Read simple information about health and wellbeing.</p>
              <RouterLink to="/resources">View resources</RouterLink>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="h5">Support Services</h3>
              <p class="card-text">Find transport, home support, and carer assistance.</p>
              <RouterLink to="/services">View services</RouterLink>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="h5">Community Events</h3>
              <p class="card-text">Join local activities and meet people in the community.</p>
              <RouterLink to="/events">View events</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="alert alert-success mt-4 mb-0" role="status">
      Prefer to speak with someone? Call us on <strong>1800 123 456</strong>.
    </div>
  </div>
</template>

<style scoped>
.home-banner {
  position: relative;
  min-height: 360px;
  display: flex;
  align-items: center;
  padding: 2rem;
  background-image: url('/images/elderly-community-hero.png');
  background-position: center;
  background-size: cover;
  border-radius: 6px;
  overflow: hidden;
}

.home-banner::before {
  position: absolute;
  inset: 0;
  content: '';
  background-color: rgba(255, 255, 255, 0.78);
}

.banner-text {
  position: relative;
  max-width: 560px;
}

@media (max-width: 576px) {
  .home-banner {
    min-height: 420px;
    padding: 1.25rem;
    background-position: 62% center;
  }
}
</style>
