<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Dashboard from '@/components/Dashboard.vue';
import FrontPage from '@/components/frontpage/FrontPage.vue';

const userStore = useUserStore();
const isLoading = ref(true);

const checkLoginStatus = async () => {
  await userStore.fetchCurrentUser();
};

const handleLogout = async () => {
  await userStore.performLogout();
};

onMounted(async () => {
  try {
    await checkLoginStatus();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading" class="loading-screen">
    <div class="loading-spinner" aria-label="Loading" role="status"></div>
    <p>Checking your session...</p>
  </div>

  <div v-else>
    <Dashboard v-if="userStore.isLoggedIn" @logout="handleLogout" />
    <FrontPage v-else @authenticated="checkLoginStatus" />
  </div>
</template>

<style scoped>
.loading-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f7f7f7;
  color: #1f2937;
  font-family: 'Inter', sans-serif;
}

.loading-spinner {
  width: 42px;
  height: 42px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
