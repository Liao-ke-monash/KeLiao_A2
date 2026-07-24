<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

    <!-- RouterView displays the page selected in src/router/index.js. -->
    <!-- RouterView 会显示 src/router/index.js 中选择的页面。 -->
    <main class="main-box">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-box {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

header {
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;
}

.main-box :deep(h1) {
  margin-bottom: 1rem;
  font-size: 2.25rem;
  font-weight: 600;
  color: #212529;
}

@media (max-width: 576px) {
  .main-box {
    padding-top: 1.25rem;
  }

  .main-box :deep(h1) {
    font-size: 1.85rem;
  }
}
</style>
