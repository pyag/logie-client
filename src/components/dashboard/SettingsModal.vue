<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ArrowLeft, ChevronRight, KeyRound, ShieldAlert } from 'lucide-vue-next';
import Modal from "@/components/Modal.vue";
import Label from "@/components/Label.vue";
import Password from "@/components/Password.vue";
import Button from "@/components/Button.vue";
import { isPasswordValid } from "@/logic/pwd";
import { clearFolderPath, clearParentId } from '@/logic/fpath';

import { changePassword, deleteLocker } from "@/api/user";

const emit = defineEmits(['close']);

const errorMessage = ref('');
const deleteErrorMessage = ref('');

// Tab Management
const currentTab = ref<'password' | 'delete'>('password');
const mobileView = ref<'menu' | 'form'>('menu');

function openMobileTab(tab: 'password' | 'delete') {
    currentTab.value = tab;
    mobileView.value = 'form';
}

function returnToMobileMenu() {
    mobileView.value = 'menu';
}

// Form States
const passwordForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
});

const deleteForm = reactive({
    confirmPassword: ''
});

// Submit Handlers
async function handleChangePassword() {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        errorMessage.value = "New passwords do not match!";
        return;
    }

    if (!isPasswordValid(passwordForm.newPassword)) {
        errorMessage.value = "New password does not meet strength requirements (8+ chars, uppercase, lowercase, number and symbol).";
        return;
    }

    if (passwordForm.oldPassword === passwordForm.newPassword) {
        errorMessage.value = "New password cannot be the same as the old password.";
        return;
    }

    try {
        const response = await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
        if (response.success == false) {
            errorMessage.value = response.message || "Failed to change password. Please check your old password and try again.";
            return;
        }

        errorMessage.value = '';
        alert("Password changed successfully!");
        emit('close');
    } catch (err) {
        errorMessage.value = "Failed to change password. Please check your old password and try again.";
    }
}

async function handleDeleteLocker() {
    if (!deleteForm.confirmPassword) {
        deleteErrorMessage.value = "Please enter your password to confirm deletion.";
        return;
    }

    const doubleCheck = confirm("Are you absolutely sure? This cannot be undone.");
    if (!doubleCheck) {
        return;
    }

    try {
        const response = await deleteLocker(deleteForm.confirmPassword);
        if (response.success == false) {
            deleteErrorMessage.value = response.message || "Failed to delete locker. Please check your password and try again.";
            return;
        }

        deleteErrorMessage.value = '';
        // Clear the local storage which holds pid.
        clearFolderPath(); // Clear folder path on locker deletion
        clearParentId(); // Clear parent ID on locker deletion

        alert("Locker deleted successfully!");
        // Refresh the page as the session is cleared
        window.location.reload();
    } catch (err) {
        deleteErrorMessage.value = "Failed to delete locker. Please check your password and try again.";
    }
}
</script>

<template>
    <Teleport to="body">
        <Modal modalTitle="Settings" @close="$emit('close')">
            <div class="settings-stage relative flex w-[calc(100vw-3rem)] max-w-lg lg:max-w-none lg:w-200 min-h-95 lg:min-h-95 mx-0 lg:-mx-6 my-0 lg:-my-4 overflow-hidden lg:overflow-visible">
                <section class="mobile-settings-menu lg:hidden p-4" :class="{ 'mobile-menu-away': mobileView === 'form' }" aria-label="Settings menu">
                    <p class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Account</p>
                    <h2 class="mt-1 text-xl font-bold text-gray-900">Settings</h2>
                    <p class="mt-1 text-sm text-gray-500">Manage your password and locker.</p>

                    <div class="mt-5 flex flex-col gap-3">
                        <button type="button" @click="openMobileTab('password')" class="mobile-setting-option group flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/70 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><KeyRound class="h-5 w-5" /></span>
                            <span class="min-w-0 flex-1">
                                <span class="block text-sm font-semibold text-gray-900">Change Password</span>
                                <span class="mt-0.5 block text-xs text-gray-500">Update your account password</span>
                            </span>
                            <ChevronRight class="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-0.5" />
                        </button>

                        <button type="button" @click="openMobileTab('delete')" class="mobile-setting-option group flex w-full items-center gap-3 rounded-xl border border-red-200 bg-white/80 p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50/70 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700"><ShieldAlert class="h-5 w-5" /></span>
                            <span class="min-w-0 flex-1">
                                <span class="block text-sm font-semibold text-gray-900">Delete Locker</span>
                                <span class="mt-0.5 block text-xs text-gray-500">Permanently remove your locker</span>
                            </span>
                            <ChevronRight class="h-5 w-5 text-red-400 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </section>

                <aside class="hidden lg:flex lg:w-1/3 lg:basis-1/3 lg:shrink-0 border-r border-gray-200 py-4 flex-col bg-gray-50/50">
                    <button 
                        @click="currentTab = 'password'"
                        :class="[
                            'w-full text-left pl-4 pr-3 py-3.5 text-sm font-semibold transition-all border-l-4 focus:outline-none cursor-pointer',
                            currentTab === 'password' 
                                ? 'border-blue-600 bg-blue-200/80 text-blue-700' 
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                        ]"
                    >
                        Change Password
                    </button>

                    <button 
                        @click="currentTab = 'delete'"
                        :class="[
                            'w-full text-left pl-4 pr-3 py-3.5 text-sm font-semibold transition-all border-l-4 focus:outline-none cursor-pointer',
                            currentTab === 'delete' 
                                ? 'border-red-600 bg-red-200 text-red-700' 
                                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                        ]"
                    >
                        Delete Locker
                    </button>
                </aside>

                <main class="mobile-settings-form w-full p-4 lg:w-2/3 lg:flex-1 lg:min-w-0 lg:p-6 flex flex-col justify-between" :class="{ 'mobile-form-visible': mobileView === 'form' }">
                    <button type="button" @click="returnToMobileMenu" class="mb-4 inline-flex w-fit items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 lg:hidden">
                        <ArrowLeft class="h-4 w-4" />
                        Settings
                    </button>
                    <form v-if="currentTab === 'password'" @submit.prevent="handleChangePassword" class="flex flex-col gap-5 h-full justify-between">
                        <div class="flex flex-col gap-5">
                            <div class="flex flex-col gap-1.5">
                                <Label for="old-password">Old Password</Label>
                                <Password 
                                    id="old-password"
                                    v-model="passwordForm.oldPassword"
                                    placeholder="Enter your current password" 
                                    required
                                />
                            </div>

                            <div class="flex flex-col gap-1.5">
                                <Label for="new-password">New Password</Label>
                                <Password 
                                    id="new-password"
                                    v-model="passwordForm.newPassword"
                                    placeholder="Enter your new password" 
                                    required
                                />
                            </div>

                            <div class="flex flex-col gap-1.5">
                                <Label for="confirm-password">Confirm New Password</Label>
                                <Password 
                                    id="confirm-password"
                                    v-model="passwordForm.confirmPassword"
                                    placeholder="Confirm your new password" 
                                    required
                                />
                            </div>
                            <p v-if="errorMessage" class="text-red-700 text-base/5">{{ errorMessage }}</p>
                        </div>

                        <Button type="submit" class="self-end mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                            Update Password
                        </Button>
                    </form>

                    <form v-else @submit.prevent="handleDeleteLocker" class="flex flex-col gap-5 h-full justify-between">
                        <div class="flex flex-col gap-5">
                            <div class="bg-red-50 border border-red-200 p-4 rounded-md">
                                <div class="flex flex-col gap-1">
                                    <span class="text-sm font-bold text-red-800">Warning: Permanent Action</span>
                                    <p class="text-xs text-red-700 leading-relaxed">
                                        Deleting this locker is a one-time action. All stored files, passwords, and data will be permanently wiped out. This action cannot be reversed.
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-col gap-1.5">
                                <Label for="delete-confirm-password" class="text-red-700">Enter Password to Confirm</Label>
                                <Password 
                                    id="delete-confirm-password"
                                    v-model="deleteForm.confirmPassword"
                                    placeholder="Enter your current password" 
                                    required
                                />
                            </div>

                            <p v-if="deleteErrorMessage" class="text-red-700 text-base/5">{{ deleteErrorMessage }}</p>
                        </div>

                        <Button type="submit" class="self-end bg-red-600! hover:bg-red-700! text-white">
                            Permanently Delete Locker
                        </Button>
                    </form>
                </main>
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
.settings-stage {
    min-height: 23.75rem;
}

.mobile-settings-menu,
.mobile-settings-form {
    transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease;
}

.mobile-settings-menu {
    position: absolute;
    inset: 0;
    width: 100%;
    opacity: 1;
    transform: translateX(0);
}

.mobile-settings-menu.mobile-menu-away {
    opacity: 0;
    transform: translateX(-100%);
    pointer-events: none;
}

.mobile-settings-form {
    position: absolute;
    inset: 0;
    width: 100%;
    opacity: 0;
    transform: translateX(100%);
    pointer-events: none;
}

.mobile-settings-form.mobile-form-visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
}

@media (min-width: 64rem) {
    .settings-stage {
        min-height: 23.75rem;
    }

    .mobile-settings-menu,
    .mobile-settings-form {
        position: static;
        opacity: 1;
        transform: none;
        pointer-events: auto;
    }

    .mobile-settings-menu {
        display: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .mobile-settings-menu,
    .mobile-settings-form {
        transition-duration: 1ms;
    }
}
</style>
