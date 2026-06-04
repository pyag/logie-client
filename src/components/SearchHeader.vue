<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Button from './Button.vue';
import FrontPageModal from './frontpage/FrontPageModal.vue';

const router = useRouter();
const userStore = useUserStore();
const modalRef = ref();
const isLoading = ref(true);

const goToHome = () => {
    router.push({ name: 'home' });
};

const openSignUpModal = () => {
    modalRef.value.openSignUp();
};

const openLoginModal = () => {
    modalRef.value.openLogin();
};

const handleAuthenticated = () => {
    // Refresh user data and router will handle showing dashboard
    userStore.fetchCurrentUser();
};

onMounted(async () => {
    await userStore.fetchCurrentUser();
    isLoading.value = false;
});
</script>

<template>
    <header class="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div class="flex justify-between items-center px-8 py-4">
            <!-- Logo on the left -->
            <div
                @click="goToHome"
                class="cursor-pointer hover:opacity-80 transition-opacity"
            >
                <div class="gradient-heading text-3xl font-bold">logie</div>
            </div>

            <!-- Login/Signup buttons on the right (only if not logged in and loaded) -->
            <div v-if="!isLoading && !userStore.isLoggedIn" class="flex gap-x-4">
                <Button @click="openLoginModal" extra-classes="!text-sm !px-6 !py-2">
                    Login
                </Button>
                <Button @click="openSignUpModal" extra-classes="!text-sm !px-6 !py-2">
                    Sign Up
                </Button>
            </div>
        </div>
    </header>

    <!-- Modal for login/signup -->
    <FrontPageModal ref="modalRef" @authenticated="handleAuthenticated" />
</template>

<style scoped>
.gradient-heading {
    background: linear-gradient(270deg, #009F6B, #4169E1, #E52B50);
    color: transparent;
    background-clip: text;
}
</style>
