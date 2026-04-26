<script setup lang="ts">
import { Ref, ref } from 'vue';
import { login, LoginResponse } from '@/api/user';

import { Ellipsis } from "lucide-vue-next";

import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";

const emit = defineEmits(['authenticated']);

const identifier: Ref<string> = ref('');
const password: Ref<string> = ref('');
const errorMessage: Ref<string> = ref('');
const loginLoading: Ref<boolean> = ref(false);

const loginUser = async () => {
    loginLoading.value = true;
    errorMessage.value = ''; // Clear previous error message

    try {
        if (!identifier.value || !password.value) {
            errorMessage.value = 'Please fill in all required fields.';
            return;
        }
        let response: LoginResponse = await login(identifier.value, password.value);

        if (response.success) {
            emit('authenticated');
        } else {
            errorMessage.value = response.message || 'Login failed. Please check your credentials and try again.';
            console.error('Login failed:', response.message);
        }
    } catch (error: any) {
        errorMessage.value = 'Something went wrong. Please try again later.';
        console.error('Login failed:', error);
    } finally {
        loginLoading.value = false;
    }
};
</script>

<template>
    <div>
        <form class="flex flex-col gap-y-4" @submit.prevent>
            <SectionHeading>login</SectionHeading>

            <Input :required=true type="text" id="identifier" v-model="identifier" name="identifier"
            placeholder="Locker name or email" />

            <Password :required=true id="password" v-model="password" name="password" placeholder="Password" />

            <div v-if="errorMessage" class="text-red-700 text-base/5">{{ errorMessage }}</div>

            <Button @click="loginUser" :disabled="loginLoading" extra-classes="!flex !items-center !justify-center">
                <span v-if="loginLoading" class="flex items-end gap-x-2">
                    Loging <Ellipsis color="#ffffff" />
                </span>
                <span v-else>Login</span>
            </Button>
        </form>
    </div>
</template>

<style scoped>
</style>
