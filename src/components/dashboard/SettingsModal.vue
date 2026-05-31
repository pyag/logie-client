<script setup lang="ts">
import { ref, reactive } from 'vue';
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
            <div class="flex w-200 min-h-95 -mx-6 -my-4">
                
                <aside class="w-1/3 border-r border-gray-200 py-4 flex flex-col bg-gray-50/50">
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

                <main class="w-2/3 p-6 flex flex-col justify-between">
                    
                    <form v-if="currentTab === 'password'" @submit.prevent="handleChangePassword" class="flex flex-col gap-4 h-full justify-between">
                        <div class="flex flex-col gap-4">
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

                    <form v-if="currentTab === 'delete'" @submit.prevent="handleDeleteLocker" class="flex flex-col gap-5 h-full justify-between">
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

                        <Button class="self-end bg-red-600! hover:bg-red-700! text-white">
                            Permanently Delete Locker
                        </Button>
                    </form>
                </main>
            </div>
        </Modal>
    </Teleport>
</template>
