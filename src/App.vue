<script setup>
import Dashboard from "./components/Dashboard.vue";
import FrontPage from "./components/frontpage/FrontPage.vue";

const isUserLoggedIn = () => {
    return true; // Placeholder logic; replace with actual authentication check
}
</script>

<template>
    <div>
        <Dashboard v-if="isUserLoggedIn()"/>
        <FrontPage v-else/>
    </div>
</template>

<style scoped>
</style>
