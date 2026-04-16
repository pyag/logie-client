<script setup lang="ts">
import { Ref, ref } from 'vue';
import { saveLocker } from '@/api/user';

import Button from "./Button.vue";
import Input from "./Input.vue";
import Password from "./Password.vue";
import SectionHeading from "./SectionHeading.vue";

const emit = defineEmits(['authenticated']);

const lname: Ref<string> = ref('');
const password: Ref<string> = ref('');
const cnfrm_password: Ref<string> = ref('');
const email: Ref<string> = ref('');

const createLocker = async () => {
    try {
        await saveLocker(lname.value, password.value, cnfrm_password.value, email.value);
        emit('authenticated');
    } catch (error) {
        console.error('Error creating locker:', error);
    }
};
</script>

<template>
    <form class="flex flex-col gap-y-4" @submit.prevent>
        <SectionHeading>Create locker</SectionHeading>

        <Input type="text" id="username" v-model="lname" name="username"
        placeholder="Locker name" />

        <Password id="password" v-model="password" name="password" placeholder="Password" />

        <Password id="cnfrm-password" v-model="cnfrm_password" name="cnfrm-password" placeholder="Confirm password" />

        <Input type="text" id="email" v-model="email" name="email"
        placeholder="Email or Phone (optional)" />

        <Button @click="createLocker">Create locker</Button>
    </form>
</template>

<style scoped>
</style>
