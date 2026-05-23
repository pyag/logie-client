<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from './stores/user';
import Dashboard from './components/Dashboard.vue';
import FrontPage from './components/frontpage/FrontPage.vue';

const userStore = useUserStore();
const isLoading = ref(true);

const checkLoginStatus = async () => {
    await userStore.fetchCurrentUser();
};

const handleLogout = async () => {
    await userStore.performLogout();
};

onMounted(async () => {
    await checkLoginStatus();
    isLoading.value = false;
});
</script>

<template>
    <div v-if="!isLoading">
        <Dashboard v-if="userStore.isLoggedIn" @logout="handleLogout" />
        <FrontPage v-else @authenticated="checkLoginStatus" />
    </div>
</template>

<style scoped></style>
