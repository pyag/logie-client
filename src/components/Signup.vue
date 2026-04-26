<script setup lang="ts">
import { Ref, ref } from 'vue';
import { CreateLockerResponse, saveLocker } from '@/api/user';

import { Ellipsis } from "lucide-vue-next";

import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";

const emit = defineEmits(['authenticated']);

const lname: Ref<string> = ref('');
const password: Ref<string> = ref('');
const cnfrm_password: Ref<string> = ref('');
const email: Ref<string> = ref('');
const errorMessage: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);

const createLocker = async () => {
    loading.value = true;
    errorMessage.value = ''; // Clear previous error message

    try {
        if (!lname.value || !password.value || !cnfrm_password.value) {
            errorMessage.value = 'Please fill in all required fields.';
            return;
        }

        let response: CreateLockerResponse
            = await saveLocker(lname.value, password.value, cnfrm_password.value, email.value);

        if (response.success) {
            emit('authenticated');
        } else {
            errorMessage.value = response.message || 'Signup failed. Try again after sometime.';
            console.error('Signup failed:', response.message);
        }
    } catch (error: any) {
        console.error('Error creating locker:', error);
        // Handle network or other unexpected errors
        if (error.data?.detail) {
            errorMessage.value = error.data.detail;
        } else if (error.data?.message) {
            errorMessage.value = error.data.message;
        } else {
            errorMessage.value = 'An unexpected error occurred. Please try again.';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <form class="flex flex-col gap-y-4" @submit.prevent>
        <SectionHeading>Create locker</SectionHeading>

        <Input :required=true type="text" id="username" v-model="lname" name="username"
        placeholder="Locker name" />

        <Password :required=true id="password" v-model="password" name="password" placeholder="Password" />

        <Password :required=true id="cnfrm-password" v-model="cnfrm_password" name="cnfrm-password" placeholder="Confirm password" />

        <Input type="text" id="email" v-model="email" name="email"
        placeholder="Email or Phone (optional)" />

        <div v-if="errorMessage" class="text-red-700 text-base/5">{{ errorMessage }}</div>

        <Button @click="createLocker" :disabled="loading" extra-classes="!flex !items-center !justify-center">
            <span v-if="loading" class="flex items-end gap-x-2">
                Creating locker <Ellipsis color="#ffffff" />
            </span>
            <span v-else>Create locker</span>
        </Button>
    </form>
</template>

<style scoped>
</style>
