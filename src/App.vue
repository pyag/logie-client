<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Dashboard from './components/Dashboard.vue';
import FrontPage from './components/frontpage/FrontPage.vue';
import { getCurrentUser, logout, GetCurrentUserResponse } from './api/user';

const isUserLoggedIn = ref(false);
const currentUser = ref<GetCurrentUserResponse['data'] | null>(null);
const isLoading = ref(true);

const checkLoginStatus = async () => {
    try {
        const response = await getCurrentUser();
        if (response.success && response.data) {
            isUserLoggedIn.value = true;
            currentUser.value = response.data;
            return;
        }
    } catch (error) {
        // Not authenticated or session not available
    }

    isUserLoggedIn.value = false;
    currentUser.value = null;
};

const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error('Logout failed:', error);
    }
    isUserLoggedIn.value = false;
    currentUser.value = null;
};

onMounted(async () => {
    await checkLoginStatus();
    isLoading.value = false;
});
</script>

<template>
    <div v-if="!isLoading">
        <Dashboard v-if="isUserLoggedIn" @logout="handleLogout" />
        <FrontPage v-else @authenticated="checkLoginStatus" />
    </div>
</template>

<style scoped>
</style>
