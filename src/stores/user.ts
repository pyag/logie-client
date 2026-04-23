import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getCurrentUser, logout, GetCurrentUserResponse } from '../api/user';

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<GetCurrentUserResponse['data'] | null>(null);
    const isLoggedIn = computed(() => !!currentUser.value);

    const fetchCurrentUser = async () => {
        try {
            const response = await getCurrentUser();
            if (response.success && response.data) {
                currentUser.value = response.data;
            } else {
                currentUser.value = null;
            }
        } catch (error) {
            currentUser.value = null;
        }
    };

    const clearUser = () => {
        currentUser.value = null;
    };

    const performLogout = async () => {
        try {
            await logout();
        } catch (error) {
        }
        clearUser();
    };

    return {
        currentUser,
        isLoggedIn,
        fetchCurrentUser,
        clearUser,
        performLogout,
    };
});