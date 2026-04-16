<script setup lang="ts">
import { Ref, ref } from 'vue';
import { login } from '@/api/user';

import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";

const emit = defineEmits(['authenticated']);

const identifier: Ref<string> = ref('');
const password: Ref<string> = ref('');

const loginUser = async () => {
    try {
        await login(identifier.value, password.value);
        emit('authenticated');
    } catch (error) {
        console.error('Login failed:', error);
    }
};
</script>

<template>
    <div>
        <form class="flex flex-col gap-y-4" @submit.prevent>
            <SectionHeading>login</SectionHeading>

            <Input required="true" type="text" id="identifier" v-model="identifier" name="identifier"
            placeholder="Locker name or email" />

            <Password required="true" id="password" v-model="password" name="password" placeholder="Password" />

            <Button @click="loginUser">Login</Button>
        </form>
    </div>
</template>

<style scoped>
</style>
