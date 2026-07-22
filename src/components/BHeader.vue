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
          <RouterLink class="nav-link" active-class="active" to="/events">Events</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/about">About</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" active-class="active" to="/support">Get Support</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

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
</style>
