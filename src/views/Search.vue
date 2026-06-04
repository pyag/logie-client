<script setup lang="ts">
const props = defineProps<{ searchText: string }>();
</script>

<template>
  <div class="search-page">
    <h1>Search</h1>
    <p>This is a placeholder Search page.</p>
    <p v-if="props.searchText">Search term: {{ props.searchText }}</p>
    <p v-else>No search term provided.</p>
  </div>
</template>

<style scoped>
.search-page {
  padding: 1.5rem;
}
</style>
