<script setup>
import Dashboard from "./components/Dashboard.vue";
import FrontPage from "./components/frontpage/FrontPage.vue";

function isUserLoggedIn() {
    return false; // Placeholder logic; replace with actual authentication check
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
