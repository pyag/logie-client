<script setup>
import Dashboard from "./components/Dashboard.vue";
import FrontPage from "./components/FrontPage.vue";

function isUserLoggedIn() {
    return true; // Placeholder logic; replace with actual authentication check
}
</script>

<template>
    <div>
        <FrontPage v-if="isUserLoggedIn()"/>
        <Dashboard v-else/>
    </div>
</template>

<style scoped>
</style>
