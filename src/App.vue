<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Dashboard from './components/Dashboard.vue';
import FrontPage from './components/frontpage/FrontPage.vue';
import { getCurrentUser, GetCurrentUserResponse } from './api/user';

const isUserLoggedIn = ref(false);
const currentUser = ref<GetCurrentUserResponse['data'] | null>(null);

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

onMounted(() => {
    checkLoginStatus();
});
</script>

<template>
    <div>
        <Dashboard v-if="isUserLoggedIn" />
        <FrontPage v-else @authenticated="checkLoginStatus" />
    </div>
</template>

<style scoped>
</style>
